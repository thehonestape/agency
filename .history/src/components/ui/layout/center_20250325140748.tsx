import React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../../lib/utils";

const centerVariants = cva("flex", {
  variants: {
    inline: {
      true: "inline-flex",
      false: "flex",
    },
    direction: {
      horizontal: "justify-center",
      vertical: "items-center",
      both: "items-center justify-center",
    },
  },
  defaultVariants: {
    inline: false,
    direction: "both",
  },
});

export interface CenterProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof centerVariants> {
  as?: React.ElementType;
}

const Center = React.forwardRef<HTMLDivElement, CenterProps>(
  ({ className, as: Component = "div", inline, direction, ...props }, ref) => {
    return (
      <Component
        ref={ref}
        className={cn(
          centerVariants({
            inline,
            direction,
          }),
          className
        )}
        {...props}
      />
    );
  }
);

Center.displayName = "Center";

export { Center };
export default Center; 