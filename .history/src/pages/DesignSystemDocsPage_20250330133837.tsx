import React, { useState, useRef, useEffect, ReactNode } from 'react';
import { UI } from '@/components/ui';
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
  Badge,
  Alert,
  AlertTitle,
  AlertDescription,
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  Input,
  Label,
  Button,
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui';
import { Heading, SubHeading, Text, Code, Kbd } from '@/components/ui/typography';
import { Callout } from '@/components/ui/Callout';
import { ColorScale } from '@/components/ui/ColorScale';
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';
import { ThemeToggle } from '@/components/ui/theme/theme-toggle';
import {
  Bars3Icon,
  XMarkIcon,
  SwatchIcon,
  DocumentTextIcon,
  CubeIcon,
  PaintBrushIcon,
  ViewColumnsIcon,
  CommandLineIcon,
  BellIcon,
  MagnifyingGlassIcon,
  BuildingLibraryIcon,
  ArrowsPointingOutIcon,
  CursorArrowRaysIcon,
  DocumentDuplicateIcon,
  ExclamationTriangleIcon,
  MapIcon,
  WrenchScrewdriverIcon,
  CheckCircleIcon,
  UserGroupIcon,
  BoltIcon,
  ChevronDownIcon,
} from '@heroicons/react/24/outline';

// Type definitions for navigation sections
interface Section {
  id: string;
  title: string;
  icon: React.ElementType;
}

// Section container with proper spacing and structure
const Section: React.FC<{
  id: string;
  title: string;
  description?: string;
  children: ReactNode;
}> = ({ id, title, description, children }) => {
  return (
    <section id={id} className="pt-4 pb-16 scroll-mt-20">
      <h2 className="text-3xl font-bold mb-3">{title}</h2>
      {description && (
        <p className="text-lg text-muted-foreground mb-8 max-w-3xl">{description}</p>
      )}
      {children}
    </section>
  );
};

interface ColorInfo {
  name: string;
  bg: string;
  value: string;
}

