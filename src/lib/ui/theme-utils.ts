/**
 * Utility functions for working with Tailwind CSS v4 theme in UI components
 */
import { ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Merges class names with Tailwind's class merging
 * @example cn('bg-red-500', 'text-white', className)
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Type for all theme CSS variables available in the system
 * This provides type safety when using CSS variables
 */
export type ThemeVariable =
  | 'background'
  | 'foreground'
  | 'card'
  | 'card-foreground'
  | 'popover'
  | 'popover-foreground'
  | 'primary'
  | 'primary-foreground'
  | 'secondary'
  | 'secondary-foreground'
  | 'accent'
  | 'accent-foreground'
  | 'muted'
  | 'muted-foreground'
  | 'destructive'
  | 'destructive-foreground'
  | 'success'
  | 'success-foreground'
  | 'warning'
  | 'warning-foreground'
  | 'info'
  | 'info-foreground'
  | 'border'
  | 'input'
  | 'ring'
  | 'radius';

/**
 * Gets a CSS variable by name
 * @example const bgColor = getCssVar('background');
 * @returns CSS variable value
 */
export function getCssVar(name: ThemeVariable): string {
  if (typeof window === 'undefined') return '';
  return getComputedStyle(document.documentElement).getPropertyValue(`--${name}`);
}

/**
 * Gets all available theme CSS variables
 * @returns Object with all CSS variables
 */
export function getAllThemeVars(): Record<ThemeVariable, string> {
  const vars: Partial<Record<ThemeVariable, string>> = {};
  
  if (typeof window === 'undefined') return {} as Record<ThemeVariable, string>;
  
  const style = getComputedStyle(document.documentElement);
  const themeVars = [
    'background', 'foreground', 'card', 'card-foreground',
    'popover', 'popover-foreground', 'primary', 'primary-foreground',
    'secondary', 'secondary-foreground', 'accent', 'accent-foreground',
    'muted', 'muted-foreground', 'destructive', 'destructive-foreground',
    'success', 'success-foreground', 'warning', 'warning-foreground',
    'info', 'info-foreground', 'border', 'input', 'ring', 'radius'
  ] as ThemeVariable[];
  
  themeVars.forEach(name => {
    vars[name] = style.getPropertyValue(`--${name}`);
  });
  
  return vars as Record<ThemeVariable, string>;
}

/**
 * Gets the current theme mode
 * @returns 'light' | 'dark'
 */
export function getThemeMode(): 'light' | 'dark' {
  if (typeof window === 'undefined') return 'light';
  return document.documentElement.classList.contains('dark') ? 'dark' : 'light';
}

/**
 * Builds background and text class names based on variant
 * Used to simplify creating component variants
 */
export function getVariantClasses(
  variant: 'default' | 'primary' | 'secondary' | 'accent' | 'destructive' | 'success' | 'warning' | 'info' = 'default'
): { bg: string; text: string; hover: string } {
  switch (variant) {
    case 'primary':
      return {
        bg: 'bg-primary',
        text: 'text-primary-foreground',
        hover: 'hover:bg-primary/90',
      };
    case 'secondary':
      return {
        bg: 'bg-secondary',
        text: 'text-secondary-foreground',
        hover: 'hover:bg-secondary/90',
      };
    case 'accent':
      return {
        bg: 'bg-accent',
        text: 'text-accent-foreground',
        hover: 'hover:bg-accent/90',
      };
    case 'destructive':
      return {
        bg: 'bg-destructive',
        text: 'text-destructive-foreground',
        hover: 'hover:bg-destructive/90',
      };
    case 'success':
      return {
        bg: 'bg-success',
        text: 'text-success-foreground',
        hover: 'hover:bg-success/90',
      };
    case 'warning':
      return {
        bg: 'bg-warning',
        text: 'text-warning-foreground',
        hover: 'hover:bg-warning/90',
      };
    case 'info':
      return {
        bg: 'bg-info',
        text: 'text-info-foreground',
        hover: 'hover:bg-info/90',
      };
    default:
      return {
        bg: 'bg-background',
        text: 'text-foreground',
        hover: 'hover:bg-muted/50',
      };
  }
}

/**
 * Creates an inline style object with CSS variables
 * Useful for dynamic styles that can't be achieved with classes alone
 */
export function createThemeStyle(styles: Partial<Record<ThemeVariable, string>>): React.CSSProperties {
  return Object.entries(styles).reduce((acc, [key, value]) => {
    acc[`--${key}`] = value;
    return acc;
  }, {} as Record<string, string>) as React.CSSProperties;
} 