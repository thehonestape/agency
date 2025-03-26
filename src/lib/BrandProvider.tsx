import React, { createContext, useContext, useState, useMemo, ReactNode } from 'react';
import { BrandConfig, brands, defaultBrand, TypeScale } from './brandConfig';

// UI component libraries
import * as ShadcnUI from '@/components/ui';
import * as TremorUI from '@tremor/react';
import * as CatalystUI from '@/components/catalyst'; // Assuming you have this

// Type for the Brand context
interface BrandContextType {
  currentBrand: BrandConfig;
  setBrand: (brandKey: string) => void;
  getComponentFromTheme: <T extends React.ComponentType<any>>(componentName: string) => T;
  getTypeSize: (size: keyof TypeScale) => string;
  getTypeStyle: (element: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'small' | 'label') => React.CSSProperties;
  getSpacing: (size: string) => string;
  applyBrandColor: (colorName: string) => string;
}

// Create the context
const BrandContext = createContext<BrandContextType | undefined>(undefined);

// Component libraries mapping
const themeLibraries: Record<string, any> = {
  'shadcn': ShadcnUI,
  'tremor': TremorUI,
  'catalyst': CatalystUI,
};

// Component fallbacks for when a component doesn't exist in a library
const fallbacks: Record<string, string> = {
  'Button': 'shadcn',
  'Card': 'shadcn',
  'Table': 'shadcn',
  'Chart': 'tremor',
};

interface BrandProviderProps {
  children: ReactNode;
  initialBrand?: string;
}

export function BrandProvider({ 
  children, 
  initialBrand = 'workhorse'
}: BrandProviderProps) {
  const [brandKey, setBrandKey] = useState(initialBrand);
  
  // Get the current brand configuration
  const currentBrand = useMemo(() => {
    return brands[brandKey] || defaultBrand;
  }, [brandKey]);

  // Apply brand styles to document root
  React.useEffect(() => {
    // Update CSS variables based on brand
    const root = document.documentElement;
    
    // Apply colors
    Object.entries(currentBrand.colors).forEach(([name, value]) => {
      root.style.setProperty(`--color-${name}`, value);
    });
    
    // Apply typography 
    root.style.fontFamily = currentBrand.typography.bodyFont;
    
    // Apply typescale
    Object.entries(currentBrand.typography.typescale).forEach(([name, value]) => {
      root.style.setProperty(`--type-${name}`, value);
    });
    
    // Apply spacing
    Object.entries(currentBrand.spacing.scale).forEach(([name, value]) => {
      root.style.setProperty(`--space-${name}`, value);
    });
    
  }, [currentBrand]);

  // Set brand function
  const setBrand = (newBrandKey: string) => {
    if (brands[newBrandKey]) {
      setBrandKey(newBrandKey);
      console.log(`Brand switched to: ${brands[newBrandKey]?.name}`);
    } else {
      console.warn(`Brand '${newBrandKey}' not found. Using default.`);
      setBrandKey('workhorse');
    }
  };

  // Get a component from the appropriate theme library
  const getComponentFromTheme = <T extends React.ComponentType<any>>(componentName: string): T => {
    // Get the library name from brand component mapping
    const libraryName = currentBrand.componentMapping[componentName] || fallbacks[componentName] || 'shadcn';
    
    // Get the library
    const library = themeLibraries[libraryName];
    
    // Return the component, or a fallback if not found
    if (library && library[componentName]) {
      return library[componentName] as T;
    }
    
    // Try to find it in any library as fallback
    for (const libName in themeLibraries) {
      if (themeLibraries[libName][componentName]) {
        console.warn(`Component '${componentName}' not found in '${libraryName}', using from '${libName}' instead.`);
        return themeLibraries[libName][componentName] as T;
      }
    }
    
    console.error(`Component '${componentName}' not found in any library.`);
    // Return a simple div as last resort
    return (({ children, ...props }: any) => <div {...props}>{children}</div>) as unknown as T;
  };

  // Get a type size from the current brand's typescale
  const getTypeSize = (size: keyof TypeScale): string => {
    return currentBrand.typography.typescale[size];
  };

  // Get complete typography style for an element
  const getTypeStyle = (element: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'small' | 'label'): React.CSSProperties => {
    // Map elements to appropriate typescale sizes
    const elementToSize: Record<string, keyof TypeScale> = {
      h1: '3xl',
      h2: '2xl',
      h3: 'xl',
      h4: 'lg',
      h5: 'base',
      h6: 'sm',
      p: 'base',
      small: 'sm',
      label: 'sm',
    };
    
    // Map elements to font weights
    const elementToWeight: Record<string, number> = {
      h1: currentBrand.typography.fontWeights.bold,
      h2: currentBrand.typography.fontWeights.bold,
      h3: currentBrand.typography.fontWeights.semibold,
      h4: currentBrand.typography.fontWeights.semibold,
      h5: currentBrand.typography.fontWeights.medium,
      h6: currentBrand.typography.fontWeights.medium,
      p: currentBrand.typography.fontWeights.normal,
      small: currentBrand.typography.fontWeights.normal,
      label: currentBrand.typography.fontWeights.medium,
    };
    
    // Line heights
    const elementToLineHeight: Record<string, string> = {
      h1: currentBrand.typography.lineHeights.tight,
      h2: currentBrand.typography.lineHeights.tight,
      h3: currentBrand.typography.lineHeights.tight,
      h4: currentBrand.typography.lineHeights.normal,
      h5: currentBrand.typography.lineHeights.normal,
      h6: currentBrand.typography.lineHeights.normal,
      p: currentBrand.typography.lineHeights.relaxed,
      small: currentBrand.typography.lineHeights.normal,
      label: currentBrand.typography.lineHeights.normal,
    };
    
    // Font family
    const elementToFontFamily: Record<string, string> = {
      h1: currentBrand.typography.headingFont,
      h2: currentBrand.typography.headingFont,
      h3: currentBrand.typography.headingFont,
      h4: currentBrand.typography.headingFont,
      h5: currentBrand.typography.headingFont,
      h6: currentBrand.typography.headingFont,
      p: currentBrand.typography.bodyFont,
      small: currentBrand.typography.bodyFont,
      label: currentBrand.typography.bodyFont,
    };
    
    return {
      fontSize: currentBrand.typography.typescale[elementToSize[element]],
      fontWeight: elementToWeight[element],
      lineHeight: elementToLineHeight[element],
      fontFamily: elementToFontFamily[element],
    };
  };

  // Get spacing value
  const getSpacing = (size: string): string => {
    // Handle when size is a key in spacing scale
    if (size in currentBrand.spacing.scale) {
      return currentBrand.spacing.scale[size as keyof typeof currentBrand.spacing.scale];
    }
    
    // Handle when size is a TailwindCSS-style spacing value (e.g. "4" or "1.5")
    if (/^[0-9.]+$/.test(size)) {
      return `${parseFloat(size) * 0.25}rem`;
    }
    
    // Return the size as is if it has units
    if (/[a-z]/.test(size)) {
      return size;
    }
    
    return size;
  };

  // Get a color from the brand
  const applyBrandColor = (colorName: string): string => {
    return currentBrand.colors[colorName] || colorName;
  };

  // Create the context value
  const contextValue = {
    currentBrand,
    setBrand,
    getComponentFromTheme,
    getTypeSize,
    getTypeStyle,
    getSpacing,
    applyBrandColor,
  };

  return (
    <BrandContext.Provider value={contextValue}>
      {children}
    </BrandContext.Provider>
  );
}

