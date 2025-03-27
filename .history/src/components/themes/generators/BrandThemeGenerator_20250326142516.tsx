import React, { useState, useEffect } from 'react';
import { 
  Button, 
  Card 
} from '../../../component-system';
import { BrandData } from '../../../component-system';
import { generateThemeFromBrand } from '../../../themes/generators/brandToTheme';
import { Theme, useTheme } from '../../../component-system';
import { Label } from '../../ui/label';
import { Input } from '../../ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../ui/select';
import { Palette, Type, Box, Sliders, EyeIcon, CheckIcon, RefreshCw } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../ui/tabs';
import { Switch } from '../../ui/switch';

interface BrandThemeGeneratorProps {
  onThemeGenerated?: (theme: Theme) => void;
}

export const BrandThemeGenerator: React.FC<BrandThemeGeneratorProps> = ({ 
  onThemeGenerated 
}) => {
  const { setTheme } = useTheme();
  const [brandData, setBrandData] = useState<BrandData>({
    name: 'My Brand',
    colors: {
      primary: '#0066cc',
      secondary: '#6c757d',
      accent: '#ff7b00',
    },
    typography: {
      headingFont: 'Inter',
      bodyFont: 'Inter',
      baseSize: 16,
      scale: 1.25,
      lineHeight: 1.5
    },
    spacing: {
      baseUnit: 4,
      density: 'comfortable'
    },
    radius: {
      base: 0.5
    },
    mode: 'light'
  });

  const [generatedTheme, setGeneratedTheme] = useState<Theme | null>(null);

  const handleColorChange = (
    colorType: 'primary' | 'secondary' | 'accent',
    value: string
  ) => {
    setBrandData({
      ...brandData,
      colors: {
        ...brandData.colors,
        [colorType]: value
      }
    });
  };

  const handleTypographyChange = (
    typeProp: 'headingFont' | 'bodyFont' | 'scale',
    value: string | number
  ) => {
    setBrandData({
      ...brandData,
      typography: {
        ...brandData.typography,
        [typeProp]: typeProp === 'scale' ? parseFloat(value as string) : value
      }
    });
  };

  const handleSpacingChange = (
    spacingProp: 'baseUnit' | 'density',
    value: string | number
  ) => {
    setBrandData({
      ...brandData,
      spacing: {
        ...brandData.spacing,
        [spacingProp]: spacingProp === 'baseUnit' ? Number(value) : value
      }
    });
  };

  const handleGenerateTheme = () => {
    const theme = generateThemeFromBrand(brandData);
    setGeneratedTheme(theme);
    
    if (onThemeGenerated) {
      onThemeGenerated(theme);
    }
  };

  const handleApplyTheme = () => {
    if (generatedTheme) {
      setTheme(generatedTheme);
    }
  };

  // Preview section with styled components
  const ThemePreview = () => {
    if (!generatedTheme) {
      return (
        <div className="flex flex-col items-center justify-center p-8 text-center border border-dashed border-muted-foreground/50 rounded-lg bg-background/50">
          <RefreshCw size={24} className="mb-2 text-muted-foreground/70" />
          <p className="text-muted-foreground">Generate a theme to see a preview</p>
        </div>
      );
    }

    // Apply the generated theme colors for the preview
    const previewStyle = {
      "--primary": brandData.colors.primary,
      "--secondary": brandData.colors.secondary,
      "--accent": brandData.colors.accent,
    } as React.CSSProperties;

    return (
      <div style={previewStyle} className="space-y-6">
        <div className="space-y-2">
          <div className="flex items-center gap-4">
            <Button variant="primary">Primary Button</Button>
            <Button variant="secondary">Secondary Button</Button>
            <Button variant="outline">Outline Button</Button>
          </div>
        </div>

        <div className="flex gap-4">
          <div className="flex-1 space-y-2">
            <Label htmlFor="preview-input">Input Field</Label>
            <Input id="preview-input" placeholder="Enter text..." />
          </div>
          
          <div className="flex-1 space-y-2">
            <Label htmlFor="preview-select">Select Field</Label>
            <Select defaultValue="option1">
              <SelectTrigger id="preview-select" className="bg-background border-input hover:bg-muted/50 transition-colors">
                <SelectValue placeholder="Select an option" />
              </SelectTrigger>
              <SelectContent className="bg-popover border border-border shadow-md rounded-md">
                <SelectItem value="option1" className="focus:bg-accent/20 cursor-pointer">Option 1</SelectItem>
                <SelectItem value="option2" className="focus:bg-accent/20 cursor-pointer">Option 2</SelectItem>
                <SelectItem value="option3" className="focus:bg-accent/20 cursor-pointer">Option 3</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <Tabs defaultValue="tab1" className="w-full">
          <TabsList className="mb-2">
            <TabsTrigger value="tab1">Tab 1</TabsTrigger>
            <TabsTrigger value="tab2">Tab 2</TabsTrigger>
          </TabsList>
          <TabsContent value="tab1" className="p-4 border border-border rounded-md">
            <p>Tab content 1</p>
          </TabsContent>
          <TabsContent value="tab2" className="p-4 border border-border rounded-md">
            <p>Tab content 2</p>
          </TabsContent>
        </Tabs>

        <div className="flex items-center space-x-2">
          <Switch id="preview-switch" />
          <Label htmlFor="preview-switch">Toggle setting</Label>
        </div>

        <div className="grid grid-cols-4 gap-2">
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 rounded-md border border-border shadow-sm" style={{ backgroundColor: brandData.colors.primary }}></div>
            <span className="text-xs mt-1 text-muted-foreground">Primary</span>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 rounded-md border border-border shadow-sm" style={{ backgroundColor: brandData.colors.secondary }}></div>
            <span className="text-xs mt-1 text-muted-foreground">Secondary</span>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 rounded-md border border-border shadow-sm" style={{ backgroundColor: brandData.colors.accent }}></div>
            <span className="text-xs mt-1 text-muted-foreground">Accent</span>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 rounded-md bg-background border border-border shadow-sm"></div>
            <span className="text-xs mt-1 text-muted-foreground">Background</span>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 rounded-md bg-foreground border border-border shadow-sm"></div>
            <span className="text-xs mt-1 text-muted-foreground">Foreground</span>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 rounded-md bg-muted border border-border shadow-sm"></div>
            <span className="text-xs mt-1 text-muted-foreground">Muted</span>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 rounded-md bg-popover border border-border shadow-sm"></div>
            <span className="text-xs mt-1 text-muted-foreground">Popover</span>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 rounded-md border border-border shadow-sm" style={{ backgroundColor: 'var(--border)' }}></div>
            <span className="text-xs mt-1 text-muted-foreground">Border</span>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <Card variant="elevated" className="rounded-lg border border-border shadow-sm">
        <div className="p-6">
          <h3 className="text-lg font-medium mb-4 flex items-center gap-2 text-foreground">
            <Palette size={18} className="text-primary" />
            Brand Colors
          </h3>
          
          <div className="space-y-4">
            <div>
              <Label htmlFor="brand-name" className="text-sm font-medium text-foreground">Brand Name</Label>
              <Input
                id="brand-name"
                type="text"
                value={brandData.name}
                onChange={(e) => setBrandData({ ...brandData, name: e.target.value })}
                className="mt-1.5 w-full focus:ring-1 focus:ring-primary transition-all"
              />
            </div>
            
            <div>
              <Label htmlFor="primary-color" className="text-sm font-medium text-foreground">Primary Color</Label>
              <div className="flex items-center gap-2 mt-1.5">
                <div className="relative">
                  <Input
                    id="primary-color"
                    type="color"
                    value={brandData.colors.primary}
                    onChange={(e) => handleColorChange('primary', e.target.value)}
                    className="w-12 h-10 p-0.5 overflow-hidden border border-input rounded-md cursor-pointer ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  />
                </div>
                <Input
                  id="primary-color-hex"
                  type="text"
                  value={brandData.colors.primary}
                  onChange={(e) => handleColorChange('primary', e.target.value)}
                  className="flex-1 focus:ring-1 focus:ring-primary transition-all"
                  aria-labelledby="primary-color"
                />
              </div>
            </div>
            
            <div>
              <Label htmlFor="secondary-color" className="text-sm font-medium text-foreground">Secondary Color</Label>
              <div className="flex items-center gap-2 mt-1.5">
                <div className="relative">
                  <Input
                    id="secondary-color"
                    type="color"
                    value={brandData.colors.secondary || '#6c757d'}
                    onChange={(e) => handleColorChange('secondary', e.target.value)}
                    className="w-12 h-10 p-0.5 overflow-hidden border border-input rounded-md cursor-pointer ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  />
                </div>
                <Input
                  id="secondary-color-hex"
                  type="text"
                  value={brandData.colors.secondary || '#6c757d'}
                  onChange={(e) => handleColorChange('secondary', e.target.value)}
                  className="flex-1 focus:ring-1 focus:ring-primary transition-all"
                  aria-labelledby="secondary-color"
                />
              </div>
            </div>
            
            <div>
              <Label htmlFor="accent-color" className="text-sm font-medium text-foreground">Accent Color</Label>
              <div className="flex items-center gap-2 mt-1.5">
                <div className="relative">
                  <Input
                    id="accent-color"
                    type="color"
                    value={brandData.colors.accent || '#ff7b00'}
                    onChange={(e) => handleColorChange('accent', e.target.value)}
                    className="w-12 h-10 p-0.5 overflow-hidden border border-input rounded-md cursor-pointer ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  />
                </div>
                <Input
                  id="accent-color-hex"
                  type="text"
                  value={brandData.colors.accent || '#ff7b00'}
                  onChange={(e) => handleColorChange('accent', e.target.value)}
                  className="flex-1 focus:ring-1 focus:ring-primary transition-all"
                  aria-labelledby="accent-color"
                />
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-border">
              <Label className="text-sm font-medium text-foreground mb-2 block">Color Preview</Label>
              <div className="flex gap-2 mt-2">
                <div 
                  className="h-12 flex-1 rounded-md shadow-sm border border-border" 
                  style={{ backgroundColor: brandData.colors.primary }}
                  title="Primary Color"
                />
                <div 
                  className="h-12 flex-1 rounded-md shadow-sm border border-border" 
                  style={{ backgroundColor: brandData.colors.secondary }}
                  title="Secondary Color"
                />
                <div 
                  className="h-12 flex-1 rounded-md shadow-sm border border-border" 
                  style={{ backgroundColor: brandData.colors.accent }}
                  title="Accent Color"
                />
              </div>
              <div className="flex gap-2 mt-1 text-xs text-muted-foreground">
                <span className="flex-1 text-center">Primary</span>
                <span className="flex-1 text-center">Secondary</span>
                <span className="flex-1 text-center">Accent</span>
              </div>
            </div>
          </div>
        </div>
      </Card>
      
      <Card variant="elevated" className="rounded-lg border border-border shadow-sm">
        <div className="p-6">
          <h3 className="text-lg font-medium mb-4 flex items-center gap-2 text-foreground">
            <Type size={18} className="text-primary" />
            Typography
          </h3>
          
          <div className="space-y-4">
            <div>
              <Label htmlFor="heading-font" className="text-sm font-medium text-foreground">Heading Font</Label>
              <Select
                value={brandData.typography.headingFont}
                onValueChange={(value) => handleTypographyChange('headingFont', value)}
              >
                <SelectTrigger id="heading-font" className="mt-1.5 w-full bg-background border-input hover:bg-muted/50 transition-colors">
                  <SelectValue placeholder="Select heading font" />
                </SelectTrigger>
                <SelectContent className="bg-popover border border-border shadow-md rounded-md">
                  <SelectItem value="Inter" className="focus:bg-accent/20 cursor-pointer">Inter</SelectItem>
                  <SelectItem value="Roboto" className="focus:bg-accent/20 cursor-pointer">Roboto</SelectItem>
                  <SelectItem value="Montserrat" className="focus:bg-accent/20 cursor-pointer">Montserrat</SelectItem>
                  <SelectItem value="Playfair Display" className="focus:bg-accent/20 cursor-pointer">Playfair Display</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="body-font" className="text-sm font-medium text-foreground">Body Font</Label>
              <Select
                value={brandData.typography.bodyFont}
                onValueChange={(value) => handleTypographyChange('bodyFont', value)}
              >
                <SelectTrigger id="body-font" className="mt-1.5 w-full bg-background border-input hover:bg-muted/50 transition-colors">
                  <SelectValue placeholder="Select body font" />
                </SelectTrigger>
                <SelectContent className="bg-popover border border-border shadow-md rounded-md">
                  <SelectItem value="Inter" className="focus:bg-accent/20 cursor-pointer">Inter</SelectItem>
                  <SelectItem value="Roboto" className="focus:bg-accent/20 cursor-pointer">Roboto</SelectItem>
                  <SelectItem value="Open Sans" className="focus:bg-accent/20 cursor-pointer">Open Sans</SelectItem>
                  <SelectItem value="Source Sans Pro" className="focus:bg-accent/20 cursor-pointer">Source Sans Pro</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="type-scale" className="text-sm font-medium text-foreground">Type Scale</Label>
              <Select
                value={brandData.typography.scale?.toString()}
                onValueChange={(value) => handleTypographyChange('scale', value)}
              >
                <SelectTrigger id="type-scale" className="mt-1.5 w-full bg-background border-input hover:bg-muted/50 transition-colors">
                  <SelectValue placeholder="Select type scale" />
                </SelectTrigger>
                <SelectContent className="bg-popover border border-border shadow-md rounded-md">
                  <SelectItem value="1.067" className="focus:bg-accent/20 cursor-pointer">Minor Second (1.067)</SelectItem>
                  <SelectItem value="1.125" className="focus:bg-accent/20 cursor-pointer">Major Second (1.125)</SelectItem>
                  <SelectItem value="1.2" className="focus:bg-accent/20 cursor-pointer">Minor Third (1.2)</SelectItem>
                  <SelectItem value="1.25" className="focus:bg-accent/20 cursor-pointer">Major Third (1.25)</SelectItem>
                  <SelectItem value="1.333" className="focus:bg-accent/20 cursor-pointer">Perfect Fourth (1.333)</SelectItem>
                  <SelectItem value="1.5" className="focus:bg-accent/20 cursor-pointer">Perfect Fifth (1.5)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </Card>
      
      <Card variant="elevated" className="rounded-lg border border-border shadow-sm">
        <div className="p-6">
          <h3 className="text-lg font-medium mb-4 flex items-center gap-2 text-foreground">
            <Sliders size={18} className="text-primary" />
            Spacing & Radius
          </h3>
          
          <div className="space-y-4">
            <div>
              <Label htmlFor="base-unit" className="text-sm font-medium text-foreground">Base Unit (px)</Label>
              <Input
                id="base-unit"
                type="number"
                min={2}
                max={16}
                value={brandData.spacing?.baseUnit}
                onChange={(e) => handleSpacingChange('baseUnit', parseInt(e.target.value))}
                className="mt-1.5 w-full"
              />
            </div>
            
            <div>
              <Label htmlFor="spacing-density" className="text-sm font-medium text-foreground">Spacing Density</Label>
              <Select
                value={brandData.spacing?.density}
                onValueChange={(value: 'compact' | 'comfortable' | 'spacious') => handleSpacingChange('density', value)}
              >
                <SelectTrigger id="spacing-density" className="mt-1.5 w-full bg-background border-input hover:bg-muted/50 transition-colors">
                  <SelectValue placeholder="Select spacing density" />
                </SelectTrigger>
                <SelectContent className="bg-popover border border-border shadow-md rounded-md">
                  <SelectItem value="compact" className="focus:bg-accent/20 cursor-pointer">Compact</SelectItem>
                  <SelectItem value="comfortable" className="focus:bg-accent/20 cursor-pointer">Comfortable</SelectItem>
                  <SelectItem value="spacious" className="focus:bg-accent/20 cursor-pointer">Spacious</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </Card>
      
      {/* New Theme Preview Card */}
      <Card variant="elevated" className="rounded-lg border border-border shadow-sm">
        <div className="p-6">
          <h3 className="text-lg font-medium mb-4 flex items-center gap-2 text-foreground">
            <EyeIcon size={18} className="text-primary" />
            Theme Preview
          </h3>
          
          <ThemePreview />
        </div>
      </Card>
      
      <div className="flex gap-3 mt-6">
        <Button 
          variant="primary" 
          onClick={handleGenerateTheme} 
          className="flex-1 py-2.5 rounded-md font-medium hover:opacity-90 transition-opacity"
        >
          <RefreshCw size={16} className="mr-2" />
          Generate Theme
        </Button>
        
        <Button 
          variant="secondary" 
          onClick={handleApplyTheme}
          disabled={!generatedTheme}
          className="flex-1 py-2.5 rounded-md font-medium hover:opacity-90 transition-opacity disabled:opacity-50"
        >
          <CheckIcon size={16} className="mr-2" />
          Apply Theme
        </Button>
      </div>
    </div>
  );
}; 