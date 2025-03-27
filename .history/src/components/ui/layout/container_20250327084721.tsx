import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const containerVariants = cva(
  "mx-auto w-full",
  {
    variants: {
      // Semantic size variants
      size: {
        xs: "max-w-screen-xs",
        sm: "max-w-screen-sm",
        md: "max-w-screen-md",
        lg: "max-w-screen-lg",
        xl: "max-w-screen-xl",
        "2xl": "max-w-screen-2xl",
        full: "max-w-full",
      },
      // Container query support
      container: {
        true: "@container",
        false: "",
      },
      // Responsive behavior
      responsive: {
        true: "px-4 sm:px-6 lg:px-8",
        false: "",
      },
      // Padding variants
      padding: {
        none: "",
        xs: "p-1",
        sm: "p-2",
        md: "p-4",
        lg: "p-6",
        xl: "p-8",
        "2xl": "p-12",
      },
      // Margin variants
      margin: {
        none: "",
        xs: "m-1",
        sm: "m-2",
        md: "m-4",
        lg: "m-6",
        xl: "m-8",
        "2xl": "m-12",
      },
      // Visual styling
      background: {
        default: "",
        subtle: "bg-background-subtle",
        muted: "bg-background-muted",
        inverse: "bg-background-inverse",
      },
      border: {
        none: "",
        subtle: "border border-border-subtle",
        default: "border border-border",
        strong: "border-2 border-border",
      },
      shadow: {
        none: "",
        subtle: "shadow-sm",
        default: "shadow",
        strong: "shadow-lg",
        inner: "shadow-inner",
        outline: "shadow-outline",
      },
      rounded: {
        none: "",
        sm: "rounded-sm",
        md: "rounded-md",
        lg: "rounded-lg",
        xl: "rounded-xl",
        full: "rounded-full",
      },
      // Overflow handling
      overflow: {
        visible: "overflow-visible",
        hidden: "overflow-hidden",
        scroll: "overflow-scroll",
        auto: "overflow-auto",
        clip: "overflow-clip",
      },
      // Position
      position: {
        static: "static",
        relative: "relative",
        absolute: "absolute",
        fixed: "fixed",
        sticky: "sticky",
      },
      // Z-index
      zIndex: {
        auto: "z-auto",
        base: "z-0",
        dropdown: "z-10",
        sticky: "z-20",
        fixed: "z-30",
        modal: "z-40",
        popover: "z-50",
        tooltip: "z-60",
      },
    },
    defaultVariants: {
      size: "lg",
      container: false,
      responsive: true,
      padding: "none",
      margin: "none",
      background: "default",
      border: "none",
      shadow: "none",
      rounded: "none",
      overflow: "visible",
      position: "static",
      zIndex: "auto",
    },
  }
);

export interface ContainerProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof containerVariants> {
  asChild?: boolean;
}

const Container = React.forwardRef<HTMLDivElement, ContainerProps>(
  ({ 
    className, 
    size, 
    container, 
    responsive, 
    padding, 
    margin, 
    background, 
    border, 
    shadow, 
    rounded, 
    overflow, 
    position, 
    zIndex, 
    asChild = false, 
    ...props 
  }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          containerVariants({ 
            size, 
            container, 
            responsive, 
            padding, 
            margin, 
            background, 
            border, 
            shadow, 
            rounded, 
            overflow, 
            position, 
            zIndex, 
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