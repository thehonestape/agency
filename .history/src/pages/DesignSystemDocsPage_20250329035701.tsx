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

  // State for active section and mobile menu
  const [activeSection, setActiveSection] = useState(sections[0].id);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});

  // Example colors - updated with RGB values for Tailwind v4
  const themeColors: ColorInfo[] = [
    { name: "Background", bg: "bg-background", value: "255 255 255" },
    { name: "Foreground", bg: "bg-foreground", value: "15 23 42" },
    { name: "Primary", bg: "bg-primary", value: "14 116 144" },
    { name: "Secondary", bg: "bg-secondary", value: "241 245 249" },
    { name: "Accent", bg: "bg-accent", value: "245 158 11" },
  ];

  const uiColors: ColorInfo[] = [
    { name: "Card", bg: "bg-card", value: "255 255 255" },
    { name: "Muted", bg: "bg-muted", value: "241 245 249" },
    { name: "Destructive", bg: "bg-destructive", value: "239 68 68" },
    { name: "Success", bg: "bg-success", value: "34 197 94" },
    { name: "Warning", bg: "bg-warning", value: "245 158 11" },
    { name: "Info", bg: "bg-info", value: "59 130 246" },
    { name: "Border", bg: "bg-border", value: "226 232 240" },
    { name: "Ring", bg: "bg-ring", value: "14 165 233" },
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
        description="Our color system is designed to be accessible, consistent, and flexible across different contexts and devices. Colors are defined using RGB space-separated values format for Tailwind v4 compatibility."
      >
        <Alert className="mb-6">
          <AlertTitle>Tailwind v4 RGB Format</AlertTitle>
          <AlertDescription>
            Our theme uses Tailwind v4's RGB color format (space-separated values) for enhanced opacity handling and color transformations.
          </AlertDescription>
        </Alert>
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
        description="Our design system includes a comprehensive set of UI components organized by category."
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
        
        <ComponentPreview title="Component Registry" description="Our system includes 25+ registered components">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            <Badge variant="outline" className="px-3 py-1 justify-center">Button</Badge>
            <Badge variant="outline" className="px-3 py-1 justify-center">Input</Badge>
            <Badge variant="outline" className="px-3 py-1 justify-center">Textarea</Badge>
            <Badge variant="outline" className="px-3 py-1 justify-center">Checkbox</Badge>
            <Badge variant="outline" className="px-3 py-1 justify-center">Switch</Badge>
            <Badge variant="outline" className="px-3 py-1 justify-center">Select</Badge>
            <Badge variant="outline" className="px-3 py-1 justify-center">Card</Badge>
            <Badge variant="outline" className="px-3 py-1 justify-center">Heading</Badge>
            <Badge variant="outline" className="px-3 py-1 justify-center">Text</Badge>
            <Badge variant="outline" className="px-3 py-1 justify-center">Alert</Badge>
            <Badge variant="outline" className="px-3 py-1 justify-center">Badge</Badge>
            <Badge variant="outline" className="px-3 py-1 justify-center">Avatar</Badge>
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
        title="Inputs" 
        description="Form controls for user input."
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

      {/* Feedback */}
      <Section 
        id="feedback" 
        title="Feedback" 
        description="Components that provide feedback to users."
      >
        <ComponentPreview title="Alerts">
          <div className="grid gap-4">
            <Alert>
              <AlertTitle>Note</AlertTitle>
              <AlertDescription>
                This is a standard alert message.
              </AlertDescription>
            </Alert>
            <Alert variant="destructive">
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>
                This is an error alert message.
              </AlertDescription>
            </Alert>
          </div>
        </ComponentPreview>
      </Section>

      {/* Navigation */}
      <Section 
        id="navigation" 
        title="Navigation" 
        description="Components that help users navigate."
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
            <p className="font-medium mb-4">On this page</p>
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
            
            <div className="border-t mt-6 pt-4">
              <p className="font-medium mb-2">Theme Settings</p>
              <div className="inline-flex h-8 items-center justify-center rounded-md border px-2 text-sm font-medium">
                <button
                  aria-label="Toggle dark mode"
                  className="inline-flex h-5 w-10 shrink-0 cursor-pointer items-center rounded-full border border-border p-1 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:border-primary bg-background"
                >
                  <span className="flex h-3 w-3 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-sm">
                    <span className="sr-only">Light</span>
                  </span>
                </button>
              </div>
            </div>
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