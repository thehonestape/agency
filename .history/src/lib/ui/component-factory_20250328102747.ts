import { cva, type VariantProps, type ClassValue as CVAClassValue } from 'class-variance-authority';
import { ClassValue } from 'clsx';
import { cn } from './theme-utils';

/**
 * A factory function to create consistent Tailwind v4 components
 * This provides a standardized way to build components that respect our theme variables
 */

type VariantMap = Record<
  string,
  Record<string, string | Record<string, string | boolean>>
>;

type ComponentMeta<T extends string, V> = {
  name: T;
  defaultProps?: Partial<Record<keyof V, string>>;
  description?: string;
};

/**
 * Creates a themed component API with proper type safety
 * Based on class-variance-authority but with added theme helpers
 */
export function createThemedComponent<
  ComponentName extends string,
  VariantNames extends string,
  Variants extends Record<VariantNames, Record<string, string>>
>(
  componentName: ComponentName,
  baseStyles: ClassValue,
  variants: Variants,
  defaultVariants: Partial<Record<keyof Variants, string>> = {}
) {
  // Create the class variance authority function
  const componentVariants = cva(baseStyles, {
    variants,
    defaultVariants,
  });

  // Create component meta information
  const meta: ComponentMeta<ComponentName, typeof variants> = {
    name: componentName,
    defaultProps: defaultVariants,
    description: `${componentName} component with theme support`,
  };

  // Return the factory result
  return {
    meta,
    variants: componentVariants,
    cn,
    cx: componentVariants,
    getVariantStyles: (variantProps: Partial<VariantProps<typeof componentVariants>>) => {
      return componentVariants(variantProps);
    },
  };
}

/**
 * Example usage:
 * 
 * ```tsx
 * const button = createThemedComponent(
 *   'Button',
 *   'rounded-theme inline-flex items-center justify-center',
 *   {
 *     intent: {
 *       primary: 'bg-primary text-primary-foreground',
 *       secondary: 'bg-secondary text-secondary-foreground',
 *     },
 *     size: {
 *       sm: 'h-8 px-3 text-sm',
 *       md: 'h-10 px-4',
 *     }
 *   },
 *   {
 *     intent: 'primary',
 *     size: 'md',
 *   }
 * );
 * 
 * // In your component:
 * return (
 *   <button 
 *     className={button.getVariantStyles({ 
 *       intent: props.intent, 
 *       size: props.size 
 *     })}
 *   >
 *     {children}
 *   </button>
 * )
 * ```
 */

/**
 * Common theme-aware variants for component reuse
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