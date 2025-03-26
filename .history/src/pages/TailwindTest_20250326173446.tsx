import React from 'react';

export default function TailwindTest() {
  return (
    <div className="p-10 bg-white">
      <h1 className="text-3xl font-bold mb-4">Tailwind V4 Test</h1>
      
      <div className="mb-8">
        <h2 className="text-xl font-bold mb-2">Default Tailwind Colors</h2>
        <div className="bg-red-500 text-white p-4 mb-2 rounded">
          Red Background (bg-red-500)
        </div>
        <div className="bg-blue-500 text-white p-4 mb-2 rounded">
          Blue Background (bg-blue-500)
        </div>
        <div className="bg-green-500 text-white p-4 mb-2 rounded">
          Green Background (bg-green-500)
        </div>
      </div>
      
      <div className="mb-8">
        <h2 className="text-xl font-bold mb-2">Custom Theme Colors</h2>
        <div className="bg-primary text-white p-4 mb-2 rounded">
          Primary Color (bg-primary)
        </div>
        <div className="bg-secondary text-white p-4 mb-2 rounded">
          Secondary Color (bg-secondary)
        </div>
        <div className="bg-accent text-white p-4 mb-2 rounded">
          Accent Color (bg-accent)
        </div>
      </div>
      
      <div className="mb-8">
        <h2 className="text-xl font-bold mb-2">UI Colors</h2>
        <div className="bg-card text-card-foreground p-4 mb-2 rounded border border-border">
          Card Color (bg-card with text-card-foreground and border-border)
        </div>
        <div className="bg-muted text-muted-foreground p-4 mb-2 rounded">
          Muted Color (bg-muted with text-muted-foreground)
        </div>
      </div>
      
      <div className="mb-8">
        <h2 className="text-xl font-bold mb-2">State Colors</h2>
        <div className="bg-destructive text-destructive-foreground p-4 mb-2 rounded">
          Destructive (bg-destructive)
        </div>
        <div className="bg-success text-success-foreground p-4 mb-2 rounded">
          Success (bg-success)
        </div>
        <div className="bg-warning text-warning-foreground p-4 mb-2 rounded">
          Warning (bg-warning)
        </div>
        <div className="bg-info text-info-foreground p-4 mb-2 rounded">
          Info (bg-info)
        </div>
      </div>
      
      <div className="border border-border p-4 rounded mt-8">
        <p className="text-lg font-medium">
          If the colors above are displaying correctly, Tailwind CSS v4 is working properly!
        </p>
      </div>
    </div>
  );
} 