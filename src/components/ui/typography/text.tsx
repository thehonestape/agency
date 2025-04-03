import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const textVariants = cva(
  "select-none font-[var(--font-maison-neue)]",
  {
    variants: {
      variant: {
        body: "text-base leading-normal",
        bodyLarge: "text-lg leading-relaxed",
        bodySmall: "text-sm leading-snug",
        caption: "text-xs leading-tight",
        overline: "text-xs uppercase tracking-wider",
        default: "text-foreground",
        muted: "text-muted-foreground",
        error: "text-destructive",
        success: "text-success",
        warning: "text-warning",
        info: "text-info",
      },
      size: {
        xs: "text-xs text-fluid-xs leading-tight",
        sm: "text-sm text-fluid-sm leading-snug",
        base: "text-base text-fluid-base leading-normal",
        lg: "text-lg text-fluid-lg leading-relaxed",
        xl: "text-xl text-fluid-xl leading-loose",
      },
      state: {
        default: "",
        muted: "text-muted-foreground",
        disabled: "text-muted-foreground/50",
      },
      align: {
        left: "text-left",
        center: "text-center",
        right: "text-right",
        justify: "text-justify",
      },
      weight: {
        regular: "font-normal",
        medium: "font-medium",
        semibold: "font-semibold",
        bold: "font-bold",
      },
      truncate: {
        true: "truncate",
        false: "",
      },
    },
    defaultVariants: {
      variant: "body",
      size: "base",
      state: "default",
      align: "left",
      weight: "regular",
      truncate: false,
    },
  }
);

export interface TextProps
  extends React.HTMLAttributes<HTMLParagraphElement>,
    VariantProps<typeof textVariants> {
  asChild?: boolean;
  as?: React.ElementType;
}

const Text = React.forwardRef<HTMLParagraphElement, TextProps>(
  ({ className, variant, size, state, align, weight, truncate, asChild = false, as: Component = "p", ...props }, ref) => {
    const getDefaultSize = () => {
      if (size) return size;
      
      switch (variant) {
        case 'bodyLarge': return 'lg';
        case 'bodySmall': return 'sm';
        case 'caption': return 'xs';
        case 'overline': return 'xs';
        default: return 'base';
      }
    };

    const resolvedSize = getDefaultSize();

    return (
      <Component
        ref={ref}
        className={cn(textVariants({ 
          variant, 
          size: resolvedSize, 
          state, 
          align, 
          weight,
          truncate,
          className 
        }))}
        data-component="text"
        data-text-variant={variant}
        data-text-size={resolvedSize}
        data-text-state={state}
        data-text-align={align}
        data-text-weight={weight}
        data-text-truncate={truncate}
        {...props}
      />
    );
  }
);

Text.displayName = "Text";

export { Text, textVariants };