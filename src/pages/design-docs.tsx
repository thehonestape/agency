import React, { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/Card";
import { HStack, VStack } from "@/components/ui/stack";
import { Heading } from "@/components/ui/typography";
import { Text } from "@/components/ui/typography";
import { Eyebrow } from "@/components/ui/typography/eyebrow";
import { Callout } from "@/components/ui/Callout";
import { Banner } from "@/components/ui/banner";
import { TypographyStackExample } from "@/components/examples/typography-stack-example";
import { PaletteIcon, TypeIcon, BoxesIcon, LayersIcon, PuzzleIcon, BookOpenIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { XMarkIcon, Bars3Icon } from "@heroicons/react/24/outline";
import { useTheme } from "@/lib/ThemeProvider";

// Main Design Docs Page
const DesignDocsPage = () => {
  // Access the current theme to ensure proper styling
  const { theme, isDark } = useTheme();
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
      icon: <PaletteIcon className="h-5 w-5" />,
      subsections: [
        { id: "colors-palette", label: "Color Palette" },
        { id: "colors-semantic", label: "Semantic Colors" },
      ]
    },
    { 
      id: "layout", 
      label: "Layout & Spacing", 
      icon: <LayersIcon className="h-5 w-5" />,
      subsections: [
        { id: "layout-stack", label: "Stack Component" },
        { id: "layout-grid", label: "Grid System" },
        { id: "layout-spacing", label: "Spacing Scale" }
      ]
    },
    { 
      id: "base", 
      label: "Base Components", 
      icon: <BoxesIcon className="h-5 w-5" />,
      subsections: [
        { id: "base-buttons", label: "Buttons" },
        { id: "base-inputs", label: "Inputs" },
      ]
    },
    { 
      id: "components", 
      label: "Components", 
      icon: <LayersIcon className="h-5 w-5" />,
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
      icon: <PuzzleIcon className="h-5 w-5" />,
      subsections: [
        { id: "patterns-signin", label: "Sign In Form" },
        { id: "patterns-cardgrid", label: "Card Grid" }
      ]
    },
    { 
      id: "utilities", 
      label: "Utilities", 
      icon: <BookOpenIcon className="h-5 w-5" />,
      subsections: []
    },
  ];
  
  // Handle scroll to update active section
  useEffect(() => {
    const handleScroll = () => {
      // Get all section entries from the ref
      const sectionEntries = Object.entries(sectionRefs.current);
      if (sectionEntries.length === 0) return;
      
      // Calculate the middle of the viewport
      const viewportHeight = window.innerHeight;
      const viewportMiddle = viewportHeight * 0.4; // Slightly above middle for better UX
      
      let closestSection: [string, HTMLElement] | null = null;
      let closestDistance = Infinity;
      
      for (const [id, element] of sectionEntries) {
        if (!element) continue;
        
        const rect = element.getBoundingClientRect();
        // Calculate distance from the section's top to the trigger point
        const distance = Math.abs(rect.top - viewportMiddle);
        
        // If this section is closer to the trigger point than the current closest
        if (distance < closestDistance) {
          closestDistance = distance;
          closestSection = [id, element];
        }
      }
      
      // Only update if we're reasonably close to a section
      // and if it's different from the current active section
      if (closestSection && closestSection[0] !== activeSection) {
        setActiveSection(closestSection[0]);
      }
    };
    
    // Use a debounced version of the scroll handler to improve performance
    let timeoutId: NodeJS.Timeout | null = null;
    const debouncedHandleScroll = () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      timeoutId = setTimeout(handleScroll, 50);
    };
    
    window.addEventListener('scroll', debouncedHandleScroll);
    
    // Initial check to set the active section
    setTimeout(handleScroll, 200);
    
    return () => {
      window.removeEventListener('scroll', debouncedHandleScroll);
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [activeSection]);

  // Handle navigation click
  const handleNavClick = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      // Set active section immediately to avoid flicker
      setActiveSection(id);
      
      // Scroll to the element with smooth behavior
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
      
      // Close mobile menu if open
      if (isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    }
  };

  // Section component with visual style variants
  const Section = ({ 
    id, 
    title, 
    description, 
    children,
    variant = "default",
    ...props
  }: { 
    id: string; 
    title: string; 
    description?: string; 
    children: React.ReactNode;
    variant?: "default" | "alt" | "minimal";
    [key: string]: any;
  }) => {
    const ref = useRef<HTMLElement>(null);
    
    // Update the section ref when the component mounts or updates
    useEffect(() => {
      if (ref.current) {
        sectionRefs.current[id] = ref.current;
      }
      
      // Clean up when the component unmounts
      return () => {
        if (sectionRefs.current[id]) {
          sectionRefs.current[id] = null;
        }
      };
    }, [id, sectionRefs]);
    
    return (
      <section
        ref={ref}
        id={id}
        className={cn(
          "mb-16 scroll-mt-24", // Increased scroll margin for better positioning
          variant === "alt" ? "bg-muted/50 p-8 rounded-lg" : ""
        )}
        {...props}
      >
        <div className="mb-8">
          <Heading variant="title" className="mb-2">{title}</Heading>
          {description && <Text className="text-muted-foreground">{description}</Text>}
        </div>
        {children}
      </section>
    );
  };

  // Use the theme and isDark variables to ensure proper styling
  return (
    <div className={cn(
      "min-h-screen bg-background text-foreground",
      isDark ? "dark" : ""
    )} data-theme={theme}>
      <header className="border-b border-border sticky top-0 z-10 bg-background/95 backdrop-blur-sm shadow-sm" data-component="header" role="banner">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold">Design System</h1>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        <div className="flex flex-col lg:flex-row gap-10">
          {/* Sidebar Navigation */}
          <div className="lg:w-72 lg:shrink-0 lg:h-[calc(100vh-4rem)] lg:sticky lg:top-16 hidden lg:block" data-component="sidebar">
            <div className="py-6 pr-6">
              <div className="mb-8 pb-6 border-b border-border">
                <div className="flex flex-col gap-3">
                  <h3 className="text-sm font-medium uppercase tracking-wide text-muted-foreground">Theme</h3>
                  <div className="flex items-center gap-2">
                    <ThemeToggle 
                      variant="outline" 
                      size="sm" 
                      showLabel={true}
                      className="w-full justify-start px-3 py-2 h-auto"
                    />
                  </div>
                </div>
              </div>
              <nav className="space-y-2" role="navigation" aria-label="Main Navigation">
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
                <div className="mb-4 pb-2 border-b">
                  <h3 className="text-sm font-medium text-muted-foreground mb-2">Theme</h3>
                  <ThemeToggle 
                    variant="outline" 
                    size="sm" 
                    showLabel={true}
                    className="w-full justify-start px-3 py-2 h-auto"
                  />
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
            <main id="docs-main-content" className="pt-8 pb-16" data-component="main-content" role="main">
              {/* Overview Section */}
              <Section 
                id="overview" 
                title="Design System Overview" 
                description="A comprehensive guide to our design system components, patterns, and principles."
                variant="alt"
              >
                <VStack spacing={8}>
                  <Callout title="Welcome to our Design System">
                    <Text>
                      Our design system provides a unified language for our digital products. It's built to help designers and developers 
                      create consistent, accessible, and beautiful user experiences efficiently.
                    </Text>
                  </Callout>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <Card className="shadow-sm hover:shadow transition-shadow">
                      <CardHeader className="pb-3">
                        <CardTitle className="text-xl">Foundations</CardTitle>
                        <CardDescription>The building blocks of our design</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <VStack spacing={4}>
                          <Text className="text-muted-foreground">
                            Our design foundations include typography, color, spacing, and other core elements that form the basis of our visual language.
                          </Text>
                          <div className="grid grid-cols-2 gap-2">
                            <div className="flex items-center gap-2 text-sm">
                              <TypeIcon className="h-4 w-4 text-primary" />
                              <span>Typography</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm">
                              <PaletteIcon className="h-4 w-4 text-primary" />
                              <span>Colors</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm">
                              <span className="i-lucide-ruler h-4 w-4 text-primary" />
                              <span>Spacing</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm">
                              <span className="i-lucide-layout h-4 w-4 text-primary" />
                              <span>Layout</span>
                            </div>
                          </div>
                        </VStack>
                      </CardContent>
                      <CardFooter className="pt-0 flex justify-end">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleNavClick("typography")}
                        >
                          Explore Foundations
                        </Button>
                      </CardFooter>
                    </Card>
                    
                    <Card className="shadow-sm hover:shadow transition-shadow">
                      <CardHeader className="pb-3">
                        <CardTitle className="text-xl">Components</CardTitle>
                        <CardDescription>Reusable UI building blocks</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <VStack spacing={4}>
                          <Text className="text-muted-foreground">
                            Our component library provides consistent, accessible, and customizable elements for building interfaces.
                          </Text>
                          <div className="grid grid-cols-2 gap-2">
                            <div className="flex items-center gap-2 text-sm">
                              <span className="i-lucide-square h-4 w-4 text-primary" />
                              <span>Buttons</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm">
                              <span className="i-lucide-credit-card h-4 w-4 text-primary" />
                              <span>Cards</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm">
                              <span className="i-lucide-input h-4 w-4 text-primary" />
                              <span>Inputs</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm">
                              <span className="i-lucide-list h-4 w-4 text-primary" />
                              <span>Navigation</span>
                            </div>
                          </div>
                        </VStack>
                      </CardContent>
                      <CardFooter className="pt-0 flex justify-end">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleNavClick("components")}
                        >
                          Explore Components
                        </Button>
                      </CardFooter>
                    </Card>
                  </div>
                  
                  <Banner variant="info" className="mt-4">
                    <div>
                      <p className="font-medium mb-1">Design System Principles</p>
                      <p>Our design system is built on four core principles: consistency, accessibility, flexibility, and simplicity.</p>
                    </div>
                  </Banner>
                  
                  <div className="bg-muted/30 p-6 rounded-lg border">
                    <Heading variant="subheading" className="mb-4">How to Use This Documentation</Heading>
                    <VStack spacing={4}>
                      <div className="flex gap-3">
                        <div className="bg-primary/10 text-primary rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0">1</div>
                        <Text>Navigate through sections using the sidebar menu to find specific components or guidelines.</Text>
                      </div>
                      <div className="flex gap-3">
                        <div className="bg-primary/10 text-primary rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0">2</div>
                        <Text>Each component includes examples, usage guidelines, and implementation details.</Text>
                      </div>
                      <div className="flex gap-3">
                        <div className="bg-primary/10 text-primary rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0">3</div>
                        <Text>Copy code examples directly or reference the component API documentation for implementation.</Text>
                      </div>
                    </VStack>
                  </div>
                </VStack>
              </Section>

              {/* Typography Section */}
              <Section
                id="typography" 
                title="Typography" 
                description="Our typography system creates clear visual hierarchy and ensures readability across all interfaces."
                variant="default"
              >
                <VStack spacing={8}>
                  <Callout title="Typography Philosophy">
                    <Text>
                      Our typography system is built on the principle of relationships rather than fixed styles. 
                      Elements are defined by how they relate to each other in the interface, creating a natural 
                      visual hierarchy while maintaining flexibility across different contexts.
                    </Text>
                  </Callout>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="bg-muted/30 p-6 rounded-lg border">
                      <Heading variant="subheading" className="mb-4">Type Scale</Heading>
                      <VStack spacing={4}>
                        <Text>
                          Our type scale is built on a balanced system that creates clear relationships between text elements.
                          Each step serves a specific purpose in the interface hierarchy.
                        </Text>
                        <div className="space-y-6 w-full">
                          <div>
                            <Heading variant="display" className="text-4xl">Display</Heading>
                            <Text className="text-muted-foreground">Used for hero sections and major feature introductions</Text>
                          </div>
                          <div>
                            <Heading variant="title" className="text-3xl">Page Title</Heading>
                            <Text className="text-muted-foreground">Used for page titles and major section headings</Text>
                          </div>
                          <div>
                            <Heading variant="heading" className="text-2xl">Section Heading</Heading>
                            <Text className="text-muted-foreground">Used for section headings and content dividers</Text>
                          </div>
                          <div>
                            <Heading variant="subheading" className="text-xl">Subheading</Heading>
                            <Text className="text-muted-foreground">Used for subsections and grouping related content</Text>
                          </div>
                          <div>
                            <Heading variant="subtitle" className="text-lg">Subtitle</Heading>
                            <Text className="text-muted-foreground">Used for supporting headings and emphasized text</Text>
                          </div>
                        </div>
                      </VStack>
                    </div>

                    <div className="bg-muted/30 p-6 rounded-lg border">
                      <Heading variant="subheading" className="mb-4">Text Elements</Heading>
                      <VStack spacing={4}>
                        <Text>
                          Our text components are designed for maximum readability and flexibility across different contexts.
                        </Text>
                        <div className="space-y-6 w-full">
                          <div>
                            <Eyebrow>EYEBROW / BROWLINE</Eyebrow>
                            <Text className="text-muted-foreground">Used for labels, categories, and section markers</Text>
                          </div>
                          <div>
                            <Text className="text-lg">Body Large</Text>
                            <Text className="text-muted-foreground">Used for introductory paragraphs and emphasized content</Text>
                          </div>
                          <div>
                            <Text>Body</Text>
                            <Text className="text-muted-foreground">Default text size for most content</Text>
                          </div>
                          <div>
                            <Text className="text-sm">Small Text</Text>
                            <Text className="text-muted-foreground">Used for captions, footnotes, and supporting text</Text>
                          </div>
                          <div>
                            <Text className="text-xs">Extra Small</Text>
                            <Text className="text-muted-foreground">Used for legal text, metadata, and fine print</Text>
                          </div>
                        </div>
                      </VStack>
                    </div>
                  </div>

                  <Card>
                    <CardHeader>
                      <CardTitle>Font Weight Philosophy</CardTitle>
                      <CardDescription>A balanced approach to weight distribution</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <VStack spacing={6}>
                        <Text>
                          Our typography system uses a balanced approach to font weights, creating clear hierarchy without relying on extreme contrasts.
                        </Text>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="p-4 border rounded-md">
                            <VStack spacing={3} align="start">
                              <Heading variant="subheading">Heading Weights</Heading>
                              <div className="space-y-3 w-full">
                                <div className="flex items-center justify-between">
                                  <Text className="font-semibold">Semibold (600)</Text>
                                  <Text className="text-muted-foreground">h1-h2</Text>
                                </div>
                                <div className="flex items-center justify-between">
                                  <Text className="font-medium">Medium (500)</Text>
                                  <Text className="text-muted-foreground">h3-h6</Text>
                                </div>
                              </div>
                            </VStack>
                          </div>
                          <div className="p-4 border rounded-md">
                            <VStack spacing={3} align="start">
                              <Heading variant="subheading">Text Weights</Heading>
                              <div className="space-y-3 w-full">
                                <div className="flex items-center justify-between">
                                  <Text className="font-bold">Bold (700)</Text>
                                  <Text className="text-muted-foreground">Emphasis</Text>
                                </div>
                                <div className="flex items-center justify-between">
                                  <Text className="font-medium">Medium (500)</Text>
                                  <Text className="text-muted-foreground">Subtle emphasis</Text>
                                </div>
                                <div className="flex items-center justify-between">
                                  <Text className="font-normal">Regular (400)</Text>
                                  <Text className="text-muted-foreground">Body text</Text>
                                </div>
                              </div>
                            </VStack>
                          </div>
                        </div>
                      </VStack>
                    </CardContent>
                  </Card>

                  <Banner variant="info">
                    <div>
                      <p className="font-medium mb-1">Accessibility Note</p>
                      <p>Our typography system is designed to meet WCAG AA standards for readability and contrast. Always ensure sufficient contrast between text and background colors.</p>
                    </div>
                  </Banner>

                  <div className="p-6 border rounded-lg">
                    <Heading variant="subheading" className="mb-4">Common Text Lockups</Heading>
                    <VStack spacing={5}>
                      <Text>
                        Text lockups are consistent patterns of typography elements used together to create cohesive UI components.
                      </Text>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="p-4 bg-muted/30 rounded-md">
                          <VStack spacing={2} align="start">
                            <Eyebrow>FEATURE HIGHLIGHT</Eyebrow>
                            <Heading variant="title">Feature Title</Heading>
                            <Text>A description of the feature that explains its benefits and functionality to the user.</Text>
                            <Button size="sm" className="mt-2">Learn More</Button>
                          </VStack>
                        </div>
                        
                        <div className="p-4 bg-muted/30 rounded-md">
                          <VStack spacing={2} align="start">
                            <Heading variant="subtitle">Content Section</Heading>
                            <Text>Main content that provides information to the user in a clear and concise manner.</Text>
                            <Text className="text-sm text-muted-foreground">Additional supporting information that adds context.</Text>
                          </VStack>
                        </div>
                      </div>
                    </VStack>
                  </div>
                  
                  <TypographyStackExample />
                </VStack>
              </Section>
              
              {/* Colors Section */}
              <Section 
                id="colors" 
                title="Colors" 
                description="Our semantic color system designed for flexibility, consistency, and accessibility."
              >
                <VStack spacing={8}>
                  <Card>
                    <CardHeader>
                      <CardTitle>Color System Architecture</CardTitle>
                      <CardDescription>A three-layer approach to color organization</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <VStack spacing={6}>
                        <Text>
                          Our color system is designed to create accessible, consistent, and visually appealing interfaces.
                          It's organized in three layers: base colors, semantic colors, and component colors.
                          We've aligned our color system with Tailwind v4, using direct hex values instead of HSL.
                        </Text>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                          <VStack spacing={4} className="p-4 border rounded-md">
                            <Heading variant="subheading">1. Base Colors</Heading>
                            <Text className="text-sm">
                              Foundational color scales from 50 (lightest) to 950 (darkest)
                            </Text>
                            <div className="grid grid-cols-5 gap-2">
                              <div className="flex flex-col items-center">
                                <div className="w-full h-12 bg-blue-50 rounded-md mb-1"></div>
                                <span className="text-xs">50</span>
                              </div>
                              <div className="flex flex-col items-center">
                                <div className="w-full h-12 bg-blue-200 rounded-md mb-1"></div>
                                <span className="text-xs">200</span>
                              </div>
                              <div className="flex flex-col items-center">
                                <div className="w-full h-12 bg-blue-400 rounded-md mb-1"></div>
                                <span className="text-xs">400</span>
                              </div>
                              <div className="flex flex-col items-center">
                                <div className="w-full h-12 bg-blue-600 rounded-md mb-1"></div>
                                <span className="text-xs">600</span>
                              </div>
                              <div className="flex flex-col items-center">
                                <div className="w-full h-12 bg-blue-800 rounded-md mb-1"></div>
                                <span className="text-xs">800</span>
                              </div>
                            </div>
                          </VStack>
                          
                          <VStack spacing={4} className="p-4 border rounded-md">
                            <Heading variant="subheading">2. Semantic Colors</Heading>
                            <Text className="text-sm">
                              Colors mapped to their purpose in the UI
                            </Text>
                            <div className="grid grid-cols-2 gap-2">
                              <div className="flex flex-col items-center">
                                <div className="w-full h-12 bg-background rounded-md border mb-1"></div>
                                <span className="text-xs">background</span>
                              </div>
                              <div className="flex flex-col items-center">
                                <div className="w-full h-12 bg-foreground rounded-md mb-1"></div>
                                <span className="text-xs">foreground</span>
                              </div>
                              <div className="flex flex-col items-center">
                                <div className="w-full h-12 bg-interactive rounded-md mb-1"></div>
                                <span className="text-xs">interactive</span>
                              </div>
                              <div className="flex flex-col items-center">
                                <div className="w-full h-12 bg-interactive-text rounded-md mb-1"></div>
                                <span className="text-xs">interactive-text</span>
                              </div>
                            </div>
                          </VStack>
                          
                          <VStack spacing={4} className="p-4 border rounded-md">
                            <Heading variant="subheading">3. Component Colors</Heading>
                            <Text className="text-sm">
                              Specific color applications for UI components
                            </Text>
                            <div className="grid grid-cols-1 gap-2">
                              <Button variant="solid" className="w-full">Solid Button</Button>
                              <Button variant="outline" className="w-full">Outline Button</Button>
                              <div className="p-2 bg-card rounded-md border border-border">
                                <span className="text-xs">Card Component</span>
                              </div>
                            </div>
                          </VStack>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <VStack spacing={4} className="p-4 border rounded-md">
                            <Heading variant="subheading">Primary Brand Colors</Heading>
                            <div className="grid grid-cols-5 gap-2">
                              <div className="flex flex-col items-center">
                                <div className="w-full h-12 bg-blue-50 rounded-md mb-1"></div>
                                <span className="text-xs">50</span>
                              </div>
                              <div className="flex flex-col items-center">
                                <div className="w-full h-12 bg-blue-200 rounded-md mb-1"></div>
                                <span className="text-xs">200</span>
                              </div>
                              <div className="flex flex-col items-center">
                                <div className="w-full h-12 bg-blue-400 rounded-md mb-1"></div>
                                <span className="text-xs">400</span>
                              </div>
                              <div className="flex flex-col items-center">
                                <div className="w-full h-12 bg-blue-600 rounded-md mb-1"></div>
                                <span className="text-xs">600</span>
                              </div>
                              <div className="flex flex-col items-center">
                                <div className="w-full h-12 bg-blue-800 rounded-md mb-1"></div>
                                <span className="text-xs">800</span>
                              </div>
                            </div>
                          </VStack>
                          
                          <VStack spacing={4} className="p-4 border rounded-md">
                            <Heading variant="subheading">Secondary Colors</Heading>
                            <div className="grid grid-cols-5 gap-2">
                              <div className="flex flex-col items-center">
                                <div className="w-full h-12 bg-gray-50 rounded-md mb-1"></div>
                                <span className="text-xs">50</span>
                              </div>
                              <div className="flex flex-col items-center">
                                <div className="w-full h-12 bg-gray-200 rounded-md mb-1"></div>
                                <span className="text-xs">200</span>
                              </div>
                              <div className="flex flex-col items-center">
                                <div className="w-full h-12 bg-gray-400 rounded-md mb-1"></div>
                                <span className="text-xs">400</span>
                              </div>
                              <div className="flex flex-col items-center">
                                <div className="w-full h-12 bg-gray-600 rounded-md mb-1"></div>
                                <span className="text-xs">600</span>
                              </div>
                              <div className="flex flex-col items-center">
                                <div className="w-full h-12 bg-gray-800 rounded-md mb-1"></div>
                                <span className="text-xs">800</span>
                              </div>
                            </div>
                          </VStack>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <VStack spacing={4} className="p-4 border rounded-md">
                            <Heading variant="subheading">Status Colors</Heading>
                            <div className="grid grid-cols-4 gap-2">
                              <div className="flex flex-col items-center">
                                <div className="w-full h-12 bg-success rounded-md mb-1"></div>
                                <span className="text-xs">Success</span>
                              </div>
                              <div className="flex flex-col items-center">
                                <div className="w-full h-12 bg-warning rounded-md mb-1"></div>
                                <span className="text-xs">Warning</span>
                              </div>
                              <div className="flex flex-col items-center">
                                <div className="w-full h-12 bg-error rounded-md mb-1"></div>
                                <span className="text-xs">Error</span>
                              </div>
                              <div className="flex flex-col items-center">
                                <div className="w-full h-12 bg-info rounded-md mb-1"></div>
                                <span className="text-xs">Info</span>
                              </div>
                            </div>
                          </VStack>
                          
                          <VStack spacing={4} className="p-4 border rounded-md">
                            <Heading variant="subheading">Surface Colors</Heading>
                            <div className="grid grid-cols-4 gap-2">
                              <div className="flex flex-col items-center">
                                <div className="w-full h-12 bg-background rounded-md border mb-1"></div>
                                <span className="text-xs">Background</span>
                              </div>
                              <div className="flex flex-col items-center">
                                <div className="w-full h-12 bg-background-subtle rounded-md border mb-1"></div>
                                <span className="text-xs">Subtle</span>
                              </div>
                              <div className="flex flex-col items-center">
                                <div className="w-full h-12 bg-card rounded-md border mb-1"></div>
                                <span className="text-xs">Card</span>
                              </div>
                              <div className="flex flex-col items-center">
                                <div className="w-full h-12 bg-muted rounded-md border mb-1"></div>
                                <span className="text-xs">Muted</span>
                              </div>
                            </div>
                          </VStack>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <VStack spacing={4} className="p-4 border rounded-md">
                            <Heading variant="subheading">Feedback Colors</Heading>
                            <div className="grid grid-cols-4 gap-2">
                              <div className="flex flex-col items-center">
                                <div className="w-full h-12 bg-green-600 rounded-md mb-1"></div>
                                <span className="text-xs">Success</span>
                              </div>
                              <div className="flex flex-col items-center">
                                <div className="w-full h-12 bg-amber-500 rounded-md mb-1"></div>
                                <span className="text-xs">Warning</span>
                              </div>
                              <div className="flex flex-col items-center">
                                <div className="w-full h-12 bg-red-600 rounded-md mb-1"></div>
                                <span className="text-xs">Destructive</span>
                              </div>
                              <div className="flex flex-col items-center">
                                <div className="w-full h-12 bg-blue-500 rounded-md mb-1"></div>
                                <span className="text-xs">Info</span>
                              </div>
                            </div>
                          </VStack>
                          
                          <VStack spacing={4} className="p-4 border rounded-md">
                            <Heading variant="subheading">UI Colors</Heading>
                            <div className="grid grid-cols-4 gap-2">
                              <div className="flex flex-col items-center">
                                <div className="w-full h-12 bg-background rounded-md border mb-1"></div>
                                <span className="text-xs">Background</span>
                              </div>
                              <div className="flex flex-col items-center">
                                <div className="w-full h-12 bg-foreground rounded-md mb-1"></div>
                                <span className="text-xs text-xs">Foreground</span>
                              </div>
                              <div className="flex flex-col items-center">
                                <div className="w-full h-12 bg-muted rounded-md mb-1"></div>
                                <span className="text-xs">Muted</span>
                              </div>
                              <div className="flex flex-col items-center">
                                <div className="w-full h-12 bg-border rounded-md mb-1"></div>
                                <span className="text-xs">Border</span>
                              </div>
                            </div>
                          </VStack>
                        </div>
                      </VStack>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle>Semantic Color Categories</CardTitle>
                      <CardDescription>Organized by purpose and function in the UI</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <VStack spacing={6}>
                        <Text>
                          Our semantic colors are organized into logical categories that make it easy to apply consistent styling
                          across the application. Each category has a specific purpose and contains both light and dark mode variants.
                        </Text>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <VStack spacing={4} className="p-4 border rounded-md">
                            <Heading variant="subheading">Surface Colors</Heading>
                            <Text className="text-sm">Background colors for different UI layers</Text>
                            <div className="space-y-2 w-full">
                              <div className="p-3 bg-background rounded-md border border-border">
                                <Text className="text-xs">background</Text>
                                <Text className="text-xs text-muted-foreground">Primary background color</Text>
                              </div>
                              <div className="p-3 bg-background-subtle rounded-md border border-border">
                                <Text className="text-xs">background-subtle</Text>
                                <Text className="text-xs text-muted-foreground">Secondary background color</Text>
                              </div>
                              <div className="p-3 bg-card rounded-md border border-border">
                                <Text className="text-xs">card</Text>
                                <Text className="text-xs text-muted-foreground">Card background color</Text>
                              </div>
                              <div className="p-3 bg-muted rounded-md border border-border">
                                <Text className="text-xs">muted</Text>
                                <Text className="text-xs text-muted-foreground">Muted background color</Text>
                              </div>
                            </div>
                          </VStack>
                          
                          <VStack spacing={4} className="p-4 border rounded-md">
                            <Heading variant="subheading">Content Colors</Heading>
                            <Text className="text-sm">Text and icon colors</Text>
                            <div className="space-y-2 w-full bg-background p-3 rounded-md border border-border">
                              <div>
                                <Text className="text-foreground">foreground</Text>
                                <Text className="text-xs text-muted-foreground">Primary text color</Text>
                              </div>
                              <div>
                                <Text className="text-foreground-muted">foreground-muted</Text>
                                <Text className="text-xs text-muted-foreground">Secondary text color</Text>
                              </div>
                              <div>
                                <Text className="text-foreground-subtle">foreground-subtle</Text>
                                <Text className="text-xs text-muted-foreground">Subtle text color</Text>
                              </div>
                              <div>
                                <Text className="text-interactive">interactive</Text>
                                <Text className="text-xs text-muted-foreground">Interactive text color</Text>
                              </div>
                            </div>
                          </VStack>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <VStack spacing={4} className="p-4 border rounded-md">
                            <Heading variant="subheading">Border Colors</Heading>
                            <Text className="text-sm">Border and divider colors</Text>
                            <div className="space-y-2 w-full">
                              <div className="p-3 bg-background rounded-md border border-border">
                                <Text className="text-xs">border</Text>
                                <Text className="text-xs text-muted-foreground">Default border color</Text>
                              </div>
                              <div className="p-3 bg-background rounded-md border border-border-focus">
                                <Text className="text-xs">border-focus</Text>
                                <Text className="text-xs text-muted-foreground">Focus state border color</Text>
                              </div>
                              <div className="p-3 bg-background rounded-md border border-border-hover">
                                <Text className="text-xs">border-hover</Text>
                                <Text className="text-xs text-muted-foreground">Hover state border color</Text>
                              </div>
                            </div>
                          </VStack>
                          
                          <VStack spacing={4} className="p-4 border rounded-md">
                            <Heading variant="subheading">Interactive Colors</Heading>
                            <Text className="text-sm">Colors for interactive elements</Text>
                            <div className="space-y-2 w-full">
                              <div className="p-3 bg-interactive rounded-md">
                                <Text className="text-xs text-interactive-text">interactive</Text>
                                <Text className="text-xs text-interactive-text/80">Default interactive color</Text>
                              </div>
                              <div className="p-3 bg-interactive-hover rounded-md">
                                <Text className="text-xs text-interactive-text">interactive-hover</Text>
                                <Text className="text-xs text-interactive-text/80">Hover state</Text>
                              </div>
                              <div className="p-3 bg-interactive-active rounded-md">
                                <Text className="text-xs text-interactive-text">interactive-active</Text>
                                <Text className="text-xs text-interactive-text/80">Active state</Text>
                              </div>
                              <div className="p-3 bg-interactive-muted rounded-md border border-border">
                                <Text className="text-xs">interactive-muted</Text>
                                <Text className="text-xs text-muted-foreground">Muted interactive color</Text>
                              </div>
                            </div>
                          </VStack>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <VStack spacing={4} className="p-4 border rounded-md">
                            <Heading variant="subheading">Status Colors</Heading>
                            <Text className="text-sm">Feedback and status colors</Text>
                            <div className="space-y-2 w-full">
                              <div className="p-3 bg-success rounded-md">
                                <Text className="text-xs text-success-foreground">success</Text>
                                <Text className="text-xs text-success-foreground/80">Success state</Text>
                              </div>
                              <div className="p-3 bg-warning rounded-md">
                                <Text className="text-xs text-warning-foreground">warning</Text>
                                <Text className="text-xs text-warning-foreground/80">Warning state</Text>
                              </div>
                              <div className="p-3 bg-error rounded-md">
                                <Text className="text-xs text-error-foreground">error</Text>
                                <Text className="text-xs text-error-foreground/80">Error state</Text>
                              </div>
                              <div className="p-3 bg-info rounded-md">
                                <Text className="text-xs text-info-foreground">info</Text>
                                <Text className="text-xs text-info-foreground/80">Information state</Text>
                              </div>
                            </div>
                          </VStack>
                          
                          <VStack spacing={4} className="p-4 border rounded-md">
                            <Heading variant="subheading">Component Colors</Heading>
                            <Text className="text-sm">Colors for specific UI components</Text>
                            <div className="space-y-4 w-full">
                              <div>
                                <Text className="text-sm font-medium mb-2">Button</Text>
                                <div className="flex gap-2">
                                  <Button variant="solid" size="sm">Solid</Button>
                                  <Button variant="outline" size="sm">Outline</Button>
                                </div>
                              </div>
                              <div>
                                <Text className="text-sm font-medium mb-2">Card</Text>
                                <div className="p-3 bg-card rounded-md border border-border">
                                  <Text className="text-xs">Card component</Text>
                                </div>
                              </div>
                              <div>
                                <Text className="text-sm font-medium mb-2">Banner</Text>
                                <div className="p-2 bg-info-subtle rounded-md border border-info/30">
                                  <Text className="text-xs text-info">Info banner</Text>
                                </div>
                              </div>
                            </div>
                          </VStack>
                        </div>
                      </VStack>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle>Theme System</CardTitle>
                      <CardDescription>Multiple color themes with light and dark modes</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <VStack spacing={6}>
                        <Text>
                          Our theme system supports multiple color palettes and light/dark modes. Each theme consists of semantic color tokens
                          that map to our base colors, providing a consistent look and feel while allowing for customization.
                        </Text>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <VStack spacing={4} className="p-4 border rounded-md">
                            <Heading variant="subheading">Theme Generation</Heading>
                            <Text className="text-sm">
                              Themes are generated using the <code>createThemeColors</code> function, which takes a primary color
                              scale and optional secondary and accent colors.
                            </Text>
                            <div className="p-3 bg-muted rounded-md">
                              <pre className="text-xs overflow-x-auto">
                                <code>
{`// Create a theme with teal as primary
const tealTheme = createThemeColors(
  baseColors.teal,
  baseColors.gray,
  baseColors.amber
);`}
                                </code>
                              </pre>
                            </div>
                            <div className="grid grid-cols-1 gap-2">
                              <div className="flex items-center gap-3">
                                <div className="w-6 h-6 rounded-full bg-blue-600"></div>
                                <Text>Blue (Default)</Text>
                              </div>
                              <div className="flex items-center gap-3">
                                <div className="w-6 h-6 rounded-full bg-teal-600"></div>
                                <Text>Teal</Text>
                              </div>
                              <div className="flex items-center gap-3">
                                <div className="w-6 h-6 rounded-full bg-purple-600"></div>
                                <Text>Purple</Text>
                              </div>
                            </div>
                          </VStack>
                          
                          <VStack spacing={4} className="p-4 border rounded-md">
                            <Heading variant="subheading">Dark Mode</Heading>
                            <Text className="text-sm">
                              Each semantic color has a dark mode variant. The theme system automatically switches between
                              light and dark mode based on user preference.
                            </Text>
                            <div className="grid grid-cols-2 gap-2">
                              <div className="p-3 bg-background rounded-md border border-border">
                                <Text className="text-xs">Light Mode</Text>
                                <Text className="text-foreground text-sm">Text Color</Text>
                              </div>
                              <div className="p-3 bg-background-dark rounded-md border border-border-dark">
                                <Text className="text-xs text-foreground-dark">Dark Mode</Text>
                                <Text className="text-foreground-dark text-sm">Text Color</Text>
                              </div>
                            </div>
                            <Text className="text-sm">
                              Use the theme toggle in the sidebar to switch between light and dark mode.
                            </Text>
                          </VStack>
                        </div>
                        
                        <Callout title="Using Semantic Colors">
                          <Text>
                            Always use semantic color tokens instead of base colors in your components. This ensures
                            consistency and makes theme switching easier.
                          </Text>
                          <div className="mt-4 p-3 bg-muted rounded-md">
                            <pre className="text-xs overflow-x-auto">
                              <code>
{`// Good
<div className="bg-background text-foreground"></div>

// Avoid
<div className="bg-white text-gray-900"></div>`}
                              </code>
                            </pre>
                          </div>
                        </Callout>
                      </VStack>
                    </CardContent>
                  </Card>
                </VStack>
              </Section>

              {/* Layout & Spacing Section */}
              <Section 
                id="layout" 
                title="Layout & Spacing" 
                description="Consistent spacing and layout systems for harmonious interfaces."
              >
                <VStack spacing={8}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <Card>
                      <CardHeader>
                        <CardTitle>Spacing System</CardTitle>
                        <CardDescription>A consistent scale for margins and padding</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <VStack spacing={4}>
                          <Text>
                            Our spacing system uses a 4px grid as its foundation, creating a consistent rhythm throughout the interface.
                          </Text>
                          <div className="space-y-3 w-full">
                            <div className="flex items-center gap-3">
                              <div className="w-4 h-4 bg-primary/20 border border-primary/30"></div>
                              <Text>4px (spacing-1) - Micro spacing</Text>
                            </div>
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 bg-primary/20 border border-primary/30"></div>
                              <Text>8px (spacing-2) - Compact elements</Text>
                            </div>
                            <div className="flex items-center gap-3">
                              <div className="w-12 h-12 bg-primary/20 border border-primary/30"></div>
                              <Text>12px (spacing-3) - Related elements</Text>
                            </div>
                            <div className="flex items-center gap-3">
                              <div className="w-16 h-16 bg-primary/20 border border-primary/30"></div>
                              <Text>16px (spacing-4) - Default spacing</Text>
                            </div>
                            <div className="flex items-center gap-3">
                              <div className="w-24 h-24 bg-primary/20 border border-primary/30"></div>
                              <Text>24px (spacing-6) - Section spacing</Text>
                            </div>
                          </div>
                        </VStack>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardHeader>
                        <CardTitle>Layout Principles</CardTitle>
                        <CardDescription>Creating balanced and harmonious interfaces</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <VStack spacing={4}>
                          <Text>
                            Our layout system is built on a few core principles that ensure consistency and harmony across all interfaces.
                          </Text>
                          <div className="space-y-3 w-full">
                            <div className="p-3 border rounded-md">
                              <Text className="font-medium">Hierarchy</Text>
                              <Text className="text-muted-foreground">Visual importance should be clear and intentional</Text>
                            </div>
                            <div className="p-3 border rounded-md">
                              <Text className="font-medium">Consistency</Text>
                              <Text className="text-muted-foreground">Similar elements should be treated similarly</Text>
                            </div>
                            <div className="p-3 border rounded-md">
                              <Text className="font-medium">Proximity</Text>
                              <Text className="text-muted-foreground">Related elements should be grouped together</Text>
                            </div>
                            <div className="p-3 border rounded-md">
                              <Text className="font-medium">Alignment</Text>
                              <Text className="text-muted-foreground">Elements should align to create visual order</Text>
                            </div>
                          </div>
                        </VStack>
                      </CardContent>
                    </Card>
                  </div>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle>Stack Component</CardTitle>
                      <CardDescription>A powerful way to manage spacing in your layouts</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <VStack spacing={6}>
                        <Text>
                          Our Stack component system makes it easy to create consistent spacing between elements. 
                          It's inspired by Chakra UI and provides an intuitive way to handle both vertical and horizontal spacing.
                        </Text>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <VStack spacing={4} className="p-4 border rounded-md">
                            <Heading variant="subheading">Vertical Stack (VStack)</Heading>
                            <Text>
                              Creates consistent vertical spacing between elements. Perfect for typography and content sections.
                            </Text>
                            <div className="p-4 bg-muted rounded-md w-full">
                              <VStack spacing={3} align="start">
                                <Eyebrow>EXAMPLE</Eyebrow>
                                <Heading variant="subtitle">Vertical Spacing</Heading>
                                <Text>Each element has the same spacing between them.</Text>
                                <Button size="sm">Action</Button>
                              </VStack>
                            </div>
                          </VStack>
                          
                          <VStack spacing={4} className="p-4 border rounded-md">
                            <Heading variant="subheading">Horizontal Stack (HStack)</Heading>
                            <Text>
                              Creates consistent horizontal spacing between elements. Great for buttons, tags, and inline elements.
                            </Text>
                            <div className="p-4 bg-muted rounded-md w-full">
                              <HStack spacing={3} align="center">
                                <Button size="sm" variant="outline">Button 1</Button>
                                <Button size="sm" variant="outline">Button 2</Button>
                                <Button size="sm" variant="outline">Button 3</Button>
                              </HStack>
                            </div>
                          </VStack>
                        </div>
                        
                        <VStack spacing={4} className="p-4 border rounded-md">
                          <Heading variant="subheading">Stack Props</Heading>
                          <div className="w-full overflow-x-auto">
                            <table className="min-w-full border-collapse">
                              <thead>
                                <tr className="border-b">
                                  <th className="py-2 px-4 text-left">Prop</th>
                                  <th className="py-2 px-4 text-left">Type</th>
                                  <th className="py-2 px-4 text-left">Default</th>
                                  <th className="py-2 px-4 text-left">Description</th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr className="border-b">
                                  <td className="py-2 px-4">spacing</td>
                                  <td className="py-2 px-4">0 | 1 | 2 | 3 | 4 | 5 | 6 | 8 | 10 | 12 | 16</td>
                                  <td className="py-2 px-4">4</td>
                                  <td className="py-2 px-4">The spacing between child elements</td>
                                </tr>
                                <tr className="border-b">
                                  <td className="py-2 px-4">direction</td>
                                  <td className="py-2 px-4">"row" | "column"</td>
                                  <td className="py-2 px-4">"column"</td>
                                  <td className="py-2 px-4">The direction of the stack</td>
                                </tr>
                                <tr className="border-b">
                                  <td className="py-2 px-4">align</td>
                                  <td className="py-2 px-4">"start" | "center" | "end" | "stretch"</td>
                                  <td className="py-2 px-4">"stretch"</td>
                                  <td className="py-2 px-4">How to align items on the cross axis</td>
                                </tr>
                                <tr className="border-b">
                                  <td className="py-2 px-4">justify</td>
                                  <td className="py-2 px-4">"start" | "center" | "end" | "between" | "around" | "evenly"</td>
                                  <td className="py-2 px-4">"start"</td>
                                  <td className="py-2 px-4">How to align items on the main axis</td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </VStack>
                      </VStack>
                    </CardContent>
                  </Card>
                  
                  <Callout title="When to Use Stack Components">
                    <VStack spacing={3}>
                      <Text>
                        Stack components are ideal for creating consistent spacing relationships between elements. Use them when:
                      </Text>
                      <ul className="list-disc pl-6 space-y-2">
                        <li>You need to maintain consistent spacing between multiple elements</li>
                        <li>You want to create a clear visual hierarchy through spacing</li>
                        <li>You need to align elements along a single axis</li>
                        <li>You want to simplify responsive layout adjustments</li>
                      </ul>
                    </VStack>
                  </Callout>
                </VStack>
              </Section>

              {/* Components Section */}
              <Section 
                id="components" 
                title="Components" 
                description="Reusable UI building blocks for consistent interfaces."
              >
                <VStack spacing={8}>
                  <Card>
                    <CardHeader>
                      <CardTitle>Button</CardTitle>
                      <CardDescription>Interactive elements for user actions</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <VStack spacing={6}>
                        <Text>
                          Buttons allow users to take actions and make choices with a single tap. 
                          Our button component supports various sizes, variants, and states.
                        </Text>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <VStack spacing={4} className="p-4 border rounded-md">
                            <Heading variant="subheading">Variants</Heading>
                            <VStack spacing={3} className="w-full">
                              <HStack spacing={3} className="flex-wrap">
                                <Button variant="default">Default</Button>
                                <Button variant="destructive">Destructive</Button>
                                <Button variant="outline">Outline</Button>
                                <Button variant="secondary">Secondary</Button>
                                <Button variant="ghost">Ghost</Button>
                                <Button variant="link">Link</Button>
                              </HStack>
                            </VStack>
                          </VStack>
                          
                          <VStack spacing={4} className="p-4 border rounded-md">
                            <Heading variant="subheading">Color Schemes</Heading>
                            <VStack spacing={3} className="w-full">
                              <HStack spacing={3} className="flex-wrap">
                                <Button colorScheme="primary">Primary</Button>
                                <Button colorScheme="secondary">Secondary</Button>
                                <Button colorScheme="destructive">Destructive</Button>
                                <Button colorScheme="success">Success</Button>
                                <Button colorScheme="warning">Warning</Button>
                                <Button colorScheme="info">Info</Button>
                              </HStack>
                            </VStack>
                          </VStack>
                          
                          <VStack spacing={4} className="p-4 border rounded-md">
                            <Heading variant="subheading">Sizes</Heading>
                            <HStack spacing={3} className="flex-wrap" align="center">
                              <Button size="sm">Small</Button>
                              <Button size="default">Default</Button>
                              <Button size="lg">Large</Button>
                              <Button size="icon">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
                                  <path d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 002.25 21h15A2.25 2.25 0 0021.75 18.75m-18-9.5A2.25 2.25 0 004.5 7.5h15A2.25 2.25 0 0021.75 7.5m-18 9.5A2.25 2.25 0 002.25 18.75h15A2.25 2.25 0 0021.75 18.75" />
                                </svg>
                              </Button>
                            </HStack>
                          </VStack>
                        </div>
                        
                        <VStack spacing={4} className="p-4 border rounded-md">
                          <Heading variant="subheading">States</Heading>
                          <HStack spacing={4} className="flex-wrap" align="center">
                            <Button>Default</Button>
                            <Button isLoading>Loading</Button>
                            <Button disabled>Disabled</Button>
                            <Button variant="outline">Outline</Button>
                            <Button variant="outline" disabled>Disabled Outline</Button>
                          </HStack>
                        </VStack>
                        
                        <VStack spacing={4} className="p-4 border rounded-md">
                          <Heading variant="subheading">Usage Guidelines</Heading>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <VStack spacing={2} align="start">
                              <Text className="font-medium">Do</Text>
                              <ul className="list-disc pl-5 space-y-1">
                                <li>Use the primary button for the main action</li>
                                <li>Use clear, action-oriented labels</li>
                                <li>Maintain consistent button styling across the interface</li>
                              </ul>
                            </VStack>
                            <VStack spacing={2} align="start">
                              <Text className="font-medium">Don't</Text>
                              <ul className="list-disc pl-5 space-y-1">
                                <li>Use too many buttons in a single view</li>
                                <li>Use buttons for navigation (use links instead)</li>
                                <li>Use vague labels like "Click Here"</li>
                              </ul>
                            </VStack>
                          </div>
                        </VStack>
                      </VStack>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle>Card</CardTitle>
                      <CardDescription>Container for related content and actions</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <VStack spacing={6}>
                        <Text>
                          Cards are used to group related content and actions. They can contain various elements such as text, images, and buttons.
                        </Text>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <Card className="shadow-sm">
                            <CardHeader>
                              <CardTitle>Card Title</CardTitle>
                              <CardDescription>Card description goes here</CardDescription>
                            </CardHeader>
                            <CardContent>
                              <VStack spacing={3}>
                                <Text>This is the main content area of the card.</Text>
                                <Text className="text-muted-foreground">You can add any content here.</Text>
                              </VStack>
                            </CardContent>
                            <CardFooter className="flex justify-end">
                              <Button variant="outline" size="sm">Action</Button>
                            </CardFooter>
                          </Card>
                          
                          <VStack spacing={4} className="p-4 border rounded-md">
                            <Heading variant="subheading">Card Composition</Heading>
                            <VStack spacing={2} align="start">
                              <Text className="font-medium">Card Components</Text>
                              <ul className="list-disc pl-5 space-y-1">
                                <li><code>Card</code> - The main container</li>
                                <li><code>CardHeader</code> - Contains title and description</li>
                                <li><code>CardTitle</code> - The card's title</li>
                                <li><code>CardDescription</code> - Supporting text</li>
                                <li><code>CardContent</code> - Main content area</li>
                                <li><code>CardFooter</code> - Actions area, typically at the bottom</li>
                              </ul>
                            </VStack>
                          </VStack>
                        </div>
                        
                        <VStack spacing={4} className="p-4 border rounded-md">
                          <Heading variant="subheading">Usage Guidelines</Heading>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <VStack spacing={2} align="start">
                              <Text className="font-medium">Do</Text>
                              <ul className="list-disc pl-5 space-y-1">
                                <li>Use cards to group related content</li>
                                <li>Keep card content concise and focused</li>
                                <li>Use consistent card styling across the interface</li>
                              </ul>
                            </VStack>
                            <VStack spacing={2} align="start">
                              <Text className="font-medium">Don't</Text>
                              <ul className="list-disc pl-5 space-y-1">
                                <li>Overload cards with too much content</li>
                                <li>Nest cards within cards</li>
                                <li>Use cards for single elements that don't need grouping</li>
                              </ul>
                            </VStack>
                          </div>
                        </VStack>
                      </VStack>
                    </CardContent>
                  </Card>
                </VStack>
              </Section>

              {/* Base Components Section */}
              <Section 
                id="base" 
                title="Base Components" 
                description="Foundational UI elements for building interfaces."
              >
                <VStack spacing={8}>
                  <Text>
                    Base components are the fundamental building blocks of our design system.
                    They provide the foundation for more complex components and patterns.
                  </Text>
                </VStack>
              </Section>
            </main>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DesignDocsPage;
