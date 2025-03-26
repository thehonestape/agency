import React from 'react';

interface HeaderProps {
  className?: string;
  [key: string]: any;
}

export default function Header({ className = '', ...props }: HeaderProps) {
  return (
    <header className={`w-full py-4 px-6 bg-background border-b border-border ${className}`} {...props}>
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-xl font-bold">Theme Brand</div>
        <nav className="hidden md:flex space-x-6">
          <a href="#" className="text-foreground hover:text-primary">Home</a>
          <a href="#" className="text-foreground hover:text-primary">Features</a>
          <a href="#" className="text-foreground hover:text-primary">Pricing</a>
          <a href="#" className="text-foreground hover:text-primary">About</a>
        </nav>
        <div>
          <button className="px-4 py-2 bg-primary text-primary-foreground rounded-md">
            Get Started
          </button>
        </div>
      </div>
    </header>
  );
} 