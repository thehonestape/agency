/**
 * Tremor Theme Configuration
 * 
 * This file configures Tremor components to use our theme variables
 * instead of their default color system.
 */

export type TremorColor = 
  | 'primary' 
  | 'secondary' 
  | 'success' 
  | 'warning' 
  | 'destructive' 
  | 'info' 
  | 'muted';

// Maps Tailwind theme colors to Tremor colors
export const tremorColors: Record<TremorColor, string> = {
  primary: 'var(--primary)',
  secondary: 'var(--secondary)',
  success: 'var(--success)',
  warning: 'var(--warning)',
  destructive: 'var(--destructive)',
  info: 'var(--info)',
  muted: 'var(--muted)',
};

// Maps legacy color names to our theme colors
export const tremorColorMap: Record<string, TremorColor> = {
  // Tailwind v4 theme variables
  primary: 'primary',
  secondary: 'secondary',
  success: 'success',
  warning: 'warning',
  destructive: 'destructive',
  danger: 'destructive',
  info: 'info',
  muted: 'muted',
  
  // Tremor default colors
  amber: 'warning',
  blue: 'info',
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
};

// Simple utility to convert Tremor color to our theme color
export function mapTremorColor(color: string): TremorColor {
  return tremorColorMap[color] || 'primary';
}

// Function to get CSS variable value for a color
export function getTremorThemeColor(color: string): string {
  const mappedColor = mapTremorColor(color);
  return tremorColors[mappedColor];
}

// Default Tremor colors that match our theme
export const defaultTremorColors = {
  chart: ['primary', 'info', 'success', 'warning', 'destructive', 'muted'],
  bar: 'primary',
  donut: ['primary', 'info', 'success'],
  progress: 'primary',
}; 