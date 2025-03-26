import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../components/ui/Card';
import { Button } from '../components/ui/button';
import { ThemeToggle } from '../components/theme-toggle';

const HomePage = () => {
  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-40 border-b bg-background">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold">Workhorse</h1>
          </div>
          <div className="flex items-center gap-4">
            <nav className="hidden md:flex items-center space-x-4">
              <Link to="/" className="text-sm font-medium hover:text-primary">Home</Link>
              <Link to="/dashboard" className="text-sm font-medium hover:text-primary">Dashboard</Link>
              <Link to="/projects" className="text-sm font-medium hover:text-primary">Projects</Link>
              <Link to="/brands/demo" className="text-sm font-medium hover:text-primary">Brands</Link>
            </nav>
            <ThemeToggle />
          </div>
        </div>
      </header>
      
      <main className="container py-8">
        <div className="flex flex-col gap-4 text-center mb-12">
          <h1 className="text-4xl font-bold tracking-tight">Welcome to Workhorse</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Access your brand management dashboard, AI assistant, and project tools all in one place.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>AI Chat Dashboard</CardTitle>
              <CardDescription>
                Chat with your brand AI assistant and get insights for your projects
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                The AI Chat Dashboard provides real-time brand analysis, content suggestions, and market insights
                through a conversational interface.
              </p>
            </CardContent>
            <CardFooter>
              <Button asChild className="w-full">
                <Link to="/dashboard/ai">Open AI Dashboard</Link>
              </Button>
            </CardFooter>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Projects</CardTitle>
              <CardDescription>
                Manage and organize your creative projects
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Create, track, and collaborate on projects with team members and clients. Monitor progress
                and ensure deadlines are met.
              </p>
            </CardContent>
            <CardFooter>
              <Button asChild variant="outline" className="w-full">
                <Link to="/projects">View Projects</Link>
              </Button>
            </CardFooter>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Brand Management</CardTitle>
              <CardDescription>
                Create and manage brand identities
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Design, develop, and maintain consistent brand experiences across all touchpoints. Access brand
                guidelines, assets, and analytics.
              </p>
            </CardContent>
            <CardFooter>
              <Button asChild variant="outline" className="w-full">
                <Link to="/brands/demo">Explore Brands</Link>
              </Button>
            </CardFooter>
          </Card>
        </div>
      </main>
      
      <footer className="border-t bg-background">
        <div className="container py-6 text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} Workhorse. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default HomePage; 