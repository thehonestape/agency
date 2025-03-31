import React from 'react';
import { ThemeTest } from '@/components/ui/ThemeTest';

export default function ThemeDemoPage() {
  return (
    <div className="container mx-auto">
      <div className="py-8">
        <h1 className="text-3xl font-bold text-foreground mb-6">
          Tailwind CSS v4 Theme Demo
        </h1>
        <p className="text-foreground mb-8">
          This page demonstrates how our UI components use Tailwind CSS v4's CSS-first approach with
          theme variables for consistent styling.
        </p>
        
        <ThemeTest />
      </div>
    </div>
  );
} 