import React from 'react';
import { Text as TremorText, TextProps as TremorTextProps } from '@tremor/react';
import { cn } from '@/lib/utils';

interface TextProps extends TremorTextProps {
  className?: string;
}

export const Text = React.forwardRef<HTMLParagraphElement, TextProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <TremorText
        ref={ref}
        className={cn(
          'text-foreground text-sm leading-normal',
          className
        )}
        {...props}
      >
        {children}
      </TremorText>
    );
  }
);

Text.displayName = 'Text'; 