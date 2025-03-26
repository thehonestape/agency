import * as React from "react";
import { cn } from "@/lib/utils";
import { CheckIcon, MinusIcon } from "lucide-react";

export interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  indeterminate?: boolean;
}

const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, indeterminate = false, ...props }, ref) => {
    const checkboxRef = React.useRef<HTMLInputElement>(null);

    React.useEffect(() => {
      if (checkboxRef.current) {
        checkboxRef.current.indeterminate = indeterminate;
      }
    }, [indeterminate]);

    const resolvedRef = ref || checkboxRef;

    return (
      <div className="group grid size-4 grid-cols-1">
        <input
          type="checkbox"
          ref={resolvedRef}
          className={cn(
            "col-start-1 row-start-1 appearance-none rounded-sm border border-input bg-background",
            "checked:border-primary checked:bg-primary",
            "indeterminate:border-primary indeterminate:bg-primary", 
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
            "disabled:cursor-not-allowed disabled:border-muted disabled:bg-muted",
            "disabled:checked:bg-muted",
            className
          )}
          {...props}
        />
        <svg
          fill="none"
          viewBox="0 0 14 14"
          className="pointer-events-none col-start-1 row-start-1 size-3.5 self-center justify-self-center stroke-primary-foreground group-has-[.disabled]:stroke-muted-foreground"
        >
          <path
            d="M3 8L6 11L11 3.5"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="opacity-0 group-has-[:checked]:opacity-100"
          />
          <path
            d="M3 7H11"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="opacity-0 group-has-[:indeterminate]:opacity-100"
          />
        </svg>
      </div>
    );
  }
);

Checkbox.displayName = "Checkbox";

export interface CheckboxWithLabelProps extends CheckboxProps {
  label: React.ReactNode;
  description?: React.ReactNode;
}

const CheckboxWithLabel = React.forwardRef<HTMLInputElement, CheckboxWithLabelProps>(
  ({ label, description, className, ...props }, ref) => {
    return (
      <div className="flex gap-3">
        <div className="flex h-6 shrink-0 items-center">
          <Checkbox ref={ref} className={className} {...props} />
        </div>
        <div className="text-sm/6">
          <label htmlFor={props.id} className="font-medium text-foreground">
            {label}
          </label>
          {description && (
            <p id={`${props.id}-description`} className="text-muted-foreground">
              {description}
            </p>
          )}
        </div>
      </div>
    );
  }
);

CheckboxWithLabel.displayName = "CheckboxWithLabel";

export { Checkbox, CheckboxWithLabel }; 