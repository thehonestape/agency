import React, { useState } from 'react';
import { PageBuilder, Section } from '@/components/marketing/PageBuilder';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/Card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { brands } from '@/lib/brandConfig';

/**
 * BrandedPageDemo component
 * 
 * This page demonstrates how to use the PageBuilder component
 * with different brand configurations to create self-building,
 * on-brand marketing pages.
 */
export default function BrandedPageDemo() {
  const [currentBrand, setCurrentBrand] = useState('workhorse');
  const [useCustomTypescale, setUseCustomTypescale] = useState(false);
  const [heroTitleSize, setHeroTitleSize] = useState('4rem');
  const [heroSubtitleSize, setHeroSubtitleSize] = useState('1.25rem');
  const [heroDescriptionSize, setHeroDescriptionSize] = useState('1.125rem');
  
  // Create sample sections that will be used across all brand demos
  const createSections = (): Section[] => {
    return [
      {
        type: 'hero',
        props: {
          title: 'Create On-Brand Marketing Pages',
          subtitle: 'Powerful & Flexible',
          description: 'Build marketing pages that automatically inherit your brand\'s typography, colors, and component styles. Perfect for agencies and teams working with multiple brands.',
          ctaText: 'Get Started',
          ctaLink: '/dashboard',
          secondaryCtaText: 'Learn More',
          secondaryCtaLink: '/services',
          layout: 'split',
          background: 'light',
          image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2000&q=80',
          // Only apply custom typescale if enabled
          ...(useCustomTypescale && {
            typescale: {
              '3xl': heroTitleSize,      // For h1
              base: heroDescriptionSize, // For body text
              sm: heroSubtitleSize,      // For subtitle
            },
            spacing: {
              top: '4rem',
              bottom: '6rem',
            }
          }),
        }
      },
      {
        type: 'features',
        props: {
          title: 'Brand-Aware Features',
          subtitle: 'Everything you need',
          layout: 'grid',
          features: [
            {
              title: 'Dynamic Typography',
              description: 'Automatically scales text based on your brand\'s typescale',
              icon: 'text'
            },
            {
              title: 'Color Systems',
              description: 'Use your brand colors consistently across all components',
              icon: 'palette'
            },
            {
              title: 'Component Mapping',
              description: 'Pull components from any UI library or design system',
              icon: 'layers'
            },
            {
              title: 'Responsive Layouts',
              description: 'Looks great on any device with built-in responsive designs',
              icon: 'device-mobile'
            }
          ],
          // Only apply custom typescale if enabled
          ...(useCustomTypescale && {
            typescale: {
              'xl': '1.75rem',  // Section title size
              'base': '1rem',   // Description text
            },
            spacing: {
              top: '2rem',
              bottom: '3rem',
            }
          }),
        }
      },
      {
        type: 'cta',
        props: {
          title: 'Ready to Build Your Brand?',
          description: 'Get started today and create consistently branded marketing pages that elevate your message.',
          ctaText: 'Start Building',
          ctaLink: '/onboarding',
          background: 'gradient',
          // Only apply custom typescale if enabled
          ...(useCustomTypescale && {
            typescale: {
              '2xl': '2.5rem',
              'base': '1.2rem',
            },
            spacing: {
              top: '5rem',
              bottom: '5rem',
            }
          }),
        }
      }
    ];
  };
  
  // Get available brand names from the brands object
  const brandNames = Object.keys(brands);
  
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto py-8 px-4">
        <div className="flex flex-col space-y-8 mb-8">
          <div>
            <h1 className="text-3xl font-bold">Brand Demonstration</h1>
            <p className="text-gray-600 mt-2">
              See how the same content adapts to different brand styles
            </p>
          </div>
          
          <Card className="p-4">
            <div className="mb-4">
              <h2 className="text-xl font-semibold mb-2">Select a Brand</h2>
              <p className="text-sm text-gray-500 mb-4">
                Choose a brand to see how the page components automatically adapt to that brand's design system
              </p>
              
              <div className="flex flex-wrap gap-2">
                {brandNames.map(brandKey => (
                  <Button
                    key={brandKey}
                    variant={currentBrand === brandKey ? 'default' : 'outline'}
                    onClick={() => setCurrentBrand(brandKey)}
                    className="capitalize"
                  >
                    {brands[brandKey].name}
                  </Button>
                ))}
              </div>
            </div>
            
            {/* Section-level typescale customization */}
            <div className="mb-6 mt-8 border-t pt-4">
              <div className="flex items-center space-x-2 mb-4">
                <Switch 
                  id="custom-typescale" 
                  checked={useCustomTypescale} 
                  onCheckedChange={setUseCustomTypescale} 
                />
                <Label htmlFor="custom-typescale">Enable section-level typescale customization</Label>
              </div>
              
              {useCustomTypescale && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 border rounded-md bg-gray-50">
                  <div>
                    <Label htmlFor="hero-title">Hero Title Size</Label>
                    <div className="flex items-center space-x-2">
                      <Input 
                        id="hero-title" 
                        value={heroTitleSize}
                        onChange={(e) => setHeroTitleSize(e.target.value)}
                        className="mt-1"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="hero-subtitle">Hero Subtitle Size</Label>
                    <div className="flex items-center space-x-2">
                      <Input 
                        id="hero-subtitle" 
                        value={heroSubtitleSize}
                        onChange={(e) => setHeroSubtitleSize(e.target.value)}
                        className="mt-1"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="hero-description">Hero Description Size</Label>
                    <div className="flex items-center space-x-2">
                      <Input 
                        id="hero-description" 
                        value={heroDescriptionSize}
                        onChange={(e) => setHeroDescriptionSize(e.target.value)}
                        className="mt-1"
                      />
                    </div>
                  </div>
                </div>
              )}
              
              <div className="mt-4 p-4 border rounded-md bg-gray-50">
                <h3 className="text-sm font-semibold mb-2">How it works</h3>
                <p className="text-xs text-gray-600">
                  When section-level typescale is enabled, we're applying custom CSS variables scoped to each 
                  section. This allows you to create a rhythm and flow through your page by varying typography
                  sizes between sections without changing your global brand settings.
                </p>
              </div>
            </div>
            
            <div className="mb-4">
              <h3 className="text-lg font-medium mb-2">Selected Brand Properties</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div>
                  <h4 className="text-sm font-semibold mb-1">Colors</h4>
                  <div className="flex flex-wrap gap-2">
                    {['primary', 'secondary', 'accent'].map(color => (
                      <div 
                        key={color}
                        className="flex items-center space-x-1"
                      >
                        <div 
                          className="w-4 h-4 rounded-full" 
                          style={{ backgroundColor: brands[currentBrand].colors[color] }}
                        />
                        <span className="text-xs">{color}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h4 className="text-sm font-semibold mb-1">Typography</h4>
                  <div className="text-xs">
                    <div>Heading: {brands[currentBrand].typography.headingFont}</div>
                    <div>Body: {brands[currentBrand].typography.bodyFont}</div>
                  </div>
                </div>
                
                <div>
                  <h4 className="text-sm font-semibold mb-1">Component Sources</h4>
                  <div className="text-xs">
                    <div>Button: {brands[currentBrand].componentMapping.Button}</div>
                    <div>Card: {brands[currentBrand].componentMapping.Card}</div>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>
        
        {/* Brand preview in an iframe-like container */}
        <div className="border rounded-lg overflow-hidden shadow-lg mb-8 bg-white">
          <div className="border-b p-2 flex justify-between items-center bg-gray-50">
            <div className="text-sm font-medium">Preview: {brands[currentBrand].name}</div>
            <div className="flex space-x-2">
              <Button variant="ghost" size="sm">Desktop</Button>
              <Button variant="ghost" size="sm">Tablet</Button>
              <Button variant="ghost" size="sm">Mobile</Button>
            </div>
          </div>
          
          <div className="p-0">
            {/* This is where our brand-aware PageBuilder component is used */}
            <PageBuilder
              brandKey={currentBrand}
              sections={createSections()}
            />
          </div>
        </div>
        
        <Card className="p-4">
          <h2 className="text-xl font-semibold mb-4">How It Works</h2>
          
          <Tabs defaultValue="code">
            <TabsList>
              <TabsTrigger value="code">Code Example</TabsTrigger>
              <TabsTrigger value="system">System Architecture</TabsTrigger>
              <TabsTrigger value="typescale">Section Typescale</TabsTrigger>
            </TabsList>
            
            <TabsContent value="code" className="mt-4">
              <div className="bg-gray-900 text-gray-100 p-4 rounded-md overflow-auto text-sm">
                <pre>{`
// Example of using the PageBuilder with a specific brand
import { PageBuilder } from '@/components/marketing/PageBuilder';

export default function YourPage() {
  const sections = [
    {
      type: 'hero',
      props: {
        title: 'Your Page Title',
        subtitle: 'Your subtitle',
        ctaText: 'Get Started',
        // ... more props
      }
    },
    // ... more sections
  ];
  
  return (
    <PageBuilder
      brandKey="clientA"  // Use a specific brand configuration
      sections={sections} // Pass your section configurations
    />
  );
}
`}</pre>
              </div>
            </TabsContent>
            
            <TabsContent value="system" className="mt-4">
              <div className="prose max-w-none">
                <p>
                  The system works in layers to provide flexibility and consistency:
                </p>
                <ol>
                  <li>
                    <strong>Brand Configuration</strong> - Defines colors, typography, spacing, and component mappings
                  </li>
                  <li>
                    <strong>BrandProvider</strong> - React context that provides brand values to all components
                  </li>
                  <li>
                    <strong>Section Components</strong> - UI sections that adapt to the current brand
                  </li>
                  <li>
                    <strong>PageBuilder</strong> - Assembles sections with the selected brand config
                  </li>
                </ol>
                <p>
                  This allows you to define your content once and render it with different brand styles,
                  perfect for agencies working with multiple clients or for testing different brand directions.
                </p>
              </div>
            </TabsContent>
            
            <TabsContent value="typescale" className="mt-4">
              <div className="prose max-w-none">
                <p>
                  Section-level typescale customization allows you to:
                </p>
                <ul>
                  <li>
                    <strong>Control Visual Hierarchy</strong> - Make hero sections more impactful with larger text
                  </li>
                  <li>
                    <strong>Create Rhythm & Flow</strong> - Adjust spacing and text size between sections for better pacing
                  </li>
                  <li>
                    <strong>Optimize Readability</strong> - Fine-tune description text size based on section content length
                  </li>
                </ul>
                <p>
                  Implementation example with section-level typescale:
                </p>
                <pre className="bg-gray-800 text-white p-3 rounded">{`// Apply custom typescale to just one section
{
  type: 'hero',
  props: {
    title: 'Section Title',
    description: 'Section content',
    typescale: {
      '3xl': '4rem',     // Larger h1
      'base': '1.125rem' // Larger body text
    },
    spacing: {
      top: '3rem',
      bottom: '5rem'
    }
  }
}`}</pre>
              </div>
            </TabsContent>
          </Tabs>
        </Card>
      </div>
    </div>
  );
} 