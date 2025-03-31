import React from 'react';
import { Title as TremorTitle, TitleProps as TremorTitleProps } from '@tremor/react';
import { cn } from '@/lib/utils';

interface TitleProps extends TremorTitleProps {
  className?: string;
}

export const Title = React.forwardRef<HTMLHeadingElement, TitleProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <TremorTitle
        ref={ref}
        className={cn(
          'text-foreground text-xl font-semibold tracking-tight',
          className
        )}
        {...props}
      >
        {children}
      </TremorTitle>
    );
  }
);

Title.displayName = 'Title'; 