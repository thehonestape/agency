import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const gridVariants = cva(
  "grid",
  {
    variants: {
      // Semantic spacing scale
      gap: {
        none: "gap-0",
        xs: "gap-1",
        sm: "gap-2",
        md: "gap-4",
        lg: "gap-6",
        xl: "gap-8",
        "2xl": "gap-12",
      },
      // Responsive grid columns
      columns: {
        1: "grid-cols-1",
        2: "grid-cols-2",
        3: "grid-cols-3",
        4: "grid-cols-4",
        5: "grid-cols-5",
        6: "grid-cols-6",
        7: "grid-cols-7",
        8: "grid-cols-8",
        9: "grid-cols-9",
        10: "grid-cols-10",
        11: "grid-cols-11",
        12: "grid-cols-12",
        auto: "grid-cols-auto",
        "auto-fill": "grid-cols-auto-fill",
        "auto-fit": "grid-cols-auto-fit",
      },
      // Responsive grid rows
      rows: {
        1: "grid-rows-1",
        2: "grid-rows-2",
        3: "grid-rows-3",
        4: "grid-rows-4",
        5: "grid-rows-5",
        6: "grid-rows-6",
        auto: "grid-rows-auto",
      },
      // Grid flow direction
      flow: {
        row: "grid-flow-row",
        col: "grid-flow-col",
        dense: "grid-flow-dense",
        "row-dense": "grid-flow-row-dense",
        "col-dense": "grid-flow-col-dense",
      },
      // Content alignment
      align: {
        start: "items-start",
        center: "items-center",
        end: "items-end",
        stretch: "items-stretch",
        baseline: "items-baseline",
      },
      // Content justification
      justify: {
        start: "justify-items-start",
        center: "justify-items-center",
        end: "justify-items-end",
        stretch: "justify-items-stretch",
      },
      // Container query support
      container: {
        true: "@container",
        false: "",
      },
      // Visual styling
      background: {
        default: "",
        subtle: "bg-background-subtle",
        muted: "bg-background-muted",
        inverse: "bg-background-inverse",
      },
      border: {
        none: "",
        subtle: "border border-border-subtle",
        default: "border border-border",
        strong: "border-2 border-border",
      },
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
      gap: "md",
      columns: 12,
      flow: "row",
      align: "stretch",
      justify: "stretch",
      container: false,
      background: "default",
      border: "none",
      rounded: "none",
    },
  }
);

export interface GridProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof gridVariants> {
  asChild?: boolean;
}

const Grid = React.forwardRef<HTMLDivElement, GridProps>(
  ({ className, gap, columns, rows, flow, align, justify, container, background, border, rounded, asChild = false, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(gridVariants({ gap, columns, rows, flow, align, justify, container, background, border, rounded, className }))}
        {...props}
      />
    );
  }
);

Grid.displayName = "Grid";

const gridItemVariants = cva(
  "",
  {
    variants: {
      // Spanning
      colSpan: {
        1: "col-span-1",
        2: "col-span-2",
        3: "col-span-3",
        4: "col-span-4",
        5: "col-span-5",
        6: "col-span-6",
        7: "col-span-7",
        8: "col-span-8",
        9: "col-span-9",
        10: "col-span-10",
        11: "col-span-11",
        12: "col-span-12",
        full: "col-span-full",
      },
      rowSpan: {
        1: "row-span-1",
        2: "row-span-2",
        3: "row-span-3",
        4: "row-span-4",
        5: "row-span-5",
        6: "row-span-6",
        full: "row-span-full",
      },
      // Positioning
      colStart: {
        1: "col-start-1",
        2: "col-start-2",
        3: "col-start-3",
        4: "col-start-4",
        5: "col-start-5",
        6: "col-start-6",
        7: "col-start-7",
        8: "col-start-8",
        9: "col-start-9",
        10: "col-start-10",
        11: "col-start-11",
        12: "col-start-12",
        13: "col-start-13",
        auto: "col-start-auto",
      },
      rowStart: {
        1: "row-start-1",
        2: "row-start-2",
        3: "row-start-3",
        4: "row-start-4",
        5: "row-start-5",
        6: "row-start-6",
        7: "row-start-7",
        auto: "row-start-auto",
      },
      // Self alignment
      selfAlign: {
        start: "self-start",
        center: "self-center",
        end: "self-end",
        stretch: "self-stretch",
        baseline: "self-baseline",
      },
      selfJustify: {
        start: "justify-self-start",
        center: "justify-self-center",
        end: "justify-self-end",
        stretch: "justify-self-stretch",
      },
      // Visual styling
      background: {
        default: "",
        subtle: "bg-background-subtle",
        muted: "bg-background-muted",
        inverse: "bg-background-inverse",
      },
      border: {
        none: "",
        subtle: "border border-border-subtle",
        default: "border border-border",
        strong: "border-2 border-border",
      },
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
      selfAlign: "stretch",
      selfJustify: "stretch",
      background: "default",
      border: "none",
      rounded: "none",
    },
  }
);

export interface GridItemProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof gridItemVariants> {
  asChild?: boolean;
}

const GridItem = React.forwardRef<HTMLDivElement, GridItemProps>(
  ({ className, colSpan, rowSpan, colStart, rowStart, selfAlign, selfJustify, background, border, rounded, asChild = false, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(gridItemVariants({ colSpan, rowSpan, colStart, rowStart, selfAlign, selfJustify, background, border, rounded, className }))}
        {...props}
      />
    );
  }
);

GridItem.displayName = "GridItem";

export { Grid, GridItem, gridVariants, gridItemVariants }; 