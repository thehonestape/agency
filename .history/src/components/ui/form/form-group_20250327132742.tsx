import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const formGroupVariants = cva(
  "space-y-2",
  {
    variants: {
      // Size variants
      size: {
        sm: "space-y-1",
        md: "space-y-2",
        lg: "space-y-3",
      },
      // Visual variants
      variant: {
        default: "",
        subtle: "bg-subtle p-4 rounded-lg",
        muted: "bg-muted p-4 rounded-lg",
        inverse: "bg-inverse p-4 rounded-lg",
      },
      // Border variants
      border: {
        none: "",
        subtle: "border border-subtle",
        default: "border border-default",
        strong: "border-2 border-default",
      },
      // Shadow variants
      shadow: {
        none: "",
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
      variant: "default",
      border: "none",
      shadow: "none",
      container: false,
    },
  }
);

export interface FormGroupProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof formGroupVariants> {
  label?: string;
  description?: string;
  error?: string;
  required?: boolean;
}

const FormGroup = React.forwardRef<HTMLDivElement, FormGroupProps>(
  ({ 
    className, 
    size, 
    variant, 
    border, 
    shadow, 
    container, 
    label,
    description,
    error,
    required,
    children,
    ...props 
  }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(formGroupVariants({ 
          size, 
          variant, 
          border, 
          shadow, 
          container, 
          className 
        }))}
        {...props}
      >
        {(label || description || error) && (
          <div className="space-y-1">
            {label && (
              <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                {label}
                {required && <span className="text-destructive ml-1">*</span>}
              </label>
            )}
            {description && (
              <p className="text-sm text-muted-foreground">
                {description}
              </p>
            )}
            {error && (
              <p className="text-sm text-destructive">
                {error}
              </p>
            )}
          </div>
        )}
        {children}
      </div>
    );
  }
);

FormGroup.displayName = "FormGroup";

export { FormGroup, formGroupVariants }; 