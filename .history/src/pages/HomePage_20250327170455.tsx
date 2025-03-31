import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../components/ui/Card';
import { Button } from '../components/ui/button';
import { ThemeSwitcher } from '../components/ui/theme-switcher';

const HomePage = () => {
  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-40 border-b bg-background">
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold">Semantic UI</h1>
            </div>
            <div className="flex items-center gap-4">
              <nav className="hidden md:flex items-center space-x-4">
                <Link to="/" className="text-sm font-medium hover:text-primary">Home</Link>
                <Link to="/components" className="text-sm font-medium hover:text-primary">Components</Link>
                <Link to="/demo" className="text-sm font-medium hover:text-primary">Demo</Link>
                <Link to="/theme" className="text-sm font-medium hover:text-primary">Theme</Link>
              </nav>
              <ThemeSwitcher />
            </div>
          </div>
        </div>
      </header>
      
      <main className="py-8">
        <div className="container mx-auto px-4">
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
                <CardTitle>Interactive Demo</CardTitle>
                <CardDescription>
                  See components in action
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Experience our component system through interactive examples and live demos.
                  Test different variants and see how components adapt to different themes.
                </p>
              </CardContent>
              <CardFooter>
                <Button asChild variant="outline" className="w-full">
                  <Link to="/demo">View Demo</Link>
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </main>
      
      <footer className="border-t bg-background">
        <div className="container mx-auto px-4">
          <div className="py-6 text-center text-sm text-muted-foreground">
            <p>© {new Date().getFullYear()} Semantic UI. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage; 