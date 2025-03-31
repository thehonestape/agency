import React from 'react';
import { ProgressBar as TremorProgressBar } from '@tremor/react';
import { cn } from '@/lib/utils';
import { mapTremorColor } from './theme-config';

interface ProgressProps {
  value: number;
  className?: string;
  color?: string;
  showAnimation?: boolean;
  tooltip?: string;
}

export const ProgressBar = React.forwardRef<HTMLDivElement, ProgressProps>(
  ({ className, color = 'primary', value, ...props }, ref) => {
    // Map the color to our theme system
    const themeColor = mapTremorColor(color);
    
    return (
      <TremorProgressBar
        ref={ref}
        className={cn('bg-muted', className)}
        color={themeColor}
        value={value}
        {...props}
      />
    );
  }
);

ProgressBar.displayName = 'ProgressBar'; 