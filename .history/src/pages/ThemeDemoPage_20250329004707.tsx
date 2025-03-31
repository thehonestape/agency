import React from 'react';
import { ThemeTest } from '@/components/ui/ThemeTest';
import { ThemeTester } from '@/components/ui/ThemeTester';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/Select';
import { useTheme } from '@/lib/theme-context';

const ThemeDemoPage = () => {
  const { currentThemeId, setCurrentThemeId, availableThemes } = useTheme();

  const themeOptions = [
    { id: 'blue-light', name: 'Blue (Light)' },
    { id: 'blue-dark', name: 'Blue (Dark)' },
    { id: 'green-light', name: 'Green (Light)' },
    { id: 'green-dark', name: 'Green (Dark)' },
    { id: 'zinc-light', name: 'Zinc (Light)' },
    { id: 'zinc-dark', name: 'Zinc (Dark)' },
  ];

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">Theme Tester</h1>
      
      <div className="flex flex-col gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Current Theme: {currentThemeId}</CardTitle>
            <CardDescription>Switch between themes to test the styling</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4 mb-4">
              {themeOptions.map((theme) => (
                <Button
                  key={theme.id}
                  onClick={() => setCurrentThemeId(theme.id)}
                  variant={currentThemeId === theme.id ? 'default' : 'outline'}
                  className="justify-start"
                >
                  {theme.name}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Select Component Test</CardTitle>
            <CardDescription>Test the select component in different themes</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Basic Select</h3>
                <Select defaultValue="option1">
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select an option" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="option1">Option 1</SelectItem>
                    <SelectItem value="option2">Option 2</SelectItem>
                    <SelectItem value="option3">Option 3</SelectItem>
                    <SelectItem value="option4">Option 4</SelectItem>
                    <SelectItem value="option5">Option 5</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Theme Selector</h3>
                <Select 
                  value={currentThemeId}
                  onValueChange={(value) => setCurrentThemeId(value)}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a theme" />
                  </SelectTrigger>
                  <SelectContent>
                    {themeOptions.map((theme) => (
                      <SelectItem key={theme.id} value={theme.id}>
                        {theme.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline">Cancel</Button>
            <Button>Apply Theme</Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>UI Components in Current Theme</CardTitle>
            <CardDescription>See how different components look in this theme</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-4 border rounded-md bg-card text-card-foreground">
                <h3 className="text-lg font-medium mb-2">Card Background</h3>
                <p className="text-sm text-muted-foreground">This shows the card background color</p>
              </div>
              
              <div className="p-4 border rounded-md bg-primary text-primary-foreground">
                <h3 className="text-lg font-medium mb-2">Primary Color</h3>
                <p className="text-sm">This shows the primary color</p>
              </div>
              
              <div className="p-4 border rounded-md bg-secondary text-secondary-foreground">
                <h3 className="text-lg font-medium mb-2">Secondary Color</h3>
                <p className="text-sm">This shows the secondary color</p>
              </div>
              
              <div className="p-4 border rounded-md bg-muted text-muted-foreground">
                <h3 className="text-lg font-medium mb-2">Muted Color</h3>
                <p className="text-sm">This shows the muted color</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ThemeDemoPage; 