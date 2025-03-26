import * as React from "react";
import { cn } from "@/lib/utils";

export interface RadioProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Radio = React.forwardRef<HTMLInputElement, RadioProps>(
  ({ className, ...props }, ref) => {
    return (
      <div className="flex items-center">
        <div className="relative flex h-6 items-center">
          <input
            type="radio"
            className={cn(
              "relative size-4 appearance-none rounded-full border border-input bg-background",
              "before:absolute before:inset-1 before:rounded-full before:bg-background not-checked:before:hidden",
              "checked:border-primary checked:bg-primary",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
              "disabled:cursor-not-allowed disabled:opacity-50",
              "disabled:before:bg-muted-foreground",
              className
            )}
            ref={ref}
            {...props}
          />
        </div>
      </div>
    );
  }
);

Radio.displayName = "Radio";

export interface RadioGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  defaultValue?: string;
  value?: string;
  onValueChange?: (value: string) => void;
  name?: string;
}

export interface RadioItemProps extends RadioProps {
  value: string;
  label?: React.ReactNode;
  description?: React.ReactNode;
}

const RadioGroup = React.forwardRef<HTMLDivElement, RadioGroupProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div ref={ref} className={cn("space-y-4", className)} {...props}>
        {children}
      </div>
    );
  }
);

RadioGroup.displayName = "RadioGroup";

const RadioItem = React.forwardRef<HTMLInputElement, RadioItemProps>(
  ({ className, label, description, value, ...props }, ref) => {
    // Extract name and other properties from RadioGroup context if needed
    // In a real implementation, this would use React Context
    
    return (
      <div className="flex items-start gap-3">
        <Radio
          ref={ref}
          value={value}
          className={className}
          {...props}
        />
        {(label || description) && (
          <div className="text-sm/6">
            {label && (
              <label 
                htmlFor={props.id} 
                className="font-medium text-foreground"
              >
                {label}
              </label>
            )}
            {description && (
              <p className="text-muted-foreground">
                {description}
              </p>
            )}
          </div>
        )}
      </div>
    );
  }
);

RadioItem.displayName = "RadioItem";

export { Radio, RadioGroup, RadioItem }; 