import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";

const selectVariants = cva(
  "flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      // Size variants
      selectSize: {
        sm: "h-8 px-2 text-xs",
        md: "h-10 px-3 text-sm",
        lg: "h-12 px-4 text-base",
      },
      // State variants
      state: {
        default: "",
        error: "border-error focus:ring-error",
        success: "border-success focus:ring-success",
        warning: "border-warning focus:ring-warning",
        info: "border-info focus:ring-info",
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
      selectSize: "md",
      state: "default",
      variant: "default",
      border: "default",
      shadow: "none",
      container: false,
    },
  }
);

export interface SelectProps
  extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, "size">,
    VariantProps<typeof selectVariants> {
  asChild?: boolean;
}

const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ 
    className, 
    selectSize, 
    state, 
    variant, 
    border, 
    shadow, 
    container, 
    children, 
    "aria-label": ariaLabel,
    ...props 
  }, ref) => {
    return (
      <div className="relative">
        <select
          ref={ref}
          className={cn(
            selectVariants({ 
              selectSize, 
              state, 
              variant, 
              border, 
              shadow, 
              container, 
              className 
            }),
            "appearance-none pr-8"
          )}
          aria-label={ariaLabel || "Select an option"}
          {...props}
        >
          {children}
        </select>
        <ChevronDown className="absolute right-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground pointer-events-none" />
      </div>
    );
  }
);

Select.displayName = "Select";

const SelectGroup = React.forwardRef<
  HTMLOptGroupElement,
  React.OptgroupHTMLAttributes<HTMLOptGroupElement>
>(({ className, ...props }, ref) => (
  <optgroup
    ref={ref}
    className={cn("text-sm font-medium", className)}
    {...props}
  />
));
SelectGroup.displayName = "SelectGroup";

const SelectValue = React.forwardRef<
  HTMLOptionElement,
  React.OptionHTMLAttributes<HTMLOptionElement>
>(({ className, ...props }, ref) => (
  <option
    ref={ref}
    className={cn("text-sm", className)}
    {...props}
  />
));
SelectValue.displayName = "SelectValue";

const SelectLabel = React.forwardRef<
  HTMLLabelElement,
  React.LabelHTMLAttributes<HTMLLabelElement>
>(({ className, ...props }, ref) => (
  <label
    ref={ref}
    className={cn("text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70", className)}
    {...props}
  />
));
SelectLabel.displayName = "SelectLabel";

const SelectSeparator = React.forwardRef<
  HTMLHRElement,
  React.HTMLAttributes<HTMLHRElement>
>(({ className, ...props }, ref) => (
  <hr
    ref={ref}
    className={cn("-mx-1 my-1 h-px bg-muted", className)}
    {...props}
  />
));
SelectSeparator.displayName = "SelectSeparator";

export {
  Select,
  SelectGroup,
  SelectValue,
  SelectLabel,
  SelectSeparator,
  selectVariants,
}; 