import React from "react";
import { cn } from "../../lib/utils";
import { useBrand } from "./BrandProvider";

export interface BrandContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  maxWidth?: "xs" | "sm" | "md" | "lg" | "xl" | "full" | "none" | "7xl";
  padding?: "none" | "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "default";
  centerContent?: boolean;
  fluid?: boolean;
  fullWidth?: boolean;
  paddingX?: "none" | "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "default";
  paddingY?: "none" | "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "default";
}

export const BrandContainer = React.forwardRef<HTMLDivElement, BrandContainerProps>(
  (
    {
      className,
      maxWidth = "7xl",
      padding = "md",
      centerContent = false,
      fluid = false,
      children,
      fullWidth = false,
      paddingX = "default",
      paddingY = "default",
      ...props
    },
    ref
  ) => {
    const { currentBrand } = useBrand();
    
    // Get brand spacing value for padding
    const getSpacingValue = (size: "none" | "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "default") => {
      if (size === "none") return "0";
      
      if (currentBrand?.spacing) {
        const { scale, baseline } = currentBrand.spacing;
        
        // Map size to index in the scale
        const indexMap: Record<string, number> = {
          xs: 1, // baseline * 1
          sm: 2, // baseline * 2
          md: 3, // baseline * 3
          lg: 4, // baseline * 4 
          xl: 5, // baseline * 5
          "2xl": 6, // baseline * 6
          default: 3 // Assuming default is 3 times the baseline
        };
        
        const index = indexMap[size];
        return scale[index] ? `${scale[index]}px` : undefined;
      }
      
      // Fallback if brand spacing not available
      const fallbackMap: Record<string, string> = {
        xs: "0.5rem",
        sm: "0.75rem",
        md: "1rem",
        lg: "1.5rem", 
        xl: "2rem",
        "2xl": "3rem",
        default: "1rem"
      };
      
      return fallbackMap[size];
    };
    
    // Get max-width based on size
    const getMaxWidth = () => {
      if (maxWidth === "none" || maxWidth === "full") {
        return maxWidth === "full" ? "100%" : "none";
      }
      
      // Check if brand has custom container widths
      if (currentBrand?.radii) {
        // Use radii as a proxy for getting container sizes if available in the brand config
        // In a real app, you might have dedicated container sizes in the brand config
      }
      
      // Fallback max-widths
      const maxWidths: Record<string, string> = {
        xs: "480px",
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "7xl": "1536px"
      };
      
      return maxWidths[maxWidth] || "1024px";
    };
    
    // Calculate padding based on brand spacing scale
    // Use a consistent 4px grid system for spacing
    const getPadding = (type: "x" | "y", value: "none" | "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "default") => {
      if (value === "none") return "0";
      
      const spacingMap: Record<string, string> = {
        xs: "0.25rem",
        sm: "0.5rem",
        md: "0.75rem",
        lg: "1rem",
        xl: "1.5rem",
        "2xl": "2rem",
        default: type === "x" ? "1rem" : "0.75rem" // Default Y padding reduced for better density
      };
      
      // Override with brand values if available
      if (currentBrand?.spacing?.scale) {
        const scale = currentBrand.spacing.scale;
        if (Array.isArray(scale)) {
          const indexMap: Record<string, number> = {
            xs: 1,
            sm: 2,
            md: 3,
            lg: 4,
            xl: 5,
            "2xl": 6
          };
          
          const index = indexMap[value];
          if (index !== undefined && scale[index] !== undefined) {
            return `${scale[index]}px`;
          }
        }
      }
      
      return spacingMap[value];
    };
    
    const paddingXValue = getPadding("x", paddingX);
    const paddingYValue = getPadding("y", paddingY);
    
    // Max width classes based on Tailwind size
    const maxWidthClass = maxWidth === "full" ? "max-w-none" : `max-w-${maxWidth}`;
    
    // Build container styles
    const containerStyles: React.CSSProperties = {
      maxWidth: getMaxWidth(),
      width: fluid ? "100%" : "auto",
      paddingLeft: paddingXValue,
      paddingRight: paddingXValue,
      paddingTop: paddingYValue,
      paddingBottom: paddingYValue
    };
    
    return (
      <div
        ref={ref}
        className={cn(
          "mx-auto bg-background text-foreground",
          centerContent && "flex flex-col items-center",
          !fullWidth && maxWidthClass,
          className
        )}
        style={containerStyles}
        {...props}
      >
        {children}
      </div>
    );
  }
); 