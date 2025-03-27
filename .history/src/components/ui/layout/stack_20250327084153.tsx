import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

// Map of spacing values to Tailwind classes
const spacingMap = {
  0: "gap-0",
  0.5: "gap-0.5",
  1: "gap-1",
  1.5: "gap-1.5",
  2: "gap-2",
  2.5: "gap-2.5",
  3: "gap-3",
  3.5: "gap-3.5",
  4: "gap-4",
  5: "gap-5",
  6: "gap-6",
  7: "gap-7",
  8: "gap-8",
  9: "gap-9",
  10: "gap-10",
  11: "gap-11",
  12: "gap-12",
  14: "gap-14",
  16: "gap-16",
  20: "gap-20",
  24: "gap-24",
  28: "gap-28",
  32: "gap-32",
  36: "gap-36",
  40: "gap-40",
  44: "gap-44",
  48: "gap-48",
  52: "gap-52",
  56: "gap-56",
  60: "gap-60",
  64: "gap-64",
  72: "gap-72",
  80: "gap-80",
  96: "gap-96",
};

const stackVariants = cva(
  "flex",
  {
    variants: {
      // Layout direction
      direction: {
        row: "flex-row",
        column: "flex-col",
      },
      // Spacing between items
      spacing: {
        none: "gap-0",
        xs: "gap-1",
        sm: "gap-2",
        md: "gap-4",
        lg: "gap-6",
        xl: "gap-8",
        "2xl": "gap-12",
      },
      // Alignment
      align: {
        start: "items-start",
        center: "items-center",
        end: "items-end",
        stretch: "items-stretch",
        baseline: "items-baseline",
      },
      // Justification
      justify: {
        start: "justify-start",
        center: "justify-center",
        end: "justify-end",
        between: "justify-between",
        around: "justify-around",
        evenly: "justify-evenly",
      },
      // Wrapping
      wrap: {
        nowrap: "flex-nowrap",
        wrap: "flex-wrap",
        "wrap-reverse": "flex-wrap-reverse",
      },
      // Padding
      padding: {
        none: "p-0",
        xs: "p-1",
        sm: "p-2",
        md: "p-4",
        lg: "p-6",
        xl: "p-8",
      },
      // Background
      background: {
        default: "",
        subtle: "bg-background-subtle",
        muted: "bg-background-muted",
        inverse: "bg-background-inverse",
      },
      // Border
      border: {
        none: "",
        subtle: "border border-border-subtle",
        default: "border border-border",
        strong: "border-2 border-border",
      },
      // Rounded corners
      rounded: {
        none: "",
        sm: "rounded-sm",
        md: "rounded-md",
        lg: "rounded-lg",
        xl: "rounded-xl",
        full: "rounded-full",
      },
    },
    defaultVariants: {
      direction: "column",
      spacing: "md",
      align: "start",
      justify: "start",
      wrap: "nowrap",
      padding: "none",
      background: "default",
      border: "none",
      rounded: "none",
    },
  }
);

export interface StackProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof stackVariants> {
  asChild?: boolean;
}

const Stack = React.forwardRef<HTMLDivElement, StackProps>(
  ({ className, direction, spacing, align, justify, wrap, padding, background, border, rounded, asChild = false, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(stackVariants({ direction, spacing, align, justify, wrap, padding, background, border, rounded, className }))}
        {...props}
      />
    );
  }
);

Stack.displayName = "Stack";

export { Stack, stackVariants };

export interface HStackProps extends Omit<StackProps, "direction"> {}

export const HStack = React.forwardRef<HTMLDivElement, HStackProps>(
  ({ align = "center", ...props }, ref) => {
    return <Stack ref={ref} direction="row" align={align} {...props} />;
  }
);

HStack.displayName = "HStack";

export default Stack; 