import React from 'react';
import { DonutChart as TremorDonutChart, DonutChartProps } from '@tremor/react';
import { cn } from '@/lib/utils';
import { defaultTremorColors } from './theme-config';

interface ThemeDonutChartProps extends Omit<DonutChartProps, 'colors'> {
  className?: string;
  colors?: string[];
}

export const DonutChart = React.forwardRef<HTMLDivElement, ThemeDonutChartProps>(
  ({ className, colors = defaultTremorColors.donut, ...props }, ref) => {
    return (
      <TremorDonutChart
        ref={ref}
        className={cn('text-tremor-content', className)}
        colors={colors as any}
        {...props}
      />
    );
  }
);

DonutChart.displayName = 'DonutChart'; 