// Hook to use the brand context
export function useBrand(): BrandContextType {
  const context = useContext(BrandContext);
  
  if (context === undefined) {
    throw new Error('useBrand must be used within a BrandProvider');
  }
  
  return context;
}

// Create a typed component that will get the right component from the right theme
export function ThemedComponent<P extends object>(
  props: P & { component: string }
) {
  const { component, ...rest } = props;
  const { getComponentFromTheme } = useBrand();
  
  const Component = getComponentFromTheme<React.ComponentType<P>>(component);
  return <Component {...rest as P} />;
}

// Typography components that automatically apply brand styles
export function BrandHeading({ 
  level = 1, 
  children, 
  className,
  style,
  ...props 
}: { 
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  children: ReactNode;
  className?: string;
  style?: React.CSSProperties;
} & React.HTMLAttributes<HTMLHeadingElement>) {
  const { getTypeStyle } = useBrand();
  const HeadingTag = `h${level}` as 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  const baseStyles = getTypeStyle(HeadingTag);
  
  // Merge the base typescale styles with any custom styles passed
  const mergedStyles = {
    ...baseStyles,
    ...style,
  };
  
  return React.createElement(
    HeadingTag,
    { 
      style: mergedStyles, 
      className,
      ...props 
    },
    children
  );
}

// Brand text component
export function BrandText({ 
  variant = 'p', 
  children, 
  className,
  style,
  ...props 
}: { 
  variant?: 'p' | 'small' | 'label';
  children: ReactNode;
  className?: string;
  style?: React.CSSProperties;
} & React.HTMLAttributes<HTMLParagraphElement>) {
  const { getTypeStyle } = useBrand();
  const baseStyles = getTypeStyle(variant);
  
  // Merge the base typescale styles with any custom styles passed
  const mergedStyles = {
    ...baseStyles,
    ...style,
  };
  
  return React.createElement(
    variant === 'small' ? 'small' : variant === 'label' ? 'span' : 'p',
    { 
      style: mergedStyles, 
      className,
      ...props 
    },
    children
  );
} 