import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const textVariants = cva(
  "leading-normal select-none",
  {
    variants: {
      variant: {
        body: "text-foreground",
        caption: "text-sm text-muted-foreground",
        label: "text-sm font-medium text-foreground",
        error: "text-destructive",
      },
      size: {
        xs: "text-xs",
        sm: "text-sm",
        base: "text-base",
        lg: "text-lg",
        xl: "text-xl",
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
        normal: "font-normal",
        medium: "font-medium",
        semibold: "font-semibold",
        bold: "font-bold",
      },
    },
    defaultVariants: {
      variant: "body",
      size: "base",
      state: "default",
      align: "left",
      weight: "normal",
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