import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const labelVariants = cva(
  "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
  {
    variants: {
      // Size variants
      size: {
        xs: "text-xs",
        sm: "text-sm",
        md: "text-base",
        lg: "text-lg",
      },
      // Weight variants
      weight: {
        light: "font-light",
        normal: "font-normal",
        medium: "font-medium",
        semibold: "font-semibold",
        bold: "font-bold",
      },
      // Color variants
      textColor: {
        default: "text-foreground",
        muted: "text-muted-foreground",
        primary: "text-primary",
        secondary: "text-secondary",
        success: "text-success",
        error: "text-error",
        warning: "text-warning",
        info: "text-info",
      },
      // Container query support
      container: {
        true: "@container",
        false: "",
      },
    },
    defaultVariants: {
      size: "sm",
      weight: "medium",
      textColor: "default",
      container: false,
    },
  }
);

export interface LabelProps
  extends Omit<React.LabelHTMLAttributes<HTMLLabelElement>, "color">,
    VariantProps<typeof labelVariants> {
  asChild?: boolean;
}

const Label = React.forwardRef<HTMLLabelElement, LabelProps>(
  ({ 
    className, 
    size, 
    weight, 
    textColor, 
    container, 
    ...props 
  }, ref) => {
    return (
      <label
        ref={ref}
        className={cn(
          labelVariants({ 
            size, 
            weight, 
            textColor, 
            container, 
            className 
          })
        )}
        {...props}
      />
    );
  }
);

Label.displayName = "Label";

export { Label, labelVariants }; 