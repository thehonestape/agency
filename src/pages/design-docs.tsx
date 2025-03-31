import React, { useState, useRef, useEffect } from 'react';
import {
  Alert,
  AlertDescription,
  AlertTitle,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Checkbox,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Input,
  Label,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  Textarea,
} from "@/components/ui";
import { ThemeToggle } from '@/components/ui/theme/theme-toggle';
import { cn } from '@/lib/utils';
import {
  DocumentTextIcon,
  PaintBrushIcon,
  PuzzlePieceIcon,
  SwatchIcon,
  Squares2X2Icon,
  ArrowPathIcon,
  Bars3Icon,
  XMarkIcon
} from '@heroicons/react/24/outline';

// Component Preview container
const ComponentPreview = ({ 
  title, 
  description, 
  children 
}: { 
  title: string; 
  description?: string; 
  children: React.ReactNode 
}) => {
  return (
    <div className="border rounded-lg overflow-hidden">
      <div className="p-4 border-b bg-muted/30">
        <h3 className="text-lg font-medium">{title}</h3>
        {description && (
          <p className="text-sm text-muted-foreground mt-1">{description}</p>
        )}
      </div>
      <div className="p-6 flex flex-col items-start gap-4">
        {children}
      </div>
    </div>
  );
};

// Color Swatch Component
const ColorSwatch = ({ 
  color, 
  name, 
  value 
}: { 
  color: string; 
  name: string; 
  value: string 
}) => {
  return (
    <div className="flex flex-col">
      <div 
        className={`h-16 w-full rounded-md mb-2 ${color}`} 
      />
      <div className="font-medium text-sm">{name}</div>
      <div className="text-xs text-muted-foreground">{value}</div>
    </div>
  );
};

// Custom components used in the design docs page
const Banner = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-full p-3 bg-primary/10 rounded-md border border-primary/20 text-center">
      {children}
    </div>
  );
};

// Custom Callout component
const Callout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="bg-muted p-4 rounded-md border my-4">
      {children}
    </div>
  );
};

// Custom SheetFooter component
const CustomSheetFooter = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2 mt-4">
      {children}
    </div>
  );
};

