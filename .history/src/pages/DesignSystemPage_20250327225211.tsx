import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '../components/ui/Card';
import { Heading, Text } from '../components/ui/typography';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Checkbox } from '../components/ui/checkbox';
import { RadioGroup } from '../components/ui/radio';
import { Switch } from '../components/ui/switch';
import { Slider } from '../components/ui/slider';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '../components/ui/select';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../components/ui/tabs';
import { Alert, AlertTitle, AlertDescription } from '../components/ui/alert';
import { Badge } from '../components/ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from '../components/ui/avatar';
import { Label } from '../components/ui/label';
import { useLocation, useNavigate } from 'react-router-dom';

// Import content components
import { TypographyDesignPage } from './design/TypographyDesignPage';
import { ColorDesignPage } from './design/ColorDesignPage';
import { ButtonDesignPage } from './design/ButtonDesignPage';

// Color swatch component for color display
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

// Component category interface
interface ComponentCategory {
  id: string;
  name: string;
  description: string;
  icon?: React.ReactNode;
}

// Component categories
const COMPONENT_CATEGORIES: ComponentCategory[] = [
  { 
    id: 'foundations',
    name: 'Foundations', 
    description: 'Core design tokens and base styles'
  },
  { 
    id: 'typography', 
    name: 'Typography', 
    description: 'Text styles and hierarchies'
  },
  { 
    id: 'color', 
    name: 'Color', 
    description: 'Color system and palettes'
  },
  { 
    id: 'layout', 
    name: 'Layout', 
    description: 'Spacing, grids, and containers'
  },
  { 
    id: 'inputs', 
    name: 'Inputs', 
    description: 'Form controls and user input components'
  },
  { 
    id: 'navigation', 
    name: 'Navigation', 
    description: 'Menus, tabs and navigation elements'
  },
  { 
    id: 'feedback', 
    name: 'Feedback', 
    description: 'Alerts, notifications and status indicators'
  },
  { 
    id: 'data-display', 
    name: 'Data Display', 
    description: 'Components for displaying information'
  },
];

// Component showcase
const ComponentShowcase: React.FC<{categoryId: string}> = ({ categoryId }) => {
  switch (categoryId) {
    case 'foundations':
      return <FoundationsSection />;
    case 'typography':
      return <TypographyDesignPage />;
    case 'color':
      return <ColorDesignPage />;
    case 'layout':
      return <LayoutSection />;
    case 'inputs':
      return <InputsSection />;
    case 'navigation':
      return <NavigationSection />;
    case 'feedback':
      return <FeedbackSection />;
    case 'data-display':
      return <DataDisplaySection />;
    default:
      return <TypographyDesignPage />;
  }
};

// Foundations section
const FoundationsSection: React.FC = () => (
  <div className="space-y-12">
    <section>
      <Heading variant="h1" className="mb-4">Design Foundations</Heading>
      <Text className="text-muted-foreground mb-8">Fundamental design tokens and patterns that establish our design language</Text>
      
      <Card>
        <CardHeader>
          <CardTitle>Design Tokens</CardTitle>
          <CardDescription>Core values that define our design system</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <CardTitle>Colors</CardTitle>
              </CardHeader>
              <CardContent>
                <Text>Primary, secondary, and semantic color palettes used throughout the interface.</Text>
              </CardContent>
              <CardFooter>
                <Button variant="outline" size="sm" onClick={() => document.getElementById('color')?.scrollIntoView({behavior: 'smooth'})}>
                  View Color System
                </Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Typography</CardTitle>
              </CardHeader>
              <CardContent>
                <Text>Text styles, headings, and font treatments that establish our typographic hierarchy.</Text>
              </CardContent>
              <CardFooter>
                <Button variant="outline" size="sm" onClick={() => document.getElementById('typography')?.scrollIntoView({behavior: 'smooth'})}>
                  View Typography
                </Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Spacing</CardTitle>
              </CardHeader>
              <CardContent>
                <Text>Consistent spacing scale used to create harmony in layout and component design.</Text>
              </CardContent>
              <CardFooter>
                <Button variant="outline" size="sm" onClick={() => document.getElementById('spacing')?.scrollIntoView({behavior: 'smooth'})}>
                  View Spacing
                </Button>
              </CardFooter>
            </Card>
          </div>
        </CardContent>
      </Card>
    </section>
    
    <SpacingSection />
  </div>
);

