import React, { useState, useEffect } from 'react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  Button,
  Input,
} from '@/components/ui';
import { cn } from '@/lib/utils';

// Define initial theme values
const defaultTheme = {
  colors: {
    primary: '#0ea5e9',
    secondary: '#8b5cf6',
    accent: '#f59e0b',
    background: '#ffffff',
    foreground: '#0f172a',
    border: '#e2e8f0',
    muted: '#f1f5f9',
    'muted-foreground': '#64748b',
    destructive: '#ef4444',
    success: '#10b981'
  },
  fonts: {
    body: 'Inter, system-ui, sans-serif',
    heading: 'Inter, system-ui, sans-serif',
    mono: 'SFMono-Regular, Menlo, Monaco, Consolas, monospace'
  },
  fontSizes: {
    xs: '0.75rem',
    sm: '0.875rem',
    base: '1rem',
    lg: '1.125rem',
    xl: '1.25rem',
    '2xl': '1.5rem',
    '3xl': '1.875rem',
    '4xl': '2.25rem',
    '5xl': '3rem'
  },
  fontWeights: {
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
    extrabold: '800'
  },
  radii: {
    none: '0',
    sm: '0.125rem',
    DEFAULT: '0.25rem',
    md: '0.375rem',
    lg: '0.5rem',
    xl: '0.75rem',
    '2xl': '1rem',
    full: '9999px'
  },
  shadows: {
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    DEFAULT: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
    '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
    none: 'none'
  },
  spacing: {
    px: '1px',
    '0': '0',
    '0.5': '0.125rem',
    '1': '0.25rem',
    '1.5': '0.375rem',
    '2': '0.5rem',
    '2.5': '0.625rem',
    '3': '0.75rem',
    '3.5': '0.875rem',
    '4': '1rem',
    '5': '1.25rem',
    '6': '1.5rem',
    '8': '2rem',
    '10': '2.5rem',
    '12': '3rem',
    '16': '4rem',
    '20': '5rem',
    '24': '6rem',
    '32': '8rem',
    '40': '10rem',
    '48': '12rem',
    '64': '16rem',
    '80': '20rem',
  }
};

// Define the ColorPicker component
const ColorPicker = ({ label, value, onChange }: { label: string; value: string; onChange: (value: string) => void }) => {
  const inputId = `color-${label.toLowerCase().replace(/\s+/g, '-')}`;
  const textId = `color-text-${label.toLowerCase().replace(/\s+/g, '-')}`;
  
  return (
    <div className="flex items-center justify-between">
      <label className="text-sm font-medium" htmlFor={inputId}>{label}</label>
      <div className="flex items-center space-x-2">
        <div 
          className="w-6 h-6 rounded-full border" 
          style={{ backgroundColor: value }}
        />
        <input
          id={inputId}
          type="color"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-10 h-8"
          aria-label={`${label} color picker`}
          title={`${label} color picker`}
        />
        <input
          id={textId}
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-20 text-xs p-1 border rounded"
          aria-label={`${label} color hex value`}
          placeholder="Hex value"
        />
      </div>
    </div>
  );
};

