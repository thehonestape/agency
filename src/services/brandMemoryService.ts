import { createClient } from '@sanity/client';
import { BrandMemory, BrandEvent, AIBrandInsight } from '../types/brandMemory.types';
import { workhorseBrandMemory } from '../data/workhorseBrand';

// Initialize Sanity client
const client = createClient({
  projectId: 'd222evq9',
  dataset: 'production',
  apiVersion: '2024-03-20',
  useCdn: false,
  // token: import.meta.env.VITE_SANITY_TOKEN, // Optional, leave it out for now
});

class BrandMemoryService {
  private static instance: BrandMemoryService;
  private memoriesCache: Map<string, BrandMemory> = new Map();
  private isLoadingAllMemories: boolean = false;
  private lastFetchAllTimestamp: number = 0;

  private constructor() {}

  public static getInstance(): BrandMemoryService {
    if (!BrandMemoryService.instance) {
      BrandMemoryService.instance = new BrandMemoryService();
    }
    return BrandMemoryService.instance;
  }

  async getBrandMemory(brandId: string): Promise<BrandMemory | null> {
    // Check if we have it in cache first
    if (this.memoriesCache.has(brandId)) {
      return this.memoriesCache.get(brandId) || null;
    }

    try {
      const query = `*[_type == "brandMemory" && brandId == $brandId][0]`;
      const params = { brandId };
      const result = await client.fetch(query, params);
      
      if (result) {
        this.memoriesCache.set(brandId, result);
      }
      
      return result;
    } catch (error) {
      console.error('Error fetching brand memory:', error);
      return null;
    }
  }

  /**
   * Get all brand memories in a single call
   * @param forceRefresh Force a refresh of the cache
   * @param cacheTTL Time in milliseconds before refreshing cache (default: 5 minutes)
   */
  async getAllBrandMemories(forceRefresh: boolean = false, cacheTTL: number = 300000): Promise<BrandMemory[]> {
    // Return from cache if we have it and it's not expired unless forceRefresh is true
    const now = Date.now();
    if (!forceRefresh && this.lastFetchAllTimestamp > 0 && (now - this.lastFetchAllTimestamp) < cacheTTL) {
      return Array.from(this.memoriesCache.values());
    }

    // Don't run multiple fetches simultaneously
    if (this.isLoadingAllMemories) {
      // Wait for the current fetch to complete by checking every 100ms
      return new Promise((resolve) => {
        const checkCache = () => {
          if (!this.isLoadingAllMemories) {
            resolve(Array.from(this.memoriesCache.values()));
          } else {
            setTimeout(checkCache, 100);
          }
        };
        checkCache();
      });
    }

    try {
      this.isLoadingAllMemories = true;
      const query = `*[_type == "brandMemory"]`;
      const results = await client.fetch(query);
      
      // Clear cache and update with new results
      this.memoriesCache.clear();
      if (Array.isArray(results)) {
        results.forEach(memory => {
          if (memory.brandId) {
            this.memoriesCache.set(memory.brandId, memory);
          }
        });
      }
      
      this.lastFetchAllTimestamp = now;
      return Array.from(this.memoriesCache.values());
    } catch (error) {
      console.error('Error fetching all brand memories:', error);
      return [];
    } finally {
      this.isLoadingAllMemories = false;
    }
  }

  async createBrandMemory(brandId: string, initialData: Partial<BrandMemory>): Promise<BrandMemory> {
    try {
      const brandMemory: BrandMemory = {
        id: `brand-memory-${Date.now()}`,
        brandId,
        history: [],
        values: [],
        visualIdentity: {
          colorPalette: {
            primary: [],
            secondary: [],
            accent: [],
            neutral: [],
            semantic: {
              success: '',
              warning: '',
              error: '',
              info: '',
            },
          },
          typography: {
            fonts: {
              primary: '',
              secondary: '',
              accent: '',
            },
            sizes: {
              xs: '',
              sm: '',
              base: '',
              lg: '',
              xl: '',
              '2xl': '',
              '3xl': '',
              '4xl': '',
            },
            weights: {
              light: 300,
              regular: 400,
              medium: 500,
              semibold: 600,
              bold: 700,
            },
          },
          patterns: [],
          assets: [],
        },
        insights: [],
        lastUpdated: new Date(),
        ...initialData,
      };

      await client.create({
        _type: 'brandMemory',
        ...brandMemory,
      });

      return brandMemory;
    } catch (error) {
      console.error('Error creating brand memory:', error);
      throw error;
    }
  }

