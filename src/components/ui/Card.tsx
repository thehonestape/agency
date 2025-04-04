import * as React from 'react';
import { cn } from '../../lib/utils';
import { cva, type VariantProps } from 'class-variance-authority';

// Card class utilities for the dual API
export const cardClasses = {
  base: 'rounded-lg border border-card-border bg-card text-card-foreground transition-all duration-200 shadow-sm',
  
  // Variant classes
  variant: {
    default: 'shadow-sm hover:shadow-md',
    flat: 'border-none shadow-none',
    outlined: 'shadow-none',
    elevated: 'shadow-md hover:shadow-lg',
    // Chakra-style variants
    subtle: 'bg-muted/50 border-muted shadow-none',
    solid: 'bg-primary text-primary-foreground shadow-sm',
    ghost: 'bg-transparent border-transparent shadow-none',
  },
  
  // Density classes
  density: {
    default: '',
    compact: 'p-0',
    comfortable: 'p-2',
  },
  
  // Interactive classes
  interactive: {
    true: 'cursor-pointer hover:translate-y-[-2px] active:translate-y-[0px]',
    false: '',
  },
  
  // Size classes (Chakra-style)
  size: {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
    '2xl': 'max-w-2xl',
    full: 'w-full',
  },
  
  // Elevation classes (Chakra-style)
  elevation: {
    none: 'shadow-none',
    sm: 'shadow-sm',
    md: 'shadow-md',
    lg: 'shadow-lg',
    xl: 'shadow-xl',
  },
  
  // Border radius classes (Chakra-style)
  borderRadius: {
    none: 'rounded-none',
    sm: 'rounded-sm',
    md: 'rounded-md',
    lg: 'rounded-lg',
    xl: 'rounded-xl',
    full: 'rounded-full',
  },
};

// Legacy cardVariants for backward compatibility
const cardVariants = cva(
  cardClasses.base,
  {
    variants: {
      variant: {
        default: cardClasses.variant.default,
        flat: cardClasses.variant.flat,
        outlined: cardClasses.variant.outlined,
        elevated: cardClasses.variant.elevated,
        subtle: cardClasses.variant.subtle,
        solid: cardClasses.variant.solid,
        ghost: cardClasses.variant.ghost,
      },
      density: {
        default: cardClasses.density.default,
        compact: cardClasses.density.compact,
        comfortable: cardClasses.density.comfortable,
      },
      interactive: {
        true: cardClasses.interactive.true,
        false: cardClasses.interactive.false,
      },
      size: {
        sm: cardClasses.size.sm,
        md: cardClasses.size.md,
        lg: cardClasses.size.lg,
        xl: cardClasses.size.xl,
        '2xl': cardClasses.size['2xl'],
        full: cardClasses.size.full,
      },
      elevation: {
        none: cardClasses.elevation.none,
        sm: cardClasses.elevation.sm,
        md: cardClasses.elevation.md,
        lg: cardClasses.elevation.lg,
        xl: cardClasses.elevation.xl,
      },
      borderRadius: {
        none: cardClasses.borderRadius.none,
        sm: cardClasses.borderRadius.sm,
        md: cardClasses.borderRadius.md,
        lg: cardClasses.borderRadius.lg,
        xl: cardClasses.borderRadius.xl,
        full: cardClasses.borderRadius.full,
      },
    },
    defaultVariants: {
      variant: 'default',
      density: 'default',
      interactive: false,
      size: 'md',
      elevation: 'none',
      borderRadius: 'lg',
    },
  }
);

interface CardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {
  // Common props
  interactive?: boolean;
  
  // Prop-based API (Chakra-like)
  colorScheme?: "primary" | "secondary" | "neutral" | "accent";
  isInteractive?: boolean;
  hasShadow?: boolean;
  hasBorder?: boolean;
  maxW?: "sm" | "md" | "lg" | "xl" | "2xl" | "full";
  rounded?: "none" | "sm" | "md" | "lg" | "xl" | "full";
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ 
    // Common props
    className, 
    
    // Legacy props
    variant = 'default',
    density = 'default',
    interactive = false,
    size,
    elevation,
    borderRadius,
    
    // Prop-based API (Chakra-like)
    colorScheme,
    isInteractive,
    hasShadow,
    hasBorder,
    maxW,
    rounded,
    
