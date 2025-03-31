import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const headingVariants = cva(
  "tracking-tight select-none font-[var(--font-maison-neue)]",
  {
    variants: {
      variant: {
        h1: "text-4xl leading-tight font-bold text-default",
        h2: "text-3xl leading-snug font-semibold text-default",
        h3: "text-2xl leading-snug font-semibold text-default",
        h4: "text-xl leading-normal font-medium text-default",
        h5: "text-lg leading-normal font-medium text-default",
        h6: "text-base leading-normal font-medium text-default",
      },
      size: {
        xs: "text-xs text-fluid-xs leading-tight",
        sm: "text-sm text-fluid-sm leading-snug",
        base: "text-base text-fluid-base leading-normal",
        lg: "text-lg text-fluid-lg leading-relaxed",
        xl: "text-xl text-fluid-xl leading-loose",
        "2xl": "text-2xl text-fluid-2xl leading-tight",
        "3xl": "text-3xl text-fluid-3xl leading-tight",
        "4xl": "text-4xl text-fluid-4xl leading-tight",
        "5xl": "text-5xl text-fluid-5xl leading-tight",
        "6xl": "text-6xl text-fluid-6xl leading-tight",
        "7xl": "text-7xl text-fluid-7xl leading-tight",
        "8xl": "text-8xl text-fluid-8xl leading-tight",
      },
      state: {
        default: "",
        muted: "text-muted",
        disabled: "text-muted/50",
      },
      align: {
        left: "text-left",
        center: "text-center",
        right: "text-right",
      },
      weight: {
        regular: "font-normal",
        medium: "font-medium",
        semibold: "font-semibold",
        bold: "font-bold",
      },
    },
    defaultVariants: {
      variant: "h1",
      state: "default",
      align: "left",
      weight: "bold",
    },
  }
);

export interface HeadingProps
  extends React.HTMLAttributes<HTMLHeadingElement>,
    VariantProps<typeof headingVariants> {
  asChild?: boolean;
}

const Heading = React.forwardRef<HTMLHeadingElement, HeadingProps>(
  ({ className, variant = "h1", size, state, align, weight, asChild = false, ...props }, ref) => {
    const Component = variant as "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
    
    // Map heading variants to default sizes if size is not explicitly provided
    const getDefaultSize = () => {
      if (size) return size;
      
      switch (variant) {
        case 'h1': return '4xl';
        case 'h2': return '3xl';
        case 'h3': return '2xl';
        case 'h4': return 'xl';
        case 'h5': return 'lg';
        case 'h6': return 'base';
        default: return '4xl';
      }
    };

    const resolvedSize = getDefaultSize();

    return (
      <Component
        ref={ref}
        className={cn(headingVariants({ 
          variant, 
          size: resolvedSize, 
          state, 
          align, 
          weight, 
          className 
        }))}
        data-component="heading"
        data-heading-level={variant}
        data-heading-size={resolvedSize}
        data-heading-state={state}
        data-heading-align={align}
        data-heading-weight={weight}
        {...props}
      />
    );
  }
);

Heading.displayName = "Heading";

// Add SubHeading Component for convenience
interface SubHeadingProps extends Omit<HeadingProps, 'variant'> {
  level?: 1 | 2 | 3;
}

const SubHeading = React.forwardRef<HTMLHeadingElement, SubHeadingProps>(
  ({ className, level = 1, size, state, align, weight, ...props }, ref) => {
    // Map subheading levels to sizes and styling
    const getSubheadingProps = () => {
      switch (level) {
        case 1:
          return {
            variant: 'h3' as const,
            defaultSize: size || 'xl',
            defaultWeight: weight || 'semibold',
            className: cn('text-muted-foreground', className)
          };
        case 2:
          return {
            variant: 'h4' as const,
            defaultSize: size || 'lg',
            defaultWeight: weight || 'medium',
            className: cn('text-muted-foreground', className)
          };
        case 3:
          return {
            variant: 'h5' as const,
            defaultSize: size || 'base',
            defaultWeight: weight || 'medium',
            className: cn('text-muted-foreground', className)
          };
      }
    };

    const { variant, defaultSize, defaultWeight, className: combinedClassName } = getSubheadingProps();

    return (
      <Heading
        ref={ref}
        variant={variant}
        size={defaultSize as any}
        weight={defaultWeight as any}
        state={state}
        align={align}
        className={combinedClassName}
        data-component="subheading"
        data-subheading-level={level}
        {...props}
      />
    );
  }
);

SubHeading.displayName = "SubHeading";

export { Heading, SubHeading, headingVariants }; 