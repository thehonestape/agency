'use client';

import { useState } from 'react';
import { useBrand } from '@/components/brand/BrandProvider';
import { generateOptimizedTheme } from '@/lib/theme-utility';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/Card';
import { BrandColor } from '@/components/brand/BrandProvider';

interface ColorSwatch {
  name: string;
  color: string;
}

export default function ThemeGenerator() {
  const { currentBrand } = useBrand();
  const [temperature, setTemperature] = useState(1.0);
  const [preservePrimaryColors, setPreservePrimaryColors] = useState(true);
  const [generatedTheme, setGeneratedTheme] = useState<any>(null);
  
  const handleGenerateTheme = () => {
    if (!currentBrand) return;
    
    const { lightTheme, darkTheme, analysis } = generateOptimizedTheme(currentBrand, {
      temperature,
      preservePrimaryColors,
    });
    
    setGeneratedTheme({
      light: lightTheme,
      dark: darkTheme,
      analysis,
    });
    
    // Apply the CSS to see the changes
    const styleElement = document.getElementById('generated-theme-css') || document.createElement('style');
    styleElement.id = 'generated-theme-css';
    styleElement.textContent = lightTheme.css + '\n' + darkTheme.css;
    if (!document.getElementById('generated-theme-css')) {
      document.head.appendChild(styleElement);
    }
  };
  
  // Convert colors to swatches for display
  const getLightSwatches = (): ColorSwatch[] => {
    if (!generatedTheme) return [];
    
    return Object.entries(generatedTheme.light.tokens.colors).map(([key, value]) => ({
      name: key,
      color: value as string,
    }));
  };
  
  const getDarkSwatches = (): ColorSwatch[] => {
    if (!generatedTheme) return [];
    
    return Object.entries(generatedTheme.dark.tokens.colors).map(([key, value]) => ({
      name: key,
      color: value as string,
    }));
  };
  
  // Get brand colors for display
  const getBrandSwatches = (): ColorSwatch[] => {
    if (!currentBrand) return [];
    
    return currentBrand.colors.map((color: BrandColor) => ({
      name: `${color.name} ${color.isPrimary ? '(Primary)' : color.isSecondary ? '(Secondary)' : ''}`,
      color: color.value,
    }));
  };
  
  // If no brand is selected, show a message
  if (!currentBrand) {
    return (
      <div className="container mx-auto py-8 text-center">
        <h2 className="text-2xl font-bold mb-4">No Brand Selected</h2>
        <p>Please select a brand to generate theme colors.</p>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto py-8">
      <div className="grid gap-8">
        <div>
          <h1 className="text-3xl font-bold mb-4">AI-Powered Theme Generator</h1>
          <p className="text-lg mb-6">
            Generate accessible color palettes based on your brand colors using an AI-inspired algorithm.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Brand Colors */}
          <Card>
            <CardHeader>
              <CardTitle>Brand Colors</CardTitle>
              <CardDescription>Your current brand colors</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-3">
                {getBrandSwatches().map((swatch, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div 
                      className="w-8 h-8 rounded-md border"
                      style={{ backgroundColor: swatch.color }}
                    />
                    <span>{swatch.name}</span>
                    <code className="ml-auto text-xs">{swatch.color}</code>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          
          {/* Generator Controls */}
          <Card>
            <CardHeader>
              <CardTitle>Generator Controls</CardTitle>
              <CardDescription>Adjust parameters to control theme generation</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <label>Temperature: {temperature.toFixed(1)}</label>
                </div>
                <Slider 
                  min={0.4} 
                  max={2.4} 
                  step={0.1} 
                  value={[temperature]} 
                  onValueChange={values => setTemperature(values[0])} 
                />
                <p className="text-sm text-muted-foreground">
                  Controls the randomness in color generation. Higher values create more diverse colors.
                </p>
              </div>
              
              <div className="flex items-center space-x-2">
                <Switch 
                  id="preserve-colors" 
                  checked={preservePrimaryColors}
                  onCheckedChange={setPreservePrimaryColors}
                />
                <label htmlFor="preserve-colors">Preserve primary brand colors</label>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleGenerateTheme} className="w-full">
                Generate Theme
              </Button>
            </CardFooter>
          </Card>
          
          {/* Contrast Analysis */}
          <Card>
            <CardHeader>
              <CardTitle>Accessibility</CardTitle>
              <CardDescription>WCAG contrast analysis</CardDescription>
            </CardHeader>
            <CardContent>
              {generatedTheme ? (
                <div className="space-y-4">
                  <p className="text-sm">
                    Key contrast ratios from the generated theme:
                  </p>
                  <div className="space-y-2">
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div>Background-Text:</div>
                      <div className={getContrastClass(generatedTheme.analysis.light?.background?.text?.ratio)}>
                        {generatedTheme.analysis.light?.background?.text?.ratio?.toFixed(2) || 'N/A'}:1
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div>Primary-Background:</div>
                      <div className={getContrastClass(generatedTheme.analysis.light?.primary?.background?.ratio)}>
                        {generatedTheme.analysis.light?.primary?.background?.ratio?.toFixed(2) || 'N/A'}:1
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div>Text-Muted:</div>
                      <div className={getContrastClass(generatedTheme.analysis.light?.text?.muted?.ratio)}>
                        {generatedTheme.analysis.light?.text?.muted?.ratio?.toFixed(2) || 'N/A'}:1
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-4 text-muted-foreground">
                  Generate a theme to see accessibility analysis
                </div>
              )}
            </CardContent>
          </Card>
        </div>
        
        {generatedTheme && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            {/* Light Theme */}
            <Card>
              <CardHeader>
                <CardTitle>Light Theme</CardTitle>
                <CardDescription>Generated light mode colors</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-3">
                  {getLightSwatches().map((swatch, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div 
                        className="w-8 h-8 rounded-md border"
                        style={{ backgroundColor: swatch.color }}
                      />
                      <span>{swatch.name}</span>
                      <code className="ml-auto text-xs">{swatch.color}</code>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" onClick={() => copyThemeToClipboard('light')} className="w-full">
                  Copy CSS Variables
                </Button>
              </CardFooter>
            </Card>
            
            {/* Dark Theme */}
            <Card>
              <CardHeader>
                <CardTitle>Dark Theme</CardTitle>
                <CardDescription>Generated dark mode colors</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-3">
                  {getDarkSwatches().map((swatch, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div 
                        className="w-8 h-8 rounded-md border"
                        style={{ backgroundColor: swatch.color }}
                      />
                      <span>{swatch.name}</span>
                      <code className="ml-auto text-xs">{swatch.color}</code>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" onClick={() => copyThemeToClipboard('dark')} className="w-full">
                  Copy CSS Variables
                </Button>
              </CardFooter>
            </Card>
          </div>
        )}
        
        {/* Preview Section with UI elements styled by the theme */}
        {generatedTheme && (
          <Card className="mt-8">
            <CardHeader>
              <CardTitle>Theme Preview</CardTitle>
              <CardDescription>See how UI elements look with the new theme</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Light Mode</h3>
                  <div className="p-6 rounded-lg border bg-background text-foreground space-y-4">
                    <h4 className="font-semibold">Sample UI Components</h4>
                    <div className="space-x-2">
                      <Button variant="default">Primary</Button>
                      <Button variant="secondary">Secondary</Button>
                      <Button variant="outline">Outline</Button>
                      <Button variant="ghost">Ghost</Button>
                    </div>
                    <div className="space-y-2">
                      <div className="bg-muted p-4 rounded-md">
                        <p className="text-muted-foreground">Muted background with text</p>
                      </div>
                      <div className="bg-accent p-4 rounded-md">
                        <p className="text-accent-foreground">Accent background with text</p>
                      </div>
                      <div className="bg-destructive p-4 rounded-md">
                        <p className="text-destructive-foreground">Destructive background with text</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Dark Mode</h3>
                  <div className="p-6 rounded-lg border dark bg-background text-foreground space-y-4">
                    <h4 className="font-semibold">Sample UI Components</h4>
                    <div className="space-x-2">
                      <Button variant="default">Primary</Button>
                      <Button variant="secondary">Secondary</Button>
                      <Button variant="outline">Outline</Button>
                      <Button variant="ghost">Ghost</Button>
                    </div>
                    <div className="space-y-2">
                      <div className="bg-muted p-4 rounded-md">
                        <p className="text-muted-foreground">Muted background with text</p>
                      </div>
                      <div className="bg-accent p-4 rounded-md">
                        <p className="text-accent-foreground">Accent background with text</p>
                      </div>
                      <div className="bg-destructive p-4 rounded-md">
                        <p className="text-destructive-foreground">Destructive background with text</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
  
  // Helper functions
  function getContrastClass(ratio?: number): string {
    if (!ratio) return 'text-muted-foreground';
    if (ratio >= 7) return 'text-green-500 font-semibold';
    if (ratio >= 4.5) return 'text-amber-500 font-semibold';
    return 'text-red-500 font-semibold';
  }
  
  function copyThemeToClipboard(mode: 'light' | 'dark') {
    if (!generatedTheme) return;
    
    const css = mode === 'light' ? generatedTheme.light.css : generatedTheme.dark.css;
    navigator.clipboard.writeText(css)
      .then(() => {
        alert(`${mode.charAt(0).toUpperCase() + mode.slice(1)} theme CSS variables copied to clipboard!`);
      })
      .catch(err => {
        console.error('Failed to copy: ', err);
      });
  }
} 