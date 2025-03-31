import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/Card';
import { cn } from '@/lib/utils';
import { SideNav } from '@/components/patterns/navigation/SideNav';
import { TopBar } from '@/components/patterns/navigation/TopBar';
import { FiBell } from 'react-icons/fi';
import { Heading, Text } from '@/components/ui/typography';

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

// Convert sections to navigation items for SideNav
const navItems = [
  {
    label: 'Design System',
    items: sections.map(section => ({
      label: section.label,
      href: `#${section.id}`,
      active: false
    }))
  }
];

export default function DesignSystem() {
  const [activeSection, setActiveSection] = useState<string>(sections[0].id);
  const [navigationItems, setNavigationItems] = useState(navItems);

  // Handle scroll to section
  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    
    // Update active state in navigation
    const updatedNavItems = navItems.map(group => ({
      ...group,
      items: group.items.map(item => ({
        ...item,
        active: item.href === `#${sectionId}`
      }))
    }));
    setNavigationItems(updatedNavItems);
    
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
      
      // Update active state in navigation
      const updatedNavItems = navItems.map(group => ({
        ...group,
        items: group.items.map(item => ({
          ...item,
          active: item.href === `#${hash}`
        }))
      }));
      setNavigationItems(updatedNavItems);
      
      const element = document.getElementById(hash);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, []);

  // User profile section for the top bar
  const userProfile = (
    <div className="flex items-center space-x-4">
      <button 
        className="p-1 rounded-full text-muted-foreground hover:text-foreground"
        aria-label="View notifications"
      >
        <FiBell className="w-6 h-6" />
      </button>
      <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center">
        <span className="font-medium text-sm text-foreground">AB</span>
      </div>
    </div>
  );

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <SideNav items={navigationItems} />
      
      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <TopBar title="Workhorse Design System" rightContent={userProfile} />
        
        <main className="flex-1 overflow-y-auto">
          <div className="px-8 py-8 space-y-16">
            {/* Introduction */}
            <section className="mb-12">
              <h1 className="text-4xl font-bold mb-4">Workhorse Design</h1>
              <h2 className="text-2xl font-semibold mb-6">Design System</h2>
              <p className="text-lg text-muted-foreground">
                Our design system provides a comprehensive set of guidelines, components, and patterns 
                to create consistent and cohesive user experiences across all our products.
              </p>
            </section>

            {/* Typography */}
            <section id="foundations-typography" className="scroll-mt-16 space-y-6">
              <Heading variant="h3">Typography</Heading>
              <Text className="text-lg">
                Our voice made visible through typeface, hierarchy, and expression.
              </Text>
              
              <Card>
                <CardHeader>
                  <CardTitle>Heading System</CardTitle>
                  <CardDescription>Complete set of heading components for building clear hierarchies</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <Heading variant="h1" className="mb-2">Heading 1 (h1)</Heading>
                    <Text className="text-sm text-muted-foreground">Used for page titles and major sections - 4xl size, bold, tight leading</Text>
                  </div>
                  <div>
                    <Heading variant="h2" className="mb-2">Heading 2 (h2)</Heading>
                    <Text className="text-sm text-muted-foreground">Used for section headers - 3xl size, semibold, snug leading</Text>
                  </div>
                  <div>
                    <Heading variant="h3" className="mb-2">Heading 3 (h3)</Heading>
                    <Text className="text-sm text-muted-foreground">Used for subsection titles - 2xl size, semibold, snug leading</Text>
                  </div>
                  <div>
                    <Heading variant="h4" className="mb-2">Heading 4 (h4)</Heading>
                    <Text className="text-sm text-muted-foreground">Used for card titles and smaller sections - xl size, medium, normal leading</Text>
                  </div>
                  <div>
                    <Heading variant="h5" className="mb-2">Heading 5 (h5)</Heading>
                    <Text className="text-sm text-muted-foreground">Used for labels and minor headings - lg size, medium, normal leading</Text>
                  </div>
                  <div>
                    <Heading variant="h6" className="mb-2">Heading 6 (h6)</Heading>
                    <Text className="text-sm text-muted-foreground">Used for small sections and labels - base size, medium, normal leading</Text>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Custom Heading Sizes</CardTitle>
                  <CardDescription>Flexible sizing options independent of semantic level</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div>
                      <Heading variant="h2" size="4xl" className="mb-2">Oversized Heading</Heading>
                      <Text className="text-sm text-muted-foreground">Using h2 with 4xl size for hero sections</Text>
                    </div>
                    <div>
                      <Heading variant="h3" size="2xl" className="mb-2">Balanced Heading</Heading>
                      <Text className="text-sm text-muted-foreground">Using h3 with 2xl size for balanced hierarchy</Text>
                    </div>
                    <div>
                      <Heading variant="h4" size="lg" className="mb-2">Subtle Heading</Heading>
                      <Text className="text-sm text-muted-foreground">Using h4 with lg size for subtle hierarchy</Text>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Text Component</CardTitle>
                  <CardDescription>Flexible text components for body content with multiple variations</CardDescription>
                </CardHeader>
                <CardContent className="space-y-8">
                  <div>
                    <Text size="xl" className="mb-2">Extra Large Text</Text>
                    <Text className="text-sm text-muted-foreground">Used for featured quotes and highlighted content</Text>
                    <div className="mt-2 p-4 bg-muted/20 rounded-md">
                      <Text size="xl">This is extra large text for impactful statements and featured content that needs to stand out from regular body text.</Text>
                    </div>
                  </div>
                  
                  <div>
                    <Text size="lg" className="mb-2">Large Text</Text>
                    <Text className="text-sm text-muted-foreground">Used for introductory paragraphs and lead-ins</Text>
                    <div className="mt-2 p-4 bg-muted/20 rounded-md">
                      <Text size="lg">This is large text used for introductory sections, hero descriptions, or anywhere you need slightly emphasized body copy.</Text>
                    </div>
                  </div>
                  
                  <div>
                    <Text className="font-medium mb-2">Regular Text (Base)</Text>
                    <Text className="text-sm text-muted-foreground">Default paragraph size for most content</Text>
                    <div className="mt-2 p-4 bg-muted/20 rounded-md">
                      <Text>This is the standard paragraph text used throughout the application for most content blocks. It provides good readability for longer form content.</Text>
                    </div>
                  </div>
                  
                  <div>
                    <Text size="sm" className="font-medium mb-2">Small Text</Text>
                    <Text className="text-sm text-muted-foreground">Used for secondary information</Text>
                    <div className="mt-2 p-4 bg-muted/20 rounded-md">
                      <Text size="sm">This smaller text is used for secondary information, metadata, captions, and supporting context.</Text>
                    </div>
                  </div>
                  
                  <div>
                    <Text size="xs" className="font-medium mb-2">Extra Small Text</Text>
                    <Text className="text-sm text-muted-foreground">Used for fine print and minimal UI elements</Text>
                    <div className="mt-2 p-4 bg-muted/20 rounded-md">
                      <Text size="xs">This extra small text is used for legal text, footnotes, and minimal UI elements where space is limited.</Text>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Text Variants</CardTitle>
                  <CardDescription>Semantic variations for different content purposes</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 bg-muted/20 rounded-md">
                      <Text variant="default">Default: Standard text appearance</Text>
                    </div>
                    <div className="p-4 bg-muted/20 rounded-md">
                      <Text variant="muted">Muted: Subdued text for secondary content</Text>
                    </div>
                    <div className="p-4 bg-muted/20 rounded-md">
                      <Text variant="error">Error: Used for error messages and warnings</Text>
                    </div>
                    <div className="p-4 bg-muted/20 rounded-md">
                      <Text variant="success">Success: Used for success confirmations</Text>
                    </div>
                    <div className="p-4 bg-muted/20 rounded-md">
                      <Text variant="warning">Warning: For cautionary information</Text>
                    </div>
                    <div className="p-4 bg-muted/20 rounded-md">
                      <Text variant="info">Info: For informational messages</Text>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Font Weights</CardTitle>
                  <CardDescription>Weight variations to establish hierarchy and emphasis</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 bg-muted/20 rounded-md">
                      <Text weight="regular">Regular (400): Primary body text weight</Text>
                    </div>
                    <div className="p-4 bg-muted/20 rounded-md">
                      <Text weight="medium">Medium (500): Subtle emphasis and UI labels</Text>
                    </div>
                    <div className="p-4 bg-muted/20 rounded-md">
                      <Text weight="semibold">Semibold (600): Strong emphasis and subheadings</Text>
                    </div>
                    <div className="p-4 bg-muted/20 rounded-md">
                      <Text weight="bold">Bold (700): Maximum emphasis for important content</Text>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Special Typography</CardTitle>
                  <CardDescription>Specialized typography components for specific use cases</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <Heading variant="h5" className="mb-3">Code</Heading>
                      <div className="p-4 bg-muted/20 rounded-md space-y-3">
                        <div>
                          <Text className="mb-1 text-sm">Default Code:</Text>
                          <code className="font-mono rounded px-[0.3em] py-[0.2em] text-[0.9em] bg-muted text-foreground">
                            npm install @workhorse/ui
                          </code>
                        </div>
                        <div>
                          <Text className="mb-1 text-sm">Accent Code:</Text>
                          <code className="font-mono rounded px-[0.3em] py-[0.2em] text-[0.9em] bg-primary/10 text-primary">
                            const theme = createTheme()
                          </code>
                        </div>
                      </div>
                    </div>
                    <div>
                      <Heading variant="h5" className="mb-3">Keyboard</Heading>
                      <div className="p-4 bg-muted/20 rounded-md space-y-3">
                        <div>
                          <Text className="mb-1 text-sm">Default Keyboard:</Text>
                          <div className="inline-flex">
                            <kbd className="font-mono inline-flex h-5 items-center justify-center rounded-[0.2em] border border-b-2 px-1.5 text-[0.85em] font-medium border-border bg-muted shadow-[inset_0_-1px_0_1px_var(--border)]">Ctrl</kbd>
                            <span className="mx-1">+</span>
                            <kbd className="font-mono inline-flex h-5 items-center justify-center rounded-[0.2em] border border-b-2 px-1.5 text-[0.85em] font-medium border-border bg-muted shadow-[inset_0_-1px_0_1px_var(--border)]">K</kbd>
                          </div>
                        </div>
                        <div>
                          <Text className="mb-1 text-sm">Accent Keyboard:</Text>
                          <div className="inline-flex">
                            <kbd className="font-mono inline-flex h-5 items-center justify-center rounded-[0.2em] border border-b-2 px-1.5 text-[0.85em] font-medium border-primary/20 bg-primary/10 text-primary shadow-[inset_0_-1px_0_1px_var(--primary)/40]">⌘</kbd>
                            <span className="mx-1">+</span>
                            <kbd className="font-mono inline-flex h-5 items-center justify-center rounded-[0.2em] border border-b-2 px-1.5 text-[0.85em] font-medium border-primary/20 bg-primary/10 text-primary shadow-[inset_0_-1px_0_1px_var(--primary)/40]">S</kbd>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* Colors Section */}
            <section id="colors" className="scroll-mt-16">
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
            <section id="buttons" className="scroll-mt-16">
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
            <section id="forms" className="scroll-mt-16">
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
            <section id="cards" className="scroll-mt-16">
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

            {/* Navigation Section - special focus on your UI components */}
            <section id="navigation" className="scroll-mt-16">
              <h3 className="text-2xl font-semibold mb-6 pb-2 border-b">Navigation</h3>
              
              <div className="space-y-8">
                <div>
                  <h4 className="text-lg font-medium mb-4">SideNav Component</h4>
                  <p className="mb-4">The SideNav component provides consistent navigation throughout the application. It supports grouped navigation items and highlights the active section.</p>
                  <div className="bg-card p-6 rounded-lg border max-w-md">
                    <div className="border-border bg-background border rounded-md w-full p-4">
                      <div className="flex flex-shrink-0 items-center px-4 py-2 border-b border-muted mb-4">
                        <h1 className="text-foreground text-xl font-bold">Workhorse</h1>
                      </div>
                      <div className="space-y-4 px-4">
                        <div className="space-y-2">
                          <h3 className="text-muted-foreground flex items-center text-xs font-semibold tracking-widest uppercase">
                            Design System
                          </h3>
                          <div className="space-y-1">
                            <div className="group flex items-center rounded-md px-2 py-2 text-sm font-medium bg-primary text-primary-foreground">
                              Typography
                            </div>
                            <div className="group flex items-center rounded-md px-2 py-2 text-sm font-medium text-foreground hover:bg-muted hover:text-primary">
                              Colors
                            </div>
                            <div className="group flex items-center rounded-md px-2 py-2 text-sm font-medium text-foreground hover:bg-muted hover:text-primary">
                              Buttons
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="text-lg font-medium mb-4">TopBar Component</h4>
                  <p className="mb-4">The TopBar component provides a consistent header with customizable title and right content area.</p>
                  <div className="bg-card p-6 rounded-lg border">
                    <div className="border-b border-border bg-card rounded-t-md">
                      <div className="flex items-center justify-between px-4 py-4 sm:px-6">
                        <h1 className="text-xl font-semibold text-foreground">Page Title</h1>
                        <div className="flex items-center space-x-4">
                          <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center">
                            <span className="font-medium text-sm text-foreground">AB</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="p-4 bg-muted/20 rounded-b-md">
                      <p className="text-center text-muted-foreground text-sm">Page Content</p>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="text-lg font-medium mb-4">MainNavbar Component</h4>
                  <p className="mb-4">The MainNavbar component is used for public-facing pages with branding and navigation links.</p>
                  <div className="bg-card p-6 rounded-lg border">
                    <div className="w-full border-b bg-background rounded-md p-2">
                      <div className="container flex h-12 items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-lg">Workhorse Design</span>
                        </div>
                        <nav className="mx-auto flex items-center space-x-4">
                          <div className="text-sm font-medium transition-colors hover:text-primary">Design</div>
                          <div className="text-sm font-medium transition-colors hover:text-primary">About</div>
                        </nav>
                        <div className="flex items-center space-x-2">
                          <Button variant="ghost" size="sm">Contact</Button>
                          <Button size="sm">Login</Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
        
            {/* Feedback Section */}
            <section id="feedback" className="scroll-mt-16">
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
            <section id="layout" className="scroll-mt-16">
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
        </main>
      </div>
    </div>
  );
} 