import React, { useState } from 'react';
import { useTheme, ThemeProvider } from '../lib/theme-context';
import { Theme } from '../lib/theme-registry';
import { 
  Button, 
  Container, 
  Card, 
} from '../component-system';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { ArrowLeft, Type, Palette, Grid, Sun, Moon, Code, Layers, LayoutGrid, Save, Copy, Download } from 'lucide-react';
import { BrandThemeGenerator } from '../components/themes/generators/BrandThemeGenerator';
import { AppShell } from '../components/core/layout/AppShell';
import { SideNav } from '../components/patterns/navigation/SideNav';
import { TopBar } from '../components/patterns/navigation/TopBar';

// Helper to convert theme to CSS variables
const themeToCssVariables = (theme: Theme): string => {
  const variables = [
    `:root {`,
    `  --color-primary: ${theme.colors.primary};`,
    `  --color-secondary: ${theme.colors.secondary || '#6c757d'};`,
    `  --color-accent: ${theme.colors.accent || '#ff7b00'};`,
    `  --color-background: ${theme.colors.background};`,
    `  --color-text: ${theme.colors.text};`,
    `  --color-muted: ${theme.colors.muted};`,
    `  --color-border: ${theme.colors.border};`,
    `  --font-heading: ${theme.fonts.heading};`,
    `  --font-body: ${theme.fonts.body};`,
    `  --radius-sm: ${theme.radius.sm};`,
    `  --radius-md: ${theme.radius.md};`,
    `  --radius-lg: ${theme.radius.lg};`,
    `  --spacing-xxs: ${theme.spacing.xxs};`,
    `  --spacing-xs: ${theme.spacing.xs};`,
    `  --spacing-sm: ${theme.spacing.sm};`,
    `  --spacing-md: ${theme.spacing.md};`,
    `  --spacing-lg: ${theme.spacing.lg};`,
    `  --spacing-xl: ${theme.spacing.xl};`,
    `  --spacing-xxl: ${theme.spacing.xxl};`,
    `}`,
  ];
  
  return variables.join('\n');
};

const ThemePreview = ({ theme, colorMode = 'light' }: { theme: Theme, colorMode?: 'light' | 'dark' }) => {
  // Create a variant of the theme for dark mode preview if needed
  const previewTheme = colorMode === 'dark' ? 
    { 
      ...theme,
      colors: {
        ...theme.colors,
        background: '#1a1a1a',
        text: '#f5f5f5',
        muted: '#2a2a2a',
        border: '#333333'
      }
    } : theme;
    
  return (
    <Card variant="outlined">
      <div style={{ padding: '1.5rem' }}>
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          marginBottom: '1rem',
          alignItems: 'center'
        }}>
          <h3 style={{ fontWeight: 'bold' }}>Theme Preview</h3>
          <div style={{ display: 'flex', gap: '0.5rem' }}></div>
        </div>
        
        <div 
          id="theme-preview-container"
          style={{ 
            padding: '2rem', 
            border: '1px solid var(--color-border)', 
            borderRadius: 'var(--radius-md)',
            backgroundColor: previewTheme.colors.background,
            color: previewTheme.colors.text,
            position: 'relative',
            transition: 'all 0.2s ease-in-out',
          }}
        >
          <h1 style={{ 
            fontSize: '2.5rem', 
            marginBottom: '0.5rem',
            fontFamily: previewTheme.fonts.heading,
            fontWeight: 700,
            color: previewTheme.colors.primary
          }}>
            Heading Level 1
          </h1>
          <h2 style={{ 
            fontSize: '2rem', 
            marginBottom: '0.5rem',
            fontFamily: previewTheme.fonts.heading,
            fontWeight: 700,
          }}>
            Heading Level 2
          </h2>
          <h3 style={{ 
            fontSize: '1.5rem', 
            marginBottom: '1rem',
            fontFamily: previewTheme.fonts.heading,
            fontWeight: 700,
          }}>
            Heading Level 3
          </h3>
          
          <p style={{ 
            marginBottom: '1rem',
            fontSize: '1rem',
            fontFamily: previewTheme.fonts.body,
            lineHeight: 1.5,
          }}>
            This is a paragraph of text that demonstrates the body font settings. The quick brown fox jumps over the lazy dog.
          </p>
          
          <div style={{ 
            display: 'flex', 
            gap: '1rem', 
            marginBottom: '1.5rem',
            flexWrap: 'wrap'
          }}>
            <Button variant="primary">Primary Button</Button>
            <Button variant="secondary">Secondary Button</Button>
            <Button variant="outline">Outline Button</Button>
          </div>
          
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(2, 1fr)', 
            gap: '1rem',
            marginBottom: '1.5rem' 
          }}>
            <Card variant="default">
              <div style={{ padding: '1rem' }}>
                <h3 style={{ fontWeight: 'bold', marginBottom: '0.5rem' }}>Default Card</h3>
                <p style={{ fontSize: '0.875rem' }}>This is a default card with base styling.</p>
              </div>
            </Card>
            <Card variant="elevated">
              <div style={{ padding: '1rem' }}>
                <h3 style={{ fontWeight: 'bold', marginBottom: '0.5rem' }}>Elevated Card</h3>
                <p style={{ fontSize: '0.875rem' }}>This card has elevation and shadow.</p>
              </div>
            </Card>
          </div>
          
          <div style={{ 
            padding: '1rem', 
            backgroundColor: previewTheme.colors.muted,
            borderRadius: 'var(--radius-md)',
            fontSize: '0.875rem',
            color: previewTheme.colors.text
          }}>
            This is a muted container that shows the muted background color and text color.
          </div>
        </div>
      </div>
    </Card>
  );
};

