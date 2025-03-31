import React from 'react';
import { DonutChart as TremorDonutChart } from '@tremor/react';
import { cn } from '@/lib/utils';
import { defaultTremorColors } from './theme-config';

interface DonutChartProps {
  className?: string;
  colors?: string[];
  [key: string]: any;
}

export const DonutChart = React.forwardRef<HTMLDivElement, DonutChartProps>(
  ({ className, colors = defaultTremorColors.donut, ...props }, ref) => {
    return (
      <TremorDonutChart
        ref={ref}
        className={cn('text-foreground', className)}
        colors={colors}
        {...props}
      />
    );
  }
);

DonutChart.displayName = 'DonutChart'; 