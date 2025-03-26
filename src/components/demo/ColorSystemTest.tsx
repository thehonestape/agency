import React from 'react';
import { cn } from '../../lib/utils';

/**
 * Test component to demonstrate the color system working correctly
 * with hex colors for better compatibility
 */
export default function ColorSystemTest() {
  return (
    <div className="p-8 space-y-8">
      <h1 className="text-2xl font-bold mb-6">Color System Test (Hex Colors)</h1>
      
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
        <h2 className="text-xl font-semibold">Opacity Variants</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <ColorSwatch name="primary/50%" className="text-foreground border border-border" style={{ backgroundColor: 'var(--primary)', opacity: 0.5 }} />
          <ColorSwatch name="primary/25%" className="text-foreground border border-border" style={{ backgroundColor: 'var(--primary)', opacity: 0.25 }} />
          <ColorSwatch name="destructive/75%" className="text-foreground border border-border" style={{ backgroundColor: 'var(--destructive)', opacity: 0.75 }} />
          <ColorSwatch name="accent/40%" className="text-foreground border border-border" style={{ backgroundColor: 'var(--accent)', opacity: 0.4 }} />
        </div>
      </section>
      
      {/* Add raw CSS variable samples for comparison */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Raw CSS Variables</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="h-20 rounded-md overflow-hidden border border-border" style={{ backgroundColor: 'var(--primary)' }}>
            <div className="p-2">
              <span className="font-medium text-white">primary</span>
            </div>
          </div>
          <div className="h-20 rounded-md overflow-hidden border border-border" style={{ backgroundColor: 'var(--secondary)' }}>
            <div className="p-2">
              <span className="font-medium">secondary</span>
            </div>
          </div>
          <div className="h-20 rounded-md overflow-hidden border border-border" style={{ backgroundColor: 'var(--destructive)' }}>
            <div className="p-2">
              <span className="font-medium text-white">destructive</span>
            </div>
          </div>
          <div className="h-20 rounded-md overflow-hidden border border-border" style={{ backgroundColor: 'var(--accent)' }}>
            <div className="p-2">
              <span className="font-medium">accent</span>
            </div>
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
            <p className="mb-2" style={{ color: 'var(--primary-foreground)', opacity: 0.75 }}>Text on primary (75% opacity)</p>
            <p className="mb-2" style={{ color: 'var(--primary-foreground)', opacity: 0.5 }}>Text on primary (50% opacity)</p>
            <p className="mb-2" style={{ color: 'var(--primary-foreground)', opacity: 0.25 }}>Text on primary (25% opacity)</p>
          </div>
        </div>
      </section>
      
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Button Example</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button className="px-4 py-2 bg-button-background text-button-text rounded-md">Default Button</button>
          <button className="px-4 py-2 rounded-md" style={{ 
            backgroundColor: 'var(--button-background)',
            color: 'var(--button-text)',
            opacity: 0.9
          }}>90% Opacity</button>
          <button className="px-4 py-2 rounded-md" style={{ 
            backgroundColor: 'var(--button-background)',
            color: 'var(--button-text)',
            opacity: 0.7
          }}>70% Opacity</button>
          <button className="px-4 py-2 rounded-md" style={{ 
            backgroundColor: 'var(--button-background)',
            color: 'var(--button-text)',
            opacity: 0.5
          }}>50% Opacity</button>
        </div>
      </section>
      
      {/* Debug section to show the actual CSS variable values */}
      <section className="space-y-4 mt-10 p-4 border rounded-md">
        <h2 className="text-xl font-semibold">Debug: CSS Variable Values</h2>
        <div className="grid grid-cols-1 gap-2 font-mono text-sm">
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
  style?: React.CSSProperties;
}

function ColorSwatch({ name, className, style }: ColorSwatchProps) {
  return (
    <div className={cn("flex flex-col h-20 rounded-md overflow-hidden", className)} style={style}>
      <div className="flex-1 p-2">
        <span className="font-medium">{name}</span>
      </div>
    </div>
  );
}

// Component to display the actual CSS variable values for debugging
function CssVariableDisplay({ name }: { name: string }) {
  const [value, setValue] = React.useState<string>("");
  
  React.useEffect(() => {
    // Get the computed value of the CSS variable
    const computedValue = getComputedStyle(document.documentElement)
      .getPropertyValue(`--${name}`);
    setValue(computedValue);
  }, [name]);
  
  return (
    <div className="flex gap-2">
      <span className="font-semibold">--{name}:</span>
      <span>{value || "Not set"}</span>
      <div className="w-6 h-6 rounded-full border border-border" style={{ backgroundColor: `var(--${name})` }}></div>
    </div>
  );
} 