    ...props 
  }, ref) => {
    // Resolve prop values, prioritizing Chakra-style props
    const resolvedInteractive = isInteractive !== undefined ? isInteractive : interactive;
    const resolvedSize = maxW || size;
    const resolvedBorderRadius = rounded || borderRadius;
    
    // Determine elevation based on hasShadow
    const resolvedElevation = hasShadow === false 
      ? 'none' 
      : hasShadow === true 
        ? 'md' 
        : elevation;
    
    // Determine variant based on colorScheme and hasBorder
    let resolvedVariant = variant;
    if (colorScheme) {
      resolvedVariant = 'solid'; // Default to solid when colorScheme is provided
    }
    if (hasBorder === false && resolvedVariant === 'default') {
      resolvedVariant = 'flat';
    }
    
    // Generate appropriate classes
    const classes = cn(
      // Base card classes
      cardClasses.base,
      
      // Apply variant
      cardClasses.variant[resolvedVariant as keyof typeof cardClasses.variant],
      
      // Apply density
      cardClasses.density[density as keyof typeof cardClasses.density],
      
      // Apply interactive
      resolvedInteractive && cardClasses.interactive.true,
      
      // Apply size
      resolvedSize && cardClasses.size[resolvedSize as keyof typeof cardClasses.size],
      
      // Apply elevation
      resolvedElevation && cardClasses.elevation[resolvedElevation as keyof typeof cardClasses.elevation],
      
      // Apply border radius
      resolvedBorderRadius && cardClasses.borderRadius[resolvedBorderRadius as keyof typeof cardClasses.borderRadius],
      
      // Apply color scheme
      colorScheme && `bg-${colorScheme} text-${colorScheme}-foreground`,
      
      // Apply custom classes
      className
    );
    
    return (
      <div
        ref={ref}
        className={classes}
        data-component="card"
        data-card-variant={resolvedVariant}
        data-card-density={density}
        data-card-interactive={resolvedInteractive}
        data-card-size={resolvedSize}
        data-card-elevation={resolvedElevation}
        data-card-border-radius={resolvedBorderRadius}
        data-card-color-scheme={colorScheme}
        {...props}
      />
    );
  }
);
Card.displayName = 'Card';

// Card Header component
export const headerClasses = {
  base: 'flex flex-col space-y-1.5',
  
  // Density classes
  density: {
    default: 'p-6',
    compact: 'p-3',
    comfortable: 'p-8',
  },
};

const headerVariants = cva(
  headerClasses.base, 
  {
    variants: {
      density: {
        default: headerClasses.density.default,
        compact: headerClasses.density.compact,
        comfortable: headerClasses.density.comfortable,
      },
    },
    defaultVariants: {
      density: 'default',
    },
  }
);

interface CardHeaderProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof headerVariants> {
  // Prop-based API (Chakra-like)
  spacing?: "tight" | "default" | "loose";
  align?: "left" | "center" | "right";
}

const CardHeader = React.forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ 
    className, 
    density = 'default',
    spacing,
    align,
    ...props 
  }, ref) => {
    // Generate appropriate classes
    const classes = cn(
      // Base header classes
      headerClasses.base,
      
      // Apply density
      headerClasses.density[density as keyof typeof headerClasses.density],
      
      // Apply spacing
      spacing === "tight" && "space-y-1",
      spacing === "loose" && "space-y-2",
      
      // Apply alignment
      align === "center" && "items-center text-center",
      align === "right" && "items-end text-right",
      
      // Apply custom classes
      className
    );
    
    return (
      <div
        ref={ref}
        className={classes}
        data-component="card-header"
        data-card-density={density}
        data-card-header-spacing={spacing}
        data-card-header-align={align}
        {...props}
      />
    );
  }
);
CardHeader.displayName = 'CardHeader';

// Card Title component
export const titleClasses = {
  base: 'font-semibold leading-none tracking-tight text-card-foreground',
  
  // Size classes
  size: {
    sm: 'text-xl',
    default: 'text-2xl',
    lg: 'text-3xl',
    xl: 'text-4xl',
  },
};

const titleVariants = cva(
  titleClasses.base,
  {
    variants: {
      size: {
        sm: titleClasses.size.sm,
        default: titleClasses.size.default,
        lg: titleClasses.size.lg,
        xl: titleClasses.size.xl,
      },
    },
    defaultVariants: {
      size: 'default',
    },
  }
);

interface CardTitleProps
  extends React.HTMLAttributes<HTMLHeadingElement>,
    VariantProps<typeof titleVariants> {
  // Prop-based API (Chakra-like)
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  isTruncated?: boolean;
}

const CardTitle = React.forwardRef<HTMLHeadingElement, CardTitleProps>(
  ({ 
    className, 
    size = 'default',
    as: Component = 'h3',
    isTruncated,
    ...props 
  }, ref) => {
    // Generate appropriate classes
    const classes = cn(
      // Base title classes
      titleClasses.base,
      
      // Apply size
      titleClasses.size[size as keyof typeof titleClasses.size],
      
      // Apply truncation
      isTruncated && "truncate",
      
      // Apply custom classes
      className
    );
    
    return (
      <Component
        ref={ref}
        className={classes}
        data-component="card-title"
        data-text-size={size}
        data-text-truncated={isTruncated}
        {...props}
      />
    );
  }
);
CardTitle.displayName = 'CardTitle';

// Card Description component
export const descriptionClasses = {
  base: 'text-muted-foreground',
  
  // Size classes
  size: {
    sm: 'text-xs',
    default: 'text-base',
    lg: 'text-base',
    xl: 'text-lg',
  },
};

