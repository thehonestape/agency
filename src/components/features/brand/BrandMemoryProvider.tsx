import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { BrandMemory } from '../../types/brandMemory.types';
import { brandMemoryService, initializeWorkhorseBrandMemory } from '../../services/brandMemoryService';
import { workhorseBrandMemory } from '../../data/workhorseBrand';

// Define the context interface
interface BrandMemoryContextType {
  // All brand memories
  brandMemories: BrandMemory[];
  // Current selected brand memory
  currentBrandMemory: BrandMemory | null;
  // Loading states
  isLoading: boolean;
  isInitializing: boolean;
  // Error state
  error: Error | null;
  // Actions
  initializeBrandMemory: (brandId: string) => Promise<void>;
  selectBrandMemory: (brandId: string) => void;
  refreshBrandMemories: (forceRefresh?: boolean) => Promise<void>;
}

// Create the context with a default value
const BrandMemoryContext = createContext<BrandMemoryContextType | undefined>(undefined);

// Props for the provider
interface BrandMemoryProviderProps {
  children: ReactNode;
  initialBrandId?: string;
}

export function BrandMemoryProvider({ children, initialBrandId }: BrandMemoryProviderProps) {
  // State for all brand memories
  const [brandMemories, setBrandMemories] = useState<BrandMemory[]>([]);
  // Initialize with the workhorse brand memory as a fallback
  const [currentBrandMemory, setCurrentBrandMemory] = useState<BrandMemory | null>(null);
  // Loading and error states
  const [isLoading, setIsLoading] = useState(true);
  const [isInitializing, setIsInitializing] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  // Function to load all brand memories
  const loadAllBrandMemories = async (forceRefresh: boolean = false) => {
    try {
      setIsLoading(true);
      setError(null);
      const memories = await brandMemoryService.getAllBrandMemories(forceRefresh);
      
      // If we don't have any memories, use the static data for Workhorse
      if (memories.length === 0) {
        const workhorse = { ...workhorseBrandMemory };
        setBrandMemories([workhorse]);
        
        if (initialBrandId === 'workhorse' || !currentBrandMemory) {
          setCurrentBrandMemory(workhorse);
        }
      } else {
        setBrandMemories(memories);
        
        // If we have an initialBrandId, select that brand memory
        if (initialBrandId && !currentBrandMemory) {
          const initialMemory = memories.find(memory => memory.brandId === initialBrandId);
          if (initialMemory) {
            setCurrentBrandMemory(initialMemory);
          }
        }
      }
    } catch (err) {
      // If we fail to load memories, use the static data for Workhorse as fallback
      const workhorse = { ...workhorseBrandMemory };
      setBrandMemories([workhorse]);
      
      if (initialBrandId === 'workhorse' || !currentBrandMemory) {
        setCurrentBrandMemory(workhorse);
      }
      
      setError(err instanceof Error ? err : new Error('Failed to load brand memories'));
    } finally {
      setIsLoading(false);
    }
  };

  // Function to refresh brand memories
  const refreshBrandMemories = async (forceRefresh: boolean = false) => {
    await loadAllBrandMemories(forceRefresh);
  };

  // Function to initialize a brand memory
  const initializeBrandMemory = async (brandId: string) => {
    try {
      setIsInitializing(true);
      setError(null);
      
      if (brandId === 'workhorse') {
        await initializeWorkhorseBrandMemory();
      } else {
        // For other brands, you would have different initialization logic
        await brandMemoryService.createBrandMemory(brandId, {});
      }
      
      // Refresh brand memories after initialization
      await refreshBrandMemories(true);
      
      // Set the newly initialized brand as the current one
      const newMemory = brandMemories.find(memory => memory.brandId === brandId);
      if (newMemory) {
        setCurrentBrandMemory(newMemory);
      }
    } catch (err) {
      setError(err instanceof Error ? err : new Error(`Failed to initialize brand memory for ${brandId}`));
    } finally {
      setIsInitializing(false);
    }
  };

  // Function to select a brand memory
  const selectBrandMemory = (brandId: string) => {
    const memory = brandMemories.find(memory => memory.brandId === brandId);
    if (memory) {
      setCurrentBrandMemory(memory);
    } else if (brandId === 'workhorse' && workhorseBrandMemory) {
      // Fallback to the static workhorse memory if needed
      setCurrentBrandMemory({ ...workhorseBrandMemory });
    } else {
      console.warn(`Brand memory with ID ${brandId} not found`);
    }
  };

  // Load brand memories on component mount
  useEffect(() => {
    loadAllBrandMemories();
  }, []);

  // Create the context value
  const value: BrandMemoryContextType = {
    brandMemories,
    currentBrandMemory,
    isLoading,
    isInitializing,
    error,
    initializeBrandMemory,
    selectBrandMemory,
    refreshBrandMemories,
  };

  return (
    <BrandMemoryContext.Provider value={value}>
      {children}
    </BrandMemoryContext.Provider>
  );
}

// Create a custom hook to use the brand memory context
export function useBrandMemory() {
  const context = useContext(BrandMemoryContext);
  if (context === undefined) {
    throw new Error('useBrandMemory must be used within a BrandMemoryProvider');
  }
  return context;
}

// Additional utility hooks
export function useBrandMemoryValues(brandId?: string) {
  const { currentBrandMemory, brandMemories } = useBrandMemory();
  
  if (brandId) {
    const memory = brandMemories.find(m => m.brandId === brandId);
    return memory?.values || [];
  }
  
  return currentBrandMemory?.values || [];
}

export function useBrandMemoryHistory(brandId?: string) {
  const { currentBrandMemory, brandMemories } = useBrandMemory();
  
  if (brandId) {
    const memory = brandMemories.find(m => m.brandId === brandId);
    return memory?.history || [];
  }
  
  return currentBrandMemory?.history || [];
}

export function useBrandMemoryInsights(brandId?: string) {
  const { currentBrandMemory, brandMemories } = useBrandMemory();
  
  if (brandId) {
    const memory = brandMemories.find(m => m.brandId === brandId);
    return memory?.insights || [];
  }
  
  return currentBrandMemory?.insights || [];
}

export function useBrandMemoryVisualIdentity(brandId?: string) {
  const { currentBrandMemory, brandMemories } = useBrandMemory();
  
  if (brandId) {
    const memory = brandMemories.find(m => m.brandId === brandId);
    return memory?.visualIdentity;
  }
  
  return currentBrandMemory?.visualIdentity;
} 