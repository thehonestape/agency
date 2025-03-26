import React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";

const dashboardGridVariants = cva("grid gap-4 w-full", {
  variants: {
    // Determines base column layout and arrangement
    layout: {
      // Fixed column layouts
      "1-col": "grid-cols-1",
      "2-col": "grid-cols-1 sm:grid-cols-2",
      "3-col": "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
      "4-col": "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4", 
      // Auto-fit layouts that adjust based on available space
      "auto-fit-sm": "grid-cols-[repeat(auto-fit,minmax(240px,1fr))]",
      "auto-fit-md": "grid-cols-[repeat(auto-fit,minmax(320px,1fr))]",
      "auto-fit-lg": "grid-cols-[repeat(auto-fit,minmax(400px,1fr))]",
      // Dashboard-specific layouts with a mix of sizes
      "dashboard": "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
    },
    // Controls the space between grid items
    density: {
      compact: "gap-2",
      default: "gap-4",
      comfortable: "gap-6",
    },
    // Special feature for dashboard layouts to create visual hierarchy
    // Areas of importance get more visual weight through span
    priorityAreas: {
      true: "",
      false: "",
    },
  },
  compoundVariants: [
    {
      layout: "dashboard", 
      priorityAreas: true,
      className: "[&>*:first-child]:col-span-2 [&>*:first-child]:row-span-2 lg:[&>*:first-child]:col-span-2 lg:[&>*:first-child]:row-span-1",
    },
  ],
  defaultVariants: {
    layout: "dashboard",
    density: "default",
    priorityAreas: false,
  },
});

interface DashboardGridProps 
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof dashboardGridVariants> {
  children: React.ReactNode;
}

/**
 * DashboardGrid component
 * 
 * A responsive grid layout for dashboards that implements:
 * - Cognitive Efficiency: through consistent spacing and predictable layouts
 * - Adaptive Interfaces: automatically adjusting to screen sizes
 * - Perceptual Clarity: using visual hierarchy to guide attention
 */
export function DashboardGrid({
  className,
  layout,
  density,
  priorityAreas,
  children,
  ...props
}: DashboardGridProps) {
  return (
    <div 
      className={cn(
        dashboardGridVariants({ layout, density, priorityAreas }),
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

/**
 * DashboardGridItem component
 * 
 * An individual grid item that can span multiple columns/rows
 */
interface DashboardGridItemProps extends React.HTMLAttributes<HTMLDivElement> {
  colSpan?: 1 | 2 | 3 | 4 | "full";
  rowSpan?: 1 | 2 | 3;
  children: React.ReactNode;
}

export function DashboardGridItem({
  className,
  colSpan = 1,
  rowSpan = 1,
  children,
  ...props
}: DashboardGridItemProps) {
  return (
    <div 
      className={cn(
        colSpan === "full" ? "col-span-full" : `col-span-${colSpan}`,
        rowSpan > 1 && `row-span-${rowSpan}`,
        "transition-all duration-300 ease-in-out",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
} 