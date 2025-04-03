import React from 'react';
import { Button } from '../components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/card';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '../components/ui/select';
import { useTheme } from '../lib/ThemeProvider';

const ThemeDemoPage = () => {
  const { theme, setTheme, isDark } = useTheme();
  const mode = theme.split('-')[1];
  
  // Function to set the mode while preserving the color palette
  const setMode = (newMode: 'light' | 'dark') => {
    const [colorPalette] = theme.split('-');
    setTheme(`${colorPalette}-${newMode}` as any);
  };
  
  // Toggle between light and dark mode
  const toggleMode = () => {
    const [colorPalette, currentMode] = theme.split('-');
    const newMode = currentMode === 'light' ? 'dark' : 'light';
    setTheme(`${colorPalette}-${newMode}` as any);
  };
  
  // Available themes
  const themeOptions = [
    { id: 'light', name: 'Light Mode' },
    { id: 'dark', name: 'Dark Mode' },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Theme Testing Page</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Current Theme</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="mb-4">
                <p>Current theme: <span className="font-bold">{theme}</span></p>
                <p>Dark mode: <span className="font-bold">{isDark ? 'Enabled' : 'Disabled'}</span></p>
              </div>
              
              <div className="flex flex-col gap-4">
                <div>
                  <p className="mb-2 font-medium">Dark Mode Toggle</p>
                  <Button variant="outline" onClick={toggleMode}>
                    Toggle Dark Mode
                  </Button>
                </div>
                
                <div>
                  <p className="mb-2 font-medium">Select Theme</p>
                  <Select value={mode} onValueChange={(value) => setMode(value as 'light' | 'dark')}>
                    <SelectTrigger className="w-full" data-theme-refreshable>
                      <SelectValue placeholder="Select theme" />
                    </SelectTrigger>
                    <SelectContent data-theme-refreshable>
                      {themeOptions.map((theme) => (
                        <SelectItem key={theme.id} value={theme.id}>
                          {theme.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="flex flex-wrap gap-2 mt-2">
                  {themeOptions.map((themeOption) => (
                    <Button
                      key={themeOption.id}
                      variant={mode === themeOption.id ? "default" : "outline"}
                      onClick={() => setMode(themeOption.id as 'light' | 'dark')}
                      className="text-xs"
                    >
                      {themeOption.name}
                    </Button>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Theme Sample Colors</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <ColorSample name="Background" colorClass="bg-background" />
                <ColorSample name="Foreground" colorClass="bg-foreground" />
                <ColorSample name="Primary" colorClass="bg-primary" />
                <ColorSample name="Secondary" colorClass="bg-secondary" />
                <ColorSample name="Accent" colorClass="bg-accent" />
                <ColorSample name="Muted" colorClass="bg-muted" />
                <ColorSample name="Card" colorClass="bg-card" />
                <ColorSample name="Border" colorClass="border-border border-4" />
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle>Component Examples</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="mb-2 font-medium">Buttons</p>
                <div className="flex flex-wrap gap-2">
                  <Button variant="default">Default</Button>
                  <Button variant="secondary">Secondary</Button>
                  <Button variant="outline">Outline</Button>
                  <Button variant="ghost">Ghost</Button>
                  <Button variant="destructive">Destructive</Button>
                </div>
              </div>
              
              <div>
                <p className="mb-2 font-medium">Select Component Test</p>
                <Select defaultValue="option1" data-theme-refreshable>
                  <SelectTrigger data-theme-refreshable>
                    <SelectValue placeholder="Select option" />
                  </SelectTrigger>
                  <SelectContent data-theme-refreshable>
                    <SelectItem value="option1">Option 1</SelectItem>
                    <SelectItem value="option2">Option 2</SelectItem>
                    <SelectItem value="option3">Option 3</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Dark Mode Specific Elements</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="p-4 rounded-lg border border-border">
                <p className="mb-4">These elements demonstrate dark: variant usage:</p>
                <div className="p-4 bg-white dark:bg-slate-800 rounded-lg mb-2">
                  <p className="text-black dark:text-white">This uses dark: variant directly</p>
                </div>
                <div className="p-4 bg-background rounded-lg">
                  <p className="text-foreground">This uses theme CSS variables</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

// Simple color sample component
const ColorSample = ({ name, colorClass }: { name: string; colorClass: string }) => {
  return (
    <div className="flex flex-col items-center">
      <div className={`w-12 h-12 rounded-full ${colorClass}`}></div>
      <p className="text-sm mt-1">{name}</p>
    </div>
  );
};

export default ThemeDemoPage; 