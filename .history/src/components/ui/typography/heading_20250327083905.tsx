import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const headingVariants = cva(
  "leading-tight tracking-tight select-none",
  {
    variants: {
      variant: {
        h1: "text-4xl font-bold text-foreground",
        h2: "text-3xl font-semibold text-foreground",
        h3: "text-2xl font-semibold text-foreground",
        h4: "text-xl font-medium text-foreground",
        h5: "text-lg font-medium text-foreground",
        h6: "text-base font-medium text-foreground",
      },
      size: {
        xs: "text-xs",
        sm: "text-sm",
        base: "text-base",
        lg: "text-lg",
        xl: "text-xl",
        "2xl": "text-2xl",
        "3xl": "text-3xl",
        "4xl": "text-4xl",
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
        normal: "font-normal",
        medium: "font-medium",
        semibold: "font-semibold",
        bold: "font-bold",
      },
    },
    defaultVariants: {
      variant: "h1",
      size: "2xl",
      state: "default",
      align: "left",
      weight: "bold",
    },
  }
);

export interface HeadingProps
  extends React.HTMLAttributes<HTMLHeadingElement>,
    VariantProps<typeof headingVariants> {
  asChild?: boolean;
}

const Heading = React.forwardRef<HTMLHeadingElement, HeadingProps>(
  ({ className, variant = "h1", size, state, align, weight, asChild = false, ...props }, ref) => {
    const Component = variant;

    return (
      <Component
        ref={ref}
        className={cn(headingVariants({ variant, size, state, align, weight, className }))}
        {...props}
      />
    );
  }
);

Heading.displayName = "Heading";

export { Heading, headingVariants }; 