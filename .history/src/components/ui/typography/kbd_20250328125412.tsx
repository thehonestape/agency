import React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../../lib/utils";

const kbdVariants = cva(
  "font-mono inline-flex h-5 items-center justify-center rounded-[0.2em] border border-b-2 px-1.5 text-[0.85em] font-medium",
  {
    variants: {
      variant: {
        default:
          "border-border bg-muted text-foreground shadow-[inset_0_-1px_0_1px_var(--border)]",
        subtle:
          "border-input bg-secondary text-foreground shadow-[inset_0_-1px_0_1px_var(--border)]",
        accent:
          "border-primary/20 bg-primary/10 text-primary shadow-[inset_0_-1px_0_1px_var(--primary)/40]",
      },
      size: {
        default: "h-5 min-w-5 text-[0.85em]",
        sm: "h-4 min-w-4 text-[0.75em]",
        lg: "h-6 min-w-6 text-[0.95em]",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface KbdProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof kbdVariants> {}

export const Kbd = React.forwardRef<HTMLElement, KbdProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <kbd
        ref={ref}
        className={cn(kbdVariants({ variant, size, className }))}
        {...props}
      />
    );
  }
);

Kbd.displayName = "Kbd";

export default Kbd; 