import React from "react";
import { cn } from "../../lib/utils";
import { useBrand } from "./BrandProvider";

export interface BrandGridProps extends React.HTMLAttributes<HTMLDivElement> {
  columns?: 1 | 2 | 3 | 4 | 5 | 6 | 12 | "auto" | "auto-fill" | "auto-fit";
  gap?: "none" | "xs" | "sm" | "md" | "lg" | "xl";
  rowGap?: "none" | "xs" | "sm" | "md" | "lg" | "xl";
  columnGap?: "none" | "xs" | "sm" | "md" | "lg" | "xl";
  alignItems?: "start" | "center" | "end" | "stretch";
  justifyItems?: "start" | "center" | "end" | "stretch";
  responsive?: boolean;
  minColumnWidth?: string;
  container?: boolean;
  fluid?: boolean;
}

export const BrandGrid = React.forwardRef<HTMLDivElement, BrandGridProps>(
  (
    {
      className,
      columns = 1,
      gap = "md",
      rowGap,
      columnGap,
      alignItems,
      justifyItems,
      responsive = true,
      minColumnWidth = "250px",
      container = false,
      fluid = false,
      children,
      ...props
    },
    ref
  ) => {
    const { currentBrand } = useBrand();
    
    // Get brand spacing scale if available
    const getSpacingValue = (size: "none" | "xs" | "sm" | "md" | "lg" | "xl") => {
      if (size === "none") return "0";
      
      if (currentBrand?.spacing) {
        const { scale, baseline } = currentBrand.spacing;
        
        // Map size to index in the scale
        const indexMap: Record<string, number> = {
          xs: 1, // baseline * 1
          sm: 2, // baseline * 2
          md: 3, // baseline * 3
          lg: 5, // baseline * 5 
          xl: 7  // baseline * 7
        };
        
        const index = indexMap[size];
        return scale[index] ? `${scale[index]}px` : undefined;
      }
      
      // Fallback if brand spacing not available
      const fallbackMap: Record<string, string> = {
        xs: "0.25rem",
        sm: "0.5rem",
        md: "1rem",
        lg: "1.5rem", 
        xl: "2rem"
      };
      
      return fallbackMap[size];
    };
    
    // Build grid template columns style
    const getGridTemplateColumns = () => {
      if (typeof columns === "number") {
        return `repeat(${columns}, minmax(0, 1fr))`;
      }
      
      if (columns === "auto-fill" || columns === "auto-fit") {
        return `repeat(${columns}, minmax(${minColumnWidth}, 1fr))`;
      }
      
      return "auto";
    };
    
    // Build responsive class for columns
    const getResponsiveColumns = () => {
      if (!responsive || typeof columns !== "number") return "";
      
      // Only apply responsive columns for standard multi-column layouts
      if (columns <= 1) return "";
      
      // Create responsive breakpoints for different column counts
      const mobileColumns = columns > 2 ? 1 : columns;
      const tabletColumns = columns > 4 ? 2 : columns;
      
      return `grid-cols-${mobileColumns} sm:grid-cols-${Math.min(2, columns)} md:grid-cols-${tabletColumns} lg:grid-cols-${columns}`;
    };
    
    // Build container class
    const getContainerClass = () => {
      if (!container) return "";
      return fluid ? "w-full" : "container mx-auto px-4";
    };
    
    // Build CSS styles for the grid
    const gridStyles: React.CSSProperties = {};
    
    // Apply grid template columns only if not using responsive Tailwind classes
    if (!responsive || typeof columns !== "number") {
      gridStyles.gridTemplateColumns = getGridTemplateColumns();
    }
    
    // Apply gap values
    const gapValue = getSpacingValue(gap);
    const rowGapValue = rowGap ? getSpacingValue(rowGap) : undefined;
    const columnGapValue = columnGap ? getSpacingValue(columnGap) : undefined;
    
    if (gapValue) {
      gridStyles.gap = gapValue;
    }
    
    if (rowGapValue) {
      gridStyles.rowGap = rowGapValue;
    }
    
    if (columnGapValue) {
      gridStyles.columnGap = columnGapValue;
    }
    
    // Get alignment classes
    const getAlignmentClasses = () => {
      const classes = [];
      
      if (alignItems) {
        classes.push(`items-${alignItems}`);
      }
      
      if (justifyItems) {
        classes.push(`justify-items-${justifyItems}`);
      }
      
      return classes;
    };
    
    return (
      <div
        ref={ref}
        className={cn(
          "grid bg-background text-foreground",
          getResponsiveColumns(),
          getContainerClass(),
          ...getAlignmentClasses(),
          className
        )}
        style={gridStyles}
        {...props}
      >
        {children}
      </div>
    );
  }
); 