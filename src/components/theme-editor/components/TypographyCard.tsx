import React, { useState } from 'react';
import { Card, CardHeader, CardContent, CardTitle, CardFooter } from '@/components/ui/Card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Type, RefreshCw } from 'lucide-react';

interface TypographyCardProps {
  fontSize: number;
  setFontSize: (value: number) => void;
  headingFont?: string;
  bodyFont?: string;
  setHeadingFont?: (font: string) => void;
  setBodyFont?: (font: string) => void;
  typeScale?: string;
  setTypeScale?: (scale: string) => void;
  headingWeight?: string;
  setHeadingWeight?: (weight: string) => void;
}

export function TypographyCard({ 
  fontSize, 
  setFontSize,
  headingFont = 'Inter',
  bodyFont = 'Inter',
  setHeadingFont,
  setBodyFont,
  typeScale = '1.2',
  setTypeScale,
  headingWeight = '700',
  setHeadingWeight
}: TypographyCardProps) {
  // Internal state to track values before applying to preview
  const [localHeadingFont, setLocalHeadingFont] = useState(headingFont);
  const [localBodyFont, setLocalBodyFont] = useState(bodyFont);
  const [localTypeScale, setLocalTypeScale] = useState(typeScale);
  const [localHeadingWeight, setLocalHeadingWeight] = useState(headingWeight);
  const [localFontSize, setLocalFontSize] = useState(fontSize);

  // Function to handle typography preview
  const handlePreviewTypography = () => {
    // Update font size in the parent component
    if (setFontSize) setFontSize(localFontSize);
    
    // Update other typography settings in the parent component
    if (setHeadingFont) setHeadingFont(localHeadingFont);
    if (setBodyFont) setBodyFont(localBodyFont);
    if (setTypeScale) setTypeScale(localTypeScale);
    if (setHeadingWeight) setHeadingWeight(localHeadingWeight);
    
    // Apply typography to the preview element
    const previewEl = document.getElementById('theme-preview-container');
    if (previewEl) {
      // Apply font size
      previewEl.style.setProperty('--font-size', `${localFontSize}px`);
      
      // Apply heading font
      previewEl.style.setProperty('--heading-font', localHeadingFont);
      
      // Apply body font
      previewEl.style.setProperty('--body-font', localBodyFont);
      
      // Apply type scale
      previewEl.style.setProperty('--type-scale', localTypeScale);
      
      // Apply heading weight
      previewEl.style.setProperty('--heading-weight', localHeadingWeight);
      
      // Apply typography to specific elements
      const headings = previewEl.querySelectorAll('h1, h2, h3, h4, h5, h6');
      headings.forEach(heading => {
        (heading as HTMLElement).style.fontFamily = `var(--heading-font), system-ui, sans-serif`;
        (heading as HTMLElement).style.fontWeight = `var(--heading-weight)`;
      });
      
      // Apply body text style
      previewEl.style.fontFamily = `var(--body-font), system-ui, sans-serif`;
      previewEl.style.fontSize = `var(--font-size)`;
    }
  };

  return (
    <Card className="theme-typography-card">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div className="flex items-center space-x-2">
          <div className="bg-primary/10 p-2 rounded-full">
            <Type className="h-4 w-4 text-primary" />
          </div>
          <CardTitle>Typography</CardTitle>
        </div>
        <div className="flex items-center space-x-2">
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-8 w-8"
            onClick={() => {
              // Reset to defaults
              setLocalHeadingFont('Inter');
              setLocalBodyFont('Inter');
              setLocalTypeScale('1.2');
              setLocalHeadingWeight('700');
              setLocalFontSize(16);
            }}
          >
            <RefreshCw className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="pt-2">
        <div className="space-y-4">
          {/* Font Family Selection */}
          <div className="space-y-2">
            <Label htmlFor="heading-font">Heading Font</Label>
            <Select value={localHeadingFont} onValueChange={setLocalHeadingFont}>
              <SelectTrigger id="heading-font">
                <SelectValue placeholder="Select heading font" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Inter">Inter</SelectItem>
                <SelectItem value="Roboto">Roboto</SelectItem>
                <SelectItem value="Montserrat">Montserrat</SelectItem>
                <SelectItem value="Playfair Display">Playfair Display</SelectItem>
                <SelectItem value="Source Serif Pro">Source Serif Pro</SelectItem>
                {/* Adobe Typekit integration */}
                <SelectItem value="typekit">Connect Adobe Typekit...</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="body-font">Body Font</Label>
            <Select value={localBodyFont} onValueChange={setLocalBodyFont}>
              <SelectTrigger id="body-font">
                <SelectValue placeholder="Select body font" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Inter">Inter</SelectItem>
                <SelectItem value="Roboto">Roboto</SelectItem>
                <SelectItem value="Open Sans">Open Sans</SelectItem>
                <SelectItem value="Lora">Lora</SelectItem>
                <SelectItem value="Merriweather">Merriweather</SelectItem>
                {/* Adobe Typekit integration */}
                <SelectItem value="typekit">Connect Adobe Typekit...</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          {/* Base Font Size */}
          <div className="space-y-2">
            <div className="flex justify-between">
              <Label htmlFor="font-size">Base Font Size</Label>
              <span className="text-sm text-muted-foreground">{localFontSize}px</span>
            </div>
            <Slider
              id="font-size"
              min={14}
              max={20}
              step={1}
              value={[localFontSize]}
              onValueChange={(value) => setLocalFontSize(value[0])}
            />
          </div>
          
          {/* Type Scale */}
          <div className="space-y-2">
            <Label htmlFor="type-scale">Type Scale</Label>
            <Select value={localTypeScale} onValueChange={setLocalTypeScale}>
              <SelectTrigger id="type-scale">
                <SelectValue placeholder="Select type scale" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1.067">Minor Second (1.067)</SelectItem>
                <SelectItem value="1.125">Major Second (1.125)</SelectItem>
                <SelectItem value="1.2">Minor Third (1.2)</SelectItem>
                <SelectItem value="1.25">Major Third (1.25)</SelectItem>
                <SelectItem value="1.333">Perfect Fourth (1.333)</SelectItem>
                <SelectItem value="1.414">Augmented Fourth (1.414)</SelectItem>
                <SelectItem value="1.5">Perfect Fifth (1.5)</SelectItem>
                <SelectItem value="1.618">Golden Ratio (1.618)</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          {/* Font Weight Controls */}
          <div className="space-y-2">
            <Label htmlFor="heading-weight">Heading Weight</Label>
            <Select value={localHeadingWeight} onValueChange={setLocalHeadingWeight}>
              <SelectTrigger id="heading-weight">
                <SelectValue placeholder="Select heading weight" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="400">Regular (400)</SelectItem>
                <SelectItem value="500">Medium (500)</SelectItem>
                <SelectItem value="600">Semibold (600)</SelectItem>
                <SelectItem value="700">Bold (700)</SelectItem>
                <SelectItem value="800">Extrabold (800)</SelectItem>
                <SelectItem value="900">Black (900)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button 
          variant="outline" 
          className="w-full"
          onClick={handlePreviewTypography}
        >
          Preview Typography
        </Button>
      </CardFooter>
    </Card>
  );
} 