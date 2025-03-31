import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const flexVariants = cva(
  "flex",
  {
    variants: {
      // Layout direction
      direction: {
        row: "flex-row",
        column: "flex-col",
        "row-reverse": "flex-row-reverse",
        "column-reverse": "flex-col-reverse",
      },
      // Wrapping behavior
      wrap: {
        nowrap: "flex-nowrap",
        wrap: "flex-wrap",
        "wrap-reverse": "flex-wrap-reverse",
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
        start: "justify-start",
        center: "justify-center",
        end: "justify-end",
        between: "justify-between",
        around: "justify-around",
        evenly: "justify-evenly",
      },
      // Spacing
      gap: {
        none: "gap-0",
        xs: "gap-1",
        sm: "gap-2",
        md: "gap-4",
        lg: "gap-6",
        xl: "gap-8",
        "2xl": "gap-12",
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
      // Padding
      padding: {
        none: "",
        xs: "p-1",
        sm: "p-2",
        md: "p-4",
        lg: "p-6",
        xl: "p-8",
        "2xl": "p-12",
      },
      // Margin
      margin: {
        none: "",
        xs: "m-1",
        sm: "m-2",
        md: "m-4",
        lg: "m-6",
        xl: "m-8",
        "2xl": "m-12",
      },
      // Display type
      display: {
        flex: "flex",
        inlineFlex: "inline-flex",
      },
      // Overflow
      overflow: {
        visible: "overflow-visible",
        hidden: "overflow-hidden",
        scroll: "overflow-scroll",
        auto: "overflow-auto",
        clip: "overflow-clip",
      },
    },
    defaultVariants: {
      display: "flex",
      direction: "row",
      wrap: "nowrap",
      align: "stretch",
      justify: "start",
      gap: "none",
      container: false,
      background: "default",
      border: "none",
      rounded: "none",
      padding: "none",
      margin: "none",
      overflow: "visible",
    },
  }
);

export interface FlexProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof flexVariants> {
  asChild?: boolean;
}

const Flex = React.forwardRef<HTMLDivElement, FlexProps>(
  ({ 
    className, 
    display, 
    direction, 
    wrap, 
    align, 
    justify, 
    gap, 
    container, 
    background, 
    border, 
    rounded, 
    padding, 
    margin, 
    overflow, 
    asChild = false, 
    ...props 
  }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          flexVariants({ 
            display, 
            direction, 
            wrap, 
            align, 
            justify, 
            gap, 
            container, 
            background, 
            border, 
            rounded, 
            padding, 
            margin, 
            overflow, 
            className 
          })
        )}
        data-component="flex"
        data-flex-direction={direction}
        data-flex-wrap={wrap}
        data-flex-align={align}
        data-flex-justify={justify}
        data-flex-gap={gap}
        data-flex-padding={padding}
        data-flex-margin={margin}
        {...props}
      />
    );
  }
);

Flex.displayName = "Flex";

export { Flex, flexVariants }; 