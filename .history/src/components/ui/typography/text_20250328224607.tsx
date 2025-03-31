import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { fontVariables } from "@/fonts";

const textVariants = cva(
  "select-none font-[var(--font-maison-neue)]",
  {
    variants: {
      variant: {
        default: "text-default",
        muted: "text-muted",
        error: "text-error",
        success: "text-success",
        warning: "text-warning",
        info: "text-info",
      },
      size: {
        xs: "text-xs leading-tight",
        sm: "text-sm leading-snug",
        base: "text-base leading-normal",
        lg: "text-lg leading-relaxed",
        xl: "text-xl leading-loose",
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
        justify: "text-justify",
      },
      weight: {
        regular: "font-normal",
        medium: "font-medium",
        semibold: "font-semibold",
        bold: "font-bold",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "base",
      state: "default",
      align: "left",
      weight: "regular",
    },
  }
);

export interface TextProps
  extends React.HTMLAttributes<HTMLParagraphElement>,
    VariantProps<typeof textVariants> {
  asChild?: boolean;
}

const Text = React.forwardRef<HTMLParagraphElement, TextProps>(
  ({ className, variant, size, state, align, weight, asChild = false, ...props }, ref) => {
    return (
      <p
        ref={ref}
        className={cn(textVariants({ variant, size, state, align, weight, className }))}
        {...props}
      />
    );
  }
);

Text.displayName = "Text";

export { Text, textVariants }; 