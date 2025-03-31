import React, { useState } from 'react';
import {
  Button,
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from '../components/ui';

export const DesignSystemDocs = () => {
  const [activeTab, setActiveTab] = useState('colors');

  return (
    <div className="bg-background text-foreground min-h-screen">
      <header className="border-b border-border sticky top-0 z-10 bg-background">
        <div className="container mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold">Design System</h1>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="w-full mb-8 flex flex-wrap gap-2">
            <TabsTrigger value="colors">Colors</TabsTrigger>
            <TabsTrigger value="typography">Typography</TabsTrigger>
            <TabsTrigger value="components">Components</TabsTrigger>
            <TabsTrigger value="layout">Layout & Spacing</TabsTrigger>
          </TabsList>
          
          {/* Colors Tab */}
          <TabsContent value="colors" className="space-y-10">
            <section>
              <h2 className="text-xl font-semibold mb-6">Primary Colors</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
                {[50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950].map((shade) => (
                  <div key={`primary-${shade}`} className="space-y-2">
                    <div 
                      className="h-16 rounded-md"
                      style={{ backgroundColor: `var(--primary-${shade})` }}
                    />
                    <div className="text-sm">
                      <div className="font-medium">Primary {shade}</div>
                      <div className="text-muted-foreground">var(--primary-{shade})</div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold mb-6">UI Colors</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[
                  { name: 'Background', variable: '--background' },
                  { name: 'Foreground', variable: '--foreground' },
                  { name: 'Card', variable: '--card' },
                  { name: 'Card Foreground', variable: '--card-foreground' },
                  { name: 'Border', variable: '--border' },
                  { name: 'Input', variable: '--input' },
                  { name: 'Ring', variable: '--ring' },
                  { name: 'Muted', variable: '--muted' },
                  { name: 'Muted Foreground', variable: '--muted-foreground' },
                ].map((color) => (
                  <div key={color.variable} className="p-4 border border-border rounded-md flex items-center gap-3">
                    <div 
                      className="h-8 w-8 rounded-full border border-border"
                      style={{ backgroundColor: `var(${color.variable})` }}
                    />
                    <div>
                      <div className="font-medium">{color.name}</div>
                      <div className="text-sm text-muted-foreground">var({color.variable})</div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold mb-6">State Colors</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { name: 'Success', variable: '--success' },
                  { name: 'Warning', variable: '--warning' },
                  { name: 'Destructive', variable: '--destructive' },
                  { name: 'Info', variable: '--info' },
                ].map((color) => (
                  <Card key={color.variable}>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">{color.name}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div 
                          className="h-10 rounded-md"
                          style={{ backgroundColor: `var(${color.variable})` }}
                        />
                        <div className="text-xs font-mono text-muted-foreground">
                          var({color.variable})
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>
          </TabsContent>
          
          {/* Typography Tab */}
          <TabsContent value="typography" className="space-y-8">
            <section>
              <h2 className="text-xl font-semibold mb-6">Headings</h2>
              <div className="space-y-6 border border-border rounded-lg p-6">
                <div>
                  <h1 className="text-4xl font-bold">Heading 1</h1>
                  <div className="text-sm text-muted-foreground mt-1">text-4xl font-bold</div>
                </div>
                <div>
                  <h2 className="text-3xl font-bold">Heading 2</h2>
                  <div className="text-sm text-muted-foreground mt-1">text-3xl font-bold</div>
                </div>
                <div>
                  <h3 className="text-2xl font-semibold">Heading 3</h3>
                  <div className="text-sm text-muted-foreground mt-1">text-2xl font-semibold</div>
                </div>
                <div>
                  <h4 className="text-xl font-semibold">Heading 4</h4>
                  <div className="text-sm text-muted-foreground mt-1">text-xl font-semibold</div>
                </div>
              </div>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold mb-6">Body Text</h2>
              <div className="space-y-6 border border-border rounded-lg p-6">
                <div>
                  <p className="text-lg">Large Text: The quick brown fox jumps over the lazy dog.</p>
                  <div className="text-sm text-muted-foreground mt-1">text-lg</div>
                </div>
                <div>
                  <p>Regular Text: The quick brown fox jumps over the lazy dog.</p>
                  <div className="text-sm text-muted-foreground mt-1">Default body text</div>
                </div>
                <div>
                  <p className="text-sm">Small Text: The quick brown fox jumps over the lazy dog.</p>
                  <div className="text-sm text-muted-foreground mt-1">text-sm</div>
                </div>
                <div>
                  <p className="text-xs">Extra Small: The quick brown fox jumps over the lazy dog.</p>
                  <div className="text-sm text-muted-foreground mt-1">text-xs</div>
                </div>
              </div>
            </section>
          </TabsContent>
          
          {/* Components Tab */}
          <TabsContent value="components" className="space-y-10">
            <section>
              <h2 className="text-xl font-semibold mb-6">Buttons</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <Card>
                  <CardHeader>
                    <CardTitle>Button Variants</CardTitle>
                    <CardDescription>Different styles for different contexts</CardDescription>
                  </CardHeader>
                  <CardContent className="flex flex-wrap gap-3">
                    <Button>Default</Button>
                    <Button variant="secondary">Secondary</Button>
                    <Button variant="outline">Outline</Button>
                    <Button variant="ghost">Ghost</Button>
                    <Button variant="link">Link</Button>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Button Sizes</CardTitle>
                    <CardDescription>Sizing options for various uses</CardDescription>
                  </CardHeader>
                  <CardContent className="flex flex-wrap items-center gap-3">
                    <Button size="sm">Small</Button>
                    <Button>Default</Button>
                    <Button size="lg">Large</Button>
                  </CardContent>
                </Card>
              </div>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold mb-6">Cards</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Card Title</CardTitle>
                    <CardDescription>This is a basic card component with a header and content.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p>Cards are versatile containers that help group related information and actions.</p>
                  </CardContent>
                </Card>
                
                <Card className="border-primary">
                  <CardHeader className="pb-2">
                    <CardTitle>Featured Card</CardTitle>
                    <CardDescription>With primary border styling</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p>You can customize cards with different border colors and styles.</p>
                  </CardContent>
                </Card>
                
                <Card className="bg-muted">
                  <CardHeader className="pb-2">
                    <CardTitle>Muted Card</CardTitle>
                    <CardDescription>With background styling</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p>Apply background colors to create different card styles.</p>
                  </CardContent>
                </Card>
              </div>
            </section>
          </TabsContent>
          
          {/* Layout Tab */}
          <TabsContent value="layout" className="space-y-10">
            <section>
              <h2 className="text-xl font-semibold mb-6">Spacing Scale</h2>
              <div className="border border-border rounded-lg p-6 space-y-3">
                {[0, 1, 2, 3, 4, 5, 6, 8, 10, 12, 16, 20].map((size) => (
                  <div key={size} className="flex items-center">
                    <div className="w-16 text-sm">p-{size}</div>
                    <div 
                      className="h-6 bg-primary/20" 
                      style={{ width: `${size * 0.25}rem` }}
                    ></div>
                    <div className="ml-4 text-sm text-muted-foreground">{size * 0.25}rem</div>
                  </div>
                ))}
              </div>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold mb-6">Border Radius</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6">
                {['sm', 'md', 'lg', 'xl', '2xl'].map((size) => (
                  <div key={size} className="text-center">
                    <div 
                      className="h-16 w-16 bg-primary mx-auto mb-2"
                      style={{ borderRadius: `var(--radius-${size})` }}
                    ></div>
                    <div className="text-sm font-medium">radius-{size}</div>
                    <div className="text-xs text-muted-foreground">var(--radius-{size})</div>
                  </div>
                ))}
              </div>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold mb-6">Grid System</h2>
              <div className="space-y-6">
                <div>
                  <div className="text-sm font-medium mb-2">1 Column</div>
                  <div className="grid grid-cols-1 gap-4">
                    <div className="bg-muted p-4 text-center rounded-md">1</div>
                  </div>
                </div>
                
                <div>
                  <div className="text-sm font-medium mb-2">2 Columns</div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-muted p-4 text-center rounded-md">1</div>
                    <div className="bg-muted p-4 text-center rounded-md">2</div>
                  </div>
                </div>
                
                <div>
                  <div className="text-sm font-medium mb-2">3 Columns</div>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="bg-muted p-4 text-center rounded-md">1</div>
                    <div className="bg-muted p-4 text-center rounded-md">2</div>
                    <div className="bg-muted p-4 text-center rounded-md">3</div>
                  </div>
                </div>
                
                <div>
                  <div className="text-sm font-medium mb-2">4 Columns</div>
                  <div className="grid grid-cols-4 gap-4">
                    <div className="bg-muted p-4 text-center rounded-md">1</div>
                    <div className="bg-muted p-4 text-center rounded-md">2</div>
                    <div className="bg-muted p-4 text-center rounded-md">3</div>
                    <div className="bg-muted p-4 text-center rounded-md">4</div>
                  </div>
                </div>
              </div>
            </section>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}; 