// Define the SelectInput component
const SelectInput = ({ 
  label, 
  value, 
  options, 
  onChange 
}: { 
  label: string; 
  value: string; 
  options: string[]; 
  onChange: (value: string) => void 
}) => {
  const id = `select-${label.toLowerCase().replace(/\s+/g, '-')}`;
  
  return (
    <div className="flex items-center justify-between">
      <label className="text-sm font-medium" htmlFor={id}>{label}</label>
      <select
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="ml-2 text-sm p-1 border rounded"
        aria-label={`Select ${label}`}
        title={`Select ${label}`}
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

// Theme Editor Component
export function ThemeEditor() {
  const [theme, setTheme] = useState(defaultTheme);
  const [cssVariables, setCssVariables] = useState("");
  const [mode, setMode] = useState<'light' | 'dark'>('light');
  
  // Update CSS variables when theme changes
  useEffect(() => {
    let css = ":root {\n";
    
    // Add color variables
    Object.entries(theme.colors).forEach(([key, value]) => {
      css += `  --color-${key}: ${value};\n`;
    });
    
    // Add font variables
    Object.entries(theme.fonts).forEach(([key, value]) => {
      css += `  --font-${key}: ${value};\n`;
    });
    
    // Add font size variables
    Object.entries(theme.fontSizes).forEach(([key, value]) => {
      css += `  --font-size-${key}: ${value};\n`;
    });
    
    // Add font weight variables
    Object.entries(theme.fontWeights).forEach(([key, value]) => {
      css += `  --font-weight-${key}: ${value};\n`;
    });
    
    // Add radius variables
    Object.entries(theme.radii).forEach(([key, value]) => {
      css += `  --radius-${key}: ${value};\n`;
    });
    
    // Add shadow variables
    Object.entries(theme.shadows).forEach(([key, value]) => {
      css += `  --shadow-${key}: ${value};\n`;
    });
    
    // Add spacing variables
    Object.entries(theme.spacing).forEach(([key, value]) => {
      css += `  --spacing-${key}: ${value};\n`;
    });
    
    css += "}\n";
    
    setCssVariables(css);
  }, [theme]);
  
  // Update color
  const updateColor = (key: string, value: string) => {
    setTheme({
      ...theme,
      colors: {
        ...theme.colors,
        [key]: value
      }
    });
  };
  
  // Update font
  const updateFont = (key: string, value: string) => {
    setTheme({
      ...theme,
      fonts: {
        ...theme.fonts,
        [key]: value
      }
    });
  };
  
  // Update font size
  const updateFontSize = (key: string, value: string) => {
    setTheme({
      ...theme,
      fontSizes: {
        ...theme.fontSizes,
        [key]: value
      }
    });
  };
  
  // Update radius
  const updateRadius = (key: string, value: string) => {
    setTheme({
      ...theme,
      radii: {
        ...theme.radii,
        [key]: value
      }
    });
  };
  
  // Toggle theme mode
  const toggleMode = () => {
    if (mode === 'light') {
      setMode('dark');
      // Store light theme colors
      const lightColors = { ...theme.colors };
      // Set dark theme colors
      setTheme({
        ...theme,
        colors: {
          ...theme.colors,
          background: '#0f172a',
          foreground: '#f8fafc',
          muted: '#1e293b',
          'muted-foreground': '#94a3b8',
          border: '#1e293b'
        }
      });
    } else {
      setMode('light');
      // Reset to default colors
      setTheme({
        ...theme,
        colors: {
          ...defaultTheme.colors
        }
      });
    }
  };
  
  // Export theme
  const exportTheme = () => {
    const themeJson = JSON.stringify(theme, null, 2);
    const blob = new Blob([themeJson], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = 'theme.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };
  
  // Export CSS Variables
  const exportCssVariables = () => {
    const blob = new Blob([cssVariables], { type: 'text/css' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = 'theme-variables.css';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };
  
  return (
    <div className={cn("w-full max-w-6xl mx-auto py-8", mode === 'dark' ? 'bg-gray-900 text-white' : '')}>
      <div className="flex flex-col md:flex-row gap-8">
        {/* Controls Panel */}
        <div className="w-full md:w-1/3 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Theme Editor</CardTitle>
              <CardDescription>
                Customize your design tokens
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="colors" className="w-full">
                <TabsList className="grid grid-cols-4 mb-6">
                  <TabsTrigger value="colors">Colors</TabsTrigger>
                  <TabsTrigger value="typography">Typography</TabsTrigger>
                  <TabsTrigger value="spacing">Spacing</TabsTrigger>
                  <TabsTrigger value="effects">Effects</TabsTrigger>
                </TabsList>
                
                <TabsContent value="colors" className="space-y-4">
                  <h3 className="text-sm font-semibold mb-3">Brand Colors</h3>
                  <div className="space-y-3">
                    <ColorPicker
                      label="Primary"
                      value={theme.colors.primary}
                      onChange={(value) => updateColor('primary', value)}
                    />
                    <ColorPicker
                      label="Secondary"
                      value={theme.colors.secondary}
                      onChange={(value) => updateColor('secondary', value)}
                    />
                    <ColorPicker
                      label="Accent"
                      value={theme.colors.accent}
                      onChange={(value) => updateColor('accent', value)}
                    />
                  </div>
                  
                  <h3 className="text-sm font-semibold mt-6 mb-3">UI Colors</h3>
                  <div className="space-y-3">
                    <ColorPicker
                      label="Background"
                      value={theme.colors.background}
                      onChange={(value) => updateColor('background', value)}
                    />
                    <ColorPicker
                      label="Foreground"
                      value={theme.colors.foreground}
                      onChange={(value) => updateColor('foreground', value)}
                    />
                    <ColorPicker
                      label="Border"
                      value={theme.colors.border}
                      onChange={(value) => updateColor('border', value)}
                    />
                    <ColorPicker
                      label="Muted"
                      value={theme.colors.muted}
                      onChange={(value) => updateColor('muted', value)}
                    />
                    <ColorPicker
                      label="Muted Foreground"
                      value={theme.colors['muted-foreground']}
                      onChange={(value) => updateColor('muted-foreground', value)}
                    />
                  </div>
                  
                  <h3 className="text-sm font-semibold mt-6 mb-3">Feedback Colors</h3>
                  <div className="space-y-3">
                    <ColorPicker
                      label="Destructive"
                      value={theme.colors.destructive}
                      onChange={(value) => updateColor('destructive', value)}
                    />
                    <ColorPicker
                      label="Success"
                      value={theme.colors.success}
                      onChange={(value) => updateColor('success', value)}
                    />
                  </div>
                </TabsContent>
                
                <TabsContent value="typography" className="space-y-4">
                  <h3 className="text-sm font-semibold mb-3">Fonts</h3>
                  <div className="space-y-3">
                    <SelectInput
                      label="Body Font"
                      value={theme.fonts.body}
                      options={[
                        'Inter, system-ui, sans-serif',
                        'Roboto, system-ui, sans-serif',
                        'Open Sans, system-ui, sans-serif',
                        'Lato, system-ui, sans-serif',
                        'Poppins, system-ui, sans-serif',
                      ]}
                      onChange={(value) => updateFont('body', value)}
                    />
                    <SelectInput
                      label="Heading Font"
                      value={theme.fonts.heading}
                      options={[
                        'Inter, system-ui, sans-serif',
                        'Roboto, system-ui, sans-serif',
                        'Open Sans, system-ui, sans-serif',
                        'Montserrat, system-ui, sans-serif',
                        'Playfair Display, serif',
                      ]}
                      onChange={(value) => updateFont('heading', value)}
                    />
                    <SelectInput
                      label="Monospace Font"
                      value={theme.fonts.mono}
                      options={[
                        'SFMono-Regular, Menlo, Monaco, Consolas, monospace',
                        'Roboto Mono, monospace',
                        'Fira Code, monospace',
                        'JetBrains Mono, monospace',
                      ]}
                      onChange={(value) => updateFont('mono', value)}
                    />
                  </div>
                  
                  <h3 className="text-sm font-semibold mt-6 mb-3">Font Sizes</h3>
                  <div className="space-y-3">
                    {Object.entries(theme.fontSizes).map(([key, value]) => (
                      <div key={key} className="flex items-center justify-between">
                        <label className="text-sm font-medium">{key}</label>
                        <Input
                          type="text"
                          value={value}
                          onChange={(e) => updateFontSize(key, e.target.value)}
                          className="w-20 text-xs p-1"
                        />
                      </div>
                    ))}
                  </div>
                </TabsContent>
                
                <TabsContent value="spacing" className="space-y-4">
                  <h3 className="text-sm font-semibold mb-3">Border Radius</h3>
                  <div className="space-y-3">
                    {Object.entries(theme.radii).slice(0, 10).map(([key, value]) => (
                      <div key={key} className="flex items-center justify-between">
                        <div className="flex items-center">
                          <label className="text-sm font-medium mr-2">{key}</label>
                          <div 
                            className="w-8 h-8 border-2 border-border"
                            style={{ borderRadius: value }}
                          />
                        </div>
                        <Input
                          type="text"
                          value={value}
                          onChange={(e) => updateRadius(key, e.target.value)}
                          className="w-24 text-xs p-1"
                        />
                      </div>
                    ))}
                  </div>
                </TabsContent>
                
                <TabsContent value="effects" className="space-y-4">
                  <h3 className="text-sm font-semibold mb-3">Shadows</h3>
                  <div className="space-y-6">
                    {Object.entries(theme.shadows).slice(0, 5).map(([key, value]) => (
                      <div key={key} className="space-y-2">
                        <label className="text-sm font-medium">{key}</label>
                        <div 
                          className="h-16 bg-background border rounded-md w-full"
                          style={{ boxShadow: value }}
                        />
                      </div>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={toggleMode}>
                Toggle {mode === 'light' ? 'Dark' : 'Light'} Mode
              </Button>
              <div className="space-x-2">
                <Button variant="outline" onClick={exportCssVariables}>
                  Export CSS
                </Button>
                <Button onClick={exportTheme}>
                  Export Theme
                </Button>
              </div>
            </CardFooter>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>CSS Variables</CardTitle>
            </CardHeader>
            <CardContent>
              <pre className="text-xs bg-muted p-4 rounded-md overflow-auto max-h-96">
                {cssVariables}
              </pre>
            </CardContent>
          </Card>
        </div>
        
        {/* Preview Panel */}
        <div className="w-full md:w-2/3 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Theme Preview</CardTitle>
              <CardDescription>
                See your theme changes in real-time
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-10">
                {/* Typography Preview */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Typography</h3>
                  <div className="space-y-4">
                    <h1 style={{ 
                      fontFamily: theme.fonts.heading, 
                      color: theme.colors.foreground,
                      fontSize: theme.fontSizes['4xl'] 
                    }}>
                      Heading 1 - {theme.fontSizes['4xl']}
                    </h1>
                    <h2 style={{ 
                      fontFamily: theme.fonts.heading, 
                      color: theme.colors.foreground,
                      fontSize: theme.fontSizes['3xl'] 
                    }}>
                      Heading 2 - {theme.fontSizes['3xl']}
                    </h2>
                    <h3 style={{ 
                      fontFamily: theme.fonts.heading, 
                      color: theme.colors.foreground,
                      fontSize: theme.fontSizes['2xl'] 
                    }}>
                      Heading 3 - {theme.fontSizes['2xl']}
                    </h3>
                    <p style={{ 
                      fontFamily: theme.fonts.body, 
                      color: theme.colors.foreground,
                      fontSize: theme.fontSizes.base 
                    }}>
                      Body text - {theme.fontSizes.base}. This is a paragraph with standard text styling based on your theme settings.
                    </p>
                    <p style={{ 
                      fontFamily: theme.fonts.body, 
                      color: theme.colors['muted-foreground'],
                      fontSize: theme.fontSizes.sm 
                    }}>
                      Muted text - {theme.fontSizes.sm}. This is secondary text with muted styling.
                    </p>
                    <code style={{ 
                      fontFamily: theme.fonts.mono, 
                      fontSize: theme.fontSizes.sm,
                      backgroundColor: theme.colors.muted,
                      padding: theme.spacing['1'],
                      borderRadius: theme.radii.sm
                    }}>
                      Code text - {theme.fontSizes.sm}. Monospace font for code snippets.
                    </code>
                  </div>
                </div>
                
                {/* Color Swatches */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Colors</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    {Object.entries(theme.colors).map(([key, value]) => (
                      <div key={key} className="space-y-2">
                        <div 
                          className="h-16 rounded-md w-full"
                          style={{ backgroundColor: value }}
                        />
                        <p className="text-sm font-medium">{key}</p>
                        <p className="text-xs">{value}</p>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* UI Components Preview */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">UI Components</h3>
                  
                  <div className="space-y-6" style={{ 
                    '--primary': theme.colors.primary,
                    '--secondary': theme.colors.secondary,
                    '--accent': theme.colors.accent,
                    '--background': theme.colors.background,
                    '--foreground': theme.colors.foreground,
                    '--border': theme.colors.border,
                    '--muted': theme.colors.muted,
                    '--muted-foreground': theme.colors['muted-foreground'],
                    '--destructive': theme.colors.destructive,
                    '--radius': theme.radii.DEFAULT
                  } as React.CSSProperties}>
                    {/* Buttons */}
                    <div className="space-y-3">
                      <h4 className="text-base font-medium">Buttons</h4>
                      <div className="flex flex-wrap gap-3">
                        <button 
                          style={{
                            backgroundColor: theme.colors.primary,
                            color: '#ffffff',
                            borderRadius: theme.radii.DEFAULT,
                            padding: `${theme.spacing['2']} ${theme.spacing['4']}`,
                            fontWeight: theme.fontWeights.medium,
                            border: 'none'
                          }}
                        >
                          Primary Button
                        </button>
                        <button 
                          style={{
                            backgroundColor: theme.colors.secondary,
                            color: '#ffffff',
                            borderRadius: theme.radii.DEFAULT,
                            padding: `${theme.spacing['2']} ${theme.spacing['4']}`,
                            fontWeight: theme.fontWeights.medium,
                            border: 'none'
                          }}
                        >
                          Secondary Button
                        </button>
                        <button 
                          style={{
                            backgroundColor: 'transparent',
                            color: theme.colors.primary,
                            borderRadius: theme.radii.DEFAULT,
                            padding: `${theme.spacing['2']} ${theme.spacing['4']}`,
                            fontWeight: theme.fontWeights.medium,
                            border: `1px solid ${theme.colors.border}`
                          }}
                        >
                          Outline Button
                        </button>
                        <button 
                          style={{
                            backgroundColor: theme.colors.destructive,
                            color: '#ffffff',
                            borderRadius: theme.radii.DEFAULT,
                            padding: `${theme.spacing['2']} ${theme.spacing['4']}`,
                            fontWeight: theme.fontWeights.medium,
                            border: 'none'
                          }}
                        >
                          Destructive
                        </button>
                      </div>
                    </div>
                    
                    {/* Cards */}
                    <div className="space-y-3">
                      <h4 className="text-base font-medium">Cards</h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div style={{
                          backgroundColor: theme.colors.background,
                          borderRadius: theme.radii.lg,
                          border: `1px solid ${theme.colors.border}`,
                          padding: theme.spacing['6'],
                          boxShadow: theme.shadows.sm
                        }}>
                          <h3 style={{
                            fontFamily: theme.fonts.heading,
                            fontSize: theme.fontSizes.xl,
                            fontWeight: theme.fontWeights.semibold,
                            marginBottom: theme.spacing['2']
                          }}>
                            Card Title
                          </h3>
                          <p style={{
                            color: theme.colors['muted-foreground'],
                            marginBottom: theme.spacing['4'],
                            fontSize: theme.fontSizes.sm
                          }}>
                            Card description goes here
                          </p>
                          <p style={{
                            fontSize: theme.fontSizes.base,
                            marginBottom: theme.spacing['4']
                          }}>
                            This is a card component styled with your custom theme values.
                          </p>
                        </div>
                        
                        <div style={{
                          backgroundColor: theme.colors.primary,
                          borderRadius: theme.radii.lg,
                          border: 'none',
                          padding: theme.spacing['6'],
                          boxShadow: theme.shadows.md,
                          color: '#ffffff'
                        }}>
                          <h3 style={{
                            fontFamily: theme.fonts.heading,
                            fontSize: theme.fontSizes.xl,
                            fontWeight: theme.fontWeights.semibold,
                            marginBottom: theme.spacing['2']
                          }}>
                            Primary Card
                          </h3>
                          <p style={{
                            opacity: 0.8,
                            marginBottom: theme.spacing['4'],
                            fontSize: theme.fontSizes.sm
                          }}>
                            Card with primary background
                          </p>
                          <p style={{
                            fontSize: theme.fontSizes.base,
                            marginBottom: theme.spacing['4']
                          }}>
                            This card uses your primary color as the background.
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    {/* Form Elements */}
                    <div className="space-y-3">
                      <h4 className="text-base font-medium">Form Elements</h4>
                      <div className="space-y-4">
                        <div>
                          <label style={{
                            display: 'block',
                            marginBottom: theme.spacing['2'],
                            fontSize: theme.fontSizes.sm,
                            fontWeight: theme.fontWeights.medium
                          }}>
                            Text Input
                          </label>
                          <input 
                            type="text" 
                            placeholder="Enter your name"
                            style={{
                              width: '100%',
                              padding: theme.spacing['2'],
                              borderRadius: theme.radii.DEFAULT,
                              border: `1px solid ${theme.colors.border}`,
                              fontSize: theme.fontSizes.base,
                              backgroundColor: theme.colors.background,
                              color: theme.colors.foreground
                            }}
                          />
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <input 
                            type="checkbox" 
                            id="checkbox-example"
                            style={{
                              width: theme.spacing['4'],
                              height: theme.spacing['4'],
                              borderRadius: theme.radii.sm,
                              border: `1px solid ${theme.colors.border}`,
                              accentColor: theme.colors.primary
                            }}
                          />
                          <label 
                            htmlFor="checkbox-example"
                            style={{
                              fontSize: theme.fontSizes.sm,
                            }}
                          >
                            Remember me
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default ThemeEditor; 