const CodeViewer = ({ theme }: { theme: Theme }) => {
  const cssCode = themeToCssVariables(theme);
  
  const copyToClipboard = () => {
    navigator.clipboard.writeText(cssCode);
    // You could add a toast notification here
  };
  
  return (
    <Card variant="outlined">
      <div style={{ padding: '1.5rem' }}>
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          marginBottom: '1rem',
          alignItems: 'center'
        }}>
          <h3 style={{ fontWeight: 'bold' }}>CSS Variables</h3>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <Button variant="ghost" size="sm" onClick={copyToClipboard}>
              <Copy size={16} />
              <span style={{ marginLeft: '0.5rem' }}>Copy</span>
            </Button>
            <Button variant="ghost" size="sm">
              <Download size={16} />
              <span style={{ marginLeft: '0.5rem' }}>Download</span>
            </Button>
          </div>
        </div>
        
        <div style={{
          backgroundColor: '#1a1a1a',
          color: '#f5f5f5',
          padding: '1rem',
          borderRadius: 'var(--radius-md)',
          fontFamily: 'monospace',
          whiteSpace: 'pre',
          overflowX: 'auto',
          fontSize: '0.875rem',
          lineHeight: 1.6
        }}>
          {cssCode}
        </div>
      </div>
    </Card>
  );
};

