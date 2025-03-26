import { BrandData } from "../components/brand/BrandProvider";
import { generateThemePalettes } from "./color-intelligence";
import { Theme, ThemeMetadata, ThemeComponents } from "./theme-registry";

/**
 * Generates an optimized theme based on brand colors using the AI-inspired contrast matrix
 * This bridges between the original theme system and the new color intelligence system
 */
export function generateOptimizedTheme(
  brand: BrandData,
  options?: {
    temperature?: number;
    preservePrimaryColors?: boolean;
    themeName?: string;
    themeDescription?: string;
    themeCategory?: 'marketing' | 'dashboard' | 'documentation' | 'blog' | 'ecommerce' | 'portfolio' | 'business';
  }
): { 
  lightTheme: Theme; 
  darkTheme: Theme; 
  analysis: any 
} {
  const {
    temperature = 1.0,
    preservePrimaryColors = true,
    themeName = "Brand-Optimized Theme",
    themeDescription = "A theme optimized for brand colors and accessibility",
    themeCategory = "marketing"
  } = options || {};
  
  // Extract brand colors formatted for the color intelligence system
  const brandColors = brand.colors.map(color => ({
    value: color.value,
    name: color.name,
    isPrimary: color.isPrimary,
    isSecondary: color.isSecondary,
    isAccent: !color.isPrimary && !color.isSecondary
  }));
  
  // Set up locked colors if preserving primary colors
  const lockedColors = preservePrimaryColors 
    ? {
        light: {
          // Lock primary brand colors if requested
          ...(brandColors.find(c => c.isPrimary) 
            ? { primary: brandColors.find(c => c.isPrimary)!.value } 
            : {}),
            
          // Lock secondary brand colors if requested
          ...(brandColors.find(c => c.isSecondary) 
            ? { secondary: brandColors.find(c => c.isSecondary)!.value } 
            : {})
        },
        dark: {
          // Same for dark mode, but allow the algorithm to adjust as needed for dark mode
          ...(brandColors.find(c => c.isPrimary) 
            ? { primary: brandColors.find(c => c.isPrimary)!.value } 
            : {}),
            
          // Lock secondary brand colors if requested
          ...(brandColors.find(c => c.isSecondary) 
            ? { secondary: brandColors.find(c => c.isSecondary)!.value } 
            : {})
        }
      }
    : undefined;
  
  // Generate the palettes using the color intelligence system
  const { light, dark, analysis } = generateThemePalettes(
    brandColors,
    { 
      temperature,
      lockedColors
    }
  );
  
  // Create metadata for the themes
  const lightMetadata: ThemeMetadata = {
    id: `brand-optimized-light-${Date.now()}`,
    name: `${themeName} (Light)`,
    description: themeDescription,
    category: themeCategory,
    tags: ['brand', 'optimized', 'accessible', 'light']
  };
  
  const darkMetadata: ThemeMetadata = {
    id: `brand-optimized-dark-${Date.now()}`,
    name: `${themeName} (Dark)`,
    description: themeDescription,
    category: themeCategory,
    tags: ['brand', 'optimized', 'accessible', 'dark']
  };
  
  // Empty components placeholder - to be filled when needed
  const emptyComponents: ThemeComponents = {
    Button: null,
    Card: null,
    Input: null,
    Header: null,
    Footer: null
  };
  
  // Convert to the format expected by the existing theme system
  const lightTheme: Theme = {
    metadata: lightMetadata,
    components: emptyComponents,
    tokens: {
      colors: {
        background: light.background,
        foreground: light.text,
        card: light.card,
        cardForeground: light["card-foreground"],
        popover: light.popover,
        popoverForeground: light["popover-foreground"],
        primary: light.primary,
        primaryForeground: light["primary-foreground"],
        secondary: light.secondary,
        secondaryForeground: light["secondary-foreground"],
        muted: light.muted,
        mutedForeground: light["muted-foreground"],
        accent: light.accent,
        accentForeground: light["accent-foreground"],
        destructive: light.destructive,
        destructiveForeground: light["destructive-foreground"],
        border: light.border,
        input: light.input,
        ring: light.ring,
      },
      typography: {
        fontFamily: {
          sans: 'var(--font-inter), ui-sans-serif, system-ui, sans-serif',
          mono: 'var(--font-jetbrains-mono), ui-monospace, monospace',
        },
        fontSize: {
          xs: ['0.75rem', { lineHeight: '1rem' }],
          sm: ['0.875rem', { lineHeight: '1.25rem' }],
          base: ['1rem', { lineHeight: '1.5rem' }],
          lg: ['1.125rem', { lineHeight: '1.75rem' }],
          xl: ['1.25rem', { lineHeight: '1.75rem' }],
          '2xl': ['1.5rem', { lineHeight: '2rem' }],
          '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
          '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
          '5xl': ['3rem', { lineHeight: '1' }],
        },
      },
      spacing: {
        px: '1px',
        0: '0px',
        0.5: '0.125rem',
        1: '0.25rem',
        1.5: '0.375rem',
        2: '0.5rem',
        2.5: '0.625rem',
        3: '0.75rem',
        3.5: '0.875rem',
        4: '1rem',
      },
      borderRadius: {
        sm: '0.125rem',
        DEFAULT: '0.25rem',
        md: '0.375rem',
        lg: '0.5rem',
        xl: '0.75rem',
        '2xl': '1rem',
      },
      shadows: {
        sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
        DEFAULT: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
        md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
        lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
        xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
      }
    },
    css: `/* Auto-generated CSS for light theme */
:root {
  --background: ${light.background};
  --foreground: ${light.text};
  --card: ${light.card};
  --card-foreground: ${light["card-foreground"]};
  --popover: ${light.popover};
  --popover-foreground: ${light["popover-foreground"]};
  --primary: ${light.primary};
  --primary-foreground: ${light["primary-foreground"]};
  --secondary: ${light.secondary};
  --secondary-foreground: ${light["secondary-foreground"]};
  --muted: ${light.muted};
  --muted-foreground: ${light["muted-foreground"]};
  --accent: ${light.accent};
  --accent-foreground: ${light["accent-foreground"]};
  --destructive: ${light.destructive};
  --destructive-foreground: ${light["destructive-foreground"]};
  --border: ${light.border};
  --input: ${light.input};
  --ring: ${light.ring};
}`,
  };
  
  const darkTheme: Theme = {
    metadata: darkMetadata,
    components: emptyComponents,
    tokens: {
      colors: {
        background: dark.background,
        foreground: dark.text,
        card: dark.card,
        cardForeground: dark["card-foreground"],
        popover: dark.popover,
        popoverForeground: dark["popover-foreground"],
        primary: dark.primary,
        primaryForeground: dark["primary-foreground"],
        secondary: dark.secondary,
        secondaryForeground: dark["secondary-foreground"],
        muted: dark.muted,
        mutedForeground: dark["muted-foreground"],
        accent: dark.accent,
        accentForeground: dark["accent-foreground"],
        destructive: dark.destructive,
        destructiveForeground: dark["destructive-foreground"],
        border: dark.border,
        input: dark.input,
        ring: dark.ring,
      },
      typography: {
        fontFamily: {
          sans: 'var(--font-inter), ui-sans-serif, system-ui, sans-serif',
          mono: 'var(--font-jetbrains-mono), ui-monospace, monospace',
        },
        fontSize: {
          xs: ['0.75rem', { lineHeight: '1rem' }],
          sm: ['0.875rem', { lineHeight: '1.25rem' }],
          base: ['1rem', { lineHeight: '1.5rem' }],
          lg: ['1.125rem', { lineHeight: '1.75rem' }],
          xl: ['1.25rem', { lineHeight: '1.75rem' }],
          '2xl': ['1.5rem', { lineHeight: '2rem' }],
          '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
          '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
          '5xl': ['3rem', { lineHeight: '1' }],
        },
      },
      spacing: {
        px: '1px',
        0: '0px',
        0.5: '0.125rem',
        1: '0.25rem',
        1.5: '0.375rem',
        2: '0.5rem',
        2.5: '0.625rem',
        3: '0.75rem',
        3.5: '0.875rem',
        4: '1rem',
      },
      borderRadius: {
        sm: '0.125rem',
        DEFAULT: '0.25rem',
        md: '0.375rem',
        lg: '0.5rem',
        xl: '0.75rem',
        '2xl': '1rem',
      },
      shadows: {
        sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
        DEFAULT: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
        md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
        lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
        xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
      }
    },
    css: `/* Auto-generated CSS for dark theme */
.dark {
  --background: ${dark.background};
  --foreground: ${dark.text};
  --card: ${dark.card};
  --card-foreground: ${dark["card-foreground"]};
  --popover: ${dark.popover};
  --popover-foreground: ${dark["popover-foreground"]};
  --primary: ${dark.primary};
  --primary-foreground: ${dark["primary-foreground"]};
  --secondary: ${dark.secondary};
  --secondary-foreground: ${dark["secondary-foreground"]};
  --muted: ${dark.muted};
  --muted-foreground: ${dark["muted-foreground"]};
  --accent: ${dark.accent};
  --accent-foreground: ${dark["accent-foreground"]};
  --destructive: ${dark.destructive};
  --destructive-foreground: ${dark["destructive-foreground"]};
  --border: ${dark.border};
  --input: ${dark.input};
  --ring: ${dark.ring};
}`,
  };
  
  return {
    lightTheme,
    darkTheme,
    analysis
  };
} 