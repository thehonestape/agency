import React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../../lib/utils";

const containerVariants = cva("mx-auto px-4 md:px-6 w-full", {
  variants: {
    size: {
      xs: "max-w-xs",
      sm: "max-w-sm",
      md: "max-w-md",
      lg: "max-w-lg",
      xl: "max-w-xl",
      "2xl": "max-w-2xl",
      "3xl": "max-w-3xl",
      "4xl": "max-w-4xl",
      "5xl": "max-w-5xl",
      "6xl": "max-w-6xl",
      "7xl": "max-w-7xl",
      full: "max-w-full",
      prose: "max-w-prose",
      none: "",
    },
    padding: {
      none: "px-0 md:px-0",
      xs: "px-1 md:px-2",
      sm: "px-2 md:px-3",
      md: "px-4 md:px-6",
      lg: "px-6 md:px-8",
      xl: "px-8 md:px-10",
      "2xl": "px-10 md:px-12",
    },
    centered: {
      true: "mx-auto",
      false: "mx-0",
    },
  },
  defaultVariants: {
    size: "5xl",
    padding: "md",
    centered: true,
  },
});

export interface ContainerProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof containerVariants> {}

const Container = React.forwardRef<HTMLDivElement, ContainerProps>(
  ({ className, size, padding, centered, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          containerVariants({
            size,
            padding,
            centered,
          }),
          className
        )}
        {...props}
      />
    );
  }
);

Container.displayName = "Container";

export { Container };
export default Container; 