import React from 'react';
import { cn, useUITheme } from '@/lib/ui';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from './Card';

/**
 * Component that demonstrates the contrast between
 * hardcoded values and theme variables
 */
export function ThemeTester() {
  const theme = useUITheme();
  
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-4">
      {/* BEFORE: Using hardcoded colors */}
      <div>
        <h3 className="text-xl font-bold mb-4 text-foreground">
          ❌ Before: Hardcoded Values
        </h3>
        
        <div className="bg-background rounded-lg border border-border shadow-sm">
          <div className="p-6 border-b border-border">
            <h4 className="text-lg font-medium text-foreground">
              Card with Hardcoded Colors
            </h4>
            <p className="text-muted-foreground mt-1">
              This component uses hardcoded colors that won't adapt to theme changes
            </p>
          </div>
          
          <div className="p-6">
            <div className="space-y-4">
              <div className="bg-primary text-primary-foreground p-4 rounded-md">
                Primary Button
              </div>
              <div className="bg-destructive text-destructive-foreground p-4 rounded-md">
                Destructive Button
              </div>
              <div className="bg-secondary text-secondary-foreground p-4 rounded-md">
                Secondary Button
              </div>
            </div>
          </div>
          
          <div className="p-6 border-t border-border text-muted-foreground text-sm">
            Using direct colors means maintaining two sets of styles for dark/light modes
          </div>
        </div>
      </div>
      
      {/* AFTER: Using theme variables */}
      <div>
        <h3 className="text-xl font-bold mb-4 text-foreground">
          ✅ After: Theme Variables
        </h3>
        
        <Card>
          <CardHeader>
            <CardTitle>Card with Theme Variables</CardTitle>
            <CardDescription>
              This component uses theme variables that adapt automatically
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            <div className="space-y-4">
              <div className="bg-primary text-primary-foreground p-4 rounded-md">
                Primary Button
              </div>
              <div className="bg-destructive text-destructive-foreground p-4 rounded-md">
                Destructive Button
              </div>
              <div className="bg-secondary text-secondary-foreground p-4 rounded-md">
                Secondary Button
              </div>
            </div>
          </CardContent>
          
          <CardFooter>
            <p className="text-muted-foreground text-sm">
              Using theme variables means styles adapt automatically to theme changes
            </p>
          </CardFooter>
        </Card>
      </div>
      
      {/* Theme controls */}
      <div className="lg:col-span-2">
        <Card>
          <CardHeader>
            <CardTitle>Theme Controls</CardTitle>
            <CardDescription>
              Test how the components above respond to theme changes
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            <div className="flex flex-wrap gap-4">
              <button
                onClick={theme.toggleMode}
                className="bg-primary text-primary-foreground px-4 py-2 rounded-md"
              >
                Toggle Theme Mode
              </button>
              
              <div className="flex items-center space-x-2">
                <span className="text-foreground">Current Mode:</span>
                <span className="font-bold text-foreground">{theme.mode}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 