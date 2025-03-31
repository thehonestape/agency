import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../components/ui/Card';
import { Button } from '../components/ui/button';

const HomePage = () => {
  return (
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