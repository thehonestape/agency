import React, { useState, useEffect } from 'react';
import { ThemeName, useTheme } from '@/lib/theme-provider';
import { ComponentType, getThemeComponent, componentProps } from '@/lib/theme-components';
import Head from 'next/head';
import ComponentWrapper from '@/components/component-wrapper';

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
const keyComponents: ComponentType[] = ['Button', 'Header', 'Hero', 'Card', 'Footer'];

export default function ThemeShowcaseAdvanced() {
  const { currentTheme, setCurrentTheme, isChanging } = useTheme();
  const [selectedThemes, setSelectedThemes] = useState<ThemeName[]>([currentTheme, 'protocol']);
  const [selectedComponent, setSelectedComponent] = useState<ComponentType>('Button');
  const [isLoading, setIsLoading] = useState(true);
  const [viewMode, setViewMode] = useState<'single' | 'compare'>('compare');
  
  // Update selected themes when current theme changes
  useEffect(() => {
    if (!selectedThemes.includes(currentTheme)) {
      setSelectedThemes(prev => [currentTheme, ...prev.filter(t => t !== currentTheme).slice(0, 1)]);
    }
  }, [currentTheme, selectedThemes]);
  
  // Simulate loading state
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    
    return () => clearTimeout(timer);
  }, []);

  // Toggle a theme selection
  const toggleThemeSelection = (theme: ThemeName) => {
    if (selectedThemes.includes(theme)) {
      // Don't remove if it's the last theme
      if (selectedThemes.length > 1) {
        setSelectedThemes(prev => prev.filter(t => t !== theme));
      }
    } else {
      // Add the theme, but keep max 2 themes for comparison
      setSelectedThemes(prev => [theme, ...prev.slice(0, 1)]);
    }
  };
  
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Head>
        <title>Advanced Theme Showcase</title>
        <meta name="description" content="Advanced showcase of TailwindPlus themes" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <header className="border-b border-border sticky top-0 bg-background z-10">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">Advanced Theme Showcase</h1>
          <div className="flex space-x-4">
            <button 
              onClick={() => setViewMode('single')}
              className={`px-3 py-1 rounded-md ${viewMode === 'single' ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}`}
            >
              Single View
            </button>
            <button 
              onClick={() => setViewMode('compare')}
              className={`px-3 py-1 rounded-md ${viewMode === 'compare' ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}`}
            >
              Compare View
            </button>
          </div>
        </div>
      </header>
      
      <main className="container mx-auto px-4 py-8">
        <section className="mb-8">
          <div className="max-w-3xl mx-auto text-center mb-8">
            <h2 className="text-3xl font-bold mb-4">Theme Comparison</h2>
            <p className="text-muted-foreground">
              Compare different TailwindPlus themes side by side and see how they transform your components.
              {viewMode === 'compare' ? ' Select up to 2 themes to compare.' : ' Select a theme to view.'}
            </p>
          </div>
          
          <div className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-9 gap-2 mb-8">
            {Object.entries(themeDetails).map(([themeName, { label, color }]) => (
              <button
                key={themeName}
                onClick={() => viewMode === 'compare' 
                  ? toggleThemeSelection(themeName as ThemeName)
                  : setCurrentTheme(themeName as ThemeName)
                }
                className={`flex flex-col items-center gap-2 p-3 rounded-lg border transition-all ${
                  (viewMode === 'compare' && selectedThemes.includes(themeName as ThemeName)) || 
                  (viewMode === 'single' && currentTheme === themeName)
                    ? 'border-primary bg-primary/5 ring-2 ring-primary/20' 
                    : 'border-border hover:border-primary/50'
                }`}
              >
                <div 
                  className="w-4 h-4 rounded-full flex-shrink-0" 
                  style={{ backgroundColor: color }}
                />
                <div className="text-xs font-medium">{label}</div>
              </button>
            ))}
          </div>
          
          <div className="flex flex-wrap gap-2 mb-8 justify-center">
            {keyComponents.map((component) => (
              <button
                key={component}
                onClick={() => setSelectedComponent(component)}
                className={`px-3 py-1 text-sm rounded-md ${
                  selectedComponent === component 
                    ? 'bg-primary text-primary-foreground' 
                    : 'bg-muted text-muted-foreground hover:bg-muted/80'
                }`}
              >
                {component}
              </button>
            ))}
          </div>
        </section>
        
        <section>
          {isLoading ? (
            <div className="flex items-center justify-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            </div>
          ) : viewMode === 'compare' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {selectedThemes.map(theme => {
                const Component = getThemeComponent(theme, selectedComponent);
                const props = componentProps[selectedComponent];
                
                return (
                  <div key={theme} className="border border-border rounded-lg overflow-hidden">
                    <div className="bg-muted/30 p-3 border-b border-border flex justify-between items-center">
                      <h3 className="font-medium">{themeDetails[theme].label}</h3>
                      <span className="text-xs text-muted-foreground">{selectedComponent}</span>
                    </div>
                    <div className="p-6">
                      <ComponentWrapper theme={theme} componentType={selectedComponent}>
                        <Component {...props} />
                      </ComponentWrapper>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="border border-border rounded-lg overflow-hidden">
              <div className="bg-muted/30 p-3 border-b border-border flex justify-between items-center">
                <h3 className="font-medium">{themeDetails[currentTheme].label}</h3>
                <span className="text-xs text-muted-foreground">{selectedComponent}</span>
              </div>
              <div className="p-6">
                <ComponentWrapper theme={currentTheme} componentType={selectedComponent}>
                  {React.createElement(getThemeComponent(currentTheme, selectedComponent), componentProps[selectedComponent])}
                </ComponentWrapper>
              </div>
            </div>
          )}
        </section>
        
        <section className="mt-12">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold mb-4">Theme Details</h2>
            <div className="prose dark:prose-invert max-w-none">
              <p>
                The currently selected {viewMode === 'compare' ? 'themes are' : 'theme is'}: 
                <strong> {viewMode === 'compare' 
                  ? selectedThemes.map(t => themeDetails[t].label).join(' and ') 
                  : themeDetails[currentTheme].label}
                </strong>
              </p>
              <p>
                {viewMode === 'compare' 
                  ? `${themeDetails[selectedThemes[0]].description}${selectedThemes.length > 1 ? ` and ${themeDetails[selectedThemes[1]].description.toLowerCase()}` : ''}.` 
                  : themeDetails[currentTheme].description}
              </p>
              <h3>Usage</h3>
              <p>
                To use this theme in your project, you can import the components directly from the theme package:
              </p>
              <pre><code>{`import { ${selectedComponent} } from '@tailwindplus/${viewMode === 'compare' ? selectedThemes[0] : currentTheme}';

// Then use it in your component
export default function MyComponent() {
  return (
    <${selectedComponent} />
  );
}`}</code></pre>
            </div>
          </div>
        </section>
      </main>
      
      <footer className="border-t border-border py-8 mt-12">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p>TailwindPlus Advanced Theme Showcase - Compare and explore different themes</p>
        </div>
      </footer>
    </div>
  );
} 