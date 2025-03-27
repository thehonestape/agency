import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { Star } from "lucide-react";

const ratingInputVariants = cva(
  "flex items-center gap-1",
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

const starVariants = cva(
  "cursor-pointer transition-colors",
  {
    variants: {
      // Visual variants
      variant: {
        default: "text-muted-foreground hover:text-primary",
        filled: "text-primary",
        hover: "text-primary/50",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface RatingInputProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  value?: number;
  onChange?: (value: number) => void;
  label?: string;
  description?: string;
  error?: string;
  required?: boolean;
  max?: number;
  size?: "sm" | "md" | "lg";
  container?: boolean;
  readOnly?: boolean;
}

const RatingInput = React.forwardRef<HTMLDivElement, RatingInputProps>(
  ({ 
    className, 
    size = "md", 
    container = false, 
    value = 0, 
    onChange, 
    label,
    description,
    error,
    required,
    max = 5,
    readOnly = false,
    ...props 
  }, ref) => {
    const [hoverValue, setHoverValue] = React.useState<number | null>(null);

    const handleStarClick = (rating: number) => {
      if (!readOnly) {
        onChange?.(rating);
      }
    };

    const handleStarHover = (rating: number | null) => {
      if (!readOnly) {
        setHoverValue(rating);
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
          className={cn(ratingInputVariants({ size, container, className }))}
          {...props}
        >
          {Array.from({ length: max }, (_, i) => {
            const rating = i + 1;
            const isFilled = rating <= value;
            const isHovered = hoverValue !== null && rating <= hoverValue;
            
            return (
              <button
                key={rating}
                type="button"
                className={cn(starVariants({ 
                  variant: isFilled ? "filled" : isHovered ? "hover" : "default" 
                }))}
                onClick={() => handleStarClick(rating)}
                onMouseEnter={() => handleStarHover(rating)}
                onMouseLeave={() => handleStarHover(null)}
                disabled={readOnly}
                title={`Rate ${rating} out of ${max} stars`}
              >
                <Star className="h-5 w-5 fill-current" />
              </button>
            );
          })}
        </div>
      </div>
    );
  }
);

RatingInput.displayName = "RatingInput";

export { RatingInput, ratingInputVariants, starVariants }; 