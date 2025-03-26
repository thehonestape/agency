import React, { useState } from 'react';
import { Card, CardHeader, CardContent, CardTitle, CardFooter } from '@/components/ui/Card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LayoutGrid, RefreshCw } from 'lucide-react';

interface SpacingDensityCardProps {
  baseUnit: number; // Base unit in pixels (4px in Tailwind by default)
  setBaseUnit: (value: number) => void;
  spacingDensity: 'compact' | 'comfortable' | 'spacious';
  setSpacingDensity: (value: 'compact' | 'comfortable' | 'spacious') => void;
}

export function SpacingDensityCard({
  baseUnit = 4,
  setBaseUnit,
  spacingDensity = 'comfortable',
  setSpacingDensity
}: SpacingDensityCardProps) {
  // Local state for preview before applying
  const [localBaseUnit, setLocalBaseUnit] = useState(baseUnit);
  const [localSpacingDensity, setLocalSpacingDensity] = useState(spacingDensity);
  
  // Density multipliers
  const densityMultipliers = {
    compact: 0.75,
    comfortable: 1,
    spacious: 1.5
  };
  
  // Preview spacing without applying to theme
  const handlePreviewSpacing = () => {
    setBaseUnit(localBaseUnit);
    setSpacingDensity(localSpacingDensity);
    
    // Apply to preview container
    const previewEl = document.getElementById('theme-preview-container');
    if (!previewEl) return;
    
    // Set base unit variable
    previewEl.style.setProperty('--spacing-base', `${localBaseUnit}px`);
    
    // Set density multiplier
    const multiplier = densityMultipliers[localSpacingDensity];
    previewEl.style.setProperty('--spacing-multiplier', multiplier.toString());
    
    // Calculate and set spacing scale variables
    [0, 0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 5, 6, 7, 8, 9, 10, 11, 12, 14, 16, 20, 24, 28, 32, 36, 40, 44, 48, 52, 56, 60, 64, 72, 80, 96].forEach((factor, i) => {
      const value = Math.round(localBaseUnit * factor * multiplier);
      previewEl.style.setProperty(`--spacing-${i}`, `${value}px`);
    });
    
    // Apply to preview elements
    updatePreviewElements(previewEl, multiplier);
  };
  
  // Helper to update preview elements
  const updatePreviewElements = (container: HTMLElement, multiplier: number) => {
    // Update card padding
    container.querySelectorAll('.card').forEach(card => {
      const base = multiplier * localBaseUnit * 4; // p-4 equivalent
      (card as HTMLElement).style.padding = `${base}px`;
    });
    
    // Update gap between elements
    container.querySelectorAll('[class*="space-y-"], [class*="space-x-"]').forEach(el => {
      // Extract the spacing value from class names
      const classes = (el as HTMLElement).className.split(' ');
      const spaceClass = classes.find(c => c.startsWith('space-y-') || c.startsWith('space-x-'));
      
      if (spaceClass) {
        const value = spaceClass.split('-')[2];
        const base = multiplier * localBaseUnit * parseInt(value);
        
        if (spaceClass.startsWith('space-y-')) {
          (el as HTMLElement).style.rowGap = `${base}px`;
        } else {
          (el as HTMLElement).style.columnGap = `${base}px`;
        }
      }
    });
    
    // Update margins and paddings
    const spacingProps = ['margin', 'padding'];
    const directions = ['top', 'right', 'bottom', 'left', ''];
    
    spacingProps.forEach(prop => {
      directions.forEach(dir => {
        const prefix = dir ? `${prop.charAt(0)}${dir.charAt(0)}` : prop.charAt(0);
        
        container.querySelectorAll(`[class*="${prefix}-"]`).forEach(el => {
          const classes = (el as HTMLElement).className.split(' ');
          const spacingClass = classes.find(c => {
            const parts = c.split('-');
            return parts[0] === prefix && !isNaN(parseInt(parts[1]));
          });
          
          if (spacingClass) {
            const value = parseInt(spacingClass.split('-')[1]);
            const pixels = multiplier * localBaseUnit * value;
            const cssProp = dir ? `${prop}${dir.charAt(0).toUpperCase() + dir.slice(1)}` : prop;
            
            (el as HTMLElement).style[cssProp as any] = `${pixels}px`;
          }
        });
      });
    });
  };

  return (
    <Card className="spacing-density-card">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div className="flex items-center space-x-2">
          <div className="bg-primary/10 p-2 rounded-full">
            <LayoutGrid className="h-4 w-4 text-primary" />
          </div>
          <CardTitle>Spacing Density</CardTitle>
        </div>
        <div className="flex items-center space-x-2">
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-8 w-8"
            onClick={() => {
              setLocalBaseUnit(4); // Tailwind default
              setLocalSpacingDensity('comfortable');
            }}
          >
            <RefreshCw className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="pt-2">
        <Tabs defaultValue="visual" className="w-full">
          <TabsList className="grid grid-cols-2 mb-4">
            <TabsTrigger value="visual">Visual</TabsTrigger>
            <TabsTrigger value="technical">Technical</TabsTrigger>
          </TabsList>
          
          <TabsContent value="visual" className="space-y-4">
            <div className="space-y-4">
              <div className="grid grid-cols-3 gap-2 text-center">
                <Button
                  variant={localSpacingDensity === 'compact' ? 'default' : 'outline'}
                  className="h-auto py-6 flex flex-col items-center justify-center"
                  onClick={() => setLocalSpacingDensity('compact')}
                >
                  <div className="flex space-x-1 mb-2">
                    <div className="w-3 h-3 bg-primary/20 rounded-sm"></div>
                    <div className="w-3 h-3 bg-primary/20 rounded-sm"></div>
                    <div className="w-3 h-3 bg-primary/20 rounded-sm"></div>
                  </div>
                  <span className="text-xs font-medium">Compact</span>
                </Button>
                
                <Button
                  variant={localSpacingDensity === 'comfortable' ? 'default' : 'outline'}
                  className="h-auto py-6 flex flex-col items-center justify-center"
                  onClick={() => setLocalSpacingDensity('comfortable')}
                >
                  <div className="flex space-x-2 mb-2">
                    <div className="w-3 h-3 bg-primary/20 rounded-sm"></div>
                    <div className="w-3 h-3 bg-primary/20 rounded-sm"></div>
                    <div className="w-3 h-3 bg-primary/20 rounded-sm"></div>
                  </div>
                  <span className="text-xs font-medium">Comfortable</span>
                </Button>
                
                <Button
                  variant={localSpacingDensity === 'spacious' ? 'default' : 'outline'}
                  className="h-auto py-6 flex flex-col items-center justify-center"
                  onClick={() => setLocalSpacingDensity('spacious')}
                >
                  <div className="flex space-x-3 mb-2">
                    <div className="w-3 h-3 bg-primary/20 rounded-sm"></div>
                    <div className="w-3 h-3 bg-primary/20 rounded-sm"></div>
                    <div className="w-3 h-3 bg-primary/20 rounded-sm"></div>
                  </div>
                  <span className="text-xs font-medium">Spacious</span>
                </Button>
              </div>
              
              {/* Visual Preview */}
              <div className="mt-4">
                <Label className="text-sm mb-2 block">Preview</Label>
                <div className="bg-muted/40 rounded-lg p-4">
                  <div 
                    className="bg-card rounded-md shadow-sm overflow-hidden transition-all duration-300"
                    style={{ 
                      padding: `${localBaseUnit * densityMultipliers[localSpacingDensity] * 4}px` 
                    }}
                  >
                    <div className="text-sm font-medium mb-2">Card Title</div>
                    <div 
                      className="flex flex-col transition-all duration-300"
                      style={{ 
                        gap: `${localBaseUnit * densityMultipliers[localSpacingDensity] * 3}px` 
                      }}
                    >
                      <div className="h-2 bg-muted rounded w-full"></div>
                      <div className="h-2 bg-muted rounded w-4/5"></div>
                      <div className="h-2 bg-muted rounded w-2/3"></div>
                    </div>
                    <div 
                      className="flex justify-end mt-4 transition-all duration-300"
                      style={{ 
                        marginTop: `${localBaseUnit * densityMultipliers[localSpacingDensity] * 4}px` 
                      }}
                    >
                      <div className="w-16 h-6 bg-primary/20 rounded-md"></div>
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
                  <Label htmlFor="base-unit">Base Unit (px)</Label>
                  <span className="text-sm text-muted-foreground">{localBaseUnit}px</span>
                </div>
                <Slider
                  id="base-unit"
                  min={2}
                  max={8}
                  step={1}
                  value={[localBaseUnit]}
                  onValueChange={(value) => setLocalBaseUnit(value[0])}
                  className="mt-2"
                />
                <div className="text-xs text-muted-foreground mt-1">
                  Tailwind default: 4px (0.25rem)
                </div>
              </div>
              
              <div className="pt-2">
                <Label className="text-sm mb-2 block">Spacing Scale Preview</Label>
                <div className="overflow-x-auto pb-2">
                  <div className="flex gap-1 min-w-max">
                    {[0, 1, 2, 4, 6, 8, 12, 16].map((factor) => {
                      const size = Math.round(localBaseUnit * factor * densityMultipliers[localSpacingDensity]);
                      return (
                        <div key={factor} className="flex flex-col items-center">
                          <div className="text-xs text-muted-foreground mb-1">
                            {factor === 0 ? '0' : factor}
                          </div>
                          <div 
                            className="bg-primary/20 rounded-sm"
                            style={{ 
                              width: `${size}px`, 
                              height: `${size}px`,
                              minWidth: '8px',
                              minHeight: '8px'
                            }}
                          ></div>
                          <div className="text-xs text-muted-foreground mt-1">
                            {size}px
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
              
              <div className="text-xs text-muted-foreground mt-2 p-3 bg-muted/30 rounded-md">
                <p className="font-medium mb-1">Impact on Tailwind Classes:</p>
                <ul className="space-y-1 ml-4 list-disc">
                  <li>p-4 → {localBaseUnit * 4 * densityMultipliers[localSpacingDensity]}px</li>
                  <li>gap-2 → {localBaseUnit * 2 * densityMultipliers[localSpacingDensity]}px</li>
                  <li>m-6 → {localBaseUnit * 6 * densityMultipliers[localSpacingDensity]}px</li>
                </ul>
              </div>
            </div>
          </TabsContent>
        </Tabs>
        
        <Button 
          variant="outline" 
          className="w-full mt-4"
          onClick={handlePreviewSpacing}
        >
          Preview Spacing
        </Button>
      </CardContent>
      <CardFooter>
        <div className="text-xs text-muted-foreground w-full text-center">
          Controls site-wide spacing density based on Tailwind's spacing scale
        </div>
      </CardFooter>
    </Card>
  );
} 