import { Theme, ThemeTokens, themeRegistry } from './theme-registry';
import { protocolTheme } from './theme-adapters/protocol-adapter';
import { salientTheme } from './theme-adapters/salient-adapter';
import { v4 as uuidv4 } from 'uuid';

// Color utilities
function hexToRgb(hex: string): { r: number; g: number; b: number } {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
      }
    : { r: 0, g: 0, b: 0 };
}

function rgbToHex(r: number, g: number, b: number): string {
  return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}

function rgbToOklch(r: number, g: number, b: number): string {
  // This is a simplified conversion - in a real app, use a color conversion library
  // This approximation converts to a pseudo-oklch value
  const r1 = r / 255;
  const g1 = g / 255;
  const b1 = b / 255;
  
  // Simplified conversion to lightness (0-1)
  const lightness = 0.2126 * r1 + 0.7152 * g1 + 0.0722 * b1;
  
  // Simplified conversion to chroma (0-0.4)
  const chroma = Math.sqrt(
    Math.pow(r1 - g1, 2) + 
    Math.pow(r1 - b1, 2) + 
    Math.pow(g1 - b1, 2)
  ) / Math.sqrt(2) * 0.4;
  
  // Simplified conversion to hue (0-360)
  let hue = 0;
  if (chroma > 0) {
    const max = Math.max(r1, g1, b1);
    const min = Math.min(r1, g1, b1);
    
    if (max === r1) {
      hue = ((g1 - b1) / (max - min)) * 60;
    } else if (max === g1) {
      hue = (2 + (b1 - r1) / (max - min)) * 60;
    } else {
      hue = (4 + (r1 - g1) / (max - min)) * 60;
    }
    
    if (hue < 0) hue += 360;
  }
  
  return `oklch(${lightness.toFixed(3)} ${chroma.toFixed(3)} ${hue.toFixed(3)})`;
}

function shiftColor(color: string, amount: number): string {
  const { r, g, b } = hexToRgb(color);
  
  return rgbToHex(
    Math.max(0, Math.min(255, r + amount)),
    Math.max(0, Math.min(255, g + amount)),
    Math.max(0, Math.min(255, b + amount))
  );
}

function generateColorPalette(baseColor: string): Record<string, string> {
  const { r, g, b } = hexToRgb(baseColor);
  const oklchBase = rgbToOklch(r, g, b);
  
  // Generate lighter and darker variants
  return {
    '50': rgbToOklch(
      Math.min(255, r + 170),
      Math.min(255, g + 170),
      Math.min(255, b + 170)
    ),
    '100': rgbToOklch(
      Math.min(255, r + 140),
      Math.min(255, g + 140),
      Math.min(255, b + 140)
    ),
    '200': rgbToOklch(
      Math.min(255, r + 110),
      Math.min(255, g + 110),
      Math.min(255, b + 110)
    ),
    '300': rgbToOklch(
      Math.min(255, r + 80),
      Math.min(255, g + 80),
      Math.min(255, b + 80)
    ),
    '400': rgbToOklch(
      Math.min(255, r + 40),
      Math.min(255, g + 40),
      Math.min(255, b + 40)
    ),
    '500': oklchBase,
    '600': rgbToOklch(
      Math.max(0, r - 40),
      Math.max(0, g - 40),
      Math.max(0, b - 40)
    ),
    '700': rgbToOklch(
      Math.max(0, r - 80),
      Math.max(0, g - 80),
      Math.max(0, b - 80)
    ),
    '800': rgbToOklch(
      Math.max(0, r - 110),
      Math.max(0, g - 110),
      Math.max(0, b - 110)
    ),
    '900': rgbToOklch(
      Math.max(0, r - 140),
      Math.max(0, g - 140),
      Math.max(0, b - 140)
    ),
    '950': rgbToOklch(
      Math.max(0, r - 170),
      Math.max(0, g - 170),
      Math.max(0, b - 170)
    ),
  };
}

// Theme Generation Parameters
export interface ThemeGenerationParams {
  primaryColor: string;
  accentColor: string;
  baseTheme: 'protocol' | 'salient';
  borderRadius: 'sharp' | 'rounded' | 'pill';
  typography: 'modern' | 'classic' | 'readable';
  name: string;
  description?: string;
  category?: string;
}

// Default parameters
const defaultParams: ThemeGenerationParams = {
  primaryColor: '#3b82f6', // blue-500
  accentColor: '#f59e0b', // amber-500
  baseTheme: 'salient',
  borderRadius: 'rounded',
  typography: 'modern',
  name: 'Generated Theme',
  description: 'A dynamically generated theme',
  category: 'marketing',
};

// Define the structure of the colors
type ColorTokens = Record<string, string> & {
  primary: string;
  accent: string;
}

// Custom type for extended theme tokens
interface ExtendedThemeTokens extends Omit<ThemeTokens, 'colors'> {
  colors: ColorTokens;
  // Store color palettes separately to avoid type issues
  primaryPalette?: Record<string, string>;
  accentPalette?: Record<string, string>;
}

