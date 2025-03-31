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
    sans: string;
    mono: string;
  };
  fontSize: {
    xs: [string, { lineHeight: string }];
    sm: [string, { lineHeight: string }];
    base: [string, { lineHeight: string }];
    lg: [string, { lineHeight: string }];
    xl: [string, { lineHeight: string }];
    '2xl': [string, { lineHeight: string }];
    '3xl': [string, { lineHeight: string }];
    '4xl': [string, { lineHeight: string }];
    '5xl': [string, { lineHeight: string }];
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

export interface ThemeConfig {
  primaryColor: string;
  secondaryColor?: string;
  accentColor?: string;
  mode?: ThemeMode;
  fontFamily?: {
    sans?: string;
    mono?: string;
  };
  baseSpacing?: number;
  baseRadius?: number;
} 