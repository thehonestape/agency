import React, { useState, useEffect } from 'react';
import { useTheme } from '@/lib/theme-context';
import { useBrand } from '@/components/brand/BrandProvider';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/Card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { generateThemeColors } from '@/lib/utils';
import RootLayout from '@/components/layouts/RootLayout';
import { ArrowLeft, Type, Palette, RefreshCw, Layers, MonitorSmartphone, Save, Undo, Grid, LayoutGrid, Sun, Moon } from 'lucide-react';
import { TypographyCard } from '@/components/theme/TypographyCard';
import { ColorCard } from '@/components/theme/ColorCard';
import { SpacingDensityCard } from '@/components/theme/SpacingDensityCard';
import { TypographyScaleCard } from '@/components/theme/TypographyScaleCard';
import { VisualRhythmPreview } from '@/components/theme/VisualRhythmPreview';
import { DevicePreview } from '@/components/theme/DevicePreview';
import { ThemeVisualizer } from '@/components/theme/ThemeVisualizer';
import { DynamicColorPalette } from '@/components/theme/DynamicColorPalette';
import { AccessibilityFeedback } from '@/components/theme/AccessibilityFeedback';
import { ThemeExport } from '@/components/theme/ThemeExport';

export default function ThemeEditorPage() {
  const { currentThemeId, setCurrentThemeId, currentTheme, availableThemes, isLoading } = useTheme();
  const { currentBrand } = useBrand();
  
  // Define state for theme properties
  const [primaryColor, setPrimaryColor] = useState("#00A9FF");
  const [backgroundColor, setBackgroundColor] = useState("#ffffff");
  const [fontSize, setFontSize] = useState(16);
  const [borderRadius, setBorderRadius] = useState(0.5);
  const [themeName, setThemeName] = useState('custom-theme');
  const [activeTab, setActiveTab] = useState('colors');
  const [themeApplied, setThemeApplied] = useState(false);
  const [showTransitions, setShowTransitions] = useState(true);
  const [transitionDuration, setTransitionDuration] = useState(300);
  const [showBaseline, setShowBaseline] = useState(false);
  // Typography state variables
  const [headingFont, setHeadingFont] = useState('Inter');
  const [bodyFont, setBodyFont] = useState('Inter');
  const [typeScale, setTypeScale] = useState('1.25');
  const [headingWeight, setHeadingWeight] = useState('700');
  const [baseLineHeight, setBaseLineHeight] = useState(1.5);
  // Spacing state variables
  const [baseUnit, setBaseUnit] = useState(4); // Tailwind default spacing unit (4px)
  const [spacingDensity, setSpacingDensity] = useState<'compact' | 'comfortable' | 'spacious'>('comfortable');
  
  // Load initial values from current brand if available
  useEffect(() => {
    if (currentBrand) {
      const primaryBrandColor = currentBrand.colors.find(c => c.isPrimary)?.value || '#00A9FF';
      setPrimaryColor(primaryBrandColor);
      
      // Background color could be derived from a secondary color or use a default white
      setBackgroundColor('#ffffff');
      
      if (currentBrand.typography?.baseFontSize) {
        const parsedSize = parseInt(currentBrand.typography.baseFontSize);
        if (!isNaN(parsedSize)) {
          setFontSize(parsedSize);
        }
      }
    }
  }, [currentBrand]);
  
  // Effect to update the preview in real-time
  useEffect(() => {
    // Find the preview container
    const previewEl = document.getElementById('theme-preview-container');
    if (!previewEl) return;

    // Generate a complete theme using the current primary and background colors
    const hslColor = hexToHSL(primaryColor);
    const themeColors = generateThemeColors({
      primary: hslColor,
      background: hexToHSL(backgroundColor)
    });
    
    // Apply theme colors directly to the preview container
    Object.entries(themeColors).forEach(([variable, value]) => {
      previewEl.style.setProperty(`--${variable}`, value);
    });

    // Update border radius
    previewEl.style.setProperty('--radius', `${borderRadius}rem`);
    
    // Ensure proper isolation for the preview container
    previewEl.style.isolation = 'isolate';
    
  }, [primaryColor, backgroundColor, fontSize, borderRadius]);
  
  // Function to generate theme and apply it
  const handleGenerateTheme = () => {
    // Parse the color to HSL for theme generation
    const hslColor = hexToHSL(primaryColor);
    
    // Generate theme colors
    const themeColors = generateThemeColors({
      primary: hslColor,
      background: hexToHSL(backgroundColor)
    });
    
    // Create CSS string for the theme
    const css = `
      :root {
        --primary: ${hslColor};
        --secondary: ${hslColor};
        --accent: ${hslColor};
        --background: ${hexToHSL(backgroundColor)};
        --foreground: ${themeColors['foreground']};
        --card: ${themeColors['card']};
        --card-foreground: ${themeColors['card-foreground']};
        --muted: ${themeColors['muted']};
        --muted-foreground: ${themeColors['muted-foreground']};
        --border: ${themeColors['border']};
        --input: ${themeColors['input']};
        --destructive: ${themeColors['destructive']};
        --destructive-foreground: ${themeColors['destructive-foreground']};
        --success: ${themeColors['success']};
        --success-foreground: ${themeColors['success-foreground']};
        --warning: ${themeColors['warning']};
        --warning-foreground: ${themeColors['warning-foreground']};
        --info: ${themeColors['info']};
        --info-foreground: ${themeColors['info-foreground']};
        --radius: ${borderRadius}rem;
      }
      
      .dark {
        --background: #18181b;
        --foreground: #fafafa;
        --card: #27272a;
        --card-foreground: #fafafa;
        --muted: #3f3f46;
        --muted-foreground: #a1a1aa;
        --border: #52525b;
        --input: #52525b;
      }
    `;
    
    // Apply the CSS directly to a style element
    const styleId = 'theme-editor-theme';
    let styleEl = document.getElementById(styleId) as HTMLStyleElement;
    
    if (!styleEl) {
      styleEl = document.createElement('style');
      styleEl.id = styleId;
      document.head.appendChild(styleEl);
    }
    
    styleEl.textContent = css;
    
    // Create a custom theme name
    const generatedThemeName = `custom-theme-${Date.now()}`;
    setThemeName(generatedThemeName);
    
    setThemeApplied(true);
    setTimeout(() => setThemeApplied(false), 2000);
  };
  
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

    // Convert to HSL string
    h = Math.round(h * 360);
    s = Math.round(s * 100);
    l = Math.round(l * 100);
    
    return `${h} ${s}% ${l}%`;
  };

  // Function to handle color change from color picker
  const handlePrimaryColorChange = (color: string) => {
    setPrimaryColor(color);
    
    // Apply the color changes immediately to the preview
    const previewEl = document.getElementById('theme-preview-container');
    if (previewEl) {
      const hslColor = hexToHSL(color);
      const themeColors = generateThemeColors({
        primary: hslColor,
        background: hexToHSL(backgroundColor)
      });
      
      // Apply all theme colors to the preview
      Object.entries(themeColors).forEach(([variable, value]) => {
        previewEl.style.setProperty(`--${variable}`, value);
      });
    }
  };
  
  // Add a visual loading indicator when theme is changing
  const ThemingIndicator = () => {
    if (isLoading) return null;
    
    return (
      <div className="fixed bottom-4 right-4 bg-primary text-primary-foreground px-4 py-2 rounded-md shadow-lg z-50 animate-pulse">
        Applying theme...
      </div>
    );
  };

  // Update transition duration
  const updateTransitionDuration = (duration: number) => {
    setTransitionDuration(duration);
    document.documentElement.style.setProperty('--theme-transition-duration', `${duration}ms`);
  };

  // Toggle transitions
  const toggleTransitions = () => {
    const newState = !showTransitions;
    setShowTransitions(newState);
    
    if (newState) {
      document.documentElement.style.removeProperty('--theme-transition-duration');
    } else {
      document.documentElement.style.setProperty('--theme-transition-duration', '0ms');
    }
  };

  // Toggle baseline grid
  const toggleBaseline = () => {
    setShowBaseline(!showBaseline);
  };

  return (
    <RootLayout>
      <div className="theme-editor-container bg-background text-foreground">
        <div className="flex flex-col lg:flex-row gap-6">
          
          {/* Left sidebar for theme controls */}
          <div className="w-full lg:w-64 shrink-0">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Palette className="w-5 h-5 mr-2" />
                      Theme Editor
                    </div>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      onClick={() => {
                        // Toggle between light/dark mode
                        document.documentElement.classList.toggle('dark');
                      }}
                      className="ml-auto h-8 w-8 rounded-full"
                    >
                      <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                      <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                      <span className="sr-only">Toggle theme</span>
                    </Button>
                  </div>
                </CardTitle>
                <CardDescription>
                  Customize your theme settings
                </CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <Tabs defaultValue={activeTab} onValueChange={setActiveTab}>
                  <TabsList className="w-full">
                    <TabsTrigger value="colors" className="flex-1">
                      <div className="flex items-center">
                        <Palette className="w-4 h-4 mr-2" />
                        <span className="hidden sm:inline">Colors</span>
                      </div>
                    </TabsTrigger>
                    <TabsTrigger value="typography" className="flex-1">
                      <div className="flex items-center">
                        <Type className="w-4 h-4 mr-2" />
                        <span className="hidden sm:inline">Type</span>
                      </div>
                    </TabsTrigger>
                    <TabsTrigger value="spacing" className="flex-1">
                      <div className="flex items-center">
                        <LayoutGrid className="w-4 h-4 mr-2" />
                        <span className="hidden sm:inline">Spacing</span>
                      </div>
                    </TabsTrigger>
                  </TabsList>
                </Tabs>
                
                <div className="p-4 space-y-8">
                  <ColorCard 
                    primaryColor={primaryColor} 
                    backgroundColor={backgroundColor}
                    onColorChange={handlePrimaryColorChange}
                    setBackgroundColor={setBackgroundColor}
                    borderRadius={borderRadius}
                    setBorderRadius={setBorderRadius}
                  />
                  
                  <DynamicColorPalette
                    primaryColor={primaryColor}
                    backgroundColor={backgroundColor}
                  />
                  
                  <AccessibilityFeedback
                    primaryColor={primaryColor}
                    backgroundColor={backgroundColor}
                  />
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Main preview area */}
          <div className="flex-1">
            <Card id="theme-preview-container">
              <CardHeader>
                <CardTitle>Preview</CardTitle>
                <CardDescription>
                  See your theme changes in real-time
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <h3 className="text-lg font-semibold">Buttons & Controls</h3>
                      <div className="flex flex-wrap gap-2">
                        <Button>Primary</Button>
                        <Button variant="secondary">Secondary</Button>
                        <Button variant="outline">Outline</Button>
                        <Button variant="ghost">Ghost</Button>
                        <Button variant="destructive">Delete</Button>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <h3 className="text-lg font-semibold">Typography</h3>
                      <div className="space-y-1">
                        <h1 className="text-2xl font-bold">Heading 1</h1>
                        <h2 className="text-xl font-semibold">Heading 2</h2>
                        <p className="text-base">Regular paragraph text</p>
                        <p className="text-sm text-muted-foreground">Small muted text</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-base">Card Title</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm">Card content example with text.</p>
                      </CardContent>
                      <CardFooter>
                        <Button size="sm" variant="outline" className="w-full">Action</Button>
                      </CardFooter>
                    </Card>
                    
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-base">Interactive</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-2">
                        <div className="space-y-1">
                          <Label htmlFor="name">Name</Label>
                          <Input id="name" placeholder="Enter name" />
                        </div>
                      </CardContent>
                      <CardFooter>
                        <Button size="sm" className="w-full">Submit</Button>
                      </CardFooter>
                    </Card>
                    
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-base">Toggle</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-2">
                        <div className="flex items-center justify-between">
                          <Label htmlFor="toggle">Toggle option</Label>
                          <Switch id="toggle" />
                        </div>
                      </CardContent>
                      <CardFooter>
                        <Button size="sm" variant="outline" className="w-full">Settings</Button>
                      </CardFooter>
                    </Card>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
        
        <ThemingIndicator />
      </div>
    </RootLayout>
  );
} 