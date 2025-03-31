import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/Card';
import { Button } from '../components/ui/button';
import { ScrollArea } from '../components/ui/scroll-area';
import { colorTokens } from '../components/ui/theme/tokens';

const ComponentDashboard = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="flex">
        {/* Left Sidebar */}
        <aside className="w-64 border-r bg-card">
          <div className="p-4">
            <h2 className="text-lg font-semibold">Components</h2>
            <nav className="mt-4 space-y-1">
              <Button variant="ghost" className="w-full justify-start">Typography</Button>
              <Button variant="ghost" className="w-full justify-start">Colors</Button>
              <Button variant="ghost" className="w-full justify-start">Layout</Button>
              <Button variant="ghost" className="w-full justify-start">Forms</Button>
              <Button variant="ghost" className="w-full justify-start">Feedback</Button>
              <Button variant="ghost" className="w-full justify-start">Navigation</Button>
            </nav>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8">
          <div className="grid grid-cols-2 gap-8">
            {/* Typography Section */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Typography</CardTitle>
                  <CardDescription>Text styles and hierarchy</CardDescription>
                </div>
                <Button variant="outline" size="sm">View All</Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h1 className="text-4xl font-bold">Heading 1</h1>
                    <p className="text-sm text-muted-foreground">text-4xl font-bold</p>
                  </div>
                  <div>
                    <h2 className="text-3xl font-semibold">Heading 2</h2>
                    <p className="text-sm text-muted-foreground">text-3xl font-semibold</p>
                  </div>
                  <div>
                    <h3 className="text-2xl font-medium">Heading 3</h3>
                    <p className="text-sm text-muted-foreground">text-2xl font-medium</p>
                  </div>
                  <div>
                    <p className="text-base">Body Text</p>
                    <p className="text-sm text-muted-foreground">text-base</p>
                  </div>
                  <div>
                    <p className="text-sm">Small Text</p>
                    <p className="text-sm text-muted-foreground">text-sm</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Color System Section */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Color System</CardTitle>
                  <CardDescription>HSL-based color tokens</CardDescription>
                </div>
                <Button variant="outline" size="sm">View All</Button>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[400px]">
                  <div className="space-y-6">
                    {/* Primary Colors */}
                    <div>
                      <h3 className="text-sm font-medium mb-2">Primary</h3>
                      <div className="grid grid-cols-5 gap-2">
                        {Object.entries(colorTokens.primary).map(([key, value]) => (
                          <div key={key} className="space-y-1">
                            <div 
                              className="w-full h-8 rounded-md"
                              style={{ backgroundColor: `hsl(${value.h} ${value.s}% ${value.l}%)` }}
                            />
                            <p className="text-xs text-muted-foreground">{key}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Neutral Colors */}
                    <div>
                      <h3 className="text-sm font-medium mb-2">Neutral</h3>
                      <div className="grid grid-cols-5 gap-2">
                        {Object.entries(colorTokens.neutral).map(([key, value]) => (
                          <div key={key} className="space-y-1">
                            <div 
                              className="w-full h-8 rounded-md"
                              style={{ backgroundColor: `hsl(${value.h} ${value.s}% ${value.l}%)` }}
                            />
                            <p className="text-xs text-muted-foreground">{key}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Status Colors */}
                    <div>
                      <h3 className="text-sm font-medium mb-2">Status</h3>
                      <div className="grid grid-cols-4 gap-2">
                        {Object.entries({
                          success: colorTokens.success[500],
                          error: colorTokens.error[500],
                          warning: colorTokens.warning[500],
                          info: colorTokens.info[500]
                        }).map(([key, value]) => (
                          <div key={key} className="space-y-1">
                            <div 
                              className="w-full h-8 rounded-md"
                              style={{ backgroundColor: `hsl(${value.h} ${value.s}% ${value.l}%)` }}
                            />
                            <p className="text-xs text-muted-foreground capitalize">{key}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
};

export default ComponentDashboard; 