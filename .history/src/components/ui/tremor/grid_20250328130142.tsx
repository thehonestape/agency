import React from 'react';
import { Grid as TremorGrid, GridProps as TremorGridProps } from '@tremor/react';
import { cn } from '@/lib/utils';

interface GridProps extends TremorGridProps {
  className?: string;
}

export const Grid = React.forwardRef<HTMLDivElement, GridProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <TremorGrid
        ref={ref}
        className={cn('', className)}
        {...props}
      >
        {children}
      </TremorGrid>
    );
  }
);

Grid.displayName = 'Grid'; 