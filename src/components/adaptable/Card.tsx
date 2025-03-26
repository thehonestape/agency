import React from 'react';
import { useTheme } from '../../lib/theme-context';
import { cn } from '../../lib/utils';

// Define common card properties
export interface CardProps {
  children: React.ReactNode;
  className?: string;
  title?: React.ReactNode;
  description?: React.ReactNode;
  footer?: React.ReactNode;
  header?: React.ReactNode;
  variant?: 'default' | 'outline' | 'filled' | 'elevated';
  noPadding?: boolean;
}

export function Card({
  children,
  className = '',
  title,
  description,
  footer,
  header,
  variant = 'default',
  noPadding = false
}: CardProps) {
  const { currentThemeId } = useTheme();
  
  // Map variant to classes
  const variantClasses = {
    default: 'bg-card text-card-foreground border shadow',
    outline: 'border border-input bg-transparent',
    filled: 'bg-muted text-muted-foreground',
    elevated: 'bg-card text-card-foreground shadow-lg'
  };
  
  return (
    <div 
      className={cn(
        'rounded-lg',
        variantClasses[variant],
        noPadding ? '' : 'p-6',
        className
      )}
    >
      {header && <div className="mb-4">{header}</div>}
      {title && <h3 className="text-lg font-semibold mb-2">{title}</h3>}
      {description && <p className="text-muted-foreground mb-4">{description}</p>}
      {children}
      {footer && <div className="mt-4">{footer}</div>}
    </div>
  );
}

export default Card; 