import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { Base, baseVariants } from "./base";

const stackVariants = cva(
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
      // Wrapping behavior
      wrap: {
        nowrap: "flex-nowrap",
        wrap: "flex-wrap",
        "wrap-reverse": "flex-wrap-reverse",
      },
      // Container query support
      container: {
        true: "@container",
        false: "",
      },
      // Visual styling
      background: {
        default: "bg-default",
        subtle: "bg-subtle",
        muted: "bg-muted",
        inverse: "bg-inverse",
      },
      border: {
        none: "border-0",
        subtle: "border border-subtle",
        default: "border border-default",
        strong: "border-2 border-default",
      },
      rounded: {
        none: "rounded-none",
        sm: "rounded-sm",
        md: "rounded-md",
        lg: "rounded-lg",
        xl: "rounded-xl",
        full: "rounded-full",
      },
      // Spacing
      padding: {
        none: "p-0",
        xs: "p-1",
        sm: "p-2",
        md: "p-4",
        lg: "p-6",
        xl: "p-8",
        "2xl": "p-12",
      },
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
      // Responsive behavior
      responsive: {
        true: "flex-col sm:flex-row",
        false: "",
      },
    },
    defaultVariants: {
      display: "flex",
      direction: "column",
      spacing: "md",
      align: "start",
      justify: "start",
      wrap: "nowrap",
      container: false,
      background: "default",
      border: "none",
      rounded: "none",
      padding: "none",
      margin: "none",
      overflow: "visible",
      responsive: false,
    },
  }
);

type BaseVariantProps = Omit<VariantProps<typeof baseVariants>, "display" | "background">;

export interface StackProps
  extends React.HTMLAttributes<HTMLDivElement>,
    BaseVariantProps,
    VariantProps<typeof stackVariants> {
  asChild?: boolean;
}

const Stack = React.forwardRef<HTMLDivElement, StackProps>(
  ({ 
    className, 
    direction, 
    spacing, 
    align, 
    justify, 
    wrap, 
    padding, 
    background, 
    border, 
    rounded, 
    asChild = false, 
    ...props 
  }, ref) => {
    return (
      <Base
        ref={ref}
        className={cn(
          stackVariants({ 
            direction, 
            spacing, 
            align, 
            justify, 
            wrap, 
            padding, 
            background, 
            border, 
            rounded, 
            className 
          })
        )}
        data-component="stack"
        data-stack-direction={direction}
        data-stack-spacing={spacing}
        data-stack-align={align}
        data-stack-justify={justify}
        data-stack-wrap={wrap}
        data-stack-padding={padding}
        {...props}
      />
    );
  }
);

Stack.displayName = "Stack";

// Semantic horizontal stack component
export interface HStackProps extends Omit<StackProps, "direction"> {
  align?: "start" | "center" | "end" | "stretch" | "baseline";
}

const HStack = React.forwardRef<HTMLDivElement, HStackProps>(
  ({ align = "center", ...props }, ref) => {
    return <Stack 
      ref={ref} 
      direction="row" 
      align={align} 
      data-component="hstack"
      {...props} 
    />;
  }
);

HStack.displayName = "HStack";

// Semantic vertical stack component
export interface VStackProps extends Omit<StackProps, "direction"> {
  align?: "start" | "center" | "end" | "stretch" | "baseline";
}

const VStack = React.forwardRef<HTMLDivElement, VStackProps>(
  ({ align = "start", ...props }, ref) => {
    return <Stack 
      ref={ref} 
      direction="column" 
      align={align} 
      data-component="vstack"
      {...props} 
    />;
  }
);

VStack.displayName = "VStack";

export { Stack, HStack, VStack, stackVariants }; 