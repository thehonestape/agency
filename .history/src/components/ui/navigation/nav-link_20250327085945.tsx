import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const navLinkVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      // Size variants
      size: {
        sm: "h-8 px-3 text-xs",
        md: "h-10 px-4 text-sm",
        lg: "h-12 px-6 text-base",
      },
      // State variants
      state: {
        default: "text-foreground hover:bg-accent hover:text-accent-foreground",
        active: "bg-accent text-accent-foreground",
        disabled: "text-muted-foreground cursor-not-allowed",
      },
      // Visual variants
      variant: {
        default: "bg-transparent",
        subtle: "bg-subtle hover:bg-subtle-hover",
        muted: "bg-muted hover:bg-muted-hover",
        inverse: "bg-inverse hover:bg-inverse-hover",
      },
      // Weight variants
      weight: {
        light: "font-light",
        normal: "font-normal",
        medium: "font-medium",
        semibold: "font-semibold",
        bold: "font-bold",
      },
      // Container query support
      container: {
        true: "@container",
        false: "",
      },
    },
    defaultVariants: {
      size: "md",
      state: "default",
      variant: "default",
      weight: "medium",
      container: false,
    },
  }
);

export interface NavLinkProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement>,
    VariantProps<typeof navLinkVariants> {
  asChild?: boolean;
}

const NavLink = React.forwardRef<HTMLAnchorElement, NavLinkProps>(
  ({ 
    className, 
    size, 
    state, 
    variant, 
    weight, 
    container, 
    ...props 
  }, ref) => {
    return (
      <a
        ref={ref}
        className={cn(
          navLinkVariants({ 
            size, 
            state, 
            variant, 
            weight, 
            container, 
            className 
          })
        )}
        {...props}
      />
    );
  }
);

NavLink.displayName = "NavLink";

export { NavLink, navLinkVariants }; 