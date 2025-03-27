import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const containerVariants = cva(
  "mx-auto w-full",
  {
    variants: {
      // Semantic size variants
      size: {
        sm: "max-w-screen-sm",
        md: "max-w-screen-md",
        lg: "max-w-screen-lg",
        xl: "max-w-screen-xl",
        "2xl": "max-w-screen-2xl",
        full: "max-w-full",
      },
      // Padding variants
      padding: {
        none: "p-0",
        sm: "px-4 sm:px-6",
        md: "px-6 sm:px-8",
        lg: "px-8 sm:px-12",
        xl: "px-12 sm:px-16",
      },
      // Margin variants
      margin: {
        none: "m-0",
        sm: "my-4",
        md: "my-8",
        lg: "my-12",
        xl: "my-16",
      },
      // Background variants
      background: {
        default: "",
        subtle: "bg-background-subtle",
        muted: "bg-background-muted",
        inverse: "bg-background-inverse",
      },
      // Border variants
      border: {
        none: "",
        subtle: "border border-border-subtle",
        default: "border border-border",
        strong: "border-2 border-border",
      },
      // Shadow variants
      shadow: {
        none: "",
        sm: "shadow-sm",
        md: "shadow-md",
        lg: "shadow-lg",
      },
      // Rounded corners
      rounded: {
        none: "",
        sm: "rounded-sm",
        md: "rounded-md",
        lg: "rounded-lg",
        xl: "rounded-xl",
        full: "rounded-full",
      },
    },
    defaultVariants: {
      size: "lg",
      padding: "sm",
      margin: "none",
      background: "default",
      border: "none",
      shadow: "none",
      rounded: "none",
    },
  }
);

export interface ContainerProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof containerVariants> {
  asChild?: boolean;
}

const Container = React.forwardRef<HTMLDivElement, ContainerProps>(
  ({ className, size, padding, margin, background, border, shadow, rounded, asChild = false, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(containerVariants({ size, padding, margin, background, border, shadow, rounded, className }))}
        {...props}
      />
    );
  }
);

Container.displayName = "Container";

export { Container, containerVariants }; 