import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const formRowVariants = cva(
  "flex gap-4",
  {
    variants: {
      // Size variants
      size: {
        sm: "gap-2",
        md: "gap-4",
        lg: "gap-6",
      },
      // Alignment variants
      align: {
        start: "items-start",
        center: "items-center",
        end: "items-end",
      },
      // Justify variants
      justify: {
        start: "justify-start",
        center: "justify-center",
        end: "justify-end",
        between: "justify-between",
      },
      // Wrap variants
      wrap: {
        true: "flex-wrap",
        false: "flex-nowrap",
      },
      // Container query support
      container: {
        true: "@container",
        false: "",
      },
    },
    defaultVariants: {
      size: "md",
      align: "start",
      justify: "start",
      wrap: false,
      container: false,
    },
  }
);

export interface FormRowProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof formRowVariants> {
  label?: string;
  description?: string;
  error?: string;
  required?: boolean;
}

const FormRow = React.forwardRef<HTMLDivElement, FormRowProps>(
  ({ 
    className, 
    size, 
    align, 
    justify, 
    wrap, 
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
        className={cn(formRowVariants({ 
          size, 
          align, 
          justify, 
          wrap, 
          container, 
          className 
        }))}
        {...props}
      >
        {(label || description || error) && (
          <div className="min-w-[200px] space-y-1">
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
        <div className="flex-1">
          {children}
        </div>
      </div>
    );
  }
);

FormRow.displayName = "FormRow";

export { FormRow, formRowVariants }; 