// Main Design Docs Page
const DesignDocsPage = () => {
  const [activeSection, setActiveSection] = useState("overview");
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // Navigation items
  const navItems = [
    { id: "overview", label: "Overview", icon: <DocumentTextIcon className="h-5 w-5" /> },
    { id: "colors", label: "Colors", icon: <SwatchIcon className="h-5 w-5" /> },
    { id: "typography", label: "Typography", icon: <DocumentTextIcon className="h-5 w-5" /> },
    { id: "components", label: "Components", icon: <PuzzlePieceIcon className="h-5 w-5" /> },
    { id: "patterns", label: "Patterns", icon: <Squares2X2Icon className="h-5 w-5" /> },
    { id: "utilities", label: "Utilities", icon: <ArrowPathIcon className="h-5 w-5" /> },
  ];

  // Handle navigation click
  const handleNavClick = (id: string) => {
    setActiveSection(id);
    setIsMobileMenuOpen(false);
    
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Update active section based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100;
      
      for (const id in sectionRefs.current) {
        const section = sectionRefs.current[id];
        if (!section) continue;
        
        const sectionTop = section.offsetTop;
        const sectionBottom = sectionTop + section.offsetHeight;
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
          setActiveSection(id);
          break;
        }
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Section component for consistent styling and ref registration
  const Section = ({ 
    id, 
    title, 
    description, 
    children,
    ...props
  }: { 
    id: string; 
    title: string; 
    description?: string; 
    children: React.ReactNode;
    [key: string]: any;
  }) => {
    return (
      <section
        id={id}
        ref={(el) => {
          sectionRefs.current[id] = el;
          return undefined;
        }}
        className="mb-16 scroll-mt-20"
        data-section={id}
        {...props}
      >
        <div className="mb-6">
          <h2 className="text-3xl font-bold mb-2">{title}</h2>
          {description && (
            <p className="text-muted-foreground">{description}</p>
          )}
        </div>
        {children}
      </section>
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border sticky top-0 z-10 bg-background" data-component="header" role="banner">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold">Design System</h1>
          <ThemeToggle />
        </div>
      </header>

      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row">
          {/* Sidebar Navigation */}
          <div className="w-64 lg:fixed top-20 h-[calc(100vh-80px)] overflow-auto py-8 pr-4 hidden lg:block" data-component="sidebar" role="navigation" aria-label="Main Navigation">
            {/* Section Navigation */}
            <nav className="space-y-1">
              {navItems.map((section) => (
                <a
                  key={section.id}
                  href={`#${section.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(section.id);
                  }}
                  className={cn(
                    "flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium",
                    activeSection === section.id
                      ? "bg-primary text-primary-foreground"
                      : "text-foreground hover:bg-muted"
                  )}
                  data-nav-item={section.id}
                  aria-current={activeSection === section.id ? "page" : undefined}
                >
                  {section.icon}
                  {section.label}
                </a>
              ))}
            </nav>
          </div>

          {/* Mobile Menu Button */}
          <div className="fixed bottom-4 right-4 z-50 lg:hidden" data-component="mobile-nav-toggle">
            <Button
              size="icon"
              className="rounded-full shadow-lg"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-navigation"
              aria-label={isMobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            >
              {isMobileMenuOpen ? (
                <XMarkIcon className="h-6 w-6" />
              ) : (
                <Bars3Icon className="h-6 w-6" />
              )}
            </Button>
          </div>
          
          {/* Mobile Navigation Overlay */}
          {isMobileMenuOpen && (
            <div className="fixed inset-0 z-40 lg:hidden" data-component="mobile-nav" id="mobile-navigation" role="dialog" aria-modal="true">
              <div 
                className="absolute inset-0 bg-black/50" 
                onClick={() => setIsMobileMenuOpen(false)}
                data-component="mobile-nav-backdrop"
              />
              <div className="absolute inset-y-0 right-0 w-64 bg-background border-l p-4" data-component="mobile-nav-panel" role="navigation" aria-label="Mobile Navigation">
                <div className="flex justify-between items-center mb-4 pb-2 border-b">
                  <h2 className="text-lg font-bold">Design System</h2>
                  <button 
                    onClick={() => setIsMobileMenuOpen(false)}
                    aria-label="Close navigation menu"
                  >
                    <XMarkIcon className="h-5 w-5" />
                  </button>
                </div>
                <nav>
                  <ul className="space-y-2">
                    {navItems.map((item) => (
                      <li key={item.id}>
                        <button
                          onClick={() => handleNavClick(item.id)}
                          className={cn(
                            "flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm font-medium",
                            activeSection === item.id
                              ? "bg-primary text-primary-foreground"
                              : "hover:bg-muted"
                          )}
                          data-nav-item={item.id}
                          aria-current={activeSection === item.id ? "page" : undefined}
                        >
                          {item.icon}
                          {item.label}
                        </button>
                      </li>
                    ))}
                  </ul>
                </nav>
              </div>
            </div>
          )}
          
          {/* Main Content */}
          <main className="lg:pl-72 pt-8 pb-16 w-full" data-component="main-content" role="main">
            {/* Overview Section */}
            <Section 
              id="overview" 
              title="Design System Overview" 
              description="A comprehensive guide to our design system components, patterns, and principles."
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Components</CardTitle>
                    <CardDescription>
                      Reusable UI building blocks for consistent interfaces
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p>Our component library provides a set of reusable, accessible, and themeable UI elements.</p>
                  </CardContent>
                  <CardFooter>
                    <Button onClick={() => handleNavClick("components")}>
                      View Components
                    </Button>
                  </CardFooter>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Design Tokens</CardTitle>
                    <CardDescription>
                      Colors, typography, spacing, and other design variables
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p>Design tokens ensure consistency across all our digital products.</p>
                  </CardContent>
                  <CardFooter>
                    <Button onClick={() => handleNavClick("colors")}>
                      View Tokens
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </Section>

            {/* Components Section */}
            <Section
              id="components"
              title="Components"
              description="Our library of reusable UI components for building consistent interfaces"
            >
              <div className="mb-8">
                <Card>
                  <CardHeader>
                    <CardTitle>Component System</CardTitle>
                    <CardDescription>A comprehensive library of UI building blocks</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="prose dark:prose-invert max-w-none mb-6">
                      <p className="text-lg">
                        Our component library provides a set of reusable, accessible, and themeable UI elements designed to work together seamlessly. Each component follows consistent patterns for props, styling, and behavior.
                      </p>
                      
                      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="p-4 border rounded-md">
                          <h3 className="text-lg font-semibold mb-2">Accessibility</h3>
                          <p className="text-sm text-muted-foreground">
                            All components are built with accessibility in mind, following WCAG guidelines and using proper ARIA attributes.
                          </p>
                        </div>
                        
                        <div className="p-4 border rounded-md">
                          <h3 className="text-lg font-semibold mb-2">Composition</h3>
                          <p className="text-sm text-muted-foreground">
                            Components are designed to be composable, allowing for flexible combinations to meet diverse UI needs.
                          </p>
                        </div>
                        
                        <div className="p-4 border rounded-md">
                          <h3 className="text-lg font-semibold mb-2">Theming</h3>
                          <p className="text-sm text-muted-foreground">
                            Components adapt to theme changes, supporting both light and dark modes as well as custom brand themes.
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <Tabs defaultValue="buttons" className="mb-8">
                <TabsList className="mb-6">
                  <TabsTrigger value="buttons">Buttons</TabsTrigger>
                  <TabsTrigger value="cards">Cards</TabsTrigger>
                  <TabsTrigger value="dialogs">Dialogs</TabsTrigger>
                  <TabsTrigger value="alerts">Alerts</TabsTrigger>
                  <TabsTrigger value="inputs">Inputs</TabsTrigger>
                </TabsList>
                
                <TabsContent value="buttons">
                  <div className="space-y-8">
                    <ComponentPreview 
                      title="Button Variants" 
                      description="Different button styles for various contexts and hierarchies"
                    >
                      <div className="flex flex-wrap gap-4">
                        <Button variant="default">Default</Button>
                        <Button variant="destructive">Destructive</Button>
                        <Button variant="outline">Outline</Button>
                        <Button variant="secondary">Secondary</Button>
                        <Button variant="ghost">Ghost</Button>
                        <Button variant="link">Link</Button>
                      </div>
                    </ComponentPreview>
                    
                    <ComponentPreview 
                      title="Button Sizes" 
                      description="Different button sizes for various contexts"
                    >
                      <div className="flex flex-wrap items-center gap-4">
                        <Button size="sm">Small</Button>
                        <Button size="default">Default</Button>
                        <Button size="lg">Large</Button>
                      </div>
                    </ComponentPreview>
                    
                    <Card>
                      <CardHeader>
                        <CardTitle>Button Usage Guidelines</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <h4 className="font-medium mb-2">When to use each variant</h4>
                            <ul className="text-sm space-y-2">
                              <li><strong>Default:</strong> Primary actions, main CTAs</li>
                              <li><strong>Secondary:</strong> Secondary actions, alternative options</li>
                              <li><strong>Destructive:</strong> Actions that delete or remove data</li>
                              <li><strong>Outline:</strong> Less prominent actions, secondary options</li>
                              <li><strong>Ghost:</strong> Toolbar actions, toggles, minimal UI contexts</li>
                              <li><strong>Link:</strong> Navigational actions that behave like links</li>
                            </ul>
                          </div>
                          
                          <div>
                            <h4 className="font-medium mb-2">Best Practices</h4>
                            <ul className="text-sm space-y-2">
                              <li>Use only one primary button per section</li>
                              <li>Order buttons by importance (primary first)</li>
                              <li>Use clear, action-oriented labels (e.g., "Save" not "OK")</li>
                              <li>Maintain consistent button hierarchy across the application</li>
                              <li>Consider mobile touch targets (min 44×44px)</li>
                            </ul>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>
                
                <TabsContent value="cards">
                  <div className="space-y-8">
                    <ComponentPreview 
                      title="Card Component" 
                      description="Cards are used to group related content and actions"
                    >
                      <Card className="max-w-md">
                        <CardHeader>
                          <CardTitle>Card Title</CardTitle>
                          <CardDescription>Card description goes here</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <p>Card content and information displayed here.</p>
                        </CardContent>
                        <CardFooter className="flex justify-between">
                          <Button variant="ghost">Cancel</Button>
                          <Button>Submit</Button>
                        </CardFooter>
                      </Card>
                    </ComponentPreview>
                    
                    <ComponentPreview 
                      title="Card Variations" 
                      description="Different card styles for various use cases"
                    >
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <Card>
                          <CardHeader className="pb-2">
                            <CardTitle>Simple Card</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <p className="text-sm">Basic card with minimal styling.</p>
                          </CardContent>
                        </Card>
                        
                        <Card>
                          <div className="h-32 bg-muted"></div>
                          <CardHeader className="pb-2">
                            <CardTitle>Media Card</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <p className="text-sm">Card with media content.</p>
                          </CardContent>
                        </Card>
                        
                        <Card className="border-primary/50">
                          <CardHeader className="pb-2 border-b">
                            <CardTitle>Highlighted Card</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <p className="text-sm">Card with special styling.</p>
                          </CardContent>
                          <CardFooter className="bg-muted/20">
                            <Button size="sm" variant="outline">Action</Button>
                          </CardFooter>
                        </Card>
                      </div>
                    </ComponentPreview>
                    
                    <Card>
                      <CardHeader>
                        <CardTitle>Card Usage Guidelines</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <h4 className="font-medium mb-2">Card Structure</h4>
                            <ul className="text-sm space-y-2">
                              <li><strong>CardHeader:</strong> Contains title and optional description</li>
                              <li><strong>CardContent:</strong> Main content area</li>
                              <li><strong>CardFooter:</strong> Actions related to the card content</li>
                              <li><strong>CardTitle:</strong> Main heading for the card</li>
                              <li><strong>CardDescription:</strong> Supporting text for the card title</li>
                            </ul>
                          </div>
                          
                          <div>
                            <h4 className="font-medium mb-2">Best Practices</h4>
                            <ul className="text-sm space-y-2">
                              <li>Use cards to group related information</li>
                              <li>Maintain consistent padding and spacing</li>
                              <li>Limit the amount of content in a single card</li>
                              <li>Use clear hierarchy within cards</li>
                              <li>Consider responsive behavior in card grids</li>
                            </ul>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>
                
                <TabsContent value="dialogs">
                  <div className="space-y-8">
                    <ComponentPreview 
                      title="Dialog Component" 
                      description="Dialogs are used to display content that requires user attention or interaction"
                    >
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button>Open Dialog</Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Dialog Title</DialogTitle>
                            <DialogDescription>
                              This is a description of the dialog content and purpose.
                            </DialogDescription>
                          </DialogHeader>
                          <div className="py-4">
                            <p>Dialog content goes here. This could be a form, information, or other interactive elements.</p>
                          </div>
                          <DialogFooter>
                            <Button variant="outline">Cancel</Button>
                            <Button>Continue</Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    </ComponentPreview>
                    
                    <ComponentPreview 
                      title="Sheet Component" 
                      description="Sheets are slide-in dialogs that appear from the edge of the screen"
                    >
                      <div className="flex flex-wrap gap-4">
                        <Sheet>
                          <SheetTrigger asChild>
                            <Button variant="outline">Open Right Sheet</Button>
                          </SheetTrigger>
                          <SheetContent>
                            <SheetHeader>
                              <SheetTitle>Sheet Title</SheetTitle>
                              <SheetDescription>
                                Sheet description and supporting text.
                              </SheetDescription>
                            </SheetHeader>
                            <div className="py-4">
                              <p>Sheet content appears here.</p>
                            </div>
                            <CustomSheetFooter>
                              <Button>Save Changes</Button>
                            </CustomSheetFooter>
                          </SheetContent>
                        </Sheet>
                      </div>
                    </ComponentPreview>
                    
                    <Card>
                      <CardHeader>
                        <CardTitle>Dialog Usage Guidelines</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <h4 className="font-medium mb-2">When to Use</h4>
                            <ul className="text-sm space-y-2">
                              <li>To capture user input or confirmation</li>
                              <li>To display important information that requires attention</li>
                              <li>For multi-step processes that shouldn't navigate away</li>
                              <li>To show additional details without page navigation</li>
                            </ul>
                          </div>
                          
                          <div>
                            <h4 className="font-medium mb-2">Best Practices</h4>
                            <ul className="text-sm space-y-2">
                              <li>Keep dialogs focused on a single task or topic</li>
                              <li>Provide clear actions and escape paths</li>
                              <li>Use descriptive titles that explain the purpose</li>
                              <li>Consider keyboard navigation and focus management</li>
                              <li>Ensure dialogs are responsive on all devices</li>
                            </ul>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>
                
                <TabsContent value="alerts">
                  <div className="space-y-8">
                    <ComponentPreview 
                      title="Alert Component" 
                      description="Alerts are used to communicate status information to users"
                    >
                      <div className="space-y-4">
                        <Alert>
                          <AlertTitle>Information</AlertTitle>
                          <AlertDescription>
                            This is an informational alert for the user.
                          </AlertDescription>
                        </Alert>
                        
                        <Alert variant="destructive">
                          <AlertTitle>Error</AlertTitle>
                          <AlertDescription>
                            Something went wrong. Please try again.
                          </AlertDescription>
                        </Alert>
                      </div>
                    </ComponentPreview>
                    
                    <ComponentPreview 
                      title="Banner Component" 
                      description="Banners display important messages across the top of the interface"
                    >
                      <div className="space-y-4">
                        <Banner>
                          <div className="text-sm font-medium">
                            This is an important announcement banner.
                          </div>
                        </Banner>
                      </div>
                    </ComponentPreview>
                    
                    <Card>
                      <CardHeader>
                        <CardTitle>Alert Types and Usage</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <h4 className="font-medium mb-2">Alert Variants</h4>
                            <ul className="text-sm space-y-2">
                              <li><strong>Default:</strong> General information and updates</li>
                              <li><strong>Destructive:</strong> Errors and critical warnings</li>
                              <li><strong>Success:</strong> Confirmation of completed actions</li>
                              <li><strong>Warning:</strong> Potential issues or cautions</li>
                            </ul>
                          </div>
                          
                          <div>
                            <h4 className="font-medium mb-2">Best Practices</h4>
                            <ul className="text-sm space-y-2">
                              <li>Use alerts sparingly to avoid alert fatigue</li>
                              <li>Keep messages concise and actionable</li>
                              <li>Show validation errors inline with inputs</li>
                              <li>Consider whether alerts should be dismissible</li>
                              <li>Use appropriate icons to reinforce the message type</li>
                            </ul>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>
                
                <TabsContent value="inputs">
                  <div className="space-y-8">
                    <ComponentPreview 
                      title="Input Components" 
                      description="Form input controls for collecting user data"
                    >
                      <div className="space-y-6 max-w-md">
                        <div className="space-y-2">
                          <Label htmlFor="email">Email</Label>
                          <Input id="email" placeholder="Enter your email" type="email" />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="password">Password</Label>
                          <Input id="password" placeholder="Enter your password" type="password" />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="message">Message</Label>
                          <Textarea id="message" placeholder="Type your message here" />
                        </div>
                      </div>
                    </ComponentPreview>
                    
                    <ComponentPreview 
                      title="Select and Checkbox" 
                      description="Selection controls for choosing from options"
                    >
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-md">
                        <div className="space-y-2">
                          <Label htmlFor="country">Country</Label>
                          <Select>
                            <SelectTrigger id="country">
                              <SelectValue placeholder="Select a country" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="us">United States</SelectItem>
                              <SelectItem value="ca">Canada</SelectItem>
                              <SelectItem value="uk">United Kingdom</SelectItem>
                              <SelectItem value="au">Australia</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        
                        <div className="space-y-4">
                          <div className="flex items-center space-x-2">
                            <Checkbox id="terms" />
                            <Label htmlFor="terms">Accept terms</Label>
                          </div>
                          
                          <div className="flex items-center space-x-2">
                            <Checkbox id="marketing" />
                            <Label htmlFor="marketing">Receive updates</Label>
                          </div>
                        </div>
                      </div>
                    </ComponentPreview>
                    
                    <Card>
                      <CardHeader>
                        <CardTitle>Form Input Guidelines</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <h4 className="font-medium mb-2">Input Components</h4>
                            <ul className="text-sm space-y-2">
                              <li><strong>Input:</strong> Single-line text entry</li>
                              <li><strong>Textarea:</strong> Multi-line text entry</li>
                              <li><strong>Select:</strong> Dropdown selection from options</li>
                              <li><strong>Checkbox:</strong> Binary or multiple selection</li>
                              <li><strong>Radio:</strong> Single selection from options</li>
                              <li><strong>Switch:</strong> Toggle between two states</li>
                            </ul>
                          </div>
                          
                          <div>
                            <h4 className="font-medium mb-2">Best Practices</h4>
                            <ul className="text-sm space-y-2">
                              <li>Always use labels with form controls</li>
                              <li>Provide helpful placeholder text when appropriate</li>
                              <li>Show validation errors inline with inputs</li>
                              <li>Group related form controls logically</li>
                              <li>Consider keyboard navigation and tab order</li>
                              <li>Use appropriate input types (email, number, etc.)</li>
                            </ul>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>
              </Tabs>
              
              <Card>
                <CardHeader>
                  <CardTitle>Component Composition</CardTitle>
                  <CardDescription>Building complex interfaces from simple components</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="prose dark:prose-invert max-w-none">
                    <p>
                      Our component system is designed for composition, allowing you to build complex interfaces by combining simpler components. This approach promotes consistency, reusability, and maintainability.
                    </p>
                    
                    <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                      <Card className="overflow-hidden">
                        <CardHeader className="bg-muted/30">
                          <CardTitle className="text-lg">Component-Based Architecture</CardTitle>
                        </CardHeader>
                        <CardContent className="pt-4">
                          <ul className="text-sm space-y-2">
                            <li>• Build interfaces from reusable components</li>
                            <li>• Maintain consistent styling and behavior</li>
                            <li>• Reduce duplication and inconsistencies</li>
                            <li>• Improve development efficiency</li>
                          </ul>
                        </CardContent>
                      </Card>
                      
                      <Card className="overflow-hidden">
                        <CardHeader className="bg-muted/30">
                          <CardTitle className="text-lg">Composition Patterns</CardTitle>
                        </CardHeader>
                        <CardContent className="pt-4">
                          <ul className="text-sm space-y-2">
                            <li>• Slot-based composition (children props)</li>
                            <li>• Compound components (related components)</li>
                            <li>• Higher-order components (enhanced functionality)</li>
                            <li>• Render props (flexible rendering logic)</li>
                          </ul>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Section>

            {/* Typography Section */}
            <Section
              id="typography"
              title="Typography"
              description="Typography guidelines and text styles for consistent communication"
            >
              <div className="space-y-8">
                {/* Font Families */}
                <Card className="mb-8">
                  <CardHeader>
                    <CardTitle>Font Families</CardTitle>
                    <CardDescription>Core typographic families for effective design systems</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="prose dark:prose-invert max-w-none mb-6">
                      <p className="text-lg">
                        A strong typography system is built on foundational font categories that serve distinct purposes across all design contexts.
                      </p>
                      
                      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="rounded-lg overflow-hidden border">
                          <div className="p-6 bg-primary/10">
                            <h3 className="text-2xl mb-2">Serif</h3>
                            <p className="text-base">
                              <span className="text-muted-foreground mt-2 block">Fonts with small strokes at the end of characters that create a sense of formality and tradition.</span>
                            </p>
                          </div>
                          <div className="p-6 border-t">
                            <ul className="space-y-2 text-sm">
                              <li className="flex items-start gap-2">
                                <div className="h-5 w-5 flex-shrink-0 rounded-full bg-primary/20 flex items-center justify-center text-primary text-xs">+</div>
                                <span>Conveys authority, reliability, and heritage</span>
                              </li>
                              <li className="flex items-start gap-2">
                                <div className="h-5 w-5 flex-shrink-0 rounded-full bg-primary/20 flex items-center justify-center text-primary text-xs">+</div>
                                <span>Ideal for long-form content and editorial</span>
                              </li>
                            </ul>
                          </div>
                        </div>
                        
                        <div className="rounded-lg overflow-hidden border">
                          <div className="p-6 bg-primary/10">
                            <h3 className="text-2xl mb-2">Sans Serif</h3>
                            <p className="text-base">
                              <span className="text-muted-foreground mt-2 block">Fonts without decorative strokes, creating clean, modern, and accessible text.</span>
                            </p>
                          </div>
                          <div className="p-6 border-t">
                            <ul className="space-y-2 text-sm">
                              <li className="flex items-start gap-2">
                                <div className="h-5 w-5 flex-shrink-0 rounded-full bg-primary/20 flex items-center justify-center text-primary text-xs">+</div>
                                <span>Conveys clarity, efficiency, and modernity</span>
                              </li>
                              <li className="flex items-start gap-2">
                                <div className="h-5 w-5 flex-shrink-0 rounded-full bg-primary/20 flex items-center justify-center text-primary text-xs">+</div>
                                <span>Perfect for interfaces, navigation, and content</span>
                              </li>
                            </ul>
                          </div>
                        </div>
                        
                        <div className="rounded-lg overflow-hidden border">
                          <div className="p-6 bg-primary/10">
                            <h3 className="text-2xl mb-2">Monospace</h3>
                            <p className="text-base">
                              <span className="text-muted-foreground mt-2 block">Fonts where each character occupies the same width, creating a technical rhythm.</span>
                            </p>
                          </div>
                          <div className="p-6 border-t">
                            <ul className="space-y-2 text-sm">
                              <li className="flex items-start gap-2">
                                <div className="h-5 w-5 flex-shrink-0 rounded-full bg-primary/20 flex items-center justify-center text-primary text-xs">+</div>
                                <span>Conveys precision, functionality, and technology</span>
                              </li>
                              <li className="flex items-start gap-2">
                                <div className="h-5 w-5 flex-shrink-0 rounded-full bg-primary/20 flex items-center justify-center text-primary text-xs">+</div>
                                <span>Used for code, technical data, and commands</span>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                {/* Font Weight System */}
                <Card className="mb-8">
                  <CardHeader>
                    <CardTitle>Font Weight System</CardTitle>
                    <CardDescription>Comprehensive weight scale with structured progression</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                      <div className="p-4 border rounded-md">
                        <div className="font-light text-2xl mb-2">Light</div>
                        <div className="text-xs text-muted-foreground uppercase tracking-wider mb-1">300 weight</div>
                        <p className="font-light text-sm">
                          For large headings and display text where elegance is key
                        </p>
                      </div>
                      
                      <div className="p-4 border rounded-md bg-muted/5">
                        <div className="font-normal text-2xl mb-2">Regular</div>
                        <div className="text-xs text-muted-foreground uppercase tracking-wider mb-1">400 weight</div>
                        <p className="font-normal text-sm">
                          Primary body text and general content
                        </p>
                      </div>
                      
                      <div className="p-4 border rounded-md">
                        <div className="font-medium text-2xl mb-2">Medium</div>
                        <div className="text-xs text-muted-foreground uppercase tracking-wider mb-1">500 weight</div>
                        <p className="font-medium text-sm">
                          Subheadings and emphasized text
                        </p>
                      </div>
                      
                      <div className="p-4 border rounded-md">
                        <div className="font-semibold text-2xl mb-2">Demi</div>
                        <div className="text-xs text-muted-foreground uppercase tracking-wider mb-1">600 weight</div>
                        <p className="font-semibold text-sm">
                          Section headers and important elements
                        </p>
                      </div>
                      
                      <div className="p-4 border rounded-md">
                        <div className="font-bold text-2xl mb-2">Bold</div>
                        <div className="text-xs text-muted-foreground uppercase tracking-wider mb-1">700 weight</div>
                        <p className="font-bold text-sm">
                          Primary headings and critical emphasis
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                {/* Typography Scales */}
                <div>
                  <h3 className="text-2xl font-semibold">Typography Scales</h3>
                  <p className="text-base text-muted-foreground mb-6">
                    Our system provides complementary scales: Semantic (purpose-based), HTML (structured), and Content (editorial). Each serves different needs while maintaining consistent proportions.
                  </p>
                  
                  <Tabs defaultValue="semantic">
                    <TabsList className="mb-6">
                      <TabsTrigger value="semantic">Semantic Scale</TabsTrigger>
                      <TabsTrigger value="html">HTML Elements</TabsTrigger>
                      <TabsTrigger value="content">Content Scale</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="semantic">
                      <Card>
                        <CardHeader>
                          <CardTitle>Semantic Scale</CardTitle>
                          <CardDescription>Purpose-driven, focused on content role</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-4">
                            <div className="border-b pb-3">
                              <div className="text-4xl font-bold">Display</div>
                              <p className="text-xs text-muted-foreground mt-1 font-medium">Hero sections, major headlines</p>
                            </div>
                            <div className="border-b pb-3">
                              <div className="text-3xl font-semibold">Title</div>
                              <p className="text-xs text-muted-foreground mt-1 font-medium">Page headers, section dividers</p>
                            </div>
                            <div className="border-b pb-3">
                              <div className="text-2xl font-semibold">Heading</div>
                              <p className="text-xs text-muted-foreground mt-1 font-medium">Content section headers</p>
                            </div>
                            <div className="border-b pb-3">
                              <div className="text-xl font-medium">Subheading</div>
                              <p className="text-xs text-muted-foreground mt-1 font-medium">Subsection headers, card titles</p>
                            </div>
                            <div className="border-b pb-3">
                              <div className="text-base font-normal">Body</div>
                              <p className="text-xs text-muted-foreground mt-1 font-medium">Primary content text</p>
                            </div>
                            <div className="border-b pb-3">
                              <div className="text-sm font-normal">Caption</div>
                              <p className="text-xs text-muted-foreground mt-1 font-medium">Helper text, metadata, labels</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </TabsContent>
                    
                    <TabsContent value="html">
                      <Card>
                        <CardHeader>
                          <CardTitle>HTML Elements</CardTitle>
                          <CardDescription>Semantic HTML foundation for interfaces</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-4">
                            <div className="border-b pb-2">
                              <h1 className="text-4xl font-bold">Heading 1</h1>
                              <p className="text-xs text-muted-foreground mt-1 font-medium">4xl / Bold / 2.25rem</p>
                            </div>
                            <div className="border-b pb-2">
                              <h2 className="text-3xl font-bold">Heading 2</h2>
                              <p className="text-xs text-muted-foreground mt-1 font-medium">3xl / Bold / 1.875rem</p>
                            </div>
                            <div className="border-b pb-2">
                              <h3 className="text-2xl font-bold">Heading 3</h3>
                              <p className="text-xs text-muted-foreground mt-1 font-medium">2xl / Bold / 1.5rem</p>
                            </div>
                            <div className="border-b pb-2">
                              <h4 className="text-xl font-semibold">Heading 4</h4>
                              <p className="text-xs text-muted-foreground mt-1 font-medium">xl / Semibold / 1.25rem</p>
                            </div>
                            <div className="border-b pb-2">
                              <h5 className="text-lg font-semibold">Heading 5</h5>
                              <p className="text-xs text-muted-foreground mt-1 font-medium">lg / Semibold / 1.125rem</p>
                            </div>
                            <div className="border-b pb-2">
                              <h6 className="text-base font-semibold">Heading 6</h6>
                              <p className="text-xs text-muted-foreground mt-1 font-medium">base / Semibold / 1rem</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </TabsContent>
                    
                    <TabsContent value="content">
                      <Card>
                        <CardHeader>
                          <CardTitle>Content Scale</CardTitle>
                          <CardDescription>Marketing & editorial typography</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-4">
                            <div className="border-b pb-3">
                              <div className="text-5xl font-bold">Headline XL</div>
                              <p className="text-xs text-muted-foreground mt-1 font-medium">Landing page heroes</p>
                            </div>
                            <div className="border-b pb-3">
                              <div className="text-4xl font-bold">Headline L</div>
                              <p className="text-xs text-muted-foreground mt-1 font-medium">Article headlines</p>
                            </div>
                            <div className="border-b pb-3">
                              <div className="text-3xl font-semibold">Headline M</div>
                              <p className="text-xs text-muted-foreground mt-1 font-medium">Section headers</p>
                            </div>
                            <div className="border-b pb-3">
                              <div className="text-2xl font-semibold">Headline S</div>
                              <p className="text-xs text-muted-foreground mt-1 font-medium">Content headers</p>
                            </div>
                            <div className="border-b pb-3">
                              <div className="text-xl font-medium">Subheadline</div>
                              <p className="text-xs text-muted-foreground mt-1 font-medium">Supporting content</p>
                            </div>
                            <div>
                              <div className="text-base">Body Copy</div>
                              <p className="text-xs text-muted-foreground mt-1 font-medium">Main content text</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </TabsContent>
                  </Tabs>
                </div>
                
                <div className="mt-8 space-y-4">
                  <h3 className="text-xl font-semibold">Typography Usage Guidelines</h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <Card>
                      <CardHeader>
                        <CardTitle>Product Typography</CardTitle>
                        <CardDescription>For interfaces, dashboards, and applications</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <p>The <strong>Interface Scale</strong> is designed for product interfaces with a focus on:</p>
                          <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
                            <li>Readability at smaller sizes</li>
                            <li>Clear information hierarchy</li>
                            <li>Consistent spacing and alignment</li>
                            <li>Semantic HTML structure (h1-h6)</li>
                          </ul>
                          <div className="border-t pt-4 mt-4">
                            <h4 className="font-medium mb-2">When to use:</h4>
                            <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
                              <li>Dashboards and data-heavy interfaces</li>
                              <li>Forms and interactive components</li>
                              <li>Navigation and system UI</li>
                              <li>User account areas</li>
                            </ul>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardHeader>
                        <CardTitle>Marketing Typography</CardTitle>
                        <CardDescription>For websites, landing pages, and campaigns</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <p>The <strong>Content Scale</strong> is designed for marketing contexts with a focus on:</p>
                          <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
                            <li>Visual impact and brand expression</li>
                            <li>Larger, more expressive headlines</li>
                            <li>Varied font weights for emphasis</li>
                            <li>Flexible sizing for responsive layouts</li>
                          </ul>
                          <div className="border-t pt-4 mt-4">
                            <h4 className="font-medium mb-2">When to use:</h4>
                            <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
                              <li>Landing pages and marketing sites</li>
                              <li>Blog posts and editorial content</li>
                              <li>Campaign materials and promotions</li>
                              <li>Brand-focused communications</li>
                            </ul>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                  
                  <div className="bg-muted/30 p-6 rounded-lg border mt-6">
                    <h4 className="text-base font-medium mb-3">Typography Pairing Recommendations</h4>
                    <div className="space-y-3 text-sm">
                      <div className="pb-3 border-b">
                        <div className="text-base font-semibold mb-1">Serif Headlines + Sans-Serif Body</div>
                        <p className="text-muted-foreground">Classic combination that balances traditional authority with modern readability. Ideal for editorial and professional contexts.</p>
                      </div>
                      <div className="pb-3 border-b">
                        <div className="text-base font-semibold mb-1">Sans-Serif Headlines + Serif Body</div>
                        <p className="text-muted-foreground">Modern approach that uses clean headlines with a more readable body text. Works well for digital magazines and blogs.</p>
                      </div>
                      <div>
                        <div className="text-base font-semibold mb-1">Display + Sans-Serif</div>
                        <p className="text-muted-foreground">High-contrast pairing that uses distinctive headlines with highly readable body text. Great for marketing campaigns and landing pages.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Section>

            {/* Colors Section */}
            <Section 
              id="colors"
              title="Colors"
              description="Color palette and usage guidelines for consistent brand expression"
            >
              <div className="space-y-8">
                <Card className="mb-8">
                  <CardHeader>
                    <CardTitle>Color System</CardTitle>
                    <CardDescription>A systematic approach to color with semantic meaning and visual harmony</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="prose dark:prose-invert max-w-none">
                      <p>
                        Our color system is built on a foundation of primary brand colors, supported by a carefully selected palette of neutrals and functional colors that work together to create a cohesive visual language.
                      </p>
                      
                      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <h3 className="text-xl font-semibold mb-3">Color Principles</h3>
                          <ul className="space-y-2">
                            <li className="flex items-start gap-2">
                              <div className="h-5 w-5 flex-shrink-0 rounded-full bg-primary/20 flex items-center justify-center text-primary text-xs mt-0.5">1</div>
                              <span><strong>Accessibility:</strong> All color combinations meet WCAG 2.1 AA standards for contrast</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <div className="h-5 w-5 flex-shrink-0 rounded-full bg-primary/20 flex items-center justify-center text-primary text-xs mt-0.5">2</div>
                              <span><strong>Consistency:</strong> Colors are applied consistently to reinforce meaning</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <div className="h-5 w-5 flex-shrink-0 rounded-full bg-primary/20 flex items-center justify-center text-primary text-xs mt-0.5">3</div>
                              <span><strong>Hierarchy:</strong> Color helps establish visual hierarchy and guide attention</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <div className="h-5 w-5 flex-shrink-0 rounded-full bg-primary/20 flex items-center justify-center text-primary text-xs mt-0.5">4</div>
                              <span><strong>Flexibility:</strong> The system works across light and dark modes</span>
                            </li>
                          </ul>
                        </div>
                        
                        <div>
                          <h3 className="text-xl font-semibold mb-3">Color Categories</h3>
                          <ul className="space-y-2">
                            <li className="flex items-start gap-2">
                              <div className="h-5 w-5 flex-shrink-0 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-xs mt-0.5">P</div>
                              <span><strong>Primary:</strong> Core brand colors that represent the brand identity</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <div className="h-5 w-5 flex-shrink-0 rounded-full bg-secondary flex items-center justify-center text-secondary-foreground text-xs mt-0.5">S</div>
                              <span><strong>Secondary:</strong> Supporting colors that complement primary colors</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <div className="h-5 w-5 flex-shrink-0 rounded-full bg-muted flex items-center justify-center text-muted-foreground text-xs mt-0.5">N</div>
                              <span><strong>Neutrals:</strong> Grayscale colors for text, backgrounds, and UI elements</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <div className="h-5 w-5 flex-shrink-0 rounded-full bg-destructive flex items-center justify-center text-destructive-foreground text-xs mt-0.5">F</div>
                              <span><strong>Functional:</strong> Colors that convey specific meanings (success, warning, error)</span>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <div>
                  <h3 className="text-2xl font-semibold mb-4">Color Palette</h3>
                  
                  <Tabs defaultValue="primary">
                    <TabsList className="mb-6">
                      <TabsTrigger value="primary">Primary</TabsTrigger>
                      <TabsTrigger value="ui">UI Colors</TabsTrigger>
                      <TabsTrigger value="semantic">Semantic</TabsTrigger>
                      <TabsTrigger value="neutrals">Neutrals</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="primary">
                      <div>
                        <h4 className="text-xl font-semibold mb-3">Primary Colors</h4>
                        <p className="text-muted-foreground mb-4">Our primary brand colors with their various shades and tints</p>
                        
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
                          <ColorSwatch color="bg-primary" name="Primary" value="bg-primary" />
                          <ColorSwatch color="bg-primary/90" name="Primary 90%" value="bg-primary/90" />
                          <ColorSwatch color="bg-primary/80" name="Primary 80%" value="bg-primary/80" />
                          <ColorSwatch color="bg-primary/70" name="Primary 70%" value="bg-primary/70" />
                          <ColorSwatch color="bg-primary/50" name="Primary 50%" value="bg-primary/50" />
                          <ColorSwatch color="bg-primary/20" name="Primary 20%" value="bg-primary/20" />
                        </div>
                        
                        <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
                          <ColorSwatch color="bg-secondary" name="Secondary" value="bg-secondary" />
                          <ColorSwatch color="bg-secondary/90" name="Secondary 90%" value="bg-secondary/90" />
                          <ColorSwatch color="bg-secondary/80" name="Secondary 80%" value="bg-secondary/80" />
                          <ColorSwatch color="bg-secondary/70" name="Secondary 70%" value="bg-secondary/70" />
                          <ColorSwatch color="bg-secondary/50" name="Secondary 50%" value="bg-secondary/50" />
                          <ColorSwatch color="bg-secondary/20" name="Secondary 20%" value="bg-secondary/20" />
                        </div>
                        
                        <div className="mt-6 p-4 bg-muted/30 rounded-lg">
                          <h5 className="font-medium mb-2">Usage Guidelines</h5>
                          <ul className="text-sm space-y-1">
                            <li>• Use primary colors for main actions, key UI elements, and brand moments</li>
                            <li>• Secondary colors complement primary colors and provide visual interest</li>
                            <li>• Use lighter tints for backgrounds and hover states</li>
                            <li>• Ensure sufficient contrast with text colors</li>
                          </ul>
                        </div>
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="ui">
                      <div>
                        <h4 className="text-xl font-semibold mb-3">UI Colors</h4>
                        <p className="text-muted-foreground mb-4">Colors used for interface elements and components</p>
                        
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                          <ColorSwatch color="bg-background" name="Background" value="bg-background" />
                          <ColorSwatch color="bg-foreground" name="Foreground" value="bg-foreground" />
                          <ColorSwatch color="bg-card" name="Card" value="bg-card" />
                          <ColorSwatch color="bg-card-foreground" name="Card Foreground" value="bg-card-foreground" />
                          <ColorSwatch color="bg-popover" name="Popover" value="bg-popover" />
                          <ColorSwatch color="bg-popover-foreground" name="Popover FG" value="bg-popover-foreground" />
                          <ColorSwatch color="bg-muted" name="Muted" value="bg-muted" />
                          <ColorSwatch color="bg-muted-foreground" name="Muted FG" value="bg-muted-foreground" />
                          <ColorSwatch color="bg-accent" name="Accent" value="bg-accent" />
                          <ColorSwatch color="bg-accent-foreground" name="Accent FG" value="bg-accent-foreground" />
                          <ColorSwatch color="bg-border" name="Border" value="bg-border" />
                          <ColorSwatch color="bg-input" name="Input" value="bg-input" />
                        </div>
                        
                        <div className="mt-6 p-4 bg-muted/30 rounded-lg">
                          <h5 className="font-medium mb-2">UI Color Principles</h5>
                          <ul className="text-sm space-y-1">
                            <li>• Background and foreground colors provide the foundation for content</li>
                            <li>• Card and popover colors create layering and depth</li>
                            <li>• Muted colors reduce visual prominence for secondary elements</li>
                            <li>• Accent colors highlight interactive elements</li>
                          </ul>
                        </div>
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="semantic">
                      <div>
                        <h4 className="text-xl font-semibold mb-3">Semantic Colors</h4>
                        <p className="text-muted-foreground mb-4">Colors that convey specific meanings and states</p>
                        
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                          <ColorSwatch color="bg-destructive" name="Destructive" value="bg-destructive" />
                          <ColorSwatch color="bg-destructive-foreground" name="Destructive FG" value="bg-destructive-foreground" />
                          <ColorSwatch color="bg-success" name="Success" value="bg-success" />
                          <ColorSwatch color="bg-success-foreground" name="Success FG" value="bg-success-foreground" />
                          <ColorSwatch color="bg-warning" name="Warning" value="bg-warning" />
                          <ColorSwatch color="bg-warning-foreground" name="Warning FG" value="bg-warning-foreground" />
                          <ColorSwatch color="bg-info" name="Info" value="bg-info" />
                          <ColorSwatch color="bg-info-foreground" name="Info FG" value="bg-info-foreground" />
                        </div>
                        
                        <div className="mt-8">
                          <h5 className="font-medium mb-3">Semantic Color Applications</h5>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <Card className="overflow-hidden">
                              <div className="p-4 bg-destructive/10 border-l-4 border-destructive">
                                <div className="font-medium text-destructive mb-1">Error State</div>
                                <p className="text-sm">Used to indicate errors, destructive actions, or critical issues that require attention.</p>
                              </div>
                            </Card>
                            
                            <Card className="overflow-hidden">
                              <div className="p-4 bg-success/10 border-l-4 border-success">
                                <div className="font-medium text-success mb-1">Success State</div>
                                <p className="text-sm">Used to indicate successful operations, completed tasks, or positive outcomes.</p>
                              </div>
                            </Card>
                            
                            <Card className="overflow-hidden">
                              <div className="p-4 bg-warning/10 border-l-4 border-warning">
                                <div className="font-medium text-warning mb-1">Warning State</div>
                                <p className="text-sm">Used to indicate potential issues, actions that need caution, or important notices.</p>
                              </div>
                            </Card>
                            
                            <Card className="overflow-hidden">
                              <div className="p-4 bg-info/10 border-l-4 border-info">
                                <div className="font-medium text-info mb-1">Information State</div>
                                <p className="text-sm">Used to provide neutral information, tips, or general guidance to users.</p>
                              </div>
                            </Card>
                          </div>
                        </div>
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="neutrals">
                      <div>
                        <h4 className="text-xl font-semibold mb-3">Neutral Colors</h4>
                        <p className="text-muted-foreground mb-4">Grayscale colors for text, backgrounds, and UI elements</p>
                        
                        <div className="grid grid-cols-1 gap-4">
                          <div className="flex flex-col md:flex-row gap-4">
                            <div className="flex-1 p-4 rounded-lg bg-background border">
                              <div className="font-medium mb-1">Background</div>
                              <div className="text-sm text-muted-foreground">bg-background</div>
                            </div>
                            <div className="flex-1 p-4 rounded-lg bg-muted border">
                              <div className="font-medium mb-1">Muted</div>
                              <div className="text-sm text-muted-foreground">bg-muted</div>
                            </div>
                            <div className="flex-1 p-4 rounded-lg bg-card border">
                              <div className="font-medium mb-1">Card</div>
                              <div className="text-sm text-muted-foreground">bg-card</div>
                            </div>
                            <div className="flex-1 p-4 rounded-lg bg-popover border">
                              <div className="font-medium mb-1">Popover</div>
                              <div className="text-sm text-muted-foreground">bg-popover</div>
                            </div>
                          </div>
                          
                          <div className="flex flex-col md:flex-row gap-4">
                            <div className="flex-1 p-4 rounded-lg bg-border border">
                              <div className="font-medium mb-1">Border</div>
                              <div className="text-sm">bg-border</div>
                            </div>
                            <div className="flex-1 p-4 rounded-lg bg-input border">
                              <div className="font-medium mb-1">Input</div>
                              <div className="text-sm">bg-input</div>
                            </div>
                            <div className="flex-1 p-4 rounded-lg bg-ring border">
                              <div className="font-medium mb-1">Ring</div>
                              <div className="text-sm">bg-ring</div>
                            </div>
                            <div className="flex-1 p-4 rounded-lg bg-foreground text-background border">
                              <div className="font-medium mb-1">Foreground</div>
                              <div className="text-sm opacity-80">bg-foreground</div>
                            </div>
                          </div>
                        </div>
                        
                        <div className="mt-6 p-4 bg-muted/30 rounded-lg">
                          <h5 className="font-medium mb-2">Neutral Color Usage</h5>
                          <ul className="text-sm space-y-1">
                            <li>• Use neutrals as the foundation of your interface</li>
                            <li>• Create subtle depth with different neutral values</li>
                            <li>• Ensure sufficient contrast between text and background</li>
                            <li>• Neutrals should support content without competing for attention</li>
                          </ul>
                        </div>
                      </div>
                    </TabsContent>
                  </Tabs>
                </div>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Color Accessibility</CardTitle>
                    <CardDescription>Ensuring colors meet accessibility standards</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="prose dark:prose-invert max-w-none">
                      <p>
                        All color combinations in our design system meet WCAG 2.1 AA standards for contrast. This ensures that text and interactive elements are perceivable by users with various visual abilities.
                      </p>
                      
                      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="p-4 border rounded-lg">
                          <h4 className="text-lg font-medium mb-2">Text Contrast</h4>
                          <div className="space-y-4">
                            <div className="p-3 bg-primary">
                              <p className="text-primary-foreground font-medium">Primary with contrast text</p>
                            </div>
                            <div className="p-3 bg-secondary">
                              <p className="text-secondary-foreground font-medium">Secondary with contrast text</p>
                            </div>
                            <div className="p-3 bg-muted">
                              <p className="text-muted-foreground font-medium">Muted with contrast text</p>
                            </div>
                          </div>
                        </div>
                        
                        <div className="p-4 border rounded-lg">
                          <h4 className="text-lg font-medium mb-2">Interactive Elements</h4>
                          <div className="space-y-4">
                            <Button variant="default" className="w-full justify-start">Primary Button</Button>
                            <Button variant="secondary" className="w-full justify-start">Secondary Button</Button>
                            <Button variant="destructive" className="w-full justify-start">Destructive Button</Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </Section>

            {/* Layout Section */}
            <Section 
              id="layout"
              title="Layout"
              description="Layout components and spacing guidelines"
            >
              <ComponentPreview 
                title="Spacing Scale" 
                description="Consistent spacing values used throughout the design system"
              >
                <div className="space-y-4">
                  {[1, 2, 3, 4, 6, 8, 12, 16].map((space) => (
                    <div key={space} className="flex items-center">
                      <div className={`h-4 bg-primary rounded`} style={{ width: `${space * 0.25}rem` }} />
                      <span className="ml-4 text-sm">
                        {space} ({space * 4}px / {space * 0.25}rem)
                      </span>
                    </div>
                  ))}
                </div>
              </ComponentPreview>
              
              <ComponentPreview 
                title="Grid System" 
                description="Responsive grid layout examples"
              >
                <div className="grid grid-cols-12 gap-4">
                  {Array.from({ length: 12 }).map((_, i) => (
                    <div key={i} className="h-12 bg-primary/20 flex items-center justify-center rounded">
                      <span className="text-xs">{i + 1}</span>
                    </div>
                  ))}
                  
                  <div className="col-span-6 h-12 bg-primary/30 flex items-center justify-center rounded">
                    <span className="text-xs">6 cols</span>
                  </div>
                  <div className="col-span-6 h-12 bg-primary/30 flex items-center justify-center rounded">
                    <span className="text-xs">6 cols</span>
                  </div>
                  
                  <div className="col-span-4 h-12 bg-primary/40 flex items-center justify-center rounded">
                    <span className="text-xs">4 cols</span>
                  </div>
                  <div className="col-span-4 h-12 bg-primary/40 flex items-center justify-center rounded">
                    <span className="text-xs">4 cols</span>
                  </div>
                  <div className="col-span-4 h-12 bg-primary/40 flex items-center justify-center rounded">
                    <span className="text-xs">4 cols</span>
                  </div>
                </div>
              </ComponentPreview>
            </Section>

            {/* Forms Section */}
            <Section 
              id="forms"
              title="Forms"
              description="Form components and input controls"
            >
              <ComponentPreview 
                title="Input Components" 
                description="Basic input controls for forms"
              >
                <div className="space-y-6 max-w-md">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" placeholder="Enter your email" type="email" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <Input id="password" placeholder="Enter your password" type="password" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="country">Country</Label>
                    <Select>
                      <SelectTrigger id="country">
                        <SelectValue placeholder="Select a country" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="us">United States</SelectItem>
                        <SelectItem value="ca">Canada</SelectItem>
                        <SelectItem value="uk">United Kingdom</SelectItem>
                        <SelectItem value="au">Australia</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <Button className="w-full">Submit</Button>
                </div>
              </ComponentPreview>
            </Section>

            {/* Patterns Section */}
            <Section 
              id="patterns"
              title="Patterns"
              description="Common UI patterns and compositions"
            >
              <ComponentPreview 
                title="Sign In Form" 
                description="Standard sign in form pattern"
              >
                <div className="space-y-6 max-w-md mx-auto">
                  <div className="text-center">
                    <h3 className="text-2xl font-bold">Sign In</h3>
                    <p className="text-muted-foreground">Enter your credentials to access your account</p>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="signin-email">Email</Label>
                      <Input id="signin-email" placeholder="name@example.com" type="email" />
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="signin-password">Password</Label>
                        <Button variant="link" className="p-0 h-auto">Forgot password?</Button>
                      </div>
                      <Input id="signin-password" placeholder="••••••••" type="password" />
                    </div>
                    
                    <Button className="w-full">Sign In</Button>
                  </div>
                  
                  <div className="text-center text-sm">
                    <span className="text-muted-foreground">Don't have an account? </span>
                    <Button variant="link" className="p-0 h-auto">Sign up</Button>
                  </div>
                </div>
              </ComponentPreview>
              
              <ComponentPreview 
                title="Card Grid" 
                description="Grid of cards for displaying content collections"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {Array.from({ length: 3 }).map((_, i) => (
                    <Card key={i}>
                      <div className="h-40 bg-muted" />
                      <CardContent className="p-4">
                        <h4 className="font-semibold">Card Title {i + 1}</h4>
                        <p className="text-sm text-muted-foreground">Card description and details go here.</p>
                      </CardContent>
                      <CardFooter className="p-4 pt-0">
                        <Button variant="outline" size="sm">View Details</Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </ComponentPreview>
            </Section>

            {/* Theming Section */}
            <Section 
              id="theming"
              title="Theming"
              description="Theme customization and guidelines"
            >
              <Callout>
                <p>Our design system supports both light and dark modes, as well as custom themes.</p>
              </Callout>
              
              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Light & Dark Modes</CardTitle>
                    <CardDescription>
                      Built-in support for light and dark color schemes
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p>Toggle between light and dark modes using the theme switcher in the header.</p>
                    <div className="mt-4">
                      <ThemeToggle />
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Custom Themes</CardTitle>
                    <CardDescription>
                      Create and apply custom themes to match your brand
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p>Our theming system allows for complete customization of colors, typography, and other design tokens.</p>
                    <Button className="mt-4" variant="outline">
                      <PaintBrushIcon className="h-4 w-4 mr-2" />
                      Theme Editor
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </Section>
          </main>
        </div>
      </div>
    </div>
  );
};

export default DesignDocsPage;
