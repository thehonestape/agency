import React from 'react';
import { LineChart as TremorLineChart, LineChartProps } from '@tremor/react';
import { cn } from '@/lib/utils';
import { defaultTremorColors } from './theme-config';

interface ThemeLineChartProps extends Omit<LineChartProps, 'colors'> {
  className?: string;
  colors?: string[];
}

export const LineChart = React.forwardRef<HTMLDivElement, ThemeLineChartProps>(
  ({ className, colors = defaultTremorColors.chart, ...props }, ref) => {
    return (
      <TremorLineChart
        ref={ref}
        className={cn('text-foreground', className)}
        colors={colors}
        {...props}
      />
    );
  }
);

LineChart.displayName = 'LineChart'; 