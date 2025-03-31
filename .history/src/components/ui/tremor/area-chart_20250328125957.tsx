import React from 'react';
import { AreaChart as TremorAreaChart, AreaChartProps } from '@tremor/react';
import { cn } from '@/lib/utils';
import { defaultTremorColors } from './theme-config';

interface ThemeAreaChartProps extends Omit<AreaChartProps, 'colors'> {
  className?: string;
  colors?: string[];
}

export const AreaChart = React.forwardRef<HTMLDivElement, ThemeAreaChartProps>(
  ({ className, colors = defaultTremorColors.chart, ...props }, ref) => {
    return (
      <TremorAreaChart
        ref={ref}
        className={cn('text-tremor-content', className)}
        colors={colors as any}
        {...props}
      />
    );
  }
);

AreaChart.displayName = 'AreaChart'; 