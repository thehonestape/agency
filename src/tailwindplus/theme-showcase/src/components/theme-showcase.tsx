import React from 'react';
import { ThemeName } from '@/lib/theme-provider';
import { ComponentType } from '@/lib/theme-components';
import ThemeComponentDisplay from './theme-component-display';

interface ThemeShowcaseProps {
  theme: ThemeName;
  className?: string;
}

// The key components we want to showcase for each theme
const keyComponents: ComponentType[] = ['Button', 'Header', 'Hero', 'Card', 'Footer'];

export default function ThemeShowcase({ theme, className = '' }: ThemeShowcaseProps) {
  return (
    <div className={`theme-showcase ${className}`}>
      <h2 className="text-2xl font-bold mb-6">{theme} Theme</h2>
      
      <div className="space-y-8">
        {keyComponents.map((componentType) => (
          <ThemeComponentDisplay 
            key={`${theme}-${componentType}`}
            theme={theme}
            componentType={componentType}
          />
        ))}
      </div>
    </div>
  );
} 