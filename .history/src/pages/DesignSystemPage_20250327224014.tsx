import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/Card';
import { Heading, Text } from '../components/ui/typography';
import { Button } from '../components/ui/button';
import { useLocation, useNavigate } from 'react-router-dom';

// Import content components from our existing design pages
import { TypographyDesignPage } from './design/TypographyDesignPage';
import { ColorDesignPage } from './design/ColorDesignPage';
import { ButtonDesignPage } from './design/ButtonDesignPage';

interface ColorSwatchProps {
  name: string;
  className: string;
  value?: string;
  description?: string;
}

const ColorSwatch: React.FC<ColorSwatchProps> = ({ name, className, value, description }) => (
  <div className="rounded-lg overflow-hidden shadow-md">
    <div className={`h-24 ${className}`}></div>
    <div className="p-3 bg-card">
      <Heading variant="h4" className="mb-1">{name}</Heading>
      {value && <Text className="text-xs font-mono">{value}</Text>}
      {description && <Text className="text-sm text-muted-foreground mt-1">{description}</Text>}
    </div>
  </div>
);

// Card section
const CardSection = () => (
  <section id="card" className="mb-16">
    <Heading variant="h1" className="mb-4">Card</Heading>
    <Text className="text-muted-foreground mb-8">Container components for grouping related content</Text>
    
    <div className="space-y-10">
      <Card>
        <CardHeader>
          <CardTitle>Card Variants</CardTitle>
          <CardDescription>Different styles and layouts for cards</CardDescription>
        </CardHeader>
        <CardContent className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Standard Card</CardTitle>
                <CardDescription>Default card with header and content</CardDescription>
              </CardHeader>
              <CardContent>
                <Text>This is a standard card with a header and content section. Use for most content containers.</Text>
              </CardContent>
            </Card>
            
            <Card className="border-primary">
              <CardHeader>
                <CardTitle>Primary Card</CardTitle>
                <CardDescription>Card with primary border emphasis</CardDescription>
              </CardHeader>
              <CardContent>
                <Text>This card uses a primary color border to add emphasis and draw attention.</Text>
              </CardContent>
            </Card>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="bg-muted">
              <CardHeader>
                <CardTitle>Muted Card</CardTitle>
                <CardDescription>Subdued background styling</CardDescription>
              </CardHeader>
              <CardContent>
                <Text>Used for secondary information.</Text>
              </CardContent>
            </Card>
            
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle>Elevated Card</CardTitle>
                <CardDescription>Enhanced shadow for depth</CardDescription>
              </CardHeader>
              <CardContent>
                <Text>Adds prominence through shadow.</Text>
              </CardContent>
            </Card>
            
            <Card className="border-dashed">
              <CardHeader>
                <CardTitle>Dashed Card</CardTitle>
                <CardDescription>Alternative border style</CardDescription>
              </CardHeader>
              <CardContent>
                <Text>For placeholder content.</Text>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Usage Guidelines</CardTitle>
          <CardDescription>Best practices for card implementation</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <Text className="font-medium mb-2">Content Organization</Text>
              <Text className="text-muted-foreground">Use cards to group related information and create visual separation between different content sections.</Text>
            </div>
            
            <div>
              <Text className="font-medium mb-2">Hierarchy</Text>
              <Text className="text-muted-foreground">Maintain a clear visual hierarchy within cards with proper heading levels and spacing.</Text>
            </div>
            
            <div>
              <Text className="font-medium mb-2">Consistency</Text>
              <Text className="text-muted-foreground">Keep card layouts consistent across the application for a cohesive user experience.</Text>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  </section>
);

