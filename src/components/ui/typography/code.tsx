import React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../../lib/utils";

const codeVariants = cva(
  "font-mono rounded px-[0.3em] py-[0.2em] text-[0.9em] transition-colors",
  {
    variants: {
      variant: {
        default:
          "bg-[hsl(var(--background-muted))] text-[hsl(var(--foreground-base))]",
        subtle:
          "bg-[hsl(var(--background-subtle))] text-[hsl(var(--foreground-base))]",
        accent:
          "bg-[hsl(var(--interactive-muted))] text-[hsl(var(--interactive-base))]",
        outline:
          "bg-transparent border border-[hsl(var(--border-subtle))] text-[hsl(var(--foreground-base))]",
      },
      size: {
        default: "text-[0.9em]",
        sm: "text-[0.8em]",
        lg: "text-[1em]",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface CodeProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof codeVariants> {}

export const Code = React.forwardRef<HTMLElement, CodeProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <code
        ref={ref}
        className={cn(codeVariants({ variant, size, className }))}
        {...props}
      />
    );
  }
);

Code.displayName = "Code";

export default Code; 