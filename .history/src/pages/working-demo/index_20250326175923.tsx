import React from 'react';

const colorCards = [
  { name: 'Primary', bgClass: 'bg-primary', textClass: 'text-primary-foreground' },
  { name: 'Secondary', bgClass: 'bg-secondary', textClass: 'text-secondary-foreground' },
  { name: 'Accent', bgClass: 'bg-accent', textClass: 'text-accent-foreground' },
  { name: 'Background', bgClass: 'bg-background', textClass: 'text-foreground' },
  { name: 'Card', bgClass: 'bg-card', textClass: 'text-card-foreground' },
  { name: 'Muted', bgClass: 'bg-muted', textClass: 'text-muted-foreground' },
  { name: 'Destructive', bgClass: 'bg-destructive', textClass: 'text-destructive-foreground' },
  { name: 'Warning', bgClass: 'bg-warning', textClass: 'text-warning-foreground' },
  { name: 'Success', bgClass: 'bg-success', textClass: 'text-success-foreground' },
  { name: 'Info', bgClass: 'bg-info', textClass: 'text-info-foreground' },
];

export default function WorkingDemo() {
  return (
    <div className="p-8 bg-background min-h-screen">
      <h1 className="text-3xl font-bold mb-8 text-foreground">Color Palette</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {colorCards.map((card) => (
          <div key={card.name} className="rounded-lg shadow-md overflow-hidden border border-border">
            <div className={`h-24 ${card.bgClass}`}></div>
            <div className="p-4 bg-card">
              <h3 className="font-medium text-card-foreground">{card.name}</h3>
              <div className="flex flex-wrap gap-2 mt-2">
                <span className="inline-block px-2 py-1 text-xs rounded bg-muted text-muted-foreground">
                  {card.bgClass}
                </span>
                <span className="inline-block px-2 py-1 text-xs rounded bg-muted text-muted-foreground">
                  {card.textClass}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-6 text-foreground">Typography</h2>
        <div className="space-y-4">
          <div>
            <h1 className="text-4xl font-bold text-foreground">Heading 1</h1>
            <p className="text-muted-foreground">4xl / font-bold</p>
          </div>
          <div>
            <h2 className="text-3xl font-semibold text-foreground">Heading 2</h2>
            <p className="text-muted-foreground">3xl / font-semibold</p>
          </div>
          <div>
            <h3 className="text-2xl font-medium text-foreground">Heading 3</h3>
            <p className="text-muted-foreground">2xl / font-medium</p>
          </div>
          <div>
            <h4 className="text-xl font-medium text-foreground">Heading 4</h4>
            <p className="text-muted-foreground">xl / font-medium</p>
          </div>
          <div>
            <p className="text-base text-foreground">Regular paragraph text</p>
            <p className="text-muted-foreground">base</p>
          </div>
          <div>
            <p className="text-sm text-foreground">Small text</p>
            <p className="text-muted-foreground">sm</p>
          </div>
        </div>
      </div>

      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-6 text-foreground">Button Examples</h2>
        <div className="flex flex-wrap gap-4">
          <button className="px-4 py-2 rounded bg-primary text-primary-foreground hover:bg-primary/90">
            Primary
          </button>
          <button className="px-4 py-2 rounded bg-secondary text-secondary-foreground hover:bg-secondary/90">
            Secondary
          </button>
          <button className="px-4 py-2 rounded bg-accent text-accent-foreground hover:bg-accent/90">
            Accent
          </button>
          <button className="px-4 py-2 rounded bg-destructive text-destructive-foreground hover:bg-destructive/90">
            Destructive
          </button>
          <button className="px-4 py-2 rounded bg-muted text-muted-foreground hover:bg-muted/90">
            Muted
          </button>
          <button className="px-4 py-2 rounded border border-border bg-background text-foreground hover:bg-muted">
            Outline
          </button>
        </div>
      </div>
    </div>
  );
}