// Input section
const InputSection = () => (
  <section id="input" className="mb-16">
    <Heading variant="h1" className="mb-4">Input</Heading>
    <Text className="text-muted-foreground mb-8">Form input components for user data entry</Text>
    
    <div className="space-y-10">
      <Card>
        <CardHeader>
          <CardTitle>Text Inputs</CardTitle>
          <CardDescription>Basic text input components</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <Text className="font-medium mb-2">
              <label htmlFor="default-input">Default Input</label>
            </Text>
            <div className="max-w-sm">
              <input
                id="default-input"
                type="text"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                placeholder="Enter your name"
                aria-label="Default input example"
              />
            </div>
          </div>
          
          <div>
            <Text className="font-medium mb-2">
              <label htmlFor="disabled-input">Disabled Input</label>
            </Text>
            <div className="max-w-sm">
              <input
                id="disabled-input"
                type="text"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                placeholder="This input is disabled"
                disabled
                aria-disabled="true"
                aria-label="Disabled input example"
              />
            </div>
          </div>
          
          <div>
            <Text className="font-medium mb-2">
              <label htmlFor="textarea-input">Textarea</label>
            </Text>
            <div className="max-w-sm">
              <textarea
                id="textarea-input"
                className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                placeholder="Enter a description"
                aria-label="Textarea example"
              />
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Input Controls</CardTitle>
          <CardDescription>Selection and toggle components</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <Text className="font-medium mb-2">Checkbox</Text>
            <div className="flex items-center space-x-2">
              <input 
                id="terms-checkbox"
                type="checkbox" 
                className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                aria-labelledby="terms-label"
              />
              <label id="terms-label" htmlFor="terms-checkbox" className="text-sm">
                Accept terms and conditions
              </label>
            </div>
          </div>
          
          <div>
            <Text className="font-medium mb-2">Radio Buttons</Text>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <input 
                  id="radio-option-1"
                  type="radio" 
                  name="radio-group" 
                  className="h-4 w-4 border-gray-300 text-primary focus:ring-primary"
                  defaultChecked
                  aria-labelledby="radio-label-1"
                />
                <label id="radio-label-1" htmlFor="radio-option-1" className="text-sm">
                  Option 1
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <input 
                  id="radio-option-2"
                  type="radio" 
                  name="radio-group" 
                  className="h-4 w-4 border-gray-300 text-primary focus:ring-primary"
                  aria-labelledby="radio-label-2"
                />
                <label id="radio-label-2" htmlFor="radio-option-2" className="text-sm">
                  Option 2
                </label>
              </div>
            </div>
          </div>
          
          <div>
            <Text className="font-medium mb-2">Switch</Text>
            <div className="flex items-center space-x-2">
              <div 
                role="switch"
                aria-checked="true"
                tabIndex={0}
                aria-label="Enable notifications"
                className="inline-flex h-[24px] w-[44px] shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent bg-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50">
                <span className="pointer-events-none block h-5 w-5 rounded-full bg-background shadow-lg ring-0 transition-transform translate-x-5" />
              </div>
              <span className="text-sm">Enable notifications</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  </section>
);

// Spacing section
const SpacingSection = () => (
  <section id="spacing" className="mb-16">
    <Heading variant="h1" className="mb-4">Spacing</Heading>
    <Text className="text-muted-foreground mb-8">Consistent spacing system for layout and components</Text>
    
    <Card>
      <CardHeader>
        <CardTitle>Spacing Scale</CardTitle>
        <CardDescription>Based on a 4px increment system</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-center">
              <div className="w-16 h-4 bg-primary mr-4"></div>
              <Text className="text-sm">4px - Extra small spacing (p-1)</Text>
            </div>
            <div className="flex items-center">
              <div className="w-16 h-8 bg-primary mr-4"></div>
              <Text className="text-sm">8px - Small spacing (p-2)</Text>
            </div>
            <div className="flex items-center">
              <div className="w-16 h-12 bg-primary mr-4"></div>
              <Text className="text-sm">12px - Medium spacing (p-3)</Text>
            </div>
            <div className="flex items-center">
              <div className="w-16 h-16 bg-primary mr-4"></div>
              <Text className="text-sm">16px - Default spacing (p-4)</Text>
            </div>
            <div className="flex items-center">
              <div className="w-16 h-24 bg-primary mr-4"></div>
              <Text className="text-sm">24px - Large spacing (p-6)</Text>
            </div>
            <div className="flex items-center">
              <div className="w-16 h-32 bg-primary mr-4"></div>
              <Text className="text-sm">32px - Extra large spacing (p-8)</Text>
            </div>
          </div>
          
          <div className="pt-6">
            <Text className="font-medium mb-4">Spacing Guidelines</Text>
            <div className="space-y-2">
              <Text className="text-muted-foreground">• Use 8px (p-2) or 16px (p-4) for general component padding</Text>
              <Text className="text-muted-foreground">• Use 24px (p-6) or 32px (p-8) for section spacing</Text>
              <Text className="text-muted-foreground">• Maintain consistent spacing between related elements</Text>
              <Text className="text-muted-foreground">• Use larger spacing to create separation between unrelated content</Text>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  </section>
);

