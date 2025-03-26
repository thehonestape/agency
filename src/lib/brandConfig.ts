import { DeepPartial } from './types';

// Type scale configuration
export interface TypeScale {
  xs: string;      // Extra small text
  sm: string;      // Small text
  base: string;    // Base/body text
  lg: string;      // Large text
  xl: string;      // Extra large (h3)
  '2xl': string;   // 2x large (h2)
  '3xl': string;   // 3x large (h1)
  '4xl': string;   // 4x large (hero)
  '5xl': string;   // 5x large (display)
}

// Spacing scale configuration
export interface SpacingScale {
  xs: string;      // Extra small spacing
  sm: string;      // Small spacing
  md: string;      // Medium spacing
  lg: string;      // Large spacing
  xl: string;      // Extra large spacing
  '2xl': string;   // 2x large spacing
  '3xl': string;   // 3x large spacing
}

// Brand color configuration
export interface BrandColors {
  primary: string;
  secondary: string;
  accent: string;
  neutral: string;
  background: string;
  foreground: string;
  muted: string;
  'muted-foreground': string;
  card: string;
  'card-foreground': string;
  border: string;
  input: string;
  focus: string;
  success: string;
  warning: string;
  error: string;
  info: string;
  [key: string]: string; // Allow for custom color additions
}

// Typography configuration
export interface Typography {
  headingFont: string;
  bodyFont: string;
  monoFont: string;
  typescale: TypeScale;
  fontWeights: {
    light: number;
    normal: number;
    medium: number;
    semibold: number;
    bold: number;
  };
  lineHeights: {
    tight: string;
    normal: string;
    relaxed: string;
    loose: string;
  };
  letterSpacing: {
    tighter: string;
    tight: string;
    normal: string;
    wide: string;
    wider: string;
  };
}

// Spacing and layout configuration
export interface Spacing {
  scale: SpacingScale;
  containerPadding: string;
  sectionSpacing: string;
  componentSpacing: string;
  borderRadius: {
    sm: string;
    md: string;
    lg: string;
    full: string;
  };
}

// Theme components mapping
export interface ComponentThemeMapping {
  // Map component names to theme packages
  // e.g., 'Button': 'shadcn', 'Card': 'tremor'
  [componentName: string]: string;
}

// Complete brand configuration
export interface BrandConfig {
  name: string;
  key: string;
  colors: BrandColors;
  typography: Typography;
  spacing: Spacing;
  componentMapping: ComponentThemeMapping;
  // These can be extended as needed
  animations?: {
    duration: {
      fast: string;
      normal: string;
      slow: string;
    };
    easing: {
      easeIn: string;
      easeOut: string;
      easeInOut: string;
    };
  };
  shadows?: {
    sm: string;
    md: string;
    lg: string;
    xl: string;
  };
}

// Default typescale - based on a 1.25 ratio
const defaultTypeScale: TypeScale = {
  xs: '0.75rem',    // 12px
  sm: '0.875rem',   // 14px
  base: '1rem',     // 16px
  lg: '1.125rem',   // 18px
  xl: '1.25rem',    // 20px
  '2xl': '1.5rem',  // 24px
  '3xl': '1.875rem', // 30px
  '4xl': '2.25rem', // 36px
  '5xl': '3rem',    // 48px
};

// Default spacing scale
const defaultSpacingScale: SpacingScale = {
  xs: '0.25rem',    // 4px
  sm: '0.5rem',     // 8px
  md: '1rem',       // 16px
  lg: '1.5rem',     // 24px
  xl: '2rem',       // 32px
  '2xl': '3rem',    // 48px
  '3xl': '4rem',    // 64px
};

// Default Workhorse brand
export const defaultBrand: BrandConfig = {
  name: "Workhorse",
  key: "workhorse",
  colors: {
    // Core palette - follows 60-30-10 rule
    primary: "#1F2937",
    secondary: "#6B7280", 
    accent: "#F59E0B",
    
    // Neutral shades for backgrounds and text
    neutral: "#9CA3AF",
    background: "#FFFFFF",
    foreground: "#1F2937",
    muted: "#F3F4F6",
    'muted-foreground': "#6B7280",
    
    // Component-specific colors
    card: "#FFFFFF",
    'card-foreground': "#1F2937",
    border: "#E5E7EB",
    input: "#E5E7EB",
    focus: "#F59E0B",
    
    // Semantic colors - use consistently for feedback
    success: "#10B981",
    warning: "#F59E0B",
    error: "#EF4444",
    info: "#3B82F6",
  },
  typography: {
    headingFont: "var(--font-maison-neue)",
    bodyFont: "var(--font-maison-neue)",
    monoFont: "var(--font-maison-neue-mono)",
    typescale: defaultTypeScale,
    fontWeights: {
      light: 300,
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
    },
    lineHeights: {
      tight: '1.25', // Slightly increased for better readability
      normal: '1.5',
      relaxed: '1.625',
      loose: '2',
    },
    letterSpacing: {
      tighter: '-0.05em',
      tight: '-0.025em',
      normal: '0',
      wide: '0.025em',
      wider: '0.05em',
    },
  },
  spacing: {
    scale: defaultSpacingScale,
    containerPadding: "2rem",
    sectionSpacing: "4rem",
    componentSpacing: "1rem",
    borderRadius: {
      sm: "0.25rem",
      md: "0.375rem",
      lg: "0.5rem",
      full: "9999px",
    }
  },
  componentMapping: {
    // Default component mappings
    Button: "shadcn",
    Card: "shadcn",
    Alert: "shadcn",
    Badge: "shadcn",
    Input: "shadcn",
    Textarea: "shadcn",
    Select: "shadcn",
    Tabs: "shadcn",
    Dialog: "shadcn",
    Accordion: "shadcn",
    Table: "shadcn",
    Avatar: "shadcn",
    Toast: "shadcn",
    // Tremor components
    Chart: "tremor",
    AreaChart: "tremor",
    BarChart: "tremor",
    DonutChart: "tremor", 
    LineChart: "tremor",
    Metric: "tremor",
    ProgressBar: "tremor",
    // Catalyst components
    HeroSection: "catalyst",
    FeatureSection: "catalyst",
    TestimonialSection: "catalyst",
    CTASection: "catalyst",
    PricingSection: "catalyst",
    FooterSection: "catalyst",
  },
  animations: {
    duration: {
      fast: '150ms',
      normal: '300ms',
      slow: '500ms',
    },
    easing: {
      easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
      easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
      easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
    },
  },
  shadows: {
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
  }
};

