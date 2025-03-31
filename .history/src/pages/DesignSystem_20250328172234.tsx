import { useState, useEffect } from 'react';
import DesignSystemLayout from '@/layouts/DesignSystemLayout';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/Card';
import { cn } from '@/lib/utils';
import MainNavbar from '@/components/navigation/MainNavbar';

// Define the sections that will be in the design system
const sections = [
  { id: 'typography', label: 'Typography' },
  { id: 'colors', label: 'Colors' },
  { id: 'buttons', label: 'Buttons' },
  { id: 'forms', label: 'Forms' },
  { id: 'cards', label: 'Cards' },
  { id: 'navigation', label: 'Navigation' },
  { id: 'feedback', label: 'Feedback' },
  { id: 'layout', label: 'Layout' },
];

export default function DesignSystem() {
  const [activeSection, setActiveSection] = useState<string>(sections[0].id);

  // Handle scroll to section
  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    // Update URL hash without causing a page reload
    window.history.pushState(null, '', `#${sectionId}`);
  };

  // Set the active section based on the URL hash on initial load
  useEffect(() => {
    const hash = window.location.hash.replace('#', '');
    if (hash && sections.some(section => section.id === hash)) {
      setActiveSection(hash);
      const element = document.getElementById(hash);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Main Navbar */}
      <MainNavbar />
      
      {/* Page Header */}
      <div className="bg-muted">
        <div className="container py-6">
          <h1 className="text-3xl font-bold">Design System</h1>
          <p className="text-muted-foreground mt-2">
            Our complete design system documentation
          </p>
        </div>
      </div>
      
      {/* Main Content with Sidebar */}
      <div className="container flex-1 flex py-8">
        {/* Sidebar Navigation */}
        <aside className="w-64 flex-shrink-0 pr-8">
          <nav className="sticky top-8 space-y-1">
            {sections.map(section => (
              <button
                key={section.id}
                className={cn(
                  "w-full text-left px-4 py-2 rounded-md text-sm font-medium transition-colors",
                  activeSection === section.id
                    ? "bg-primary text-primary-foreground"
                    : "hover:bg-muted"
                )}
                onClick={() => scrollToSection(section.id)}
              >
                {section.label}
              </button>
            ))}
          </nav>
        </aside>
        
        {/* Main Content */}
        <main className="flex-1">
          <div className="space-y-16">
            {/* Introduction */}
            <section className="mb-12">
              <h1 className="text-4xl font-bold mb-4">Workhorse Design</h1>
              <h2 className="text-2xl font-semibold mb-6">Design System</h2>
              <p className="text-lg text-muted-foreground">
                Our design system provides a comprehensive set of guidelines, components, and patterns 
                to create consistent and cohesive user experiences across all our products.
              </p>
            </section>

            {/* Typography Section */}
            <section id="typography" className="scroll-mt-8">
              <h3 className="text-2xl font-semibold mb-6 pb-2 border-b">Typography</h3>
              
              <div className="space-y-8">
                <div>
                  <h4 className="text-lg font-medium mb-4">Headings</h4>
                  <div className="space-y-4 bg-card p-6 rounded-lg border">
                    <div>
                      <h1 className="text-4xl font-bold">Heading 1 - 2rem</h1>
                      <p className="text-sm text-muted-foreground mt-1">Used for main page titles</p>
                    </div>
                    <div>
                      <h2 className="text-3xl font-semibold">Heading 2 - 1.75rem</h2>
                      <p className="text-sm text-muted-foreground mt-1">Used for section titles</p>
                    </div>
                    <div>
                      <h3 className="text-2xl font-semibold">Heading 3 - 1.5rem</h3>
                      <p className="text-sm text-muted-foreground mt-1">Used for subsection titles</p>
                    </div>
                    <div>
                      <h4 className="text-xl font-medium">Heading 4 - 1.25rem</h4>
                      <p className="text-sm text-muted-foreground mt-1">Used for card titles and smaller sections</p>
    <DesignSystemLayout>
      <div className="space-y-16">
        {/* Introduction */}
        <section className="mb-12">
          <h1 className="text-4xl font-bold mb-4">Workhorse Design</h1>
          <h2 className="text-2xl font-semibold mb-6">Design System</h2>
          <p className="text-lg text-muted-foreground">
            Our design system provides a comprehensive set of guidelines, components, and patterns 
            to create consistent and cohesive user experiences across all our products.
          </p>
        </section>

        {/* Typography Section */}
        <section id="typography" className="scroll-mt-8">
          <h3 className="text-2xl font-semibold mb-6 pb-2 border-b">Typography</h3>
          
          <div className="space-y-8">
            <div>
              <h4 className="text-lg font-medium mb-4">Headings</h4>
              <div className="space-y-4 bg-card p-6 rounded-lg border">
                <div>
                  <h1 className="text-4xl font-bold">Heading 1 - 2rem</h1>
                  <p className="text-sm text-muted-foreground mt-1">Used for main page titles</p>
                </div>
                <div>
                  <h2 className="text-3xl font-semibold">Heading 2 - 1.75rem</h2>
                  <p className="text-sm text-muted-foreground mt-1">Used for section titles</p>
                </div>
                <div>
                  <h3 className="text-2xl font-semibold">Heading 3 - 1.5rem</h3>
                  <p className="text-sm text-muted-foreground mt-1">Used for subsection titles</p>
                </div>
                <div>
                  <h4 className="text-xl font-medium">Heading 4 - 1.25rem</h4>
                  <p className="text-sm text-muted-foreground mt-1">Used for card titles and smaller sections</p>
                </div>
                <div>
                  <h5 className="text-lg font-medium">Heading 5 - 1.125rem</h5>
                  <p className="text-sm text-muted-foreground mt-1">Used for smaller titles and emphasized content</p>
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-lg font-medium mb-4">Body Text</h4>
              <div className="space-y-4 bg-card p-6 rounded-lg border">
                <div>
                  <p className="text-base">Default body text - 1rem. This is the standard text size used for most content throughout the application.</p>
                </div>
                <div>
                  <p className="text-sm">Small text - 0.875rem. Used for less important information, metadata, and captions.</p>
                </div>
                <div>
                  <p className="text-xs">Extra small text - 0.75rem. Used for fine print, timestamps, and auxillary information.</p>
                </div>
                <div>
                  <p className="text-lg">Large text - 1.125rem. Used for featured content or introductory paragraphs.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Colors Section */}
        <section id="colors" className="scroll-mt-8">
          <h3 className="text-2xl font-semibold mb-6 pb-2 border-b">Colors</h3>
          
          <div className="space-y-8">
            <div>
              <h4 className="text-lg font-medium mb-4">Primary Colors</h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="space-y-2">
                  <div className="h-20 bg-primary rounded-lg"></div>
                  <p className="font-medium">Primary</p>
                  <p className="text-xs text-muted-foreground">Used for main actions and emphasis</p>
                </div>
                <div className="space-y-2">
                  <div className="h-20 bg-secondary rounded-lg"></div>
                  <p className="font-medium">Secondary</p>
                  <p className="text-xs text-muted-foreground">Used for secondary actions</p>
                </div>
                <div className="space-y-2">
                  <div className="h-20 bg-accent rounded-lg"></div>
                  <p className="font-medium">Accent</p>
                  <p className="text-xs text-muted-foreground">Used for accents and highlights</p>
                </div>
                <div className="space-y-2">
                  <div className="h-20 bg-muted rounded-lg"></div>
                  <p className="font-medium">Muted</p>
                  <p className="text-xs text-muted-foreground">Used for backgrounds and subtle elements</p>
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-lg font-medium mb-4">Semantic Colors</h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="space-y-2">
                  <div className="h-20 bg-destructive rounded-lg"></div>
                  <p className="font-medium">Destructive</p>
                  <p className="text-xs text-muted-foreground">Used for error states and destructive actions</p>
                </div>
                <div className="space-y-2">
                  <div className="h-20 bg-success rounded-lg"></div>
                  <p className="font-medium">Success</p>
                  <p className="text-xs text-muted-foreground">Used for success states and confirmations</p>
                </div>
                <div className="space-y-2">
                  <div className="h-20 bg-warning rounded-lg"></div>
                  <p className="font-medium">Warning</p>
                  <p className="text-xs text-muted-foreground">Used for warning states and cautionary actions</p>
                </div>
                <div className="space-y-2">
                  <div className="h-20 bg-info rounded-lg"></div>
                  <p className="font-medium">Info</p>
                  <p className="text-xs text-muted-foreground">Used for informational states and messaging</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Buttons Section */}
        <section id="buttons" className="scroll-mt-8">
          <h3 className="text-2xl font-semibold mb-6 pb-2 border-b">Buttons</h3>
          
          <div className="space-y-8">
            <div>
              <h4 className="text-lg font-medium mb-4">Button Variants</h4>
              <div className="flex flex-wrap gap-4 bg-card p-6 rounded-lg border">
                <Button variant="default">Default</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="outline">Outline</Button>
                <Button variant="ghost">Ghost</Button>
                <Button variant="link">Link</Button>
                <Button variant="destructive">Destructive</Button>
              </div>
            </div>

            <div>
              <h4 className="text-lg font-medium mb-4">Button Sizes</h4>
              <div className="flex flex-wrap items-center gap-4 bg-card p-6 rounded-lg border">
                <Button size="sm">Small</Button>
                <Button size="default">Default</Button>
                <Button size="lg">Large</Button>
                <Button size="icon" className="ml-4">
                  <span className="sr-only">Icon button</span>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                    <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
                  </svg>
                </Button>
              </div>
            </div>

            <div>
              <h4 className="text-lg font-medium mb-4">Button States</h4>
              <div className="flex flex-wrap gap-4 bg-card p-6 rounded-lg border">
                <Button>Normal</Button>
                <Button disabled>Disabled</Button>
                <Button loading>Loading</Button>
              </div>
            </div>
          </div>
        </section>

        {/* Forms Section */}
        <section id="forms" className="scroll-mt-8">
          <h3 className="text-2xl font-semibold mb-6 pb-2 border-b">Forms</h3>
          
          <div className="space-y-8">
            <div>
              <h4 className="text-lg font-medium mb-4">Input Fields</h4>
              <div className="max-w-md space-y-4 bg-card p-6 rounded-lg border">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium">Name</label>
                  <input
                    id="name"
                    type="text"
                    placeholder="Enter your name"
                    className="w-full px-3 py-2 border rounded-md"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium">Email</label>
                  <input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    className="w-full px-3 py-2 border rounded-md"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium">Message</label>
                  <textarea
                    id="message"
                    placeholder="Enter your message"
                    className="w-full px-3 py-2 border rounded-md"
                    rows={4}
                  ></textarea>
                </div>
                <Button className="w-full">Submit</Button>
              </div>
            </div>
          </div>
        </section>

        {/* Cards Section */}
        <section id="cards" className="scroll-mt-8">
          <h3 className="text-2xl font-semibold mb-6 pb-2 border-b">Cards</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Simple Card</CardTitle>
                <CardDescription>A basic card with title and description</CardDescription>
              </CardHeader>
              <CardContent>
                <p>This is a simple card component that can be used to display content in a contained format.</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Card with Footer</CardTitle>
                <CardDescription>Includes actions in the footer</CardDescription>
              </CardHeader>
              <CardContent>
                <p>This card includes a footer with action buttons for user interaction.</p>
              </CardContent>
              <CardFooter className="flex justify-end gap-2">
                <Button variant="outline">Cancel</Button>
                <Button>Save</Button>
              </CardFooter>
            </Card>
          </div>
        </section>

        {/* Navigation Section */}
        <section id="navigation" className="scroll-mt-8">
          <h3 className="text-2xl font-semibold mb-6 pb-2 border-b">Navigation</h3>
          
          <div className="space-y-8">
            <div>
              <h4 className="text-lg font-medium mb-4">Navbar Example</h4>
              <div className="bg-card p-4 rounded-lg border">
                <div className="flex items-center justify-between">
                  <div className="font-bold">Brand</div>
                  <div className="flex gap-4">
                    <a href="#" className="text-sm font-medium">Home</a>
                    <a href="#" className="text-sm font-medium">Features</a>
                    <a href="#" className="text-sm font-medium">Pricing</a>
                    <a href="#" className="text-sm font-medium">About</a>
                  </div>
                  <Button size="sm">Sign in</Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Feedback Section */}
        <section id="feedback" className="scroll-mt-8">
          <h3 className="text-2xl font-semibold mb-6 pb-2 border-b">Feedback</h3>
          
          <div className="space-y-8">
            <div>
              <h4 className="text-lg font-medium mb-4">Alert Examples</h4>
              <div className="space-y-4">
                <div className="p-4 rounded-md bg-primary/10 border border-primary text-primary">
                  <div className="font-medium">Information</div>
                  <div className="text-sm">This is an informational alert message.</div>
                </div>
                <div className="p-4 rounded-md bg-success/10 border border-success text-success">
                  <div className="font-medium">Success</div>
                  <div className="text-sm">Your changes have been saved successfully.</div>
                </div>
                <div className="p-4 rounded-md bg-warning/10 border border-warning text-warning">
                  <div className="font-medium">Warning</div>
                  <div className="text-sm">Please review your information before continuing.</div>
                </div>
                <div className="p-4 rounded-md bg-destructive/10 border border-destructive text-destructive">
                  <div className="font-medium">Error</div>
                  <div className="text-sm">There was a problem processing your request.</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Layout Section */}
        <section id="layout" className="scroll-mt-8">
          <h3 className="text-2xl font-semibold mb-6 pb-2 border-b">Layout</h3>
          
          <div className="space-y-8">
            <div>
              <h4 className="text-lg font-medium mb-4">Grid Layout</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-muted h-20 rounded-md flex items-center justify-center">1</div>
                <div className="bg-muted h-20 rounded-md flex items-center justify-center">2</div>
                <div className="bg-muted h-20 rounded-md flex items-center justify-center">3</div>
                <div className="bg-muted h-20 rounded-md flex items-center justify-center">4</div>
              </div>
            </div>

            <div>
              <h4 className="text-lg font-medium mb-4">Container Widths</h4>
              <div className="space-y-4">
                <div className="bg-muted p-4 rounded-md">
                  <p className="text-center">Default Container</p>
                </div>
                <div className="bg-muted p-4 rounded-md max-w-md mx-auto">
                  <p className="text-center">Max Width Medium (28rem)</p>
                </div>
                <div className="bg-muted p-4 rounded-md max-w-sm mx-auto">
                  <p className="text-center">Max Width Small (24rem)</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </DesignSystemLayout>
  );
} 