import React from 'react';

interface CardProps {
  title?: string;
  description?: string;
  children?: React.ReactNode;
  className?: string;
}

export default function Card({ 
  title = 'Card Component', 
  description = 'This is a versatile card component that can be used for various purposes.',
  children,
  className = ''
}: CardProps) {
  return (
    <div className={`protocol-card p-6 ${className}`}>
      <h2 className="text-2xl font-bold mb-2 text-zinc-900 dark:text-white">{title}</h2>
      <div className="prose dark:prose-invert">
        <p className="text-zinc-600 dark:text-zinc-400">{description}</p>
        {children}
      </div>
    </div>
  );
} 