// Client A brand with a different typescale ratio (1.2)
const clientATypeScale: TypeScale = {
  xs: '0.75rem',
  sm: '0.875rem',
  base: '1rem',
  lg: '1.2rem',
  xl: '1.44rem',
  '2xl': '1.728rem',
  '3xl': '2.074rem',
  '4xl': '2.488rem',
  '5xl': '2.986rem',
};

// Brand variations
export const brands: Record<string, BrandConfig> = {
  workhorse: defaultBrand,
  clientA: {
    ...defaultBrand,
    name: "Client A",
    key: "clientA",
    colors: {
      ...defaultBrand.colors,
      primary: "#0F766E",
      secondary: "#475569",
      accent: "#EAB308",
    },
    typography: {
      ...defaultBrand.typography,
      headingFont: "'Poppins', sans-serif",
      bodyFont: "'Inter', sans-serif",
      typescale: clientATypeScale,
    },
    spacing: {
      ...defaultBrand.spacing,
      sectionSpacing: "3rem",
    },
    componentMapping: {
      ...defaultBrand.componentMapping,
      // Override specific components
      Button: "catalyst",
      Card: "tremor",
    },
  },
  clientB: {
    ...defaultBrand,
    name: "Client B",
    key: "clientB",
    colors: {
      ...defaultBrand.colors,
      primary: "#8B5CF6",
      secondary: "#4F46E5",
      accent: "#EC4899",
      background: "#050507",
      foreground: "#FFFFFF",
      muted: "#1F1F23",
      'muted-foreground': "#A1A1AA",
      card: "#18181B",
      'card-foreground': "#FFFFFF",
    },
    typography: {
      ...defaultBrand.typography,
      headingFont: "'Montserrat', sans-serif",
      bodyFont: "'Roboto', sans-serif",
      // Larger typescale (1.5 ratio)
      typescale: {
        xs: '0.667rem',
        sm: '0.833rem',
        base: '1rem',
        lg: '1.5rem',
        xl: '2.25rem',
        '2xl': '3.375rem',
        '3xl': '5.063rem',
        '4xl': '7.594rem',
        '5xl': '11.391rem',
      },
    },
    spacing: {
      ...defaultBrand.spacing,
      scale: {
        ...defaultSpacingScale,
        lg: '2rem',
        xl: '3rem',
        '2xl': '5rem',
        '3xl': '8rem',
      },
    },
    componentMapping: {
      ...defaultBrand.componentMapping,
      // Override with Catalyst UI for all marketing components
      Button: "catalyst",
      Card: "catalyst",
      HeroSection: "catalyst",
      FeatureSection: "catalyst",
    },
  },
};

// Helper utility to merge brand configs
export function createBrandConfig(key: string, overrides: DeepPartial<BrandConfig>): BrandConfig {
  const base = brands[key] || defaultBrand;
  
  // Simple deep merge implementation
  return {
    ...base,
    ...overrides,
    colors: {
      ...base.colors,
      ...overrides.colors,
    },
    typography: {
      ...base.typography,
      ...overrides.typography,
      typescale: {
        ...base.typography.typescale,
        ...overrides.typography?.typescale,
      },
      fontWeights: {
        ...base.typography.fontWeights,
        ...overrides.typography?.fontWeights,
      },
      lineHeights: {
        ...base.typography.lineHeights,
        ...overrides.typography?.lineHeights,
      },
      letterSpacing: {
        ...base.typography.letterSpacing,
        ...overrides.typography?.letterSpacing,
      },
    },
    spacing: {
      ...base.spacing,
      ...overrides.spacing,
      scale: {
        ...base.spacing.scale,
        ...overrides.spacing?.scale,
      },
      borderRadius: {
        ...base.spacing.borderRadius,
        ...overrides.spacing?.borderRadius,
      },
    },
    componentMapping: {
      ...base.componentMapping,
      ...overrides.componentMapping,
    },
    animations: {
      ...base.animations,
      ...overrides.animations,
      duration: {
        ...base.animations?.duration,
        ...overrides.animations?.duration,
      },
      easing: {
        ...base.animations?.easing,
        ...overrides.animations?.easing,
      },
    },
    shadows: {
      ...base.shadows,
      ...overrides.shadows,
    },
  };
} 