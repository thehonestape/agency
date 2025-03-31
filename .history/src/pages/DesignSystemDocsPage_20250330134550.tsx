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
  PencilIcon,
  ArrowDownTrayIcon,
  GlobeAltIcon,
  QuestionMarkCircleIcon,
  ViewGridIcon,
  TableIcon,
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
  const [activeSection, setActiveSection] = useState("intro");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const sectionRefs = useRef<{ [key: string]: HTMLElement | null }>({});

  // Define documentation sections with icons
  const sections = [
    { id: "intro", title: "Introduction", icon: DocumentTextIcon },
    { id: "typography", title: "Typography", icon: DocumentTextIcon },
    { id: "colors", title: "Colors", icon: SwatchIcon },
    { id: "spacing", title: "Spacing & Layout", icon: ArrowsPointingOutIcon },
    { id: "buttons", title: "Buttons", icon: CursorArrowRaysIcon },
    { id: "inputs", title: "Form Controls", icon: DocumentDuplicateIcon },
    { id: "select", title: "Select & Dropdown", icon: CommandLineIcon },
    { id: "feedback", title: "Feedback", icon: ExclamationTriangleIcon },
    { id: "dialogs", title: "Dialogs & Overlays", icon: ViewGridIcon },
    { id: "navigation", title: "Navigation", icon: MapIcon },
    { id: "display", title: "Data Display", icon: TableIcon },
    { id: "utilities", title: "Utilities", icon: WrenchScrewdriverIcon },
    { id: "themes", title: "Theming", icon: PaintBrushIcon },
  ];

  // Scroll to section function
  const scrollToSection = (sectionId: string) => {
    sectionRefs.current[sectionId]?.scrollIntoView({ behavior: "smooth" });
    setActiveSection(sectionId);
    setMobileMenuOpen(false);
  };

  // Setup intersection observer to update active section on scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.id;
            setActiveSection(id);
          }
        });
      },
      { rootMargin: "-100px 0px -80% 0px" }
    );

    Object.values(sectionRefs.current).forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => {
      Object.values(sectionRefs.current).forEach((ref) => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, [sectionRefs.current]);

  // Section component for consistent styling and ref registration
  const Section: React.FC<{
    id: string;
    title: string;
    description?: string;
    children: React.ReactNode;
  }> = ({ id, title, description, children }) => {
    return (
      <section
        id={id}
        ref={(el) => {
          sectionRefs.current[id] = el;
          return undefined;
        }}
        className="mb-16"
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

  // Component preview card for displaying examples
  const ComponentPreview: React.FC<{
    title: string;
    description?: string;
    children: React.ReactNode;
  }> = ({ title, description, children }) => {
    return (
      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        {description && (
          <p className="text-muted-foreground mb-4">{description}</p>
        )}
        <Card className="overflow-hidden">
          <div className="p-6 border-b">{children}</div>
        </Card>
      </div>
    );
  };

  // Main content sections for the documentation
  const mainContent = (
    <div className="space-y-12">
      {/* Intro Row - Two-Column Layout */}
      <section
        id="intro"
        ref={(el) => {
          sectionRefs.current["intro"] = el;
          return undefined;
        }}
        className="grid grid-cols-1 md:grid-cols-12 gap-6"
      >
        {/* Left Column - 5/12 */}
        <div className="md:col-span-5 space-y-6">
          <div>
            <h1 className="text-4xl font-bold">Workhorse Design System</h1>
            <div className="flex items-center gap-2 mt-2">
              <span className="bg-primary/10 text-primary px-2 py-1 rounded text-sm font-medium">v1.0</span>
              <span className="text-muted-foreground text-sm">Last updated: June 2023</span>
            </div>
          </div>
          <div className="prose dark:prose-invert">
            <p>
              Our design system represents the visual language of Workhorse. It's built to create compelling, meaningful, and beautiful experiences for science, art, culture, and commerce.
            </p>
            <p>
              This system brings together the world's best creative minds and advanced design practices to craft brand experiences that inspire and engage.
            </p>
          </div>
        </div>
        
        {/* Right Column - 7/12 */}
        <div className="md:col-span-7">
          <Card className="bg-muted/30">
            <CardContent className="p-6">
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                <div className="space-y-2 text-center p-4 hover:bg-background rounded-md transition-colors">
                  <DocumentTextIcon className="h-8 w-8 mx-auto text-primary" />
                  <p className="font-medium">Typography</p>
                </div>
                <div className="space-y-2 text-center p-4 hover:bg-background rounded-md transition-colors">
                  <SwatchIcon className="h-8 w-8 mx-auto text-primary" />
                  <p className="font-medium">Colors</p>
                </div>
                <div className="space-y-2 text-center p-4 hover:bg-background rounded-md transition-colors">
                  <ArrowsPointingOutIcon className="h-8 w-8 mx-auto text-primary" />
                  <p className="font-medium">Spacing</p>
                </div>
                <div className="space-y-2 text-center p-4 hover:bg-background rounded-md transition-colors">
                  <CursorArrowRaysIcon className="h-8 w-8 mx-auto text-primary" />
                  <p className="font-medium">Components</p>
                </div>
                <div className="space-y-2 text-center p-4 hover:bg-background rounded-md transition-colors">
                  <PaintBrushIcon className="h-8 w-8 mx-auto text-primary" />
                  <p className="font-medium">Theming</p>
                </div>
                <div className="space-y-2 text-center p-4 hover:bg-background rounded-md transition-colors">
                  <WrenchScrewdriverIcon className="h-8 w-8 mx-auto text-primary" />
                  <p className="font-medium">Utilities</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Typography Section - Two-Column Layout */}
      <section
        id="typography"
        ref={(el) => {
          sectionRefs.current["typography"] = el;
          return undefined;
        }}
        className="mb-16"
      >
        <div className="flex items-center gap-2 mb-8">
          <DocumentTextIcon className="h-6 w-6 text-primary" />
          <h2 className="text-3xl font-bold">Typography</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* Left Column - 5/12 */}
          <div className="md:col-span-5">
            <Card className="h-full">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Font System</span>
                  <Button variant="ghost" size="sm" className="opacity-0">
                    <PencilIcon className="h-4 w-4" />
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="prose dark:prose-invert">
                  <p>
                    Our typography system is built around purpose and clarity. We use a carefully selected set of typefaces organized by their use case:
                  </p>
                  <ul>
                    <li>
                      <strong>Sans-serif:</strong> Primary interface typography for product experiences
                    </li>
                    <li>
                      <strong>Serif:</strong> Editorial content and long-form reading experiences
                    </li>
                    <li>
                      <strong>Monospace:</strong> Code examples and technical content
                    </li>
                    <li>
                      <strong>Display:</strong> Headlines and marketing materials with distinctive personality
                    </li>
                  </ul>
                  <p>
                    This organization allows us to maintain semantic meaning while building a visually cohesive system.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - 7/12 */}
          <div className="md:col-span-7">
            <Card className="h-full">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Type Scale & Hierarchy</span>
                  <Button variant="ghost" size="sm" className="opacity-0">
                    <PencilIcon className="h-4 w-4" />
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-8">
                  <div>
                    <p className="mb-4">
                      Our type system starts with semantic HTML elements but extends to create refined text lockups and consistent visual hierarchy.
                    </p>
                  </div>

                  <div className="space-y-6">
                    <div className="border-b pb-2">
                      <h1 className="text-4xl font-bold">Heading 1</h1>
                      <p className="text-sm text-muted-foreground mt-1">4xl / Bold / 2.25rem</p>
                    </div>
                    <div className="border-b pb-2">
                      <h2 className="text-3xl font-bold">Heading 2</h2>
                      <p className="text-sm text-muted-foreground mt-1">3xl / Bold / 1.875rem</p>
                    </div>
                    <div className="border-b pb-2">
                      <h3 className="text-2xl font-bold">Heading 3</h3>
                      <p className="text-sm text-muted-foreground mt-1">2xl / Bold / 1.5rem</p>
                    </div>
                    <div className="border-b pb-2">
                      <h4 className="text-xl font-semibold">Heading 4</h4>
                      <p className="text-sm text-muted-foreground mt-1">xl / Semibold / 1.25rem</p>
                    </div>
                    <div className="border-b pb-2">
                      <h5 className="text-lg font-semibold">Heading 5</h5>
                      <p className="text-sm text-muted-foreground mt-1">lg / Semibold / 1.125rem</p>
                    </div>
                    <div className="border-b pb-2">
                      <h6 className="text-base font-semibold">Heading 6</h6>
                      <p className="text-sm text-muted-foreground mt-1">base / Semibold / 1rem</p>
                    </div>
                    <div className="border-b pb-2">
                      <p className="text-base">Body Text</p>
                      <p className="text-sm text-muted-foreground mt-1">base / Regular / 1rem</p>
                    </div>
                    <div className="border-b pb-2">
                      <p className="text-sm">Small Text</p>
                      <p className="text-sm text-muted-foreground mt-1">sm / Regular / 0.875rem</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Colors Section - Two-Column Layout */}
      <section
        id="colors"
        ref={(el) => {
          sectionRefs.current["colors"] = el;
          return undefined;
        }}
        className="mb-16"
      >
        <div className="flex items-center gap-2 mb-8">
          <SwatchIcon className="h-6 w-6 text-primary" />
          <h2 className="text-3xl font-bold">Colors</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* Left Column - 5/12 */}
          <div className="md:col-span-5">
            <Card className="h-full">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Color System</span>
                  <Button variant="ghost" size="sm" className="opacity-0">
                    <PencilIcon className="h-4 w-4" />
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="prose dark:prose-invert">
                  <p>
                    Our color system uses Tailwind v4's RGB format for consistent theming across light and dark modes. Colors are defined as CSS variables with space-separated RGB values:
                  </p>
                  <pre className="bg-muted p-4 rounded-md text-sm">
                    {`:root {
  --primary: 222 80% 50%;  /* hsl(222, 80%, 50%) */
  --background: 0 0% 98%;  /* hsl(0, 0%, 98%) */
}

.text-primary {
  color: rgb(var(--primary));
}

/* With opacity */
.bg-primary-50 {
  background-color: rgb(var(--primary) / 0.5);
}`}
                  </pre>
                  <p>
                    This approach allows for seamless theme switching and opacity modifications while maintaining a consistent visual language.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - 7/12 */}
          <div className="md:col-span-7">
            <Card className="h-full">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Color Palette</span>
                  <Button variant="ghost" size="sm" className="opacity-0">
                    <PencilIcon className="h-4 w-4" />
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h3 className="text-lg font-medium mb-3">Theme Colors</h3>
                      <ul className="space-y-2">
                        <li className="grid grid-cols-[1fr_auto]">
                          <div className="flex items-center gap-2">
                            <div className="h-5 w-5 rounded bg-background"></div>
                            <span>Background</span>
                          </div>
                          <code className="text-xs bg-muted px-2 py-1 rounded">var(--background)</code>
                        </li>
                        <li className="grid grid-cols-[1fr_auto]">
                          <div className="flex items-center gap-2">
                            <div className="h-5 w-5 rounded bg-foreground"></div>
                            <span>Foreground</span>
                          </div>
                          <code className="text-xs bg-muted px-2 py-1 rounded">var(--foreground)</code>
                        </li>
                        <li className="grid grid-cols-[1fr_auto]">
                          <div className="flex items-center gap-2">
                            <div className="h-5 w-5 rounded bg-primary"></div>
                            <span>Primary</span>
                          </div>
                          <code className="text-xs bg-muted px-2 py-1 rounded">var(--primary)</code>
                        </li>
                        <li className="grid grid-cols-[1fr_auto]">
                          <div className="flex items-center gap-2">
                            <div className="h-5 w-5 rounded bg-secondary"></div>
                            <span>Secondary</span>
                          </div>
                          <code className="text-xs bg-muted px-2 py-1 rounded">var(--secondary)</code>
                        </li>
                        <li className="grid grid-cols-[1fr_auto]">
                          <div className="flex items-center gap-2">
                            <div className="h-5 w-5 rounded bg-muted"></div>
                            <span>Muted</span>
                          </div>
                          <code className="text-xs bg-muted px-2 py-1 rounded">var(--muted)</code>
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="text-lg font-medium mb-3">UI Colors</h3>
                      <ul className="space-y-2">
                        <li className="grid grid-cols-[1fr_auto]">
                          <div className="flex items-center gap-2">
                            <div className="h-5 w-5 rounded bg-card"></div>
                            <span>Card</span>
                          </div>
                          <code className="text-xs bg-muted px-2 py-1 rounded">var(--card)</code>
                        </li>
                        <li className="grid grid-cols-[1fr_auto]">
                          <div className="flex items-center gap-2">
                            <div className="h-5 w-5 rounded bg-destructive"></div>
                            <span>Destructive</span>
                          </div>
                          <code className="text-xs bg-muted px-2 py-1 rounded">var(--destructive)</code>
                        </li>
                        <li className="grid grid-cols-[1fr_auto]">
                          <div className="flex items-center gap-2">
                            <div className="h-5 w-5 rounded bg-border"></div>
                            <span>Border</span>
                          </div>
                          <code className="text-xs bg-muted px-2 py-1 rounded">var(--border)</code>
                        </li>
                        <li className="grid grid-cols-[1fr_auto]">
                          <div className="flex items-center gap-2">
                            <div className="h-5 w-5 rounded bg-accent"></div>
                            <span>Accent</span>
                          </div>
                          <code className="text-xs bg-muted px-2 py-1 rounded">var(--accent)</code>
                        </li>
                        <li className="grid grid-cols-[1fr_auto]">
                          <div className="flex items-center gap-2">
                            <div className="h-5 w-5 rounded bg-primary-foreground"></div>
                            <span>Primary Text</span>
                          </div>
                          <code className="text-xs bg-muted px-2 py-1 rounded">var(--primary-foreground)</code>
                        </li>
                      </ul>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium mb-3">Color Scale</h3>
                    <div className="flex">
                      {[50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950].map((weight) => (
                        <div 
                          key={weight} 
                          className="flex-1"
                          style={{
                            backgroundColor: `rgb(var(--primary) / ${weight === 500 ? 1 : weight / 1000})`,
                            height: "2.5rem",
                          }}
                        >
                          <div className="text-center text-xs text-primary-foreground mt-2">{weight}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Additional sections with similar two-column layout structure */}
      {/* ... existing code for other sections ... */}
    </div>
  );

  return (
    <div className="bg-background text-foreground min-h-screen">
      {/* Header bar */}
      <header className="sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-sm">
        <div className="flex h-14 items-center px-4 md:px-6">
          <Link to="/" className="flex items-center gap-2 font-semibold">
            <CubeIcon className="h-5 w-5 text-primary" />
            Workhorse Design System
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
          
          {/* Add theme toggle and version in header */}
          <div className="hidden md:flex items-center ml-auto gap-2">
            <span className="text-sm text-muted-foreground">v1.0</span>
            <UI.ThemeSwitcher />
          </div>
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
      <div className="grid md:grid-cols-[240px_1fr] lg:grid-cols-[280px_1fr]">
        {/* Sidebar */}
        <aside className="hidden md:block border-r border-border h-[calc(100vh-3.5rem)] sticky top-14 overflow-y-auto p-4 bg-background">
          <nav>
            {/* Section navigation with visual indicators */}
            <div className="space-y-1">
              {sections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => scrollToSection(section.id)}
                  className={cn(
                    "flex items-center w-full text-left px-3 py-2 rounded-md text-sm transition-colors",
                    activeSection === section.id
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  )}
                >
                  <section.icon className="h-4 w-4 mr-2" />
                  {section.title}
                </button>
              ))}
            </div>
            
            <div className="mt-8 pt-6 border-t border-border">
              <div className="px-3 mb-2 text-xs uppercase text-muted-foreground font-medium tracking-wider">Resources</div>
              <div className="space-y-1">
                <button className="flex items-center w-full text-left px-3 py-2 rounded-md text-sm text-muted-foreground hover:bg-muted hover:text-foreground transition-colors">
                  <ArrowDownTrayIcon className="h-4 w-4 mr-2" />
                  Download
                </button>
                <button className="flex items-center w-full text-left px-3 py-2 rounded-md text-sm text-muted-foreground hover:bg-muted hover:text-foreground transition-colors">
                  <GlobeAltIcon className="h-4 w-4 mr-2" />
                  Repository
                </button>
                <button className="flex items-center w-full text-left px-3 py-2 rounded-md text-sm text-muted-foreground hover:bg-muted hover:text-foreground transition-colors">
                  <QuestionMarkCircleIcon className="h-4 w-4 mr-2" />
                  Support
                </button>
              </div>
            </div>
          </nav>
        </aside>

        {/* Main content */}
        <main className="p-6 lg:p-8 xl:p-10">
          {mainContent}
        </main>
      </div>
    </div>
  );
};

export default DesignSystemDocsPage; 