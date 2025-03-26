import React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../../lib/utils";

const headingVariants = cva(
  "font-heading font-semibold tracking-tight text-foreground",
  {
    variants: {
      size: {
        h1: "text-4xl lg:text-5xl",
        h2: "text-3xl lg:text-4xl",
        h3: "text-2xl lg:text-3xl",
        h4: "text-xl lg:text-2xl",
        h5: "text-lg lg:text-xl",
        h6: "text-base lg:text-lg",
      },
      weight: {
        light: "font-light",
        normal: "font-normal",
        medium: "font-medium",
        semibold: "font-semibold",
        bold: "font-bold",
        extrabold: "font-extrabold",
      },
      align: {
        left: "text-left",
        center: "text-center",
        right: "text-right",
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
      },
      spacing: {
        normal: "tracking-tight",
        wide: "tracking-normal",
        wider: "tracking-wide",
        widest: "tracking-wider",
      },
    },
    defaultVariants: {
      size: "h1",
      weight: "semibold",
      align: "left",
      variant: "default",
      spacing: "normal",
    },
  }
);

// Define mapping between size and HTML element
const sizeElementMap = {
  h1: "h1",
  h2: "h2",
  h3: "h3",
  h4: "h4",
  h5: "h5",
  h6: "h6",
};

export interface HeadingProps
  extends React.HTMLAttributes<HTMLHeadingElement>,
    VariantProps<typeof headingVariants> {
  as?: React.ElementType;
}

export const Heading = React.forwardRef<HTMLHeadingElement, HeadingProps>(
  (
    {
      className,
      size = "h1",
      weight,
      align,
      transform,
      variant,
      spacing,
      as,
      ...props
    },
    ref
  ) => {
    // Determine element based on provided 'as' prop, or fallback to the element that matches the size
    const Component = as || sizeElementMap[size as keyof typeof sizeElementMap] || "h1";

    return (
      <Component
        className={cn(
          headingVariants({
            size,
            weight,
            align,
            transform,
            variant,
            spacing,
            className,
          })
        )}
        ref={ref}
        {...props}
      />
    );
  }
);

Heading.displayName = "Heading";

export default Heading; 