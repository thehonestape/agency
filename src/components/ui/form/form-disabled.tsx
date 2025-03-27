import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { Lock } from "lucide-react";

const formDisabledVariants = cva(
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
        default: "bg-muted text-muted-foreground",
        subtle: "bg-subtle text-subtle-foreground",
        muted: "bg-muted text-muted-foreground",
        inverse: "bg-inverse text-inverse-foreground",
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

export interface FormDisabledProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof formDisabledVariants> {
  message?: string;
  icon?: React.ReactNode;
}

const FormDisabled = React.forwardRef<HTMLDivElement, FormDisabledProps>(
  ({ 
    className, 
    size, 
    variant, 
    container, 
    message = "This form is currently disabled",
    icon = <Lock className="h-4 w-4" />,
    ...props 
  }, ref) => {
    return (
      <div
        ref={ref}
        role="status"
        className={cn(formDisabledVariants({ size, variant, container, className }))}
        {...props}
      >
        {icon}
        <span>{message}</span>
      </div>
    );
  }
);

FormDisabled.displayName = "FormDisabled";

export { FormDisabled, formDisabledVariants }; 