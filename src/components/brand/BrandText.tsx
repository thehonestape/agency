import React from "react";
import { cn } from "../../lib/utils";
import { useBrand, useBrandTypography } from "./BrandProvider";

export interface BrandTextProps extends React.HTMLAttributes<HTMLParagraphElement> {
  as?: "p" | "span" | "div";
  size?: "xs" | "sm" | "base" | "lg" | "xl";
  align?: "left" | "center" | "right" | "justify";
  weight?: "light" | "regular" | "medium" | "semiBold" | "bold";
  color?: "default" | "primary" | "secondary" | "accent" | "muted";
  italic?: boolean;
  truncate?: boolean;
  maxLines?: number;
}

export function BrandText({
  children,
  as = "p",
  className,
  size = "base",
  align = "left",
  weight = "regular",
  color = "default",
  italic = false,
  truncate = false,
  maxLines,
  ...props
}: BrandTextProps) {
  const { currentBrand } = useBrand();
  const typography = useBrandTypography();
  
  // Base classes for the text
  const baseClasses = [
    align === "left" ? "text-left" : 
      align === "center" ? "text-center" : 
      align === "right" ? "text-right" : "text-justify",
    italic && "italic",
    truncate && "truncate"
  ];
  
  // Font size based on size prop
  const sizeClasses = {
    xs: "text-xs",
    sm: "text-sm",
    base: "text-base",
    lg: "text-lg",
    xl: "text-xl",
  };
  
  // Color classes
  const colorClasses = {
    default: "text-foreground",
    primary: "text-primary",
    secondary: "text-secondary",
    accent: "text-accent",
    muted: "text-muted-foreground",
  };
  
  // Custom styling based on brand if available
  let brandStyle: React.CSSProperties = {};
  
  if (currentBrand && typography) {
    brandStyle = {
      fontFamily: typography.bodyFont || typography.fontFamily || "inherit",
      fontWeight: typography.fontWeights?.[weight] || 
                  (weight === "bold" ? 700 : 
                   weight === "semiBold" ? 600 : 
                   weight === "medium" ? 500 : 
                   weight === "regular" ? 400 : 300),
      lineHeight: typography.lineHeight || "inherit",
    };
    
    // Add max lines clamp if specified
    if (maxLines) {
      brandStyle.display = "-webkit-box";
      brandStyle.WebkitLineClamp = maxLines;
      brandStyle.WebkitBoxOrient = "vertical";
      brandStyle.overflow = "hidden";
    }
    
    // Add brand-specific color if needed
    if (color === "primary" && currentBrand.colors.find(c => c.isPrimary)) {
      brandStyle.color = currentBrand.colors.find(c => c.isPrimary)?.value || "hsl(var(--primary))";
    } else if (color === "secondary" && currentBrand.colors.find(c => c.isSecondary)) {
      brandStyle.color = currentBrand.colors.find(c => c.isSecondary)?.value || "hsl(var(--secondary))";
    } else if (color === "accent" && currentBrand.colors.find(c => c.isAccent)) {
      brandStyle.color = currentBrand.colors.find(c => c.isAccent)?.value || "hsl(var(--accent))";
    }
  }
  
  const Component = as;
  
  return React.createElement(
    Component,
    {
      className: cn(
        sizeClasses[size],
        colorClasses[color],
        ...baseClasses,
        className
      ),
      style: brandStyle,
      ...props
    },
    children
  );
} 