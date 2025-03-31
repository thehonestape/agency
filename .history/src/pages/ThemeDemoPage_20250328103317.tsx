import React from 'react';
import { ThemeTest } from '@/components/ui/ThemeTest';
import { ThemeTester } from '@/components/ui/ThemeTester';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';

export default function ThemeDemoPage() {
  return (
    <div className="container mx-auto bg-background min-h-screen">
      <div className="py-8 px-4">
        <h1 className="text-3xl font-bold text-foreground mb-6">
          Tailwind CSS v4 Theme Demo
        </h1>
        <p className="text-foreground mb-8 max-w-3xl">
          This page demonstrates how our UI components use Tailwind CSS v4's CSS-first approach with
          theme variables for consistent styling. The components adapt automatically to theme changes
          without needing separate dark mode classes.
        </p>
        
        {/* Introduction Card */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Using Tailwind CSS v4 with Theme Variables</CardTitle>
            <CardDescription>
              A comprehensive approach for UI components
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 text-foreground">
              <p>
                Our approach combines the CSS-first configuration of Tailwind v4 with a robust theming system
                that uses CSS variables for flexible, maintainable styling.
              </p>
              
              <h3 className="text-lg font-semibold">Key Benefits:</h3>
              <ul className="list-disc pl-5 space-y-1">
                <li>Single source of truth for theme values</li>
                <li>Automatic dark mode support without duplicate classes</li>
                <li>Consistent styling across all components</li>
                <li>Type-safe theme variables with TypeScript</li>
                <li>Runtime theme customization with React hooks</li>
              </ul>
              
              <div className="rounded-md bg-muted p-3 text-sm">
                <p className="font-medium">Implementation Details:</p>
                <ol className="list-decimal pl-5 mt-2 space-y-1">
                  <li>CSS variables defined in <code className="bg-muted-foreground/20 rounded px-1">@theme</code> block</li>
                  <li>Custom utility classes in <code className="bg-muted-foreground/20 rounded px-1">@utilities</code> block</li>
                  <li>React hooks for theme interaction</li>
                  <li>Reusable theme variant patterns</li>
                </ol>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Before/After Comparison */}
        <h2 className="text-2xl font-bold text-foreground mb-4">Before/After Comparison</h2>
        <ThemeTester />
        
        <div className="h-16"></div>
        
        {/* Theme Variables Demo */}
        <h2 className="text-2xl font-bold text-foreground mb-4">Theme Variables Demo</h2>
        <ThemeTest />
      </div>
    </div>
  );
} 