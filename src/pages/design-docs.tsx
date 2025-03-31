import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { TypeIcon, LayoutIcon, BoxIcon, CircleIcon } from "lucide-react";
import { XMarkIcon, Bars3Icon } from "@heroicons/react/24/outline";

// Main Design Docs Page
const DesignDocsPage = () => {
  const [activeSection, setActiveSection] = useState("overview");
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // Navigation items
  const navItems = [
    { 
      id: "overview", 
      label: "Overview", 
      icon: <TypeIcon className="h-5 w-5" />,
      subsections: [
        { id: "overview-components", label: "Components" },
        { id: "overview-tokens", label: "Design Tokens" }
      ]
    },
    { 
      id: "typography", 
      label: "Typography", 
      icon: <TypeIcon className="h-5 w-5" />,
      subsections: [
        { id: "typography-philosophy", label: "Philosophy" },
        { id: "typography-system", label: "System Architecture" },
        { id: "typography-html", label: "HTML Elements" },
        { id: "typography-semantic", label: "Semantic Scale" },
        { id: "typography-usage", label: "Usage Guidelines" }
      ]
    },
    { 
      id: "colors", 
      label: "Colors", 
      icon: <CircleIcon className="h-5 w-5" />,
      subsections: [
        { id: "colors-palette", label: "Color Palette" },
        { id: "colors-semantic", label: "Semantic Colors" },
      ]
    },
    { 
      id: "base", 
      label: "Base Components", 
      icon: <BoxIcon className="h-5 w-5" />,
      subsections: [
        { id: "base-buttons", label: "Buttons" },
        { id: "base-inputs", label: "Inputs" },
      ]
    },
    { 
      id: "components", 
      label: "Components", 
      icon: <LayoutIcon className="h-5 w-5" />,
      subsections: [
        { id: "components-buttons", label: "Buttons" },
        { id: "components-cards", label: "Cards" },
        { id: "components-dialogs", label: "Dialogs" },
        { id: "components-forms", label: "Forms" },
      ]
    },
    { 
      id: "patterns", 
      label: "Patterns", 
      icon: <LayoutIcon className="h-5 w-5" />,
      subsections: [
        { id: "patterns-signin", label: "Sign In Form" },
        { id: "patterns-cardgrid", label: "Card Grid" }
      ]
    },
    { 
      id: "utilities", 
      label: "Utilities", 
      icon: <LayoutIcon className="h-5 w-5" />,
      subsections: []
    },
  ];
  
  // Handle navigation click
  const handleNavClick = (id: string) => {
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  // Update active section based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      // Find the section that is currently in view
      const currentSection = Object.entries(sectionRefs.current)
        .reverse()
        .find(([_, element]) => {
          if (!element) return false;
          const { top } = element.getBoundingClientRect();
          return top <= 100;
        });
      
      if (currentSection) {
        setActiveSection(currentSection[0]);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    
    // Initial check to set the active section
    setTimeout(handleScroll, 100);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  // Section component
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
    const ref = useRef<HTMLElement>(null);
    
    useEffect(() => {
      if (ref.current) {
        sectionRefs.current[id] = ref.current;
      }
    }, [id]);
    
    return (
      <section
        id={id}
        ref={ref}
        className="mb-16 scroll-mt-16"
        {...props}
      >
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-2">{title}</h2>
          {description && (
            <p className="text-xl text-muted-foreground">{description}</p>
          )}
        </div>
        {children}
      </section>
    );
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border sticky top-0 z-10 bg-background" data-component="header" role="banner">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold">Design System</h1>
        </div>
      </header>

      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row">
          {/* Sidebar Navigation */}
          <div className="lg:w-64 lg:shrink-0 lg:h-[calc(100vh-4rem)] lg:sticky lg:top-16 hidden lg:block" data-component="sidebar">
            <div className="py-8 pr-4">
              <nav className="space-y-1" role="navigation" aria-label="Main Navigation">
                {navItems.map((section) => (
                  <div key={section.id} className="mb-2">
                    <a
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
                    
                    {/* Subsections */}
                    {section.subsections && section.subsections.length > 0 && (
                      <div className={cn(
                        "pl-8 mt-1 space-y-1",
                        activeSection === section.id ? "block" : "hidden"
                      )}>
                        {section.subsections.map((subsection) => (
                          <a
                            key={subsection.id}
                            href={`#${subsection.id}`}
                            onClick={(e) => {
                              e.preventDefault();
                              const element = document.getElementById(subsection.id);
                              if (element) {
                                element.scrollIntoView({ behavior: 'smooth' });
                              }
                            }}
                            className="flex items-center text-sm py-1 px-3 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted/50"
                          >
                            {subsection.label}
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </nav>
            </div>
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
          <div className="w-full lg:pl-8">
            <main className="pt-8 pb-16" data-component="main-content" role="main">
              {/* Overview Section */}
              <Section 
                id="overview" 
                title="Design System Overview" 
                description="A comprehensive guide to our design system components, patterns, and principles."
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card id="overview-components">
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
                  <Card id="overview-tokens">
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

              {/* Typography Section */}
              <Section
                id="typography"
                title="Typography"
                description="Typography system and text styles for clear communication"
              >
                <div className="space-y-8">
                  {/* Typography Philosophy */}
                  <Card id="typography-philosophy">
                    <CardHeader>
                      <CardTitle>Typography Philosophy</CardTitle>
                      <CardDescription>Our approach to typography is built on clarity, hierarchy, and flexibility</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="prose dark:prose-invert max-w-none">
                        <p className="text-lg mb-4">
                          Typography is the foundation of our design system, establishing the voice and tone of our communication while ensuring readability and accessibility across all platforms and devices.
                        </p>
                        
                        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                          <div className="space-y-2">
                            <h4 className="font-medium">Core Principles</h4>
                            <ul className="text-sm space-y-2">
                              <li><strong>Decoupled Semantics:</strong> HTML semantics are separated from visual styling</li>
                              <li><strong>Hierarchical Clarity:</strong> Clear visual hierarchy guides users through content</li>
                              <li><strong>Responsive Scaling:</strong> Typography adapts fluidly across device sizes</li>
                              <li><strong>Accessibility First:</strong> Meets WCAG standards for readability and contrast</li>
                              <li><strong>Consistent Rhythm:</strong> Harmonious spacing and line heights</li>
                            </ul>
                          </div>
                          
                          <div className="space-y-2">
                            <h4 className="font-medium">Implementation Approach</h4>
                            <ul className="text-sm space-y-2">
                              <li><strong>Component-Based:</strong> Typography elements are React components with consistent APIs</li>
                              <li><strong>Semantic Flexibility:</strong> Components can render any HTML element while maintaining visual styling</li>
                              <li><strong>Tailwind Integration:</strong> Leverages Tailwind's utility classes for styling</li>
                              <li><strong>Themeable:</strong> Adapts to light/dark modes and custom themes</li>
                              <li><strong>Composition:</strong> Components can be composed for complex layouts</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Typography System Architecture */}
                  <Card id="typography-system">
                    <CardHeader>
                      <CardTitle>System Architecture</CardTitle>
                      <CardDescription>How our typography system is structured for growth and customization</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="prose dark:prose-invert max-w-none">
                        <p className="text-lg mb-4">
                          Our typography system is designed as a composable, extensible foundation that can be customized and expanded while maintaining consistency.
                        </p>
                        
                        <div className="bg-muted p-6 rounded-md mb-6">
                          <h4 className="text-xl font-medium mb-3">Decoupled Architecture</h4>
                          <p className="text-base mb-4">
                            We've intentionally decoupled semantic HTML elements from their visual styling. This means:
                          </p>
                          <ul className="space-y-2 mb-4">
                            <li className="flex gap-2">
                              <span className="text-primary">•</span>
                              <span>HTML elements have minimal base styling</span>
                            </li>
                            <li className="flex gap-2">
                              <span className="text-primary">•</span>
                              <span>Typography components control visual appearance</span>
                            </li>
                            <li className="flex gap-2">
                              <span className="text-primary">•</span>
                              <span>You can use any semantic element with any visual style</span>
                            </li>
                            <li className="flex gap-2">
                              <span className="text-primary">•</span>
                              <span>Example: <code>&lt;Heading as="h1" variant="display"&gt;</code> uses h1 semantics with display styling</span>
                            </li>
                          </ul>
                          <p className="text-base">
                            This approach maximizes flexibility while maintaining proper semantics and accessibility.
                          </p>
                        </div>
                        
                        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="border p-4 rounded-md">
                            <h4 className="text-lg font-semibold mb-2">Lockups & Patterns</h4>
                            <p className="text-base">
                              Consistent text combinations for common UI elements:
                            </p>
                            <ul className="mt-2 space-y-1 text-base">
                              <li>• Card headers with title + description</li>
                              <li>• Form labels with optional helpers</li>
                              <li>• Section headings with subtext</li>
                              <li>• Navigation items with indicators</li>
                            </ul>
                          </div>
                          
                          <div className="border p-4 rounded-md">
                            <h4 className="text-lg font-semibold mb-2">System Extensibility</h4>
                            <p className="text-base">
                              Ways to extend the typography system:
                            </p>
                            <ul className="mt-2 space-y-1 text-base">
                              <li>• Add new font families</li>
                              <li>• Modify the type scale</li>
                              <li>• Create custom text styles</li>
                              <li>• Adjust baseline measurements</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* HTML Elements */}
                  <Card id="typography-html">
                    <CardHeader>
                      <CardTitle>HTML Elements</CardTitle>
                      <CardDescription>Minimal base styling for semantic HTML elements</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-lg mb-4">
                        Our HTML elements have minimal base styling to provide a clean foundation. Visual styling is primarily handled by our typography components.
                      </p>
                      <div className="bg-muted p-6 rounded-md mb-6">
                        <h4 className="text-xl font-medium mb-3">Base HTML Styling Philosophy</h4>
                        <p className="text-base mb-4">
                          We apply minimal styling to HTML elements to avoid conflicts with our component system:
                        </p>
                        <ul className="space-y-2">
                          <li className="flex gap-2">
                            <span className="text-primary">•</span>
                            <span>Font sizes follow a natural hierarchy but are kept minimal</span>
                          </li>
                          <li className="flex gap-2">
                            <span className="text-primary">•</span>
                            <span>Font weights are intentionally light to avoid feeling heavy</span>
                          </li>
                          <li className="flex gap-2">
                            <span className="text-primary">•</span>
                            <span>Line heights ensure readability but don't impose strict rhythm</span>
                          </li>
                          <li className="flex gap-2">
                            <span className="text-primary">•</span>
                            <span>Margins provide basic spacing but are designed to be overridden</span>
                          </li>
                        </ul>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-6">
                          <div className="border p-4 rounded-md">
                            <h1 className="text-4xl">Heading 1</h1>
                            <div className="flex items-center mt-2 text-muted-foreground">
                              <span className="px-2 py-1 bg-background rounded text-sm">4xl</span>
                              <span className="mx-2">•</span>
                              <span className="px-2 py-1 bg-background rounded text-sm">Normal weight</span>
                              <span className="mx-2">•</span>
                              <span className="px-2 py-1 bg-background rounded text-sm">2.25rem</span>
                            </div>
                          </div>
                          
                          <div className="border p-4 rounded-md">
                            <h2 className="text-3xl">Heading 2</h2>
                            <div className="flex items-center mt-2 text-muted-foreground">
                              <span className="px-2 py-1 bg-background rounded text-sm">3xl</span>
                              <span className="mx-2">•</span>
                              <span className="px-2 py-1 bg-background rounded text-sm">Normal weight</span>
                              <span className="mx-2">•</span>
                              <span className="px-2 py-1 bg-background rounded text-sm">1.875rem</span>
                            </div>
                          </div>
                          
                          <div className="border p-4 rounded-md">
                            <h3 className="text-2xl">Heading 3</h3>
                            <div className="flex items-center mt-2 text-muted-foreground">
                              <span className="px-2 py-1 bg-background rounded text-sm">2xl</span>
                              <span className="mx-2">•</span>
                              <span className="px-2 py-1 bg-background rounded text-sm">Normal weight</span>
                              <span className="mx-2">•</span>
                              <span className="px-2 py-1 bg-background rounded text-sm">1.5rem</span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="space-y-6">
                          <div className="border p-4 rounded-md">
                            <h4 className="text-xl">Heading 4</h4>
                            <div className="flex items-center mt-2 text-muted-foreground">
                              <span className="px-2 py-1 bg-background rounded text-sm">xl</span>
                              <span className="mx-2">•</span>
                              <span className="px-2 py-1 bg-background rounded text-sm">Normal weight</span>
                              <span className="mx-2">•</span>
                              <span className="px-2 py-1 bg-background rounded text-sm">1.25rem</span>
                            </div>
                          </div>
                          
                          <div className="border p-4 rounded-md">
                            <h5 className="text-lg">Heading 5</h5>
                            <div className="flex items-center mt-2 text-muted-foreground">
                              <span className="px-2 py-1 bg-background rounded text-sm">lg</span>
                              <span className="mx-2">•</span>
                              <span className="px-2 py-1 bg-background rounded text-sm">Normal weight</span>
                              <span className="mx-2">•</span>
                              <span className="px-2 py-1 bg-background rounded text-sm">1.125rem</span>
                            </div>
                          </div>
                          
                          <div className="border p-4 rounded-md">
                            <h6 className="text-base">Heading 6</h6>
                            <div className="flex items-center mt-2 text-muted-foreground">
                              <span className="px-2 py-1 bg-background rounded text-sm">base</span>
                              <span className="mx-2">•</span>
                              <span className="px-2 py-1 bg-background rounded text-sm">Normal weight</span>
                              <span className="mx-2">•</span>
                              <span className="px-2 py-1 bg-background rounded text-sm">1rem</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Semantic Scale */}
                  <Card id="typography-semantic">
                    <CardHeader>
                      <CardTitle>Semantic Scale</CardTitle>
                      <CardDescription>Purpose-driven text styles for specific UI roles</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-lg mb-4">
                        Our semantic scale provides purpose-specific text styles that can be applied to any HTML element. This allows you to maintain proper semantics while achieving the desired visual style.
                      </p>
                      
                      <div className="bg-muted p-6 rounded-md mb-6">
                        <h4 className="text-xl font-medium mb-3">Component Usage</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="bg-background p-4 rounded-md">
                            <p className="text-base mb-2"><code className="text-xs bg-primary/10 p-1 rounded">Heading</code> component:</p>
                            <pre className="text-xs bg-muted p-2 rounded overflow-x-auto">
                              {`<Heading as="h1" variant="display">
  Hero Title
</Heading>

<Heading as="h2" variant="title">
  Section Title
</Heading>

<Heading as="h3" variant="heading">
  Content Heading
</Heading>`}
                            </pre>
                          </div>
                          <div className="bg-background p-4 rounded-md">
                            <p className="text-base mb-2"><code className="text-xs bg-primary/10 p-1 rounded">Text</code> component:</p>
                            <pre className="text-xs bg-muted p-2 rounded overflow-x-auto">
                              {`<Text variant="body">
  Regular paragraph text
</Text>

<Text variant="lead">
  Introductory paragraph
</Text>

<Text as="span" variant="caption">
  Small supporting text
</Text>`}
                            </pre>
                          </div>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                        <div className="border p-5 rounded-md">
                          <div className="text-5xl font-semibold">Display</div>
                          <div className="mt-3 text-base text-muted-foreground">Hero sections, major headlines</div>
                        </div>
                        
                        <div className="border p-5 rounded-md">
                          <div className="text-4xl font-semibold">Title</div>
                          <div className="mt-3 text-base text-muted-foreground">Page headers, section dividers</div>
                        </div>
                        
                        <div className="border p-5 rounded-md">
                          <div className="text-3xl font-medium">Heading</div>
                          <div className="mt-3 text-base text-muted-foreground">Content section headers</div>
                        </div>
                        
                        <div className="border p-5 rounded-md">
                          <div className="text-2xl font-medium">Subheading</div>
                          <div className="mt-3 text-base text-muted-foreground">Subsection headers, card titles</div>
                        </div>
                        
                        <div className="border p-5 rounded-md">
                          <div className="text-xl font-medium">Subtitle</div>
                          <div className="mt-3 text-base text-muted-foreground">Supporting headings, form sections</div>
                        </div>
                        
                        <div className="border p-5 rounded-md">
                          <div className="text-lg font-medium">Label</div>
                          <div className="mt-3 text-base text-muted-foreground">Form labels, small sections</div>
                        </div>
                      </div>
                      
                      <div className="bg-muted p-6 rounded-md">
                        <h4 className="text-xl font-medium mb-3">Font Weight Philosophy</h4>
                        <p className="text-lg mb-4">
                          Our system uses a balanced approach to font weights:
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="bg-background p-4 rounded-md">
                            <div className="text-lg font-bold mb-1">Bold (700)</div>
                            <p className="text-base">Reserved for specific emphasis or the most important elements</p>
                          </div>
                          <div className="bg-background p-4 rounded-md">
                            <div className="text-lg font-semibold mb-1">Semibold (600)</div>
                            <p className="text-base">Used for titles and primary headings</p>
                          </div>
                          <div className="bg-background p-4 rounded-md">
                            <div className="text-lg font-medium mb-1">Medium (500)</div>
                            <p className="text-base">Used for most headings and emphasized text</p>
                          </div>
                          <div className="bg-background p-4 rounded-md">
                            <div className="text-lg font-normal mb-1">Regular (400)</div>
                            <p className="text-base">Used for body text and general content</p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Typography Usage */}
                  <Card id="typography-usage">
                    <CardHeader>
                      <CardTitle>Typography Usage</CardTitle>
                      <CardDescription>Practical guidelines for applying our typography system</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="prose dark:prose-invert max-w-none">
                        <h3 className="text-2xl font-medium mb-4">Best Practices</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                          <div className="border p-5 rounded-md">
                            <div className="text-xl font-medium mb-3">Use semantic HTML</div>
                            <div className="bg-muted p-4 rounded-md">
                              <div className="text-base">Always use the appropriate HTML element for the content's meaning, regardless of visual style</div>
                            </div>
                          </div>
                          
                          <div className="border p-5 rounded-md">
                            <div className="text-xl font-medium mb-3">Limit font weights</div>
                            <div className="bg-muted p-4 rounded-md">
                              <div className="text-base">Avoid overusing bold weights; prefer medium or semibold for most headings</div>
                            </div>
                          </div>
                          
                          <div className="border p-5 rounded-md">
                            <div className="text-xl font-medium mb-3">Maintain hierarchy</div>
                            <div className="bg-muted p-4 rounded-md">
                              <div className="text-base">Ensure clear visual distinction between heading levels</div>
                            </div>
                          </div>
                          
                          <div className="border p-5 rounded-md">
                            <div className="text-xl font-medium mb-3">Avoid small text</div>
                            <div className="bg-muted p-4 rounded-md">
                              <div className="text-base">Use <code>text-sm</code> sparingly and only for truly secondary information</div>
                            </div>
                          </div>
                        </div>
                        
                        <div className="bg-muted p-6 rounded-md">
                          <h4 className="text-xl font-medium mb-3">Decoupled Usage Examples</h4>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="bg-background p-4 rounded-md">
                              <p className="text-base mb-2"><strong>✅ Do:</strong> Separate semantics from styling</p>
                              <pre className="text-xs bg-muted p-2 rounded overflow-x-auto">
                                {`// Main page title with display styling
<Heading as="h1" variant="display">
  Welcome to our Platform
</Heading>

// Section title with heading styling
<Heading as="h2" variant="heading">
  Featured Content
</Heading>`}
                              </pre>
                            </div>
                            <div className="bg-background p-4 rounded-md">
                              <p className="text-base mb-2"><strong>❌ Don't:</strong> Rely on HTML for styling</p>
                              <pre className="text-xs bg-muted p-2 rounded overflow-x-auto">
                                {`// Incorrect: Using h3 just for its styling
<h3>This is not a heading</h3>

// Incorrect: Using div instead of proper heading
<div className="text-3xl font-medium">
  This should be a heading
</div>`}
                              </pre>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </Section>
            </main>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DesignDocsPage;
