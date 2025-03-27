import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { Base, baseVariants } from "./base";

const containerVariants = cva(
  "mx-auto",
  {
    variants: {
      // Size
      size: {
        sm: "max-w-sm",
        md: "max-w-md",
        lg: "max-w-lg",
        xl: "max-w-xl",
        "2xl": "max-w-2xl",
        full: "max-w-full",
      },
      // Padding
      padding: {
        none: "p-0",
        sm: "p-4 sm:p-6",
        md: "p-6 sm:p-8",
        lg: "p-8 sm:p-12",
        xl: "p-12 sm:p-16",
      },
      // Margin
      margin: {
        none: "m-0",
        sm: "m-4",
        md: "m-6",
        lg: "m-8",
        xl: "m-12",
      },
      // Background
      background: {
        default: "bg-default",
        subtle: "bg-subtle",
        muted: "bg-muted",
        inverse: "bg-inverse",
      },
      // Border
      border: {
        none: "border-0",
        subtle: "border border-subtle",
        default: "border border-default",
        strong: "border-2 border-default",
      },
      // Shadow
      shadow: {
        none: "shadow-none",
        sm: "shadow-sm",
        md: "shadow-md",
        lg: "shadow-lg",
        xl: "shadow-xl",
      },
      // Rounded corners
      rounded: {
        none: "rounded-none",
        sm: "rounded-sm",
        md: "rounded-md",
        lg: "rounded-lg",
        xl: "rounded-xl",
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

type BaseVariantProps = Omit<VariantProps<typeof baseVariants>, "display" | "background" | "margin" | "padding" | "border" | "shadow" | "rounded">;

export interface ContainerProps
  extends React.HTMLAttributes<HTMLDivElement>,
    BaseVariantProps,
    VariantProps<typeof containerVariants> {
  asChild?: boolean;
}

const Container = React.forwardRef<HTMLDivElement, ContainerProps>(
  ({ 
    className, 
    size, 
    padding, 
    margin, 
    background, 
    border, 
    shadow, 
    rounded, 
    asChild = false, 
    ...props 
  }, ref) => {
    return (
      <Base
        ref={ref}
        className={cn(
          containerVariants({ 
            size, 
            padding, 
            margin, 
            background, 
            border, 
            shadow, 
            rounded, 
            className 
          })
        )}
        {...props}
      />
    );
  }
);

Container.displayName = "Container";

export { Container, containerVariants }; 