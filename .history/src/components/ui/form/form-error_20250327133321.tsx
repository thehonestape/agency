import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { AlertCircle } from "lucide-react";

const formErrorVariants = cva(
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
        default: "bg-destructive/10 text-destructive",
        subtle: "bg-destructive/5 text-destructive",
        muted: "bg-destructive/15 text-destructive",
        inverse: "bg-destructive/20 text-destructive",
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

export interface FormErrorProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof formErrorVariants> {
  message: string;
  icon?: React.ReactNode;
}

const FormError = React.forwardRef<HTMLDivElement, FormErrorProps>(
  ({ 
    className, 
    size, 
    variant, 
    container, 
    message,
    icon = <AlertCircle className="h-4 w-4" />,
    ...props 
  }, ref) => {
    return (
      <div
        ref={ref}
        role="alert"
        className={cn(formErrorVariants({ size, variant, container, className }))}
        {...props}
      >
        {icon}
        <span>{message}</span>
      </div>
    );
  }
);

FormError.displayName = "FormError";

export { FormError, formErrorVariants }; 