// Generate a new theme
export function generateTheme(params: Partial<ThemeGenerationParams> = {}): Theme {
  // Merge defaults with provided params
  const mergedParams: ThemeGenerationParams = { ...defaultParams, ...params };
  
  // Create a unique ID for the theme
  const id = `generated-${uuidv4().substring(0, 8)}`;

  // Get base theme
  const baseTheme = mergedParams.baseTheme === 'protocol' ? protocolTheme : salientTheme;
  
  // Generate color palettes
  const primaryPalette = generateColorPalette(mergedParams.primaryColor);
  const accentPalette = generateColorPalette(mergedParams.accentColor);
  
  // Generate radius values based on preference
  const radiusValues = {
    sharp: {
      sm: '0.125rem',
      DEFAULT: '0.25rem',
      md: '0.375rem',
      lg: '0.5rem',
      xl: '0.75rem',
      '2xl': '1rem',
    },
    rounded: {
      sm: '0.25rem',
      DEFAULT: '0.5rem',
      md: '0.75rem',
      lg: '1rem',
      xl: '1.5rem',
      '2xl': '2rem',
    },
    pill: {
      sm: '0.5rem',
      DEFAULT: '9999px',
      md: '9999px',
      lg: '9999px',
      xl: '9999px',
      '2xl': '9999px',
    },
  };
  
  // Select typography scale
  const typographyScales = {
    modern: {
      fontFamily: {
        sans: 'var(--font-inter), ui-sans-serif, system-ui, sans-serif',
        mono: 'var(--font-jetbrains-mono), ui-monospace, monospace',
      },
      fontSize: baseTheme.tokens.typography.fontSize,
    },
    classic: {
      fontFamily: {
        sans: 'var(--font-palatino), Georgia, serif',
        serif: 'var(--font-baskerville), Times New Roman, serif',
      },
      fontSize: baseTheme.tokens.typography.fontSize,
    },
    readable: {
      fontFamily: {
        sans: 'var(--font-atkinson), system-ui, sans-serif',
        mono: 'var(--font-menlo), monospace',
      },
      fontSize: {
        xs: ['0.875rem', { lineHeight: '1.4' }],
        sm: ['1rem', { lineHeight: '1.5' }],
        base: ['1.125rem', { lineHeight: '1.7' }],
        lg: ['1.25rem', { lineHeight: '1.6' }],
        xl: ['1.5rem', { lineHeight: '1.4' }],
        '2xl': ['1.875rem', { lineHeight: '1.3' }],
        '3xl': ['2.25rem', { lineHeight: '1.2' }],
        '4xl': ['3rem', { lineHeight: '1.1' }],
        '5xl': ['3.75rem', { lineHeight: '1' }],
      },
    },
  };
  
  // Create tokens for the new theme
  const tokens: ExtendedThemeTokens = {
    colors: {
      ...baseTheme.tokens.colors,
      primary: primaryPalette['500'],
      accent: accentPalette['500'],
    },
    primaryPalette: primaryPalette,
    accentPalette: accentPalette,
    typography: typographyScales[mergedParams.typography],
    spacing: baseTheme.tokens.spacing,
    borderRadius: radiusValues[mergedParams.borderRadius],
    shadows: baseTheme.tokens.shadows,
  };
  
  // Create the new theme
  const newTheme: Theme = {
    metadata: {
      id,
      name: mergedParams.name,
      description: mergedParams.description || 'A dynamically generated theme',
      category: mergedParams.category as any || 'marketing',
      tags: ['generated', mergedParams.baseTheme, mergedParams.borderRadius, mergedParams.typography],
    },
    components: baseTheme.components,
    tokens,
    css: `
      /* Generated CSS for ${mergedParams.name} */
      :root {
        --primary: ${primaryPalette['500']};
        --accent: ${accentPalette['500']};
        --radius: ${radiusValues[mergedParams.borderRadius].DEFAULT};
        
        /* Typography settings */
        --font-family: ${typographyScales[mergedParams.typography].fontFamily.sans};
      }
    `,
  };
  
  // Register the new theme
  themeRegistry.register(newTheme);
  
  return newTheme;
}

// Generate variants of a theme
export function generateThemeVariants(baseTheme: Theme, count: number = 3): Theme[] {
  const variants: Theme[] = [];
  
  // Generate color variations
  for (let i = 0; i < count; i++) {
    // Get the primary color
    const primaryColor = baseTheme.tokens.colors.primary as string;
    const { r, g, b } = hexToRgb(primaryColor.startsWith('#') ? primaryColor : '#3b82f6');
    
    // Create a random hue shift
    const hueShift = Math.floor(Math.random() * 360);
    
    // Simple algorithm to shift hue - in practice use a proper color library
    const angle = (hueShift * Math.PI) / 180;
    const newR = Math.floor(r * Math.cos(angle) - g * Math.sin(angle));
    const newG = Math.floor(r * Math.sin(angle) + g * Math.cos(angle));
    
    // Create variant
    const variant = generateTheme({
      primaryColor: rgbToHex(
        Math.max(0, Math.min(255, newR)),
        Math.max(0, Math.min(255, newG)),
        Math.max(0, Math.min(255, b))
      ),
      baseTheme: baseTheme.metadata.id as any === 'protocol' ? 'protocol' : 'salient',
      name: `${baseTheme.metadata.name} Variant ${i + 1}`,
      description: `A variant of ${baseTheme.metadata.name} with a different color scheme`,
    });
    
    variants.push(variant);
  }
  
  return variants;
}

export default {
  generateTheme,
  generateThemeVariants,
}; 