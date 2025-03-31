import React, { useState, useRef, useEffect } from 'react';
import {
  Button,
  Alert,
  AlertTitle,
  AlertDescription,
  Badge,
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  Input,
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
  Label,
} from '../components/ui';

// Side Navigation Component
const SideNav = ({ sections, activeSection, onClick }) => {
  return (
    <div className="w-64 fixed top-20 h-[calc(100vh-80px)] overflow-auto py-8 pr-4 hidden lg:block">
      <nav className="space-y-1">
        {sections.map((section) => (
          <a
            key={section.id}
            href={`#${section.id}`}
            onClick={(e) => {
              e.preventDefault();
              onClick(section.id);
            }}
            className={`block py-2 px-3 text-sm rounded-md transition-colors ${
              activeSection === section.id
                ? 'bg-primary/10 text-primary font-medium'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            {section.title}
          </a>
        ))}
      </nav>
    </div>
  );
};

// Section container with proper spacing and structure
const Section = ({ id, title, description, children }) => {
  return (
    <section id={id} className="pt-16 pb-24 scroll-mt-20">
      <h2 className="text-3xl font-bold text-gray-900 mb-3">{title}</h2>
      {description && (
        <p className="text-lg text-gray-600 mb-8 max-w-3xl">{description}</p>
      )}
      {children}
    </section>
  );
};

// Color presentation component
const ColorPalette = ({ title, colors }) => {
  return (
    <div className="mb-12">
      <h3 className="text-xl font-semibold mb-4">{title}</h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
        {colors.map((color) => (
          <div key={color.name} className="space-y-2">
            <div 
              className={`h-24 rounded-lg ${color.bg}`} 
              style={{ boxShadow: "0 2px 4px rgba(0,0,0,0.05)" }}
            />
            <div className="px-1">
              <div className="font-medium">{color.name}</div>
              <div className="text-sm text-gray-500">{color.value}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Typography component
const TypographyExample = ({ name, className, children }) => {
  return (
    <div className="mb-8 border-b border-gray-200 pb-4">
      <div className={`${className} mb-2`}>{children}</div>
      <div className="flex justify-between text-sm text-gray-500">
        <span>{name}</span>
        <code className="font-mono bg-gray-100 px-2 py-1 rounded">{className}</code>
      </div>
    </div>
  );
};

// Component Preview
const ComponentPreview = ({ title, description, children, code }) => {
  const [showCode, setShowCode] = useState(false);
  
  return (
    <div className="mb-12 border rounded-xl overflow-hidden bg-white shadow-sm">
      <div className="border-b px-4 py-3 flex justify-between items-center">
        <div>
          <h3 className="text-lg font-semibold">{title}</h3>
          {description && <p className="text-sm text-gray-600 mt-1">{description}</p>}
        </div>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={() => setShowCode(!showCode)}
        >
          {showCode ? 'Hide Code' : 'View Code'}
        </Button>
      </div>
      <div className="p-6 flex flex-wrap items-center gap-4">
        {children}
      </div>
      {showCode && (
        <div className="bg-gray-950 p-4 text-gray-200 overflow-x-auto">
          <pre className="font-mono text-sm">
            <code>{code}</code>
          </pre>
        </div>
      )}
    </div>
  );
};

// Main Design System Documentation component
export const DesignSystemDocs = () => {
  // Define sections
  const sections = [
    { id: "intro", title: "Introduction" },
    { id: "colors", title: "Colors" },
    { id: "typography", title: "Typography" },
    { id: "spacing", title: "Spacing & Layout" },
    { id: "components", title: "Components" },
    { id: "buttons", title: "Buttons" },
    { id: "inputs", title: "Form Elements" },
    { id: "feedback", title: "Feedback" },
    { id: "navigation", title: "Navigation" },
    { id: "data-display", title: "Data Display" },
  ];

  // State for active section
  const [activeSection, setActiveSection] = useState(sections[0].id);
  const sectionRefs = useRef({});

  // Example colors
  const brandColors = [
    { name: "Primary", bg: "bg-primary", value: "rgb(var(--primary))" },
    { name: "Secondary", bg: "bg-secondary", value: "rgb(var(--secondary))" },
    { name: "Accent", bg: "bg-accent", value: "rgb(var(--accent))" },
    { name: "Muted", bg: "bg-muted", value: "rgb(var(--muted))" },
  ];

  const feedbackColors = [
    { name: "Success", bg: "bg-green-500", value: "rgb(34, 197, 94)" },
    { name: "Warning", bg: "bg-yellow-500", value: "rgb(234, 179, 8)" },
    { name: "Error", bg: "bg-red-500", value: "rgb(239, 68, 68)" },
    { name: "Info", bg: "bg-blue-500", value: "rgb(59, 130, 246)" },
  ];
  
  const grayColors = [
    { name: "Gray 50", bg: "bg-gray-50", value: "rgb(249, 250, 251)" },
    { name: "Gray 100", bg: "bg-gray-100", value: "rgb(243, 244, 246)" },
    { name: "Gray 200", bg: "bg-gray-200", value: "rgb(229, 231, 235)" },
    { name: "Gray 300", bg: "bg-gray-300", value: "rgb(209, 213, 219)" },
    { name: "Gray 400", bg: "bg-gray-400", value: "rgb(156, 163, 175)" },
    { name: "Gray 500", bg: "bg-gray-500", value: "rgb(107, 114, 128)" },
    { name: "Gray 600", bg: "bg-gray-600", value: "rgb(75, 85, 99)" },
    { name: "Gray 700", bg: "bg-gray-700", value: "rgb(55, 65, 81)" },
    { name: "Gray 800", bg: "bg-gray-800", value: "rgb(31, 41, 55)" },
    { name: "Gray 900", bg: "bg-gray-900", value: "rgb(17, 24, 39)" },
    { name: "Gray 950", bg: "bg-gray-950", value: "rgb(3, 7, 18)" },
  ];

  // Observe sections and update active section based on visibility
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-100px 0px -80% 0px" }
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
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 80,
        behavior: "smooth",
      });
      setActiveSection(sectionId);
    }
  };

  // Button code example
  const buttonCode = `<Button variant="default">Primary</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="outline">Outline</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="link">Link</Button>`;

  // Alert code example
  const alertCode = `<Alert variant="success">
  <AlertTitle>Success</AlertTitle>
  <AlertDescription>Your changes have been saved successfully.</AlertDescription>
</Alert>

<Alert variant="error">
  <AlertTitle>Error</AlertTitle>
  <AlertDescription>There was a problem with your request.</AlertDescription>
</Alert>`;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-white border-b h-20 flex items-center px-6">
        <div className="max-w-7xl mx-auto w-full flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">Design System</h1>
          <div className="flex space-x-2 lg:hidden">
            <Button variant="outline" size="sm">Menu</Button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-20">
        <div className="lg:flex lg:gap-10">
          {/* Sidebar Navigation */}
          <SideNav 
            sections={sections} 
            activeSection={activeSection} 
            onClick={scrollToSection} 
          />

          {/* Main Content */}
          <main className="lg:ml-64 lg:flex-1">
            {/* Introduction */}
            <Section 
              id="intro" 
              title="Introduction" 
              description="This design system provides a comprehensive set of guidelines, components, and resources to create consistent and accessible user experiences."
            >
              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <Card>
                  <CardHeader>
                    <CardTitle>Purpose</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">Our design system ensures consistency across products while enabling efficient design and development workflows.</p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Principles</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">Built on principles of consistency, accessibility, simplicity, and modularity to create quality experiences.</p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Usage</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">This documentation outlines all the elements of our design system from basic tokens to complex components.</p>
                  </CardContent>
                </Card>
              </div>
            </Section>

            {/* Colors */}
            <Section 
              id="colors" 
              title="Colors" 
              description="Our color system is designed to be accessible, consistent, and flexible across different contexts and devices."
            >
              <ColorPalette title="Brand Colors" colors={brandColors} />
              <ColorPalette title="Feedback Colors" colors={feedbackColors} />
              <ColorPalette title="Gray Scale" colors={grayColors} />
            </Section>

            {/* Typography */}
            <Section 
              id="typography" 
              title="Typography" 
              description="Typography establishes hierarchy, enhances readability, and creates a consistent brand expression."
            >
              <TypographyExample name="Heading 1" className="text-4xl font-bold text-gray-900">
                The quick brown fox jumps over the lazy dog
              </TypographyExample>
              
              <TypographyExample name="Heading 2" className="text-3xl font-bold text-gray-900">
                The quick brown fox jumps over the lazy dog
              </TypographyExample>
              
              <TypographyExample name="Heading 3" className="text-2xl font-bold text-gray-900">
                The quick brown fox jumps over the lazy dog
              </TypographyExample>
              
              <TypographyExample name="Heading 4" className="text-xl font-semibold text-gray-900">
                The quick brown fox jumps over the lazy dog
              </TypographyExample>
              
              <TypographyExample name="Paragraph" className="text-base text-gray-700">
                The quick brown fox jumps over the lazy dog. This sentence contains all the letters of the English alphabet, making it perfect for showing typeface examples.
              </TypographyExample>
              
              <TypographyExample name="Small Text" className="text-sm text-gray-600">
                The quick brown fox jumps over the lazy dog
              </TypographyExample>
              
              <TypographyExample name="Label" className="text-sm font-medium text-gray-700">
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
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[1, 2, 3, 4, 5, 6, 8, 10, 12, 16, 20, 24].map((space) => (
                    <div key={space} className="flex items-center">
                      <div 
                        className="h-8 bg-primary/20 mr-4" 
                        style={{ width: `${space * 0.25}rem` }}
                      ></div>
                      <span className="text-sm font-mono text-gray-600">space-{space} ({space * 0.25}rem)</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <ComponentPreview 
                title="Container" 
                description="The container centers content horizontally with responsive padding."
                code={`<div className="container mx-auto px-4">Content goes here</div>`}
              >
                <div className="w-full p-4 border border-dashed border-gray-300 text-center">
                  <span className="text-gray-600 text-sm">Container content with responsive padding</span>
                </div>
              </ComponentPreview>
              
              <ComponentPreview 
                title="Grid System" 
                description="Use our responsive grid system for layouts."
                code={`<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
  <div>Grid Item 1</div>
  <div>Grid Item 2</div>
  <div>Grid Item 3</div>
  <div>Grid Item 4</div>
</div>`}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
                  {[1, 2, 3, 4].map((n) => (
                    <div key={n} className="bg-gray-100 p-4 text-center rounded">
                      <span className="text-gray-600">Grid Item {n}</span>
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
                <p className="mb-4">Components are organized by category for easy reference:</p>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-4">
                  {[
                    "Buttons & Actions",
                    "Form & Inputs",
                    "Feedback & Alerts",
                    "Navigation & Menus",
                    "Layout & Structure",
                    "Data Display",
                    "Overlays & Modals",
                    "Media & Icons"
                  ].map(category => (
                    <li key={category} className="flex items-center gap-2 py-2 px-3 bg-white rounded-lg border">
                      <span className="w-2 h-2 rounded-full bg-primary"></span>
                      <span>{category}</span>
                    </li>
                  ))}
                </ul>
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
                code={buttonCode}
              >
                <Button variant="default">Primary</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="outline">Outline</Button>
                <Button variant="ghost">Ghost</Button>
                <Button variant="link">Link</Button>
              </ComponentPreview>
              
              <ComponentPreview 
                title="Button Sizes" 
                description="Buttons in different sizes for various use cases."
                code={`<Button size="sm">Small</Button>
<Button>Default</Button>
<Button size="lg">Large</Button>`}
              >
                <Button size="sm">Small</Button>
                <Button>Default</Button>
                <Button size="lg">Large</Button>
              </ComponentPreview>
              
              <ComponentPreview 
                title="Button with Icon" 
                description="Buttons with icons for enhanced visual cues."
                code={`<Button>
  <svg className="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
  </svg>
  Upload
</Button>`}
              >
                <Button>
                  <svg className="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                  </svg>
                  Upload
                </Button>
                
                <Button variant="outline">
                  <svg className="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Confirm
                </Button>
              </ComponentPreview>
            </Section>

            {/* Inputs */}
            <Section 
              id="inputs" 
              title="Form Elements" 
              description="Form elements allow users to enter data and make selections."
            >
              <ComponentPreview 
                title="Text Input" 
                description="Basic text input field."
                code={`<div className="space-y-2">
  <Label htmlFor="email">Email</Label>
  <Input id="email" type="email" placeholder="Enter your email" />
</div>`}
              >
                <div className="w-full max-w-sm space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="Enter your email" />
                </div>
              </ComponentPreview>
              
              <ComponentPreview 
                title="Select" 
                description="Dropdown selection component."
                code={`<div className="space-y-2">
  <Label htmlFor="country">Country</Label>
  <Select>
    <SelectTrigger>
      <SelectValue placeholder="Select a country" />
    </SelectTrigger>
    <SelectContent>
      <SelectItem value="us">United States</SelectItem>
      <SelectItem value="ca">Canada</SelectItem>
      <SelectItem value="mx">Mexico</SelectItem>
    </SelectContent>
  </Select>
</div>`}
              >
                <div className="w-full max-w-sm space-y-2">
                  <Label htmlFor="country">Country</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a country" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="us">United States</SelectItem>
                      <SelectItem value="ca">Canada</SelectItem>
                      <SelectItem value="mx">Mexico</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </ComponentPreview>
              
              <ComponentPreview 
                title="Form Layout" 
                description="Example of a simple form layout."
                code={`<form className="space-y-6 max-w-md">
  <div className="space-y-2">
    <Label htmlFor="name">Full Name</Label>
    <Input id="name" type="text" />
  </div>
  <div className="space-y-2">
    <Label htmlFor="email">Email</Label>
    <Input id="email" type="email" />
  </div>
  <Button type="submit">Submit</Button>
</form>`}
              >
                <form className="space-y-6 max-w-md w-full">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input id="name" type="text" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" />
                  </div>
                  <Button type="submit">Submit</Button>
                </form>
              </ComponentPreview>
            </Section>

            {/* Feedback */}
            <Section 
              id="feedback" 
              title="Feedback" 
              description="Feedback components communicate system status, errors, warnings, and other important information."
            >
              <ComponentPreview 
                title="Alerts" 
                description="Alerts communicate important information to users."
                code={alertCode}
              >
                <div className="w-full space-y-4">
                  <Alert className="bg-green-50 border-green-500 text-green-800">
                    <AlertTitle>Success</AlertTitle>
                    <AlertDescription>Your changes have been saved successfully.</AlertDescription>
                  </Alert>
                  
                  <Alert className="bg-red-50 border-red-500 text-red-800">
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>There was a problem with your request.</AlertDescription>
                  </Alert>
                </div>
              </ComponentPreview>
              
              <ComponentPreview 
                title="Badges" 
                description="Badges are used to highlight status or count."
                code={`<Badge>New</Badge>
<Badge variant="secondary">In Progress</Badge>
<Badge variant="outline">Pending</Badge>
<Badge variant="destructive">Error</Badge>`}
              >
                <Badge>New</Badge>
                <Badge variant="secondary">In Progress</Badge>
                <Badge variant="outline">Pending</Badge>
                <Badge variant="destructive">Error</Badge>
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
                code={`<Tabs defaultValue="overview">
  <TabsList>
    <TabsTrigger value="overview">Overview</TabsTrigger>
    <TabsTrigger value="settings">Settings</TabsTrigger>
    <TabsTrigger value="notifications">Notifications</TabsTrigger>
  </TabsList>
  <TabsContent value="overview">Overview content</TabsContent>
  <TabsContent value="settings">Settings content</TabsContent>
  <TabsContent value="notifications">Notifications content</TabsContent>
</Tabs>`}
              >
                <Tabs defaultValue="overview" className="w-full">
                  <TabsList>
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="settings">Settings</TabsTrigger>
                    <TabsTrigger value="notifications">Notifications</TabsTrigger>
                  </TabsList>
                  <TabsContent value="overview" className="p-4 border rounded-b">
                    Overview content goes here
                  </TabsContent>
                  <TabsContent value="settings" className="p-4 border rounded-b">
                    Settings content goes here
                  </TabsContent>
                  <TabsContent value="notifications" className="p-4 border rounded-b">
                    Notifications content goes here
                  </TabsContent>
                </Tabs>
              </ComponentPreview>
            </Section>
            
            {/* Data Display */}
            <Section 
              id="data-display" 
              title="Data Display" 
              description="Components that help present data in an organized and readable way."
            >
              <ComponentPreview 
                title="Cards" 
                description="Cards group related content and actions."
                code={`<Card>
  <CardHeader>
    <CardTitle>Card Title</CardTitle>
    <CardDescription>Card description goes here</CardDescription>
  </CardHeader>
  <CardContent>
    <p>Card content and information</p>
  </CardContent>
</Card>`}
              >
                <Card className="w-full max-w-md">
                  <CardHeader>
                    <CardTitle>Card Title</CardTitle>
                    <CardDescription>Card description goes here</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p>Card content and information</p>
                  </CardContent>
                </Card>
              </ComponentPreview>
            </Section>
          </main>
        </div>
      </div>
    </div>
  );
}; 