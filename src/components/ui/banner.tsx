import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";
import { FiX } from "react-icons/fi";

const bannerVariants = cva(
  "relative w-full px-4 py-3 flex justify-between items-center",
  {
    variants: {
      variant: {
        default: "bg-background border-b",
        primary: "bg-primary text-primary-foreground",
        success: "bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-100 border-b border-green-200 dark:border-green-800",
        warning: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-100 border-b border-yellow-200 dark:border-yellow-800",
        error: "bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-100 border-b border-red-200 dark:border-red-800",
        info: "bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-100 border-b border-blue-200 dark:border-blue-800",
        marketing: "bg-gradient-to-r from-blue-600 to-indigo-600 text-white",
      },
      position: {
        top: "sticky top-0 z-50",
        bottom: "sticky bottom-0 z-50",
        static: "",
      }
    },
    defaultVariants: {
      variant: "default",
      position: "static",
    },
  }
);

export interface BannerProps
  extends React.HTMLAttributes<HTMLDivElement>,
  VariantProps<typeof bannerVariants> {
  onClose?: () => void;
  showCloseButton?: boolean;
}

const Banner = React.forwardRef<HTMLDivElement, BannerProps>(
  ({ className, variant, position, onClose, showCloseButton = true, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(bannerVariants({ variant, position }), className)}
        {...props}
      >
        <div className="flex-1">{children}</div>
        {showCloseButton && onClose && (
          <button 
            onClick={onClose}
            className="ml-4 p-1 rounded-full hover:bg-black/10 dark:hover:bg-white/10 transition-colors"
            aria-label="Close banner"
          >
            <FiX className="h-4 w-4" />
          </button>
        )}
      </div>
    );
  }
);
Banner.displayName = "Banner";

const BannerTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h5
    ref={ref}
    className={cn("font-medium", className)}
    {...props}
  />
));
BannerTitle.displayName = "BannerTitle";

const BannerDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("text-sm", className)}
    {...props}
  />
));
BannerDescription.displayName = "BannerDescription";

export { Banner, BannerTitle, BannerDescription }; 