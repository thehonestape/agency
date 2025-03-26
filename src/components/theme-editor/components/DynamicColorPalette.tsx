import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from '@/components/ui/Card';
import { Badge } from '@/components/ui/badge';
import { Paintbrush, Copy } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface DynamicColorPaletteProps {
  primaryColor: string;
  backgroundColor?: string;
}

export function DynamicColorPalette({
  primaryColor,
  backgroundColor = '#ffffff'
}: DynamicColorPaletteProps) {
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState('primary');
  
  // Helper function to convert hex to HSL
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
  
  // Helper function to convert HSL to Hex
  const hslToHex = (h: number, s: number, l: number) => {
    l /= 100;
    const a = s * Math.min(l, 1 - l) / 100;
    const f = (n: number) => {
      const k = (n + h / 30) % 12;
      const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
      return Math.round(255 * color).toString(16).padStart(2, '0');
    };
    return `#${f(0)}${f(8)}${f(4)}`;
  };
  
  // Generate primary color shades
  const generatePrimaryShades = () => {
    const { h, s, l } = hexToHSL(primaryColor);
    
    return [
      { name: '50', color: hslToHex(h, Math.max(s * 0.4, 20), 97) },
      { name: '100', color: hslToHex(h, Math.max(s * 0.5, 30), 95) },
      { name: '200', color: hslToHex(h, Math.max(s * 0.6, 40), 90) },
      { name: '300', color: hslToHex(h, Math.max(s * 0.7, 50), 80) },
      { name: '400', color: hslToHex(h, Math.max(s * 0.8, 60), 70) },
      { name: '500', color: primaryColor },
      { name: '600', color: hslToHex(h, Math.min(s * 1.1, 100), Math.max(l - 10, 25)) },
      { name: '700', color: hslToHex(h, Math.min(s * 1.2, 100), Math.max(l - 20, 20)) },
      { name: '800', color: hslToHex(h, Math.min(s * 1.2, 100), Math.max(l - 30, 15)) },
      { name: '900', color: hslToHex(h, Math.min(s * 1, 90), Math.max(l - 40, 10)) },
      { name: '950', color: hslToHex(h, Math.min(s * 0.8, 85), Math.max(l - 55, 5)) }
    ];
  };
  
  // Generate gray shades based on the primary color hue
  const generateGrayShades = () => {
    const { h } = hexToHSL(primaryColor);
    // Use a hint of the primary color hue in the grays
    const grayHue = h;
    
    return [
      { name: '50', color: hslToHex(grayHue, 5, 98) },
      { name: '100', color: hslToHex(grayHue, 4, 95) },
      { name: '200', color: hslToHex(grayHue, 4, 90) },
      { name: '300', color: hslToHex(grayHue, 3, 85) },
      { name: '400', color: hslToHex(grayHue, 3, 70) },
      { name: '500', color: hslToHex(grayHue, 2, 55) },
      { name: '600', color: hslToHex(grayHue, 2, 45) },
      { name: '700', color: hslToHex(grayHue, 2, 35) },
      { name: '800', color: hslToHex(grayHue, 2, 25) },
      { name: '900', color: hslToHex(grayHue, 2, 15) },
      { name: '950', color: hslToHex(grayHue, 2, 8) }
    ];
  };
  
  // Generate accent colors
  const generateAccentColors = () => {
    const { h, s, l } = hexToHSL(primaryColor);
    
    // Complementary (opposite) color
    const complementaryHue = (h + 180) % 360;
    
    // Analogous colors (adjacent on the color wheel)
    const analogous1Hue = (h + 30) % 360;
    const analogous2Hue = (h + 330) % 360;
    
    // Split complementary
    const splitComp1Hue = (h + 150) % 360;
    const splitComp2Hue = (h + 210) % 360;
    
    return [
      { name: 'Primary', color: primaryColor },
      { name: 'Complementary', color: hslToHex(complementaryHue, s, l) },
      { name: 'Analogous 1', color: hslToHex(analogous1Hue, s, l) },
      { name: 'Analogous 2', color: hslToHex(analogous2Hue, s, l) },
      { name: 'Split Comp 1', color: hslToHex(splitComp1Hue, s, l) },
      { name: 'Split Comp 2', color: hslToHex(splitComp2Hue, s, l) }
    ];
  };
  
  // Copy color to clipboard
  const copyToClipboard = (color: string) => {
    navigator.clipboard.writeText(color);
    setSelectedColor(color);
    setCopied(true);
    
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };
  
  // Generate CSS variables string
  const generateCSSVariables = () => {
    const primaryShades = generatePrimaryShades();
    const grayShades = generateGrayShades();
    
    let css = ':root {\n';
    
    // Add primary colors
    primaryShades.forEach(shade => {
      css += `  --primary-${shade.name}: ${shade.color};\n`;
    });
    
    // Add gray colors
    grayShades.forEach(shade => {
      css += `  --gray-${shade.name}: ${shade.color};\n`;
    });
    
    css += '}';
    
    return css;
  };
  
  // Copy CSS variables
  const copyCSSVariables = () => {
    navigator.clipboard.writeText(generateCSSVariables());
    setCopied(true);
    
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  return (
    <Card className="color-palette">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div className="flex items-center space-x-2">
          <div className="bg-primary/10 p-2 rounded-full">
            <Paintbrush className="h-4 w-4 text-primary" />
          </div>
          <div>
            <CardTitle>Color Palette</CardTitle>
            <CardDescription>Color variations based on your primary color</CardDescription>
          </div>
        </div>
        <Button 
          variant="outline" 
          size="sm" 
          className="flex items-center gap-1"
          onClick={copyCSSVariables}
        >
          <Copy className="h-3 w-3" />
          <span>Copy CSS</span>
          {copied && <Badge className="ml-1 bg-green-500">Copied!</Badge>}
        </Button>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="primary" className="w-full" onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-3 mb-4">
            <TabsTrigger value="primary">Primary</TabsTrigger>
            <TabsTrigger value="gray">Gray</TabsTrigger>
            <TabsTrigger value="accent">Accent</TabsTrigger>
          </TabsList>
          
          <TabsContent value="primary" className="space-y-4">
            <div className="grid grid-cols-11 gap-1">
              {generatePrimaryShades().map((shade) => (
                <div 
                  key={shade.name}
                  className="group relative aspect-square cursor-pointer transition-all hover:scale-110 hover:shadow-md"
                  style={{ backgroundColor: shade.color }}
                  onClick={() => copyToClipboard(shade.color)}
                >
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 bg-black/30 text-white text-xs font-mono group-hover:opacity-100 transition-opacity">
                    {shade.name}
                  </div>
                </div>
              ))}
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              {generatePrimaryShades().map((shade) => (
                <Badge 
                  key={shade.name} 
                  variant="outline"
                  className="cursor-pointer hover:bg-muted"
                  onClick={() => copyToClipboard(shade.color)}
                >
                  {shade.name}: {shade.color}
                </Badge>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="gray" className="space-y-4">
            <div className="grid grid-cols-11 gap-1">
              {generateGrayShades().map((shade) => (
                <div 
                  key={shade.name}
                  className="group relative aspect-square cursor-pointer transition-all hover:scale-110 hover:shadow-md"
                  style={{ backgroundColor: shade.color }}
                  onClick={() => copyToClipboard(shade.color)}
                >
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 bg-black/30 text-white text-xs font-mono group-hover:opacity-100 transition-opacity">
                    {shade.name}
                  </div>
                </div>
              ))}
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              {generateGrayShades().map((shade) => (
                <Badge 
                  key={shade.name} 
                  variant="outline"
                  className="cursor-pointer hover:bg-muted"
                  onClick={() => copyToClipboard(shade.color)}
                >
                  {shade.name}: {shade.color}
                </Badge>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="accent" className="space-y-4">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2">
              {generateAccentColors().map((color) => (
                <div 
                  key={color.name}
                  className="group relative overflow-hidden rounded-md cursor-pointer"
                  onClick={() => copyToClipboard(color.color)}
                >
                  <div 
                    className="aspect-video w-full"
                    style={{ backgroundColor: color.color }}
                  ></div>
                  <div className="p-2 bg-card text-card-foreground text-xs">
                    <div className="font-medium">{color.name}</div>
                    <div className="font-mono text-xs opacity-70">{color.color}</div>
                  </div>
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                    <Copy className="h-5 w-5 text-white" />
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
        
        {selectedColor && (
          <div className="mt-4 p-2 bg-muted rounded-md flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div 
                className="w-5 h-5 rounded"
                style={{ backgroundColor: selectedColor }}
              ></div>
              <code className="text-xs">{selectedColor}</code>
            </div>
            <Badge variant={copied ? "default" : "outline"}>
              {copied ? "Copied!" : "Click to Copy"}
            </Badge>
          </div>
        )}
      </CardContent>
    </Card>
  );
} 