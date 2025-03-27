import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { CheckCircle } from "lucide-react";

const formSuccessVariants = cva(
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
        default: "bg-success/10 text-success",
        subtle: "bg-success/5 text-success",
        muted: "bg-success/15 text-success",
        inverse: "bg-success/20 text-success",
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

export interface FormSuccessProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof formSuccessVariants> {
  message: string;
  icon?: React.ReactNode;
}

const FormSuccess = React.forwardRef<HTMLDivElement, FormSuccessProps>(
  ({ 
    className, 
    size, 
    variant, 
    container, 
    message,
    icon = <CheckCircle className="h-4 w-4" />,
    ...props 
  }, ref) => {
    return (
      <div
        ref={ref}
        role="status"
        className={cn(formSuccessVariants({ size, variant, container, className }))}
        {...props}
      >
        {icon}
        <span>{message}</span>
      </div>
    );
  }
);

FormSuccess.displayName = "FormSuccess";

export { FormSuccess, formSuccessVariants }; 