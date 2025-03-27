import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const boxVariants = cva(
  "",
  {
    variants: {
      // Layout
      display: {
        block: "block",
        inline: "inline",
        inlineBlock: "inline-block",
        flex: "flex",
        inlineFlex: "inline-flex",
        grid: "grid",
        inlineGrid: "inline-grid",
        table: "table",
        inlineTable: "inline-table",
        tableRow: "table-row",
        tableCell: "table-cell",
        tableColumn: "table-column",
        tableColumnGroup: "table-column-group",
        tableHeaderGroup: "table-header-group",
        tableFooterGroup: "table-footer-group",
        tableRowGroup: "table-row-group",
        tableCaption: "table-caption",
      },
      // Position
      position: {
        static: "static",
        relative: "relative",
        absolute: "absolute",
        fixed: "fixed",
        sticky: "sticky",
      },
      // Spacing
      padding: {
        none: "",
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
      // Visual styling
      background: {
        default: "",
        subtle: "bg-background-subtle",
        muted: "bg-background-muted",
        inverse: "bg-background-inverse",
        transparent: "bg-transparent",
      },
      border: {
        none: "",
        subtle: "border border-border-subtle",
        default: "border border-border",
        strong: "border-2 border-border",
      },
      shadow: {
        none: "",
        subtle: "shadow-sm",
        default: "shadow",
        strong: "shadow-lg",
        inner: "shadow-inner",
        outline: "shadow-outline",
      },
      rounded: {
        none: "",
        sm: "rounded-sm",
        md: "rounded-md",
        lg: "rounded-lg",
        xl: "rounded-xl",
        full: "rounded-full",
      },
      // Overflow
      overflow: {
        visible: "overflow-visible",
        hidden: "overflow-hidden",
        scroll: "overflow-scroll",
        auto: "overflow-auto",
        clip: "overflow-clip",
      },
      // Container query support
      container: {
        true: "@container",
        false: "",
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
      // Visibility
      visibility: {
        visible: "visible",
        hidden: "hidden",
        collapse: "collapse",
      },
      // Opacity
      opacity: {
        0: "opacity-0",
        25: "opacity-25",
        50: "opacity-50",
        75: "opacity-75",
        100: "opacity-100",
      },
      // Cursor
      cursor: {
        default: "cursor-default",
        pointer: "cursor-pointer",
        text: "cursor-text",
        move: "cursor-move",
        notAllowed: "cursor-not-allowed",
        wait: "cursor-wait",
        help: "cursor-help",
      },
      // Pointer events
      pointerEvents: {
        none: "pointer-events-none",
        auto: "pointer-events-auto",
      },
      // User select
      userSelect: {
        none: "select-none",
        text: "select-text",
        all: "select-all",
        auto: "select-auto",
      },
    },
    defaultVariants: {
      display: "block",
      position: "static",
      padding: "none",
      margin: "none",
      background: "default",
      border: "none",
      shadow: "none",
      rounded: "none",
      overflow: "visible",
      container: false,
      zIndex: "auto",
      width: "auto",
      height: "auto",
      visibility: "visible",
      opacity: 100,
      cursor: "default",
      pointerEvents: "auto",
      userSelect: "auto",
    },
  }
);

export interface BoxProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof boxVariants> {
  asChild?: boolean;
}

const Box = React.forwardRef<HTMLDivElement, BoxProps>(
  ({ 
    className, 
    display, 
    position, 
    padding, 
    margin, 
    background, 
    border, 
    shadow, 
    rounded, 
    overflow, 
    container, 
    zIndex, 
    width, 
    height, 
    visibility, 
    opacity, 
    cursor, 
    pointerEvents, 
    userSelect, 
    asChild = false, 
    ...props 
  }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          boxVariants({ 
            display, 
            position, 
            padding, 
            margin, 
            background, 
            border, 
            shadow, 
            rounded, 
            overflow, 
            container, 
            zIndex, 
            width, 
            height, 
            visibility, 
            opacity, 
            cursor, 
            pointerEvents, 
            userSelect, 
            className 
          })
        )}
        {...props}
      />
    );
  }
);

Box.displayName = "Box";

export { Box, boxVariants }; 