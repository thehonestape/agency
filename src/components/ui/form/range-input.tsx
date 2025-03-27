import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const rangeInputVariants = cva(
  "flex items-center gap-4",
  {
    variants: {
      // Size variants
      size: {
        sm: "text-sm",
        md: "text-base",
        lg: "text-lg",
      },
      // Container query support
      container: {
        true: "@container",
        false: "",
      },
    },
    defaultVariants: {
      size: "md",
      container: false,
    },
  }
);

const rangeTrackVariants = cva(
  "relative h-2 w-full rounded-full bg-muted",
  {
    variants: {
      // Visual variants
      variant: {
        default: "bg-muted",
        subtle: "bg-subtle",
        muted: "bg-muted",
        inverse: "bg-inverse",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

const rangeThumbVariants = cva(
  "block h-4 w-4 rounded-full border-2 border-background bg-primary shadow-sm transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      // Visual variants
      variant: {
        default: "bg-primary",
        subtle: "bg-subtle",
        muted: "bg-muted",
        inverse: "bg-inverse",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface RangeInputProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  value?: [number, number];
  onChange?: (value: [number, number]) => void;
  label?: string;
  description?: string;
  error?: string;
  required?: boolean;
  min?: number;
  max?: number;
  step?: number;
  size?: "sm" | "md" | "lg";
  container?: boolean;
  variant?: "default" | "subtle" | "muted" | "inverse";
  readOnly?: boolean;
}

const RangeInput = React.forwardRef<HTMLDivElement, RangeInputProps>(
  ({ 
    className, 
    size = "md", 
    container = false, 
    variant = "default",
    value = [0, 100], 
    onChange, 
    label,
    description,
    error,
    required,
    min = 0,
    max = 100,
    step = 1,
    readOnly = false,
    ...props 
  }, ref) => {
    const [localValue, setLocalValue] = React.useState<[number, number]>(value);

    React.useEffect(() => {
      setLocalValue(value);
    }, [value]);

    const handleChange = (newValue: [number, number]) => {
      if (!readOnly) {
        setLocalValue(newValue);
        onChange?.(newValue);
      }
    };

    return (
      <div className="space-y-2">
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
        <div 
          ref={ref}
          className={cn(rangeInputVariants({ size, container, className }))}
          {...props}
        >
          <div className={cn(rangeTrackVariants({ variant }))}>
            <div 
              className="absolute h-full rounded-full bg-primary"
              style={{ 
                left: `${((localValue[0] - min) / (max - min)) * 100}%`,
                right: `${100 - ((localValue[1] - min) / (max - min)) * 100}%`
              }}
            />
            <input
              type="range"
              min={min}
              max={max}
              step={step}
              value={localValue[0]}
              onChange={(e) => handleChange([Number(e.target.value), localValue[1]])}
              disabled={readOnly}
              className={cn(rangeThumbVariants({ variant }), "absolute -top-1")}
              style={{ left: `${((localValue[0] - min) / (max - min)) * 100}%` }}
              aria-label={`Minimum value: ${localValue[0]}`}
            />
            <input
              type="range"
              min={min}
              max={max}
              step={step}
              value={localValue[1]}
              onChange={(e) => handleChange([localValue[0], Number(e.target.value)])}
              disabled={readOnly}
              className={cn(rangeThumbVariants({ variant }), "absolute -top-1")}
              style={{ left: `${((localValue[1] - min) / (max - min)) * 100}%` }}
              aria-label={`Maximum value: ${localValue[1]}`}
            />
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">{localValue[0]}</span>
            <span className="text-sm text-muted-foreground">-</span>
            <span className="text-sm font-medium">{localValue[1]}</span>
          </div>
        </div>
      </div>
    );
  }
);

RangeInput.displayName = "RangeInput";

export { RangeInput, rangeInputVariants, rangeTrackVariants, rangeThumbVariants }; 