import React, { useState, useEffect, useRef } from 'react';
import {
  Button,
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
  Switch,
} from '../components/ui';
import { useTheme } from '../lib/theme-context';
import { themeRegistry } from '../lib/theme-registry';
import { registerAllThemes } from '../lib/theme-adapters/register-all-themes';

// Define section type
interface Section {
  id: string;
  title: string;
}

export const DesignSystemDocs = () => {
  const { currentThemeId, setCurrentThemeId, availableThemes, isDarkMode, toggleDarkMode } = useTheme();
  const [activeSection, setActiveSection] = useState('intro');
  const [themeChanged, setThemeChanged] = useState(0);
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});

  // Ensure all themes are registered
  useEffect(() => {
    registerAllThemes();
  }, []);

  // Update theme changed counter when theme changes
  useEffect(() => {
    setThemeChanged(prev => prev + 1);
  }, [currentThemeId, isDarkMode]);

  // Define sections with introduction first
  const sections: Section[] = [
    { id: 'intro', title: 'Introduction' },
    { id: 'typography', title: 'Typography' },
    { id: 'colors', title: 'Colors' },
    { id: 'components', title: 'Components' },
    { id: 'layout', title: 'Layout & Spacing' },
    { id: 'themes', title: 'Theme Variations' },
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
      { rootMargin: '-100px 0px -60% 0px' }
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
        behavior: 'smooth',
      });
      setActiveSection(sectionId);
    }
  };

  // Function to handle theme change
  const handleThemeChange = (themeId: string) => {
    setCurrentThemeId(themeId);
    // Force select components to rerender after a short delay
    setTimeout(() => {
      setThemeChanged(prev => prev + 1);
    }, 100);
  };

  return (
    <div className="bg-background text-foreground min-h-screen">
      <header className="border-b border-border sticky top-0 z-10 bg-background">
        <div className="container mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold">Design System</h1>
        </div>
      </header>

      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row">
          {/* Sidebar Navigation */}
          <div className="w-64 lg:fixed top-20 h-[calc(100vh-80px)] overflow-auto py-8 pr-4 hidden lg:block">
            {/* Theme Controls Box */}
            <div className="border border-border rounded-md p-4 mb-6 bg-card">
              <h3 className="text-sm font-medium mb-3">Theme Settings</h3>
              
              {/* Row 1: Light/Dark Toggle */}
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm">Mode</span>
                <div className="flex items-center space-x-2">
                  <span className="text-xs text-muted-foreground">Light</span>
                  <Switch 
                    checked={isDarkMode} 
                    onCheckedChange={toggleDarkMode} 
                    aria-label="Toggle dark mode"
                  />
                  <span className="text-xs text-muted-foreground">Dark</span>
                </div>
              </div>
              
              {/* Row 2: Theme Family Selector */}
              <div>
                <Select 
                  value={currentThemeId} 
                  onValueChange={handleThemeChange}
                  key={`theme-selector-${themeChanged}`}
                >
                  <SelectTrigger className="w-full" data-theme-refreshable>
                    <SelectValue placeholder="Select a theme" />
                  </SelectTrigger>
                  <SelectContent data-theme-refreshable>
                    {availableThemes.map(theme => (
                      <SelectItem key={`${theme.metadata.id}-${themeChanged}`} value={theme.metadata.id} data-theme-refreshable>
                        {theme.metadata.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            {/* Section Navigation */}
            <nav className="space-y-1">
              {sections.map((section) => (
                <a
                  key={section.id}
                  href={`#${section.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(section.id);
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

          {/* Main Content */}
          <main className="lg:ml-64 lg:flex-1 pt-8 pb-16">
            {/* Introduction Section */}
            <section id="intro" className="pt-4 pb-16 scroll-mt-20">
              <h2 className="text-3xl font-bold mb-8">Introduction</h2>
              
              <div className="space-y-8">
                <div className="prose prose-slate dark:prose-invert max-w-none">
                  <h3 className="text-xl font-semibold mb-4">Design Philosophy</h3>
                  <p className="text-lg mb-4">
                    Our design system is built on the principles of clarity, consistency, and accessibility. We believe in creating experiences that feel 
                    intuitive and familiar while maintaining a unique brand identity that sets us apart.
                  </p>
                  <p className="mb-6">
                    The components, patterns, and guidelines in this design system are crafted to work together harmoniously, 
                    creating a cohesive user experience across all our products. Each element has been carefully considered 
                    to serve a specific purpose, with accessibility and usability at the forefront of our decision-making.
                  </p>
                  
                  <div className="grid md:grid-cols-3 gap-6 my-8">
                    <Card>
                      <CardHeader>
                        <CardTitle>Clarity</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p>Users should understand what they're looking at and how to use it without unnecessary cognitive load.</p>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardHeader>
                        <CardTitle>Consistency</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p>Elements that function similarly should look and behave the same way throughout the application.</p>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardHeader>
                        <CardTitle>Accessibility</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p>Our interfaces should be usable by everyone, regardless of abilities or circumstances.</p>
                      </CardContent>
                    </Card>
                  </div>
                  
                  <h3 className="text-xl font-semibold mb-4">How to Use This System</h3>
                  <p className="mb-4">
                    This documentation serves as a comprehensive guide to our design language. It provides designers 
                    and developers with the tools they need to create consistent, accessible, and beautiful user interfaces.
                  </p>
                  <p>
                    Navigate through the sections to explore our typography, color palette, UI components, and layout 
                    guidelines. Each section includes practical examples and code snippets to help you implement the design system effectively.
                  </p>
                </div>
              </div>
            </section>

            {/* Theme Variations Section */}
            <section id="themes" className="pt-4 pb-16 scroll-mt-20">
              <h2 className="text-3xl font-bold mb-8">Theme Variations</h2>
              
              <div className="space-y-16">
                <div>
                  <h3 className="text-xl font-semibold mb-6">Available Themes</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {availableThemes.map((theme) => (
                      <button
                        key={`theme-button-${theme.metadata.id}-${themeChanged}`}
                        onClick={() => handleThemeChange(theme.metadata.id)}
                        className={`p-4 text-left rounded-lg border transition-all ${
                          currentThemeId === theme.metadata.id
                            ? 'border-primary bg-primary/5 shadow-sm'
                            : 'border-border hover:border-primary/50 hover:bg-background'
                        }`}
                      >
                        <div className="font-medium mb-1">{theme.metadata.name}</div>
                        <div className="text-sm text-muted-foreground">{theme.metadata.description}</div>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-6">Theme Demo</h3>
                  <div className="border border-border rounded-lg p-6 space-y-6">
                    <div>
                      <p className="mb-2">Current theme: <span className="font-semibold">{currentThemeId}</span></p>
                      <p className="text-sm text-muted-foreground">
                        {availableThemes.find(theme => theme.metadata.id === currentThemeId)?.metadata.description}
                      </p>
                    </div>
                    <div className="flex flex-wrap gap-4">
                      <Button>Primary Button</Button>
                      <Button variant="secondary">Secondary Button</Button>
                      <Button variant="outline">Outline Button</Button>
                      <Button variant="ghost">Ghost Button</Button>
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-4">
                      <Card>
                        <CardHeader>
                          <CardTitle>Card Example</CardTitle>
                          <CardDescription>This card shows themed components.</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <p>This content demonstrates the current theme's foreground and background colors.</p>
                        </CardContent>
                      </Card>
                      
                      <div className="bg-muted p-4 rounded-lg">
                        <h4 className="text-lg font-medium mb-2">Muted Background</h4>
                        <p className="text-muted-foreground">This shows the muted background with muted foreground text.</p>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
                      <div className="flex flex-col items-center">
                        <div className="w-12 h-12 rounded-full bg-primary"></div>
                        <div className="text-xs mt-2">Primary</div>
                      </div>
                      <div className="flex flex-col items-center">
                        <div className="w-12 h-12 rounded-full bg-secondary"></div>
                        <div className="text-xs mt-2">Secondary</div>
                      </div>
                      <div className="flex flex-col items-center">
                        <div className="w-12 h-12 rounded-full bg-accent"></div>
                        <div className="text-xs mt-2">Accent</div>
                      </div>
                      <div className="flex flex-col items-center">
                        <div className="w-12 h-12 rounded-full bg-muted"></div>
                        <div className="text-xs mt-2">Muted</div>
                      </div>
                      <div className="flex flex-col items-center">
                        <div className="w-12 h-12 rounded-full bg-destructive"></div>
                        <div className="text-xs mt-2">Destructive</div>
                      </div>
                      <div className="flex flex-col items-center">
                        <div className="w-12 h-12 rounded-full border border-border"></div>
                        <div className="text-xs mt-2">Border</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </main>
        </div>
      </div>
    </div>
  );
}; 