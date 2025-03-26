import React, { useState, useEffect } from 'react';
import { ThemeName, useTheme } from '@/lib/theme-provider';
import { Button } from '@/components/ui/button';
import Head from 'next/head';
import ThemeShowcase from '@/components/theme-showcase';

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

// Key components to showcase for each theme
const keyComponents = [
  { name: 'Header', description: 'Main navigation component' },
  { name: 'Hero', description: 'Primary call-to-action section' },
  { name: 'Button', description: 'Interactive action elements' },
  { name: 'Card', description: 'Content containers' },
  { name: 'Footer', description: 'Bottom page information' }
];

export default function Home() {
  const { currentTheme, setCurrentTheme, isChanging } = useTheme();
  const [activeTheme, setActiveTheme] = useState<ThemeName>(currentTheme);
  const [isLoading, setIsLoading] = useState(true);
  
  // Update active theme when current theme changes
  useEffect(() => {
    setActiveTheme(currentTheme);
  }, [currentTheme]);
  
  // Simulate loading state
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);
  
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Head>
        <title>TailwindPlus Theme Showcase</title>
        <meta name="description" content="Showcase of TailwindPlus themes" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <header className="border-b border-border sticky top-0 bg-background z-10">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">TailwindPlus Theme Showcase</h1>
        </div>
      </header>
      
      <main className="container mx-auto px-4 py-8">
        <section className="mb-12">
          <div className="max-w-3xl mx-auto text-center mb-8">
            <h2 className="text-3xl font-bold mb-4">Theme Gallery</h2>
            <p className="text-muted-foreground">
              Explore different TailwindPlus themes and see how they transform your components.
              Click on a theme to see it applied to the showcase below.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
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
            <div className="text-center mt-4 text-sm text-muted-foreground animate-pulse">
              Applying theme...
            </div>
          )}
        </section>
        
        <section>
          {isLoading ? (
            <div className="flex items-center justify-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            </div>
          ) : (
            <ThemeShowcase theme={activeTheme} />
          )}
        </section>
      </main>
      
      <footer className="border-t border-border py-8 mt-12">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p>TailwindPlus Theme Showcase - Explore and compare different themes</p>
        </div>
      </footer>
    </div>
  );
} 