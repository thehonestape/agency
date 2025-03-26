import React, { useState } from 'react';
import { Card, CardHeader, CardContent, CardTitle, CardDescription, CardFooter } from '@/components/ui/Card';
import { Button } from '@/components/ui/button';
import { Download, Copy, Code, FileJson, CheckCircle2, Save } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface ThemeExportProps {
  themeName: string;
  primaryColor: string;
  backgroundColor: string;
  borderRadius: number;
  fontSize: number;
  headingFont: string;
  bodyFont: string;
  typeScale: string;
  baseUnit: number;
  spacingDensity: 'compact' | 'comfortable' | 'spacious';
  onThemeNameChange: (name: string) => void;
  onSaveTheme: () => void;
}

export function ThemeExport({
  themeName,
  primaryColor,
  backgroundColor,
  borderRadius,
  fontSize,
  headingFont,
  bodyFont,
  typeScale,
  baseUnit,
  spacingDensity,
  onThemeNameChange,
  onSaveTheme
}: ThemeExportProps) {
  const [copied, setCopied] = useState(false);
  const [exportFormat, setExportFormat] = useState<'css' | 'json' | 'tailwind'>('css');
  
  // Helper to format theme variables for CSS
  const generateCSSVariables = () => {
    const densityMultiplier = spacingDensity === 'compact' ? 0.75 : spacingDensity === 'spacious' ? 1.5 : 1;
    
    return `:root {
  /* Colors */
  --primary: ${primaryColor};
  --background: ${backgroundColor};
  
  /* Typography */
  --font-size: ${fontSize}px;
  --heading-font: "${headingFont}", system-ui, sans-serif;
  --body-font: "${bodyFont}", system-ui, sans-serif;
  --type-scale: ${typeScale};
  
  /* Spacing */
  --spacing-base: ${baseUnit}px;
  --spacing-multiplier: ${densityMultiplier};
  
  /* Border */
  --radius: ${borderRadius}rem;
}

/* Apply base styles */
body {
  font-family: var(--body-font);
  font-size: var(--font-size);
  background-color: var(--background);
}

h1, h2, h3, h4, h5, h6 {
  font-family: var(--heading-font);
}
`;
  };
  
  // Helper to format theme as JSON
  const generateJSONTheme = () => {
    const densityMultiplier = spacingDensity === 'compact' ? 0.75 : spacingDensity === 'spacious' ? 1.5 : 1;
    
    const themeObj = {
      name: themeName,
      colors: {
        primary: primaryColor,
        background: backgroundColor
      },
      typography: {
        fontSize: `${fontSize}px`,
        headingFont,
        bodyFont,
        typeScale
      },
      spacing: {
        baseUnit: `${baseUnit}px`,
        densityMultiplier
      },
      borderRadius: `${borderRadius}rem`
    };
    
    return JSON.stringify(themeObj, null, 2);
  };
  
  // Helper to format theme as Tailwind config
  const generateTailwindConfig = () => {
    const densityMultiplier = spacingDensity === 'compact' ? 0.75 : spacingDensity === 'spacious' ? 1.5 : 1;
    
    return `// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: "${primaryColor}",
        background: "${backgroundColor}"
      },
      fontFamily: {
        heading: ["${headingFont}", "system-ui", "sans-serif"],
        body: ["${bodyFont}", "system-ui", "sans-serif"]
      },
      fontSize: {
        base: "${fontSize}px"
      },
      borderRadius: {
        DEFAULT: "${borderRadius}rem"
      },
      // Customized spacing with ${spacingDensity} density
      spacing: {
        // Base unit: ${baseUnit}px with ${spacingDensity} density multiplier (${densityMultiplier})
        // Add your spacing scale here based on your design system
      }
    }
  }
}`;
  };
  
  // Get the appropriate code based on selected format
  const getCode = () => {
    switch (exportFormat) {
      case 'json':
        return generateJSONTheme();
      case 'tailwind':
        return generateTailwindConfig();
      case 'css':
      default:
        return generateCSSVariables();
    }
  };
  
  // Copy code to clipboard
  const copyToClipboard = () => {
    navigator.clipboard.writeText(getCode());
    setCopied(true);
    
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };
  
  // Download theme file
  const downloadTheme = () => {
    const element = document.createElement('a');
    let content = getCode();
    let filename = `${themeName.toLowerCase().replace(/\s+/g, '-')}`;
    let mimeType = 'text/plain';
    
    switch (exportFormat) {
      case 'json':
        filename += '.json';
        mimeType = 'application/json';
        break;
      case 'tailwind':
        filename += '.tailwind.js';
        mimeType = 'application/javascript';
        break;
      case 'css':
      default:
        filename += '.css';
        mimeType = 'text/css';
        break;
    }
    
    const file = new Blob([content], { type: mimeType });
    element.href = URL.createObjectURL(file);
    element.download = filename;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <Card className="theme-export">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div className="flex items-center space-x-2">
          <div className="bg-primary/10 p-2 rounded-full">
            <Save className="h-4 w-4 text-primary" />
          </div>
          <div>
            <CardTitle>Save & Export</CardTitle>
            <CardDescription>Export your theme in different formats</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="theme-name">Theme Name</Label>
          <Input
            id="theme-name"
            value={themeName}
            onChange={(e) => onThemeNameChange(e.target.value)}
            placeholder="My Custom Theme"
          />
        </div>
        
        <Tabs defaultValue="css" className="w-full" onValueChange={(value) => setExportFormat(value as any)}>
          <TabsList className="grid grid-cols-3 mb-4">
            <TabsTrigger value="css" className="flex items-center gap-1">
              <Code className="h-3.5 w-3.5" />
              <span>CSS</span>
            </TabsTrigger>
            <TabsTrigger value="json" className="flex items-center gap-1">
              <FileJson className="h-3.5 w-3.5" />
              <span>JSON</span>
            </TabsTrigger>
            <TabsTrigger value="tailwind" className="flex items-center gap-1">
              <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12.001,4.8c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89,2.288,1.624 C13.666,10.618,15.027,12,18.001,12c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.624 C16.337,6.182,14.976,4.8,12.001,4.8z M6.001,12c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89,2.288,1.624 c1.177,1.194,2.538,2.576,5.512,2.576c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.624 C10.337,13.382,8.976,12,6.001,12z"/>
              </svg>
              <span>Tailwind</span>
            </TabsTrigger>
          </TabsList>
          
          <div className="relative">
            <pre className="p-4 rounded-md bg-muted font-mono text-sm overflow-x-auto max-h-64">
              <code>{getCode()}</code>
            </pre>
            <Button
              size="sm"
              variant="ghost"
              className="absolute top-2 right-2 h-8 w-8 p-0"
              onClick={copyToClipboard}
            >
              {copied ? <CheckCircle2 className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
            </Button>
          </div>
        </Tabs>
      </CardContent>
      <CardFooter className="flex justify-between pt-4 border-t">
        <Button
          variant="outline"
          className="flex items-center gap-2"
          onClick={downloadTheme}
        >
          <Download className="h-4 w-4" />
          <span>Download</span>
        </Button>
        <Button 
          onClick={onSaveTheme}
          className="flex items-center gap-2"
        >
          <Save className="h-4 w-4" />
          <span>Save Theme</span>
        </Button>
      </CardFooter>
    </Card>
  );
} 