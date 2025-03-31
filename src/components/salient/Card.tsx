import React from 'react';
import { cn } from '@/lib/utils';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'outline' | 'ghost';
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant = 'default', ...props }, ref) => {
    const baseStyles = 'rounded-lg';

    const variants = {
      default: 'bg-card text-card-foreground shadow-sm',
      outline: 'border border-border',
      ghost: 'hover:bg-accent hover:text-accent-foreground',
    };

    return <div ref={ref} className={cn(baseStyles, variants[variant], className)} {...props} />;
  }
);

Card.displayName = 'Card';

export default Card;