// Color presentation component
const ColorPalette: React.FC<{
  title: string;
  colors: ColorInfo[];
}> = ({ title, colors }) => {
  return (
    <div className="mb-12">
      <h3 className="text-xl font-semibold mb-4">{title}</h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
        {colors.map((color) => (
          <Card key={color.name} className="overflow-hidden">
            <div 
              className={`h-24 ${color.bg}`} 
            />
            <CardContent className="pt-3">
              <div className="font-medium">{color.name}</div>
              <div className="text-sm text-muted-foreground">{color.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

// Typography component
const TypographyExample: React.FC<{
  name: string;
  className: string;
  children: ReactNode;
}> = ({ name, className, children }) => {
  return (
    <Card className="mb-6 overflow-hidden">
      <CardContent className="pt-6">
        <div className={`${className} mb-4`}>{children}</div>
      </CardContent>
      <div className="flex justify-between text-sm bg-muted px-4 py-2 border-t">
        <Badge variant="outline">{name}</Badge>
        <code className="text-xs bg-muted-foreground/20 px-1 py-0.5 rounded">{className}</code>
      </div>
    </Card>
  );
};

// Component Preview
const ComponentPreview: React.FC<{
  title: string;
  description?: string;
  children: ReactNode;
}> = ({ title, description, children }) => {
  return (
    <Card className="mb-12">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {description && <p className="text-muted-foreground">{description}</p>}
      </CardHeader>
      <CardContent className="p-6 bg-card rounded-lg border-t">
        {children}
      </CardContent>
    </Card>
  );
};

// Main Design System Documentation component
const DesignSystemDocsPage = (): React.ReactNode => {
  // Define documentation sections with icons
  const sections = [
    { id: "intro", title: "Introduction", icon: DocumentTextIcon },
    
    // Design Fundamentals
    { id: "colors", title: "Colors", icon: SwatchIcon },
    { id: "typography", title: "Typography", icon: DocumentTextIcon },
    { id: "spacing", title: "Spacing", icon: ArrowsPointingOutIcon },
    { id: "themes", title: "Theming", icon: PaintBrushIcon },
    
    // Basic Components
    { id: "buttons", title: "Buttons", icon: CursorArrowRaysIcon },
    { id: "inputs", title: "Form Inputs", icon: DocumentDuplicateIcon },
    { id: "form", title: "Form Controls", icon: DocumentDuplicateIcon },
    
    // Interactive Components
    { id: "select", title: "Select", icon: CommandLineIcon },
    { id: "dropdown", title: "Dropdown", icon: CommandLineIcon },
    { id: "dialog", title: "Dialog", icon: DocumentDuplicateIcon },
    { id: "sheet", title: "Sheets", icon: ViewColumnsIcon },
    { id: "accordion", title: "Collapsible", icon: ViewColumnsIcon },
    
    // Visual & Feedback
    { id: "data", title: "Data Display", icon: DocumentDuplicateIcon },
    { id: "avatar", title: "Avatar", icon: UserGroupIcon },
    { id: "feedback", title: "Feedback", icon: ExclamationTriangleIcon },
    { id: "toast", title: "Notifications", icon: BellIcon },
    
    // Navigation & Layout
    { id: "navigation", title: "Navigation", icon: MapIcon },
    { id: "utilities", title: "Utilities", icon: WrenchScrewdriverIcon },
    
    // Overview
    { id: "components", title: "Component Index", icon: CubeIcon },
  ];

  // State for active section and mobile menu
  const [activeSection, setActiveSection] = useState(sections[0].id);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});

  // Example colors - updated with RGB values for Tailwind v4
  const themeColors: ColorInfo[] = [
    { name: "Background", bg: "bg-background", value: "rgb(var(--background))" },
    { name: "Foreground", bg: "bg-foreground", value: "rgb(var(--foreground))" },
    { name: "Primary", bg: "bg-primary", value: "rgb(var(--primary))" },
    { name: "Secondary", bg: "bg-secondary", value: "rgb(var(--secondary))" },
    { name: "Accent", bg: "bg-accent", value: "rgb(var(--accent))" },
  ];

  const uiColors: ColorInfo[] = [
    { name: "Card", bg: "bg-card", value: "rgb(var(--card))" },
    { name: "Muted", bg: "bg-muted", value: "rgb(var(--muted))" },
    { name: "Destructive", bg: "bg-destructive", value: "rgb(var(--destructive))" },
    { name: "Success", bg: "bg-success", value: "rgb(var(--success))" },
    { name: "Warning", bg: "bg-warning", value: "rgb(var(--warning))" },
    { name: "Info", bg: "bg-info", value: "rgb(var(--info))" },
    { name: "Border", bg: "bg-border", value: "rgb(var(--border))" },
    { name: "Ring", bg: "bg-ring", value: "rgb(var(--ring))" },
  ];

  // Observer for sections
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-100px 0px -60% 0px" }
    );

    sections.forEach((section) => {
      const element = document.getElementById(section.id);
      if (element) {
        observer.observe(element);
        sectionRefs.current[section.id] = element;
      }
    });

    return () => {
      sections.forEach((section) => {
        const element = sectionRefs.current[section.id];
        if (element) {
          observer.unobserve(element);
        }
      });
    };
  }, [sections]);

  // Scroll to section function
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setMobileMenuOpen(false);
    }
  };

  // Main content sections for the documentation
  const mainContent = (
    <div className="space-y-8">
      {/* Intro Section */}
      <Section 
        id="intro" 
        title="Design System Documentation" 
        description="A comprehensive guide to our design language, components, and principles for building consistent interfaces."
      >
        <Alert className="mb-6">
          <AlertTitle>Design System v1.0</AlertTitle>
          <AlertDescription>
            Built with Tailwind v4 and focused on accessibility, modularity, and developer experience.
          </AlertDescription>
        </Alert>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Design Principles</CardTitle>
            <CardDescription>The core values that guide our design decisions</CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
                <CheckCircleIcon className="h-5 w-5 text-primary" /> 
                Consistency
              </h3>
              <p className="text-muted-foreground">
                Use common patterns and established components to create intuitive, familiar experiences.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
                <UserGroupIcon className="h-5 w-5 text-primary" /> 
                Accessibility
              </h3>
              <p className="text-muted-foreground">
                Design for everyone, ensuring our interfaces meet or exceed WCAG 2.1 AA standards.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
                <CubeIcon className="h-5 w-5 text-primary" /> 
                Modularity
              </h3>
              <p className="text-muted-foreground">
                Build with composable pieces that scale across products and adapt to different contexts.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
                <BoltIcon className="h-5 w-5 text-primary" /> 
                Performance
              </h3>
              <p className="text-muted-foreground">
                Create lightweight, optimized interfaces that load quickly and run smoothly.
              </p>
            </div>
          </CardContent>
        </Card>

        <ComponentPreview title="System Structure">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="bg-background hover:bg-muted/20 transition-colors">
              <CardContent className="p-6">
                <div className="flex items-center space-x-2 mb-2">
                  <BuildingLibraryIcon className="h-5 w-5 text-primary" />
                  <h3 className="font-medium">Foundations</h3>
                </div>
                <p className="text-sm text-muted-foreground">Colors, typography, spacing, and other design tokens</p>
              </CardContent>
            </Card>
            
            <Card className="bg-background hover:bg-muted/20 transition-colors">
              <CardContent className="p-6">
                <div className="flex items-center space-x-2 mb-2">
                  <CubeIcon className="h-5 w-5 text-primary" />
                  <h3 className="font-medium">Components</h3>
                </div>
                <p className="text-sm text-muted-foreground">Reusable UI building blocks for interfaces</p>
              </CardContent>
            </Card>
            
            <Card className="bg-background hover:bg-muted/20 transition-colors">
              <CardContent className="p-6">
                <div className="flex items-center space-x-2 mb-2">
                  <WrenchScrewdriverIcon className="h-5 w-5 text-primary" />
                  <h3 className="font-medium">Patterns</h3>
                </div>
                <p className="text-sm text-muted-foreground">Common combinations and solutions to UX problems</p>
              </CardContent>
            </Card>
          </div>
        </ComponentPreview>
      </Section>

      {/* Colors Section */}
      <Section 
        id="colors" 
        title="Colors" 
        description="Our color system uses Tailwind v4 RGB format for consistent theming across light and dark modes."
      >
        <div className="mb-8">
          <div className="text-lg font-semibold mb-3">Color Format</div>
          <div className="p-4 bg-muted rounded-md">
              <code className="text-sm">
              {`/* Tailwind v4 RGB format */
--primary: 14 116 144;  /* Instead of #0e7490 */
--background: 255 255 255;  /* Instead of #ffffff */`}
              </code>
            </div>
          <p className="mt-3 text-muted-foreground">
            Colors are defined as space-separated RGB values without commas, enabling opacity modifications using the slash syntax.
          </p>
          </div>

        <ColorPalette title="Base Theme Colors" colors={themeColors} />
        <ColorPalette title="UI Component Colors" colors={uiColors} />
        
        <div className="mt-10">
          <h3 className="text-xl font-semibold mb-4">Color Scale</h3>
          <p className="mb-6">Each color has multiple shades available for different contexts.</p>
          
          <div className="grid gap-8">
            <div>
              <h4 className="font-medium mb-3">Primary Color Scale</h4>
              <div className="grid grid-cols-10 h-12 rounded-md overflow-hidden">
                {[50, 100, 200, 300, 400, 500, 600, 700, 800, 900].map((weight) => (
                  <div 
                    key={weight}
                    className={`bg-primary-${weight} flex items-end justify-center`}
                  >
                    <span className="text-[10px] font-medium pb-1 text-primary-foreground">{weight}</span>
                </div>
              ))}
            </div>
          </div>
            
            <div>
              <h4 className="font-medium mb-3">Gray Scale</h4>
              <div className="grid grid-cols-10 h-12 rounded-md overflow-hidden">
                {[50, 100, 200, 300, 400, 500, 600, 700, 800, 900].map((weight) => (
                  <div 
                    key={weight}
                    className={`bg-gray-${weight} flex items-end justify-center`}
                  >
                    <span className="text-[10px] font-medium pb-1 text-gray-foreground">{weight}</span>
                  </div>
                ))}
              </div>
            </div>
                    </div>
                  </div>
      </Section>

      {/* Typography */}
      <Section 
        id="typography" 
        title="Typography" 
        description="Our typography system establishes visual hierarchy, improves readability, and creates a consistent experience across interfaces."
      >
        <ComponentPreview title="Font Family">
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-medium mb-3">Primary Font: Maison Neue</h3>
                <p className="text-muted-foreground mb-2">
                  Our primary font for all UI elements and content. It's modern, legible, and works well at all sizes.
                </p>
                <div className="p-3 bg-muted/30 rounded-md">
                  <code className="text-sm text-muted-foreground">font-[var(--font-maison-neue)]</code>
                </div>
              </div>
              <div>
                <h3 className="font-medium mb-3">Monospace: Maison Neue Mono</h3>
                <p className="text-muted-foreground mb-2">
                  Used for code samples, technical content, and where monospaced characters are needed.
                </p>
                <div className="p-3 bg-muted/30 rounded-md">
                  <code className="text-sm text-muted-foreground">font-[var(--font-maison-neue-mono)]</code>
                </div>
              </div>
            </div>
          </div>
        </ComponentPreview>
        
        <ComponentPreview title="Type Scale">
          <div className="space-y-4">
            <p className="text-muted-foreground mb-4">
              Our type scale is fluid and responsive, automatically adjusting text sizes based on screen size while maintaining proper visual hierarchy.
            </p>
            
            <div className="space-y-6">
              <div className="pb-4 border-b border-border">
                <div className="text-8xl mb-2">Display</div>
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>8xl (text-8xl)</span>
                  <span>Fluid sizing for responsive layouts</span>
                </div>
              </div>
              
              <div className="pb-4 border-b border-border">
                <div className="text-7xl mb-2">Heading 1</div>
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>7xl (text-7xl)</span>
                  <span>Page titles, hero sections</span>
                </div>
              </div>
              
              <div className="pb-4 border-b border-border">
                <div className="text-6xl mb-2">Heading 2</div>
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>6xl (text-6xl)</span>
                  <span>Section headers, content dividers</span>
                </div>
              </div>
              
              <div className="pb-4 border-b border-border">
                <div className="text-5xl mb-2">Heading 3</div>
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>5xl (text-5xl)</span>
                  <span>Subsection headers</span>
                </div>
              </div>
              
              <div className="pb-4 border-b border-border">
                <div className="text-4xl mb-2">Heading 4</div>
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>4xl (text-4xl)</span>
                  <span>Minor section headers, card titles</span>
                </div>
              </div>
              
              <div className="pb-4 border-b border-border">
                <div className="text-3xl mb-2">Heading 5</div>
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>3xl (text-3xl)</span>
                  <span>Panel titles, group headers</span>
                </div>
              </div>
              
              <div className="pb-4 border-b border-border">
                <div className="text-2xl mb-2">Heading 6</div>
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>2xl (text-2xl)</span>
                  <span>Small section headers</span>
                </div>
              </div>
              
              <div className="pb-4 border-b border-border">
                <div className="text-xl mb-2">Large Text</div>
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>xl (text-xl)</span>
                  <span>Introductory paragraphs, pullquotes</span>
                </div>
              </div>
              
              <div className="pb-4 border-b border-border">
                <div className="text-lg mb-2">Medium Text</div>
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>lg (text-lg)</span>
                  <span>Emphasized body text, important information</span>
                </div>
              </div>
              
              <div className="pb-4 border-b border-border">
                <div className="text-base mb-2">Body Text</div>
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>base (text-base)</span>
                  <span>Default paragraph text</span>
                </div>
              </div>
              
              <div className="pb-4 border-b border-border">
                <div className="text-sm mb-2">Small Text</div>
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>sm (text-sm)</span>
                  <span>Helper text, captions, metadata</span>
                </div>
              </div>
              
              <div className="pb-4 border-b border-border">
                <div className="text-xs mb-2">Extra Small Text</div>
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>xs (text-xs)</span>
                  <span>Legal text, fine print, footnotes</span>
                </div>
              </div>
            </div>
          </div>
        </ComponentPreview>
        
        <ComponentPreview title="Font Weights">
          <div className="space-y-6">
            <p className="text-muted-foreground mb-4">
              Font weights help establish hierarchy and emphasis in your content.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="font-bold text-xl mb-2">Bold (700)</div>
                <div className="text-muted-foreground">
                  Used for headlines, emphasizing important text, and primary UI elements.
                  <div className="mt-2 p-2 bg-muted/30 rounded-md">
                    <code className="text-sm">font-bold</code>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="font-semibold text-xl mb-2">Semibold (600)</div>
                <div className="text-muted-foreground">
                  Used for subheadings, buttons, and interactive elements.
                  <div className="mt-2 p-2 bg-muted/30 rounded-md">
                    <code className="text-sm">font-semibold</code>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="font-medium text-xl mb-2">Medium (500)</div>
                <div className="text-muted-foreground">
                  Used for section titles, emphasized paragraphs, and navigation items.
                  <div className="mt-2 p-2 bg-muted/30 rounded-md">
                    <code className="text-sm">font-medium</code>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="font-normal text-xl mb-2">Regular (400)</div>
                <div className="text-muted-foreground">
                  Used for body text, standard paragraphs, and most UI text.
                  <div className="mt-2 p-2 bg-muted/30 rounded-md">
                    <code className="text-sm">font-normal</code>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </ComponentPreview>
        
        <ComponentPreview title="Typography Components">
          <div className="space-y-6">
            <p className="text-muted-foreground mb-4">
              Our typography components provide consistent styling and proper semantic HTML elements.
            </p>
            
            <div className="space-y-6">
              <div>
                <Heading>Heading Component</Heading>
                <div className="mt-2 p-2 bg-muted/30 rounded-md">
                  <code className="text-sm text-muted-foreground">{`<Heading>Page Title</Heading>`}</code>
                </div>
                <div className="mt-2 text-sm text-muted-foreground">
                  The Heading component supports variants (h1-h6), sizes, alignments, and weights.
                </div>
              </div>
              
              <div>
                <SubHeading level={1}>SubHeading Component Level 1</SubHeading>
                <div className="mt-2 p-2 bg-muted/30 rounded-md">
                  <code className="text-sm text-muted-foreground">{`<SubHeading level={1}>Subtitle</SubHeading>`}</code>
                </div>
                <div className="mt-2 text-sm text-muted-foreground">
                  The SubHeading component creates semantic subtitles with appropriate styling.
                </div>
              </div>
              
              <div>
                <Text>Text Component for paragraphs and general content</Text>
                <div className="mt-2 p-2 bg-muted/30 rounded-md">
                  <code className="text-sm text-muted-foreground">{`<Text>Paragraph content</Text>`}</code>
                </div>
                <div className="mt-2 text-sm text-muted-foreground">
                  The Text component supports various sizes, weights, and states.
                </div>
              </div>
            </div>
          </div>
        </ComponentPreview>
      </Section>

      {/* Spacing & Layout */}
      <Section 
        id="spacing" 
        title="Spacing & Layout" 
        description="Our spacing system creates visual rhythm and hierarchy while ensuring responsive layouts across devices."
      >
        <ComponentPreview title="Spacing Scale">
          <div className="space-y-6">
            <p className="text-muted-foreground mb-4">
              Our spacing scale is based on a 4px grid (0.25rem). This consistent spacing system helps create visual balance and harmony across interfaces.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[1, 2, 3, 4, 5, 6, 8, 10, 12, 16, 20, 24].map((space) => (
                <div key={space} className="flex items-center">
                  <div 
                    className="h-8 bg-primary/20 mr-4" 
                    style={{ width: `${space * 0.25}rem` }}
                  ></div>
                  <span className="text-sm font-mono text-muted-foreground">space-{space} ({space * 0.25}rem)</span>
                </div>
              ))}
            </div>
          </div>
        </ComponentPreview>
        
        <ComponentPreview title="Layout Components">
          <div className="space-y-6">
            <p className="text-muted-foreground mb-4">
              Our layout components provide consistent spacing and alignment while adapting to different screen sizes.
            </p>
            
            <div>
              <h3 className="font-medium mb-3">Container</h3>
              <p className="text-muted-foreground mb-3">
                Provides a centered content area with responsive padding.
              </p>
              <div className="border border-dashed border-border rounded-md p-6 mb-3">
                <div className="w-full bg-muted text-center p-4 rounded">
                  <Badge variant="outline" className="bg-background">Container content</Badge>
                </div>
              </div>
              <div className="p-2 bg-muted/30 rounded-md">
                <code className="text-sm text-muted-foreground">{`<div className="container mx-auto px-4">Content</div>`}</code>
              </div>
            </div>
          </div>
        </ComponentPreview>
        
        <ComponentPreview title="Grid System">
          <div className="space-y-6">
            <p className="text-muted-foreground mb-4">
              Our responsive grid system adjusts columns based on screen size, making layouts fluid and adaptable.
            </p>
            
            <div>
              <h3 className="font-medium mb-3">Basic Grid</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-3">
                {[1, 2, 3].map((item) => (
                  <div key={item} className="bg-muted p-4 rounded text-center">
                    Column {item}
                  </div>
                ))}
              </div>
              <div className="p-2 bg-muted/30 rounded-md">
                <code className="text-sm text-muted-foreground">{`<div className="grid grid-cols-1 md:grid-cols-3 gap-4">...</div>`}</code>
              </div>
            </div>
            
            <div>
              <h3 className="font-medium mb-3">Complex Grid</h3>
              <div className="grid grid-cols-12 gap-4 mb-3">
                <div className="col-span-12 md:col-span-6 lg:col-span-8 bg-muted p-4 rounded text-center">
                  Main Content
                </div>
                <div className="col-span-12 md:col-span-6 lg:col-span-4 bg-muted p-4 rounded text-center">
                  Sidebar
                </div>
              </div>
              <div className="p-2 bg-muted/30 rounded-md">
                <code className="text-sm text-muted-foreground">{`<div className="grid grid-cols-12 gap-4">
  <div className="col-span-12 md:col-span-6 lg:col-span-8">...</div>
  <div className="col-span-12 md:col-span-6 lg:col-span-4">...</div>
</div>`}</code>
              </div>
            </div>
          </div>
        </ComponentPreview>
        
        <ComponentPreview title="Flexbox Layout">
          <div className="space-y-6">
            <p className="text-muted-foreground mb-4">
              Flexbox layouts provide powerful alignment options for one-dimensional layouts.
            </p>
            
            <div>
              <h3 className="font-medium mb-3">Horizontal Stack</h3>
              <div className="flex flex-wrap gap-4 items-center mb-3">
                <div className="bg-muted p-4 rounded">Item 1</div>
                <div className="bg-muted p-4 rounded">Item 2</div>
                <div className="bg-muted p-4 rounded">Item 3</div>
              </div>
              <div className="p-2 bg-muted/30 rounded-md">
                <code className="text-sm text-muted-foreground">{`<div className="flex flex-wrap gap-4 items-center">...</div>`}</code>
              </div>
            </div>
            
            <div>
              <h3 className="font-medium mb-3">Vertical Stack</h3>
              <div className="flex flex-col gap-4 mb-3">
                <div className="bg-muted p-4 rounded">Item 1</div>
                <div className="bg-muted p-4 rounded">Item 2</div>
                <div className="bg-muted p-4 rounded">Item 3</div>
              </div>
              <div className="p-2 bg-muted/30 rounded-md">
                <code className="text-sm text-muted-foreground">{`<div className="flex flex-col gap-4">...</div>`}</code>
              </div>
            </div>
          </div>
        </ComponentPreview>
      </Section>

      {/* Theming */}
      <Section 
        id="themes" 
        title="Theming" 
        description="Our theming system allows for easy customization and consistent application of visual styles across your product."
      >
        <ComponentPreview title="Theme Modes">
          <div className="space-y-6">
            <p className="text-muted-foreground mb-4">
              The design system supports light and dark modes, with automatic detection of system preferences.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <h3 className="font-medium">Light Mode</h3>
                <div className="bg-card border border-border p-4 rounded-lg">
                  <div className="flex justify-between items-center mb-4">
                    <div className="font-semibold">Light Theme</div>
                    <Badge variant="outline">Default</Badge>
              </div>
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">Optimized for daytime usage and high-contrast environments.</p>
                    <div className="flex gap-2 mt-3">
                      <div className="h-6 w-6 rounded-full bg-primary"></div>
                      <div className="h-6 w-6 rounded-full bg-secondary"></div>
                      <div className="h-6 w-6 rounded-full bg-accent"></div>
                      <div className="h-6 w-6 rounded-full bg-muted"></div>
              </div>
        </div>
            </div>
            </div>

              <div className="space-y-3">
                <h3 className="font-medium">Dark Mode</h3>
                <div className="bg-black border border-zinc-800 p-4 rounded-lg text-white">
                  <div className="flex justify-between items-center mb-4">
                    <div className="font-semibold">Dark Theme</div>
                    <Badge variant="outline" className="border-zinc-700 text-zinc-300">Alternate</Badge>
            </div>
                  <div className="space-y-2">
                    <p className="text-sm text-zinc-400">Ideal for low-light environments and reduced eye strain.</p>
                    <div className="flex gap-2 mt-3">
                      <div className="h-6 w-6 rounded-full bg-blue-500"></div>
                      <div className="h-6 w-6 rounded-full bg-zinc-800"></div>
                      <div className="h-6 w-6 rounded-full bg-pink-500"></div>
                      <div className="h-6 w-6 rounded-full bg-zinc-700"></div>
          </div>
            </div>
          </div>
              </div>
              </div>
              </div>
        </ComponentPreview>
            
        <ComponentPreview title="Theme Switching">
            <div className="space-y-6">
            <p className="text-muted-foreground mb-4">
              The ThemeSwitcher component provides a simple way to toggle between light and dark modes.
            </p>
            
            <div className="p-6 border border-border rounded-lg bg-card">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-medium mb-2">Theme Toggle</h3>
                  <p className="text-sm text-muted-foreground">Click the button to switch themes:</p>
                </div>
                <UI.ThemeSwitcher />
                </div>
                
              <div className="mt-6 p-3 bg-muted/30 rounded-md">
                <code className="text-sm text-muted-foreground">{`<UI.ThemeSwitcher />`}</code>
              </div>
            </div>
          </div>
        </ComponentPreview>

        <ComponentPreview title="Custom Themes">
          <div className="space-y-6">
            <p className="text-muted-foreground mb-4">
              The design system supports custom themes through CSS variables, allowing you to create branded experiences.
            </p>
            
            <div className="space-y-4">
              <h3 className="font-medium">How to Create a Custom Theme</h3>
              
              <ol className="list-decimal list-inside space-y-3 text-muted-foreground ml-4">
                <li>Define CSS custom properties for your theme colors</li>
                <li>Create a theme selector mechanism</li>
                <li>Apply your theme using CSS classes or data attributes</li>
              </ol>
              
              <div className="mt-4 p-4 bg-muted/30 rounded-md">
                <code className="text-sm text-muted-foreground whitespace-pre">{`/* Example theme definition */
:root[data-theme="blue"] {
  --primary: #3b82f6;
  --primary-foreground: #ffffff;
  /* ... other variables */
}

:root[data-theme="green"] {
  --primary: #10b981;
  --primary-foreground: #ffffff;
  /* ... other variables */
}`}</code>
              </div>
            </div>
          </div>
        </ComponentPreview>
      </Section>

      {/* Buttons */}
      <Section 
        id="buttons" 
        title="Buttons" 
        description="Interactive elements with multiple variants, sizes, and states."
      >
        <ComponentPreview title="Button Variants">
          <div className="flex flex-wrap gap-4">
            <UI.Button variant="default">Default</UI.Button>
            <UI.Button variant="secondary">Secondary</UI.Button>
            <UI.Button variant="outline">Outline</UI.Button>
            <UI.Button variant="ghost">Ghost</UI.Button>
            <UI.Button variant="destructive">Destructive</UI.Button>
            <UI.Button variant="link">Link</UI.Button>
          </div>
        </ComponentPreview>
        
        <ComponentPreview title="Button Sizes">
          <div className="flex flex-wrap items-center gap-4">
            <UI.Button variant="default" size="sm">Small</UI.Button>
            <UI.Button variant="default" size="default">Default</UI.Button>
            <UI.Button variant="default" size="lg">Large</UI.Button>
            <UI.Button variant="default" size="icon">
              <MagnifyingGlassIcon className="h-4 w-4" />
            </UI.Button>
          </div>
        </ComponentPreview>
        
        <ComponentPreview title="Button States">
          <div className="flex flex-wrap gap-4">
            <UI.Button variant="default">Normal</UI.Button>
            <UI.Button variant="default" disabled>Disabled</UI.Button>
            <UI.Button variant="default" loading>Loading</UI.Button>
          </div>
        </ComponentPreview>
      </Section>

      {/* Inputs */}
      <Section 
        id="inputs" 
        title="Form Inputs" 
        description="Basic form controls for user input."
      >
        <ComponentPreview title="Text Input">
          <div className="grid gap-4 max-w-md">
            <UI.Label htmlFor="email">Email</UI.Label>
            <UI.Form.Input id="email" placeholder="Enter your email" />
          </div>
        </ComponentPreview>
        
        <ComponentPreview title="Select">
          <div className="grid gap-4 max-w-md">
            <UI.Label htmlFor="framework">Framework</UI.Label>
            <Select>
              <SelectTrigger id="framework">
                <SelectValue placeholder="Select a framework" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="react">React</SelectItem>
                <SelectItem value="vue">Vue</SelectItem>
                <SelectItem value="svelte">Svelte</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </ComponentPreview>
        
        <ComponentPreview title="Checkbox and Switch">
          <div className="flex gap-8">
            <div className="flex items-center space-x-2">
              <UI.Form.Checkbox id="terms" />
              <UI.Label htmlFor="terms">Accept terms</UI.Label>
            </div>
            <div className="flex items-center space-x-2">
              <UI.Form.Switch id="notifications" />
              <UI.Label htmlFor="notifications">Notifications</UI.Label>
            </div>
          </div>
        </ComponentPreview>
      </Section>

      {/* Form Controls Section */}
      <Section
        id="form"
        title="Form Controls"
        description="Advanced form input elements for collecting user data."
      >
        <ComponentPreview title="Checkbox Examples">
          <div className="flex flex-col gap-4">
            <div className="flex items-center space-x-2">
              <input type="checkbox" id="terms1" className="rounded border-border text-primary focus:ring-primary" />
              <label htmlFor="terms1" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Accept terms and conditions
              </label>
            </div>
            <div className="flex items-center space-x-2">
              <input type="checkbox" id="terms2" className="rounded border-border text-primary focus:ring-primary" checked />
              <label htmlFor="terms2" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Subscribe to newsletter
              </label>
            </div>
          </div>
        </ComponentPreview>

        <ComponentPreview title="Radio Group">
          <div className="flex flex-col gap-2">
            <div className="flex items-center space-x-2">
              <input type="radio" id="option1" name="radio-group" className="border-border text-primary focus:ring-primary" />
              <label htmlFor="option1" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Option 1
              </label>
            </div>
            <div className="flex items-center space-x-2">
              <input type="radio" id="option2" name="radio-group" className="border-border text-primary focus:ring-primary" />
              <label htmlFor="option2" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Option 2
              </label>
            </div>
            <div className="flex items-center space-x-2">
              <input type="radio" id="option3" name="radio-group" className="border-border text-primary focus:ring-primary" />
              <label htmlFor="option3" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Option 3
              </label>
            </div>
          </div>
        </ComponentPreview>

        <ComponentPreview title="Slider">
          <div className="w-full max-w-sm space-y-4">
            <div>
              <Label htmlFor="slider-example" className="mb-2 block">Volume</Label>
              <div className="relative w-full h-4">
                <div className="absolute h-1 top-1/2 -translate-y-1/2 left-0 right-0 bg-muted rounded-full">
                  <div className="absolute h-full w-1/3 bg-primary rounded-full"></div>
                  <div className="absolute h-4 w-4 bg-primary rounded-full top-1/2 -translate-y-1/2 left-1/3 -ml-2 cursor-pointer"></div>
                </div>
              </div>
            </div>
            <div>
              <Label htmlFor="slider-range" className="mb-2 block">Price Range</Label>
              <div className="relative w-full h-4">
                <div className="absolute h-1 top-1/2 -translate-y-1/2 left-0 right-0 bg-muted rounded-full">
                  <div className="absolute h-full left-1/4 right-1/4 bg-primary rounded-full"></div>
                  <div className="absolute h-4 w-4 bg-primary rounded-full top-1/2 -translate-y-1/2 left-1/4 -ml-2 cursor-pointer"></div>
                  <div className="absolute h-4 w-4 bg-primary rounded-full top-1/2 -translate-y-1/2 right-1/4 -mr-2 cursor-pointer"></div>
                </div>
              </div>
            </div>
          </div>
        </ComponentPreview>

        <ComponentPreview title="Scroll Area">
          <div className="h-[200px] w-full overflow-auto rounded-md border p-4">
            <div className="space-y-4">
              <h4 className="text-sm font-medium mb-1">Scroll Area Component</h4>
              <p className="text-sm">
                This is a scroll area component that provides a consistent scrolling experience across different browsers.
              </p>
              <p className="text-sm">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nisl eget ultricies lacinia, nisl nisl aliquam nisl, eget ultricies nisl nisl eget nisl.
              </p>
              <p className="text-sm">
                Sed euismod, nisl eget ultricies lacinia, nisl nisl aliquam nisl, eget ultricies nisl nisl eget nisl. Sed euismod, nisl eget ultricies lacinia, nisl nisl aliquam nisl, eget ultricies nisl nisl eget nisl.
              </p>
              <p className="text-sm">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nisl eget ultricies lacinia, nisl nisl aliquam nisl, eget ultricies nisl nisl eget nisl.
              </p>
              <p className="text-sm">
                Sed euismod, nisl eget ultricies lacinia, nisl nisl aliquam nisl, eget ultricies nisl nisl eget nisl. Sed euismod, nisl eget ultricies lacinia, nisl nisl aliquam nisl, eget ultricies nisl nisl eget nisl.
              </p>
            </div>
          </div>
        </ComponentPreview>
      </Section>

      {/* Select & Combobox Section */}
      <Section
        id="select"
        title="Select & Combobox"
        description="Form components for selecting options from a list."
      >
        <ComponentPreview title="Select Example">
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="framework">Framework</Label>
            <Select>
              <SelectTrigger id="framework">
                <SelectValue placeholder="Select a framework" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="react">React</SelectItem>
                <SelectItem value="svelte">Svelte</SelectItem>
                <SelectItem value="vue">Vue</SelectItem>
                <SelectItem value="solid">Solid</SelectItem>
                <SelectItem value="angular">Angular</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </ComponentPreview>
        
        <ComponentPreview title="Combobox Example">
          <div className="w-full">
            <Label htmlFor="combobox-demo" className="mb-2 block">Combobox with search</Label>
            <div className="relative">
              <Input 
                id="combobox-demo"
                placeholder="Search frameworks..." 
                className="w-full"
              />
              <div className="absolute top-full mt-1 w-full rounded-md border border-border bg-background shadow-lg">
                <div className="py-1 max-h-60 overflow-auto">
                  <div className="px-2 py-1.5 text-sm text-muted-foreground">
                    Start typing to search...
                  </div>
                  <div className="relative px-2 py-1.5 text-sm hover:bg-muted cursor-pointer">
                    React
                  </div>
                  <div className="relative px-2 py-1.5 text-sm bg-muted cursor-pointer">
                    Vue
                    <span className="absolute right-2 text-primary">✓</span>
                  </div>
                  <div className="relative px-2 py-1.5 text-sm hover:bg-muted cursor-pointer">
                    Angular
                  </div>
                </div>
              </div>
            </div>
          </div>
        </ComponentPreview>
      </Section>

      {/* Avatar & Media Section */}
      <Section
        id="avatar"
        title="Avatar & Media"
        description="Components for displaying user avatars and media content."
      >
        <ComponentPreview title="Avatar Examples">
          <div className="flex flex-wrap items-end gap-4">
            <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
              <span className="text-sm font-medium">JD</span>
            </div>
            <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center">
              <span className="text-sm font-medium">AB</span>
            </div>
            <div className="w-14 h-14 rounded-full bg-muted flex items-center justify-center">
              <span className="text-md font-medium">MK</span>
            </div>
          </div>
        </ComponentPreview>
        
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Avatar Component API</CardTitle>
            <CardDescription>Usage and implementation details</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="bg-muted p-4 rounded-md">
              <code className="text-sm">
                {`
<Avatar>
  <AvatarImage src="https://example.com/avatar.jpg" />
  <AvatarFallback>JD</AvatarFallback>
</Avatar>
                `}
              </code>
            </div>
          </CardContent>
        </Card>
      </Section>

      {/* Feedback Section */}
      <Section 
        id="feedback" 
        title="Feedback" 
        description="Components for providing feedback to users about their actions."
      >
        <ComponentPreview title="Form Error">
          <div className="space-y-4">
            <Alert>
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>
                This is a form error message.
              </AlertDescription>
            </Alert>
          </div>
        </ComponentPreview>

        <ComponentPreview title="Form Success">
          <div className="space-y-4">
            <Alert>
              <AlertTitle>Success</AlertTitle>
              <AlertDescription>
                Your form has been submitted successfully.
              </AlertDescription>
            </Alert>
          </div>
        </ComponentPreview>

        <ComponentPreview title="Form Warning">
          <div className="space-y-4">
            <Alert>
              <AlertTitle>Warning</AlertTitle>
              <AlertDescription>
                There are some issues with your form submission. Please check the fields marked with red.
              </AlertDescription>
            </Alert>
          </div>
        </ComponentPreview>

        <ComponentPreview title="Form Info">
          <div className="space-y-4">
            <Alert>
              <AlertTitle>Info</AlertTitle>
              <AlertDescription>
                This is some additional information about your form submission.
              </AlertDescription>
            </Alert>
          </div>
        </ComponentPreview>
      </Section>

      {/* Data Display Section */}
      <Section
        id="data"
        title="Data Display"
        description="Components for displaying structured data like tables, charts, and statistics."
      >
        <ComponentPreview title="Simple Table Example">
          <div className="border rounded-md overflow-hidden">
            <table className="w-full">
              <thead className="bg-muted">
                <tr>
                  <th className="text-left py-3 px-4 font-medium">Name</th>
                  <th className="text-left py-3 px-4 font-medium">Role</th>
                  <th className="text-left py-3 px-4 font-medium">Status</th>
                  <th className="text-left py-3 px-4 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t">
                  <td className="py-3 px-4">John Doe</td>
                  <td className="py-3 px-4">Developer</td>
                  <td className="py-3 px-4">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      Active
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <Button variant="ghost" size="sm">Edit</Button>
                  </td>
                </tr>
                <tr className="border-t">
                  <td className="py-3 px-4">Jane Smith</td>
                  <td className="py-3 px-4">Designer</td>
                  <td className="py-3 px-4">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                      Away
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <Button variant="ghost" size="sm">Edit</Button>
                  </td>
                </tr>
                <tr className="border-t">
                  <td className="py-3 px-4">Robert Johnson</td>
                  <td className="py-3 px-4">Manager</td>
                  <td className="py-3 px-4">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      Active
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <Button variant="ghost" size="sm">Edit</Button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </ComponentPreview>

        <ComponentPreview title="Data Cards">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="h-4 w-4 text-muted-foreground">
                  <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                </svg>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$45,231.89</div>
                <p className="text-xs text-muted-foreground">+20.1% from last month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Subscriptions</CardTitle>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="h-4 w-4 text-muted-foreground">
                  <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">+2,350</div>
                <p className="text-xs text-muted-foreground">+180.1% from last month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Users</CardTitle>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="h-4 w-4 text-muted-foreground">
                  <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                </svg>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">+573</div>
                <p className="text-xs text-muted-foreground">+201 since last hour</p>
              </CardContent>
            </Card>
          </div>
        </ComponentPreview>
      </Section>

      {/* Custom Collapsible Section */}
      <Section
        id="accordion"
        title="Collapsible Content"
        description="Vertically stacked interactive headings that reveal or hide associated content."
      >
        <ComponentPreview title="Collapsible Example">
          <div className="w-full divide-y rounded-md border">
            <div className="collapsible-item">
              <div className="flex justify-between items-center p-4 cursor-pointer hover:bg-muted/50">
                <h3 className="text-sm font-medium">Is it accessible?</h3>
                <ChevronDownIcon className="h-5 w-5 text-muted-foreground" />
              </div>
              <div className="px-4 pb-4 text-sm text-muted-foreground">
                Yes. It adheres to the WAI-ARIA design pattern.
              </div>
            </div>
            <div className="collapsible-item">
              <div className="flex justify-between items-center p-4 cursor-pointer hover:bg-muted/50">
                <h3 className="text-sm font-medium">Is it styled?</h3>
                <ChevronDownIcon className="h-5 w-5 text-muted-foreground" />
              </div>
              <div className="hidden px-4 pb-4 text-sm text-muted-foreground">
                Yes. It comes with default styles that match the other components' aesthetic.
              </div>
            </div>
            <div className="collapsible-item">
              <div className="flex justify-between items-center p-4 cursor-pointer hover:bg-muted/50">
                <h3 className="text-sm font-medium">Is it animated?</h3>
                <ChevronDownIcon className="h-5 w-5 text-muted-foreground" />
              </div>
              <div className="hidden px-4 pb-4 text-sm text-muted-foreground">
                Yes. It's animated by default, but you can disable it if you prefer.
              </div>
            </div>
          </div>
        </ComponentPreview>

        <ComponentPreview title="Multiple Collapsible Sections">
          <div className="w-full rounded-md border">
            <div className="collapsible-group divide-y">
              <div className="collapsible-item">
                <div className="flex justify-between items-center p-4 cursor-pointer hover:bg-muted/50">
                  <h3 className="text-sm font-medium">Section 1</h3>
                  <ChevronDownIcon className="h-5 w-5 text-muted-foreground" />
                </div>
                <div className="px-4 pb-4 text-sm text-muted-foreground">
                  This is the content for section 1. Multiple sections can be open at once.
                </div>
              </div>
              <div className="collapsible-item">
                <div className="flex justify-between items-center p-4 cursor-pointer hover:bg-muted/50">
                  <h3 className="text-sm font-medium">Section 2</h3>
                  <ChevronDownIcon className="h-5 w-5 text-muted-foreground" />
                </div>
                <div className="hidden px-4 pb-4 text-sm text-muted-foreground">
                  This is the content for section 2. Multiple sections can be open at once.
                </div>
              </div>
              <div className="collapsible-item">
                <div className="flex justify-between items-center p-4 cursor-pointer hover:bg-muted/50">
                  <h3 className="text-sm font-medium">Section 3</h3>
                  <ChevronDownIcon className="h-5 w-5 text-muted-foreground" />
                </div>
                <div className="hidden px-4 pb-4 text-sm text-muted-foreground">
                  This is the content for section 3. Multiple sections can be open at once.
                </div>
              </div>
            </div>
          </div>
        </ComponentPreview>
      </Section>

      {/* Navigation */}
      <Section 
        id="navigation" 
        title="Navigation" 
        description="Components that help users navigate through the application."
      >
        <ComponentPreview title="Tabs">
          <Tabs defaultValue="account" className="max-w-md">
            <TabsList>
              <TabsTrigger value="account">Account</TabsTrigger>
              <TabsTrigger value="password">Password</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>
            <TabsContent value="account" className="p-4">
              Account settings and preferences.
            </TabsContent>
            <TabsContent value="password" className="p-4">
              Change your password here.
            </TabsContent>
            <TabsContent value="settings" className="p-4">
              Application settings.
            </TabsContent>
          </Tabs>
        </ComponentPreview>
      </Section>

      {/* Utilities */}
      <Section 
        id="utilities" 
        title="Utilities" 
        description="Utility components for common needs."
      >
        <ComponentPreview title="Badges">
          <div className="flex flex-wrap gap-4">
            <Badge>Default</Badge>
            <Badge variant="secondary">Secondary</Badge>
            <Badge variant="outline">Outline</Badge>
            <Badge variant="destructive">Destructive</Badge>
          </div>
        </ComponentPreview>
      </Section>

      {/* Components */}
      <Section 
        id="components" 
        title="Component Index" 
        description="A comprehensive list of all UI components organized by category."
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          <Card className="bg-background hover:bg-muted/50 transition-colors">
            <CardContent className="p-6">
              <div className="flex items-center space-x-2 mb-2">
                <CubeIcon className="h-5 w-5 text-primary" />
                <h3 className="font-medium">UI Components</h3>
                  </div>
              <p className="text-sm text-muted-foreground">Core building blocks for interfaces</p>
            </CardContent>
          </Card>
          
          <Card className="bg-background hover:bg-muted/50 transition-colors">
            <CardContent className="p-6">
              <div className="flex items-center space-x-2 mb-2">
                <DocumentTextIcon className="h-5 w-5 text-primary" />
                <h3 className="font-medium">Typography</h3>
                  </div>
              <p className="text-sm text-muted-foreground">Headings, text, and formatting</p>
            </CardContent>
          </Card>
          
          <Card className="bg-background hover:bg-muted/50 transition-colors">
            <CardContent className="p-6">
              <div className="flex items-center space-x-2 mb-2">
                <SwatchIcon className="h-5 w-5 text-primary" />
                <h3 className="font-medium">Theme System</h3>
                </div>
              <p className="text-sm text-muted-foreground">Themed colors and variants</p>
            </CardContent>
          </Card>
              </div>
      </Section>
    </div>
  );

  return (
    <div className="bg-background text-foreground min-h-screen">
      {/* Header bar */}
      <header className="sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-sm">
        <div className="flex h-14 items-center px-4 md:px-6">
          <Link to="/" className="flex items-center gap-2 font-semibold">
            Design System Documentation
          </Link>
          <button
            className="ml-auto md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <XMarkIcon className="h-6 w-6" />
            ) : (
              <Bars3Icon className="h-6 w-6" />
            )}
            <span className="sr-only">Toggle menu</span>
          </button>
        </div>
      </header>

      {/* Mobile nav overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-background md:hidden">
          <div className="flex flex-col h-full p-4 pt-20">
            <nav className="mb-8">
              <ul className="space-y-2">
                {sections.map((section) => (
                  <li key={section.id}>
                    <button
                      onClick={() => scrollToSection(section.id)}
                      className={cn(
                        "flex items-center gap-2 w-full text-left px-3 py-2 rounded-md text-sm transition-colors",
                        activeSection === section.id
                          ? "bg-primary text-primary-foreground"
                          : "hover:bg-muted"
                      )}
                    >
                      <section.icon className="h-5 w-5" />
                      {section.title}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>
      )}

      {/* Main layout - 2 column grid */}
      <div className="grid md:grid-cols-[240px_1fr] lg:grid-cols-[240px_1fr]">
        {/* Sidebar */}
        <aside className="hidden md:block border-r border-border h-[calc(100vh-3.5rem)] sticky top-14 overflow-y-auto p-4 bg-background">
          <nav>
            {/* Add Theme Toggle above navigation */}
            <div className="mb-6 pb-4 border-b border-border">
              <div className="flex items-center justify-between">
                <span className="font-medium">Theme</span>
                <UI.ThemeSwitcher />
              </div>
            </div>
            
            {/* Change "On this page" to "Design" */}
            <p className="font-medium mb-4">Design</p>
            <ul className="space-y-1">
              {sections.map((section) => (
                <li key={section.id}>
                  <button
                    onClick={() => scrollToSection(section.id)}
                    className={cn(
                      "flex items-center gap-2 w-full text-left px-3 py-2 rounded-md text-sm transition-colors",
                      activeSection === section.id
                        ? "bg-primary text-primary-foreground"
                        : "hover:bg-muted"
                    )}
                  >
                    <section.icon className="h-4 w-4" />
                    {section.title}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </aside>

        {/* Main content */}
        <main className="p-6">
          {mainContent}
        </main>
      </div>
    </div>
  );
};

export default DesignSystemDocsPage; 