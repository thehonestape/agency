import React, { useState, useEffect, lazy, Suspense } from 'react';
import { useTheme } from '../lib/theme-context';
import { Button } from '../components/adaptable/Button';
import { Card } from '../components/adaptable/Card';
import { ThemeCategory } from '../lib/theme-registry';

// Define theme types
type ThemeName = string;

// Mock components that match the style of the theme but don't require actual imports
const createMockComponent = (themeId: string, componentName: string) => {
  // Get theme-specific colors - these would ideally come from the theme itself
  const getThemeColors = () => {
    switch (themeId) {
      case 'protocol':
        return { primary: '#0ea5e9', accent: '#0369a1', text: '#0f172a', muted: '#64748b' };
      case 'salient':
        return { primary: '#2563eb', accent: '#3b82f6', text: '#111827', muted: '#6b7280' };
      case 'studio':
        return { primary: '#000000', accent: '#404040', text: '#171717', muted: '#737373' };
      case 'radiant':
        return { primary: '#8b5cf6', accent: '#a78bfa', text: '#1e1b4b', muted: '#7e7bc9' };
      case 'commit':
        return { primary: '#10b981', accent: '#34d399', text: '#064e3b', muted: '#6ee7b7' };
      case 'keynote':
        return { primary: '#f59e0b', accent: '#fbbf24', text: '#78350f', muted: '#fcd34d' };
      case 'pocket':
        return { primary: '#ef4444', accent: '#f87171', text: '#7f1d1d', muted: '#fca5a5' };
      case 'primer':
        return { primary: '#3b82f6', accent: '#60a5fa', text: '#1e3a8a', muted: '#93c5fd' };
      case 'syntax':
        return { primary: '#3b82f6', accent: '#10b981', text: '#0f172a', muted: '#94a3b8' };
      case 'transmit':
        return { primary: '#6366f1', accent: '#f472b6', text: '#312e81', muted: '#a5b4fc' };
      default:
        return { primary: '#3b82f6', accent: '#60a5fa', text: '#111827', muted: '#9ca3af' };
    }
  };

  const colors = getThemeColors();

  // Common mockup elements
  const MockButton = ({ variant = "primary", className = "", children = "Button" }: { variant?: string, className?: string, children?: React.ReactNode }) => (
    <button 
      className={`px-4 py-2 rounded-md inline-flex items-center justify-center transition-colors ${
        variant === "primary" 
          ? `bg-[${colors.primary}] text-white hover:opacity-90` 
          : `bg-white text-[${colors.text}] border border-gray-200 hover:bg-gray-50`
      } ${className}`}
      style={{ 
        backgroundColor: variant === "primary" ? colors.primary : "white",
        color: variant === "primary" ? "white" : colors.text,
      }}
    >
      {children}
    </button>
  );

  const MockHeading = ({ children = "Heading", level = 2 }: { children?: React.ReactNode, level?: number }) => {
    const Component = `h${level}` as keyof JSX.IntrinsicElements;
    const fontSize = level === 1 ? "text-4xl" : level === 2 ? "text-2xl" : level === 3 ? "text-xl" : "text-lg";
    
    return (
      <Component className={`${fontSize} font-bold mb-4`} style={{ color: colors.text }}>
        {children}
      </Component>
    );
  };

  const MockParagraph = ({ children = "This is placeholder text for the mockup component." }: { children?: React.ReactNode }) => (
    <p className="mb-4" style={{ color: colors.muted }}>
      {children}
    </p>
  );

  // Component-specific mockups
  switch (componentName) {
    case 'Button':
      return () => (
        <div className="space-y-4">
          <div className="space-y-2">
            <MockHeading>Button Component</MockHeading>
            <MockParagraph>The {themeId} theme provides beautifully styled buttons that match the overall design system.</MockParagraph>
          </div>
          <div className="flex flex-wrap gap-3">
            <MockButton variant="primary">Primary Button</MockButton>
            <MockButton variant="secondary">Secondary Button</MockButton>
            <div 
              className="px-4 py-2 rounded-md inline-flex items-center justify-center" 
              style={{ backgroundColor: colors.accent, color: "white" }}
            >
              Accent Button
            </div>
            <div 
              className="px-4 py-2 rounded-md inline-flex items-center justify-center bg-transparent" 
              style={{ color: colors.primary, border: `1px solid ${colors.primary}` }}
            >
              Outline Button
            </div>
          </div>
        </div>
      );
    
    case 'Card':
      return () => (
        <div className="space-y-4 max-w-md">
          <div className="space-y-2">
            <MockHeading>Card Component</MockHeading>
            <MockParagraph>Cards in the {themeId} theme provide flexible containers for various types of content.</MockParagraph>
          </div>
          <div className="border border-gray-200 rounded-lg p-6 bg-white shadow-sm hover:shadow-md transition-shadow">
            <div className="h-32 mb-4 rounded overflow-hidden bg-gray-100 flex items-center justify-center" style={{ backgroundColor: `${colors.primary}20` }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke={colors.primary} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                <circle cx="8.5" cy="8.5" r="1.5"></circle>
                <polyline points="21 15 16 10 5 21"></polyline>
              </svg>
            </div>
            <MockHeading level={3}>Card Title</MockHeading>
            <MockParagraph>This card contains sample content to demonstrate the styling of the {themeId} theme.</MockParagraph>
            <MockButton>Read more</MockButton>
          </div>
        </div>
      );
    
    case 'Header':
      return () => (
        <div className="space-y-4">
          <div className="space-y-2">
            <MockHeading>Header Component</MockHeading>
            <MockParagraph>The header component from the {themeId} theme provides navigation and branding.</MockParagraph>
          </div>
          <div className="border-b border-gray-200 py-4">
            <div className="container mx-auto flex justify-between items-center">
              <div className="font-bold text-xl" style={{ color: colors.primary }}>{themeId.charAt(0).toUpperCase() + themeId.slice(1)}</div>
              <div className="hidden md:flex space-x-6">
                <a href="#" className="hover:text-primary" style={{ color: colors.muted, transition: "color 0.2s" }}>Home</a>
                <a href="#" className="hover:text-primary" style={{ color: colors.muted, transition: "color 0.2s" }}>Features</a>
                <a href="#" className="hover:text-primary" style={{ color: colors.muted, transition: "color 0.2s" }}>Pricing</a>
                <a href="#" className="hover:text-primary" style={{ color: colors.muted, transition: "color 0.2s" }}>About</a>
              </div>
              <MockButton>Sign In</MockButton>
            </div>
          </div>
        </div>
      );
    
    case 'Hero':
      return () => (
        <div className="space-y-4">
          <div className="space-y-2">
            <MockHeading>Hero Component</MockHeading>
            <MockParagraph>The hero component from the {themeId} theme creates attention-grabbing page introductions.</MockParagraph>
          </div>
          <div className="py-16 rounded-lg relative overflow-hidden">
            <div className="absolute inset-0 opacity-10" style={{ backgroundColor: colors.primary }}></div>
            <div 
              className="absolute inset-0 opacity-5" 
              style={{ 
                backgroundImage: `radial-gradient(circle at 30% 50%, ${colors.primary}, transparent), 
                                 radial-gradient(circle at 70% 70%, ${colors.accent}, transparent)` 
              }}
            ></div>
            <div className="relative max-w-2xl mx-auto text-center px-4">
              <h1 className="text-4xl md:text-5xl font-bold mb-4" style={{ color: colors.text }}>
                Welcome to {themeId.charAt(0).toUpperCase() + themeId.slice(1)}
              </h1>
              <p className="text-xl mb-8" style={{ color: colors.muted }}>
                This is a beautiful hero section styled in the {themeId} theme design system.
              </p>
              <div className="flex justify-center gap-4 flex-wrap">
                <MockButton variant="primary">Get Started</MockButton>
                <MockButton variant="secondary">Learn More</MockButton>
              </div>
            </div>
          </div>
        </div>
      );
    
    case 'Footer':
      return () => (
        <div className="space-y-4">
          <div className="space-y-2">
            <MockHeading>Footer Component</MockHeading>
            <MockParagraph>The footer component from the {themeId} theme provides site navigation and legal information.</MockParagraph>
          </div>
          <div className="border-t border-gray-200 py-12 mt-4">
            <div className="container mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                <div>
                  <h3 className="font-bold mb-4" style={{ color: colors.text }}>
                    {themeId.charAt(0).toUpperCase() + themeId.slice(1)}
                  </h3>
                  <p style={{ color: colors.muted }}>A beautiful theme for your next project.</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-4" style={{ color: colors.text }}>Products</h4>
                  <ul className="space-y-2">
                    <li><a href="#" style={{ color: colors.muted }}>Features</a></li>
                    <li><a href="#" style={{ color: colors.muted }}>Pricing</a></li>
                    <li><a href="#" style={{ color: colors.muted }}>Documentation</a></li>
                    <li><a href="#" style={{ color: colors.muted }}>Releases</a></li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-4" style={{ color: colors.text }}>Resources</h4>
                  <ul className="space-y-2">
                    <li><a href="#" style={{ color: colors.muted }}>Blog</a></li>
                    <li><a href="#" style={{ color: colors.muted }}>Newsletter</a></li>
                    <li><a href="#" style={{ color: colors.muted }}>Events</a></li>
                    <li><a href="#" style={{ color: colors.muted }}>Help Center</a></li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-4" style={{ color: colors.text }}>Legal</h4>
                  <ul className="space-y-2">
                    <li><a href="#" style={{ color: colors.muted }}>Privacy</a></li>
                    <li><a href="#" style={{ color: colors.muted }}>Terms</a></li>
                    <li><a href="#" style={{ color: colors.muted }}>Cookie Policy</a></li>
                    <li><a href="#" style={{ color: colors.muted }}>Contact</a></li>
                  </ul>
                </div>
              </div>
              <div className="border-t border-gray-200 mt-8 pt-6 text-center" style={{ color: colors.muted }}>
                <p>© 2023 {themeId.charAt(0).toUpperCase() + themeId.slice(1)} Theme. All rights reserved.</p>
              </div>
            </div>
          </div>
        </div>
      );
    
    default:
      return () => (
        <div className="space-y-4">
          <MockHeading>Component: {componentName}</MockHeading>
          <div className="p-8 border border-gray-200 rounded-lg bg-white flex flex-col items-center justify-center text-center">
            <div className="w-16 h-16 rounded-full mb-4 flex items-center justify-center" style={{ backgroundColor: `${colors.primary}20` }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={colors.primary} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
                <line x1="12" y1="9" x2="12" y2="13"></line>
                <line x1="12" y1="17" x2="12.01" y2="17"></line>
              </svg>
            </div>
            <p className="text-lg font-medium mb-2" style={{ color: colors.text }}>
              No preview available
            </p>
            <p style={{ color: colors.muted }}>
              The {componentName} component from the {themeId} theme couldn't be displayed directly.
            </p>
          </div>
        </div>
      );
  }
};

// Function to load a component from a theme
const loadThemeComponent = (theme: ThemeName, componentName: string) => {
  // Try to dynamically import the component
  let importPromise = import(`tailwind-plus/${theme}/${componentName}`)
    .then(module => module.default || module[componentName])
    .catch(error => {
      console.warn(`Failed to load ${componentName} from theme ${theme}:`, error);
      // Return a mock component when the actual component can't be loaded
      return createMockComponent(theme, componentName);
    });

  // Return a component that will render when the import is complete
  return React.memo(function ThemeComponent() {
    const [Component, setComponent] = React.useState<React.ComponentType | null>(null);
    const [error, setError] = React.useState<Error | null>(null);

    React.useEffect(() => {
      let isMounted = true;
      importPromise
        .then(loadedComponent => {
          if (isMounted) {
            setComponent(() => loadedComponent);
          }
        })
        .catch(err => {
          if (isMounted) {
            console.error(`Error loading ${componentName} from ${theme}:`, err);
            setError(err);
            // Fallback to mock component
            setComponent(() => createMockComponent(theme, componentName));
          }
        });

      return () => {
        isMounted = false;
      };
    }, []);

    if (error) {
      return createMockComponent(theme, componentName)();
    }

    if (!Component) {
      return <div className="p-4 text-center">Loading component...</div>;
    }

    return <Component />;
  });
};

// Placeholder image URLs for themes
const THEME_THUMBNAILS: Record<string, string> = {
  salient: 'https://images.unsplash.com/photo-1556075798-4825dfaaf498?auto=format&fit=crop&q=80&w=400&h=300',
  protocol: 'https://images.unsplash.com/photo-1618044733300-9472054094ee?auto=format&fit=crop&q=80&w=400&h=300',
  transmit: 'https://images.unsplash.com/photo-1536566482680-fca31930a0bd?auto=format&fit=crop&q=80&w=400&h=300',
  syntax: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&q=80&w=400&h=300',
  primer: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&q=80&w=400&h=300',
  pocket: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=400&h=300',
  keynote: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=400&h=300',
  commit: 'https://images.unsplash.com/photo-1542831371-29b0f74f9713?auto=format&fit=crop&q=80&w=400&h=300',
  radiant: 'https://images.unsplash.com/photo-1579546929662-711aa81148cf?auto=format&fit=crop&q=80&w=400&h=300',
  studio: 'https://images.unsplash.com/photo-1611162616475-46b635cb6868?auto=format&fit=crop&q=80&w=400&h=300'
};

// Get a theme thumbnail with a fallback
const getThemeThumbnail = (themeId: string) => {
  return THEME_THUMBNAILS[themeId] || 
    `https://ui-avatars.com/api/?name=${themeId}&background=random&color=fff&size=300`;
};

// List of component types available in each theme
const COMPONENT_TYPES = ['Button', 'Card', 'Header', 'Footer', 'Hero'];

const COMPONENT_CATEGORIES = {
  'Basic UI': ['Button', 'Card', 'Badge', 'Alert'],
  'Layout': ['Container', 'Grid', 'Box', 'Flex'],
  'Navigation': ['Header', 'Footer', 'Navbar', 'Menu', 'Tabs'],
  'Content': ['Hero', 'Feature', 'Pricing', 'Testimonial'],
  'Forms': ['Input', 'Checkbox', 'Select', 'Radio', 'Textarea'],
  'Feedback': ['Modal', 'Toast', 'Progress', 'Spinner'],
} as const;

// Update Card component to properly define its subcomponents
interface CardWithSubcomponents extends React.FC<any> {
  Header: React.FC<{ children: React.ReactNode }>;
  Body: React.FC<{ children: React.ReactNode }>;
  Footer: React.FC<{ children: React.ReactNode }>;
}

// For the mockup, create the Card subcomponents
const CardWithComposition = Card as CardWithSubcomponents;
CardWithComposition.Header = ({ children }) => <div className="p-4 border-b border-gray-200">{children}</div>;
CardWithComposition.Body = ({ children }) => <div className="p-4">{children}</div>;
CardWithComposition.Footer = ({ children }) => <div className="p-4 border-t border-gray-200 bg-gray-50">{children}</div>;

// Component to render the theme components showcase
const ThemeComponentShowcase: React.FC<{ theme: ThemeName }> = ({ theme }) => {
  const [activeCategory, setActiveCategory] = React.useState<keyof typeof COMPONENT_CATEGORIES>('Basic UI');
  const [isOriginalView, setIsOriginalView] = React.useState(true);
  
  return (
    <div className="space-y-8">
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <h2 className="text-2xl font-bold mb-4">Components from {theme.charAt(0).toUpperCase() + theme.slice(1)} Theme</h2>
        <p className="text-gray-600 mb-6">
          Browse through components from the {theme} theme. Toggle between original theme components and adapted components.
        </p>
        
        <div className="flex justify-between items-center mb-6">
          <div className="flex gap-2">
            <button 
              onClick={() => setIsOriginalView(true)}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                isOriginalView 
                  ? 'bg-primary text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Original Components
            </button>
            <button 
              onClick={() => setIsOriginalView(false)}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                !isOriginalView 
                  ? 'bg-primary text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Adapted Components
            </button>
          </div>
        </div>
        
        <div className="flex mb-8 overflow-x-auto pb-2 gap-2">
          {Object.keys(COMPONENT_CATEGORIES).map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category as keyof typeof COMPONENT_CATEGORIES)}
              className={`px-4 py-2 rounded-md text-sm whitespace-nowrap ${
                activeCategory === category
                  ? 'bg-gray-200 text-gray-900 font-medium'
                  : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {COMPONENT_CATEGORIES[activeCategory].map((componentName) => (
            <div key={componentName} className="border border-gray-200 rounded-lg overflow-hidden">
              <div className="bg-gray-50 px-4 py-3 border-b border-gray-200 flex justify-between items-center">
                <h3 className="font-medium">{componentName}</h3>
                <span className="text-xs px-2 py-1 rounded-full bg-gray-200 text-gray-700">
                  {isOriginalView ? 'Original' : 'Adapted'}
                </span>
              </div>
              <div className="p-5 bg-white">
                {isOriginalView ? (
                  <Suspense fallback={<div className="animate-pulse h-32 bg-gray-100 rounded"></div>}>
                    <DynamicComponent theme={theme} componentName={componentName} />
                  </Suspense>
                ) : (
                  <div className="space-y-2">
                    {componentName === 'Button' && (
                      <div className="space-y-4">
                        <p className="text-sm text-gray-500">Our adapted button component supports variants and sizes.</p>
                        <div className="flex flex-wrap gap-2">
                          <Button variant="primary">Primary</Button>
                          <Button variant="secondary">Secondary</Button>
                          <Button variant="outline">Outline</Button>
                          <Button variant="ghost">Ghost</Button>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          <Button size="sm">Small</Button>
                          <Button>Default</Button>
                          <Button size="lg">Large</Button>
                        </div>
                      </div>
                    )}
                    {componentName === 'Card' && (
                      <CardWithComposition>
                        <CardWithComposition.Header>
                          <h3 className="text-lg font-semibold">Card Header</h3>
                        </CardWithComposition.Header>
                        <CardWithComposition.Body>
                          <p>This is our adapted Card component with consistent styling across themes.</p>
                        </CardWithComposition.Body>
                        <CardWithComposition.Footer>
                          <Button variant="primary" size="sm">Action</Button>
                        </CardWithComposition.Footer>
                      </CardWithComposition>
                    )}
                    {componentName !== 'Button' && componentName !== 'Card' && (
                      <div className="py-8 text-center">
                        <p className="text-gray-400 text-sm">Adapted component not yet implemented</p>
                      </div>
                    )}
                  </div>
                )}
              </div>
              <div className="px-4 py-3 bg-gray-50 border-t border-gray-200">
                <code className="text-xs text-gray-600 block overflow-x-auto whitespace-pre">
                  {isOriginalView 
                    ? `import { ${componentName} } from 'tailwind-plus/${theme}'`
                    : `import { ${componentName} } from '@/components/ui/${componentName}'`}
                </code>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <h2 className="text-2xl font-bold mb-4">Theme Tokens</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Colors</h3>
            <div className="space-y-2">
              {['primary', 'secondary', 'accent', 'neutral'].map((color) => (
                <div key={color} className="flex items-center">
                  <div 
                    className="w-10 h-10 rounded mr-3" 
                    style={{ backgroundColor: `var(--${color})` }}
                  ></div>
                  <div>
                    <p className="font-medium">{color}</p>
                    <p className="text-xs text-gray-500">var(--{color})</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Typography</h3>
            <div className="space-y-4">
              <div>
                <p className="font-medium">Font Family</p>
                <p style={{ fontFamily: 'var(--font-sans)' }}>
                  The quick brown fox jumps over the lazy dog
                </p>
                <p className="text-xs text-gray-500">var(--font-sans)</p>
              </div>
              <div>
                <p className="font-medium">Font Sizes</p>
                <div className="space-y-1">
                  <p className="text-xs">text-xs</p>
                  <p className="text-sm">text-sm</p>
                  <p className="text-base">text-base</p>
                  <p className="text-lg">text-lg</p>
                  <p className="text-xl">text-xl</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Spacing & Radius</h3>
            <div className="space-y-4">
              <div>
                <p className="font-medium">Border Radius</p>
                <div className="flex flex-wrap gap-4 mt-2">
                  {['none', 'sm', 'md', 'lg', 'full'].map((radius) => (
                    <div 
                      key={radius} 
                      className="w-16 h-16 bg-gray-200 flex items-center justify-center text-xs text-gray-600"
                      style={{ 
                        borderRadius: radius === 'none' ? '0' : radius === 'full' ? '9999px' : `var(--radius-${radius})` 
                      }}
                    >
                      {radius}
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <p className="font-medium">Spacing</p>
                <div className="flex items-end gap-1 mt-2 h-24">
                  {[1, 2, 3, 4, 6, 8, 12, 16].map((space) => (
                    <div 
                      key={space} 
                      className="bg-gray-400 w-6" 
                      style={{ height: `${space * 4}px` }} 
                      title={`${space * 4}px`}
                    ></div>
                  ))}
                </div>
                <p className="text-xs text-gray-500 mt-1">4px increments</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Component that dynamically loads a theme component
const DynamicComponent: React.FC<{ theme: ThemeName; componentName: string }> = ({ theme, componentName }) => {
  const Component = React.useMemo(() => {
    return loadThemeComponent(theme, componentName);
  }, [theme, componentName]);

  return (
    <ErrorBoundary 
      fallback={
        <div className="py-6 text-center rounded-md border border-gray-200">
          <p className="text-gray-400">Failed to load component</p>
        </div>
      }
    >
      <Component />
    </ErrorBoundary>
  );
};

// Simple error boundary component
class ErrorBoundary extends React.Component<{ 
  fallback: React.ReactNode;
  children: React.ReactNode;
}> {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }

    return this.props.children;
  }
}

// Define theme directory page
const ThemeShowcasePage = () => {
  const { availableThemes, setCurrentThemeId, currentThemeId } = useTheme();
  const [filter, setFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedTheme, setSelectedTheme] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<string>('catalog');
  
  // Get categories from themes
  const categories = ['all', ...Array.from(new Set(availableThemes.map(theme => theme.metadata.category)))];
  
  // Filter themes based on category and search query
  const filteredThemes = availableThemes.filter(theme => {
    const matchesCategory = filter === 'all' || theme.metadata.category === filter;
    const matchesSearch = searchQuery === '' || 
      theme.metadata.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      theme.metadata.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      theme.metadata.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    return matchesCategory && matchesSearch;
  });

  // When applying a theme, set it as current
  const handleApplyTheme = (themeId: string) => {
    setCurrentThemeId(themeId);
  };
  
  // When selecting a theme, view its details
  const handleSelectTheme = (themeId: string) => {
    setSelectedTheme(themeId);
    setActiveTab('components');
  };
  
  // Get the selected theme object
  const selectedThemeObj = selectedTheme 
    ? availableThemes.find(t => t.metadata.id === selectedTheme) 
    : availableThemes.find(t => t.metadata.id === currentThemeId);

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Tabs */}
      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="flex border-b border-gray-200">
            <button
              onClick={() => setActiveTab('catalog')}
              className={`py-4 px-6 text-sm font-medium border-b-2 ${
                activeTab === 'catalog'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Theme Catalog
            </button>
            <button
              onClick={() => setActiveTab('components')}
              className={`py-4 px-6 text-sm font-medium border-b-2 ${
                activeTab === 'components'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Theme Components
            </button>
          </div>
        </div>
      </div>

      {activeTab === 'catalog' ? (
        <>
          {/* Hero section */}
          <div className="relative bg-white py-16 px-6 border-b border-gray-200">
            <div className="container mx-auto max-w-6xl">
              <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">Tailwind Plus Theme Collection</h1>
              <p className="text-lg text-gray-600 max-w-xl mb-8">
                Browse our extensive collection of professionally designed themes for your next project.
                Each theme is fully adaptable and ready to integrate.
              </p>
              <div className="relative max-w-md">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search themes..."
                  className="w-full px-4 py-2 border rounded-lg bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <span className="absolute right-3 top-2.5 text-gray-400">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="11" cy="11" r="8"></circle>
                    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                  </svg>
                </span>
              </div>
            </div>
          </div>

          {/* Category filters */}
          <div className="container mx-auto px-6 py-8 max-w-6xl">
            <div className="flex flex-wrap gap-2 mb-8">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setFilter(category)}
                  className={`px-4 py-2 rounded-md text-sm transition-colors ${
                    filter === category
                      ? 'bg-blue-600 text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                  }`}
                >
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </button>
              ))}
            </div>

            {/* Themes grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
              {filteredThemes.map((theme) => (
                <div key={theme.metadata.id} className="bg-white rounded-lg overflow-hidden shadow-sm border border-gray-200 transition-all hover:shadow-md">
                  <div className="relative h-48 overflow-hidden bg-gray-100">
                    <img
                      src={getThemeThumbnail(theme.metadata.id)}
                      alt={theme.metadata.name}
                      className="w-full h-full object-cover"
                    />
                    {currentThemeId === theme.metadata.id && (
                      <div className="absolute top-2 right-2 bg-green-500 text-white text-xs px-2 py-1 rounded">
                        Active
                      </div>
                    )}
                  </div>
                  <div className="p-5">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-semibold text-xl text-gray-900">{theme.metadata.name}</h3>
                      <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                        {theme.metadata.category}
                      </span>
                    </div>
                    <p className="text-gray-600 text-sm mb-4">
                      {theme.metadata.description}
                    </p>
                    <div className="flex flex-wrap gap-1 mb-4">
                      {theme.metadata.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleApplyTheme(theme.metadata.id)}
                        className={`px-3 py-1 text-sm font-medium rounded-md ${
                          currentThemeId === theme.metadata.id 
                            ? 'bg-green-100 text-green-800 border border-green-200' 
                            : 'bg-blue-600 text-white hover:bg-blue-700'
                        }`}
                      >
                        {currentThemeId === theme.metadata.id ? "Active" : "Apply Theme"}
                      </button>
                      <button
                        onClick={() => handleSelectTheme(theme.metadata.id)}
                        className="px-3 py-1 text-sm font-medium rounded-md bg-white border border-gray-300 text-gray-700 hover:bg-gray-50"
                      >
                        View Components
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Call to Action */}
            <div className="text-center max-w-3xl mx-auto mb-16 p-8 bg-white rounded-lg shadow-sm border border-gray-200">
              <h2 className="text-2xl font-bold mb-4 text-gray-900">Need a Custom Theme?</h2>
              <p className="text-gray-600 mb-6">
                Our theme generator allows you to create custom themes based on your brand colors
                and preferences. Try it out and create your own unique design system.
              </p>
              <button className="px-6 py-2 bg-blue-600 text-white text-base font-medium rounded-md hover:bg-blue-700 transition-colors">
                Create Custom Theme
              </button>
            </div>
          </div>
        </>
      ) : (
        // Component showcase tab
        <div className="container mx-auto px-6 py-8 max-w-6xl">
          {selectedThemeObj ? (
            <>
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">{selectedThemeObj.metadata.name} Theme</h1>
                  <p className="text-gray-600 mt-2">{selectedThemeObj.metadata.description}</p>
                  
                  <div className="flex flex-wrap gap-1 mt-2">
                    {selectedThemeObj.metadata.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                
                <button
                  onClick={() => handleApplyTheme(selectedThemeObj.metadata.id)}
                  className={`px-4 py-2 text-sm font-medium rounded-md ${
                    currentThemeId === selectedThemeObj.metadata.id 
                      ? 'bg-green-100 text-green-800 border border-green-200' 
                      : 'bg-blue-600 text-white hover:bg-blue-700'
                  }`}
                >
                  {currentThemeId === selectedThemeObj.metadata.id ? "Currently Active" : "Apply Theme"}
                </button>
              </div>
              
              {/* Real theme components */}
              <div className="bg-background rounded-lg p-8 border border-gray-200 shadow-sm mb-8">
                <Suspense fallback={<div className="p-8 text-center">Loading theme components...</div>}>
                  <ThemeComponentShowcase theme={selectedThemeObj.metadata.id} />
                </Suspense>
              </div>
              
              {/* Adapted components section */}
              <div className="bg-background rounded-lg p-8 border border-gray-200 shadow-sm mb-8">
                <h2 className="text-2xl font-bold mb-6">Adapted Components</h2>
                <p className="text-gray-600 mb-6">
                  These are the agency app's adaptable components styled with the {selectedThemeObj.metadata.name} theme tokens:
                </p>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div className="space-y-8">
                    <div>
                      <h3 className="text-lg font-semibold mb-4">Button</h3>
                      <div className="bg-card p-6 rounded-lg border border-gray-200">
                        <div className="flex flex-wrap gap-3">
                          <Button variant="primary">Primary</Button>
                          <Button variant="secondary">Secondary</Button>
                          <Button variant="outline">Outline</Button>
                          <Button variant="ghost">Ghost</Button>
                        </div>
                        
                        <div className="mt-4 flex flex-wrap gap-3 items-center">
                          <Button size="sm">Small</Button>
                          <Button size="md">Medium</Button>
                          <Button size="lg">Large</Button>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-semibold mb-4">Card</h3>
                      <Card className="p-6">
                        <h4 className="text-xl font-semibold mb-2">Card Title</h4>
                        <p className="text-muted-foreground mb-4">
                          This is a sample card component from the {selectedThemeObj.metadata.name} theme.
                          Cards are versatile containers that can hold various types of content.
                        </p>
                        <Button variant="primary">Learn More</Button>
                      </Card>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Component Information</h3>
                    <div className="bg-card p-6 rounded-lg border border-gray-200">
                      <p className="text-muted-foreground mb-4">
                        The {selectedThemeObj.metadata.name} theme includes the following components:
                      </p>
                      
                      <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
                        {Object.entries(selectedThemeObj.components).map(([name, component]) => (
                          <li key={name}>
                            <span className="font-medium">{name}</span>
                            {component ? ' - Implemented' : ' - Not implemented yet'}
                          </li>
                        ))}
                      </ul>
                      
                      <div className="mt-6 pt-6 border-t border-gray-200">
                        <h4 className="font-semibold mb-2">Usage Example</h4>
                        <pre className="bg-gray-100 p-3 rounded text-sm overflow-x-auto">
                          <code>{`// Import the component from the theme
import { Button } from '@tailwindplus/${selectedThemeObj.metadata.id}';

// Use it in your component
export function MyComponent() {
  return (
    <Button variant="primary">
      Click Me
    </Button>
  );
}
`}</code>
                        </pre>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Theme tokens section */}
              <div className="bg-background rounded-lg p-8 border border-gray-200 shadow-sm mb-8">
                <h2 className="text-2xl font-bold mb-6">Theme Tokens</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Colors</h3>
                    <div className="grid grid-cols-2 gap-3">
                      {Object.entries(selectedThemeObj.tokens.colors).map(([name, value]) => (
                        <div key={name} className="flex items-center gap-2">
                          <div 
                            className="w-6 h-6 rounded-full border border-gray-200" 
                            style={{ backgroundColor: value }}
                          />
                          <div>
                            <div className="text-sm font-medium">{name}</div>
                            <div className="text-xs text-gray-500">{value}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Typography</h3>
                    <div className="space-y-3">
                      <div>
                        <span className="text-sm font-medium">Font Family</span>
                        <div className="grid grid-cols-1 gap-1 mt-1">
                          {Object.entries(selectedThemeObj.tokens.typography.fontFamily).map(([name, value]) => (
                            <div key={name} className="flex justify-between text-sm">
                              <span className="text-gray-600">{name}:</span>
                              <span className="font-medium" style={{ fontFamily: value }}>{value}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <span className="text-sm font-medium">Border Radius</span>
                        <div className="grid grid-cols-1 gap-1 mt-1">
                          {Object.entries(selectedThemeObj.tokens.borderRadius).map(([name, value]) => (
                            <div key={name} className="flex justify-between text-sm">
                              <span className="text-gray-600">{name}:</span>
                              <span className="font-medium">{value}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="text-center py-20">
              <h2 className="text-2xl font-bold mb-4">Select a theme to view its components</h2>
              <p className="text-gray-600 mb-8">
                Go to the Theme Catalog tab and select a theme to view its components and design tokens.
              </p>
              <button 
                onClick={() => setActiveTab('catalog')} 
                className="px-4 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700"
              >
                Browse Theme Catalog
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ThemeShowcasePage; 