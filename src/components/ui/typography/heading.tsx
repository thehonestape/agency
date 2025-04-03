import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const headingVariants = cva(
  "tracking-tight select-none font-[var(--font-maison-neue)]",
  {
    variants: {
      variant: {
        display: "text-5xl leading-tight font-semibold text-default",
        title: "text-4xl leading-tight font-semibold text-default",
        heading: "text-3xl leading-snug font-medium text-default",
        subheading: "text-2xl leading-snug font-medium text-default",
        subtitle: "text-xl leading-normal font-medium text-default",
        label: "text-lg leading-normal font-medium text-default",
      },
      level: {
        h1: "",
        h2: "",
        h3: "",
        h4: "",
        h5: "",
        h6: "",
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
      variant: "title",
      level: "h1",
      state: "default",
      align: "left",
      weight: "semibold",
    },
  }
);

export interface HeadingProps
  extends React.HTMLAttributes<HTMLHeadingElement>,
    VariantProps<typeof headingVariants> {
  asChild?: boolean;
}

const Heading = React.forwardRef<HTMLHeadingElement, HeadingProps>(
  ({ className, variant = "title", level = "h1", size, state, align, weight, asChild = false, ...props }, ref) => {
    const Component = level as "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
    
    // Map semantic variants to default sizes if size is not explicitly provided
    const getDefaultSize = () => {
      if (size) return size;
      
      switch (variant) {
        case 'display': return '5xl';
        case 'title': return '4xl';
        case 'heading': return '3xl';
        case 'subheading': return '2xl';
        case 'subtitle': return 'xl';
        case 'label': return 'lg';
        default: return '4xl';
      }
    };

    // Default weight based on variant if not explicitly provided
    const getDefaultWeight = () => {
      if (weight) return weight;
      
      switch (variant) {
        case 'display': return 'semibold';
        case 'title': return 'semibold';
        case 'heading': return 'medium';
        case 'subheading': return 'medium';
        case 'subtitle': return 'medium';
        case 'label': return 'medium';
        default: return 'semibold';
      }
    };

    const resolvedSize = getDefaultSize();
    const resolvedWeight = getDefaultWeight();

    return (
      <Component
        ref={ref}
        className={cn(headingVariants({ 
          variant, 
          level,
          size: resolvedSize, 
          state, 
          align, 
          weight: resolvedWeight, 
          className 
        }))}
        data-component="heading"
        data-heading-variant={variant}
        data-heading-level={level}
        data-heading-size={resolvedSize}
        data-heading-state={state}
        data-heading-align={align}
        data-heading-weight={resolvedWeight}
        {...props}
      />
    );
  }
);

Heading.displayName = "Heading";

// Add SubHeading Component for convenience
export interface SubHeadingProps 
  extends Omit<HeadingProps, 'variant' | 'level'> {
  level?: 1 | 2 | 3;
}

const SubHeading = React.forwardRef<HTMLHeadingElement, SubHeadingProps>(
  ({ className, level = 1, size, state, align, weight, ...props }, ref) => {
    // Map subheading levels to variants, sizes and styling
    const getSubheadingProps = () => {
      switch (level) {
        case 1:
          return {
            variant: 'subheading' as const,
            htmlLevel: 'h3' as const,
            defaultSize: '2xl' as const,
            defaultWeight: 'medium' as const,
            className: cn('mb-4', className),
          };
        case 2:
          return {
            variant: 'subtitle' as const,
            htmlLevel: 'h4' as const,
            defaultSize: 'xl' as const,
            defaultWeight: 'medium' as const,
            className: cn('mb-3', className),
          };
        case 3:
          return {
            variant: 'label' as const,
            htmlLevel: 'h5' as const,
            defaultSize: 'lg' as const,
            defaultWeight: 'medium' as const,
            className: cn('mb-2', className),
          };
        default:
          return {
            variant: 'subheading' as const,
            htmlLevel: 'h3' as const,
            defaultSize: '2xl' as const,
            defaultWeight: 'medium' as const,
            className: cn('mb-4', className),
          };
      }
    };

    const { variant, htmlLevel, defaultSize, defaultWeight, className: combinedClassName } = getSubheadingProps();

    return (
      <Heading
        ref={ref}
        variant={variant}
        level={htmlLevel}
        size={size || defaultSize}
        weight={weight || defaultWeight}
        state={state}
        align={align}
        className={combinedClassName}
        {...props}
      />
    );
  }
);

SubHeading.displayName = "SubHeading";

export { Heading, SubHeading, headingVariants };