import React, { createContext, useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { testBrands } from "../../data/testData";
import { workhorseBrand } from "../../data/workhorseBrand";

// Types for brand data
export interface BrandColor {
  name: string;
  value: string;
  isLight?: boolean;
  isPrimary?: boolean;
  isSecondary?: boolean;
  isAccent?: boolean;
}

export interface BrandTypography {
  fontFamily: string;
  headingFont?: string;
  bodyFont?: string;
  baseFontSize?: string;
  lineHeight?: string;
  fontWeights?: {
    light?: number;
    regular?: number;
    medium?: number;
    semiBold?: number;
    bold?: number;
  };
}

export interface BrandAsset {
  id: string;
  key?: string;
  type: "logo" | "icon" | "image" | "pattern" | "illustration";
  url: string;
  altText?: string;
  width?: number;
  height?: number;
}

export interface BrandSpacing {
  baseline: number;
  scale: number[];
}

export interface BrandRadii {
  small: string;
  medium: string;
  large: string;
  full: string;
}

export interface BrandVoice {
  tone: "formal" | "casual" | "friendly" | "technical" | "enthusiastic";
  characteristics: string[];
  exampleCopy?: string[];
}

export interface BrandData {
  id: string;
  name: string;
  client: string;
  slug: string;
  description?: string;
  colors: BrandColor[];
  typography: BrandTypography;
  spacing?: BrandSpacing;
  radii?: BrandRadii;
  assets: BrandAsset[];
  voice?: BrandVoice;
  terminology?: Record<string, string>;
}

// Create the context
interface BrandContextProps {
  currentBrand: BrandData | null;
  setBrandBySlug: (slug: string) => void;
  availableBrands: BrandData[];
  isPending: boolean;
  error: Error | null;
}

const BrandContext = createContext<BrandContextProps | undefined>(undefined);

// Provider component
export function BrandProvider({ children }: { children: React.ReactNode }) {
  const [currentBrand, setCurrentBrand] = useState<BrandData | null>(null);
  const [availableBrands, setAvailableBrands] = useState<BrandData[]>([]);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  
  // Use params to detect brand from URL if available
  const params = useParams<{ brandSlug?: string }>();
  
  // Initialize with test data (in a real app, this would be an API call)
  useEffect(() => {
    setIsPending(true);
    try {
      // Simulate API delay
      setTimeout(() => {
        setAvailableBrands(testBrands);
        setIsPending(false);
      }, 500);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to load brands'));
      setIsPending(false);
    }
  }, []);
  
  // Set brand from URL if available
  useEffect(() => {
    if (params.brandSlug && availableBrands.length > 0) {
      const brand = availableBrands.find(b => b.slug === params.brandSlug);
      if (brand) {
        setCurrentBrand(brand);
      }
    }
  }, [params.brandSlug, availableBrands]);
  
  // Function to set brand by slug
  const setBrandBySlug = (slug: string) => {
    const brand = availableBrands.find(b => b.slug === slug);
    if (brand) {
      setCurrentBrand(brand);
    } else if (slug === 'workhorse') {
      // Fallback to workhorse brand if not found in available brands
      setCurrentBrand(workhorseBrand);
    } else {
      console.warn(`Brand with slug "${slug}" not found`);
    }
  };
  
  return (
    <BrandContext.Provider 
      value={{ 
        currentBrand, 
        setBrandBySlug, 
        availableBrands,
        isPending,
        error
      }}
    >
      {children}
    </BrandContext.Provider>
  );
}

// Custom hook to use the brand context
export function useBrand() {
  const context = useContext(BrandContext);
  if (context === undefined) {
    throw new Error('useBrand must be used within a BrandProvider');
  }
  return context;
}

// Selector hooks for specific brand properties
export function useBrandColors() {
  const { currentBrand } = useBrand();
  return currentBrand?.colors || [];
}

export function useBrandTypography() {
  const { currentBrand } = useBrand();
  return currentBrand?.typography;
}

export function useBrandAssets() {
  const { currentBrand } = useBrand();
  return currentBrand?.assets || [];
}

export function useBrandTerminology() {
  const { currentBrand } = useBrand();
  return currentBrand?.terminology || {};
} 