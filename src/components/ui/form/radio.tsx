import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const radioVariants = cva(
  "relative flex h-4 w-4 shrink-0 items-center justify-center rounded-full border border-input bg-background ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground",
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
      rounded: "full",
      container: false,
    },
  }
);

export interface RadioProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type" | "size">,
    VariantProps<typeof radioVariants> {
  asChild?: boolean;
  label?: string;
  description?: string;
  error?: string;
}

const Radio = React.forwardRef<HTMLInputElement, RadioProps>(
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
            type="radio"
            ref={ref}
            className={cn(
              radioVariants({ 
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
          <div className="absolute h-2 w-2 rounded-full bg-primary-foreground opacity-0 data-[state=checked]:opacity-100" />
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

Radio.displayName = "Radio";

const RadioGroup = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    label?: string;
    description?: string;
    error?: string;
    defaultValue?: string;
    value?: string;
    onValueChange?: (value: string) => void;
    name?: string;
  }
>(({ 
  className, 
  label, 
  description, 
  error, 
  defaultValue, 
  value, 
  onValueChange, 
  name,
  children, 
  ...props 
}, ref) => (
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
      {React.Children.map(children, (child) => {
        if (React.isValidElement<RadioProps>(child)) {
          return React.cloneElement(child, {
            name,
            value: child.props.value,
            checked: value ? child.props.value === value : undefined,
            defaultChecked: defaultValue ? child.props.value === defaultValue : undefined,
            onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
              if (onValueChange) {
                onValueChange(e.target.value);
              }
              child.props.onChange?.(e);
            },
          });
        }
        return child;
      })}
    </div>
  </div>
));

RadioGroup.displayName = "RadioGroup";

export { Radio, RadioGroup, radioVariants }; 