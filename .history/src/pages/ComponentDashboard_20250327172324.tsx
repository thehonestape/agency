import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/Card';
import { Button } from '../components/ui/button';
import { ScrollArea } from '../components/ui/scroll-area';
import { colorTokens } from '../components/ui/theme/tokens';

const ComponentDashboard = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Left Sidebar */}
        <aside className="w-full md:w-64 shrink-0">
          <div className="sticky top-[80px]">
            <h2 className="text-lg font-semibold mb-4">Components</h2>
            <nav className="space-y-1">
              <Button variant="ghost" className="w-full justify-start">Typography</Button>
              <Button variant="ghost" className="w-full justify-start">Colors</Button>
              <Button variant="ghost" className="w-full justify-start">Layout</Button>
              <Button variant="ghost" className="w-full justify-start">Forms</Button>
              <Button variant="ghost" className="w-full justify-start">Feedback</Button>
              <Button variant="ghost" className="w-full justify-start">Navigation</Button>
            </nav>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 space-y-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight mb-2">Component Library</h1>
            <p className="text-lg text-muted-foreground">
              Explore our collection of semantic UI components
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Typography Card */}
            <Card>
              <CardHeader>
                <CardTitle>Typography</CardTitle>
                <CardDescription>Text styles and headings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h1 className="text-4xl font-bold">Heading 1</h1>
                  <p className="text-sm text-muted-foreground mt-1">text-4xl font-bold</p>
                </div>
                <div>
                  <h2 className="text-3xl font-semibold">Heading 2</h2>
                  <p className="text-sm text-muted-foreground mt-1">text-3xl font-semibold</p>
                </div>
                <div>
                  <h3 className="text-2xl font-medium">Heading 3</h3>
                  <p className="text-sm text-muted-foreground mt-1">text-2xl font-medium</p>
                </div>
                <div>
                  <p className="text-base">Body text</p>
                  <p className="text-sm text-muted-foreground mt-1">text-base</p>
                </div>
              </CardContent>
            </Card>

            {/* Color System Card */}
            <Card>
              <CardHeader>
                <CardTitle>Color System</CardTitle>
                <CardDescription>Theme colors and variants</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-medium mb-2">Primary Colors</h4>
                    <div className="grid grid-cols-5 gap-2">
                      <div className="h-10 rounded-md bg-primary" />
                      <div className="h-10 rounded-md bg-primary/80" />
                      <div className="h-10 rounded-md bg-primary/60" />
                      <div className="h-10 rounded-md bg-primary/40" />
                      <div className="h-10 rounded-md bg-primary/20" />
                    </div>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium mb-2">Neutral Colors</h4>
                    <div className="grid grid-cols-5 gap-2">
                      <div className="h-10 rounded-md bg-card" />
                      <div className="h-10 rounded-md bg-muted" />
                      <div className="h-10 rounded-md bg-border" />
                      <div className="h-10 rounded-md bg-foreground/20" />
                      <div className="h-10 rounded-md bg-foreground/10" />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
};

export default ComponentDashboard; 