const ModernThemeEditor = () => {
  const { currentTheme, setCurrentThemeId } = useTheme();
  const [previewTheme, setPreviewTheme] = useState<Theme | null>(null);
  const [activeTab, setActiveTab] = useState('brand');
  const [previewMode, setPreviewMode] = useState<'light' | 'dark'>('light');
  const [rightTab, setRightTab] = useState('preview');
  
  const handleThemeGenerated = (newTheme: Theme) => {
    setPreviewTheme(newTheme);
    setCurrentThemeId(newTheme.metadata.id);
  };
  
  const displayTheme = previewTheme || currentTheme;
  
  // Navigation items for the side nav
  const navItems = [
    { 
      label: 'Themes', 
      icon: <Palette size={18} />, 
      active: true,
      items: [
        { label: 'Theme Editor', href: '/modern-theme-editor', active: true },
        { label: 'Theme Library', href: '/theme-library' },
      ]
    },
    { 
      label: 'Components', 
      icon: <Layers size={18} />,
      items: [
        { label: 'Component Gallery', href: '/components' },
        { label: 'Feature Showcase', href: '/feature-showcase' },
      ]
    },
    { 
      label: 'Layouts', 
      icon: <LayoutGrid size={18} />,
      items: [
        { label: 'Page Layouts', href: '/layouts' },
        { label: 'Sections', href: '/sections' },
      ]
    },
  ];
  
  return (
    <ThemeProvider defaultThemeId="salient">
      <div className="min-h-screen bg-background">
        <AppShell forceLightMode={true}>
          <SideNav items={navItems} />
          <div className="flex flex-col flex-1 overflow-hidden">
            <TopBar title="Theme System" />
            
            <div className="flex-1 overflow-auto p-6">
              <div style={{ 
                display: 'flex', 
                alignItems: 'center',
                marginBottom: '2rem',
                gap: '1rem'
              }}>
                <Button variant="ghost" onClick={() => window.history.back()}>
                  <ArrowLeft size={16} />
                  <span style={{ marginLeft: '0.5rem' }}>Back</span>
                </Button>
                <h1 style={{ 
                  fontSize: '2rem', 
                  fontWeight: 'bold',
                  margin: 0
                }}>
                  Brand to Theme Generator
                </h1>
              </div>

              <div style={{ 
                display: 'grid', 
                gridTemplateColumns: '400px 1fr',
                gap: '2rem',
                alignItems: 'start'
              }}>
                {/* Left Sidebar */}
                <div>
                  <Tabs value={activeTab} onValueChange={setActiveTab}>
                    <TabsList className="grid w-full grid-cols-2">
                      <TabsTrigger value="brand">
                        <Palette size={16} />
                        <span className="ml-2">Brand</span>
                      </TabsTrigger>
                      <TabsTrigger value="advanced">
                        <Grid size={16} />
                        <span className="ml-2">Advanced</span>
                      </TabsTrigger>
                    </TabsList>

                    <TabsContent value="brand" className="mt-4">
                      <BrandThemeGenerator 
                        onThemeGenerated={handleThemeGenerated}
                      />
                    </TabsContent>

                    <TabsContent value="advanced" className="mt-4">
                      <Card variant="elevated">
                        <div style={{ padding: '1.5rem' }}>
                          <h3 style={{ fontWeight: 'bold', marginBottom: '1rem' }}>
                            Advanced Theme Settings
                          </h3>
                          <p>
                            This panel would include advanced theme configuration options
                            like component-specific overrides, CSS generation, etc.
                          </p>
                        </div>
                      </Card>
                    </TabsContent>
                  </Tabs>
                </div>
                
                {/* Right Preview */}
                <div>
                  <Tabs value={rightTab} onValueChange={setRightTab}>
                    <TabsList className="w-full flex justify-between mb-4">
                      <div className="flex">
                        <TabsTrigger value="preview" className="rounded-l-md rounded-r-none border-r-0">
                          <Layers size={16} />
                          <span className="ml-2">Preview</span>
                        </TabsTrigger>
                        <TabsTrigger value="code" className="rounded-l-none rounded-r-md border-l-0">
                          <Code size={16} />
                          <span className="ml-2">Code</span>
                        </TabsTrigger>
                      </div>
                      
                      <div className="flex border rounded-md">
                        <Button 
                          variant={previewMode === 'light' ? 'secondary' : 'ghost'} 
                          size="sm"
                          className="rounded-l-md rounded-r-none border-r"
                          onClick={() => setPreviewMode('light')}
                        >
                          <Sun size={16} />
                        </Button>
                        <Button 
                          variant={previewMode === 'dark' ? 'secondary' : 'ghost'} 
                          size="sm"
                          className="rounded-l-none rounded-r-md"
                          onClick={() => setPreviewMode('dark')}
                        >
                          <Moon size={16} />
                        </Button>
                      </div>
                    </TabsList>

                    <TabsContent value="preview">
                      <ThemePreview theme={displayTheme?.tokens} colorMode={previewMode} />
                    </TabsContent>

                    <TabsContent value="code">
                      <CodeViewer theme={displayTheme?.tokens} />
                    </TabsContent>
                  </Tabs>
                  
                  <div className="mt-6 flex justify-end">
                    <Button variant="outline" className="mr-2">
                      <Save size={16} className="mr-2" />
                      Save as Preset
                    </Button>
                    <Button variant="primary">
                      <Download size={16} className="mr-2" />
                      Export Theme
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </AppShell>
      </div>
    </ThemeProvider>
  );
};

export default ModernThemeEditor; 