/**
 * UI Library exports for Tailwind v4 integration
 */

// Re-export utilities
export * from './theme-utils';
export { useUITheme } from './useUITheme';
export { themeVariants } from './component-factory';

// Also export the example component for reference
export * from './component-template';

/**
 * Usage guide:
 * 
 * 1. Import utilities as needed:
 *    import { cn, useUITheme, themeVariants } from '@/lib/ui';
 * 
 * 2. Use theme CSS variables in your components:
 *    <div className="bg-background text-foreground">
 * 
 * 3. Use the provided hooks and utilities for dynamic theme control:
 *    const theme = useUITheme();
 *    theme.toggleMode();
 * 
 * 4. Use themeVariants for consistent styling:
 *    import { cva } from 'class-variance-authority';
 *    
 *    const myComponentVariants = cva('base-classes', {
 *      variants: {
 *        intent: themeVariants.colorVariants,
 *        size: themeVariants.sizeVariants,
 *      },
 *      defaultVariants: {
 *        intent: 'default',
 *        size: 'md',
 *      }
 *    });
 */ 