import React, { useState, useRef, useEffect } from 'react';

// Side Navigation Component
const SideNav = ({ sections, activeSection, onClick }) => {
  return (
    <div className="w-64 sticky top-20 h-[calc(100vh-80px)] overflow-auto py-8 pr-4 hidden lg:block">
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
        <span className="font-mono">{className}</span>
      </div>
    </div>
  );
};

// Component Preview
const ComponentPreview = ({ title, description, children }) => {
  return (
    <div className="mb-12">
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      {description && <p className="text-gray-600 mb-4">{description}</p>}
      <div className="p-6 bg-white border rounded-lg shadow-sm">
        {children}
      </div>
    </div>
  );
};

// Main Design System Documentation component
const DesignSystemDocsPage: React.FC = () => {
  // Define sections
  const sections = [
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

  // State for active section
  const [activeSection, setActiveSection] = useState(sections[0].id);
  const sectionRefs = useRef({});

  // Example colors
  const brandColors = [
    { name: "Primary", bg: "bg-primary", value: "var(--primary)" },
    { name: "Secondary", bg: "bg-secondary", value: "var(--secondary)" },
    { name: "Accent", bg: "bg-accent", value: "var(--accent)" },
    { name: "Muted", bg: "bg-muted", value: "var(--muted)" },
  ];

  const feedbackColors = [
    { name: "Success", bg: "bg-success", value: "var(--success)" },
    { name: "Warning", bg: "bg-warning", value: "var(--warning)" },
    { name: "Error", bg: "bg-error", value: "var(--error)" },
    { name: "Info", bg: "bg-info", value: "var(--info)" },
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

  return (
    <div className="min-h-screen">
      {/* Title Bar */}
      <div className="py-8 border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">Design System</h1>
          <p className="mt-2 text-gray-600">Comprehensive documentation of our design patterns and components</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-20">
        <div className="lg:flex lg:gap-10">
          {/* Sidebar Navigation */}
          <SideNav 
            sections={sections} 
            activeSection={activeSection} 
            onClick={scrollToSection} 
          />

          {/* Main Content */}
          <div className="lg:flex-1">
            {/* Introduction */}
            <Section 
              id="intro" 
              title="Introduction" 
              description="This design system provides a comprehensive set of guidelines, components, and resources to create consistent and accessible user experiences."
            >
              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <div className="bg-white p-6 rounded-lg border shadow-sm">
                  <h3 className="text-lg font-medium mb-2">Purpose</h3>
                  <p className="text-gray-600">Our design system ensures consistency across products while enabling efficient design and development workflows.</p>
                </div>
                <div className="bg-white p-6 rounded-lg border shadow-sm">
                  <h3 className="text-lg font-medium mb-2">Principles</h3>
                  <p className="text-gray-600">Built on principles of consistency, accessibility, simplicity, and modularity to create quality experiences.</p>
                </div>
                <div className="bg-white p-6 rounded-lg border shadow-sm">
                  <h3 className="text-lg font-medium mb-2">Usage</h3>
                  <p className="text-gray-600">This documentation outlines all the elements of our design system from basic tokens to complex components.</p>
                </div>
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
              
              <TypographyExample name="Paragraph" className="text-base text-gray-700">
                The quick brown fox jumps over the lazy dog. This sentence contains all the letters of the English alphabet, making it perfect for showing typeface examples.
              </TypographyExample>
              
              <TypographyExample name="Small Text" className="text-sm text-gray-600">
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
                      <div className={`h-8 bg-primary/20 w-${space} mr-4`}></div>
                      <span className="text-sm font-mono text-gray-600">space-{space} ({space * 0.25}rem)</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <ComponentPreview 
                title="Container" 
                description="The container centers content horizontally with responsive padding."
              >
                <div className="p-4 border border-dashed border-gray-300 text-center">
                  <span className="text-gray-600 text-sm">Container content with responsive padding</span>
                </div>
              </ComponentPreview>
              
              <ComponentPreview 
                title="Grid System" 
                description="Use our responsive grid system for layouts."
              >
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {[1, 2, 3, 4].map((n) => (
                    <div key={n} className="bg-gray-100 p-4 text-center rounded">
                      <span className="text-gray-600 text-sm">Grid Item {n}</span>
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
                <ul className="list-disc list-inside space-y-1 text-gray-700">
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
                  <button className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary/90">
                    Primary
                  </button>
                  <button className="bg-secondary text-white px-4 py-2 rounded-md hover:bg-secondary/90">
                    Secondary
                  </button>
                  <button className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-50">
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
                  <button className="bg-primary text-white px-2.5 py-1 text-sm rounded hover:bg-primary/90">
                    Small
                  </button>
                  <button className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary/90">
                    Medium
                  </button>
                  <button className="bg-primary text-white px-5 py-3 text-lg rounded-md hover:bg-primary/90">
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
                  <label className="block text-sm font-medium text-gray-700">Email</label>
                  <input 
                    type="email" 
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                    placeholder="Enter your email"
                  />
                </div>
              </ComponentPreview>
              
              <ComponentPreview 
                title="Select" 
                description="Dropdown selection component."
              >
                <div className="max-w-md space-y-2">
                  <label className="block text-sm font-medium text-gray-700" id="country-label">Country</label>
                  <select
                    aria-labelledby="country-label"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
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
                  <div className="bg-success/10 border-l-4 border-success p-4 rounded">
                    <div className="flex">
                      <div className="flex-shrink-0">
                        <svg className="h-5 w-5 text-success" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div className="ml-3">
                        <p className="text-success text-sm font-medium">Successfully saved changes</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-error/10 border-l-4 border-error p-4 rounded">
                    <div className="flex">
                      <div className="flex-shrink-0">
                        <svg className="h-5 w-5 text-error" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div className="ml-3">
                        <p className="text-error text-sm font-medium">There was an error processing your request</p>
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
                <div className="border-b border-gray-200">
                  <nav className="-mb-px flex space-x-8">
                    <a href="#" className="border-primary text-primary border-b-2 py-2 px-1 text-sm font-medium">
                      Overview
                    </a>
                    <a href="#" className="border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 border-b-2 py-2 px-1 text-sm font-medium">
                      Settings
                    </a>
                    <a href="#" className="border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 border-b-2 py-2 px-1 text-sm font-medium">
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
                  <div className="h-24 bg-white rounded-md shadow-sm flex items-center justify-center">
                    <span className="text-gray-500 text-sm">shadow-sm</span>
                  </div>
                  <div className="h-24 bg-white rounded-md shadow flex items-center justify-center">
                    <span className="text-gray-500 text-sm">shadow</span>
                  </div>
                  <div className="h-24 bg-white rounded-md shadow-md flex items-center justify-center">
                    <span className="text-gray-500 text-sm">shadow-md</span>
                  </div>
                  <div className="h-24 bg-white rounded-md shadow-lg flex items-center justify-center">
                    <span className="text-gray-500 text-sm">shadow-lg</span>
                  </div>
                </div>
              </ComponentPreview>
            </Section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DesignSystemDocsPage; 