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
              <AlertDescription>This is a standard alert message providing information to users.</AlertDescription>
            </Alert>
            
            <Alert variant="destructive">
              <AlertTitle>Error Alert</AlertTitle>
              <AlertDescription>This alert indicates an error or critical information.</AlertDescription>
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
                <ThemeToggle />
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