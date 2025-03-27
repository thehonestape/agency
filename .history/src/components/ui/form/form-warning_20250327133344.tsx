import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { AlertTriangle } from "lucide-react";

const formWarningVariants = cva(
  "flex items-center gap-2 rounded-md p-3 text-sm",
  {
    variants: {
      // Size variants
      size: {
        sm: "text-xs",
        md: "text-sm",
        lg: "text-base",
      },
      // Visual variants
      variant: {
        default: "bg-warning/10 text-warning",
        subtle: "bg-warning/5 text-warning",
        muted: "bg-warning/15 text-warning",
        inverse: "bg-warning/20 text-warning",
      },
      // Container query support
      container: {
        true: "@container",
        false: "",
      },
    },
    defaultVariants: {
      size: "md",
      variant: "default",
      container: false,
    },
  }
);

export interface FormWarningProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof formWarningVariants> {
  message: string;
  icon?: React.ReactNode;
}

const FormWarning = React.forwardRef<HTMLDivElement, FormWarningProps>(
  ({ 
    className, 
    size, 
    variant, 
    container, 
    message,
    icon = <AlertTriangle className="h-4 w-4" />,
    ...props 
  }, ref) => {
    return (
      <div
        ref={ref}
        role="alert"
        className={cn(formWarningVariants({ size, variant, container, className }))}
        {...props}
      >
        {icon}
        <span>{message}</span>
      </div>
    );
  }
);

FormWarning.displayName = "FormWarning";

export { FormWarning, formWarningVariants }; 