// Icons section
const IconsSection = () => (
  <section id="icons" className="mb-16">
    <Heading variant="h1" className="mb-4">Icons</Heading>
    <Text className="text-muted-foreground mb-8">Visual elements for enhancing UI and improving comprehension</Text>
    
    <Card>
      <CardHeader>
        <CardTitle>Icon System</CardTitle>
        <CardDescription>Consistent visual language through iconography</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {['dashboard', 'folder', 'users', 'chart', 'components', 'settings', 'document', 'help', 'text', 'palette', 'square', 'layout', 'form', 'ruler', 'image'].map((icon) => (
            <div key={icon} className="flex flex-col items-center p-4 border rounded-md">
              <div className="w-10 h-10 mb-2 flex items-center justify-center bg-muted rounded-md">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  {icon === 'dashboard' && <rect x="3" y="3" width="7" height="7" />}
                  {icon === 'dashboard' && <rect x="14" y="3" width="7" height="7" />}
                  {icon === 'dashboard' && <rect x="14" y="14" width="7" height="7" />}
                  {icon === 'dashboard' && <rect x="3" y="14" width="7" height="7" />}
                  {icon === 'folder' && <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />}
                  {/* Icon paths would vary based on icon type */}
                </svg>
              </div>
              <Text className="text-sm capitalize">{icon}</Text>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  </section>
);

// Main Design System Page
const DesignSystemPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState('typography');
  
  // Handle initial hash in URL and section changes
  useEffect(() => {
    const hash = location.hash.replace('#', '');
    if (hash) {
      setActiveSection(hash);
      const element = document.getElementById(hash);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [location.hash]);
  
  // Handle clicking on a navigation item
  const handleNavClick = (sectionId: string) => {
    setActiveSection(sectionId);
    navigate(`/dashboard/design#${sectionId}`);
  };
  
  return (
    <div className="flex">
      {/* Fixed sidebar navigation - moved to left edge, no card container */}
      <div className="w-64 flex-shrink-0 sticky top-0 h-[calc(100vh-4rem)] border-r">
        <div className="py-4">
          <nav className="space-y-1">
            <a
              href="#typography"
              onClick={(e) => { e.preventDefault(); handleNavClick('typography'); }}
              className={`block px-4 py-2 text-sm font-medium ${
                activeSection === 'typography' 
                  ? 'bg-primary text-primary-foreground' 
                  : 'text-muted-foreground hover:bg-muted hover:text-foreground'
              }`}
            >
              Typography
            </a>
            <a
              href="#color"
              onClick={(e) => { e.preventDefault(); handleNavClick('color'); }}
              className={`block px-4 py-2 text-sm font-medium ${
                activeSection === 'color' 
                  ? 'bg-primary text-primary-foreground' 
                  : 'text-muted-foreground hover:bg-muted hover:text-foreground'
              }`}
            >
              Color
            </a>
            <a
              href="#button"
              onClick={(e) => { e.preventDefault(); handleNavClick('button'); }}
              className={`block px-4 py-2 text-sm font-medium ${
                activeSection === 'button' 
                  ? 'bg-primary text-primary-foreground' 
                  : 'text-muted-foreground hover:bg-muted hover:text-foreground'
              }`}
            >
              Button
            </a>
            <a
              href="#card"
              onClick={(e) => { e.preventDefault(); handleNavClick('card'); }}
              className={`block px-4 py-2 text-sm font-medium ${
                activeSection === 'card' 
                  ? 'bg-primary text-primary-foreground' 
                  : 'text-muted-foreground hover:bg-muted hover:text-foreground'
              }`}
            >
              Card
            </a>
            <a
              href="#input"
              onClick={(e) => { e.preventDefault(); handleNavClick('input'); }}
              className={`block px-4 py-2 text-sm font-medium ${
                activeSection === 'input' 
                  ? 'bg-primary text-primary-foreground' 
                  : 'text-muted-foreground hover:bg-muted hover:text-foreground'
              }`}
            >
              Input
            </a>
            <a
              href="#spacing"
              onClick={(e) => { e.preventDefault(); handleNavClick('spacing'); }}
              className={`block px-4 py-2 text-sm font-medium ${
                activeSection === 'spacing' 
                  ? 'bg-primary text-primary-foreground' 
                  : 'text-muted-foreground hover:bg-muted hover:text-foreground'
              }`}
            >
              Spacing
            </a>
            <a
              href="#icons"
              onClick={(e) => { e.preventDefault(); handleNavClick('icons'); }}
              className={`block px-4 py-2 text-sm font-medium ${
                activeSection === 'icons' 
                  ? 'bg-primary text-primary-foreground' 
                  : 'text-muted-foreground hover:bg-muted hover:text-foreground'
              }`}
            >
              Icons
            </a>
          </nav>
        </div>
      </div>
      
      {/* Main content area with all sections */}
      <div className="flex-1 p-6">
        <Card className="p-6">
          {/* Typography Section */}
          <section id="typography" className="mb-16">
            <Heading variant="h1" className="mb-4">Typography</Heading>
            <Text className="text-muted-foreground mb-8">Text styles and hierarchies in the design system</Text>
            
            <div className="space-y-8">
              {/* Headings */}
              <Card>
                <CardHeader>
                  <CardTitle>Headings</CardTitle>
                  <CardDescription>Typography used for titles and section headers</CardDescription>
                </CardHeader>
                <CardContent className="space-y-8">
                  <div>
                    <Heading variant="h1" className="mb-2">Heading 1</Heading>
                    <Text className="text-sm text-muted-foreground">Used for page titles and major sections</Text>
                  </div>
                  <div>
                    <Heading variant="h2" className="mb-2">Heading 2</Heading>
                    <Text className="text-sm text-muted-foreground">Used for section headers</Text>
                  </div>
                  <div>
                    <Heading variant="h3" className="mb-2">Heading 3</Heading>
                    <Text className="text-sm text-muted-foreground">Used for subsection titles</Text>
                  </div>
                  <div>
                    <Heading variant="h4" className="mb-2">Heading 4</Heading>
                    <Text className="text-sm text-muted-foreground">Used for card titles and smaller sections</Text>
                  </div>
                </CardContent>
              </Card>
              
              {/* Paragraphs */}
              <Card>
                <CardHeader>
                  <CardTitle>Paragraphs</CardTitle>
                  <CardDescription>Text components for body content and descriptions</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <Text className="text-lg mb-2">Large Text</Text>
                    <Text className="text-sm text-muted-foreground">Used for introductory paragraphs</Text>
                    <div className="mt-2 p-4 bg-muted/20 rounded-md">
                      <Text className="text-lg">This is a large paragraph text meant for introductory sections, hero areas, or anywhere you need to emphasize body text.</Text>
                    </div>
                  </div>
                  
                  <div>
                    <Text className="font-medium mb-2">Regular Text</Text>
                    <Text className="text-sm text-muted-foreground">Default paragraph size</Text>
                    <div className="mt-2 p-4 bg-muted/20 rounded-md">
                      <Text>This is the standard paragraph text used throughout the application for most content blocks. It provides good readability for longer form content.</Text>
                    </div>
                  </div>
                  
                  <div>
                    <Text className="font-medium mb-2">Small Text</Text>
                    <Text className="text-sm text-muted-foreground">Used for secondary information</Text>
                    <div className="mt-2 p-4 bg-muted/20 rounded-md">
                      <Text className="text-sm">This smaller text is used for secondary information, metadata, captions, and footer content.</Text>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>
          
          {/* Color Section */}
          <section id="color" className="mb-16">
            <Heading variant="h1" className="mb-4">Color</Heading>
            <Text className="text-muted-foreground mb-8">Color palette and system used across the platform</Text>
            
            <div className="space-y-10">
              {/* Primary Colors */}
              <Card>
                <CardHeader>
                  <CardTitle>Primary Colors</CardTitle>
                  <CardDescription>Core brand colors that define the visual identity</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <ColorSwatch 
                      name="Primary" 
                      className="bg-primary"
                      value="hsl(var(--primary))"
                      description="Main brand color used for primary actions and emphasis"
                    />
                    <ColorSwatch 
                      name="Secondary" 
                      className="bg-secondary"
                      value="hsl(var(--secondary))"
                      description="Supporting brand color for secondary elements"
                    />
                    <ColorSwatch 
                      name="Accent" 
                      className="bg-accent"
                      value="hsl(var(--accent))"
                      description="Used for highlights and to draw attention"
                    />
                  </div>
                </CardContent>
              </Card>
              
              {/* Semantic Colors */}
              <Card>
                <CardHeader>
                  <CardTitle>Semantic Colors</CardTitle>
                  <CardDescription>Colors that convey specific meaning within the interface</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <ColorSwatch 
                      name="Success" 
                      className="bg-success"
                      value="hsl(var(--success))"
                      description="Positive actions and confirmations"
                    />
                    <ColorSwatch 
                      name="Warning" 
                      className="bg-warning"
                      value="hsl(var(--warning))"
                      description="Alerts requiring attention"
                    />
                    <ColorSwatch 
                      name="Destructive" 
                      className="bg-destructive"
                      value="hsl(var(--destructive))"
                      description="Error states and destructive actions"
                    />
                    <ColorSwatch 
                      name="Info" 
                      className="bg-info"
                      value="hsl(var(--info))"
                      description="Informational and help contexts"
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>
          
          {/* Button Section */}
          <section id="button" className="mb-16">
            <Heading variant="h1" className="mb-4">Button</Heading>
            <Text className="text-muted-foreground mb-8">Interactive button components for user actions</Text>
            
            <div className="space-y-10">
              {/* Button Variants */}
              <Card>
                <CardHeader>
                  <CardTitle>Button Variants</CardTitle>
                  <CardDescription>Different styles for various contexts and hierarchies</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-8">
                    <div>
                      <Text className="font-medium mb-3">Primary Variants</Text>
                      <div className="flex flex-wrap gap-4">
                        <Button variant="default">Default</Button>
                        <Button variant="secondary">Secondary</Button>
                        <Button variant="outline">Outline</Button>
                        <Button variant="ghost">Ghost</Button>
                        <Button variant="link">Link</Button>
                      </div>
                    </div>
                    
                    <div>
                      <Text className="font-medium mb-3">Destructive Actions</Text>
                      <div className="flex flex-wrap gap-4">
                        <Button variant="destructive">Destructive</Button>
                        <Button variant="outline" className="text-destructive border-destructive hover:bg-destructive/10">
                          Destructive Outline
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              {/* Button Sizes */}
              <Card>
                <CardHeader>
                  <CardTitle>Button Sizes</CardTitle>
                  <CardDescription>Size variations for different contexts</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap items-center gap-4">
                    <Button size="sm">Small</Button>
                    <Button size="default">Default</Button>
                    <Button size="lg">Large</Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>
          
          {/* Card Section */}
          <CardSection />
          
          {/* Input Section */}
          <InputSection />
          
          {/* Spacing Section */}
          <SpacingSection />
          
          {/* Icons Section */}
          <IconsSection />
        </Card>
      </div>
    </div>
  );
};

export default DesignSystemPage; 