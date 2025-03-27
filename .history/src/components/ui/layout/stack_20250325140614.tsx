import React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../../lib/utils";

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

const stackVariants = cva("flex", {
  variants: {
    direction: {
      vertical: "flex-col",
      horizontal: "flex-row",
    },
    align: {
      start: "items-start",
      center: "items-center",
      end: "items-end",
      stretch: "items-stretch",
      baseline: "items-baseline",
    },
    justify: {
      start: "justify-start",
      center: "justify-center",
      end: "justify-end",
      between: "justify-between",
      around: "justify-around",
      evenly: "justify-evenly",
    },
    wrap: {
      wrap: "flex-wrap",
      nowrap: "flex-nowrap",
      wrapReverse: "flex-wrap-reverse",
    },
  },
  defaultVariants: {
    direction: "vertical",
    align: "stretch",
    justify: "start",
    wrap: "nowrap",
  },
});

export interface StackProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof stackVariants> {
  spacing?: keyof typeof spacingMap | number;
  divider?: React.ReactNode;
  recursive?: boolean;
}

export const Stack = React.forwardRef<HTMLDivElement, StackProps>(
  (
    {
      className,
      direction = "vertical",
      align,
      justify,
      wrap,
      spacing = 4,
      divider,
      recursive = false,
      children,
      ...props
    },
    ref
  ) => {
    // Convert spacing to the appropriate class
    const spacingClass =
      typeof spacing === "number"
        ? spacingMap[spacing as keyof typeof spacingMap] || `gap-${spacing}`
        : spacing;

    // If divider is provided, we need to handle it specially
    const childrenWithDividers = React.Children.toArray(children).flatMap(
      (child, index, array) => {
        if (index === array.length - 1) return [child];

        return [
          child,
          React.cloneElement(divider as React.ReactElement, {
            key: `divider-${index}`,
          }),
        ];
      }
    );

    return (
      <div
        ref={ref}
        className={cn(
          stackVariants({ direction, align, justify, wrap }),
          spacingClass,
          // If recursive, apply spacing to all nested flex containers
          recursive && "flex-1 [&_div.flex]:gap-inherit",
          className
        )}
        {...props}
      >
        {divider ? childrenWithDividers : children}
      </div>
    );
  }
);

Stack.displayName = "Stack";

export interface HStackProps extends Omit<StackProps, "direction"> {}

export const HStack = React.forwardRef<HTMLDivElement, HStackProps>(
  ({ align = "center", ...props }, ref) => {
    return <Stack ref={ref} direction="horizontal" align={align} {...props} />;
  }
);

HStack.displayName = "HStack";

export default Stack; 