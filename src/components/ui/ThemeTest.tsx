import React from 'react';
import { useUITheme, cn, themeVariants } from '@/lib/ui';
import { Button } from './button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from './Card';

/**
 * This component demonstrates how to use the new Tailwind v4 utilities
 * with existing components in our codebase.
 */
export function ThemeTest() {
  const theme = useUITheme();
  
  return (
    <div className="p-8 bg-background">
      <h2 className="text-2xl font-bold text-foreground mb-6">
        Tailwind v4 Theme Test
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* Using existing components with theme variables */}
        <Card>
          <CardHeader>
            <CardTitle>Existing Components</CardTitle>
            <CardDescription>Using our components with Tailwind v4 theme variables</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-3">
              <Button variant="default">Default</Button>
              <Button variant="brand">Brand</Button>
              <Button variant="destructive">Destructive</Button>
            </div>
          </CardContent>
          <CardFooter>
            <p className="text-muted-foreground text-sm">
              These buttons use our theme CSS variables automatically
            </p>
          </CardFooter>
        </Card>
        
        {/* Manual theming with CSS variables */}
        <Card>
          <CardHeader>
            <CardTitle>Current Theme Mode</CardTitle>
            <CardDescription>Dynamic theme control using our hook</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="rounded-md p-4 bg-muted">
              <p className="text-lg font-medium mb-2">
                Current mode: <span className="font-bold">{theme.mode}</span>
              </p>
              <button
                onClick={theme.toggleMode}
                className={cn(
                  'px-4 py-2 rounded-md',
                  themeVariants.colorVariants.primary
                )}
              >
                Toggle Theme Mode
              </button>
            </div>
          </CardContent>
          <CardFooter>
            <p className="text-muted-foreground text-sm">
              Using our theme hook to control theme dynamically
            </p>
          </CardFooter>
        </Card>
      </div>
      
      {/* Theme color examples */}
      <Card>
        <CardHeader>
          <CardTitle>Theme Color Palette</CardTitle>
          <CardDescription>All colors from our theme system</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {/* Primary colors */}
            <ColorSwatch name="Primary" bgClass="bg-primary" textClass="text-primary-foreground" />
            <ColorSwatch name="Secondary" bgClass="bg-secondary" textClass="text-secondary-foreground" />
            <ColorSwatch name="Accent" bgClass="bg-accent" textClass="text-accent-foreground" />
            <ColorSwatch name="Muted" bgClass="bg-muted" textClass="text-muted-foreground" />
            
            {/* Semantic colors */}
            <ColorSwatch name="Success" bgClass="bg-success" textClass="text-success-foreground" />
            <ColorSwatch name="Warning" bgClass="bg-warning" textClass="text-warning-foreground" />
            <ColorSwatch name="Destructive" bgClass="bg-destructive" textClass="text-destructive-foreground" />
            <ColorSwatch name="Info" bgClass="bg-info" textClass="text-info-foreground" />
            
            {/* Background colors */}
            <ColorSwatch name="Background" bgClass="bg-background" textClass="text-foreground" border />
            <ColorSwatch name="Card" bgClass="bg-card" textClass="text-card-foreground" border />
            <ColorSwatch name="Popover" bgClass="bg-popover" textClass="text-popover-foreground" border />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// Helper component to display a color swatch
function ColorSwatch({ 
  name, 
  bgClass, 
  textClass,
  border = false 
}: { 
  name: string; 
  bgClass: string; 
  textClass: string;
  border?: boolean;
}) {
  return (
    <div 
      className={cn(
        'p-4 rounded-md h-24 flex flex-col justify-between',
        bgClass,
        border && 'border border-border'
      )}
    >
      <span className={cn('font-medium', textClass)}>{name}</span>
      <span className={cn('text-xs opacity-80', textClass)}>{bgClass}</span>
    </div>
  );
} 