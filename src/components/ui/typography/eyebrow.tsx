import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const eyebrowVariants = cva(
  "select-none font-[var(--font-maison-neue)] uppercase tracking-wider",
  {
    variants: {
      variant: {
        default: "text-foreground",
        muted: "text-muted-foreground",
        primary: "text-primary",
        error: "text-destructive",
        success: "text-success",
        warning: "text-warning",
        info: "text-info",
      },
      size: {
        xs: "text-xs text-fluid-xs leading-tight",
        sm: "text-sm text-fluid-sm leading-snug",
        base: "text-base text-fluid-base leading-normal",
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
      },
      weight: {
        regular: "font-normal",
        medium: "font-medium",
        semibold: "font-semibold",
        bold: "font-bold",
      },
      context: {
        page: "text-sm tracking-widest",
        card: "text-xs tracking-widest",
        list: "text-xs tracking-widest",
        default: "",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "xs",
      state: "default",
      align: "left",
      weight: "medium",
      context: "default",
    },
  }
);

export interface EyebrowProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof eyebrowVariants> {
  asChild?: boolean;
}

const Eyebrow = React.forwardRef<HTMLSpanElement, EyebrowProps>(
  ({ className, variant, size, state, align, weight, context, ...props }, ref) => {
    // Set size based on context if context is provided but size is not explicitly set
    const resolvedSize = size || (context === "page" ? "sm" : "xs");
    
    return (
      <span
        ref={ref}
        className={cn(eyebrowVariants({ 
          variant, 
          size: resolvedSize, 
          state, 
          align, 
          weight,
          context,
          className 
        }))}
        data-component="eyebrow"
        data-eyebrow-variant={variant}
        data-eyebrow-size={resolvedSize}
        data-eyebrow-state={state}
        data-eyebrow-context={context}
        {...props}
      />
    );
  }
);

Eyebrow.displayName = "Eyebrow";

export { Eyebrow, eyebrowVariants };
