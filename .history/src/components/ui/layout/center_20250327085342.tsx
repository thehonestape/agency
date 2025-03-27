import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const centerVariants = cva(
  "flex",
  {
    variants: {
      // Display type
      display: {
        flex: "flex",
        inline: "inline-flex",
      },
      // Alignment direction
      direction: {
        horizontal: "justify-center",
        vertical: "items-center",
        both: "items-center justify-center",
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
      // Size
      width: {
        auto: "w-auto",
        full: "w-full",
        screen: "w-screen",
        min: "w-min",
        max: "w-max",
        fit: "w-fit",
      },
      height: {
        auto: "h-auto",
        full: "h-full",
        screen: "h-screen",
        min: "h-min",
        max: "h-max",
        fit: "h-fit",
      },
      // Overflow
      overflow: {
        visible: "overflow-visible",
        hidden: "overflow-hidden",
        scroll: "overflow-scroll",
        auto: "overflow-auto",
        clip: "overflow-clip",
      },
      // Position
      position: {
        static: "static",
        relative: "relative",
        absolute: "absolute",
        fixed: "fixed",
        sticky: "sticky",
      },
      // Z-index
      zIndex: {
        auto: "z-auto",
        base: "z-0",
        dropdown: "z-10",
        sticky: "z-20",
        fixed: "z-30",
        modal: "z-40",
        popover: "z-50",
        tooltip: "z-60",
      },
    },
    defaultVariants: {
      display: "flex",
      direction: "both",
      align: "center",
      justify: "center",
      gap: "none",
      container: false,
      background: "default",
      border: "none",
      rounded: "none",
      padding: "none",
      margin: "none",
      width: "auto",
      height: "auto",
      overflow: "visible",
      position: "static",
      zIndex: "auto",
    },
  }
);

export interface CenterProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof centerVariants> {
  asChild?: boolean;
}

const Center = React.forwardRef<HTMLDivElement, CenterProps>(
  ({ 
    className, 
    display, 
    direction, 
    align, 
    justify, 
    gap, 
    container, 
    background, 
    border, 
    rounded, 
    padding, 
    margin, 
    width, 
    height, 
    overflow, 
    position, 
    zIndex, 
    asChild = false, 
    ...props 
  }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          centerVariants({ 
            display, 
            direction, 
            align, 
            justify, 
            gap, 
            container, 
            background, 
            border, 
            rounded, 
            padding, 
            margin, 
            width, 
            height, 
            overflow, 
            position, 
            zIndex, 
            className 
          })
        )}
        {...props}
      />
    );
  }
);

Center.displayName = "Center";

export { Center, centerVariants }; 