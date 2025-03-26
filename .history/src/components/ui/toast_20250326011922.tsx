import * as React from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

export interface ToastProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "success" | "destructive" | "warning" | "info";
  onClose?: () => void;
  title?: React.ReactNode;
  description?: React.ReactNode;
  action?: React.ReactNode;
  duration?: number;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

const Toast = React.forwardRef<HTMLDivElement, ToastProps>(
  ({ className, variant = "default", onClose, title, description, action, children, ...props }, ref) => {
    const variantClasses = {
      default: "bg-background border-border",
      success: "bg-success/15 border-success text-success-foreground",
      destructive: "bg-destructive/15 border-destructive text-destructive-foreground",
      warning: "bg-warning/15 border-warning text-warning-foreground",
      info: "bg-info/15 border-info text-info-foreground",
    };

    return (
      <div
        ref={ref}
        className={cn(
          "group pointer-events-auto relative flex w-full items-center justify-between space-x-4 overflow-hidden rounded-md border p-4 pr-6 shadow-lg transition-all",
          "data-[state=open]:animate-in data-[state=closed]:animate-out data-[swipe=end]:animate-out data-[state=closed]:fade-out-80",
          "data-[state=open]:slide-in-from-top-full data-[state=closed]:slide-out-to-right-full",
          "data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=cancel]:translate-x-0 data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-x)]",
          "data-[swipe=move]:transition-none",
          variantClasses[variant],
          className
        )}
        {...props}
      >
        <div className="flex flex-1 items-start gap-4">
          {children || (
            <>
              <div className="grid flex-1 gap-1">
                {title && <ToastTitle>{title}</ToastTitle>}
                {description && <ToastDescription>{description}</ToastDescription>}
              </div>
              {action && <div className="flex-shrink-0">{action}</div>}
            </>
          )}
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className="absolute right-2 top-2 rounded-md p-1 text-foreground/50 opacity-0 transition-opacity hover:text-foreground focus:opacity-100 focus:outline-none focus:ring-2 group-hover:opacity-100"
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </button>
        )}
      </div>
    );
  }
);
Toast.displayName = "Toast";

const ToastTitle = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("text-sm font-semibold", className)} {...props} />
  )
);
ToastTitle.displayName = "ToastTitle";

const ToastDescription = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("text-sm opacity-90", className)} {...props} />
  )
);
ToastDescription.displayName = "ToastDescription";

const ToastAction = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("flex shrink-0 items-center", className)} {...props} />
  )
);
ToastAction.displayName = "ToastAction";

const ToastProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="fixed bottom-0 z-[100] flex w-full flex-col p-4 sm:bottom-0 sm:right-0 sm:top-auto sm:flex-col md:max-w-[420px]">
      {children}
    </div>
  );
};
ToastProvider.displayName = "ToastProvider";

export { Toast, ToastProvider, ToastTitle, ToastDescription, ToastAction }; 