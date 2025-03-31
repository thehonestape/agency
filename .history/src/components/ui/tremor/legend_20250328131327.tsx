import React from 'react';
import { Legend as TremorLegend, LegendProps } from '@tremor/react';
import { cn } from '@/lib/utils';

interface ThemeLegendProps extends LegendProps {
  className?: string;
}

export const Legend = React.forwardRef<HTMLOListElement, ThemeLegendProps>(
  ({ className, ...props }, ref) => {
    return (
      <TremorLegend
        ref={ref}
        className={cn('text-foreground', className)}
        {...props}
      />
    );
  }
);

Legend.displayName = 'Legend'; 