import React from "react";
import { cn } from "../../lib/utils";
import { useBrand } from "./BrandProvider";

export interface BrandHeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  size?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "5xl";
  weight?: "light" | "normal" | "medium" | "semibold" | "bold";
  tracking?: "tighter" | "tight" | "normal" | "wide" | "wider";
  variant?: "default" | "muted" | "gradient";
  align?: "left" | "center" | "right";
  withMargins?: boolean;
}

export function BrandHeading({
  children,
  className,
  level = 2,
  size,
  weight = "semibold",
  tracking = "normal",
  variant = "default",
  align = "left",
  withMargins = true,
  ...props
}: BrandHeadingProps) {
  const { currentBrand } = useBrand();
  
  // Map heading levels to default sizes if not overridden
  const defaultSizes = {
    1: "3xl", // h1 -> 1.875rem
    2: "xl",  // h2 -> 1.25rem
    3: "lg",  // h3 -> 1.125rem
    4: "base", // h4 -> 1rem
    5: "sm",  // h5 -> 0.875rem
    6: "xs"   // h6 -> 0.75rem
  };
  
  // Use size prop if provided, otherwise use default based on heading level
  const headingSize = size || defaultSizes[level as keyof typeof defaultSizes];
  
  // Map sizes to Tailwind classes
  const sizeClasses = {
    xs: "text-xs",
    sm: "text-sm",
    base: "text-base",
    lg: "text-lg",
    xl: "text-xl",
    "2xl": "text-2xl",
    "3xl": "text-3xl",
    "4xl": "text-4xl",
    "5xl": "text-5xl"
  };
  
  // Map weights to Tailwind classes
  const weightClasses = {
    light: "font-light",
    normal: "font-normal",
    medium: "font-medium",
    semibold: "font-semibold",
    bold: "font-bold"
  };
  
  // Map tracking to Tailwind classes
  const trackingClasses = {
    tighter: "tracking-tighter",
    tight: "tracking-tight",
    normal: "tracking-normal",
    wide: "tracking-wide",
    wider: "tracking-wider"
  };
  
  // Map alignment to Tailwind classes
  const alignClasses = {
    left: "text-left",
    center: "text-center",
    right: "text-right"
  };
  
  // Margin classes based on heading level for better spacing rhythm
  const marginClasses = withMargins ? {
    1: "mt-6 mb-4", // Reduced spacing for h1
    2: "mt-5 mb-3", // Reduced spacing for h2
    3: "mt-4 mb-2", // Reduced spacing for h3
    4: "mt-3 mb-2", // Modest spacing for h4
    5: "mt-2 mb-1", // Subtle spacing for h5
    6: "mt-2 mb-1"  // Minimal spacing for h6
  } : {};
  
  // Variant classes
  const variantClasses = {
    default: "text-foreground",
    muted: "text-muted-foreground",
    gradient: "text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent"
  };
  
  // Create a ref to access DOM for custom font styling if needed
  const headingRef = React.useRef<HTMLHeadingElement>(null);
  
  // Apply custom typography from brand
  React.useEffect(() => {
    if (headingRef.current && currentBrand?.typography) {
      // Apply heading font from brand settings
      const headingFont = currentBrand.typography.headingFont;
      if (headingFont) {
        headingRef.current.style.fontFamily = headingFont;
      }
      
      // Apply custom line height if available
      if (currentBrand.typography.lineHeight) {
        // Access the lineHeight property based on typography configuration
        headingRef.current.style.lineHeight = currentBrand.typography.lineHeight;
      }
    }
  }, [currentBrand]);
  
  // Line height adjustment for better readability
  const lineHeightClass = level <= 2 ? "leading-tight" : "leading-normal";
  
  // Create the heading element based on level with proper typing
  const HeadingComponent = `h${level}` as 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  
  return (
    <HeadingComponent
      ref={headingRef}
      className={cn(
        // Base heading style
        "max-w-prose",
        // Size based on level or override
        sizeClasses[headingSize as keyof typeof sizeClasses],
        // Font weight
        weightClasses[weight],
        // Letter spacing
        trackingClasses[tracking],
        // Text alignment
        alignClasses[align],
        // Margins based on level
        withMargins && marginClasses[level as keyof typeof marginClasses],
        // Line height for better readability
        lineHeightClass,
        // Color variant
        variantClasses[variant],
        // Custom className
        className
      )}
      {...props}
    >
      {children}
    </HeadingComponent>
  );
} 