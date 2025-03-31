import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from './theme-utils';
import { useUITheme } from './useUITheme';

/**
 * Example component that demonstrates best practices for using Tailwind v4 with our theme system
 */

// Define variants using cva with CSS variables
const exampleComponentVariants = cva(
  // Base styles using theme variables via utility classes
  'rounded-theme border transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
  {
    variants: {
      variant: {
        // Use theme CSS variables for all colors
        default: 'bg-background text-foreground border-border hover:bg-muted',
        primary: 'bg-primary text-primary-foreground border-primary hover:bg-primary/90',
        secondary: 'bg-secondary text-secondary-foreground border-secondary hover:bg-secondary/90',
        destructive: 'bg-destructive text-destructive-foreground border-destructive hover:bg-destructive/90',
        success: 'bg-success text-success-foreground border-success hover:bg-success/90',
        outline: 'bg-background text-foreground border-input hover:bg-muted',
      },
      size: {
        sm: 'h-8 px-3 py-1 text-sm',
        md: 'h-10 px-4 py-2',
        lg: 'h-12 px-6 py-3 text-lg',
      },
      rounded: {
        default: 'rounded-theme',
        full: 'rounded-full',
        none: 'rounded-none',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
      rounded: 'default',
    },
  }
);

// TypeScript interface for component props
export interface ExampleComponentProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof exampleComponentVariants> {
  label?: string;
  description?: string;
  icon?: React.ReactNode;
  active?: boolean;
}

// Component implementation using the defined variants
export function ExampleComponent({
  className,
  variant,
  size,
  rounded,
  label,
  description,
  icon,
  active,
  ...props
}: ExampleComponentProps) {
  // Use our custom hook to access theme utilities
  const theme = useUITheme();
  
  // Example of dynamic class name based on active state
  const activeClass = active 
    ? 'ring-2 ring-primary'
    : '';
  
  return (
    <div
      className={cn(
        exampleComponentVariants({ variant, size, rounded }),
        activeClass,
        className
      )}
      {...props}
    >
      <div className="flex items-center gap-3 p-2">
        {icon && (
          <div className="flex-shrink-0">
            {icon}
          </div>
        )}
        <div className="flex flex-col">
          {label && (
            <div className="font-medium leading-none">{label}</div>
          )}
          {description && (
            <div className="text-muted-foreground text-sm">{description}</div>
          )}
        </div>
      </div>
      
      {/* Example of using the theme hook */}
      <div className="p-2 text-xs">
        Current theme mode: {theme.mode}
      </div>
      
      {/* Example of theme toggle button */}
      <button 
        onClick={theme.toggleMode}
        className="mt-2 rounded-theme-sm bg-primary px-3 py-1 text-xs text-primary-foreground"
      >
        Toggle theme
      </button>
    </div>
  );
}

/**
 * Usage example:
 * 
 * ```tsx
 * <ExampleComponent 
 *   variant="primary"
 *   size="md"
 *   label="Example Component"
 *   description="This demonstrates proper Tailwind v4 usage"
 *   icon={<Icon />}
 * />
 * ```
 */ 