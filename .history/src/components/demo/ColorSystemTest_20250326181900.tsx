import React from 'react';
import { cn } from '../../lib/utils';

/**
 * Test component to demonstrate the color system working correctly
 * with Tailwind v4's alpha transparency features
 */
export default function ColorSystemTest() {
  return (
    <div className="p-8 space-y-8">
      <h1 className="text-2xl font-bold mb-6">Color System Test</h1>
      
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Base Colors</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <ColorSwatch name="background" className="bg-background text-foreground" />
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
          <ColorSwatch name="primary/50" className="bg-primary/50 text-foreground border border-border" />
          <ColorSwatch name="primary/25" className="bg-primary/25 text-foreground border border-border" />
          <ColorSwatch name="destructive/75" className="bg-destructive/75 text-foreground border border-border" />
          <ColorSwatch name="accent/40" className="bg-accent/40 text-foreground border border-border" />
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
            <p className="text-primary-foreground/75 mb-2">Text on primary (75% opacity)</p>
            <p className="text-primary-foreground/50 mb-2">Text on primary (50% opacity)</p>
            <p className="text-primary-foreground/25 mb-2">Text on primary (25% opacity)</p>
          </div>
        </div>
      </section>
      
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Button Example</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button className="px-4 py-2 bg-button-background text-button-text rounded-md">Default Button</button>
          <button className="px-4 py-2 bg-button-background/90 text-button-text rounded-md">90% Opacity</button>
          <button className="px-4 py-2 bg-button-background/70 text-button-text rounded-md">70% Opacity</button>
          <button className="px-4 py-2 bg-button-background/50 text-button-text rounded-md">50% Opacity</button>
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
    <div className={cn("flex flex-col h-20 rounded-md overflow-hidden", className)}>
      <div className="flex-1 p-2">
        <span className="font-medium">{name}</span>
      </div>
    </div>
  );
} 