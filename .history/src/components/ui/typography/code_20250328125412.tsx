import React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../../lib/utils";

const codeVariants = cva(
  "font-mono rounded px-[0.3em] py-[0.2em] text-[0.9em] transition-colors",
  {
    variants: {
      variant: {
        default:
          "bg-muted text-foreground",
        subtle:
          "bg-secondary text-foreground",
        accent:
          "bg-primary/10 text-primary",
        outline:
          "bg-transparent border border-input text-foreground",
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