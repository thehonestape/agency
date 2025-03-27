import React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../../lib/utils";

const textVariants = cva("text-foreground", {
  variants: {
    size: {
      xs: "text-xs",
      sm: "text-sm",
      md: "text-base",
      lg: "text-lg",
      xl: "text-xl",
      "2xl": "text-2xl",
      "3xl": "text-3xl",
      "4xl": "text-4xl",
    },
    weight: {
      light: "font-light",
      normal: "font-normal",
      medium: "font-medium",
      semibold: "font-semibold",
      bold: "font-bold",
    },
    align: {
      left: "text-left",
      center: "text-center",
      right: "text-right",
      justify: "text-justify",
    },
    transform: {
      uppercase: "uppercase",
      lowercase: "lowercase",
      capitalize: "capitalize",
      normal: "normal-case",
    },
    variant: {
      default: "",
      muted: "text-muted-foreground",
      accent: "text-accent-foreground",
      success: "text-success-foreground",
      error: "text-destructive-foreground",
      warning: "text-warning-foreground",
      info: "text-info-foreground",
    },
    spacing: {
      normal: "tracking-normal",
      wide: "tracking-wide",
      wider: "tracking-wider",
      tight: "tracking-tight",
      tighter: "tracking-tighter",
    },
    lineHeight: {
      none: "leading-none",
      tight: "leading-tight",
      snug: "leading-snug",
      normal: "leading-normal",
      relaxed: "leading-relaxed",
      loose: "leading-loose",
    },
  },
  defaultVariants: {
    size: "md",
    weight: "normal",
    align: "left",
    variant: "default",
    spacing: "normal",
    lineHeight: "normal",
  },
});

export interface TextProps
  extends React.HTMLAttributes<HTMLParagraphElement>,
    VariantProps<typeof textVariants> {
  as?: React.ElementType;
}

export const Text = React.forwardRef<HTMLParagraphElement, TextProps>(
  (
    {
      className,
      size,
      weight,
      align,
      transform,
      variant,
      spacing,
      lineHeight,
      as: Component = "p",
      ...props
    },
    ref
  ) => {
    return (
      <Component
        className={cn(
          textVariants({
            size,
            weight,
            align,
            transform,
            variant,
            spacing,
            lineHeight,
            className,
          })
        )}
        ref={ref}
        {...props}
      />
    );
  }
);

Text.displayName = "Text";

export default Text; 