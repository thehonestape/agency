import React from 'react';

interface CardProps {
  title?: string;
  description?: string;
  children?: React.ReactNode;
  className?: string;
  [key: string]: any;
}

export default function Card({ 
  title = 'Card Title', 
  description = 'This is a description for the card component.', 
  children, 
  className = '', 
  ...props 
}: CardProps) {
  return (
    <div className={`bg-background border border-border rounded-lg overflow-hidden shadow-sm ${className}`} {...props}>
      <div className="p-6">
        {title && <h3 className="text-xl font-semibold mb-2">{title}</h3>}
        {description && <p className="text-muted-foreground mb-4">{description}</p>}
        {children}
      </div>
    </div>
  );
} 