  async addBrandEvent(brandId: string, event: BrandEvent): Promise<void> {
    try {
      const brandMemory = await this.getBrandMemory(brandId);
      if (!brandMemory) {
        throw new Error('Brand memory not found');
      }

      brandMemory.history.push(event);
      brandMemory.lastUpdated = new Date();

      await client
        .patch(`brandMemory-${brandId}`)
        .set({
          history: brandMemory.history,
          lastUpdated: brandMemory.lastUpdated,
        })
        .commit();
    } catch (error) {
      console.error('Error adding brand event:', error);
      throw error;
    }
  }

  async addBrandInsight(brandId: string, insight: AIBrandInsight): Promise<void> {
    try {
      const brandMemory = await this.getBrandMemory(brandId);
      if (!brandMemory) {
        throw new Error('Brand memory not found');
      }

      brandMemory.insights.push(insight);
      brandMemory.lastUpdated = new Date();

      await client
        .patch(`brandMemory-${brandId}`)
        .set({
          insights: brandMemory.insights,
          lastUpdated: brandMemory.lastUpdated,
        })
        .commit();
    } catch (error) {
      console.error('Error adding brand insight:', error);
      throw error;
    }
  }

  async updateBrandValue(
    brandId: string,
    key: string,
    value: string,
    source: 'ai-derived' | 'user-defined' | 'hybrid' = 'user-defined',
    confidence: number = 1.0
  ): Promise<void> {
    try {
      const brandMemory = await this.getBrandMemory(brandId);
      if (!brandMemory) {
        throw new Error('Brand memory not found');
      }

      const existingValueIndex = brandMemory.values.findIndex((v) => v.key === key);
      if (existingValueIndex >= 0) {
        brandMemory.values[existingValueIndex] = { key, value, confidence, source };
      } else {
        brandMemory.values.push({ key, value, confidence, source });
      }

      brandMemory.lastUpdated = new Date();

      await client
        .patch(`brandMemory-${brandId}`)
        .set({
          values: brandMemory.values,
          lastUpdated: brandMemory.lastUpdated,
        })
        .commit();
    } catch (error) {
      console.error('Error updating brand value:', error);
      throw error;
    }
  }
}

export const brandMemoryService = BrandMemoryService.getInstance();

// Function to initialize the Workhorse brand memory
export const initializeWorkhorseBrandMemory = async (): Promise<BrandMemory> => {
  const existingMemory = await brandMemoryService.getBrandMemory('workhorse');
  if (existingMemory) {
    console.log('Workhorse brand memory already exists');
    return existingMemory;
  }

  console.log('Creating Workhorse brand memory');
  return await brandMemoryService.createBrandMemory('workhorse', workhorseBrandMemory);
};

