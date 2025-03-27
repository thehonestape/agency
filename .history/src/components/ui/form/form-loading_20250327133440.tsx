import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

const formLoadingVariants = cva(
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

export interface FormLoadingProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof formLoadingVariants> {
  message?: string;
  icon?: React.ReactNode;
}

const FormLoading = React.forwardRef<HTMLDivElement, FormLoadingProps>(
  ({ 
    className, 
    size, 
    variant, 
    container, 
    message = "Loading...",
    icon = <Loader2 className="h-4 w-4 animate-spin" />,
    ...props 
  }, ref) => {
    return (
      <div
        ref={ref}
        role="status"
        className={cn(formLoadingVariants({ size, variant, container, className }))}
        {...props}
      >
        {icon}
        <span>{message}</span>
      </div>
    );
  }
);

FormLoading.displayName = "FormLoading";

export { FormLoading, formLoadingVariants }; 