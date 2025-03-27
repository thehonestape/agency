import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import * as SwitchPrimitives from "@radix-ui/react-switch";

const switchVariants = cva(
  "peer inline-flex shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=unchecked]:bg-input",
  {
    variants: {
      // Size variants
      size: {
        sm: "h-4 w-7",
        md: "h-6 w-11",
        lg: "h-8 w-14",
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

const switchThumbVariants = cva(
  "pointer-events-none block rounded-full bg-background shadow-lg ring-0 transition-transform",
  {
    variants: {
      size: {
        sm: "h-3 w-3 data-[state=checked]:translate-x-3",
        md: "h-5 w-5 data-[state=checked]:translate-x-5",
        lg: "h-7 w-7 data-[state=checked]:translate-x-6",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
);

export interface SwitchProps
  extends Omit<React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root>, "size">,
    VariantProps<typeof switchVariants> {
  asChild?: boolean;
  label?: string;
  description?: string;
  error?: string;
}

const Switch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitives.Root>,
  SwitchProps
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
  ...props 
}, ref) => {
  return (
    <div className="flex items-start space-x-2">
      <SwitchPrimitives.Root
        ref={ref}
        className={cn(
          switchVariants({ 
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
        <SwitchPrimitives.Thumb
          className={cn(switchThumbVariants({ size }))}
        />
      </SwitchPrimitives.Root>
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
});

Switch.displayName = SwitchPrimitives.Root.displayName;

const SwitchGroup = React.forwardRef<
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

SwitchGroup.displayName = "SwitchGroup";

export { Switch, SwitchGroup, switchVariants, switchThumbVariants }; 