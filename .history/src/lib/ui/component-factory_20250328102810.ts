import { ClassValue } from 'clsx';
import { cn } from './theme-utils';

/**
 * Common theme-aware variants for component reuse
 * These predefined variants ensure consistent use of theme variables
 * across all UI components
 */
export const themeVariants = {
  colorVariants: {
    default: 'bg-background text-foreground hover:bg-muted/50',
    primary: 'bg-primary text-primary-foreground hover:bg-primary/90',
    secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/90',
    accent: 'bg-accent text-accent-foreground hover:bg-accent/90',
    destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
    success: 'bg-success text-success-foreground hover:bg-success/90',
    warning: 'bg-warning text-warning-foreground hover:bg-warning/90',
    info: 'bg-info text-info-foreground hover:bg-info/90',
    muted: 'bg-muted text-muted-foreground hover:bg-muted/70',
    ghost: 'bg-transparent hover:bg-muted/50',
    link: 'bg-transparent text-primary underline-offset-4 hover:underline',
  },
  outlineVariants: {
    default: 'border border-input bg-background text-foreground hover:bg-muted/50',
    primary: 'border border-primary bg-background text-foreground hover:bg-primary/10',
    secondary: 'border border-secondary bg-background text-foreground hover:bg-secondary/10',
    destructive: 'border border-destructive bg-background text-foreground hover:bg-destructive/10',
  },
  sizeVariants: {
    xs: 'h-7 text-xs px-2.5 py-1.5 rounded-theme-sm',
    sm: 'h-8 text-sm px-3 py-2 rounded-theme-sm',
    md: 'h-10 px-4 py-2 rounded-theme',
    lg: 'h-12 px-6 py-3 rounded-theme-lg text-lg',
    xl: 'h-14 px-8 py-4 rounded-theme-lg text-xl',
  },
  radiusVariants: {
    none: 'rounded-none',
    sm: 'rounded-theme-sm',
    md: 'rounded-theme',
    lg: 'rounded-theme-lg',
    full: 'rounded-full',
  },
}; 