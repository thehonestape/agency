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

// Define section type
interface Section {
  id: string;
  title: string;
}

export const DesignSystemDocs = () => {
  const [activeSection, setActiveSection] = useState('intro');
  const [currentTheme, setCurrentTheme] = useState('blue-light');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});

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

  // Toggle theme function
  const toggleTheme = (theme: string) => {
    // First remove transition class if exists
    document.documentElement.classList.remove('transition-ready');
    
    // Save theme preference to localStorage 
    localStorage.setItem('theme', theme);
    
    // Apply theme directly to document
    document.documentElement.dataset.theme = theme;
    setCurrentTheme(theme);
    
    // Update dark mode class and state
    const isDark = theme.includes('-dark');
    setIsDarkMode(isDark);
    
    if (isDark) {
      document.documentElement.classList.add('dark');
      
      // Apply specific dark theme colors
      if (theme === 'blue-dark') {
        document.body.style.backgroundColor = 'rgb(15 23 42)';
        document.body.style.color = 'rgb(248 250 252)';
      } else if (theme === 'green-dark') {
        document.body.style.backgroundColor = 'rgb(2 44 34)';
        document.body.style.color = 'rgb(240 253 250)';
      } else if (theme === 'zinc-dark') {
        document.body.style.backgroundColor = 'rgb(24 24 27)';
        document.body.style.color = 'rgb(244 244 245)';
      }
    } else {
      document.documentElement.classList.remove('dark');
      document.body.style.backgroundColor = 'rgb(255 255 255)';
      document.body.style.color = 'rgb(15 23 42)';
    }
    
    // Force immediate update with DOM manipulation
    document.body.style.display = 'none';
    
    setTimeout(() => {
      // Make body visible again and force reflow
      document.body.style.display = '';
      void document.body.offsetHeight;
      
      requestAnimationFrame(() => {
        // Re-enable background/border transitions but keep color instant
        document.documentElement.classList.add('transition-ready');
      });
    }, 5);
    
    // Log theme change to confirm
    console.log(`Theme changed to: ${theme}`);
  };

  // Toggle between light and dark mode while preserving theme family
  const toggleDarkMode = () => {
    const themeFamily = currentTheme.split('-')[0]; // Extract blue, green, or zinc
    const newTheme = isDarkMode ? `${themeFamily}-light` : `${themeFamily}-dark`;
    toggleTheme(newTheme);
  };

  // Set initial theme on mount
  useEffect(() => {
    // Check if there's already a theme set
    const currentDataTheme = document.documentElement.dataset.theme;
    // Get from localStorage or default to the current data-theme
    const savedTheme = localStorage.getItem('theme') || currentDataTheme || 'blue-light';
    
    if (savedTheme) {
      setCurrentTheme(savedTheme);
      setIsDarkMode(savedTheme.includes('-dark'));
      
      // Make sure theme matches what's set in localStorage
      if (currentDataTheme !== savedTheme) {
        document.documentElement.dataset.theme = savedTheme;
      }
      
      // Ensure dark mode class is correct
      if (savedTheme.includes('-dark')) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
      
      console.log(`Using theme: ${savedTheme}`);
    }
  }, []);
  
  // Handle theme family change
  const handleThemeChange = (value: string) => {
    const newTheme = `${value}-${isDarkMode ? 'dark' : 'light'}`;
    toggleTheme(newTheme);
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
                  value={currentTheme.split('-')[0]} 
                  onValueChange={handleThemeChange}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a theme" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="blue">Blue</SelectItem>
                    <SelectItem value="green">Green</SelectItem>
                    <SelectItem value="zinc">Zinc</SelectItem>
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

            {/* Typography Section (now second) */}
            <section id="typography" className="pt-4 pb-16 scroll-mt-20">
              <h2 className="text-3xl font-bold mb-8">Typography</h2>
              
              <div className="space-y-16">
                <div>
                  <h3 className="text-xl font-semibold mb-6">Font Family</h3>
                  <div className="space-y-6 border border-border rounded-lg p-6">
                    <div>
                      <p className="font-sans text-2xl">Maison Neue (Sans-Serif)</p>
                      <div className="text-sm text-muted-foreground mt-1">font-sans (--font-maison-neue)</div>
                      <div className="mt-4 space-y-2">
                        <p className="font-sans font-normal">Normal 400: The quick brown fox jumps over the lazy dog</p>
                        <p className="font-sans font-medium">Medium 500: The quick brown fox jumps over the lazy dog</p>
                        <p className="font-sans font-bold">Bold 700: The quick brown fox jumps over the lazy dog</p>
                      </div>
                    </div>
                    
                    <div className="pt-4 border-t border-border">
                      <p className="font-mono text-2xl">Maison Neue Mono (Monospace)</p>
                      <div className="text-sm text-muted-foreground mt-1">font-mono (--font-maison-neue-mono)</div>
                      <div className="mt-4 space-y-2">
                        <p className="font-mono font-normal">Normal 400: The quick brown fox jumps over the lazy dog</p>
                        <p className="font-mono font-bold">Bold 700: The quick brown fox jumps over the lazy dog</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-6">Headings</h3>
                  <div className="space-y-6 border border-border rounded-lg p-6">
                    <div>
                      <h1 className="text-4xl font-bold">Heading 1</h1>
                      <div className="text-sm text-muted-foreground mt-1">text-4xl font-bold</div>
                    </div>
                    <div>
                      <h2 className="text-3xl font-bold">Heading 2</h2>
                      <div className="text-sm text-muted-foreground mt-1">text-3xl font-bold</div>
                    </div>
                    <div>
                      <h3 className="text-2xl font-semibold">Heading 3</h3>
                      <div className="text-sm text-muted-foreground mt-1">text-2xl font-semibold</div>
                    </div>
                    <div>
                      <h4 className="text-xl font-semibold">Heading 4</h4>
                      <div className="text-sm text-muted-foreground mt-1">text-xl font-semibold</div>
                    </div>
                    <div>
                      <h5 className="text-lg font-medium">Heading 5</h5>
                      <div className="text-sm text-muted-foreground mt-1">text-lg font-medium</div>
                    </div>
                    <div>
                      <h6 className="text-base font-medium">Heading 6</h6>
                      <div className="text-sm text-muted-foreground mt-1">text-base font-medium</div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold mb-6">Fluid Typography</h3>
                  <div className="space-y-6 border border-border rounded-lg p-6">
                    <div>
                      <p className="text-fluid-8xl font-bold">Fluid 8XL</p>
                      <div className="text-sm text-muted-foreground mt-1">text-fluid-8xl</div>
                    </div>
                    <div>
                      <p className="text-fluid-6xl font-bold">Fluid 6XL</p>
                      <div className="text-sm text-muted-foreground mt-1">text-fluid-6xl</div>
                    </div>
                    <div>
                      <p className="text-fluid-4xl font-bold">Fluid 4XL</p>
                      <div className="text-sm text-muted-foreground mt-1">text-fluid-4xl</div>
                    </div>
                    <div>
                      <p className="text-fluid-2xl font-semibold">Fluid 2XL</p>
                      <div className="text-sm text-muted-foreground mt-1">text-fluid-2xl</div>
                    </div>
                    <div>
                      <p className="text-fluid-lg">Fluid LG</p>
                      <div className="text-sm text-muted-foreground mt-1">text-fluid-lg</div>
                    </div>
                    <div>
                      <p className="text-fluid-base">Fluid Base</p>
                      <div className="text-sm text-muted-foreground mt-1">text-fluid-base</div>
                    </div>
                    <div>
                      <p className="text-fluid-sm">Fluid SM</p>
                      <div className="text-sm text-muted-foreground mt-1">text-fluid-sm</div>
                    </div>
                    <div>
                      <p className="text-fluid-xs">Fluid XS</p>
                      <div className="text-sm text-muted-foreground mt-1">text-fluid-xs</div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-6">Subheadings & Auxiliary Text</h3>
                  <div className="space-y-6 border border-border rounded-lg p-6">
                    <div>
                      <p className="text-xl text-muted-foreground">Large Subheading</p>
                      <div className="text-sm text-muted-foreground mt-1">text-xl text-muted-foreground</div>
                    </div>
                    <div>
                      <p className="text-lg text-muted-foreground">Medium Subheading</p>
                      <div className="text-sm text-muted-foreground mt-1">text-lg text-muted-foreground</div>
                    </div>
                    <div>
                      <p className="text-base text-muted-foreground">Default Subheading</p>
                      <div className="text-sm text-muted-foreground mt-1">text-base text-muted-foreground</div>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Small Subheading</p>
                      <div className="text-sm text-muted-foreground mt-1">text-sm text-muted-foreground</div>
                    </div>
                    <div className="pt-6 border-t border-border">
                      <p className="text-base"><span className="text-muted-foreground">Helper Text: </span>Provides additional context to the user</p>
                      <div className="text-sm text-muted-foreground mt-1">text-muted-foreground</div>
                    </div>
                    <div>
                      <p className="text-sm italic text-muted-foreground">Caption Text</p>
                      <div className="text-sm text-muted-foreground mt-1">text-sm italic text-muted-foreground</div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-6">Text Spacing & Layout</h3>
                  <div className="space-y-8 border border-border rounded-lg p-6">
                    <div>
                      <h4 className="text-base font-medium mb-4">Paragraph with Default Spacing</h4>
                      <div className="space-y-4">
                        <p>This is a paragraph with default spacing. Notice how the space between this paragraph and the next one helps to create visual separation and improves readability.</p>
                        <p>This second paragraph demonstrates the standard vertical spacing. Good typography relies not just on font choices, but also on the space between elements.</p>
                      </div>
                      <div className="text-sm text-muted-foreground mt-2">space-y-4</div>
                    </div>
                    
                    <div className="pt-4 border-t border-border">
                      <h4 className="text-base font-medium mb-4">Tight Spacing</h4>
                      <div className="space-y-2">
                        <p>This paragraph uses tight spacing with other elements.</p>
                        <p>Notice how the reduced vertical gap creates a more compact feel that might be suitable for certain contexts like lists or card content.</p>
                      </div>
                      <div className="text-sm text-muted-foreground mt-2">space-y-2</div>
                    </div>
                    
                    <div className="pt-4 border-t border-border">
                      <h4 className="text-base font-medium mb-4">Loose Spacing</h4>
                      <div className="space-y-8">
                        <p>This paragraph uses loose spacing with other elements.</p>
                        <p>The increased vertical gap creates greater visual separation, which can be helpful for distinguishing between different sections or concepts.</p>
                      </div>
                      <div className="text-sm text-muted-foreground mt-2">space-y-8</div>
                    </div>
                    
                    <div className="pt-4 border-t border-border">
                      <h4 className="text-base font-medium mb-4">Text Block Spacing</h4>
                      <div>
                        <div className="mb-6">
                          <h5 className="text-lg font-medium mb-2">Section Title</h5>
                          <p>This demonstrates the spacing between a heading and its content. Notice how this margin provides enough space to associate the title with its content while still maintaining clear separation.</p>
                        </div>
                        <div className="mb-6">
                          <h5 className="text-lg font-medium mb-2">Another Section</h5>
                          <p>The spacing between this section and the previous one shows how we establish hierarchy and organization in text-heavy layouts.</p>
                        </div>
                      </div>
                      <div className="text-sm text-muted-foreground mt-2">mb-6 for sections, mb-2 for headings</div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-6">Font Weights</h3>
                  <div className="space-y-6 border border-border rounded-lg p-6">
                    <div>
                      <p className="text-xl font-light">Light Weight (300)</p>
                      <div className="text-sm text-muted-foreground mt-1">font-light</div>
                    </div>
                    <div>
                      <p className="text-xl font-normal">Regular Weight (400)</p>
                      <div className="text-sm text-muted-foreground mt-1">font-normal</div>
                    </div>
                    <div>
                      <p className="text-xl font-medium">Medium Weight (500)</p>
                      <div className="text-sm text-muted-foreground mt-1">font-medium</div>
                    </div>
                    <div>
                      <p className="text-xl font-semibold">Semibold Weight (600)</p>
                      <div className="text-sm text-muted-foreground mt-1">font-semibold</div>
                    </div>
                    <div>
                      <p className="text-xl font-bold">Bold Weight (700)</p>
                      <div className="text-sm text-muted-foreground mt-1">font-bold</div>
                    </div>
                    <div>
                      <p className="text-xl font-extrabold">Extrabold Weight (800)</p>
                      <div className="text-sm text-muted-foreground mt-1">font-extrabold</div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-6">Text Styles</h3>
                  <div className="space-y-6 border border-border rounded-lg p-6">
                    <div>
                      <p className="text-lg font-medium">Large / Medium</p>
                      <div className="text-sm text-muted-foreground mt-1">text-lg font-medium</div>
                    </div>
                    <div>
                      <p className="text-lg">Large / Regular</p>
                      <div className="text-sm text-muted-foreground mt-1">text-lg</div>
                    </div>
                    <div>
                      <p className="text-base font-medium">Body / Medium</p>
                      <div className="text-sm text-muted-foreground mt-1">text-base font-medium</div>
                    </div>
                    <div>
                      <p>Body / Regular: The quick brown fox jumps over the lazy dog.</p>
                      <div className="text-sm text-muted-foreground mt-1">Default body text</div>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Small / Medium</p>
                      <div className="text-sm text-muted-foreground mt-1">text-sm font-medium</div>
                    </div>
                    <div>
                      <p className="text-sm">Small / Regular: The quick brown fox jumps over the lazy dog.</p>
                      <div className="text-sm text-muted-foreground mt-1">text-sm</div>
                    </div>
                    <div>
                      <p className="text-xs font-medium">XSmall / Medium</p>
                      <div className="text-sm text-muted-foreground mt-1">text-xs font-medium</div>
                    </div>
                    <div>
                      <p className="text-xs">XSmall / Regular: The quick brown fox jumps over the lazy dog.</p>
                      <div className="text-sm text-muted-foreground mt-1">text-xs</div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold mb-6">Line Heights</h3>
                  <div className="space-y-6 border border-border rounded-lg p-6">
                    <div>
                      <p className="text-lg leading-fluid-tight bg-muted/30 p-4 rounded-md">
                        The quick brown fox jumps over the lazy dog. This text uses leading-fluid-tight which adjusts from 1.1 to 1.3 based on viewport width.
                        <br />Resize your browser to see line height adjust.
                      </p>
                      <div className="text-sm text-muted-foreground mt-1">leading-fluid-tight</div>
                    </div>
                    <div>
                      <p className="text-lg leading-fluid-normal bg-muted/30 p-4 rounded-md">
                        The quick brown fox jumps over the lazy dog. This text uses leading-fluid-normal which adjusts from 1.4 to 1.5 based on viewport width.
                        <br />Resize your browser to see line height adjust.
                      </p>
                      <div className="text-sm text-muted-foreground mt-1">leading-fluid-normal</div>
                    </div>
                    <div>
                      <p className="text-lg leading-fluid-loose bg-muted/30 p-4 rounded-md">
                        The quick brown fox jumps over the lazy dog. This text uses leading-fluid-loose which adjusts from 1.75 to 2 based on viewport width.
                        <br />Resize your browser to see line height adjust.
                      </p>
                      <div className="text-sm text-muted-foreground mt-1">leading-fluid-loose</div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-6">Text Utilities</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 border border-border rounded-lg p-6">
                    <div className="space-y-4">
                      <div>
                        <p className="underline">Underlined Text</p>
                        <div className="text-sm text-muted-foreground mt-1">underline</div>
                      </div>
                      <div>
                        <p className="line-through">Strikethrough Text</p>
                        <div className="text-sm text-muted-foreground mt-1">line-through</div>
                      </div>
                      <div>
                        <p className="italic">Italic Text</p>
                        <div className="text-sm text-muted-foreground mt-1">italic</div>
                      </div>
                      <div>
                        <p className="uppercase">Uppercase Text</p>
                        <div className="text-sm text-muted-foreground mt-1">uppercase</div>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div>
                        <p className="lowercase">Lowercase Text</p>
                        <div className="text-sm text-muted-foreground mt-1">lowercase</div>
                      </div>
                      <div>
                        <p className="capitalize">capitalized text</p>
                        <div className="text-sm text-muted-foreground mt-1">capitalize</div>
                      </div>
                      <div>
                        <p className="truncate max-w-xs">This is a very long text that will be truncated when it exceeds the available width using the truncate utility class from Tailwind CSS</p>
                        <div className="text-sm text-muted-foreground mt-1">truncate</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Colors Section */}
            <section id="colors" className="pt-4 pb-16 scroll-mt-20">
              <h2 className="text-3xl font-bold mb-8">Colors</h2>
              
              <div className="space-y-16">
                <div>
                  <h3 className="text-xl font-semibold mb-6">Primary Colors</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
                    {[50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950].map((shade) => (
                      <div key={`primary-${shade}`} className="space-y-2">
                        <div 
                          className="h-16 rounded-md"
                          style={{ backgroundColor: `var(--primary-${shade})` }}
                        />
                        <div className="text-sm">
                          <div className="font-medium">Primary {shade}</div>
                          <div className="text-muted-foreground">var(--primary-{shade})</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-6">Secondary Colors</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
                    {[50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950].map((shade) => (
                      <div key={`secondary-${shade}`} className="space-y-2">
                        <div 
                          className="h-16 rounded-md"
                          style={{ backgroundColor: `var(--secondary-${shade})` }}
                        />
                        <div className="text-sm">
                          <div className="font-medium">Secondary {shade}</div>
                          <div className="text-muted-foreground">var(--secondary-{shade})</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-6">Accent Colors</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
                    {[50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950].map((shade) => (
                      <div key={`accent-${shade}`} className="space-y-2">
                        <div 
                          className="h-16 rounded-md"
                          style={{ backgroundColor: `var(--accent-${shade})` }}
                        />
                        <div className="text-sm">
                          <div className="font-medium">Accent {shade}</div>
                          <div className="text-muted-foreground">var(--accent-{shade})</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold mb-6">UI Colors</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {[
                      { name: 'Background', variable: '--background' },
                      { name: 'Foreground', variable: '--foreground' },
                      { name: 'Card', variable: '--card' },
                      { name: 'Card Foreground', variable: '--card-foreground' },
                      { name: 'Border', variable: '--border' },
                      { name: 'Input', variable: '--input' },
                      { name: 'Ring', variable: '--ring' },
                      { name: 'Muted', variable: '--muted' },
                      { name: 'Muted Foreground', variable: '--muted-foreground' },
                    ].map((color) => (
                      <div key={color.variable} className="p-4 border border-border rounded-md flex items-center gap-3">
                        <div 
                          className="h-8 w-8 rounded-full border border-border"
                          style={{ backgroundColor: `var(${color.variable})` }}
                        />
                        <div>
                          <div className="font-medium">{color.name}</div>
                          <div className="text-sm text-muted-foreground">var({color.variable})</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold mb-6">State Colors</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                    {[
                      { name: 'Success', variable: '--success' },
                      { name: 'Warning', variable: '--warning' },
                      { name: 'Destructive', variable: '--destructive' },
                      { name: 'Info', variable: '--info' },
                    ].map((color) => (
                      <Card key={color.variable}>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-base">{color.name}</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-2">
                            <div 
                              className="h-10 rounded-md"
                              style={{ backgroundColor: `var(${color.variable})` }}
                            />
                            <div className="text-xs font-mono text-muted-foreground">
                              var({color.variable})
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </div>
            </section>
            
            {/* Components Section */}
            <section id="components" className="pt-4 pb-16 scroll-mt-20">
              <h2 className="text-3xl font-bold mb-8">Components</h2>
              
              <div className="space-y-16">
                <div>
                  <h3 className="text-xl font-semibold mb-6">Buttons</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <Card>
                      <CardHeader>
                        <CardTitle>Button Variants</CardTitle>
                        <CardDescription>Different styles for different contexts</CardDescription>
                      </CardHeader>
                      <CardContent className="flex flex-wrap gap-3">
                        <Button>Default</Button>
                        <Button variant="secondary">Secondary</Button>
                        <Button variant="outline">Outline</Button>
                        <Button variant="ghost">Ghost</Button>
                        <Button variant="link">Link</Button>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardHeader>
                        <CardTitle>Button Sizes</CardTitle>
                        <CardDescription>Sizing options for various uses</CardDescription>
                      </CardHeader>
                      <CardContent className="flex flex-wrap items-center gap-3">
                        <Button size="sm">Small</Button>
                        <Button>Default</Button>
                        <Button size="lg">Large</Button>
                      </CardContent>
                    </Card>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold mb-6">Cards</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    <Card>
                      <CardHeader>
                        <CardTitle>Card Title</CardTitle>
                        <CardDescription>This is a basic card component with a header and content.</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p>Cards are versatile containers that help group related information and actions.</p>
                      </CardContent>
                    </Card>
                    
                    <Card className="border-primary">
                      <CardHeader className="pb-2">
                        <CardTitle>Featured Card</CardTitle>
                        <CardDescription>With primary border styling</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p>You can customize cards with different border colors and styles.</p>
                      </CardContent>
                    </Card>
                    
                    <Card className="bg-muted">
                      <CardHeader className="pb-2">
                        <CardTitle>Muted Card</CardTitle>
                        <CardDescription>With background styling</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p>Apply background colors to create different card styles.</p>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </div>
            </section>
            
            {/* Layout Section */}
            <section id="layout" className="pt-4 pb-16 scroll-mt-20">
              <h2 className="text-3xl font-bold mb-8">Layout & Spacing</h2>
              
              <div className="space-y-16">
                <div>
                  <h3 className="text-xl font-semibold mb-6">Spacing Scale</h3>
                  <div className="border border-border rounded-lg p-6 space-y-3">
                    {[0, 1, 2, 3, 4, 5, 6, 8, 10, 12, 16, 20].map((size) => (
                      <div key={size} className="flex items-center">
                        <div className="w-16 text-sm">p-{size}</div>
                        <div 
                          className="h-6 bg-primary/20" 
                          style={{ width: `${size * 0.25}rem` }}
                        ></div>
                        <div className="ml-4 text-sm text-muted-foreground">{size * 0.25}rem</div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold mb-6">Border Radius</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6">
                    {['sm', 'md', 'lg', 'xl', '2xl'].map((size) => (
                      <div key={size} className="text-center">
                        <div 
                          className="h-16 w-16 bg-primary mx-auto mb-2"
                          style={{ borderRadius: `var(--radius-${size})` }}
                        ></div>
                        <div className="text-sm font-medium">radius-{size}</div>
                        <div className="text-xs text-muted-foreground">var(--radius-{size})</div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold mb-6">Grid System</h3>
                  <div className="space-y-6">
                    <div>
                      <div className="text-sm font-medium mb-2">1 Column</div>
                      <div className="grid grid-cols-1 gap-4">
                        <div className="bg-muted p-4 text-center rounded-md">1</div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="text-sm font-medium mb-2">2 Columns</div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-muted p-4 text-center rounded-md">1</div>
                        <div className="bg-muted p-4 text-center rounded-md">2</div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="text-sm font-medium mb-2">3 Columns</div>
                      <div className="grid grid-cols-3 gap-4">
                        <div className="bg-muted p-4 text-center rounded-md">1</div>
                        <div className="bg-muted p-4 text-center rounded-md">2</div>
                        <div className="bg-muted p-4 text-center rounded-md">3</div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="text-sm font-medium mb-2">4 Columns</div>
                      <div className="grid grid-cols-4 gap-4">
                        <div className="bg-muted p-4 text-center rounded-md">1</div>
                        <div className="bg-muted p-4 text-center rounded-md">2</div>
                        <div className="bg-muted p-4 text-center rounded-md">3</div>
                        <div className="bg-muted p-4 text-center rounded-md">4</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Theme Variations Section */}
            <section id="themes" className="pt-4 pb-16 scroll-mt-20">
              <h2 className="text-3xl font-bold mb-8">Theme Variations</h2>
              
              <div className="space-y-16">
                <div>
                  <h3 className="text-xl font-semibold mb-6">Theme Switcher</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {[
                      { name: 'Blue Light', value: 'blue-light', bg: 'bg-white', text: 'text-gray-900' },
                      { name: 'Blue Dark', value: 'blue-dark', bg: 'bg-gray-900', text: 'text-white' },
                      { name: 'Green Light', value: 'green-light', bg: 'bg-white', text: 'text-gray-900' },
                      { name: 'Green Dark', value: 'green-dark', bg: 'bg-gray-900', text: 'text-white' },
                      { name: 'Zinc Light', value: 'zinc-light', bg: 'bg-white', text: 'text-gray-900' },
                      { name: 'Zinc Dark', value: 'zinc-dark', bg: 'bg-gray-900', text: 'text-white' },
                    ].map((theme) => (
                      <button
                        key={theme.value}
                        type="button"
                        onClick={(e) => {
                          e.preventDefault();
                          toggleTheme(theme.value);
                        }}
                        className={`p-4 rounded-lg border ${
                          currentTheme === theme.value 
                            ? 'border-primary ring-2 ring-primary/20' 
                            : 'border-border hover:border-primary/50'
                        } transition-all ${theme.bg} ${theme.text}`}
                        style={{
                          background: theme.value.includes('-dark') ? 
                            'rgb(15 23 42)' : 'rgb(255 255 255)',
                          color: theme.value.includes('-dark') ? 
                            'rgb(248 250 252)' : 'rgb(15 23 42)'
                        }}
                      >
                        <div className="text-lg font-medium">{theme.name}</div>
                        <div className="text-sm opacity-70">
                          {currentTheme === theme.value ? 'Active' : 'Click to activate'}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-6">Theme Demo</h3>
                  <div className="border border-border rounded-lg p-6 space-y-6">
                    <div>
                      <p className="mb-2">Current theme: <span className="font-semibold">{currentTheme}</span></p>
                      <p className="text-sm text-muted-foreground">The theme affects all UI components and colors throughout the application.</p>
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