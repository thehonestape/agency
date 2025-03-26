import React from 'react';
import { ThemeName, useTheme } from '@/lib/theme-provider';

// Theme display names and descriptions
const themeDetails: Record<ThemeName, { label: string; description: string; color: string }> = {
  protocol: {
    label: 'Protocol',
    description: 'Professional, structured layout',
    color: '#0ea5e9',
  },
  salient: {
    label: 'Salient',
    description: 'Bold, attention-grabbing design',
    color: '#2563eb',
  },
  studio: {
    label: 'Studio',
    description: 'Minimal, sophisticated design',
    color: '#000000',
  },
  radiant: {
    label: 'Radiant',
    description: 'Vibrant, colorful interface',
    color: '#8b5cf6',
  },
  commit: {
    label: 'Commit',
    description: 'Fresh, nature-inspired theme',
    color: '#10b981',
  },
  keynote: {
    label: 'Keynote',
    description: 'Warm, presentation-ready design',
    color: '#f59e0b',
  },
  pocket: {
    label: 'Pocket',
    description: 'Bold, energetic interface',
    color: '#ef4444',
  },
  primer: {
    label: 'Primer',
    description: 'Clean, foundational design',
    color: '#3b82f6',
  },
  transmit: {
    label: 'Transmit',
    description: 'Modern, communication-focused theme',
    color: '#6366f1',
  },
};

export function ThemeSwitcher() {
  const { currentTheme, setCurrentTheme, isChanging } = useTheme();
  
  return (
    <div className="flex flex-col space-y-4">
      <h2 className="text-2xl font-bold">Theme Switcher</h2>
      <p className="text-muted-foreground">Select a theme to see how it changes the components below</p>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
        {Object.entries(themeDetails).map(([themeName, { label, description, color }]) => (
          <button
            key={themeName}
            onClick={() => setCurrentTheme(themeName as ThemeName)}
            className={`flex items-start gap-3 p-4 rounded-lg border transition-all ${
              currentTheme === themeName 
                ? 'border-primary bg-primary/5 ring-2 ring-primary/20' 
                : 'border-border hover:border-primary/50'
            }`}
          >
            <div 
              className="w-5 h-5 rounded-full mt-1 flex-shrink-0" 
              style={{ backgroundColor: color }}
            />
            <div className="text-left">
              <div className="font-medium">{label}</div>
              <div className="text-sm text-muted-foreground">{description}</div>
            </div>
          </button>
        ))}
      </div>
      
      {isChanging && (
        <div className="text-sm text-muted-foreground animate-pulse">
          Applying theme...
        </div>
      )}
    </div>
  );
} 