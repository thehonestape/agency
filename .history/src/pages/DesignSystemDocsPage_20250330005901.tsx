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
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/typography';
import { Heading, SubHeading, Text, Code, Kbd } from '@/components/ui/typography';
import { Callout } from '@/components/ui/Callout';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogTrigger } from '@/components/ui';
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
  // Define documentation sections with icons
  const sections = [
    { id: "intro", title: "Introduction", icon: DocumentTextIcon },
    { id: "foundations", title: "Foundations", icon: BuildingLibraryIcon },
    { id: "colors", title: "Colors", icon: SwatchIcon },
    { id: "typography", title: "Typography", icon: DocumentTextIcon },
    { id: "spacing", title: "Spacing", icon: ArrowsPointingOutIcon },
    { id: "components", title: "Components", icon: CubeIcon },
    { id: "buttons", title: "Buttons", icon: CursorArrowRaysIcon },
    { id: "inputs", title: "Inputs", icon: DocumentDuplicateIcon },
    { id: "feedback", title: "Feedback", icon: ExclamationTriangleIcon },
    { id: "navigation", title: "Navigation", icon: MapIcon },
    { id: "utilities", title: "Utilities", icon: WrenchScrewdriverIcon },
    { id: "themes", title: "Theming", icon: PaintBrushIcon },
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

      {/* Foundations Section */}
      <Section 
        id="foundations" 
        title="Foundations" 
        description="The core building blocks of our design system - colors, typography, spacing, and other design tokens."
      >
        <ComponentPreview title="Design Tokens">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <h3 className="font-medium">What are Design Tokens?</h3>
              <p className="text-muted-foreground">
                Design tokens are the visual design atoms of the design system — 
                specifically, they are named entities that store visual design attributes. 
              </p>
              <p className="text-muted-foreground">
                They are used in place of hard-coded values to ensure flexibility and consistency 
                across all product experiences.
              </p>
            </div>
            <div className="bg-muted p-4 rounded-md">
              <code className="text-sm">
                <pre className="text-muted-foreground">
{`{
  "colors": {
    "primary": {
      "500": "2 96% 49%",
      "600": "2 90% 42%"
    }
  },
  "spacing": {
    "4": "1rem",
    "8": "2rem"
  }
}`}
                </pre>
              </code>
            </div>
          </div>
        </ComponentPreview>
      </Section>

      {/* Colors */}
      <Section 
        id="colors" 
        title="Colors" 
        description="Our color system is designed to be accessible, consistent, and flexible across different contexts and devices."
      >
        <Alert className="mb-6">
          <AlertTitle>Tailwind v4 RGB Format</AlertTitle>
          <AlertDescription>
            Our colors use Tailwind v4's RGB format (space-separated values) to support opacity manipulation and color transformations.
          </AlertDescription>
        </Alert>
        
        <ColorPalette title="Theme Colors" colors={themeColors} />
        <ColorPalette title="UI Colors" colors={uiColors} />
        
        <ComponentPreview title="Primary Color Scale">
          <div className="space-y-6">
            <p className="text-muted-foreground mb-4">
              Primary colors are the main brand colors used throughout the interface. They represent the brand identity and are used for primary actions and key UI elements.
            </p>
            <div className="grid grid-cols-11 gap-2">
              {['50', '100', '200', '300', '400', '500', '600', '700', '800', '900', '950'].map((shade) => (
                <div key={shade} className="text-center">
                  <div 
                    className={`h-14 rounded-md mb-2 shadow-sm`}
                    style={{ 
                      backgroundColor: `rgb(var(--primary-${shade}, var(--primary)))`,
                      color: parseInt(shade) > 500 ? 'white' : 'black'
                    }}
                  >
                    <div className="h-full flex items-center justify-center font-mono text-xs">
                      {shade}
                    </div>
                  </div>
                  <span className="text-xs text-muted-foreground">--primary-{shade}</span>
                </div>
              ))}
            </div>
          </div>
        </ComponentPreview>
        
        <ComponentPreview title="Complete Color Scales">
          <div className="space-y-10">
            <div className="space-y-2">
              <h3 className="text-lg font-medium">Blue Theme - Primary Scale</h3>
              <div className="grid grid-cols-11 gap-1">
                {['50', '100', '200', '300', '400', '500', '600', '700', '800', '900', '950'].map((shade) => (
                  <div key={shade} className="text-center">
                    <div 
                      className="h-12 rounded-md mb-1"
                      style={{ 
                        backgroundColor: shade === '50' ? 'rgb(239 246 255)' : 
                                        shade === '100' ? 'rgb(219 234 254)' :
                                        shade === '200' ? 'rgb(191 219 254)' :
                                        shade === '300' ? 'rgb(147 197 253)' :
                                        shade === '400' ? 'rgb(96 165 250)' :
                                        shade === '500' ? 'rgb(59 130 246)' :
                                        shade === '600' ? 'rgb(37 99 235)' :
                                        shade === '700' ? 'rgb(29 78 216)' :
                                        shade === '800' ? 'rgb(30 64 175)' :
                                        shade === '900' ? 'rgb(30 58 138)' : 'rgb(23 37 84)',
                        color: parseInt(shade) > 400 ? 'white' : 'black'
                      }}
                    >
                      <div className="h-full flex items-center justify-center text-xs">{shade}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="space-y-2">
              <h3 className="text-lg font-medium">Green Theme - Primary Scale</h3>
              <div className="grid grid-cols-11 gap-1">
                {['50', '100', '200', '300', '400', '500', '600', '700', '800', '900', '950'].map((shade) => (
                  <div key={shade} className="text-center">
                    <div 
                      className="h-12 rounded-md mb-1"
                      style={{ 
                        backgroundColor: shade === '50' ? 'rgb(240 253 244)' : 
                                        shade === '100' ? 'rgb(220 252 231)' :
                                        shade === '200' ? 'rgb(187 247 208)' :
                                        shade === '300' ? 'rgb(134 239 172)' :
                                        shade === '400' ? 'rgb(74 222 128)' :
                                        shade === '500' ? 'rgb(34 197 94)' :
                                        shade === '600' ? 'rgb(22 163 74)' :
                                        shade === '700' ? 'rgb(21 128 61)' :
                                        shade === '800' ? 'rgb(22 101 52)' :
                                        shade === '900' ? 'rgb(20 83 45)' : 'rgb(5 46 22)',
                        color: parseInt(shade) > 500 ? 'white' : 'black'
                      }}
                    >
                      <div className="h-full flex items-center justify-center text-xs">{shade}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="space-y-2">
              <h3 className="text-lg font-medium">Zinc Theme - Primary Scale</h3>
              <div className="grid grid-cols-11 gap-1">
                {['50', '100', '200', '300', '400', '500', '600', '700', '800', '900', '950'].map((shade) => (
                  <div key={shade} className="text-center">
                    <div 
                      className="h-12 rounded-md mb-1"
                      style={{ 
                        backgroundColor: shade === '50' ? 'rgb(250 250 250)' : 
                                        shade === '100' ? 'rgb(244 244 245)' :
                                        shade === '200' ? 'rgb(228 228 231)' :
                                        shade === '300' ? 'rgb(212 212 216)' :
                                        shade === '400' ? 'rgb(161 161 170)' :
                                        shade === '500' ? 'rgb(113 113 122)' :
                                        shade === '600' ? 'rgb(82 82 91)' :
                                        shade === '700' ? 'rgb(63 63 70)' :
                                        shade === '800' ? 'rgb(39 39 42)' :
                                        shade === '900' ? 'rgb(24 24 27)' : 'rgb(9 9 11)',
                        color: parseInt(shade) > 400 ? 'white' : 'black'
                      }}
                    >
                      <div className="h-full flex items-center justify-center text-xs">{shade}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <p className="text-sm text-muted-foreground mt-6">
              Each theme has a complete color scale from 50 to 950, providing flexibility for different contrast needs
              and visual hierarchies. The 500 shade is used as the primary default color.
            </p>
          </div>
        </ComponentPreview>
        
        <ComponentPreview title="Semantic Colors">
          <div className="space-y-6">
            <p className="text-muted-foreground mb-4">
              Semantic colors communicate purpose and meaning across the interface. They provide visual cues about the nature of elements and actions.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="space-y-2">
                <div className="p-6 rounded-md" style={{ backgroundColor: 'rgb(var(--primary))', color: 'rgb(var(--primary-foreground))' }}>
                  Primary
                </div>
                <div className="text-sm text-muted-foreground">
                  Used for primary buttons, links, and active states
                </div>
              </div>
              <div className="space-y-2">
                <div className="p-6 rounded-md" style={{ backgroundColor: 'rgb(var(--secondary))', color: 'rgb(var(--secondary-foreground))' }}>
                  Secondary
                </div>
                <div className="text-sm text-muted-foreground">
                  Used for secondary actions and supporting elements
                </div>
              </div>
              <div className="space-y-2">
                <div className="p-6 rounded-md" style={{ backgroundColor: 'rgb(var(--accent))', color: 'rgb(var(--accent-foreground))' }}>
                  Accent
                </div>
                <div className="text-sm text-muted-foreground">
                  Used for accent elements and highlighting
                </div>
              </div>
              <div className="space-y-2">
                <div className="p-6 rounded-md" style={{ backgroundColor: 'rgb(var(--muted))', color: 'rgb(var(--muted-foreground))' }}>
                  Muted
                </div>
                <div className="text-sm text-muted-foreground">
                  Used for backgrounds and subtle UI elements
                </div>
              </div>
            </div>
          </div>
        </ComponentPreview>
        
        <ComponentPreview title="Status Colors">
          <div className="space-y-6">
            <p className="text-muted-foreground mb-4">
              Status colors communicate state and provide feedback. They help users understand the status of actions, components, or information.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="space-y-2">
                <div className="p-6 rounded-md" style={{ backgroundColor: 'rgb(var(--success))', color: 'rgb(var(--success-foreground))' }}>
                  Success
                </div>
                <div className="text-sm text-muted-foreground">
                  Used to indicate successful operations
                </div>
              </div>
              <div className="space-y-2">
                <div className="p-6 rounded-md" style={{ backgroundColor: 'rgb(var(--warning))', color: 'rgb(var(--warning-foreground))' }}>
                  Warning
                </div>
                <div className="text-sm text-muted-foreground">
                  Used to indicate caution or potential issues
                </div>
              </div>
              <div className="space-y-2">
                <div className="p-6 rounded-md" style={{ backgroundColor: 'rgb(var(--destructive))', color: 'rgb(var(--destructive-foreground))' }}>
                  Destructive
                </div>
                <div className="text-sm text-muted-foreground">
                  Used to indicate errors or destructive actions
                </div>
              </div>
              <div className="space-y-2">
                <div className="p-6 rounded-md" style={{ backgroundColor: 'rgb(var(--info))', color: 'rgb(var(--info-foreground))' }}>
                  Info
                </div>
                <div className="text-sm text-muted-foreground">
                  Used to communicate information
                </div>
              </div>
            </div>
          </div>
        </ComponentPreview>
        
        <ComponentPreview title="Theme Variations">
          <div className="space-y-6">
            <p className="text-muted-foreground mb-4">
              Our design system supports multiple theme variations that can be applied using the data-theme attribute.
              Each theme comes in both light and dark modes that can be toggled with the theme switcher.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Blue Theme */}
              <div className="space-y-4">
                <Card className="p-4 overflow-hidden">
                  <h3 className="font-medium mb-2">Blue Theme (Light)</h3>
                  <div className="flex gap-2 mb-2">
                    <div className="h-10 w-10 rounded-full flex items-center justify-center text-xs font-medium text-white" style={{ backgroundColor: 'rgb(14 165 233)' }}>P</div>
                    <div className="h-10 w-10 rounded-full flex items-center justify-center text-xs font-medium" style={{ backgroundColor: 'rgb(241 245 249)' }}>S</div>
                    <div className="h-10 w-10 rounded-full flex items-center justify-center text-xs font-medium text-white" style={{ backgroundColor: 'rgb(245 158 11)' }}>A</div>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-3">
                    <div className="h-6 w-6 rounded flex items-center justify-center text-[10px]" style={{ backgroundColor: 'rgb(34 197 94)', color: 'white' }}>✓</div>
                    <div className="h-6 w-6 rounded flex items-center justify-center text-[10px]" style={{ backgroundColor: 'rgb(245 158 11)', color: 'white' }}>!</div>
                    <div className="h-6 w-6 rounded flex items-center justify-center text-[10px]" style={{ backgroundColor: 'rgb(239 68 68)', color: 'white' }}>×</div>
                    <div className="h-6 w-6 rounded flex items-center justify-center text-[10px]" style={{ backgroundColor: 'rgb(59 130 246)', color: 'white' }}>i</div>
                  </div>
                  <p className="text-sm text-muted-foreground mt-3">data-theme="blue-light"</p>
                </Card>
                <Card className="p-4 overflow-hidden" style={{ backgroundColor: '#1e293b', color: 'white' }}>
                  <h3 className="font-medium mb-2">Blue Theme (Dark)</h3>
                  <div className="flex gap-2 mb-2">
                    <div className="h-10 w-10 rounded-full flex items-center justify-center text-xs font-medium" style={{ backgroundColor: 'rgb(56 189 248)', color: 'black' }}>P</div>
                    <div className="h-10 w-10 rounded-full flex items-center justify-center text-xs font-medium text-white" style={{ backgroundColor: 'rgb(51 65 85)' }}>S</div>
                    <div className="h-10 w-10 rounded-full flex items-center justify-center text-xs font-medium" style={{ backgroundColor: 'rgb(251 191 36)', color: 'black' }}>A</div>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-3">
                    <div className="h-6 w-6 rounded flex items-center justify-center text-[10px]" style={{ backgroundColor: 'rgb(74 222 128)', color: 'black' }}>✓</div>
                    <div className="h-6 w-6 rounded flex items-center justify-center text-[10px]" style={{ backgroundColor: 'rgb(251 191 36)', color: 'black' }}>!</div>
                    <div className="h-6 w-6 rounded flex items-center justify-center text-[10px]" style={{ backgroundColor: 'rgb(239 68 68)', color: 'white' }}>×</div>
                    <div className="h-6 w-6 rounded flex items-center justify-center text-[10px]" style={{ backgroundColor: 'rgb(96 165 250)', color: 'black' }}>i</div>
                  </div>
                  <p className="text-sm text-muted-foreground/70 mt-3">data-theme="blue-dark"</p>
                </Card>
              </div>
              
              {/* Green Theme */}
              <div className="space-y-4">
                <Card className="p-4 overflow-hidden">
                  <h3 className="font-medium mb-2">Green Theme (Light)</h3>
                  <div className="flex gap-2 mb-2">
                    <div className="h-10 w-10 rounded-full flex items-center justify-center text-xs font-medium text-white" style={{ backgroundColor: 'rgb(34 197 94)' }}>P</div>
                    <div className="h-10 w-10 rounded-full flex items-center justify-center text-xs font-medium" style={{ backgroundColor: 'rgb(240 253 244)' }}>S</div>
                    <div className="h-10 w-10 rounded-full flex items-center justify-center text-xs font-medium text-white" style={{ backgroundColor: 'rgb(245 158 11)' }}>A</div>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-3">
                    <div className="h-6 w-6 rounded flex items-center justify-center text-[10px]" style={{ backgroundColor: 'rgb(34 197 94)', color: 'white' }}>✓</div>
                    <div className="h-6 w-6 rounded flex items-center justify-center text-[10px]" style={{ backgroundColor: 'rgb(245 158 11)', color: 'white' }}>!</div>
                    <div className="h-6 w-6 rounded flex items-center justify-center text-[10px]" style={{ backgroundColor: 'rgb(239 68 68)', color: 'white' }}>×</div>
                    <div className="h-6 w-6 rounded flex items-center justify-center text-[10px]" style={{ backgroundColor: 'rgb(59 130 246)', color: 'white' }}>i</div>
                  </div>
                  <p className="text-sm text-muted-foreground mt-3">data-theme="green-light"</p>
                </Card>
                <Card className="p-4 overflow-hidden" style={{ backgroundColor: '#052e16', color: 'white' }}>
                  <h3 className="font-medium mb-2">Green Theme (Dark)</h3>
                  <div className="flex gap-2 mb-2">
                    <div className="h-10 w-10 rounded-full flex items-center justify-center text-xs font-medium" style={{ backgroundColor: 'rgb(74 222 128)', color: 'black' }}>P</div>
                    <div className="h-10 w-10 rounded-full flex items-center justify-center text-xs font-medium text-white" style={{ backgroundColor: 'rgb(22 101 52)' }}>S</div>
                    <div className="h-10 w-10 rounded-full flex items-center justify-center text-xs font-medium" style={{ backgroundColor: 'rgb(251 191 36)', color: 'black' }}>A</div>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-3">
                    <div className="h-6 w-6 rounded flex items-center justify-center text-[10px]" style={{ backgroundColor: 'rgb(74 222 128)', color: 'black' }}>✓</div>
                    <div className="h-6 w-6 rounded flex items-center justify-center text-[10px]" style={{ backgroundColor: 'rgb(251 191 36)', color: 'black' }}>!</div>
                    <div className="h-6 w-6 rounded flex items-center justify-center text-[10px]" style={{ backgroundColor: 'rgb(239 68 68)', color: 'white' }}>×</div>
                    <div className="h-6 w-6 rounded flex items-center justify-center text-[10px]" style={{ backgroundColor: 'rgb(96 165 250)', color: 'black' }}>i</div>
                  </div>
                  <p className="text-sm text-muted-foreground/70 mt-3">data-theme="green-dark"</p>
                </Card>
              </div>
              
              {/* Zinc Theme */}
              <div className="space-y-4">
                <Card className="p-4 overflow-hidden">
                  <h3 className="font-medium mb-2">Zinc Theme (Light)</h3>
                  <div className="flex gap-2 mb-2">
                    <div className="h-10 w-10 rounded-full flex items-center justify-center text-xs font-medium text-white" style={{ backgroundColor: 'rgb(113 113 122)' }}>P</div>
                    <div className="h-10 w-10 rounded-full flex items-center justify-center text-xs font-medium" style={{ backgroundColor: 'rgb(244 244 245)' }}>S</div>
                    <div className="h-10 w-10 rounded-full flex items-center justify-center text-xs font-medium text-white" style={{ backgroundColor: 'rgb(113 113 122)' }}>A</div>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-3">
                    <div className="h-6 w-6 rounded flex items-center justify-center text-[10px]" style={{ backgroundColor: 'rgb(34 197 94)', color: 'white' }}>✓</div>
                    <div className="h-6 w-6 rounded flex items-center justify-center text-[10px]" style={{ backgroundColor: 'rgb(245 158 11)', color: 'white' }}>!</div>
                    <div className="h-6 w-6 rounded flex items-center justify-center text-[10px]" style={{ backgroundColor: 'rgb(239 68 68)', color: 'white' }}>×</div>
                    <div className="h-6 w-6 rounded flex items-center justify-center text-[10px]" style={{ backgroundColor: 'rgb(59 130 246)', color: 'white' }}>i</div>
                  </div>
                  <p className="text-sm text-muted-foreground mt-3">data-theme="zinc-light"</p>
                </Card>
                <Card className="p-4 overflow-hidden" style={{ backgroundColor: '#18181b', color: 'white' }}>
                  <h3 className="font-medium mb-2">Zinc Theme (Dark)</h3>
                  <div className="flex gap-2 mb-2">
                    <div className="h-10 w-10 rounded-full flex items-center justify-center text-xs font-medium" style={{ backgroundColor: 'rgb(161 161 170)', color: 'black' }}>P</div>
                    <div className="h-10 w-10 rounded-full flex items-center justify-center text-xs font-medium text-white" style={{ backgroundColor: 'rgb(39 39 42)' }}>S</div>
                    <div className="h-10 w-10 rounded-full flex items-center justify-center text-xs font-medium" style={{ backgroundColor: 'rgb(161 161 170)', color: 'black' }}>A</div>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-3">
                    <div className="h-6 w-6 rounded flex items-center justify-center text-[10px]" style={{ backgroundColor: 'rgb(74 222 128)', color: 'black' }}>✓</div>
                    <div className="h-6 w-6 rounded flex items-center justify-center text-[10px]" style={{ backgroundColor: 'rgb(251 191 36)', color: 'black' }}>!</div>
                    <div className="h-6 w-6 rounded flex items-center justify-center text-[10px]" style={{ backgroundColor: 'rgb(239 68 68)', color: 'white' }}>×</div>
                    <div className="h-6 w-6 rounded flex items-center justify-center text-[10px]" style={{ backgroundColor: 'rgb(96 165 250)', color: 'black' }}>i</div>
                  </div>
                  <p className="text-sm text-muted-foreground/70 mt-3">data-theme="zinc-dark"</p>
                </Card>
              </div>
            </div>
          </div>
        </ComponentPreview>
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
        
        <h3 className="text-2xl font-bold mt-8 mb-6">Component Showcase</h3>
        
        <ComponentPreview title="Basic Components">
          <div className="grid gap-8">
            <div className="flex flex-wrap gap-4 items-center">
              <UI.Button variant="default">Button</UI.Button>
              <UI.Button variant="secondary">Secondary</UI.Button>
              <UI.Button variant="outline">Outline</UI.Button>
              <UI.Button variant="ghost">Ghost</UI.Button>
            </div>

            <div className="flex flex-wrap gap-4 items-center">
              <Badge>Badge</Badge>
              <Badge variant="secondary">Secondary</Badge>
              <Badge variant="outline">Outline</Badge>
              <Badge variant="destructive">Destructive</Badge>
            </div>

            <div className="flex flex-wrap gap-4 items-center">
              <UI.Avatar>
                <img src="https://github.com/shadcn.png" alt="User" className="rounded-full" />
              </UI.Avatar>
              <UI.Avatar>
                <span className="flex h-full w-full items-center justify-center rounded-full bg-muted">AB</span>
              </UI.Avatar>
              <UI.Avatar>
                <span className="flex h-full w-full items-center justify-center rounded-full bg-primary text-primary-foreground">JD</span>
              </UI.Avatar>
            </div>
          </div>
        </ComponentPreview>

        <ComponentPreview title="Typography Components">
          <div className="grid gap-6">
            <Heading>Heading Component</Heading>
            <SubHeading level={1}>SubHeading Level 1</SubHeading>
            <SubHeading level={2}>SubHeading Level 2</SubHeading>
            <Text>Standard Text Component for paragraphs and content</Text>
            <Text variant="muted">Muted Text Variant</Text>
            <div className="flex gap-4 items-center">
              <Code>console.log('Code Component')</Code>
              <Kbd>Ctrl</Kbd>+<Kbd>C</Kbd>
            </div>
          </div>
        </ComponentPreview>

        <ComponentPreview title="Form Components">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="space-y-2">
                <UI.Label htmlFor="example-input">Text Input</UI.Label>
                <UI.Form.Input id="example-input" placeholder="Enter text here" />
              </div>
              
              <div className="space-y-2">
                <UI.Label htmlFor="example-textarea">Textarea</UI.Label>
                <UI.Form.Textarea id="example-textarea" placeholder="Enter multiple lines of text" />
              </div>
              
              <div className="space-y-4">
                <UI.Label htmlFor="example-select">Select</UI.Label>
                <Select>
                  <SelectTrigger id="example-select">
                    <SelectValue placeholder="Select an option" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="option1">Option 1</SelectItem>
                    <SelectItem value="option2">Option 2</SelectItem>
                    <SelectItem value="option3">Option 3</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="space-y-6">
              <div className="flex flex-col gap-4">
                <div className="flex items-center space-x-2">
                  <UI.Form.Checkbox id="example-checkbox" />
                  <UI.Label htmlFor="example-checkbox">Checkbox</UI.Label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <UI.Form.Switch id="example-switch" />
                  <UI.Label htmlFor="example-switch">Switch</UI.Label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <UI.Form.Radio value="option1" id="option1" name="example-radio" />
                  <UI.Label htmlFor="option1">Radio Option 1</UI.Label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <UI.Form.Radio value="option2" id="option2" name="example-radio" />
                  <UI.Label htmlFor="option2">Radio Option 2</UI.Label>
                </div>
              </div>
              
              <div className="space-y-2">
                <UI.Label htmlFor="example-slider">Slider</UI.Label>
                <UI.Form.Slider id="example-slider" defaultValue={[50]} max={100} step={1} />
              </div>
            </div>
          </div>
        </ComponentPreview>

        <ComponentPreview title="Feedback Components">
          <div className="grid gap-6">
            <Alert>
              <AlertTitle>Default Alert</AlertTitle>
              <AlertDescription>
                This is a standard alert message providing information to users.</AlertDescription>
            </Alert>
            
            <Alert variant="destructive">
              <AlertTitle>Error Alert</AlertTitle>
              <AlertDescription>
                This alert indicates an error or critical information.</AlertDescription>
            </Alert>
            
            <UI.Banner>
              This is a banner message that appears at the top of the page
            </UI.Banner>
            
            <Callout title="Important Information" className="mt-4">
              <div className="text-sm text-muted-foreground">Used to highlight important information</div>
            </Callout>
          </div>
        </ComponentPreview>

        <ComponentPreview title="Dialog Components">
          <div className="grid gap-6">
            <Tabs defaultValue="tab1" className="max-w-md">
              <TabsList>
                <TabsTrigger value="tab1">Tab 1</TabsTrigger>
                <TabsTrigger value="tab2">Tab 2</TabsTrigger>
                <TabsTrigger value="tab3">Tab 3</TabsTrigger>
              </TabsList>
              <TabsContent value="tab1" className="p-4 bg-muted/30 rounded-md mt-2">
                Content for Tab 1
              </TabsContent>
              <TabsContent value="tab2" className="p-4 bg-muted/30 rounded-md mt-2">
                Content for Tab 2
              </TabsContent>
              <TabsContent value="tab3" className="p-4 bg-muted/30 rounded-md mt-2">
                Content for Tab 3
              </TabsContent>
            </Tabs>
            
            <div className="flex flex-wrap gap-4">
              <Dialog>
                <DialogTrigger asChild>
                  <UI.Button variant="outline">Open Dialog</UI.Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Dialog Title</DialogTitle>
                    <DialogDescription>
                      This is a description of the dialog content.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="py-4">Dialog content goes here</div>
                  <DialogFooter>
                    <UI.Button>Save Changes</UI.Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
              
              <div className="relative inline-block">
                <UI.Button variant="outline">Dropdown Menu</UI.Button>
                <div className="hidden absolute mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                  <div className="py-1">
                    <div className="px-4 py-2 text-sm text-gray-700 border-b">
                      <div className="font-medium">Account</div>
                      <div className="text-xs text-muted-foreground">Manage your account settings</div>
                    </div>
                    <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Profile</a>
                    <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Settings</a>
                    <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Logout</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </ComponentPreview>

        <ComponentPreview title="Marketing Components">
          <div className="grid gap-8">
            <div className="p-6 bg-muted/30 rounded-lg border border-dashed border-border">
              <div className="text-center space-y-4">
                <h3 className="text-2xl font-bold">Hero Component</h3>
                <p className="text-muted-foreground max-w-md mx-auto">This demonstrates a simplified version of the HeroBasic component</p>
                <div className="flex justify-center gap-4">
                  <UI.Button>Get Started</UI.Button>
                  <UI.Button variant="outline">Learn More</UI.Button>
                </div>
              </div>
            </div>
            
            <div className="grid md:grid-cols-3 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle>Feature 1</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">Description of feature one with details about what it offers.</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Feature 2</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">Description of feature two with details about what it offers.</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Feature 3</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">Description of feature three with details about what it offers.</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </ComponentPreview>

        <ComponentPreview title="Advanced Components">
          <div className="grid gap-8">
            <Card>
              <CardHeader>
                <CardTitle>Card Component</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Cards are used to group related content and actions</p>
              </CardContent>
            </Card>
            
            <div className="bg-gradient-to-r from-primary/80 to-primary/20 h-8 rounded-md overflow-hidden"></div>
          </div>
        </ComponentPreview>
        
        <h3 className="text-2xl font-bold mt-12 mb-4">Full Component Inventory</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Basic Components</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <ul className="list-disc pl-6 space-y-1">
                <li>Button</li>
                <li>Card</li>
                <li>Label</li>
                <li>Badge</li>
                <li>Avatar</li>
                <li>ScrollArea</li>
              </ul>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Form Components</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <ul className="list-disc pl-6 space-y-1 text-sm">
                <li>Input</li>
                <li>Select</li>
                <li>Checkbox</li>
                <li>Radio</li>
                <li>Textarea</li>
                <li>Switch</li>
                <li>Slider</li>
                <li>ColorPicker</li>
                <li>DatePicker</li>
              </ul>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Feedback Components</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <ul className="list-disc pl-6 space-y-1">
                <li>Alert</li>
                <li>Banner</li>
                <li>FormError</li>
                <li>FormSuccess</li>
                <li>FormWarning</li>
                <li>Callout</li>
                <li>Toast</li>
              </ul>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Dialog Components</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <ul className="list-disc pl-6 space-y-1">
                <li>Dialog</li>
                <li>Dropdown</li>
                <li>Tabs</li>
                <li>Sheet</li>
                <li>Combobox</li>
              </ul>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Typography Components</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <ul className="list-disc pl-6 space-y-1">
                <li>Heading</li>
                <li>SubHeading</li>
                <li>Text</li>
                <li>Code</li>
                <li>Kbd</li>
              </ul>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Marketing Components</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <ul className="list-disc pl-6 space-y-1">
                <li>HeroBasic</li>
                <li>FeatureSection</li>
                <li>CTASection</li>
                <li>PricingSection</li>
                <li>StatsSection</li>
                <li>TestimonialSection</li>
              </ul>
            </CardContent>
          </Card>
        </div>
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