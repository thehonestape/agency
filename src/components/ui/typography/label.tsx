import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const textLabelVariants = cva(
  "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
  {
    variants: {
      variant: {
        default: "text-foreground",
        muted: "text-muted-foreground",
        error: "text-destructive",
        success: "text-success",
      },
      size: {
        xs: "text-xs",
        sm: "text-sm",
        base: "text-base",
      },
      weight: {
        regular: "font-normal",
        medium: "font-medium",
        semibold: "font-semibold",
        bold: "font-bold",
      },
      required: {
        true: "after:content-['*'] after:ml-0.5 after:text-destructive",
        false: "",
      },
      spacing: {
        none: "mb-0",
        xs: "mb-1", // 4px
        sm: "mb-2", // 8px
        md: "mb-3", // 12px
      },
    },
    defaultVariants: {
      variant: "default",
      size: "sm",
      weight: "medium",
      required: false,
      spacing: "sm",
    },
  }
);

export interface TextLabelProps
  extends React.LabelHTMLAttributes<HTMLLabelElement>,
    VariantProps<typeof textLabelVariants> {
  asChild?: boolean;
}

const TextLabel = React.forwardRef<HTMLLabelElement, TextLabelProps>(
  ({ 
    className, 
    variant, 
    size, 
    weight, 
    required, 
    spacing,
    htmlFor,
    asChild = false, 
    ...props 
  }, ref) => {
    return (
      <label
        ref={ref}
        htmlFor={htmlFor}
        className={cn(textLabelVariants({ 
          variant, 
          size, 
          weight, 
          required, 
          spacing,
          className 
        }))}
        data-component="text-label"
        data-text-label-variant={variant}
        data-text-label-size={size}
        data-text-label-weight={weight}
        data-text-label-required={required}
        data-text-label-spacing={spacing}
        {...props}
      />
    );
  }
);

TextLabel.displayName = "TextLabel";

export { TextLabel, textLabelVariants };
