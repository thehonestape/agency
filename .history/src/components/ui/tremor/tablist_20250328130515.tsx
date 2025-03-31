import React from 'react';
import { TabList as TremorTabList } from '@tremor/react';
import { cn } from '@/lib/utils';
import { getTremorColor } from './theme-config';

// Only wrap the TabList component to handle color mapping
interface TabListProps {
  className?: string;
  children: React.ReactElement | React.ReactElement[];
  variant?: "line" | "solid";
  color?: string;
}

export const TabList = React.forwardRef<HTMLDivElement, TabListProps>(
  ({ className, color = 'primary', children, ...props }, ref) => {
    // Map the color to a valid Tremor color
    const tremorColor = getTremorColor(color);
    
    return (
      <TremorTabList
        ref={ref}
        className={cn('border-border', className)}
        color={tremorColor}
        {...props}
      >
        {children}
      </TremorTabList>
    );
  }
);

TabList.displayName = 'TabList'; 