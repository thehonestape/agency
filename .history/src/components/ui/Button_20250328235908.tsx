import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';

const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 relative',
  {
    variants: {
      variant: {
        default:
          'bg-button-background text-button-text hover:bg-button-background/90 active:scale-[0.98] active:bg-button-background/95',
        destructive:
          'bg-destructive text-destructive-foreground hover:bg-destructive/90 active:scale-[0.98] active:bg-destructive/95',
        outline:
          'border border-input bg-background hover:bg-accent hover:text-accent-foreground active:scale-[0.98] active:bg-accent/95',
        secondary:
          'bg-secondary text-secondary-foreground hover:bg-secondary/80 active:scale-[0.98] active:bg-secondary/90',
        ghost:
          'hover:bg-accent hover:text-accent-foreground active:scale-[0.98] active:bg-accent/95',
        link: 'text-primary underline-offset-4 hover:underline active:text-primary/90',
        brand:
          'bg-button-background text-button-text hover:bg-button-background/90 active:scale-[0.98] active:bg-button-background/95',
        success:
          'bg-success text-success-foreground hover:bg-success/90 active:scale-[0.98] active:bg-success/95',
        warning:
          'bg-warning text-warning-foreground hover:bg-warning/90 active:scale-[0.98] active:bg-warning/95',
        info: 'bg-info text-info-foreground hover:bg-info/90 active:scale-[0.98] active:bg-info/95',
      },
      size: {
        default: 'h-10 px-4 py-2 min-w-[6rem]',
        sm: 'h-9 rounded-md px-3 text-xs min-w-[4.5rem]',
        lg: 'h-11 rounded-md px-8 text-base min-w-[8rem]',
        icon: 'h-10 w-10 min-w-0',
        mobile: 'h-12 px-5 py-3 min-w-[6rem] text-base', // Optimized for thumb zone on mobile
      },
      fullWidth: {
        true: 'w-full',
      },
      elevation: {
        flat: '',
        raised: 'shadow-sm',
        elevated: 'shadow-md',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
      fullWidth: false,
      elevation: 'flat',
    },
    compoundVariants: [],
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  fullWidth?: boolean;
  elevation?: 'flat' | 'raised' | 'elevated';
  loading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      elevation,
      fullWidth,
      asChild = false,
      loading,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, fullWidth, elevation, className }))}
        ref={ref}
        disabled={disabled || loading}
        aria-busy={loading}
        {...props}
      >
        {loading ? (
          <span className="flex items-center justify-center">
            <svg
              className="mr-2 -ml-1 h-4 w-4 animate-spin"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            {children}
          </span>
        ) : (
          children
        )}
      </Comp>
    );
  }
);
Button.displayName = 'Button';

export { Button, buttonVariants };
