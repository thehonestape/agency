import React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../../lib/utils";

const kbdVariants = cva(
  "font-mono inline-flex h-5 items-center justify-center rounded-[0.2em] border border-b-2 px-1.5 text-[0.85em] font-medium",
  {
    variants: {
      variant: {
        default:
          "border-[hsl(var(--border-base))] bg-[hsl(var(--background-muted))] text-[hsl(var(--foreground-base))] shadow-[inset_0_-1px_0_1px_hsl(var(--border-emphasized))]",
        subtle:
          "border-[hsl(var(--border-subtle))] bg-[hsl(var(--background-subtle))] text-[hsl(var(--foreground-base))] shadow-[inset_0_-1px_0_1px_hsl(var(--border-base))]",
        accent:
          "border-[hsl(var(--interactive-base)/0.2)] bg-[hsl(var(--interactive-muted))] text-[hsl(var(--interactive-base))] shadow-[inset_0_-1px_0_1px_hsl(var(--interactive-base)/0.4)]",
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