/**
 * Theme interface defining the structure of our theme objects
 */
export interface Theme {
  name: string;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    text: string;
    muted: string;
    border: string;
    danger: string;
    success: string;
    warning: string;
    info: string;
    [key: string]: string;
  };
  radius: {
    sm: string;
    md: string;
    lg: string;
    xl: string;
    full: string;
    [key: string]: string;
  };
  fonts: {
    heading: string;
    body: string;
    mono: string;
    [key: string]: string;
  };
  spacing: {
    xxs: string;
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
    xxl: string;
    [key: string]: string;
  };
  shadows: {
    sm: string;
    md: string;
    lg: string;
    xl: string;
    [key: string]: string;
  };
  [key: string]: any;
}

/**
 * Theme context value interface
 */
export interface ThemeContextValue {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  availableThemes: Theme[];
  isDark: boolean;
  setMode: (mode: ThemeMode) => void;
  mode: ThemeMode;
}

/**
 * Theme mode type
 */
export type ThemeMode = 'light' | 'dark' | 'system';

/**
 * Theme provider props interface
 */
export interface ThemeProviderProps {
  children: React.ReactNode;
  defaultTheme?: Theme;
  defaultMode?: ThemeMode;
  themes?: Theme[];
}

/**
 * Brand-based theme generator configuration
 */
export interface ThemeGeneratorConfig {
  primaryColor: string;
  mode?: ThemeMode;
  typography?: {
    headingFont?: string;
    bodyFont?: string;
    baseSize?: number;
    scale?: number;
  };
  spacing?: {
    baseUnit?: number;
    density?: 'compact' | 'comfortable' | 'spacious';
  };
  radius?: {
    base?: number;
  };
} 