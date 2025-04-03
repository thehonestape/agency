import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { X } from 'lucide-react';

const bannerVariants = cva(
  'relative w-full flex items-center gap-4 rounded-lg border p-4 text-sm',
  {
    variants: {
      variant: {
        default: 'bg-background text-foreground border-border',
        info: 'bg-info/20 text-info-foreground border-info/50 font-medium',
        success: 'bg-success/20 text-success-foreground border-success/50 font-medium',
        warning: 'bg-warning/20 text-warning-foreground border-warning/50 font-medium', 
        destructive: 'bg-destructive/20 text-destructive-foreground border-destructive/50 font-medium',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

export interface BannerProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof bannerVariants> {
  dismissible?: boolean;
  onDismiss?: () => void;
}

const Banner = React.forwardRef<HTMLDivElement, BannerProps>(
  (
    { className, variant, children, dismissible = false, onDismiss, ...props },
    ref
  ) => {
    const [isVisible, setIsVisible] = React.useState(true);

    const handleDismiss = React.useCallback(() => {
      setIsVisible(false);
      onDismiss?.();
    }, [onDismiss]);

    if (!isVisible) {
      return null;
    }

    return (
      <div
        ref={ref}
        role="alert"
        className={cn(bannerVariants({ variant, className }))}
        {...props}
      >
        <div className="flex-1">{children}</div>
        {dismissible && (
          <button
            onClick={handleDismiss}
            className="ml-auto inline-flex h-6 w-6 items-center justify-center rounded-md hover:bg-background/20 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
            aria-label="Dismiss banner"
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Dismiss</span>
          </button>
        )}
      </div>
    );
  }
);
Banner.displayName = 'Banner';

const BannerTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h5
    ref={ref}
    className={cn('font-medium leading-none tracking-tight', className)}
    {...props}
  />
));
BannerTitle.displayName = 'BannerTitle';

const BannerDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('text-sm [&_p]:leading-relaxed', className)}
    {...props}
  />
));
BannerDescription.displayName = 'BannerDescription';

export { Banner, BannerTitle, BannerDescription };
