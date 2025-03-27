import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const inputVariants = cva(
  "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      // Size variants
      size: {
        sm: "h-8 px-2 text-xs",
        md: "h-10 px-3 text-sm",
        lg: "h-12 px-4 text-base",
      },
      // State variants
      state: {
        default: "",
        error: "border-error focus-visible:ring-error",
        success: "border-success focus-visible:ring-success",
        warning: "border-warning focus-visible:ring-warning",
      },
      // Visual variants
      variant: {
        default: "bg-background",
        subtle: "bg-subtle",
        muted: "bg-muted",
        inverse: "bg-inverse",
      },
      // Border variants
      border: {
        none: "border-0",
        subtle: "border-subtle",
        default: "border-default",
        strong: "border-2 border-default",
      },
      // Shadow variants
      shadow: {
        none: "shadow-none",
        sm: "shadow-sm",
        md: "shadow-md",
        lg: "shadow-lg",
      },
      // Rounded variants
      rounded: {
        none: "rounded-none",
        sm: "rounded-sm",
        md: "rounded-md",
        lg: "rounded-lg",
        xl: "rounded-xl",
        full: "rounded-full",
      },
      // Container query support
      container: {
        true: "@container",
        false: "",
      },
    },
    defaultVariants: {
      size: "md",
      state: "default",
      variant: "default",
      border: "default",
      shadow: "none",
      rounded: "md",
      container: false,
    },
  }
);

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof inputVariants> {
  asChild?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ 
    className, 
    type, 
    size, 
    state, 
    variant, 
    border, 
    shadow, 
    rounded, 
    container, 
    ...props 
  }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          inputVariants({ 
            size, 
            state, 
            variant, 
            border, 
            shadow, 
            rounded, 
            container, 
            className 
          })
        )}
        ref={ref}
        {...props}
      />
    );
  }
);

Input.displayName = "Input";

export { Input, inputVariants }; 