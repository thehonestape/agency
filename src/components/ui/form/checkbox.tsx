import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

const checkboxVariants = cva(
  "relative flex h-4 w-4 shrink-0 items-center justify-center rounded-sm border border-input bg-background ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground",
  {
    variants: {
      // Size variants
      size: {
        sm: "h-3 w-3",
        md: "h-4 w-4",
        lg: "h-5 w-5",
      },
      // State variants
      state: {
        default: "",
        error: "border-error focus-visible:ring-error",
        success: "border-success focus-visible:ring-success",
        warning: "border-warning focus-visible:ring-warning",
        info: "border-info focus-visible:ring-info",
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
      // Rounded variants
      rounded: {
        none: "rounded-none",
        sm: "rounded-sm",
        md: "rounded-md",
        lg: "rounded-lg",
        full: "rounded-full",
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
      rounded: "sm",
      container: false,
    },
  }
);

export interface CheckboxProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type" | "size">,
    VariantProps<typeof checkboxVariants> {
  asChild?: boolean;
  label?: string;
  description?: string;
  error?: string;
}

const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ 
    className, 
    size, 
    state, 
    variant, 
    border, 
    rounded, 
    container, 
    label,
    description,
    error,
    ...props 
  }, ref) => {
    return (
      <div className="flex items-start space-x-2">
        <div className="relative flex h-4 w-4 shrink-0 items-center justify-center">
          <input
            type="checkbox"
            ref={ref}
            className={cn(
              checkboxVariants({ 
                size, 
                state, 
                variant, 
                border, 
                rounded, 
                container, 
                className 
              })
            )}
            {...props}
          />
          <Check className="h-3 w-3 text-primary-foreground opacity-0 data-[state=checked]:opacity-100" />
        </div>
        {(label || description || error) && (
          <div className="space-y-1">
            {label && (
              <label
                htmlFor={props.id}
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {label}
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
      </div>
    );
  }
);

Checkbox.displayName = "Checkbox";

const CheckboxGroup = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    label?: string;
    description?: string;
    error?: string;
  }
>(({ className, label, description, error, children, ...props }, ref) => (
  <div ref={ref} className={cn("space-y-2", className)} {...props}>
    {(label || description || error) && (
      <div className="space-y-1">
        {label && (
          <label className="text-sm font-medium leading-none">
            {label}
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
    <div className="space-y-2">
      {children}
    </div>
  </div>
));

CheckboxGroup.displayName = "CheckboxGroup";

export { Checkbox, CheckboxGroup, checkboxVariants }; 