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
        { id: "typography-foundations", label: "Foundations" },
        { id: "typography-system", label: "System Architecture" },
        { id: "typography-semantic-scale", label: "Semantic Scale" },
        { id: "typography-html", label: "HTML Elements" },
        { id: "typography-usage", label: "Usage Guidelines" },
        { id: "typography-semantic-markup", label: "Semantic Markup Best Practices" },
        { id: "typography-relationships", label: "Typography Relationships" },
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
                            <ul className="space-y-2">
                              <li><strong>Relational Design:</strong> Typography elements are defined by their relationship to each other, not fixed styles</li>
                              <li><strong>Decoupled Semantics:</strong> HTML semantics are separated from visual styling</li>
                              <li><strong>Hierarchical Clarity:</strong> Clear visual hierarchy guides users through content</li>
                              <li><strong>Responsive Scaling:</strong> Typography adapts fluidly across device sizes</li>
                              <li><strong>Accessibility First:</strong> Meets WCAG standards for readability and contrast</li>
                              <li><strong>Consistent Rhythm:</strong> Harmonious spacing and line heights</li>
                            </ul>
                          </div>
                          
                          <div className="space-y-2">
                            <h4 className="font-medium">Implementation Approach</h4>
                            <ul className="space-y-2">
                              <li><strong>Component-Based:</strong> Typography elements are React components with consistent APIs</li>
                              <li><strong>Contextual Adaptation:</strong> Elements adjust their styling based on their context and relationship to other elements</li>
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

                  {/* Typography Foundations */}
                  <Card id="typography-foundations">
                    <CardHeader>
                      <CardTitle>Foundations</CardTitle>
                      <CardDescription>Understanding the basics of typography</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="prose dark:prose-invert max-w-none">
                        <p className="text-lg mb-4">
                          Our typography system is built on a set of foundational principles that ensure clarity, readability, and accessibility.
                        </p>
                        
                        <div className="bg-muted p-6 rounded-md mb-6">
                          <h4 className="text-xl font-medium mb-3">Typefaces</h4>
                          <p className="text-lg mb-4">
                            We use a custom typeface designed specifically for our brand, optimized for digital interfaces.
                          </p>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="bg-background p-4 rounded-md">
                              <div className="text-lg font-medium mb-2">Font Family</div>
                              <p className="text-base">Our custom typeface is designed for optimal readability on digital screens</p>
                            </div>
                            <div className="bg-background p-4 rounded-md">
                              <div className="text-lg font-medium mb-2">Fallback Fonts</div>
                              <p className="text-base">In case our custom typeface is not available, we use a system font stack for fallback</p>
                            </div>
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
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="bg-background p-4 rounded-md">
                              <div className="text-lg font-medium mb-2">Base HTML Elements</div>
                              <p className="text-base">Semantic HTML with minimal styling</p>
                              <div className="mt-3 text-base">
                                <code>&lt;h1&gt;Heading 1&lt;/h1&gt;</code><br />
                                <code>&lt;h2&gt;Heading 2&lt;/h2&gt;</code><br />
                                <code>&lt;h3&gt;Heading 3&lt;/h3&gt;</code>
                              </div>
                            </div>
                            <div className="bg-background p-4 rounded-md">
                              <div className="text-lg font-medium mb-2">Styled Components</div>
                              <p className="text-base">Components with specific visual styling</p>
                              <div className="mt-3 text-base">
                                <code>&lt;Heading as="h1" variant="display"&gt;</code><br />
                                <code>&lt;Heading as="h2" variant="title"&gt;</code><br />
                                <code>&lt;Text variant="lead"&gt;</code>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="border p-4 rounded-md">
                            <h4 className="text-lg font-medium">Lockups & Patterns</h4>
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
                            <h4 className="text-lg font-medium">System Extensibility</h4>
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

                  {/* Semantic Scale */}
                  <Card id="typography-semantic-scale">
                    <CardHeader>
                      <CardTitle>Semantic Scale</CardTitle>
                      <CardDescription>Purpose-driven text styles for specific UI roles</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-lg mb-4">
                        Our semantic scale provides purpose-specific text styles that can be applied to any HTML element. These styles are defined by their relationship to each other and can adapt based on context.
                      </p>
                      
                      <div className="bg-muted p-6 rounded-md mb-6">
                        <h4 className="text-xl font-medium mb-3">Relational Typography</h4>
                        <p className="text-base mb-4">
                          Typography elements are defined by their relationship to each other and their context, not by fixed styles. This allows for a more flexible and consistent design system.
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                          <div className="bg-background p-4 rounded-md">
                            <h5 className="font-medium mb-2">Semantic Variants</h5>
                            <ul className="space-y-2">
                              <li><strong>Display:</strong> Largest text for hero sections and major features</li>
                              <li><strong>Title:</strong> Main headings for pages and major sections</li>
                              <li><strong>Heading:</strong> Section headings within content</li>
                              <li><strong>Subheading:</strong> Smaller section dividers</li>
                              <li><strong>Browline/Eyebrow:</strong> Small text above titles for categorization</li>
                              <li><strong>Subtitle:</strong> Supporting text for titles and headings</li>
                              <li><strong>Lead:</strong> Introductory paragraph text</li>
                              <li><strong>Body:</strong> Standard paragraph text</li>
                              <li><strong>Small:</strong> Secondary or supporting text</li>
                              <li><strong>Caption:</strong> Labels and metadata</li>
                            </ul>
                          </div>
                          
                          <div className="bg-background p-4 rounded-md">
                            <h5 className="font-medium mb-2">Contextual Adaptation</h5>
                            <p className="mb-3">The same semantic variant adapts based on its context:</p>
                            <div className="space-y-4">
                              <div>
                                <div className="text-sm font-medium text-muted-foreground">Page Context</div>
                                <div className="text-2xl font-semibold">Title Variant</div>
                              </div>
                              <div>
                                <div className="text-sm font-medium text-muted-foreground">Card Context</div>
                                <div className="text-xl font-semibold">Title Variant</div>
                              </div>
                              <div>
                                <div className="text-sm font-medium text-muted-foreground">List Item Context</div>
                                <div className="text-base font-semibold">Title Variant</div>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        <div className="bg-background p-4 rounded-md">
                          <h5 className="font-medium mb-2">Relational Principles</h5>
                          <ul className="space-y-2">
                            <li><strong>Consistent Relationships:</strong> A title is always larger than its subtitle, regardless of context</li>
                            <li><strong>Proportional Scaling:</strong> Elements maintain their proportional relationship across different contexts</li>
                            <li><strong>Contextual Sizing:</strong> The same element may have different absolute sizes in different contexts</li>
                            <li><strong>Semantic Meaning:</strong> Elements are chosen based on their meaning, not just their appearance</li>
                            <li><strong>Flexible Implementation:</strong> Can be implemented through components or utility classes</li>
                          </ul>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                        <div className="border p-5 rounded-md">
                          <div className="uppercase text-sm font-medium tracking-wide text-muted-foreground mb-1">New Feature</div>
                          <div className="text-5xl font-semibold">Display</div>
                          <div className="mt-3 text-base text-muted-foreground">Hero sections, major headlines</div>
                        </div>
                        
                        <div className="border p-5 rounded-md">
                          <div className="uppercase text-sm font-medium tracking-wide text-muted-foreground mb-1">Component</div>
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
                          <div className="mt-3 text-base text-muted-foreground">Supporting text for headings</div>
                        </div>
                        
                        <div className="border p-5 rounded-md">
                          <div className="uppercase text-sm font-medium tracking-wide">Browline</div>
                          <div className="text-lg font-medium mt-1">Label Text</div>
                          <div className="mt-3 text-base text-muted-foreground">Category labels, context providers</div>
                        </div>
                      </div>
                      
                      <div className="bg-muted p-6 rounded-md mb-6">
                        <h4 className="text-xl font-medium mb-3">Semantic Variants and HTML Elements</h4>
                        <p className="text-base mb-4">
                          Our semantic variants (Display, Title, Heading, etc.) are <strong>visual styles</strong> that can be applied to any HTML element through our component system. They are independent from the semantic HTML elements (h1, h2, h3, etc.).
                        </p>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="bg-background p-4 rounded-md">
                            <h5 className="text-base font-medium mb-2">Mapping Variants to HTML Elements</h5>
                            <p className="text-base mb-3">
                              While there's no strict 1:1 mapping, here's a common pattern:
                            </p>
                            <ul className="text-base space-y-1">
                              <li><code>Display</code> → typically used with <code>h1</code></li>
                              <li><code>Title</code> → typically used with <code>h1</code> or <code>h2</code></li>
                              <li><code>Heading</code> → typically used with <code>h2</code> or <code>h3</code></li>
                              <li><code>Subheading</code> → typically used with <code>h3</code> or <code>h4</code></li>
                              <li><code>Subtitle</code> → typically used with <code>h4</code>, <code>h5</code>, or <code>h6</code></li>
                              <li><code>Label</code> → typically used with <code>h5</code>, <code>h6</code>, or <code>label</code></li>
                            </ul>
                          </div>
                          
                          <div className="bg-background p-4 rounded-md">
                            <h5 className="text-base font-medium mb-2">Using Variants in Components</h5>
                            <p className="text-base mb-3">
                              Our component system allows you to separate semantics from styling:
                            </p>
                            <pre className="text-base bg-muted p-2 rounded overflow-x-auto">
                              {`// Main page title with h1 semantics
<Heading as="h1" variant="display">
  Welcome to Our Platform
</Heading>

<Heading as="h2" variant="title">
  Section Title
</Heading>

<Heading as="h3" variant="heading">
  Content Heading
</Heading>`}
                            </pre>
                          </div>
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
                          <div className="bg-background p-4 rounded-md">
                            <div className="text-lg font-light mb-1">Light (300)</div>
                            <p className="text-base">Used for subtle text, captions, and secondary information</p>
                          </div>
                        </div>
                        <div className="mt-4 bg-background p-4 rounded-md">
                          <h5 className="text-base font-medium mb-2">Light Weight Usage Guidelines</h5>
                          <ul className="space-y-2">
                            <li className="flex gap-2">
                              <span className="text-primary">•</span>
                              <span>Use light weight sparingly to maintain readability</span>
                            </li>
                            <li className="flex gap-2">
                              <span className="text-primary">•</span>
                              <span>Avoid using light weight for body text or small sizes (below 16px)</span>
                            </li>
                            <li className="flex gap-2">
                              <span className="text-primary">•</span>
                              <span>Best for large display text, captions, and decorative elements</span>
                            </li>
                          </ul>
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
                      <div className="prose dark:prose-invert max-w-none">
                        <p className="text-lg mb-4">
                          Our HTML elements have minimal base styling to ensure proper semantics without imposing visual design. The actual visual styling is applied through our typography components.
                        </p>
                        
                        <div className="bg-muted p-6 rounded-md mb-6">
                          <h4 className="text-xl font-medium mb-3">Base HTML vs. Styled Components</h4>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="bg-background p-4 rounded-md">
                              <div className="text-lg font-medium mb-2">Base HTML Elements</div>
                              <p className="text-base">Semantic HTML with minimal styling</p>
                              <div className="mt-3 text-base">
                                <code>&lt;h1&gt;Heading 1&lt;/h1&gt;</code><br />
                                <code>&lt;h2&gt;Heading 2&lt;/h2&gt;</code><br />
                                <code>&lt;h3&gt;Heading 3&lt;/h3&gt;</code>
                              </div>
                            </div>
                            <div className="bg-background p-4 rounded-md">
                              <div className="text-lg font-medium mb-2">Styled Components</div>
                              <p className="text-base">Components with specific visual styling</p>
                              <div className="mt-3 text-base">
                                <code>&lt;Heading as="h1" variant="display"&gt;</code><br />
                                <code>&lt;Heading as="h2" variant="title"&gt;</code><br />
                                <code>&lt;Text variant="lead"&gt;</code>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        <p className="text-lg mb-4">
                          The examples below show the base HTML elements with their default sizing. Remember that in our system, you would typically use the <code>Heading</code> and <code>Text</code> components to apply specific visual styles.
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="space-y-6">
                            <div className="border p-4 rounded-md">
                              <h1 className="text-4xl">Heading 1</h1>
                              <div className="mt-3 text-base text-muted-foreground">
                                <span className="px-2 py-1 bg-background rounded text-base">4xl</span>
                                <span className="mx-2">•</span>
                                <span className="px-2 py-1 bg-background rounded text-base">Base sizing</span>
                                <span className="mx-2">•</span>
                                <span className="px-2 py-1 bg-background rounded text-base">2.25rem</span>
                              </div>
                            </div>
                            
                            <div className="border p-4 rounded-md">
                              <h2 className="text-3xl">Heading 2</h2>
                              <div className="mt-3 text-base text-muted-foreground">
                                <span className="px-2 py-1 bg-background rounded text-base">3xl</span>
                                <span className="mx-2">•</span>
                                <span className="px-2 py-1 bg-background rounded text-base">Base sizing</span>
                                <span className="mx-2">•</span>
                                <span className="px-2 py-1 bg-background rounded text-base">1.875rem</span>
                              </div>
                            </div>
                            
                            <div className="border p-4 rounded-md">
                              <h3 className="text-2xl">Heading 3</h3>
                              <div className="mt-3 text-base text-muted-foreground">
                                <span className="px-2 py-1 bg-background rounded text-base">2xl</span>
                                <span className="mx-2">•</span>
                                <span className="px-2 py-1 bg-background rounded text-base">Base sizing</span>
                                <span className="mx-2">•</span>
                                <span className="px-2 py-1 bg-background rounded text-base">1.5rem</span>
                              </div>
                            </div>
                          </div>
                          
                          <div className="space-y-6">
                            <div className="border p-4 rounded-md">
                              <h4 className="text-xl">Heading 4</h4>
                              <div className="mt-3 text-base text-muted-foreground">
                                <span className="px-2 py-1 bg-background rounded text-base">xl</span>
                                <span className="mx-2">•</span>
                                <span className="px-2 py-1 bg-background rounded text-base">Base sizing</span>
                                <span className="mx-2">•</span>
                                <span className="px-2 py-1 bg-background rounded text-base">1.25rem</span>
                              </div>
                            </div>
                            
                            <div className="border p-4 rounded-md">
                              <h5 className="text-lg">Heading 5</h5>
                              <div className="mt-3 text-base text-muted-foreground">
                                <span className="px-2 py-1 bg-background rounded text-base">lg</span>
                                <span className="mx-2">•</span>
                                <span className="px-2 py-1 bg-background rounded text-base">Base sizing</span>
                                <span className="mx-2">•</span>
                                <span className="px-2 py-1 bg-background rounded text-base">1.125rem</span>
                              </div>
                            </div>
                            
                            <div className="border p-4 rounded-md">
                              <h6 className="text-base">Heading 6</h6>
                              <div className="mt-3 text-base text-muted-foreground">
                                <span className="px-2 py-1 bg-background rounded text-base">base</span>
                                <span className="mx-2">•</span>
                                <span className="px-2 py-1 bg-background rounded text-base">Base sizing</span>
                                <span className="mx-2">•</span>
                                <span className="px-2 py-1 bg-background rounded text-base">1rem</span>
                              </div>
                            </div>
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
                              <pre className="text-base bg-muted p-2 rounded overflow-x-auto">
                                {`// Main page title with display styling
<Heading as="h1" variant="display">
  Welcome to our Platform
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
                              <p className="text-base mb-2"><strong>❌ Don't:</strong> Rely on HTML for styling</p>
                              <pre className="text-base bg-muted p-2 rounded overflow-x-auto">
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

                  {/* Semantic Markup Best Practices */}
                  <Card id="typography-semantic-markup">
                    <CardHeader>
                      <CardTitle>Semantic Markup Best Practices</CardTitle>
                      <CardDescription>Using HTML elements correctly with our typography system</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-lg mb-4">
                        Our typography system is designed to separate semantic meaning from visual styling. This allows you to use the correct HTML elements for their semantic purpose while applying visual styles independently.
                      </p>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        <div className="border p-5 rounded-md">
                          <h4 className="text-xl font-medium mb-3">❌ Incorrect Usage</h4>
                          <div className="bg-muted p-4 rounded-md mb-4">
                            <p className="text-base text-muted-foreground mb-2">Using heading elements for styling only:</p>
                            <pre className="text-base bg-background p-2 rounded overflow-x-auto">
                              {`// Incorrect: Using h3 just for its styling
<h3>This is not actually a heading</h3>`}
                            </pre>
                          </div>
                          <div className="bg-muted p-4 rounded-md">
                            <p className="text-base text-muted-foreground mb-2">Using non-semantic elements for headings:</p>
                            <pre className="text-base bg-background p-2 rounded overflow-x-auto">
                              {`// Incorrect: Using div instead of proper heading
<div className="text-3xl font-medium">
  This should be a heading
</div>`}
                            </pre>
                          </div>
                        </div>
                        
                        <div className="border p-5 rounded-md">
                          <h4 className="text-xl font-medium mb-3">✅ Correct Usage</h4>
                          <div className="bg-muted p-4 rounded-md mb-4">
                            <p className="text-base text-muted-foreground mb-2">Using our component system:</p>
                            <pre className="text-base bg-background p-2 rounded overflow-x-auto">
                              {`// Correct: Using Heading component with semantic element
<Heading as="h3" variant="subtitle">
  Section subtitle with h3 semantics
</Heading>

// Correct: Using Text component for non-heading text
<Text variant="lead">
  This is an introductory paragraph
</Text>`}
                            </pre>
                          </div>
                          <div className="bg-muted p-4 rounded-md">
                            <p className="text-base text-muted-foreground mb-2">Using raw HTML with proper semantics:</p>
                            <pre className="text-base bg-background p-2 rounded overflow-x-auto">
                              {`// Correct: Using proper heading element
<h2 className="text-3xl font-semibold">
  This is a proper section heading
</h2>

// Correct: Using paragraph for non-heading text
<p className="text-xl font-medium">
  This is emphasized text, not a heading
</p>`}
                            </pre>
                          </div>
                        </div>
                      </div>

                      <div className="bg-muted p-6 rounded-md">
                        <h4 className="text-xl font-medium mb-3">Key Principles</h4>
                        <ul className="space-y-2">
                          <li className="flex gap-2">
                            <span className="text-primary">•</span>
                            <span>Always use heading elements (h1-h6) for actual headings in your content</span>
                          </li>
                          <li className="flex gap-2">
                            <span className="text-primary">•</span>
                            <span>Use paragraph elements (p) for body text and general content</span>
                          </li>
                          <li className="flex gap-2">
                            <span className="text-primary">•</span>
                            <span>Apply visual styling through our component system or utility classes</span>
                          </li>
                          <li className="flex gap-2">
                            <span className="text-primary">•</span>
                            <span>Maintain proper heading hierarchy (h1 → h2 → h3) for accessibility</span>
                          </li>
                        </ul>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Typography Relationships */}
                  <Card id="typography-relationships">
                    <CardHeader>
                      <CardTitle>Typography Relationships</CardTitle>
                      <CardDescription>Understanding how typography elements work together in different contexts</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-lg mb-4">
                        Our typography system is built around relationships between elements. These relationships remain consistent across different contexts, even as the specific styles adapt.
                      </p>
                      
                      <div className="bg-muted p-6 rounded-md mb-6">
                        <h4 className="text-xl font-medium mb-3">Core Relationships</h4>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-4">
                          <div className="bg-background p-4 rounded-md">
                            <h5 className="font-medium mb-2">Browline → Title</h5>
                            <div className="border p-4 rounded-md">
                              <div className="uppercase text-xs font-medium tracking-wide text-primary">CATEGORY</div>
                              <div className="text-xl font-semibold mt-1">Main Title</div>
                            </div>
                            <p className="mt-2 text-sm">
                              Browline provides context for the title. Always smaller, often uppercase with wider tracking.
                            </p>
                          </div>
                          
                          <div className="bg-background p-4 rounded-md">
                            <h5 className="font-medium mb-2">Title → Subtitle</h5>
                            <div className="border p-4 rounded-md">
                              <div className="text-xl font-semibold">Main Title</div>
                              <div className="text-base text-muted-foreground mt-1">Supporting description</div>
                            </div>
                            <p className="mt-2 text-sm">
                              Subtitle provides additional context or description for the title. Always smaller and often lighter in weight or color.
                            </p>
                          </div>
                          
                          <div className="bg-background p-4 rounded-md">
                            <h5 className="font-medium mb-2">Heading → Body</h5>
                            <div className="border p-4 rounded-md">
                              <div className="text-lg font-medium">Section Heading</div>
                              <div className="text-base mt-2">Body text that follows the heading and provides detailed information about the section topic.</div>
                            </div>
                            <p className="mt-2 text-sm">
                              Body text expands on the heading. Always smaller than its heading, with regular weight.
                            </p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        <div className="bg-background p-5 rounded-md">
                          <h5 className="text-base font-medium mb-3">Page Header</h5>
                          <div className="border p-4 rounded-md">
                            <div className="uppercase text-sm font-medium tracking-wide text-primary">Documentation</div>
                            <div className="text-4xl font-semibold mt-1">Typography System</div>
                            <div className="text-base text-muted-foreground mt-2">A comprehensive guide to our text styles and usage</div>
                          </div>
                          <div className="mt-3 text-base">
                            <p><strong>Elements:</strong></p>
                            <ul className="text-base mt-1">
                              <li>Browline: Provides category context</li>
                              <li>Title: Main page heading</li>
                              <li>Subtitle: Supporting description</li>
                            </ul>
                          </div>
                        </div>
                        
                        <div className="bg-background p-5 rounded-md">
                          <h5 className="text-base font-medium mb-3">Card Component</h5>
                          <div className="border p-4 rounded-md">
                            <div className="uppercase text-xs font-medium tracking-wide text-muted-foreground">Feature</div>
                            <div className="text-xl font-semibold mt-1">Responsive Layouts</div>
                            <div className="text-base mt-2">Create beautiful interfaces that work on any device</div>
                          </div>
                          <div className="mt-3 text-base">
                            <p><strong>Elements:</strong></p>
                            <ul className="text-base mt-1">
                              <li>Browline: Smaller, categorizes the card</li>
                              <li>Title: Smaller than page title</li>
                              <li>Body: Regular text, not a subtitle</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        <div className="bg-background p-5 rounded-md">
                          <h5 className="text-base font-medium mb-3">Form Section</h5>
                          <div className="border p-4 rounded-md">
                            <div className="text-xl font-medium">Personal Information</div>
                            <div className="text-base text-muted-foreground mt-1">We'll use this to customize your experience</div>
                            <div className="mt-4">
                              <div className="text-base font-medium mb-1">Full Name</div>
                              <div className="h-10 bg-muted rounded-md"></div>
                            </div>
                          </div>
                          <div className="mt-3 text-base">
                            <p><strong>Elements:</strong></p>
                            <ul className="text-base mt-1">
                              <li>Section Title: Medium-sized heading</li>
                              <li>Subtitle: Supporting context</li>
                              <li>Label: Form field identifier</li>
                            </ul>
                          </div>
                        </div>
                        
                        <div className="bg-background p-5 rounded-md">
                          <h5 className="text-base font-medium mb-3">Article Preview</h5>
                          <div className="border p-4 rounded-md">
                            <div className="uppercase text-xs font-medium tracking-wide text-primary-foreground bg-primary inline-block px-2 py-0.5 rounded">New</div>
                            <div className="text-2xl font-medium mt-2">Designing with Accessibility in Mind</div>
                            <div className="text-base mt-2 line-clamp-2">Learn how to create interfaces that work for everyone, regardless of abilities or disabilities.</div>
                            <div className="text-sm text-muted-foreground mt-2">5 min read • June 15, 2025</div>
                          </div>
                          <div className="mt-3 text-base">
                            <p><strong>Elements:</strong></p>
                            <ul className="text-base mt-1">
                              <li>Browline: Tag/badge style</li>
                              <li>Title: Article headline</li>
                              <li>Body: Article excerpt</li>
                              <li>Caption: Metadata information (smaller than body)</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                      
                      <div className="bg-muted p-6 rounded-md">
                        <h4 className="text-xl font-medium mb-3">Consistent Relationships Across Contexts</h4>
                        <p className="mb-4">
                          While the absolute sizes may change based on context, the relationships between elements remain consistent:
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                          <div className="bg-background p-4 rounded-md">
                            <h5 className="font-medium mb-2">Page Context</h5>
                            <div className="space-y-1">
                              <div className="uppercase text-sm font-medium tracking-wide text-primary">Browline</div>
                              <div className="text-4xl font-semibold">Title</div>
                              <div className="text-xl text-muted-foreground">Subtitle</div>
                            </div>
                          </div>
                          
                          <div className="bg-background p-4 rounded-md">
                            <h5 className="font-medium mb-2">Card Context</h5>
                            <div className="space-y-1">
                              <div className="uppercase text-xs font-medium tracking-wide text-primary">Browline</div>
                              <div className="text-xl font-semibold">Title</div>
                              <div className="text-base text-muted-foreground">Subtitle</div>
                            </div>
                          </div>
                          
                          <div className="bg-background p-4 rounded-md">
                            <h5 className="font-medium mb-2">List Item Context</h5>
                            <div className="space-y-1">
                              <div className="uppercase text-xs font-medium tracking-wide text-primary">Browline</div>
                              <div className="text-base font-semibold">Title</div>
                              <div className="text-sm text-muted-foreground">Subtitle</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Browline/Eyebrow Text Section */}
                  <Card id="typography-browline">
                    <CardHeader>
                      <CardTitle>Browline/Eyebrow Text</CardTitle>
                      <CardDescription>Small text above titles for categorization, context, or additional information</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-lg mb-4">
                        Browline (also called eyebrow) text is a small, often uppercase text element placed above a title or heading to provide context, categorization, or additional information.
                      </p>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                        <div className="bg-background p-4 rounded-md">
                          <h5 className="font-medium mb-2">Characteristics</h5>
                          <ul className="space-y-2">
                            <li><strong>Size:</strong> Typically smaller than the title it accompanies</li>
                            <li><strong>Case:</strong> Often uppercase for emphasis</li>
                            <li><strong>Weight:</strong> Usually medium or semibold</li>
                            <li><strong>Tracking:</strong> Wider letter spacing (tracking)</li>
                            <li><strong>Color:</strong> May use brand colors or muted colors</li>
                          </ul>
                        </div>
                        
                        <div className="bg-background p-4 rounded-md">
                          <h5 className="font-medium mb-2">Common Uses</h5>
                          <ul className="space-y-2">
                            <li><strong>Categories:</strong> Indicating content type or category</li>
                            <li><strong>Dates:</strong> Publication or event dates</li>
                            <li><strong>Status:</strong> "New", "Featured", "Popular"</li>
                            <li><strong>Sections:</strong> Identifying page sections</li>
                            <li><strong>Metadata:</strong> Author, location, or other metadata</li>
                          </ul>
                        </div>
                      </div>
                      
                      <div className="bg-background p-4 rounded-md">
                        <h5 className="font-medium mb-3">Implementation Examples</h5>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <p className="mb-2">Component API:</p>
                            <pre className="text-base bg-muted p-2 rounded overflow-x-auto">
                              {`<Browline>CATEGORY</Browline>
<Heading variant="title">Main Title</Heading>
<Text variant="subtitle">Supporting text</Text>`}
                            </pre>
                          </div>
                          <div>
                            <p className="mb-2">CSS Classes:</p>
                            <pre className="text-base bg-muted p-2 rounded overflow-x-auto">
                              {`<span class="text-xs uppercase font-medium
tracking-wide text-primary">CATEGORY</span>
<h2 class="text-2xl font-semibold mt-1">
  Main Title
</h2>`}
                            </pre>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </Section>

              {/* Colors Section */}
              <Section
                id="colors"
                title="Colors"
                description="Color system and palette for consistent visual language"
              >
                <div className="space-y-8">
                  {/* Color Philosophy */}
                  <Card id="colors-philosophy">
                    <CardHeader>
                      <CardTitle>Color Philosophy</CardTitle>
                      <CardDescription>Our approach to color is built on flexibility, semantic meaning, and accessibility</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="prose dark:prose-invert max-w-none">
                        <p className="text-lg mb-4">
                          Our color system is designed as a layered architecture that separates base colors from their semantic application, enabling consistent theming and customization.
                        </p>
                        
                        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                          <div className="space-y-2">
                            <h4 className="font-medium">Core Principles</h4>
                            <ul className="space-y-2">
                              <li><strong>Layered Architecture:</strong> Base colors are separate from semantic tokens</li>
                              <li><strong>Context-Driven:</strong> Colors have meaning based on their context</li>
                              <li><strong>Accessible:</strong> All color combinations meet WCAG AA standards</li>
                              <li><strong>Themeable:</strong> Easy to customize for different brand identities</li>
                              <li><strong>Dark Mode Support:</strong> All colors have light and dark variants</li>
                            </ul>
                          </div>
                          
                          <div className="space-y-2">
                            <h4 className="font-medium">Implementation Approach</h4>
                            <ul className="space-y-2">
                              <li><strong>Hex Format:</strong> Colors defined in hex for better compatibility with Tailwind v4</li>
                              <li><strong>Flatter Structure:</strong> Simplified naming convention for easier usage</li>
                              <li><strong>Tailwind Integration:</strong> Direct mapping to Tailwind utility classes</li>
                              <li><strong>Semantic Naming:</strong> Named by purpose, not visual appearance</li>
                              <li><strong>Component Tokens:</strong> Component-specific color tokens</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Color System Architecture */}
                  <Card id="colors-system">
                    <CardHeader>
                      <CardTitle>System Architecture</CardTitle>
                      <CardDescription>How our color system is structured for flexibility and consistency</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="prose dark:prose-invert max-w-none">
                        <p className="text-lg mb-4">
                          Our color system follows a three-layer architecture that separates base colors from their application, enabling consistent theming and customization.
                        </p>
                        
                        <div className="bg-muted p-6 rounded-md mb-6">
                          <h4 className="text-xl font-medium mb-3">Three-Layer Architecture</h4>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="bg-background p-4 rounded-md border">
                              <div className="text-lg font-medium mb-2">1. Base Colors</div>
                              <p className="text-base">Raw color values without semantic meaning</p>
                              <div className="mt-3 text-base">
                                <code>blue.500: "#0ea5e9"</code><br />
                                <code>gray.200: "#e2e8f0"</code><br />
                                <code>red.600: "#dc2626"</code>
                              </div>
                            </div>
                            <div className="bg-background p-4 rounded-md border">
                              <div className="text-lg font-medium mb-2">2. Semantic Tokens</div>
                              <p className="text-base">Mapping base colors to their UI purpose with a flat structure</p>
                              <div className="mt-3 text-base">
                                <code>brand-primary: blue.600</code><br />
                                <code>text: gray.900</code><br />
                                <code>text-dark: gray.50</code>
                              </div>
                            </div>
                            <div className="bg-background p-4 rounded-md border">
                              <div className="text-lg font-medium mb-2">3. Component Tokens</div>
                              <p className="text-base">Component-specific color applications</p>
                              <div className="mt-3 text-base">
                                <code>button.primary-bg: brand-primary</code><br />
                                <code>card.bg: background</code><br />
                                <code>alert.error-bg: error-subtle</code>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        <div className="bg-muted p-6 rounded-md">
                          <h4 className="text-xl font-medium mb-3">Tailwind v4 Alignment</h4>
                          <div className="bg-background p-4 rounded-md">
                            <p className="text-base">
                              <strong>Note:</strong> Our color system now uses hex format for base colors and a flatter structure for semantic tokens, 
                              aligning with Tailwind v4's approach. This simplifies usage and improves developer experience by reducing the complexity 
                              of the color system while maintaining semantic meaning.
                            </p>
                          </div>
                        </div>
                        
                        <div className="bg-muted p-6 rounded-md">
                          <h4 className="text-xl font-medium mb-3">Benefits of This Approach</h4>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="bg-background p-4 rounded-md">
                              <div className="text-lg font-medium mb-2">Theme Customization</div>
                              <p className="text-base">Change only base colors to create an entirely new theme while maintaining semantic relationships</p>
                            </div>
                            <div className="bg-background p-4 rounded-md">
                              <div className="text-lg font-medium mb-2">Dark Mode Support</div>
                              <p className="text-base">Semantic tokens have both light and dark values, making dark mode implementation straightforward</p>
                            </div>
                            <div className="bg-background p-4 rounded-md">
                              <div className="text-lg font-medium mb-2">Consistency</div>
                              <p className="text-base">Ensures consistent color usage across the entire interface</p>
                            </div>
                            <div className="bg-background p-4 rounded-md">
                              <div className="text-lg font-medium mb-2">Maintainability</div>
                              <p className="text-base">Easier to update and maintain as the system grows</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Base Colors */}
                  <Card id="colors-palette">
                    <CardHeader>
                      <CardTitle>Base Color Palette</CardTitle>
                      <CardDescription>The foundation colors that serve as building blocks for our system</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-lg mb-6">
                        Our base palette consists of carefully crafted color scales in hex format. Each scale includes 11 steps from 50 (lightest) to 950 (darkest).
                      </p>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        {/* Gray Scale */}
                        <div className="border rounded-md overflow-hidden">
                          <div className="p-4 border-b bg-muted/30">
                            <h4 className="text-lg font-medium">Gray Scale</h4>
                            <p className="text-base text-muted-foreground">Neutral colors for text, backgrounds, and borders</p>
                          </div>
                          <div className="p-4 flex flex-wrap gap-2">
                            <div className="h-8 w-8 rounded bg-gray-50 border"></div>
                            <div className="h-8 w-8 rounded bg-gray-100 border"></div>
                            <div className="h-8 w-8 rounded bg-gray-200 border"></div>
                            <div className="h-8 w-8 rounded bg-gray-300 border"></div>
                            <div className="h-8 w-8 rounded bg-gray-400 border"></div>
                            <div className="h-8 w-8 rounded bg-gray-500 border"></div>
                            <div className="h-8 w-8 rounded bg-gray-600 border text-white flex items-center justify-center text-base">600</div>
                            <div className="h-8 w-8 rounded bg-gray-700 border text-white"></div>
                            <div className="h-8 w-8 rounded bg-gray-800 border text-white"></div>
                            <div className="h-8 w-8 rounded bg-gray-900 border text-white"></div>
                            <div className="h-8 w-8 rounded bg-gray-950 border text-white"></div>
                          </div>
                        </div>

                        {/* Blue Scale */}
                        <div className="border rounded-md overflow-hidden">
                          <div className="p-4 border-b bg-muted/30">
                            <h4 className="text-lg font-medium">Blue Scale</h4>
                            <p className="text-base text-muted-foreground">Primary brand color for interactive elements</p>
                          </div>
                          <div className="p-4 flex flex-wrap gap-2">
                            <div className="h-8 w-8 rounded bg-blue-50 border"></div>
                            <div className="h-8 w-8 rounded bg-blue-100 border"></div>
                            <div className="h-8 w-8 rounded bg-blue-200 border"></div>
                            <div className="h-8 w-8 rounded bg-blue-300 border"></div>
                            <div className="h-8 w-8 rounded bg-blue-400 border"></div>
                            <div className="h-8 w-8 rounded bg-blue-500 border"></div>
                            <div className="h-8 w-8 rounded bg-blue-600 border text-white flex items-center justify-center text-base">600</div>
                            <div className="h-8 w-8 rounded bg-blue-700 border text-white"></div>
                            <div className="h-8 w-8 rounded bg-blue-800 border text-white"></div>
                            <div className="h-8 w-8 rounded bg-blue-900 border text-white"></div>
                            <div className="h-8 w-8 rounded bg-blue-950 border text-white"></div>
                          </div>
                        </div>

                        {/* Green Scale */}
                        <div className="border rounded-md overflow-hidden">
                          <div className="p-4 border-b bg-muted/30">
                            <h4 className="text-lg font-medium">Green Scale</h4>
                            <p className="text-base text-muted-foreground">Success states and positive indicators</p>
                          </div>
                          <div className="p-4 flex flex-wrap gap-2">
                            <div className="h-8 w-8 rounded bg-green-50 border"></div>
                            <div className="h-8 w-8 rounded bg-green-100 border"></div>
                            <div className="h-8 w-8 rounded bg-green-200 border"></div>
                            <div className="h-8 w-8 rounded bg-green-300 border"></div>
                            <div className="h-8 w-8 rounded bg-green-400 border"></div>
                            <div className="h-8 w-8 rounded bg-green-500 border"></div>
                            <div className="h-8 w-8 rounded bg-green-600 border text-white flex items-center justify-center text-base">600</div>
                            <div className="h-8 w-8 rounded bg-green-700 border text-white"></div>
                            <div className="h-8 w-8 rounded bg-green-800 border text-white"></div>
                            <div className="h-8 w-8 rounded bg-green-900 border text-white"></div>
                            <div className="h-8 w-8 rounded bg-green-950 border text-white"></div>
                          </div>
                        </div>

                        {/* Red Scale */}
                        <div className="border rounded-md overflow-hidden">
                          <div className="p-4 border-b bg-muted/30">
                            <h4 className="text-lg font-medium">Red Scale</h4>
                            <p className="text-base text-muted-foreground">Error states and destructive actions</p>
                          </div>
                          <div className="p-4 flex flex-wrap gap-2">
                            <div className="h-8 w-8 rounded bg-red-50 border"></div>
                            <div className="h-8 w-8 rounded bg-red-100 border"></div>
                            <div className="h-8 w-8 rounded bg-red-200 border"></div>
                            <div className="h-8 w-8 rounded bg-red-300 border"></div>
                            <div className="h-8 w-8 rounded bg-red-400 border"></div>
                            <div className="h-8 w-8 rounded bg-red-500 border"></div>
                            <div className="h-8 w-8 rounded bg-red-600 border text-white flex items-center justify-center text-base">600</div>
                            <div className="h-8 w-8 rounded bg-red-700 border text-white"></div>
                            <div className="h-8 w-8 rounded bg-red-800 border text-white"></div>
                            <div className="h-8 w-8 rounded bg-red-900 border text-white"></div>
                            <div className="h-8 w-8 rounded bg-red-950 border text-white"></div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Semantic Colors */}
                  <Card id="colors-semantic">
                    <CardHeader>
                      <CardTitle>Semantic Colors</CardTitle>
                      <CardDescription>Purpose-driven colors that convey meaning in the interface</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-lg mb-6">
                        Semantic colors map our base colors to specific purposes in the UI, with different values for light and dark modes.
                      </p>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        <div className="bg-muted p-6 rounded-md">
                          <h4 className="text-xl font-medium mb-3">Background Colors</h4>
                          <div className="space-y-4">
                            <div className="flex items-center gap-3">
                              <div className="w-12 h-12 rounded-md bg-background border"></div>
                              <div>
                                <div className="font-medium">Background</div>
                                <div className="text-base text-muted-foreground">Primary background color</div>
                              </div>
                            </div>
                            <div className="flex items-center gap-3">
                              <div className="w-12 h-12 rounded-md bg-muted border"></div>
                              <div>
                                <div className="font-medium">Muted</div>
                                <div className="text-base text-muted-foreground">Subdued background</div>
                              </div>
                            </div>
                            <div className="flex items-center gap-3">
                              <div className="w-12 h-12 rounded-md bg-card border"></div>
                              <div>
                                <div className="font-medium">Card</div>
                                <div className="text-base text-muted-foreground">Card and surface background</div>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        <div className="bg-muted p-6 rounded-md">
                          <h4 className="text-xl font-medium mb-3">Foreground Colors</h4>
                          <div className="space-y-4">
                            <div className="flex items-center gap-3">
                              <div className="w-12 h-12 rounded-md bg-foreground border"></div>
                              <div>
                                <div className="font-medium">Foreground</div>
                                <div className="text-base text-muted-foreground">Primary text color</div>
                              </div>
                            </div>
                            <div className="flex items-center gap-3">
                              <div className="w-12 h-12 rounded-md bg-muted-foreground border"></div>
                              <div>
                                <div className="font-medium">Muted Foreground</div>
                                <div className="text-base text-muted-foreground">Secondary text color</div>
                              </div>
                            </div>
                            <div className="flex items-center gap-3">
                              <div className="w-12 h-12 rounded-md bg-card-foreground border"></div>
                              <div>
                                <div className="font-medium">Card Foreground</div>
                                <div className="text-base text-muted-foreground">Text on card surfaces</div>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        <div className="bg-muted p-6 rounded-md">
                          <h4 className="text-xl font-medium mb-3">Interactive Colors</h4>
                          <div className="space-y-4">
                            <div className="flex items-center gap-3">
                              <div className="w-12 h-12 rounded-md bg-primary border"></div>
                              <div>
                                <div className="font-medium">Primary</div>
                                <div className="text-base text-muted-foreground">Main brand color</div>
                              </div>
                            </div>
                            <div className="flex items-center gap-3">
                              <div className="w-12 h-12 rounded-md bg-secondary border"></div>
                              <div>
                                <div className="font-medium">Secondary</div>
                                <div className="text-base text-muted-foreground">Supporting color</div>
                              </div>
                            </div>
                            <div className="flex items-center gap-3">
                              <div className="w-12 h-12 rounded-md bg-accent border"></div>
                              <div>
                                <div className="font-medium">Accent</div>
                                <div className="text-base text-muted-foreground">Highlight color</div>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        <div className="bg-muted p-6 rounded-md">
                          <h4 className="text-xl font-medium mb-3">Status Colors</h4>
                          <div className="space-y-4">
                            <div className="flex items-center gap-3">
                              <div className="w-12 h-12 rounded-md bg-destructive border"></div>
                              <div>
                                <div className="font-medium">Destructive</div>
                                <div className="text-base text-muted-foreground">Error states</div>
                              </div>
                            </div>
                            <div className="flex items-center gap-3">
                              <div className="w-12 h-12 rounded-md bg-success border"></div>
                              <div>
                                <div className="font-medium">Success</div>
                                <div className="text-base text-muted-foreground">Positive states</div>
                              </div>
                            </div>
                            <div className="flex items-center gap-3">
                              <div className="w-12 h-12 rounded-md bg-warning border"></div>
                              <div>
                                <div className="font-medium">Warning</div>
                                <div className="text-base text-muted-foreground">Caution states</div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Color Usage */}
                  <Card id="colors-usage">
                    <CardHeader>
                      <CardTitle>Color Usage</CardTitle>
                      <CardDescription>Guidelines for applying colors effectively in the interface</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="prose dark:prose-invert max-w-none">
                        <h3 className="text-2xl font-medium mb-4">Best Practices</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                          <div className="border p-5 rounded-md">
                            <div className="text-xl font-medium mb-3">Use semantic tokens</div>
                            <div className="bg-muted p-4 rounded-md">
                              <div className="text-base">Always use semantic color tokens rather than direct base colors</div>
                            </div>
                          </div>
                          
                          <div className="border p-5 rounded-md">
                            <div className="text-xl font-medium mb-3">Maintain contrast</div>
                            <div className="bg-muted p-4 rounded-md">
                              <div className="text-base">Ensure text has sufficient contrast with its background (WCAG AA minimum)</div>
                            </div>
                          </div>
                          
                          <div className="border p-5 rounded-md">
                            <div className="text-xl font-medium mb-3">Be consistent</div>
                            <div className="bg-muted p-4 rounded-md">
                              <div className="text-base">Use colors consistently to reinforce their meaning</div>
                            </div>
                          </div>
                          
                          <div className="border p-5 rounded-md">
                            <div className="text-xl font-medium mb-3">Don't rely on color alone</div>
                            <div className="bg-muted p-4 rounded-md">
                              <div className="text-base">Always pair color with other visual cues for accessibility</div>
                            </div>
                          </div>
                        </div>
                        
                        <div className="bg-muted p-6 rounded-md">
                          <h4 className="text-xl font-medium mb-3">Usage Examples</h4>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="bg-background p-4 rounded-md">
                              <p className="text-base mb-2"><strong>✅ Do:</strong> Use semantic tokens</p>
                              <pre className="text-base bg-muted p-2 rounded overflow-x-auto">
                                {`// Good: Using semantic tokens
<Button variant="destructive">
  Delete Account
</Button>

<div className="bg-card p-4">
  Card content
</div>`}
                              </pre>
                            </div>
                            <div className="bg-background p-4 rounded-md">
                              <p className="text-base mb-2"><strong>❌ Don't:</strong> Use base colors directly</p>
                              <pre className="text-base bg-muted p-2 rounded overflow-x-auto">
                                {`// Bad: Using base colors directly
<button className="bg-red-600 text-white">
  Delete Account
</button>

<div className="bg-gray-100 p-4">
  Card content
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
