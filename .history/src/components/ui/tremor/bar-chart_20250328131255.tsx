import React from 'react';
import { BarChart as TremorBarChart, BarChartProps } from '@tremor/react';
import { cn } from '@/lib/utils';
import { defaultTremorColors } from './theme-config';

interface ThemeBarChartProps extends Omit<BarChartProps, 'colors'> {
  className?: string;
  colors?: string[];
}

export const BarChart = React.forwardRef<HTMLDivElement, ThemeBarChartProps>(
  ({ className, colors = defaultTremorColors.chart, ...props }, ref) => {
    return (
      <TremorBarChart
        ref={ref}
        className={cn('text-foreground', className)}
        colors={colors}
        {...props}
      />
    );
  }
);

BarChart.displayName = 'BarChart'; 