import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

// Define button variants using cva
const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 relative",
  {
    variants: {
      variant: {
        default: "bg-secondary text-secondary-foreground hover:bg-secondary/90 active:bg-secondary/70",
        solid: "bg-primary text-primary-foreground hover:bg-primary/90 active:bg-primary/70",
        primary: "bg-primary text-primary-foreground hover:bg-primary/90 active:bg-primary/70",
        outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground active:bg-accent/80",
        ghost: "hover:bg-accent hover:text-accent-foreground active:bg-accent/80",
        link: "text-primary underline-offset-4 hover:underline active:text-primary/70",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80 active:bg-secondary/60",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90 active:bg-destructive/70",
        success: "bg-success text-success-foreground hover:bg-success/90 active:bg-success/80",
        warning: "bg-warning text-warning-foreground hover:bg-warning/90 active:bg-warning/80",
        info: "bg-info text-info-foreground hover:bg-info/90 active:bg-info/80",
      },
      size: {
        xs: "h-8 px-2 text-xs min-w-[4rem] rounded-sm",
        sm: "h-9 px-3 text-xs min-w-[4.5rem] rounded-md",
        md: "h-10 px-4 py-2 min-w-[6rem] rounded-md",
        lg: "h-11 px-6 text-base min-w-[8rem] rounded-md",
        xl: "h-12 px-8 text-lg min-w-[10rem] rounded-lg",
        icon: "h-10 w-10 p-0 min-w-0 rounded-md",
        default: "h-10 px-4 py-2 min-w-[6rem] rounded-md",
        mobile: "h-12 px-5 py-3 min-w-[6rem] text-base",
      },
      fullWidth: {
        true: "w-full",
      },
      shape: {
        default: "",
        circle: "rounded-full aspect-square p-0",
        square: "aspect-square p-0",
      },
      elevation: {
        flat: "",
        raised: "shadow-sm hover:shadow-md active:shadow-sm",
        elevated: "shadow-md hover:shadow-lg active:shadow-md",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
      fullWidth: false,
      elevation: "flat",
      shape: "default",
    },
  }
);

// Define types for the button variants
type ButtonVariant = 'primary' | 'secondary' | 'destructive' | 'outline' | 'ghost' | 'link' | 'success' | 'warning' | 'info' | 'default' | 'solid';
type ButtonSize = 'default' | 'sm' | 'lg' | 'icon' | 'mobile' | 'md' | 'xs' | 'xl';
type ButtonElevation = 'flat' | 'raised' | 'elevated';
type ButtonShape = 'default' | 'circle' | 'square';

// Define the props for the Button component
export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  // Legacy props
  loading?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
  elevation?: ButtonElevation;
  // Prop-based API
  isLoading?: boolean;
  isDisabled?: boolean;
  isFullWidth?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  colorScheme?: string;
  shape?: ButtonShape;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      // Common props
      className,
      asChild = false,
      children,
      
      // Legacy props (for backward compatibility)
      variant = 'primary',
      size = 'default',
      elevation = 'flat',
      fullWidth = false,
      loading,
      disabled,
      
      // Prop-based API (Chakra-like)
      colorScheme,
      isLoading = loading || false,
      isDisabled = disabled || false,
      isFullWidth = fullWidth,
      leftIcon,
      rightIcon,
      shape = "default",
      
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : 'button';
    
    // Ensure variant and size are valid
    const validVariant = (variant as ButtonVariant) || 'primary';
    const validSize = (size as ButtonSize) || 'default';
    
    // Generate appropriate classes
    const classes = cn(
      // Apply variant styling through buttonVariants
      buttonVariants({ 
        variant: validVariant, 
        size: validSize, 
        fullWidth: isFullWidth, 
        elevation: elevation as ButtonElevation,
        shape: shape as ButtonShape
      }),
      
      // Apply loading and disabled states
      isLoading && "opacity-80 cursor-wait",
      isDisabled && "opacity-50 cursor-not-allowed",
      
      // Apply custom classes
      className
    );
    
    return (
      <Comp
        className={classes}
        ref={ref}
        disabled={isDisabled || isLoading}
        aria-busy={isLoading}
        data-component="button"
        data-button-variant={variant}
        data-button-color-scheme={colorScheme}
        data-button-size={size}
        data-button-shape={shape}
        {...props}
      >
        {isLoading && (
          <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          </span>
        )}
        
        <span className={cn(
          "flex items-center gap-2",
          isLoading && "invisible"
        )}>
          {leftIcon && <span className="inline-flex">{leftIcon}</span>}
          {children}
          {rightIcon && <span className="inline-flex">{rightIcon}</span>}
        </span>
      </Comp>
    );
  }
);

Button.displayName = "Button";

export { Button, buttonVariants };
