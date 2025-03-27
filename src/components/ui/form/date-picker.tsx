import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { Calendar } from "lucide-react";

const datePickerVariants = cva(
  "flex w-full items-center gap-2",
  {
    variants: {
      // Size variants
      size: {
        sm: "h-8",
        md: "h-10",
        lg: "h-12",
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

const dateInputVariants = cva(
  "flex h-full w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      size: {
        sm: "h-8",
        md: "h-10",
        lg: "h-12",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
);

const dateIconVariants = cva(
  "text-muted-foreground",
  {
    variants: {
      size: {
        sm: "h-4 w-4",
        md: "h-5 w-5",
        lg: "h-6 w-6",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
);

export interface DatePickerProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size">,
    VariantProps<typeof datePickerVariants> {
  asChild?: boolean;
  label?: string;
  description?: string;
  error?: string;
  showIcon?: boolean;
  format?: string;
  min?: string;
  max?: string;
  step?: number;
}

const DatePicker = React.forwardRef<HTMLInputElement, DatePickerProps>(
  ({ 
    className, 
    size, 
    state, 
    variant, 
    border, 
    shadow, 
    container, 
    label,
    description,
    error,
    showIcon = true,
    format = "YYYY-MM-DD",
    min,
    max,
    step = 1,
    value,
    onChange,
    ...props 
  }, ref) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value;
      if (onChange) {
        onChange(e);
      }
    };

    return (
      <div className="space-y-2">
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
        <div className={cn(datePickerVariants({ 
          size, 
          state, 
          variant, 
          border, 
          shadow, 
          container, 
          className 
        }))}>
          {showIcon && (
            <Calendar className={cn(dateIconVariants({ size }))} />
          )}
          <input
            ref={ref}
            type="date"
            className={cn(dateInputVariants({ size }))}
            value={value}
            onChange={handleChange}
            min={min}
            max={max}
            step={step}
            {...props}
          />
        </div>
      </div>
    );
  }
);

DatePicker.displayName = "DatePicker";

export { DatePicker, datePickerVariants, dateInputVariants, dateIconVariants }; 