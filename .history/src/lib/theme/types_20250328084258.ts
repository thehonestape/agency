/**
 * Theme Types
 * A simple, practical theme system using hex colors
 */

export type ThemeMode = 'light' | 'dark';

export interface ThemeColors {
  // Base colors
  primary: string;
  'primary-foreground': string;
  secondary: string;
  'secondary-foreground': string;
  accent: string;
  'accent-foreground': string;
  
  // UI colors
  background: string;
  'background-foreground': string;
  foreground: string;
  card: string;
  'card-foreground': string;
  muted: string;
  'muted-foreground': string;
  border: string;
  'border-foreground': string;
  input: string;
  'input-foreground': string;
  popover: string;
  'popover-foreground': string;
  ring: string;
  
  // State colors
  destructive: string;
  'destructive-foreground': string;
  success: string;
  'success-foreground': string;
  warning: string;
  'warning-foreground': string;
  info: string;
  'info-foreground': string;

  // Button colors
  'button-background': string;
  'button-text': string;
  
  // Navigation colors
  'nav-bg': string;
  'nav-border': string;
  'nav-text': string;
  'nav-text-hover': string;
  'nav-bg-hover': string;
  'nav-bg-active': string;
  'nav-text-active': string;
  'nav-icon': string;
  'nav-icon-active': string;
  'nav-icon-hover': string;
  'nav-section-text': string;
  'nav-count': string;

  // Color scales
  'primary-50': string;
  'primary-100': string;
  'primary-200': string;
  'primary-300': string;
  'primary-400': string;
  'primary-500': string;
  'primary-600': string;
  'primary-700': string;
  'primary-800': string;
  'primary-900': string;
  'primary-950': string;
  
  'secondary-50': string;
  'secondary-100': string;
  'secondary-200': string;
  'secondary-300': string;
  'secondary-400': string;
  'secondary-500': string;
  'secondary-600': string;
  'secondary-700': string;
  'secondary-800': string;
  'secondary-900': string;
  'secondary-950': string;
  
  'accent-50': string;
  'accent-100': string;
  'accent-200': string;
  'accent-300': string;
  'accent-400': string;
  'accent-500': string;
  'accent-600': string;
  'accent-700': string;
  'accent-800': string;
  'accent-900': string;
  'accent-950': string;
}

export interface ThemeTypography {
  fontFamily: {
    // Core fonts
    sans: string;      // Primary sans-serif font (used for body text)
    display: string;   // Display/heading font
    mono: string;      // Monospace font (used for code)
    
    // Optional alternative fonts
    sansAlt?: string;  // Alternative sans-serif font
    serif?: string;    // Optional serif font
    serifAlt?: string; // Optional alternative serif font
  };
  fontSize: {
    // Base sizes with consistent line height and letter spacing
    xs: string;
    sm: string;
    base: string;
    lg: string;
    xl: string;
    '2xl': string;
    '3xl': string;
    '4xl': string;
    '5xl': string;
  };
  lineHeight: {
    // Consistent line heights across the system
    none: string;
    tight: string;
    snug: string;
    normal: string;
    relaxed: string;
    loose: string;
  };
  letterSpacing: {
    // Consistent letter spacing across the system
    tighter: string;
    tight: string;
    normal: string;
    wide: string;
    wider: string;
    widest: string;
  };
  fontFeatureSettings: {
    // Core OpenType features
    ligatures: boolean;        // Standard ligatures
    kerning: boolean;          // Kerning
    contextual: boolean;       // Contextual alternates

    // Numbers
    oldstyleNums: boolean;     // Old-style numbers
    liningNums: boolean;       // Lining numbers
    tabularNums: boolean;      // Tabular numbers
    proportionalNums: boolean; // Proportional numbers

    // Fractions and ordinals
    diagonalFractions: boolean; // Diagonal fractions
    ordinal: boolean;          // Ordinal numbers

    // Special characters
    slashedZero: boolean;      // Slashed zero

    // Stylistic features
    stylistic: boolean;        // Stylistic alternates
    swash: boolean;           // Swash variants
    titling: boolean;         // Titling alternates
  };
  fontVariationSettings: {
    // Variable font settings
    weight: number;    // Font weight (100-900)
    width: number;     // Font width (25-200)
    slant: number;     // Font slant (-10 to 10)
    optical: number;   // Optical size
    grade: number;     // Grade (for different screen densities)
  };
  // Typography scale configuration
  scale: {
    base: number;      // Base font size (default: 16)
    ratio: number;     // Scale ratio (default: 1.25)
    unit: string;      // Unit for font sizes (default: 'rem')
  };
  // Spacing system
  spacing: {
    // Text block spacing
    paragraph: string;    // Space between paragraphs
    heading: string;      // Space after headings
    list: string;        // Space between list items
    
    // Text block settings
    maxWidth: string;     // Maximum line length
    indent: string;       // First line indent
  };
  // Component-specific settings
  components: {
    // Heading styles
    heading: {
      fontFamily: string;
      fontWeight: string;
      lineHeight: string;
      letterSpacing: string;
    };
    // Link styles
    link: {
      color: string;
      decoration: string;
      hoverColor: string;
      hoverDecoration: string;
    };
    // Code styles
    code: {
      fontSize: string;
      padding: string;
      borderRadius: string;
      backgroundColor: string;
    };
  };
}

export interface ThemeSpacing {
  xxs: string;
  xs: string;
  sm: string;
  md: string;
  lg: string;
  xl: string;
  xxl: string;
}

export interface ThemeRadius {
  sm: string;
  md: string;
  lg: string;
  xl: string;
  full: string;
}

export interface ThemeShadows {
  sm: string;
  md: string;
  lg: string;
  xl: string;
}

export interface ThemeSpeeds {
  fastest: string;
  fast: string;
  normal: string;
  slow: string;
  slowest: string;
}

export interface Theme {
  name: string;
  colors: ThemeColors;
  typography: ThemeTypography;
  spacing: ThemeSpacing;
  radius: ThemeRadius;
  shadows: ThemeShadows;
  speeds: ThemeSpeeds;
}

/**
 * Brand-based theme generator configuration
 */
export interface ThemeConfig {
  primaryColor: string;
  secondaryColor?: string;
  accentColor?: string;
  mode?: ThemeMode;
  fontFamily?: {
    // Core fonts
    sans?: string;      // Primary sans-serif font (used for body text)
    display?: string;   // Display/heading font
    mono?: string;      // Monospace font (used for code)
    
    // Optional alternative fonts
    sansAlt?: string;   // Alternative sans-serif font
    serif?: string;     // Optional serif font
    serifAlt?: string;  // Optional alternative serif font
  };
  baseSpacing?: number;
  baseRadius?: number;
} 