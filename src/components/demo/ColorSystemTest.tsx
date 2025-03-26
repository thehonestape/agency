import React from 'react';
import { cn } from '../../lib/utils';

/**
 * Test component to demonstrate the color system working correctly
 * with hex colors for better compatibility
 */
export default function ColorSystemTest() {
  return (
    <div className="p-8 space-y-8 bg-background text-foreground">
      <h1 className="text-2xl font-bold mb-6">Color System Test (Hex Colors)</h1>
      
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Base Colors</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <ColorSwatch name="background" className="border border-border" style={{ backgroundColor: 'var(--background)', color: 'var(--foreground)' }} />
          <ColorSwatch name="foreground" style={{ backgroundColor: 'var(--foreground)', color: 'var(--background)' }} />
          <ColorSwatch name="primary" style={{ backgroundColor: 'var(--primary)', color: 'var(--primary-foreground)' }} />
          <ColorSwatch name="secondary" style={{ backgroundColor: 'var(--secondary)', color: 'var(--secondary-foreground)' }} />
          <ColorSwatch name="accent" style={{ backgroundColor: 'var(--accent)', color: 'var(--accent-foreground)' }} />
          <ColorSwatch name="muted" style={{ backgroundColor: 'var(--muted)', color: 'var(--muted-foreground)' }} />
          <ColorSwatch name="card" style={{ backgroundColor: 'var(--card)', color: 'var(--card-foreground)' }} />
          <ColorSwatch name="destructive" style={{ backgroundColor: 'var(--destructive)', color: 'var(--destructive-foreground)' }} />
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
          <div className="h-20 rounded-md overflow-hidden border border-border flex items-center justify-center" style={{ backgroundColor: 'var(--primary)' }}>
            <span style={{ color: 'var(--primary-foreground)' }} className="font-medium">primary</span>
          </div>
          <div className="h-20 rounded-md overflow-hidden border border-border flex items-center justify-center" style={{ backgroundColor: 'var(--secondary)' }}>
            <span style={{ color: 'var(--secondary-foreground)' }} className="font-medium">secondary</span>
          </div>
          <div className="h-20 rounded-md overflow-hidden border border-border flex items-center justify-center" style={{ backgroundColor: 'var(--destructive)' }}>
            <span style={{ color: 'var(--destructive-foreground)' }} className="font-medium">destructive</span>
          </div>
          <div className="h-20 rounded-md overflow-hidden border border-border flex items-center justify-center" style={{ backgroundColor: 'var(--accent)' }}>
            <span style={{ color: 'var(--accent-foreground)' }} className="font-medium">accent</span>
          </div>
        </div>
      </section>
      
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Text Colors</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 border rounded-md">
            <p style={{ color: 'var(--foreground)' }} className="mb-2">Default text (foreground)</p>
            <p style={{ color: 'var(--primary)' }} className="mb-2">Primary text</p>
            <p style={{ color: 'var(--muted-foreground)' }} className="mb-2">Muted text</p>
            <p style={{ color: 'var(--secondary-foreground)' }} className="mb-2">Secondary text</p>
          </div>
          <div className="p-4 border rounded-md" style={{ backgroundColor: 'var(--primary)' }}>
            <p style={{ color: 'var(--primary-foreground)' }} className="mb-2">Text on primary</p>
            <p style={{ color: 'var(--primary-foreground)', opacity: 0.75 }} className="mb-2">Text on primary (75% opacity)</p>
            <p style={{ color: 'var(--primary-foreground)', opacity: 0.5 }} className="mb-2">Text on primary (50% opacity)</p>
            <p style={{ color: 'var(--primary-foreground)', opacity: 0.25 }} className="mb-2">Text on primary (25% opacity)</p>
          </div>
        </div>
      </section>
      
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Button Example</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button className="px-4 py-2 rounded-md" style={{ 
            backgroundColor: 'var(--button-background)',
            color: 'var(--button-text)'
          }}>Default Button</button>
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
  style?: React.CSSProperties;
}

function ColorSwatch({ name, className, style }: ColorSwatchProps) {
  return (
    <div className={cn("flex items-center justify-center h-20 rounded-md overflow-hidden", className)} style={style}>
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
  
  return (
    <div className="flex items-center gap-2">
      <div className="w-4 h-4 rounded-full border border-border" style={{ backgroundColor: `var(--${name})` }}></div>
      <span className="font-semibold">--{name}:</span>
      <span className="text-muted-foreground">{value || "Not set"}</span>
    </div>
  );
} 