// Layout section
const LayoutSection: React.FC = () => (
  <div className="space-y-12">
    <section>
      <Heading variant="h1" className="mb-4">Layout</Heading>
      <Text className="text-muted-foreground mb-8">Fundamental layout components and patterns</Text>
      
      <div className="space-y-10">
        <Card>
          <CardHeader>
            <CardTitle>Cards</CardTitle>
            <CardDescription>Container components for organizing content</CardDescription>
          </CardHeader>
          <CardContent className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Standard Card</CardTitle>
                  <CardDescription>Default card with header and content</CardDescription>
                </CardHeader>
                <CardContent>
                  <Text>This is the main content area of the card.</Text>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline">Cancel</Button>
                  <Button>Submit</Button>
                </CardFooter>
              </Card>
              
              <Card className="border-primary">
                <CardHeader>
                  <CardTitle>Highlighted Card</CardTitle>
                  <CardDescription>With primary border emphasis</CardDescription>
                </CardHeader>
                <CardContent>
                  <Text>Used to emphasize important information.</Text>
                </CardContent>
              </Card>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Grid Layouts</CardTitle>
            <CardDescription>Responsive grid systems</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <Text className="font-medium">Basic Grid (3 Columns)</Text>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[1, 2, 3].map(i => (
                  <div key={i} className="bg-muted p-4 rounded flex items-center justify-center">
                    <Text>Grid Item {i}</Text>
                  </div>
                ))}
              </div>
              
              <Text className="font-medium mt-6">Responsive Grid (Variable Columns)</Text>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {[1, 2, 3, 4, 5, 6, 7, 8].map(i => (
                  <div key={i} className="bg-muted p-4 rounded flex items-center justify-center">
                    <Text>Item {i}</Text>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  </div>
);

// Inputs section
const InputsSection: React.FC = () => (
  <div className="space-y-12">
    <section>
      <Heading variant="h1" className="mb-4">Input Components</Heading>
      <Text className="text-muted-foreground mb-8">Form controls and user input components</Text>
      
      <div className="space-y-10">
        <Card>
          <CardHeader>
            <CardTitle>Text Inputs</CardTitle>
            <CardDescription>Components for text entry</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="default-input" className="mb-2 block">Default Input</Label>
                <Input
                  id="default-input"
                  placeholder="Enter your name"
                  className="max-w-sm"
                />
              </div>
              
              <div>
                <Label htmlFor="disabled-input" className="mb-2 block">Disabled Input</Label>
                <Input
                  id="disabled-input"
                  placeholder="This input is disabled"
                  disabled
                  className="max-w-sm"
                />
              </div>
              
              <div>
                <Label htmlFor="textarea-input" className="mb-2 block">Textarea</Label>
                <Textarea
                  id="textarea-input"
                  placeholder="Enter a description"
                  className="max-w-sm"
                />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Selection Inputs</CardTitle>
            <CardDescription>Components for making selections</CardDescription>
          </CardHeader>
          <CardContent className="space-y-8">
            <div className="space-y-2">
              <Text className="font-medium mb-2">Checkbox</Text>
              <div className="flex items-center space-x-2">
                <Checkbox id="terms" />
                <Label htmlFor="terms">Accept terms and conditions</Label>
              </div>
            </div>
            
            <div className="space-y-2">
              <Text className="font-medium mb-2">Switch</Text>
              <div className="flex items-center space-x-2">
                <Switch id="notifications" />
                <Label htmlFor="notifications">Enable notifications</Label>
              </div>
            </div>
            
            <div className="space-y-2">
              <Text className="font-medium mb-2">Select</Text>
              <div className="max-w-sm">
                <Select>
                  <SelectTrigger>
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
          </CardContent>
        </Card>
        
        <ButtonDesignPage />
      </div>
    </section>
  </div>
);

// Navigation section
const NavigationSection: React.FC = () => (
  <div className="space-y-12">
    <section>
      <Heading variant="h1" className="mb-4">Navigation Components</Heading>
      <Text className="text-muted-foreground mb-8">Components for navigating the interface</Text>
      
      <div className="space-y-10">
        <Card>
          <CardHeader>
            <CardTitle>Tabs</CardTitle>
            <CardDescription>Tabbed navigation for content organization</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="tab1">
              <TabsList>
                <TabsTrigger value="tab1">Tab 1</TabsTrigger>
                <TabsTrigger value="tab2">Tab 2</TabsTrigger>
                <TabsTrigger value="tab3">Tab 3</TabsTrigger>
              </TabsList>
              <TabsContent value="tab1" className="p-4 mt-2 border rounded-md">
                <Text>Tab 1 content. This demonstrates a basic tabbed interface.</Text>
              </TabsContent>
              <TabsContent value="tab2" className="p-4 mt-2 border rounded-md">
                <Text>Tab 2 content. Tabs are useful for organizing content into sections.</Text>
              </TabsContent>
              <TabsContent value="tab3" className="p-4 mt-2 border rounded-md">
                <Text>Tab 3 content. Only one tab is visible at a time.</Text>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </section>
  </div>
);

// Feedback section
const FeedbackSection: React.FC = () => (
  <div className="space-y-12">
    <section>
      <Heading variant="h1" className="mb-4">Feedback Components</Heading>
      <Text className="text-muted-foreground mb-8">Components for providing user feedback</Text>
      
      <div className="space-y-10">
        <Card>
          <CardHeader>
            <CardTitle>Alerts</CardTitle>
            <CardDescription>Informational and status messages</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Alert>
              <AlertTitle>Default Alert</AlertTitle>
              <AlertDescription>This is a standard alert message.</AlertDescription>
            </Alert>
            
            <Alert variant="destructive">
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>Something went wrong. Please try again.</AlertDescription>
            </Alert>
            
            <Alert className="bg-success/20 text-success">
              <AlertTitle>Success</AlertTitle>
              <AlertDescription>Your changes have been saved successfully.</AlertDescription>
            </Alert>
            
            <Alert className="bg-warning/20 text-warning">
              <AlertTitle>Warning</AlertTitle>
              <AlertDescription>Please review your information before continuing.</AlertDescription>
            </Alert>
          </CardContent>
        </Card>
      </div>
    </section>
  </div>
);

// Data display section
const DataDisplaySection: React.FC = () => (
  <div className="space-y-12">
    <section>
      <Heading variant="h1" className="mb-4">Data Display Components</Heading>
      <Text className="text-muted-foreground mb-8">Components for presenting information</Text>
      
      <div className="space-y-10">
        <Card>
          <CardHeader>
            <CardTitle>Badges</CardTitle>
            <CardDescription>Status indicators and labels</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              <Badge>Default</Badge>
              <Badge variant="secondary">Secondary</Badge>
              <Badge variant="outline">Outline</Badge>
              <Badge variant="destructive">Destructive</Badge>
              <Badge className="bg-success text-success-foreground">Success</Badge>
              <Badge className="bg-warning text-warning-foreground">Warning</Badge>
              <Badge className="bg-info text-info-foreground">Info</Badge>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Avatars</CardTitle>
            <CardDescription>User profile images and placeholders</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4">
              <Avatar>
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              
              <Avatar>
                <AvatarFallback>AB</AvatarFallback>
              </Avatar>
              
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  </div>
);

// Spacing section
const SpacingSection = () => (
  <section id="spacing" className="mb-16">
    <Heading variant="h2" className="mb-4">Spacing System</Heading>
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

// Main Design System Page
const DesignSystemPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState('foundations');
  
  // Handle initial hash in URL and section changes
  useEffect(() => {
    const hash = location.hash.replace('#', '');
    if (hash) {
      const category = COMPONENT_CATEGORIES.find(cat => cat.id === hash);
      if (category) {
        setActiveCategory(category.id);
      }
    }
  }, [location.hash]);
  
  // Handle clicking on a category
  const handleCategoryClick = (categoryId: string) => {
    setActiveCategory(categoryId);
    navigate(`/dashboard/design#${categoryId}`);
  };
  
  return (
    <div className="max-w-none pl-0">
      {/* Design System Introduction */}
      <div className="mb-8">
        <Heading variant="h1" className="mb-4">Design System</Heading>
        <Text className="text-muted-foreground">A comprehensive collection of design standards, components, and guidelines that ensure consistency across our product.</Text>
      </div>
      
      {/* Component Categories */}
      <div className="mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Component Categories</CardTitle>
            <CardDescription>Explore our design system by category</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {COMPONENT_CATEGORIES.map((category) => (
                <Button 
                  key={category.id}
                  variant={activeCategory === category.id ? 'default' : 'outline'}
                  onClick={() => handleCategoryClick(category.id)}
                  className="mb-2"
                >
                  {category.name}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Main content area with the active section */}
      <Card className="p-6 border-0 shadow-none rounded-none">
        <div id={activeCategory}>
          <ComponentShowcase categoryId={activeCategory} />
        </div>
      </Card>
    </div>
  );
};

export default DesignSystemPage; 