import React, { useState, useRef, useEffect, ReactNode, Fragment } from 'react';
import ThemeSwitcher from '@/components/ThemeSwitcher';
import { Dialog, Transition } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { cn } from '@/lib/utils';

interface Section {
  id: string;
  title: string;
}

interface SideNavProps {
  sections: Section[];
  activeSection: string;
  onClick: (sectionId: string) => void;
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

// Side Navigation Component
const SideNav: React.FC<SideNavProps> = ({ 
  sections, 
  activeSection, 
  onClick, 
  sidebarOpen, 
  setSidebarOpen 
}) => {
  const sidebarContent = (
    <>
      {/* Sidebar Header */}
      <div className="flex h-16 shrink-0 items-center border-b border-border px-6">
        <h2 className="text-lg font-semibold">Design System</h2>
      </div>
      
      {/* Navigation Links */}
      <div className="flex grow flex-col gap-y-5 overflow-y-auto px-4 py-6">
        <div className="mb-4">
          <ThemeSwitcher />
        </div>
        
        <div className="py-2">
          <p className="text-sm font-medium text-muted-foreground mb-3 px-3">Documentation</p>
          <nav className="space-y-1">
            {sections.map((section) => (
              <a
                key={section.id}
                href={`#${section.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  onClick(section.id);
                  setSidebarOpen(false);
                }}
                className={`block py-2 px-3 text-sm rounded-md transition-colors ${
                  activeSection === section.id
                    ? 'bg-primary/10 text-primary font-medium'
                    : 'text-muted-foreground hover:bg-muted'
                }`}
              >
                {section.title}
              </a>
            ))}
          </nav>
        </div>
      </div>
    </>
  );

  return (
    <>
      {/* Mobile sidebar */}
      <Transition.Root show={sidebarOpen} as={Fragment}>
        <Dialog as="div" className="relative z-50 lg:hidden" onClose={setSidebarOpen}>
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-foreground/20" />
          </Transition.Child>

          <div className="fixed inset-0 flex">
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <Dialog.Panel className="relative mr-16 flex w-full max-w-xs flex-1">
                <Transition.Child
                  as={Fragment}
                  enter="ease-in-out duration-300"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="ease-in-out duration-300"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <div className="absolute left-full top-0 flex w-16 justify-center pt-5">
                    <button 
                      type="button" 
                      className="-m-2.5 p-2.5 rounded-md" 
                      onClick={() => setSidebarOpen(false)}
                    >
                      <span className="sr-only">Close sidebar</span>
                      <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>
                </Transition.Child>
                
                {/* Sidebar component for mobile */}
                <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-background border-r border-border">
                  {sidebarContent}
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>

      {/* Static sidebar for desktop */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-64 lg:flex-col">
        <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-background border-r border-border">
          {sidebarContent}
        </div>
      </div>
    </>
  );
};

interface SectionProps {
  id: string;
  title: string;
  description?: string;
  children: ReactNode;
}

// Section container with proper spacing and structure
const Section: React.FC<SectionProps> = ({ id, title, description, children }) => {
  return (
    <section id={id} className="pt-16 pb-24 scroll-mt-20">
      <h2 className="text-3xl font-bold text-foreground mb-3">{title}</h2>
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

interface ColorPaletteProps {
  title: string;
  colors: ColorInfo[];
}

// Color presentation component
const ColorPalette: React.FC<ColorPaletteProps> = ({ title, colors }) => {
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
              <div className="text-sm text-muted-foreground">{color.value}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

interface TypographyExampleProps {
  name: string;
  className: string;
  children: ReactNode;
}

// Typography component
const TypographyExample: React.FC<TypographyExampleProps> = ({ name, className, children }) => {
  return (
    <div className="mb-8 border-b border-border pb-4">
      <div className={`${className} mb-2`}>{children}</div>
      <div className="flex justify-between text-sm text-muted-foreground">
        <span>{name}</span>
        <span className="font-mono">{className}</span>
      </div>
    </div>
  );
};

interface ComponentPreviewProps {
  title: string;
  description?: string;
  children: ReactNode;
}

// Component Preview
const ComponentPreview: React.FC<ComponentPreviewProps> = ({ title, description, children }) => {
  return (
    <div className="mb-12">
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      {description && <p className="text-muted-foreground mb-4">{description}</p>}
      <div className="p-6 bg-card rounded-lg border shadow-sm">
        {children}
      </div>
    </div>
  );
};

// Main Design System Documentation component
const DesignSystemDocsPage: React.FC = () => {
  // Define sections
  const sections: Section[] = [
    { id: "intro", title: "Introduction" },
    { id: "colors", title: "Colors" },
    { id: "typography", title: "Typography" },
    { id: "spacing", title: "Spacing & Layout" },
    { id: "components", title: "Components" },
    { id: "buttons", title: "Buttons" },
    { id: "inputs", title: "Inputs" },
    { id: "feedback", title: "Feedback" },
    { id: "navigation", title: "Navigation" },
    { id: "utilities", title: "Utilities" },
  ];

  // State for active section and mobile sidebar
  const [activeSection, setActiveSection] = useState(sections[0].id);
  const [sidebarOpen, setSidebarOpen] = useState(false);
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
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 80,
        behavior: "smooth",
      });
      setActiveSection(sectionId);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Sidebar Navigation */}
      <SideNav 
        sections={sections} 
        activeSection={activeSection} 
        onClick={scrollToSection}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      {/* Main Content */}
      <div className="lg:pl-64">
        {/* Title Bar */}
        <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-border bg-background px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
          <button
            type="button"
            className="-m-2.5 p-2.5 text-muted-foreground hover:text-foreground lg:hidden"
            onClick={() => setSidebarOpen(true)}
          >
            <span className="sr-only">Open sidebar</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>

          {/* Separator */}
          <div className="h-6 w-px bg-border lg:hidden" aria-hidden="true" />

          <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
            <div className="flex flex-1 items-center">
              <h1 className="text-xl font-semibold">Design System Documentation</h1>
            </div>
          </div>
        </div>
        
        {/* Content Area */}
        <main>
          <div className="px-4 py-10 sm:px-6 lg:px-8 max-w-5xl mx-auto">
            {/* Introduction */}
            <Section 
              id="intro" 
              title="Introduction" 
              description="This design system provides a comprehensive set of guidelines, components, and resources to create consistent and accessible user experiences."
            >
              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <div className="bg-card p-6 rounded-lg border shadow-sm">
                  <h3 className="text-lg font-medium mb-2">Purpose</h3>
                  <p className="text-muted-foreground">Our design system ensures consistency across products while enabling efficient design and development workflows.</p>
                </div>
                <div className="bg-card p-6 rounded-lg border shadow-sm">
                  <h3 className="text-lg font-medium mb-2">Principles</h3>
                  <p className="text-muted-foreground">Built on principles of consistency, accessibility, simplicity, and modularity to create quality experiences.</p>
                </div>
                <div className="bg-card p-6 rounded-lg border shadow-sm">
                  <h3 className="text-lg font-medium mb-2">Usage</h3>
                  <p className="text-muted-foreground">This documentation outlines all the elements of our design system from basic tokens to complex components.</p>
                </div>
              </div>
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
                <div className="space-y-4">
                  {[1, 2, 3, 4, 6, 8, 12, 16].map((space) => (
                    <div key={space} className="flex items-center">
                      <div className="h-8 bg-primary/20" style={{ width: `${space * 0.25}rem` }}></div>
                      <span className="text-sm font-mono text-muted-foreground ml-4">space-{space} ({space * 0.25}rem)</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <ComponentPreview 
                title="Container" 
                description="The container centers content horizontally with responsive padding."
              >
                <div className="p-4 border border-dashed border-border text-center">
                  <span className="text-muted-foreground text-sm">Container content with responsive padding</span>
                </div>
              </ComponentPreview>
              
              <ComponentPreview 
                title="Grid System" 
                description="Use our responsive grid system for layouts."
              >
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {[1, 2, 3, 4].map((n) => (
                    <div key={n} className="bg-muted p-4 text-center rounded">
                      <span className="text-muted-foreground text-sm">Grid Item {n}</span>
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
                <ul className="list-disc list-inside space-y-1">
                  <li>Buttons & Actions</li>
                  <li>Form & Inputs</li>
                  <li>Feedback & Alerts</li>
                  <li>Navigation & Menus</li>
                  <li>Layout & Structure</li>
                  <li>Data Display</li>
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
              >
                <div className="flex flex-wrap gap-4">
                  <button className="bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90">
                    Primary
                  </button>
                  <button className="bg-secondary text-secondary-foreground px-4 py-2 rounded-md hover:bg-secondary/90">
                    Secondary
                  </button>
                  <button className="bg-background border border-input text-foreground px-4 py-2 rounded-md hover:bg-muted">
                    Outline
                  </button>
                  <button className="text-primary hover:underline">
                    Link Button
                  </button>
                </div>
              </ComponentPreview>
              
              <ComponentPreview 
                title="Button Sizes" 
                description="Buttons in different sizes for various use cases."
              >
                <div className="flex items-center flex-wrap gap-4">
                  <button className="bg-primary text-primary-foreground px-2.5 py-1 text-sm rounded hover:bg-primary/90">
                    Small
                  </button>
                  <button className="bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90">
                    Medium
                  </button>
                  <button className="bg-primary text-primary-foreground px-5 py-3 text-lg rounded-md hover:bg-primary/90">
                    Large
                  </button>
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
                  <label className="block text-sm font-medium text-foreground">Email</label>
                  <input 
                    type="email" 
                    className="w-full px-3 py-2 border border-input bg-background rounded-md focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
                    placeholder="Enter your email"
                  />
                </div>
              </ComponentPreview>
              
              <ComponentPreview 
                title="Select" 
                description="Dropdown selection component."
              >
                <div className="max-w-md space-y-2">
                  <label className="block text-sm font-medium text-foreground" id="country-label">Country</label>
                  <select
                    aria-labelledby="country-label"
                    className="w-full px-3 py-2 border border-input bg-background rounded-md focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
                  >
                    <option>United States</option>
                    <option>Canada</option>
                    <option>Mexico</option>
                    <option>Other</option>
                  </select>
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
                  <div className="bg-[#22c55e]/10 border-l-4 border-[#22c55e] p-4 rounded">
                    <div className="flex">
                      <div className="flex-shrink-0">
                        <svg className="h-5 w-5 text-[#22c55e]" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div className="ml-3">
                        <p className="text-[#166534] text-sm font-medium">Successfully saved changes</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-destructive/10 border-l-4 border-destructive p-4 rounded">
                    <div className="flex">
                      <div className="flex-shrink-0">
                        <svg className="h-5 w-5 text-destructive" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div className="ml-3">
                        <p className="text-destructive text-sm font-medium">There was an error processing your request</p>
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
              description="Navigation components help users move between different views and sections."
            >
              <ComponentPreview 
                title="Tabs" 
                description="Tabbed navigation for content organization."
              >
                <div className="border-b border-border">
                  <nav className="-mb-px flex space-x-8">
                    <a href="#" className="border-primary text-primary border-b-2 py-2 px-1 text-sm font-medium">
                      Overview
                    </a>
                    <a href="#" className="border-transparent text-muted-foreground hover:text-foreground hover:border-border border-b-2 py-2 px-1 text-sm font-medium">
                      Settings
                    </a>
                    <a href="#" className="border-transparent text-muted-foreground hover:text-foreground hover:border-border border-b-2 py-2 px-1 text-sm font-medium">
                      Notifications
                    </a>
                  </nav>
                </div>
              </ComponentPreview>
            </Section>

            {/* Utilities */}
            <Section 
              id="utilities" 
              title="Utilities" 
              description="Utility classes help with common styling needs and maintaining consistency."
            >
              <ComponentPreview 
                title="Shadows" 
                description="Shadow utilities for adding depth to elements."
              >
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  <div className="h-24 bg-card rounded-md shadow-sm flex items-center justify-center">
                    <span className="text-muted-foreground text-sm">shadow-sm</span>
                  </div>
                  <div className="h-24 bg-card rounded-md shadow flex items-center justify-center">
                    <span className="text-muted-foreground text-sm">shadow</span>
                  </div>
                  <div className="h-24 bg-card rounded-md shadow-md flex items-center justify-center">
                    <span className="text-muted-foreground text-sm">shadow-md</span>
                  </div>
                  <div className="h-24 bg-card rounded-md shadow-lg flex items-center justify-center">
                    <span className="text-muted-foreground text-sm">shadow-lg</span>
                  </div>
                </div>
              </ComponentPreview>
            </Section>
          </div>
        </main>
      </div>
    </div>
  );
};

export default DesignSystemDocsPage; 