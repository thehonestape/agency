import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const formGridVariants = cva(
  "grid gap-4",
  {
    variants: {
      // Size variants
      size: {
        sm: "gap-2",
        md: "gap-4",
        lg: "gap-6",
      },
      // Columns variants
      columns: {
        1: "grid-cols-1",
        2: "grid-cols-2",
        3: "grid-cols-3",
        4: "grid-cols-4",
        5: "grid-cols-5",
        6: "grid-cols-6",
      },
      // Responsive columns
      responsive: {
        true: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
        false: "",
      },
      // Container query support
      container: {
        true: "@container",
        false: "",
      },
    },
    defaultVariants: {
      size: "md",
      columns: 1,
      responsive: false,
      container: false,
    },
  }
);

export interface FormGridProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof formGridVariants> {
  label?: string;
  description?: string;
  error?: string;
  required?: boolean;
}

const FormGrid = React.forwardRef<HTMLDivElement, FormGridProps>(
  ({ 
    className, 
    size, 
    columns, 
    responsive, 
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
        className={cn(formGridVariants({ 
          size, 
          columns, 
          responsive, 
          container, 
          className 
        }))}
        {...props}
      >
        {(label || description || error) && (
          <div className="col-span-full space-y-1">
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

FormGrid.displayName = "FormGrid";

export { FormGrid, formGridVariants }; 