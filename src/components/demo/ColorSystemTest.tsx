import React from 'react';
import { cn } from '../../lib/utils';

/**
 * Test component to demonstrate the color system working correctly
 * using Tailwind classes properly instead of inline styles
 */
export default function ColorSystemTest() {
  return (
    <div className="p-8 space-y-8 bg-background text-foreground">
      <h1 className="text-2xl font-bold mb-6">Color System Test</h1>
      
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Base Colors</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <ColorSwatch name="background" className="bg-background text-foreground border border-border" />
          <ColorSwatch name="foreground" className="bg-foreground text-background" />
          <ColorSwatch name="primary" className="bg-primary text-primary-foreground" />
          <ColorSwatch name="secondary" className="bg-secondary text-secondary-foreground" />
          <ColorSwatch name="accent" className="bg-accent text-accent-foreground" />
          <ColorSwatch name="muted" className="bg-muted text-muted-foreground" />
          <ColorSwatch name="card" className="bg-card text-card-foreground" />
          <ColorSwatch name="destructive" className="bg-destructive text-destructive-foreground" />
        </div>
      </section>
      
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Opacity Variants (Manual)</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="h-20 rounded-md flex items-center justify-center text-foreground border border-border opacity-50 bg-primary">
            <span className="font-medium">primary/50%</span>
          </div>
          <div className="h-20 rounded-md flex items-center justify-center text-foreground border border-border opacity-25 bg-primary">
            <span className="font-medium">primary/25%</span>
          </div>
          <div className="h-20 rounded-md flex items-center justify-center text-foreground border border-border opacity-75 bg-destructive">
            <span className="font-medium">destructive/75%</span>
          </div>
          <div className="h-20 rounded-md flex items-center justify-center text-foreground border border-border opacity-40 bg-accent">
            <span className="font-medium">accent/40%</span>
          </div>
        </div>
      </section>
      
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Text Colors</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 border rounded-md">
            <p className="text-foreground mb-2">Default text (foreground)</p>
            <p className="text-primary mb-2">Primary text</p>
            <p className="text-muted-foreground mb-2">Muted text</p>
            <p className="text-secondary-foreground mb-2">Secondary text</p>
          </div>
          <div className="p-4 border rounded-md bg-primary">
            <p className="text-primary-foreground mb-2">Text on primary</p>
            <p className="text-primary-foreground opacity-75 mb-2">Text on primary (75% opacity)</p>
            <p className="text-primary-foreground opacity-50 mb-2">Text on primary (50% opacity)</p>
            <p className="text-primary-foreground opacity-25 mb-2">Text on primary (25% opacity)</p>
          </div>
        </div>
      </section>
      
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Button Example</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button className="px-4 py-2 rounded-md bg-button-background text-button-text">
            Default Button
          </button>
          <button className="px-4 py-2 rounded-md bg-button-background text-button-text opacity-90">
            90% Opacity
          </button>
          <button className="px-4 py-2 rounded-md bg-button-background text-button-text opacity-70">
            70% Opacity
          </button>
          <button className="px-4 py-2 rounded-md bg-button-background text-button-text opacity-50">
            50% Opacity
          </button>
        </div>
      </section>
      
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Component Variants</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-card text-card-foreground rounded-md border border-border">
            <h3 className="text-lg font-medium mb-2">Card</h3>
            <p className="text-sm">Standard card using text-card-foreground.</p>
          </div>
          <div className="p-4 bg-muted text-muted-foreground rounded-md border border-border">
            <h3 className="text-lg font-medium mb-2">Muted Card</h3>
            <p className="text-sm">Muted style using text-muted-foreground.</p>
          </div>
          <div className="p-4 bg-primary text-primary-foreground rounded-md">
            <h3 className="text-lg font-medium mb-2">Primary Card</h3>
            <p className="text-sm">Primary style using text-primary-foreground.</p>
          </div>
        </div>
      </section>
      
      {/* Debug section to show the actual CSS variable values */}
      <section className="space-y-4 mt-10 p-4 border rounded-md">
        <h2 className="text-xl font-semibold">Debug: CSS Variable Values</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 font-mono text-sm">
          <CssVariableDisplay name="primary" />
          <CssVariableDisplay name="secondary" />
          <CssVariableDisplay name="accent" />
          <CssVariableDisplay name="destructive" />
          <CssVariableDisplay name="background" />
          <CssVariableDisplay name="foreground" />
          <CssVariableDisplay name="button-background" />
          <CssVariableDisplay name="button-text" />
        </div>
      </section>
    </div>
  );
}

interface ColorSwatchProps {
  name: string;
  className?: string;
}

function ColorSwatch({ name, className }: ColorSwatchProps) {
  return (
    <div className={cn("flex items-center justify-center h-20 rounded-md overflow-hidden", className)}>
      <span className="font-medium">{name}</span>
    </div>
  );
}

// Component to display the actual CSS variable values for debugging
function CssVariableDisplay({ name }: { name: string }) {
  const [value, setValue] = React.useState<string>("");
  
  React.useEffect(() => {
    // Get the computed value of the CSS variable
    const computedValue = getComputedStyle(document.documentElement)
      .getPropertyValue(`--${name}`).trim();
    setValue(computedValue);
  }, [name]);

  // Determine the background color class
  const getBgColorClass = (name: string) => {
    // Special cases for button colors
    if (name === 'button-background') return 'bg-button-background';
    if (name === 'button-text') return 'bg-button-text';
    
    // Handle compound names like "primary-foreground"
    if (name.includes('-foreground')) {
      return `bg-${name.split('-')[0]}-foreground`;
    }
    // Handle simple color names
    return `bg-${name}`;
  };
  
  return (
    <div className="flex items-center gap-2">
      <div className={`w-4 h-4 rounded-full border border-border ${getBgColorClass(name)}`}></div>
      <span className="font-semibold">--{name}:</span>
      <span className="text-muted-foreground">{value || "Not set"}</span>
    </div>
  );
} 