export const createSampleWorkhorseMemory = async (): Promise<BrandMemory> => {
  const workhorseMemory: BrandMemory = {
    id: 'workhorse-sample',
    brandId: 'workhorse',
    history: [
      {
        id: 'workhorse-creation',
        timestamp: new Date('2014-01-01'),
        type: 'creation',
        description: 'Workhorse founded with vision of human-AI collaborative brand development',
        data: {
          founder: 'Workhorse Team',
          vision: 'Building a new paradigm for brand development through human-AI collaboration'
        },
        importance: 1,
        connections: []
      },
      {
        id: 'workhorse-evolution',
        timestamp: new Date('2024-03-20'),
        type: 'update',
        description: 'Evolution of Brand Intelligence System with enhanced AI capabilities',
        data: {
          system: 'Brand Intelligence System',
          focus: 'Expert-AI collaborative approach'
        },
        importance: 0.9,
        connections: ['workhorse-creation']
      }
    ],
    values: [
      {
        key: 'Intelligence',
        value: 'Thoughtful, insightful, and analytical approach to brand development',
        confidence: 1,
        source: 'user-defined'
      },
      {
        key: 'Reliability',
        value: 'Dependable, consistent, and trustworthy brand management',
        confidence: 1,
        source: 'user-defined'
      },
      {
        key: 'Empowerment',
        value: 'Enabling, supportive, and confidence-building platform',
        confidence: 1,
        source: 'user-defined'
      },
      {
        key: 'Innovation',
        value: 'Forward-thinking, visionary, and progressive solutions',
        confidence: 1,
        source: 'user-defined'
      },
      {
        key: 'Efficiency',
        value: 'Streamlined, productive, and results-oriented approach',
        confidence: 1,
        source: 'user-defined'
      }
    ],
    visualIdentity: {
      colorPalette: {
        primary: ['#1A2B5F', '#FF6B6B', '#FFFFFF'],
        secondary: ['#708090', '#4ECDC4', '#F7F7F7'],
        accent: ['#4ECDC4'],
        neutral: ['#708090', '#F7F7F7'],
        semantic: {
          success: '#4ECDC4',
          warning: '#FF6B6B',
          error: '#FF6B6B',
          info: '#1A2B5F'
        }
      },
      typography: {
        fonts: {
          primary: 'Inter',
          secondary: 'Playfair Display',
          accent: 'Inter'
        },
        sizes: {
          xs: '0.75rem',
          sm: '0.875rem',
          base: '1rem',
          lg: '1.125rem',
          xl: '1.25rem',
          '2xl': '1.5rem',
          '3xl': '1.875rem',
          '4xl': '2.25rem'
        },
        weights: {
          light: 300,
          regular: 400,
          medium: 500,
          semibold: 600,
          bold: 700
        }
      },
      patterns: [
        {
          id: 'workhorse-pattern-1',
          name: 'Continuous Flow',
          type: 'pattern',
          value: 'Abstract representation of continuous workflow',
          usage: ['background', 'accent']
        }
      ],
      assets: [
        {
          id: 'workhorse-logo',
          name: 'Workhorse Logo',
          type: 'logo',
          url: '/assets/workhorse-logo.svg',
          variants: {
            light: '/assets/workhorse-logo-light.svg',
            dark: '/assets/workhorse-logo-dark.svg'
          },
          metadata: {
            dimensions: {
              width: 200,
              height: 50
            },
            format: 'svg',
            size: 5000,
            tags: ['logo', 'primary', 'brand']
          }
        }
      ]
    },
    insights: [
      {
        id: 'workhorse-insight-1',
        type: 'trend',
        title: 'AI-Native Brand Management',
        description: 'Growing market demand for AI-enhanced brand management solutions',
        confidence: 0.95,
        source: 'market-analysis',
        data: {
          marketSize: 'Growing',
          competition: 'Emerging',
          opportunity: 'High'
        },
        createdAt: new Date(),
        expiresAt: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000) // 90 days from now
      },
      {
        id: 'workhorse-insight-2',
        type: 'opportunity',
        title: 'Cultural Institution Market',
        description: 'Strong potential in cultural institution rebranding with AI-enhanced approach',
        confidence: 0.85,
        source: 'case-study',
        data: {
          successRate: '40% increase in brand recognition',
          engagement: '25% improvement in visitor engagement'
        },
        createdAt: new Date(),
        expiresAt: new Date(Date.now() + 180 * 24 * 60 * 60 * 1000) // 180 days from now
      }
    ],
    lastUpdated: new Date()
  };

  return workhorseMemory;
}; 