import React, { useState } from 'react';
import { Card, CardHeader, CardContent, CardTitle, CardFooter } from '@/components/ui/Card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import { Palette, RefreshCw } from 'lucide-react';

interface ColorCardProps {
  primaryColor: string;
  onColorChange: (color: string) => void;
  borderRadius: number;
  setBorderRadius: (value: number) => void;
  backgroundColor?: string;
  setBackgroundColor?: (color: string) => void;
}

export function ColorCard({ 
  primaryColor, 
  onColorChange,
  borderRadius,
  setBorderRadius,
  backgroundColor = '#ffffff',
  setBackgroundColor
}: ColorCardProps) {
  // Internal state to track values before applying to preview
  const [localPrimaryColor, setLocalPrimaryColor] = useState(primaryColor);
  const [localBorderRadius, setLocalBorderRadius] = useState(borderRadius);
  const [localBackgroundColor, setLocalBackgroundColor] = useState(backgroundColor);
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Helper function to convert hex to HSL for color palette generation
  const hexToHSL = (hex: string) => {
    // Convert hex to RGB
    let r = parseInt(hex.slice(1, 3), 16) / 255;
    let g = parseInt(hex.slice(3, 5), 16) / 255;
    let b = parseInt(hex.slice(5, 7), 16) / 255;
    
    // Find min/max for HSL calculation
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h = 0, s = 0, l = (max + min) / 2;

    if (max !== min) {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      
      switch (max) {
        case r: h = (g - b) / d + (g < b ? 6 : 0); break;
        case g: h = (b - r) / d + 2; break;
        case b: h = (r - g) / d + 4; break;
      }
      h /= 6;
    }

    // Convert to HSL values
    h = Math.round(h * 360);
    s = Math.round(s * 100);
    l = Math.round(l * 100);
    
    return { h, s, l };
  };

  // Helper function to invert color for dark mode
  const invertColorForDarkMode = (hex: string) => {
    // Simple inversion for dark mode - in a real app you'd use a more sophisticated approach
    if (!isDarkMode) return hex;
    
    // For dark mode, we'll create a darker background color
    const bg = '#121212'; // Standard dark mode background
    
    // And we'll make the primary color brighter if needed
    const { h, s, l } = hexToHSL(hex);
    const newL = Math.min(l + 15, 70); // Ensure the color is bright enough but not too bright
    
    return bg;
  };

  // Function to apply color scheme to preview
  const applyColorSchemeToPreview = () => {
    // Update parent component values
    if (onColorChange) onColorChange(localPrimaryColor);
    if (setBorderRadius) setBorderRadius(localBorderRadius);
    if (setBackgroundColor) setBackgroundColor(localBackgroundColor);
    
    // Apply to the preview element
    const previewEl = document.getElementById('theme-preview-container');
    if (previewEl) {
      // Set dark mode if needed
      if (isDarkMode) {
        previewEl.classList.add('dark-mode');
        previewEl.style.backgroundColor = '#121212';
        previewEl.style.color = '#f5f5f5';
      } else {
        previewEl.classList.remove('dark-mode');
        previewEl.style.backgroundColor = localBackgroundColor;
        previewEl.style.color = '#121212';
      }
      
      // Apply primary color
      previewEl.style.setProperty('--primary', localPrimaryColor);
      
      // Apply border radius
      previewEl.style.setProperty('--radius', `${localBorderRadius}rem`);
      
      // Find all buttons and apply primary color
      const buttons = previewEl.querySelectorAll('.primary');
      buttons.forEach(button => {
        (button as HTMLElement).style.backgroundColor = localPrimaryColor;
        (button as HTMLElement).style.color = isDarkMode ? '#121212' : '#ffffff';
      });
      
      // Apply border radius to all elements with .rounded class
      const roundedElements = previewEl.querySelectorAll('.rounded-md');
      roundedElements.forEach(element => {
        (element as HTMLElement).style.borderRadius = `${localBorderRadius}rem`;
      });
    }
  };

  return (
    <Card className="theme-color-card">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div className="flex items-center space-x-2">
          <div className="bg-primary/10 p-2 rounded-full">
            <Palette className="h-4 w-4 text-primary" />
          </div>
          <CardTitle>Colors</CardTitle>
        </div>
        <div className="flex items-center space-x-2">
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-8 w-8"
            onClick={() => {
              // Reset to defaults
              setLocalPrimaryColor('#00A9FF');
              setLocalBorderRadius(0.5);
              setLocalBackgroundColor('#ffffff');
              setIsDarkMode(false);
            }}
          >
            <RefreshCw className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="pt-2">
        <div className="space-y-4">
          {/* Primary Color Selection */}
          <div className="space-y-2">
            <Label htmlFor="primary-color">Primary Color</Label>
            <div className="flex gap-2">
              <div 
                className="w-10 h-10 rounded-md border"
                style={{ backgroundColor: localPrimaryColor }}
              />
              <Input
                type="color"
                id="primary-color"
                value={localPrimaryColor}
                onChange={(e) => setLocalPrimaryColor(e.target.value)}
                className="w-full"
              />
            </div>
          </div>
          
          {/* Color Mode */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="dark-mode">Dark Mode</Label>
              <Switch 
                id="dark-mode" 
                checked={isDarkMode}
                onCheckedChange={setIsDarkMode}
              />
            </div>
          </div>
          
          {/* Border Radius */}
          <div className="space-y-2">
            <div className="flex justify-between">
              <Label htmlFor="border-radius">Border Radius</Label>
              <span className="text-sm text-muted-foreground">{localBorderRadius}rem</span>
            </div>
            <Slider
              id="border-radius"
              min={0}
              max={2}
              step={0.1}
              value={[localBorderRadius]}
              onValueChange={(value) => setLocalBorderRadius(value[0])}
            />
          </div>
          
          {/* Color Palette Generation */}
          <div className="space-y-2">
            <Label>Color Palette</Label>
            <div className="grid grid-cols-5 gap-2">
              {[100, 200, 300, 400, 500, 600, 700, 800, 900].map((shade, i) => {
                const { h, s, l } = hexToHSL(localPrimaryColor);
                const shadeColor = isDarkMode 
                  ? `hsl(${h}, ${Math.max(40, s)}%, ${Math.min(80, Math.max(20, l + 30 - (i * 7)))}%)`
                  : `hsl(${h}, ${Math.max(10, s - (i * 5))}%, ${Math.max(10, 100 - (i * 8))}%)`;
                
                return (
                  <div 
                    key={i} 
                    className="aspect-square rounded-md" 
                    style={{ backgroundColor: shadeColor }}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button 
          variant="outline" 
          className="w-full"
          onClick={applyColorSchemeToPreview}
        >
          Generate Color Scheme
        </Button>
      </CardFooter>
    </Card>
  );
} 