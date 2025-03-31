import React from 'react';
import { Card as TremorCard, CardProps as TremorCardProps } from '@tremor/react';
import { cn } from '@/lib/utils';

interface CardProps extends TremorCardProps {
  className?: string;
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <TremorCard
        ref={ref}
        className={cn(
          'bg-card text-card-foreground rounded-md border border-border shadow-sm',
          className
        )}
        {...props}
      >
        {children}
      </TremorCard>
    );
  }
);

Card.displayName = 'Card'; 