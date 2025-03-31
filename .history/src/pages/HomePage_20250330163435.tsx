import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../components/ui/Card';
import { Button } from '../components/ui/button';
import { Separator } from '../components/ui/separator';

const HomePage = () => {
  return (
    <main className="py-8">
      <div className="container mx-auto px-4">
        {/* Typography Showcase */}
        <div className="mb-16 p-8 border rounded-lg bg-background/50 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-accent/5 z-0"></div>
          <div className="relative z-10">
            <h2 className="text-2xl font-medium text-primary mb-6">Typography Showcase</h2>
            <h1 className="text-5xl font-bold mb-4 tracking-tight">Maison Neue</h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl">
              Our brand typeface with comprehensive weights and styles for a distinctive, modern design language.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
              <div>
                <h3 className="text-lg font-medium mb-3 text-muted-foreground">Regular (400)</h3>
                <p className="font-sans text-xl font-normal">
                  The quick brown fox jumps over the lazy dog
                </p>
              </div>
              <div>
                <h3 className="text-lg font-medium mb-3 text-muted-foreground">Medium (500)</h3>
                <p className="font-sans text-xl font-medium">
                  The quick brown fox jumps over the lazy dog
                </p>
              </div>
              <div>
                <h3 className="text-lg font-medium mb-3 text-muted-foreground">Bold (700)</h3>
                <p className="font-sans text-xl font-bold">
                  The quick brown fox jumps over the lazy dog
                </p>
              </div>
            </div>
            
            <Separator className="my-8" />
            
            <div className="flex flex-col md:flex-row gap-8 items-start">
              <div className="flex-1">
                <h3 className="text-lg font-medium mb-3 text-muted-foreground">Mono Regular</h3>
                <p className="font-mono text-lg">
                  The quick brown fox jumps over the lazy dog 1234567890
                </p>
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-medium mb-3 text-muted-foreground">Italic Styles</h3>
                <p className="font-sans text-lg italic">
                  The quick brown fox jumps over the lazy dog
                </p>
              </div>
            </div>
            
            <div className="mt-8">
              <Button asChild>
                <Link to="/design-docs">View Typography Documentation</Link>
              </Button>
            </div>
          </div>
        </div>

        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold tracking-tight">Semantic Component System</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mt-4">
            A modern, accessible, and themeable component system built with React and Tailwind CSS.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Component Library</CardTitle>
              <CardDescription>
                Explore our collection of semantic UI components
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Browse through our comprehensive set of components, from basic primitives to complex patterns.
                Each component is built with accessibility and theming in mind.
              </p>
            </CardContent>
            <CardFooter>
              <Button asChild className="w-full">
                <Link to="/components">View Components</Link>
              </Button>
            </CardFooter>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Theme System</CardTitle>
              <CardDescription>
                Customize and manage your design system
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Create and manage themes with our HSL-based color system. Preview and switch between themes
                in real-time.
              </p>
            </CardContent>
            <CardFooter>
              <Button asChild variant="outline" className="w-full">
                <Link to="/theme">Theme Editor</Link>
              </Button>
            </CardFooter>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Design System</CardTitle>
              <CardDescription>
                Explore our design system documentation
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                View our comprehensive design system documentation, including typography, colors, spacing,
                and component guidelines.
              </p>
            </CardContent>
            <CardFooter>
              <Button asChild variant="outline" className="w-full">
                <Link to="/design-docs">View Design System</Link>
              </Button>
            </CardFooter>
          </Card>
        </div>

        <h2 className="text-2xl font-semibold mt-16 mb-6">View Switcher Demonstrations</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Simple View Switcher</CardTitle>
              <CardDescription>
                Basic view switching with tabs
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                A straightforward implementation of view switching using state management,
                perfect for simple applications that don't require complex routing.
              </p>
            </CardContent>
            <CardFooter>
              <Button asChild variant="outline" className="w-full">
                <Link to="/view-switcher">View Demo</Link>
              </Button>
            </CardFooter>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Advanced View Switcher</CardTitle>
              <CardDescription>
                Interactive view switcher component demo
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Explore different ways to switch between views with our configurable ViewSwitcher
                component. Tabs, buttons, and sidebar navigation options.
              </p>
            </CardContent>
            <CardFooter>
              <Button asChild variant="outline" className="w-full">
                <Link to="/view-switcher-demo">Try It Out</Link>
              </Button>
            </CardFooter>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Layout-Compatible Version</CardTitle>
              <CardDescription>
                Fits within existing navigation
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                A streamlined view switcher that integrates directly with your existing layouts
                without adding redundant navigation. Perfect for inserting anywhere in your app.
              </p>
            </CardContent>
            <CardFooter>
              <Button asChild variant="outline" className="w-full">
                <Link to="/simple-demo">View Demo</Link>
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </main>
  );
};

export default HomePage; 