const descriptionVariants = cva(
  descriptionClasses.base,
  {
    variants: {
      size: {
        sm: descriptionClasses.size.sm,
        default: descriptionClasses.size.default,
        lg: descriptionClasses.size.lg,
        xl: descriptionClasses.size.xl,
      },
    },
    defaultVariants: {
      size: 'default',
    },
  }
);

interface CardDescriptionProps
  extends React.HTMLAttributes<HTMLParagraphElement>,
    VariantProps<typeof descriptionVariants> {
  // Prop-based API (Chakra-like)
  noOfLines?: number;
}

const CardDescription = React.forwardRef<HTMLParagraphElement, CardDescriptionProps>(
  ({ 
    className, 
    size = 'default',
    noOfLines,
    ...props 
  }, ref) => {
    // Generate appropriate classes
    const classes = cn(
      // Base description classes
      descriptionClasses.base,
      
      // Apply size
      descriptionClasses.size[size as keyof typeof descriptionClasses.size],
      
      // Apply line clamping
      noOfLines === 1 && "truncate",
      noOfLines && noOfLines > 1 && `line-clamp-${noOfLines}`,
      
      // Apply custom classes
      className
    );
    
    return (
      <p
        ref={ref}
        className={classes}
        data-component="card-description"
        data-text-size={size}
        data-text-lines={noOfLines}
        {...props}
      />
    );
  }
);
CardDescription.displayName = 'CardDescription';

// Card Content component
export const contentClasses = {
  base: '',
  
  // Density classes
  density: {
    default: 'p-6 pt-0',
    compact: 'p-3 pt-0',
    comfortable: 'p-8 pt-0',
  },
};

const contentVariants = cva(
  contentClasses.base,
  {
    variants: {
      density: {
        default: contentClasses.density.default,
        compact: contentClasses.density.compact,
        comfortable: contentClasses.density.comfortable,
      },
    },
    defaultVariants: {
      density: 'default',
    },
  }
);

interface CardContentProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof contentVariants> {
  // Prop-based API (Chakra-like)
  spacing?: "tight" | "default" | "loose";
}

const CardContent = React.forwardRef<HTMLDivElement, CardContentProps>(
  ({ 
    className, 
    density = 'default',
    spacing,
    ...props 
  }, ref) => {
    // Generate appropriate classes
    const classes = cn(
      // Base content classes
      contentClasses.base,
      
      // Apply density
      contentClasses.density[density as keyof typeof contentClasses.density],
      
      // Apply spacing
      spacing === "tight" && "space-y-2",
      spacing === "default" && "space-y-4",
      spacing === "loose" && "space-y-6",
      
      // Apply custom classes
      className
    );
    
    return (
      <div
        ref={ref}
        className={classes}
        data-component="card-content"
        data-card-density={density}
        data-card-content-spacing={spacing}
        {...props}
      />
    );
  }
);
CardContent.displayName = 'CardContent';

// Card Footer component
export const footerClasses = {
  base: 'flex items-center',
  
  // Density classes
  density: {
    default: 'p-6 pt-0',
    compact: 'p-3 pt-0',
    comfortable: 'p-8 pt-0',
  },
  
  // Alignment classes
  align: {
    left: 'justify-start',
    center: 'justify-center',
    right: 'justify-end',
    between: 'justify-between',
  },
};

const footerVariants = cva(
  footerClasses.base,
  {
    variants: {
      density: {
        default: footerClasses.density.default,
        compact: footerClasses.density.compact,
        comfortable: footerClasses.density.comfortable,
      },
      align: {
        left: footerClasses.align.left,
        center: footerClasses.align.center,
        right: footerClasses.align.right,
        between: footerClasses.align.between,
      },
    },
    defaultVariants: {
      density: 'default',
      align: 'left',
    },
  }
);

interface CardFooterProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof footerVariants> {
  // Prop-based API (Chakra-like)
  spacing?: "tight" | "default" | "loose";
  borderTop?: boolean;
}

const CardFooter = React.forwardRef<HTMLDivElement, CardFooterProps>(
  ({ 
    className, 
    density = 'default',
    align = 'left',
    spacing,
    borderTop,
    ...props 
  }, ref) => {
    // Generate appropriate classes
    const classes = cn(
      // Base footer classes
      footerClasses.base,
      
      // Apply density
      footerClasses.density[density as keyof typeof footerClasses.density],
      
      // Apply alignment
      footerClasses.align[align as keyof typeof footerClasses.align],
      
      // Apply spacing
      spacing === "tight" && "gap-2",
      spacing === "default" && "gap-4",
      spacing === "loose" && "gap-6",
      
      // Apply border top
      borderTop && "border-t pt-4 mt-4",
      
      // Apply custom classes
      className
    );
    
    return (
      <div
        ref={ref}
        className={classes}
        data-component="card-footer"
        data-card-density={density}
        data-card-footer-align={align}
        data-card-footer-spacing={spacing}
        data-card-footer-border-top={borderTop}
        {...props}
      />
    );
  }
);
CardFooter.displayName = 'CardFooter';

export { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter };
