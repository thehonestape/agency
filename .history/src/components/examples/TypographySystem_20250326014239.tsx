import React, { useState } from 'react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  Button,
} from '@/components/ui';
import { cn } from '@/lib/utils';

export function TypographySystem() {
  const [mode, setMode] = useState<'light' | 'dark'>('light');
  const [contentType, setContentType] = useState('general');
  
  const toggleMode = () => {
    setMode(mode === 'light' ? 'dark' : 'light');
  };
  
  return (
    <div className={cn("w-full max-w-4xl mx-auto space-y-8", mode === 'dark' ? 'bg-black text-white p-8 rounded-lg' : '')}>
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Typography System</h1>
        <Button onClick={toggleMode} variant="outline">
          Toggle {mode === 'light' ? 'Dark' : 'Light'} Mode
        </Button>
      </div>
      
      <Tabs defaultValue="scale" className="w-full">
        <TabsList className="grid grid-cols-4 mb-8">
          <TabsTrigger value="scale">Type Scale</TabsTrigger>
          <TabsTrigger value="patterns">Text Patterns</TabsTrigger>
          <TabsTrigger value="responsive">Responsive Type</TabsTrigger>
          <TabsTrigger value="guidelines">Guidelines</TabsTrigger>
        </TabsList>
        
        <TabsContent value="scale" className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Headings</CardTitle>
              <CardDescription>
                Standard heading styles from h1 to h6.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-8">
              <div className="space-y-4">
                <div className="space-y-2">
                  <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
                    Heading 1
                  </h1>
                  <div className="text-sm text-muted-foreground">
                    Font size: 3rem (48px) / Line height: 1.1 / Font weight: 800
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Usage: Main page headings, hero sections
                  </div>
                </div>
                
                <div className="space-y-2">
                  <h2 className="scroll-m-20 text-3xl font-semibold tracking-tight transition-colors">
                    Heading 2
                  </h2>
                  <div className="text-sm text-muted-foreground">
                    Font size: 2.25rem (36px) / Line height: 1.2 / Font weight: 600
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Usage: Section headings, card titles on large cards
                  </div>
                </div>
                
                <div className="space-y-2">
                  <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
                    Heading 3
                  </h3>
                  <div className="text-sm text-muted-foreground">
                    Font size: 1.5rem (24px) / Line height: 1.3 / Font weight: 600
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Usage: Subsection headings, modal titles
                  </div>
                </div>
                
                <div className="space-y-2">
                  <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
                    Heading 4
                  </h4>
                  <div className="text-sm text-muted-foreground">
                    Font size: 1.25rem (20px) / Line height: 1.4 / Font weight: 600
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Usage: Card titles, form section headings
                  </div>
                </div>
                
                <div className="space-y-2">
                  <h5 className="scroll-m-20 text-lg font-semibold tracking-tight">
                    Heading 5
                  </h5>
                  <div className="text-sm text-muted-foreground">
                    Font size: 1.125rem (18px) / Line height: 1.5 / Font weight: 600
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Usage: Small section titles, group labels
                  </div>
                </div>
                
                <div className="space-y-2">
                  <h6 className="scroll-m-20 text-base font-semibold tracking-tight">
                    Heading 6
                  </h6>
                  <div className="text-sm text-muted-foreground">
                    Font size: 1rem (16px) / Line height: 1.5 / Font weight: 600
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Usage: Minor headings, table headings
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Body Text</CardTitle>
              <CardDescription>
                Body text styles for various contexts.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-8">
              <div className="space-y-4">
                <div className="space-y-2">
                  <p className="text-xl leading-7">
                    Large Body Text. Used for introductory paragraphs, important information, or high-visibility content areas. This size provides emphasis without using a heading.
                  </p>
                  <div className="text-sm text-muted-foreground">
                    Font size: 1.25rem (20px) / Line height: 1.75 / Font weight: 400
                  </div>
                </div>
                
                <div className="space-y-2">
                  <p className="leading-7 [&:not(:first-child)]:mt-6">
                    Standard Body Text. This is the default paragraph style used throughout the application. It provides optimal readability for blocks of content with a balanced line height and comfortable font size.
                  </p>
                  <div className="text-sm text-muted-foreground">
                    Font size: 1rem (16px) / Line height: 1.75 / Font weight: 400
                  </div>
                </div>
                
                <div className="space-y-2">
                  <p className="text-sm leading-6 text-muted-foreground">
                    Small Body Text. Used for supporting information, captions, helper text, and other secondary content. The reduced size helps establish visual hierarchy without sacrificing readability.
                  </p>
                  <div className="text-sm text-muted-foreground">
                    Font size: 0.875rem (14px) / Line height: 1.5 / Font weight: 400
                  </div>
                </div>
                
                <div className="space-y-2">
                  <p className="text-xs leading-5 text-muted-foreground">
                    Micro Text. Used for legal information, credits, footnotes, and other minimal content. Should be used sparingly to avoid readability issues.
                  </p>
                  <div className="text-sm text-muted-foreground">
                    Font size: 0.75rem (12px) / Line height: 1.5 / Font weight: 400
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Special Text Styles</CardTitle>
              <CardDescription>
                Specialized text styles for specific purposes.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-8">
              <div className="space-y-6">
                <div className="space-y-2">
                  <p className="text-4xl font-bold tracking-tight">Display Text</p>
                  <div className="text-sm text-muted-foreground">
                    Font size: 2.5rem (40px) / Line height: 1.1 / Font weight: 700
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Usage: Hero sections, landing pages, large statistics
                  </div>
                </div>
                
                <div className="space-y-2">
                  <p className="text-xl font-semibold">Lead Paragraph</p>
                  <div className="text-sm text-muted-foreground">
                    Font size: 1.25rem (20px) / Line height: 1.6 / Font weight: 500
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Usage: Introductory text, article summaries
                  </div>
                </div>
                
                <div className="space-y-2">
                  <p className="text-sm font-medium text-muted-foreground uppercase tracking-widest">Small Caps</p>
                  <div className="text-sm text-muted-foreground">
                    Font size: 0.875rem (14px) / Letter spacing: 0.05em / Text transform: uppercase
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Usage: Labels, categories, section markers
                  </div>
                </div>
                
                <div className="space-y-2">
                  <p className="font-mono text-sm">Monospace Text</p>
                  <div className="text-sm text-muted-foreground">
                    Font family: Monospace / Font size: 0.875rem (14px)
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Usage: Code snippets, technical information, data
                  </div>
                </div>
                
                <div className="space-y-2">
                  <blockquote className="border-l-2 pl-6 italic">
                    Blockquote style for quoted content, testimonials, or highlighted excerpts
                  </blockquote>
                  <div className="text-sm text-muted-foreground">
                    Border left: 2px / Padding left: 1.5rem / Font style: italic
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="patterns" className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Content Patterns</CardTitle>
              <CardDescription>
                Common typographic patterns used throughout the application.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-12">
                <div className="space-y-6">
                  <h3 className="text-xl font-semibold">Header with Supporting Text</h3>
                  
                  <div className="space-y-2 border p-4 rounded-md">
                    <h2 className="text-3xl font-bold">Product Features</h2>
                    <p className="text-muted-foreground">Discover what makes our platform unique</p>
                  </div>
                  
                  <div className="space-y-2 border p-4 rounded-md">
                    <h3 className="text-2xl font-semibold">Team Members</h3>
                    <p className="text-sm text-muted-foreground">Meet the experts behind our success</p>
                  </div>
                  
                  <div className="space-y-2 border p-4 rounded-md">
                    <h4 className="text-xl font-medium">Pricing Plans</h4>
                    <p className="text-sm text-muted-foreground">Flexible options for businesses of all sizes</p>
                  </div>
                </div>
                
                <div className="space-y-6">
                  <h3 className="text-xl font-semibold">Card Content Pattern</h3>
                  
                  <div className="border p-6 rounded-lg space-y-4">
                    <h3 className="text-xl font-semibold">Analytics Dashboard</h3>
                    <p>Get a comprehensive view of your business performance with real-time analytics and customizable reports.</p>
                    <div className="text-sm text-muted-foreground">
                      Last updated: 2 days ago
                    </div>
                  </div>
                </div>
                
                <div className="space-y-6">
                  <h3 className="text-xl font-semibold">Form Label Patterns</h3>
                  
                  <div className="space-y-4 border p-4 rounded-md">
                    <div className="space-y-2">
                      <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                        Email Address
                      </label>
                      <input className="border p-2 rounded w-full" />
                      <p className="text-xs text-muted-foreground">
                        We'll never share your email with anyone else.
                      </p>
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                        Password
                      </label>
                      <input type="password" className="border p-2 rounded w-full" />
                      <p className="text-xs text-muted-foreground">
                        Must be at least 8 characters long.
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-6">
                  <h3 className="text-xl font-semibold">List Patterns</h3>
                  
                  <div className="space-y-4 border p-4 rounded-md">
                    <h4 className="text-lg font-medium">Features List</h4>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Real-time collaboration</li>
                      <li>Unlimited storage</li>
                      <li>Priority support</li>
                      <li>Custom integrations</li>
                    </ul>
                  </div>
                  
                  <div className="space-y-4 border p-4 rounded-md">
                    <h4 className="text-lg font-medium">Steps to Complete</h4>
                    <ol className="list-decimal pl-6 space-y-2">
                      <li>Create your account</li>
                      <li>Set up your profile</li>
                      <li>Connect integrations</li>
                      <li>Invite team members</li>
                    </ol>
                  </div>
                  
                  <div className="space-y-4 border p-4 rounded-md">
                    <h4 className="text-lg font-medium">Definition List</h4>
                    <dl className="space-y-4">
                      <div>
                        <dt className="font-medium">API</dt>
                        <dd className="text-muted-foreground">Application Programming Interface</dd>
                      </div>
                      <div>
                        <dt className="font-medium">CSS</dt>
                        <dd className="text-muted-foreground">Cascading Style Sheets</dd>
                      </div>
                      <div>
                        <dt className="font-medium">HTML</dt>
                        <dd className="text-muted-foreground">HyperText Markup Language</dd>
                      </div>
                    </dl>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="responsive" className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Responsive Typography</CardTitle>
              <CardDescription>
                How typography adapts to different screen sizes.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-12">
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold">Fluid Headings</h3>
                  <p className="text-muted-foreground">Headings scale based on viewport width</p>
                  
                  <div className="space-y-4 border p-4 rounded-md">
                    <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold">
                      Responsive Heading
                    </h1>
                    <div className="text-sm text-muted-foreground">
                      <p>Mobile: 1.5rem (24px)</p>
                      <p>Tablet: 1.875rem (30px)</p>
                      <p>Laptop: 2.25rem (36px)</p>
                      <p>Desktop: 3rem (48px)</p>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold">Mobile Optimizations</h3>
                  <p className="text-muted-foreground">Adjustments for better readability on small screens</p>
                  
                  <div className="space-y-4 border p-4 rounded-md">
                    <div className="md:columns-2 gap-8 space-y-4 md:space-y-0">
                      <div>
                        <h4 className="text-base font-medium mb-2">Mobile View</h4>
                        <p className="text-sm leading-relaxed">
                          On mobile devices, we increase line height slightly and reduce paragraph margins
                          to improve readability and optimize screen space. Text is typically single column.
                        </p>
                      </div>
                      <div>
                        <h4 className="text-base font-medium mb-2">Desktop View</h4>
                        <p className="text-base leading-normal">
                          On larger screens, we can use larger font sizes, more comfortable line heights, 
                          and multi-column layouts for certain content.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold">Breakpoint Typography</h3>
                  <p className="text-muted-foreground">Examples of text at different breakpoints</p>
                  
                  <div className="space-y-8 border p-6 rounded-md">
                    <div>
                      <h4 className="text-lg font-medium mb-2">Headings</h4>
                      <div className="space-y-4">
                        <div>
                          <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold">Heading 1</h1>
                          <p className="text-sm text-muted-foreground">Scales from 1.25rem to 2.25rem</p>
                        </div>
                        <div>
                          <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold">Heading 2</h2>
                          <p className="text-sm text-muted-foreground">Scales from 1.125rem to 1.875rem</p>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="text-lg font-medium mb-2">Body Text</h4>
                      <div className="space-y-4">
                        <div>
                          <p className="text-sm md:text-base lg:text-lg">
                            This paragraph scales from small on mobile to larger on desktop.
                          </p>
                          <p className="text-sm text-muted-foreground">Scales from 0.875rem to 1.125rem</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="guidelines" className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Typography Guidelines</CardTitle>
              <CardDescription>
                Best practices for using typography in the application.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold">Hierarchy</h3>
                  <p>
                    Establish a clear visual hierarchy with typography to guide users through content.
                    Use appropriate heading levels (h1-h6) semantically.
                  </p>
                  
                  <div className="border p-6 rounded-md space-y-6">
                    <div>
                      <h4 className="text-lg font-medium">Do</h4>
                      <div className="mt-3 p-4 bg-green-50 dark:bg-green-900/20 rounded">
                        <h1 className="text-2xl font-bold">Page Title</h1>
                        <h2 className="text-xl font-semibold mt-4">Section Heading</h2>
                        <h3 className="text-lg font-medium mt-3">Subsection Title</h3>
                        <p className="mt-2">Content paragraph with regular text.</p>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="text-lg font-medium">Don't</h4>
                      <div className="mt-3 p-4 bg-red-50 dark:bg-red-900/20 rounded">
                        <h3 className="text-xl font-bold">Page Title</h3>
                        <h5 className="text-lg font-semibold mt-4">Section Heading</h5>
                        <h2 className="text-base font-medium mt-3">Subsection Title</h2>
                        <p className="mt-2">Content paragraph with regular text.</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold">Accessibility</h3>
                  <p>
                    Ensure typography meets accessibility standards for readability and contrast.
                  </p>
                  
                  <div className="border p-6 rounded-md space-y-6">
                    <div>
                      <h4 className="text-lg font-medium">Text Contrast</h4>
                      <p className="mt-2">
                        Maintain a contrast ratio of at least 4.5:1 for normal text and 3:1 for large text.
                      </p>
                      <div className="mt-3 space-y-3">
                        <div className="p-4 bg-white dark:bg-gray-950 rounded">
                          <p className="text-gray-900 dark:text-white">High contrast text (Recommended)</p>
                        </div>
                        <div className="p-4 bg-white dark:bg-gray-950 rounded">
                          <p className="text-gray-400 dark:text-gray-500">Low contrast text (Avoid)</p>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="text-lg font-medium">Font Size</h4>
                      <p className="mt-2">
                        Use a minimum of 16px (1rem) for body text to ensure readability.
                      </p>
                    </div>
                    
                    <div>
                      <h4 className="text-lg font-medium">Line Height</h4>
                      <p className="mt-2">
                        Maintain adequate line height (1.5 for body text) to improve readability,
                        especially for longer text blocks.
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold">Consistency</h3>
                  <p>
                    Maintain consistent typography patterns throughout the application.
                  </p>
                  
                  <div className="border p-6 rounded-md space-y-4">
                    <p>
                      Use the predefined typography styles and avoid custom one-off styles
                      that don't match the system.
                    </p>
                    
                    <table className="w-full border-collapse text-sm">
                      <thead>
                        <tr>
                          <th className="border px-4 py-2 text-left">Element</th>
                          <th className="border px-4 py-2 text-left">Consistent Style</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="border px-4 py-2">Page Titles</td>
                          <td className="border px-4 py-2">H1, 2rem+, font-bold</td>
                        </tr>
                        <tr>
                          <td className="border px-4 py-2">Section Headings</td>
                          <td className="border px-4 py-2">H2, 1.5rem+, font-semibold</td>
                        </tr>
                        <tr>
                          <td className="border px-4 py-2">Card Titles</td>
                          <td className="border px-4 py-2">H3, 1.25rem, font-medium</td>
                        </tr>
                        <tr>
                          <td className="border px-4 py-2">Body Text</td>
                          <td className="border px-4 py-2">1rem, 400 weight, 1.5 line height</td>
                        </tr>
                        <tr>
                          <td className="border px-4 py-2">Labels/Captions</td>
                          <td className="border px-4 py-2">0.875rem, 500 weight</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default TypographySystem; 