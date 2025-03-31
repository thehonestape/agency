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
  
  // Render the appropriate content based on active section
  const renderContent = () => {
    switch (activeSection) {
      case 'typography':
        return <TypographyDesignPage />;
      case 'color':
        return <ColorDesignPage />;
      case 'button':
        return <ButtonDesignPage />;
      case 'card':
        return <CardSection />;
      case 'input':
        return <InputSection />;
      case 'spacing':
        return <SpacingSection />;
      case 'icons':
        return <IconsSection />;
      default:
        return <TypographyDesignPage />;
    }
  };
  
  return (
    <div className="max-w-none pl-0">
      {/* Design System Introduction */}
      <div className="mb-8">
        <Heading variant="h1" className="mb-4">Design System</Heading>
        <Text className="text-muted-foreground">A comprehensive collection of design standards, components, and guidelines that ensure consistency across our product.</Text>
      </div>
      
      {/* Component Quick Navigation */}
      <div className="mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Component Library</CardTitle>
            <CardDescription>Click a component to view its documentation</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {['Typography', 'Color', 'Button', 'Card', 'Input', 'Spacing', 'Icons'].map((section) => (
                <Button 
                  key={section}
                  variant={activeSection === section.toLowerCase() ? 'default' : 'outline'}
                  onClick={() => handleNavClick(section.toLowerCase())}
                  className="mb-2"
                >
                  {section}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Main content area with the active section */}
      <Card className="p-6 border-0 shadow-none rounded-none">
        <div id={activeSection}>
          {renderContent()}
        </div>
      </Card>
    </div>
  );
};

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

export default DesignSystemPage; 