import React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../../lib/utils";

const boxVariants = cva("", {
  variants: {
    padding: {
      none: "p-0",
      xs: "p-1",
      sm: "p-2",
      md: "p-4",
      lg: "p-6",
      xl: "p-8",
      "2xl": "p-10",
    },
    margin: {
      none: "m-0",
      xs: "m-1",
      sm: "m-2",
      md: "m-4",
      lg: "m-6",
      xl: "m-8",
      "2xl": "m-10",
    },
    rounded: {
      none: "rounded-none",
      sm: "rounded-sm",
      md: "rounded-md",
      lg: "rounded-lg",
      xl: "rounded-xl",
      "2xl": "rounded-2xl",
      full: "rounded-full",
    },
    shadow: {
      none: "shadow-none",
      sm: "shadow-sm",
      md: "shadow",
      lg: "shadow-md",
      xl: "shadow-lg",
      "2xl": "shadow-xl",
    },
    border: {
      none: "border-0",
      xs: "border",
      sm: "border-2",
      md: "border-4",
      lg: "border-8",
    },
    background: {
      transparent: "bg-transparent",
      base: "bg-[hsl(var(--background-base))]",
      subtle: "bg-[hsl(var(--background-subtle))]",
      muted: "bg-[hsl(var(--background-muted))]",
      emphasized: "bg-[hsl(var(--background-emphasized))]",
    },
  },
  defaultVariants: {
    padding: "none",
    margin: "none",
    rounded: "none",
    shadow: "none",
    border: "none",
    background: "transparent",
  },
});

export interface BoxProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof boxVariants> {
  as?: React.ElementType;
}

export const Box = React.forwardRef<HTMLDivElement, BoxProps>(
  (
    {
      className,
      as: Component = "div",
      padding,
      margin,
      rounded,
      shadow,
      border,
      background,
      ...props
    },
    ref
  ) => {
    return (
      <Component
        ref={ref}
        className={cn(
          boxVariants({
            padding,
            margin,
            rounded,
            shadow,
            border,
            background,
          }),
          className
        )}
        {...props}
      />
    );
  }
);

Box.displayName = "Box";

export default Box; 