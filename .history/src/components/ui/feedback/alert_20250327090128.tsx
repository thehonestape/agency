import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const alertVariants = cva(
  "relative w-full rounded-lg border p-4 [&>svg~*]:pl-7 [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-foreground",
  {
    variants: {
      // Size variants
      size: {
        sm: "p-3 text-sm",
        md: "p-4 text-base",
        lg: "p-6 text-lg",
      },
      // State variants
      state: {
        default: "bg-background text-foreground",
        success: "bg-success/10 text-success border-success/20",
        error: "bg-error/10 text-error border-error/20",
        warning: "bg-warning/10 text-warning border-warning/20",
        info: "bg-info/10 text-info border-info/20",
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
      state: "default",
      variant: "default",
      border: "default",
      shadow: "none",
      container: false,
    },
  }
);

export interface AlertProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof alertVariants> {
  asChild?: boolean;
}

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  ({ 
    className, 
    size, 
    state, 
    variant, 
    border, 
    shadow, 
    container, 
    ...props 
  }, ref) => {
    return (
      <div
        ref={ref}
        role="alert"
        className={cn(
          alertVariants({ 
            size, 
            state, 
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

Alert.displayName = "Alert";

export { Alert, alertVariants }; 