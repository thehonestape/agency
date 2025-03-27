import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { Eye } from "lucide-react";

const formReadOnlyVariants = cva(
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

export interface FormReadOnlyProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof formReadOnlyVariants> {
  message?: string;
  icon?: React.ReactNode;
}

const FormReadOnly = React.forwardRef<HTMLDivElement, FormReadOnlyProps>(
  ({ 
    className, 
    size, 
    variant, 
    container, 
    message = "This form is read-only",
    icon = <Eye className="h-4 w-4" />,
    ...props 
  }, ref) => {
    return (
      <div
        ref={ref}
        role="status"
        className={cn(formReadOnlyVariants({ size, variant, container, className }))}
        {...props}
      >
        {icon}
        <span>{message}</span>
      </div>
    );
  }
);

FormReadOnly.displayName = "FormReadOnly";

export { FormReadOnly, formReadOnlyVariants }; 