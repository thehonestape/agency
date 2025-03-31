/**
 * Tremor Theme Configuration
 * 
 * This file configures Tremor components to use our theme variables
 * instead of their default color system.
 */

// Tremor accepts these specific color values
export type TremorColorValue = 
  | "slate" | "gray" | "zinc" | "neutral" | "stone" 
  | "red" | "orange" | "amber" | "yellow" | "lime" 
  | "green" | "emerald" | "teal" | "cyan" | "sky" 
  | "blue" | "indigo" | "violet" | "purple" 
  | "fuchsia" | "pink" | "rose";

// Our theme color system
export type ThemeColor = 
  | 'primary' 
  | 'secondary' 
  | 'success' 
  | 'warning' 
  | 'destructive' 
  | 'info' 
  | 'muted';

// Map our theme colors to Tremor's accepted colors
export const themeToTremorColors: Record<ThemeColor, TremorColorValue> = {
  primary: 'blue',
  secondary: 'slate',
  success: 'green',
  warning: 'amber',
  destructive: 'red',
  info: 'sky',
  muted: 'zinc',
};

// Maps legacy color names to our theme colors
export const colorNameToTheme: Record<string, ThemeColor> = {
  // Tailwind v4 theme variables
  primary: 'primary',
  secondary: 'secondary',
  success: 'success',
  warning: 'warning',
  destructive: 'destructive',
  danger: 'destructive',
  info: 'info',
  muted: 'muted',
  
  // Tremor default colors - map to our theme system
  amber: 'warning',
  blue: 'primary',
  cyan: 'info',
  emerald: 'success',
  fuchsia: 'primary',
  green: 'success',
  indigo: 'primary',
  lime: 'success',
  neutral: 'muted',
  orange: 'warning',
  pink: 'primary',
  purple: 'primary',
  red: 'destructive',
  rose: 'destructive',
  sky: 'info',
  slate: 'muted',
  stone: 'muted',
  teal: 'info',
  violet: 'primary',
  yellow: 'warning',
  zinc: 'muted',
  gray: 'muted',
};

/**
 * Converts any color name to a valid Tremor color
 */
export function getTremorColor(color: string): TremorColorValue {
  // If it's already a valid Tremor color, return it
  if (isTremorColor(color)) {
    return color;
  }
  
  // Map through our theme system
  const themeColor = colorNameToTheme[color] || 'primary';
  return themeToTremorColors[themeColor];
}

// Type guard for Tremor colors
function isTremorColor(color: string): color is TremorColorValue {
  const tremorColors: string[] = [
    "slate", "gray", "zinc", "neutral", "stone", 
    "red", "orange", "amber", "yellow", "lime", 
    "green", "emerald", "teal", "cyan", "sky", 
    "blue", "indigo", "violet", "purple", 
    "fuchsia", "pink", "rose"
  ];
  return tremorColors.includes(color);
}

// Default theme-based Tremor colors
export const defaultTremorColors = {
  // Map the colors through our system to ensure they're valid Tremor colors
  chart: [
    themeToTremorColors.primary,
    themeToTremorColors.info,
    themeToTremorColors.success,
    themeToTremorColors.warning,
    themeToTremorColors.destructive,
  ],
  bar: themeToTremorColors.primary,
  donut: [
    themeToTremorColors.primary,
    themeToTremorColors.info,
    themeToTremorColors.success
  ],
  progress: themeToTremorColors.primary,
}; 