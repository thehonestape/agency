import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import * as SliderPrimitive from "@radix-ui/react-slider";

const sliderVariants = cva(
  "relative flex w-full touch-none select-none items-center",
  {
    variants: {
      // Size variants
      size: {
        sm: "h-1",
        md: "h-2",
        lg: "h-3",
      },
      // State variants
      state: {
        default: "",
        error: "data-[state=checked]:bg-error",
        success: "data-[state=checked]:bg-success",
        warning: "data-[state=checked]:bg-warning",
        info: "data-[state=checked]:bg-info",
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

const sliderTrackVariants = cva(
  "relative grow overflow-hidden rounded-full bg-secondary",
  {
    variants: {
      size: {
        sm: "h-1",
        md: "h-2",
        lg: "h-3",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
);

const sliderRangeVariants = cva(
  "absolute h-full bg-primary",
  {
    variants: {
      state: {
        default: "",
        error: "bg-error",
        success: "bg-success",
        warning: "bg-warning",
        info: "bg-info",
      },
    },
    defaultVariants: {
      state: "default",
    },
  }
);

const sliderThumbVariants = cva(
  "block rounded-full border-2 border-primary bg-background ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      size: {
        sm: "h-3 w-3",
        md: "h-5 w-5",
        lg: "h-7 w-7",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
);

export interface SliderProps
  extends Omit<React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>, "size">,
    VariantProps<typeof sliderVariants> {
  asChild?: boolean;
  label?: string;
  description?: string;
  error?: string;
  showValue?: boolean;
  valueFormat?: (value: number) => string;
}

const Slider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  SliderProps
>(({ 
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
  showValue = true,
  valueFormat = (value) => value.toString(),
  ...props 
}, ref) => {
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
      <div className="flex items-center gap-4">
        <SliderPrimitive.Root
          ref={ref}
          className={cn(
            sliderVariants({ 
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
        >
          <SliderPrimitive.Track
            className={cn(sliderTrackVariants({ size }))}
          >
            <SliderPrimitive.Range
              className={cn(sliderRangeVariants({ state }))}
            />
          </SliderPrimitive.Track>
          <SliderPrimitive.Thumb
            className={cn(sliderThumbVariants({ size }))}
          />
        </SliderPrimitive.Root>
        {showValue && props.value && (
          <span className="min-w-[3rem] text-sm text-muted-foreground">
            {valueFormat(props.value[0])}
          </span>
        )}
      </div>
    </div>
  );
});

Slider.displayName = SliderPrimitive.Root.displayName;

export { Slider, sliderVariants, sliderTrackVariants, sliderRangeVariants, sliderThumbVariants }; 