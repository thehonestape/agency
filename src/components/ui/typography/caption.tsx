import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const captionVariants = cva(
  "text-sm text-muted-foreground",
  {
    variants: {
      variant: {
        default: "text-muted-foreground",
        muted: "text-muted-foreground/80",
        accent: "text-accent-foreground",
        info: "text-info",
      },
      size: {
        xs: "text-xs",
        sm: "text-sm",
        base: "text-base",
      },
      weight: {
        regular: "font-normal",
        medium: "font-medium",
        semibold: "font-semibold",
      },
      align: {
        left: "text-left",
        center: "text-center",
        right: "text-right",
      },
      spacing: {
        none: "mt-0",
        xs: "mt-1", // 4px
        sm: "mt-2", // 8px
        md: "mt-3", // 12px
      },
      italic: {
        true: "italic",
        false: "",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "sm",
      weight: "regular",
      align: "left",
      spacing: "sm",
      italic: false,
    },
  }
);

export interface CaptionProps
  extends React.HTMLAttributes<HTMLParagraphElement>,
    VariantProps<typeof captionVariants> {
  asChild?: boolean;
}

const Caption = React.forwardRef<HTMLParagraphElement, CaptionProps>(
  ({ 
    className, 
    variant, 
    size, 
    weight, 
    align, 
    spacing,
    italic,
    asChild = false, 
    ...props 
  }, ref) => {
    return (
      <p
        ref={ref}
        className={cn(captionVariants({ 
          variant, 
          size, 
          weight, 
          align, 
          spacing,
          italic,
          className 
        }))}
        data-component="caption"
        data-caption-variant={variant}
        data-caption-size={size}
        data-caption-weight={weight}
        data-caption-align={align}
        data-caption-spacing={spacing}
        data-caption-italic={italic}
        {...props}
      />
    );
  }
);

Caption.displayName = "Caption";

export { Caption, captionVariants };
