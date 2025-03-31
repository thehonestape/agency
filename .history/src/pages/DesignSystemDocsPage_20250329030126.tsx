import React, { useState, useRef, useEffect, ReactNode } from 'react';
import { UI } from '@/components/ui';
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  Badge,
  Alert,
  AlertTitle,
  AlertDescription,
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui';
import { FullWidthThreeColumn } from '@/components/ui/shell/multi-column/FullWidthThreeColumn';
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';
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
const DesignSystemDocsPage: React.FC = () => {
  // Define sections with icons
  const sections: Section[] = [
    { id: "intro", title: "Introduction", icon: DocumentTextIcon },
    { id: "colors", title: "Colors", icon: SwatchIcon },
    { id: "typography", title: "Typography", icon: DocumentTextIcon },
    { id: "spacing", title: "Spacing & Layout", icon: ViewColumnsIcon },
    { id: "components", title: "Components", icon: CubeIcon },
    { id: "buttons", title: "Buttons", icon: CubeIcon },
    { id: "inputs", title: "Inputs", icon: CubeIcon },
    { id: "feedback", title: "Feedback", icon: BellIcon },
    { id: "navigation", title: "Navigation", icon: CubeIcon },
    { id: "utilities", title: "Utilities", icon: CommandLineIcon },
  ];

  // State for active section
  const [activeSection, setActiveSection] = useState(sections[0].id);
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});

  // Example colors - updated with hex values for Tailwind v4
  const themeColors: ColorInfo[] = [
    { name: "Background", bg: "bg-background", value: "#ffffff" },
    { name: "Foreground", bg: "bg-foreground", value: "#0f172a" },
    { name: "Primary", bg: "bg-primary", value: "#0e7490" },
    { name: "Secondary", bg: "bg-secondary", value: "#f1f5f9" },
    { name: "Accent", bg: "bg-accent", value: "#f59e0b" },
  ];

  const uiColors: ColorInfo[] = [
    { name: "Card", bg: "bg-card", value: "#ffffff" },
    { name: "Muted", bg: "bg-muted", value: "#f1f5f9" },
    { name: "Destructive", bg: "bg-destructive", value: "#ef4444" },
    { name: "Border", bg: "bg-border", value: "#e2e8f0" },
    { name: "Ring", bg: "bg-ring", value: "#0ea5e9" },
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
    }
  };

  // Navigation items for sidebar
  const navigationItems = sections.map(section => ({
    id: section.id,
    label: section.title,
    href: `#${section.id}`,
    active: activeSection === section.id,
    icon: <section.icon className="h-6 w-6 shrink-0" aria-hidden="true" />
  }));

  // Main content sections for the documentation
  const mainContent = (
    <div className="p-6 space-y-8">
      {/* Intro Section */}
      <Section 
        id="intro" 
        title="Design System Documentation" 
        description="This comprehensive guide details our component library, design tokens, and usage guidelines for building consistent interfaces."
      >
        <Alert className="mb-6">
          <AlertTitle>Design System v1.0</AlertTitle>
          <AlertDescription>
            Built with Tailwind v4 and a focus on accessibility, customization, and developer experience.
          </AlertDescription>
        </Alert>
      </Section>

      {/* Colors */}
      <Section 
        id="colors" 
        title="Colors" 
        description="Our color system is designed to be accessible, consistent, and flexible across different contexts and devices."
      >
        <ColorPalette title="Theme Colors" colors={themeColors} />
        <ColorPalette title="UI Colors" colors={uiColors} />
      </Section>

      {/* Typography */}
      <Section 
        id="typography" 
        title="Typography" 
        description="Typography establishes hierarchy, enhances readability, and creates a consistent brand expression."
      >
        <TypographyExample name="Heading 1" className="text-4xl font-bold">
          The quick brown fox jumps over the lazy dog
        </TypographyExample>
        
        <TypographyExample name="Heading 2" className="text-3xl font-bold">
          The quick brown fox jumps over the lazy dog
        </TypographyExample>
        
        <TypographyExample name="Heading 3" className="text-2xl font-bold">
          The quick brown fox jumps over the lazy dog
        </TypographyExample>
        
        <TypographyExample name="Paragraph" className="text-base">
          The quick brown fox jumps over the lazy dog. This sentence contains all the letters of the English alphabet, making it perfect for showing typeface examples.
        </TypographyExample>
        
        <TypographyExample name="Small Text" className="text-sm text-muted-foreground">
          The quick brown fox jumps over the lazy dog
        </TypographyExample>
      </Section>

      {/* Spacing & Layout */}
      <Section 
        id="spacing" 
        title="Spacing & Layout" 
        description="Our spacing system creates visual rhythm and hierarchy while ensuring responsive layouts across devices."
      >
        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-4">Spacing Scale</h3>
          <Card>
            <CardContent className="p-6">
              <div className="space-y-4">
                {[1, 2, 3, 4, 6, 8, 12, 16].map((space) => (
                  <div key={space} className="flex items-center">
                    <div className="h-8 bg-primary/20 rounded-sm" style={{ width: `${space * 0.25}rem` }}></div>
                    <Badge variant="outline" className="ml-4">
                      <span className="font-mono">space-{space}</span>
                      <span className="text-muted-foreground ml-2">({space * 0.25}rem)</span>
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
        
        <ComponentPreview 
          title="Container" 
          description="The container centers content horizontally with responsive padding."
        >
          <div className="border border-dashed border-border rounded-md p-6">
            <div className="w-full bg-muted text-center p-4 rounded">
              <Badge variant="outline" className="bg-background">Container content</Badge>
            </div>
          </div>
        </ComponentPreview>
        
        <ComponentPreview 
          title="Grid System" 
          description="Use our responsive grid system for layouts."
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[1, 2, 3].map((item) => (
              <div key={item} className="bg-muted p-4 rounded text-center">
                Column {item}
              </div>
            ))}
          </div>
        </ComponentPreview>
      </Section>

      {/* Components */}
      <Section 
        id="components" 
        title="Components" 
        description="Our component library provides reusable UI elements that follow best practices for accessibility and usability."
      >
        <div className="mb-8">
          <p className="text-lg mb-4">Components are organized by category for easy reference:</p>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              "Buttons & Actions", 
              "Form & Inputs", 
              "Feedback & Alerts", 
              "Navigation & Menus", 
              "Layout & Structure", 
              "Data Display"
            ].map((category) => (
              <Card key={category} className="hover:shadow-md transition-shadow duration-200">
                <CardContent className="p-4 flex items-center gap-3">
                  <div className="h-3 w-3 rounded-full bg-primary"></div>
                  <span>{category}</span>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </Section>

      {/* Buttons */}
      <Section 
        id="buttons" 
        title="Buttons" 
        description="Buttons communicate actions that users can take and are essential interactive elements."
      >
        <ComponentPreview 
          title="Button Variants" 
          description="Different button styles for various contexts."
        >
          <div className="flex flex-wrap gap-4">
            <UI.Button variant="default">Primary</UI.Button>
            <UI.Button variant="secondary">Secondary</UI.Button>
            <UI.Button variant="outline">Outline</UI.Button>
            <UI.Button variant="ghost">Link Button</UI.Button>
          </div>
        </ComponentPreview>
        
        <ComponentPreview 
          title="Button Sizes" 
          description="Buttons in different sizes for various use cases."
        >
          <div className="flex items-center flex-wrap gap-4">
            <UI.Button size="sm">Small</UI.Button>
            <UI.Button size="default">Medium</UI.Button>
            <UI.Button size="lg">Large</UI.Button>
          </div>
        </ComponentPreview>
      </Section>

      {/* Inputs */}
      <Section 
        id="inputs" 
        title="Inputs" 
        description="Form inputs allow users to enter data and make selections."
      >
        <ComponentPreview 
          title="Text Input" 
          description="Basic text input field."
        >
          <div className="max-w-md space-y-2">
            <UI.Label htmlFor="email">Email</UI.Label>
            <UI.Form.Input 
              id="email" 
              type="email" 
              placeholder="Enter your email"
            />
          </div>
        </ComponentPreview>
        
        <ComponentPreview 
          title="Select" 
          description="Dropdown selection component."
        >
          <div className="max-w-md space-y-2">
            <UI.Label htmlFor="country">Country</UI.Label>
            <Select>
              <SelectTrigger id="country">
                <SelectValue placeholder="Select a country" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="us">United States</SelectItem>
                <SelectItem value="ca">Canada</SelectItem>
                <SelectItem value="mx">Mexico</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </ComponentPreview>
      </Section>

      {/* Feedback */}
      <Section 
        id="feedback" 
        title="Feedback" 
        description="Feedback components communicate system status, errors, warnings, and other important information."
      >
        <ComponentPreview 
          title="Alert" 
          description="Alerts communicate important information to users."
        >
          <div className="space-y-4">
            <Alert variant="success">
              <AlertTitle>Success</AlertTitle>
              <AlertDescription>Successfully saved changes</AlertDescription>
            </Alert>
            
            <Alert variant="destructive">
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>There was an error processing your request</AlertDescription>
            </Alert>
          </div>
        </ComponentPreview>
      </Section>

      {/* Navigation */}
      <Section 
        id="navigation" 
        title="Navigation" 
        description="Navigation components help users move between different views and sections."
      >
        <ComponentPreview 
          title="Tabs" 
          description="Tabbed navigation for content organization."
        >
          <Tabs defaultValue="overview">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
              <TabsTrigger value="notifications">Notifications</TabsTrigger>
            </TabsList>
            <TabsContent value="overview">
              <p className="text-muted-foreground mt-4">Overview content goes here</p>
            </TabsContent>
            <TabsContent value="settings">
              <p className="text-muted-foreground mt-4">Settings content goes here</p>
            </TabsContent>
            <TabsContent value="notifications">
              <p className="text-muted-foreground mt-4">Notifications content goes here</p>
            </TabsContent>
          </Tabs>
        </ComponentPreview>
      </Section>

      {/* Utilities */}
      <Section 
        id="utilities" 
        title="Utilities" 
        description="Utility classes help with common styling needs and maintaining consistency."
      >
        <ComponentPreview 
          title="Badges" 
          description="Badge utilities for displaying statuses and metadata."
        >
          <div className="flex flex-wrap gap-4">
            <Badge>Default</Badge>
            <Badge variant="secondary">Secondary</Badge>
            <Badge variant="outline">Outline</Badge>
            <Badge variant="destructive">Destructive</Badge>
          </div>
        </ComponentPreview>
      </Section>
    </div>
  );

  // Table of contents for right sidebar
  const tableOfContents = (
    <div className="p-4 space-y-6">
      <h3 className="text-lg font-semibold mb-3">On this page</h3>
      <nav>
        <ul className="space-y-3">
          {sections.map((section) => (
            <li key={section.id}>
              <button
                onClick={() => scrollToSection(section.id)}
                className={cn(
                  "flex items-center gap-2 w-full text-left px-3 py-2 rounded-md text-sm transition-colors",
                  activeSection === section.id
                    ? "bg-primary text-primary-foreground"
                    : "text-foreground hover:bg-muted"
                )}
              >
                <section.icon className="h-4 w-4" aria-hidden="true" />
                {section.title}
              </button>
            </li>
          ))}
        </ul>
      </nav>
      
      <div className="border-t pt-4 mt-4">
        <h4 className="font-medium mb-2">Theme Settings</h4>
        <div className="inline-flex h-10 items-center justify-center rounded-md border px-4 text-sm font-medium">
          <button
            aria-label="Toggle dark mode"
            className="inline-flex h-[20px] w-[40px] shrink-0 cursor-pointer items-center rounded-full border border-border p-[3px] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:border-primary bg-background"
          >
            <span className="flex h-3.5 w-3.5 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-sm">
              <span className="sr-only">Light</span>
            </span>
            <span className="flex h-3.5 w-3.5 items-center justify-center rounded-full">
              <span className="sr-only">Dark</span>
            </span>
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <FullWidthThreeColumn
      title="Design System Documentation"
      description="Comprehensive documentation for our component library and design tokens"
      navigation={{ 
        type: 'side',
        items: navigationItems
      }}
      layout={{
        type: 'multi-column',
        columns: {
          left: { width: 'w-64' },
          main: { width: 'flex-1' },
          right: { width: 'w-64' },
        }
      }}
      theme={{
        colors: {
          background: { default: 'bg-background' },
          border: 'border'
        }
      }}
      variants={{
        sm: 'bg-background',
        md: 'bg-background',
        lg: 'bg-background',
        xl: 'bg-background'
      }}
      className="bg-background"
    >
      <div className="flex h-full">
        {/* Main Content */}
        <main className="flex-1 overflow-y-auto">
          {mainContent}
        </main>
        
        {/* Right Sidebar - Table of Contents */}
        <aside className="hidden lg:block border-l border-border w-64 overflow-y-auto">
          {tableOfContents}
        </aside>
      </div>
    </FullWidthThreeColumn>
  );
};

export default DesignSystemDocsPage; 