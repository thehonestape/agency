import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const headingVariants = cva(
  "tracking-tight select-none",
  {
    variants: {
      variant: {
        h1: "text-4xl leading-tight font-bold text-default",
        h2: "text-3xl leading-snug font-semibold text-default",
        h3: "text-2xl leading-snug font-semibold text-default",
        h4: "text-xl leading-normal font-medium text-default",
        h5: "text-lg leading-normal font-medium text-default",
        h6: "text-base leading-normal font-medium text-default",
      },
      size: {
        xs: "text-xs leading-tight",
        sm: "text-sm leading-snug",
        base: "text-base leading-normal",
        lg: "text-lg leading-relaxed",
        xl: "text-xl leading-loose",
        "2xl": "text-2xl leading-tight",
        "3xl": "text-3xl leading-tight",
        "4xl": "text-4xl leading-tight",
      },
      state: {
        default: "",
        muted: "text-muted",
        disabled: "text-muted/50",
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
    const Component = variant as "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

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