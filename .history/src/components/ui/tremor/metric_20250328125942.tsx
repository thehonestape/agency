import React from 'react';
import { Metric as TremorMetric, MetricProps as TremorMetricProps } from '@tremor/react';
import { cn } from '@/lib/utils';

interface MetricProps extends TremorMetricProps {
  className?: string;
}

export const Metric = React.forwardRef<HTMLDivElement, MetricProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <TremorMetric
        ref={ref}
        className={cn(
          'text-foreground text-3xl font-semibold tracking-tight',
          className
        )}
        {...props}
      >
        {children}
      </TremorMetric>
    );
  }
);

Metric.displayName = 'Metric'; 