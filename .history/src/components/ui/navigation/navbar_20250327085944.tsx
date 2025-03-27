import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const navbarVariants = cva(
  "flex h-16 w-full items-center justify-between border-b px-4",
  {
    variants: {
      // Size variants
      size: {
        sm: "h-12",
        md: "h-16",
        lg: "h-20",
      },
      // Position variants
      position: {
        static: "static",
        fixed: "fixed top-0 z-50",
        sticky: "sticky top-0 z-50",
      },
      // Visual variants
      variant: {
        default: "bg-background",
        subtle: "bg-subtle",
        muted: "bg-muted",
        inverse: "bg-inverse",
      },
      // Border variants
      border: {
        none: "border-0",
        subtle: "border-subtle",
        default: "border-default",
        strong: "border-2 border-default",
      },
      // Shadow variants
      shadow: {
        none: "shadow-none",
        sm: "shadow-sm",
        md: "shadow-md",
        lg: "shadow-lg",
      },
      // Container query support
      container: {
        true: "@container",
        false: "",
      },
    },
    defaultVariants: {
      size: "md",
      position: "static",
      variant: "default",
      border: "default",
      shadow: "none",
      container: false,
    },
  }
);

export interface NavbarProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof navbarVariants> {
  asChild?: boolean;
}

const Navbar = React.forwardRef<HTMLElement, NavbarProps>(
  ({ 
    className, 
    size, 
    position, 
    variant, 
    border, 
    shadow, 
    container, 
    ...props 
  }, ref) => {
    return (
      <nav
        ref={ref}
        className={cn(
          navbarVariants({ 
            size, 
            position, 
            variant, 
            border, 
            shadow, 
            container, 
            className 
          })
        )}
        {...props}
      />
    );
  }
);

Navbar.displayName = "Navbar";

export { Navbar, navbarVariants }; 