import React, { useState } from 'react';
import { Card, CardHeader, CardContent, CardTitle, CardFooter } from '@/components/ui/Card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Type, RefreshCw } from 'lucide-react';

interface TypographyScaleCardProps {
  baseFontSize: number;
  setBaseFontSize: (value: number) => void;
  typeScale: string;
  setTypeScale: (scale: string) => void;
  baseLineHeight: number;
  setBaseLineHeight: (value: number) => void;
}

export function TypographyScaleCard({
  baseFontSize = 16,
  setBaseFontSize,
  typeScale = '1.25',
  setTypeScale,
  baseLineHeight = 1.5,
  setBaseLineHeight
}: TypographyScaleCardProps) {
  // Local state
  const [localBaseFontSize, setLocalBaseFontSize] = useState(baseFontSize);
  const [localTypeScale, setLocalTypeScale] = useState(typeScale);
  const [localBaseLineHeight, setLocalBaseLineHeight] = useState(baseLineHeight);
  
  // Calculate type scale
  const calculateScaleSize = (level: number): number => {
    const scale = parseFloat(localTypeScale);
    if (level === 0) return localBaseFontSize;
    return Math.round(localBaseFontSize * Math.pow(scale, level) * 100) / 100;
  };
  
  // Apply typography preview
  const handlePreviewTypography = () => {
    setBaseFontSize(localBaseFontSize);
    setTypeScale(localTypeScale);
    setBaseLineHeight(localBaseLineHeight);
    
    const previewEl = document.getElementById('theme-preview-container');
    if (!previewEl) return;
    
    // Set base typography variables
    previewEl.style.setProperty('--font-size-base', `${localBaseFontSize}px`);
    previewEl.style.setProperty('--type-scale', localTypeScale);
    previewEl.style.setProperty('--line-height-base', localBaseLineHeight.toString());
    
    // Calculate heading sizes
    for (let i = 1; i <= 6; i++) {
      // h1 is level 5, h6 is level 0
      const level = 6 - i;
      const fontSize = calculateScaleSize(level);
      previewEl.style.setProperty(`--h${i}-size`, `${fontSize}px`);
      
      // Calculate appropriate line heights (tighter for headings)
      const lineHeight = i <= 2 ? 1.1 : i <= 4 ? 1.2 : 1.3;
      previewEl.style.setProperty(`--h${i}-line-height`, lineHeight.toString());
    }
    
    // Apply to headings in preview
    ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'].forEach((tag, i) => {
      const elements = previewEl.querySelectorAll(tag);
      elements.forEach(el => {
        (el as HTMLElement).style.fontSize = `var(--h${i+1}-size)`;
        (el as HTMLElement).style.lineHeight = `var(--h${i+1}-line-height)`;
      });
    });
    
    // Apply base font size
    previewEl.style.fontSize = `${localBaseFontSize}px`;
    previewEl.style.lineHeight = localBaseLineHeight.toString();
    
    // Apply scale to text size classes
    ['xs', 'sm', 'base', 'lg', 'xl', '2xl', '3xl', '4xl', '5xl', '6xl', '7xl', '8xl', '9xl'].forEach((size, i) => {
      const sizeMap: {[key: string]: number} = {
        'xs': -2,
        'sm': -1,
        'base': 0,
        'lg': 1,
        'xl': 2,
        '2xl': 3,
        '3xl': 4,
        '4xl': 5,
        '5xl': 6,
        '6xl': 7,
        '7xl': 8,
        '8xl': 9,
        '9xl': 10
      };
      
      const fontSize = calculateScaleSize(sizeMap[size]);
      previewEl.style.setProperty(`--text-${size}`, `${fontSize}px`);
      
      // Apply to elements with text-size classes
      const elements = previewEl.querySelectorAll(`.text-${size}`);
      elements.forEach(el => {
        (el as HTMLElement).style.fontSize = `var(--text-${size})`;
      });
    });
  };

  return (
    <Card className="typography-scale-card">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div className="flex items-center space-x-2">
          <div className="bg-primary/10 p-2 rounded-full">
            <Type className="h-4 w-4 text-primary" />
          </div>
          <CardTitle>Typography Scale</CardTitle>
        </div>
        <div className="flex items-center space-x-2">
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-8 w-8"
            onClick={() => {
              setLocalBaseFontSize(16);
              setLocalTypeScale('1.25');
              setLocalBaseLineHeight(1.5);
            }}
          >
            <RefreshCw className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="pt-2">
        <Tabs defaultValue="visual" className="w-full">
          <TabsList className="grid grid-cols-2 mb-4">
            <TabsTrigger value="visual">Visual Scale</TabsTrigger>
            <TabsTrigger value="technical">Technical</TabsTrigger>
          </TabsList>
          
          <TabsContent value="visual" className="space-y-4">
            <div className="space-y-4">
              <div>
                <Label htmlFor="type-scale">Type Scale Ratio</Label>
                <Select value={localTypeScale} onValueChange={setLocalTypeScale}>
                  <SelectTrigger id="type-scale" className="mt-1.5">
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
              
              {/* Visual Preview */}
              <div className="mt-4">
                <Label className="text-sm mb-2 block">Type Scale Preview</Label>
                <div className="bg-muted/40 rounded-lg p-4 overflow-y-auto max-h-60">
                  <div className="space-y-3">
                    {['h1', 'h2', 'h3', 'h4', 'h5', 'h6'].map((tag, i) => {
                      const level = 5 - i; // h1 is level 5, h6 is level 0
                      const fontSize = calculateScaleSize(level);
                      return (
                        <div key={tag} className="flex items-baseline justify-between">
                          <div 
                            style={{ 
                              fontSize: `${fontSize}px`,
                              lineHeight: i <= 1 ? 1.1 : i <= 3 ? 1.2 : 1.3
                            }}
                          >
                            {tag.toUpperCase()}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {Math.round(fontSize)}px
                          </div>
                        </div>
                      );
                    })}
                    <div className="border-t pt-2 flex items-baseline justify-between">
                      <div>Text base</div>
                      <div className="text-xs text-muted-foreground">
                        {localBaseFontSize}px
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="technical" className="space-y-4">
            <div className="space-y-4">
              <div>
                <div className="flex justify-between">
                  <Label htmlFor="base-font-size">Base Font Size</Label>
                  <span className="text-sm text-muted-foreground">{localBaseFontSize}px</span>
                </div>
                <Slider
                  id="base-font-size"
                  min={14}
                  max={20}
                  step={1}
                  value={[localBaseFontSize]}
                  onValueChange={(value) => setLocalBaseFontSize(value[0])}
                  className="mt-2"
                />
              </div>
              
              <div>
                <div className="flex justify-between">
                  <Label htmlFor="base-line-height">Base Line Height</Label>
                  <span className="text-sm text-muted-foreground">{localBaseLineHeight}</span>
                </div>
                <Slider
                  id="base-line-height"
                  min={1.2}
                  max={2}
                  step={0.1}
                  value={[localBaseLineHeight]}
                  onValueChange={(value) => setLocalBaseLineHeight(value[0])}
                  className="mt-2"
                />
              </div>
              
              <div className="text-xs text-muted-foreground mt-2 p-3 bg-muted/30 rounded-md">
                <p className="font-medium mb-1">Tailwind Font Size Classes:</p>
                <div className="grid grid-cols-2 gap-x-4 gap-y-1">
                  {['xs', 'sm', 'base', 'lg', 'xl', '2xl', '3xl'].map(size => {
                    const sizeMap: {[key: string]: number} = {
                      'xs': -2,
                      'sm': -1,
                      'base': 0,
                      'lg': 1,
                      'xl': 2,
                      '2xl': 3,
                      '3xl': 4
                    };
                    
                    const fontSize = calculateScaleSize(sizeMap[size]);
                    
                    return (
                      <div key={size} className="flex justify-between">
                        <span>text-{size}</span>
                        <span>{Math.round(fontSize)}px</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
        
        <Button 
          variant="outline" 
          className="w-full mt-4"
          onClick={handlePreviewTypography}
        >
          Preview Typography
        </Button>
      </CardContent>
      <CardFooter>
        <div className="text-xs text-muted-foreground w-full text-center">
          Controls text size relationships based on modular scale principles
        </div>
      </CardFooter>
    </Card>
  );
} 