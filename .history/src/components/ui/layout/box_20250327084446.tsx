import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const boxVariants = cva(
  "",
  {
    variants: {
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
        none: "m-0",
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
      rounded: {
        none: "",
        sm: "rounded-sm",
        md: "rounded-md",
        lg: "rounded-lg",
        xl: "rounded-xl",
        full: "rounded-full",
      },
      shadow: {
        none: "",
        subtle: "shadow-sm",
        default: "shadow",
        strong: "shadow-lg",
        inner: "shadow-inner",
        outline: "shadow-outline",
      },
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
      position: {
        static: "static",
        relative: "relative",
        absolute: "absolute",
        fixed: "fixed",
        sticky: "sticky",
      },
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
    },
    defaultVariants: {
      display: "block",
      position: "static",
      overflow: "visible",
      padding: "none",
      margin: "none",
      background: "default",
      border: "none",
      rounded: "none",
      shadow: "none",
      container: false,
      zIndex: "auto",
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
    overflow, 
    padding, 
    margin, 
    background, 
    border, 
    rounded, 
    shadow, 
    container, 
    zIndex, 
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
            overflow, 
            padding, 
            margin, 
            background, 
            border, 
            rounded, 
            shadow, 
            container, 
            zIndex, 
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