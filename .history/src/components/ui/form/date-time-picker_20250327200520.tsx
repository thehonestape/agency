import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { Calendar, Clock } from "lucide-react";

const dateTimePickerVariants = cva(
  "flex w-full items-center gap-2",
  {
    variants: {
      size: {
        sm: "h-8",
        md: "h-10",
        lg: "h-12",
      },
      state: {
        default: "",
        error: "border-error focus-visible:ring-error",
        success: "border-success focus-visible:ring-success",
        warning: "border-warning focus-visible:ring-warning",
        info: "border-info focus-visible:ring-info",
      },
      variant: {
        default: "bg-background",
        subtle: "bg-subtle",
        muted: "bg-muted",
        inverse: "bg-inverse",
      },
      border: {
        none: "border-0",
        subtle: "border-subtle",
        default: "border-default",
        strong: "border-2 border-default",
      },
      shadow: {
        none: "shadow-none",
        sm: "shadow-sm",
        md: "shadow-md",
        lg: "shadow-lg",
      },
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

const dateTimeInputVariants = cva(
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

const dateTimeIconVariants = cva(
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

export { dateTimeIconVariants };

export interface DateTimePickerProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size">,
    VariantProps<typeof dateTimePickerVariants> {
  asChild?: boolean;
  label?: string;
  description?: string;
  error?: string;
  showIcons?: boolean;
  format?: string;
  min?: string;
  max?: string;
  step?: number;
  showSeconds?: boolean;
}

const DateTimePicker = React.forwardRef<HTMLInputElement, DateTimePickerProps>(
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
    showIcons = true,
    format = "YYYY-MM-DDTHH:mm",
    min,
    max,
    showSeconds = false,
    step = showSeconds ? 1 : 60,
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
        <div className={cn(dateTimePickerVariants({ 
          size, 
          state, 
          variant, 
          border, 
          shadow, 
          container, 
          className 
        }))}>
          {showIcons && (
            <>
              <Calendar className={cn(dateTimeIconVariants({ size }))} />
              <Clock className={cn(dateTimeIconVariants({ size }))} />
            </>
          )}
          <input
            ref={ref}
            type="datetime-local"
            className={cn(dateTimeInputVariants({ size }))}
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

DateTimePicker.displayName = "DateTimePicker";

export { DateTimePicker }; 