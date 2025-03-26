import React from 'react';

interface HeroProps {
  title?: string;
  description?: string;
  className?: string;
}

export default function Hero({ title = 'Welcome to Our Platform', description = 'A beautiful, responsive design system for your next project.', className = '' }: HeroProps) {
  return (
    <div className={`protocol-hero relative py-24 overflow-hidden ${className}`}>
      {/* Pattern background */}
      <div className="absolute inset-0 bg-grid-zinc-900/[0.05] dark:bg-grid-zinc-100/[0.05]" />
      
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-zinc-50 dark:from-zinc-900" />
      
      {/* Content */}
      <div className="relative container mx-auto px-4 text-center">
        <h1 className="text-4xl font-bold mb-4 text-zinc-900 dark:text-white">{title}</h1>
        <p className="text-xl text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">{description}</p>
      </div>
    </div>
  );
} 