import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const formSectionVariants = cva(
  "space-y-4",
  {
    variants: {
      // Size variants
      size: {
        sm: "space-y-3",
        md: "space-y-4",
        lg: "space-y-6",
      },
      // Visual variants
      variant: {
        default: "",
        subtle: "bg-subtle p-6 rounded-lg",
        muted: "bg-muted p-6 rounded-lg",
        inverse: "bg-inverse p-6 rounded-lg",
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

export interface FormSectionProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof formSectionVariants> {
  title?: string;
  description?: string;
  error?: string;
  required?: boolean;
}

const FormSection = React.forwardRef<HTMLDivElement, FormSectionProps>(
  ({ 
    className, 
    size, 
    variant, 
    border, 
    shadow, 
    container, 
    title,
    description,
    error,
    required,
    children,
    ...props 
  }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(formSectionVariants({ 
          size, 
          variant, 
          border, 
          shadow, 
          container, 
          className 
        }))}
        {...props}
      >
        {(title || description || error) && (
          <div className="space-y-2">
            {title && (
              <h3 className="text-base font-semibold leading-none">
                {title}
                {required && <span className="text-destructive ml-1">*</span>}
              </h3>
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

FormSection.displayName = "FormSection";

export { FormSection, formSectionVariants }; 