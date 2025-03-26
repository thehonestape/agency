import React from 'react';

interface HeroProps {
  className?: string;
  [key: string]: any;
}

export default function Hero({ className = '', ...props }: HeroProps) {
  return (
    <div className={`py-16 px-6 bg-muted ${className}`} {...props}>
      <div className="container mx-auto text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">Welcome to Our Platform</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
          A beautiful, responsive design system for your next project. Built with modern tools and best practices.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <button className="px-6 py-3 bg-primary text-primary-foreground rounded-md font-medium">
            Get Started
          </button>
          <button className="px-6 py-3 bg-background text-foreground border border-border rounded-md font-medium">
            Learn More
          </button>
        </div>
      </div>
    </div>
  );
} 