import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/Card';
import { Heading, Text } from '../components/ui/typography';
import { cn } from '../lib/utils';

interface DesignNavItemProps {
  title: string;
  active: boolean;
  onClick: () => void;
  children?: React.ReactNode;
}

const DesignNavItem: React.FC<DesignNavItemProps> = ({ title, active, onClick, children }) => {
  const [isOpen, setIsOpen] = useState(!!active);
  
  const handleClick = () => {
    onClick();
    if (children) {
      setIsOpen(!isOpen);
    }
  };
  
  return (
    <div className="mb-2">
      <div 
        className={cn(
          "flex items-center px-3 py-2 rounded-md cursor-pointer font-medium text-sm",
          active 
            ? "bg-primary text-primary-foreground" 
            : "hover:bg-muted text-muted-foreground hover:text-foreground"
        )}
        onClick={handleClick}
      >
        <span>{title}</span>
        {children && (
          <svg 
            className={`ml-auto h-4 w-4 transition-transform ${isOpen ? 'transform rotate-180' : ''}`} 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 24 24"
          >
            <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m6 9 6 6 6-6"/>
          </svg>
        )}
      </div>
      
      {children && isOpen && (
        <div className="pl-4 mt-1 space-y-1">
          {children}
        </div>
      )}
    </div>
  );
};

interface DesignNavSubItemProps {
  title: string;
  active: boolean;
  onClick: () => void;
}

const DesignNavSubItem: React.FC<DesignNavSubItemProps> = ({ title, active, onClick }) => {
  return (
    <div 
      className={cn(
        "px-3 py-1.5 rounded-md cursor-pointer text-sm",
        active 
          ? "bg-muted text-foreground font-medium" 
          : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
      )}
      onClick={onClick}
    >
      {title}
    </div>
  );
};

// Sample content components
const TypographyHeadings = () => (
  <>
    <Heading variant="h1" className="mb-4">Typography - Headings</Heading>
    <Text className="mb-6">Headings provide hierarchical structure to your content.</Text>
    
    <div className="space-y-8">
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
    </div>
  </>
);

const TypographyParagraphs = () => (
  <>
    <Heading variant="h1" className="mb-4">Typography - Paragraphs</Heading>
    <Text className="mb-6">Text components for body content and descriptions.</Text>
    
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Large Text</CardTitle>
          <CardDescription>Used for introductory paragraphs</CardDescription>
        </CardHeader>
        <CardContent>
          <Text className="text-lg">This is a large paragraph text meant for introductory sections, hero areas, or anywhere you need to emphasize body text.</Text>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Standard Text</CardTitle>
          <CardDescription>Default paragraph size</CardDescription>
        </CardHeader>
        <CardContent>
          <Text>This is the standard paragraph text used throughout the application for most content blocks. It provides good readability for longer form content.</Text>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Small Text</CardTitle>
          <CardDescription>Used for secondary information</CardDescription>
        </CardHeader>
        <CardContent>
          <Text className="text-sm">This smaller text is used for secondary information, metadata, captions, and footer content.</Text>
        </CardContent>
      </Card>
    </div>
  </>
);

const ColorPalette = () => (
  <>
    <Heading variant="h1" className="mb-4">Color - Primary Palette</Heading>
    <Text className="mb-6">Core colors that define the brand identity.</Text>
    
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <div className="rounded-lg overflow-hidden shadow-md">
        <div className="h-32 bg-primary"></div>
        <div className="p-3 bg-card">
          <Heading variant="h4" className="mb-1">Primary</Heading>
          <Text className="text-sm text-muted-foreground">Main brand color</Text>
        </div>
      </div>
      
      <div className="rounded-lg overflow-hidden shadow-md">
        <div className="h-32 bg-secondary"></div>
        <div className="p-3 bg-card">
          <Heading variant="h4" className="mb-1">Secondary</Heading>
          <Text className="text-sm text-muted-foreground">Supporting brand color</Text>
        </div>
      </div>
      
      <div className="rounded-lg overflow-hidden shadow-md">
        <div className="h-32 bg-accent"></div>
        <div className="p-3 bg-card">
          <Heading variant="h4" className="mb-1">Accent</Heading>
          <Text className="text-sm text-muted-foreground">For highlights and emphasis</Text>
        </div>
      </div>
    </div>
  </>
);

const ColorSemantics = () => (
  <>
    <Heading variant="h1" className="mb-4">Color - Semantic Colors</Heading>
    <Text className="mb-6">Colors that convey meaning and state.</Text>
    
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <div className="rounded-lg overflow-hidden shadow-md">
        <div className="h-24 bg-success"></div>
        <div className="p-3 bg-card">
          <Heading variant="h4" className="mb-1">Success</Heading>
          <Text className="text-sm text-muted-foreground">Positive actions</Text>
        </div>
      </div>
      
      <div className="rounded-lg overflow-hidden shadow-md">
        <div className="h-24 bg-warning"></div>
        <div className="p-3 bg-card">
          <Heading variant="h4" className="mb-1">Warning</Heading>
          <Text className="text-sm text-muted-foreground">Caution required</Text>
        </div>
      </div>
      
      <div className="rounded-lg overflow-hidden shadow-md">
        <div className="h-24 bg-destructive"></div>
        <div className="p-3 bg-card">
          <Heading variant="h4" className="mb-1">Destructive</Heading>
          <Text className="text-sm text-muted-foreground">Error states</Text>
        </div>
      </div>
      
      <div className="rounded-lg overflow-hidden shadow-md">
        <div className="h-24 bg-info"></div>
        <div className="p-3 bg-card">
          <Heading variant="h4" className="mb-1">Info</Heading>
          <Text className="text-sm text-muted-foreground">Informational</Text>
        </div>
      </div>
    </div>
  </>
);

const SpacingSystem = () => (
  <>
    <Heading variant="h1" className="mb-4">Spacing System</Heading>
    <Text className="mb-6">Consistent spacing enhances readability and visual hierarchy.</Text>
    
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Spacing Scale</CardTitle>
          <CardDescription>Based on a 4px increment system</CardDescription>
        </CardHeader>
        <CardContent>
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
          </div>
        </CardContent>
      </Card>
    </div>
  </>
);

const DesignSystemPage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('typography');
  const [activeSubcategory, setActiveSubcategory] = useState('headings');
  
  // Generate a key for each menu item
  const getItemKey = (category: string, subcategory: string = '') => {
    return subcategory ? `${category}.${subcategory}` : category;
  };
  
  // Handle menu item clicks
  const handleItemClick = (category: string, subcategory?: string) => {
    setActiveCategory(category);
    if (subcategory) {
      setActiveSubcategory(subcategory);
    } else {
      // Set default subcategory for each category
      switch (category) {
        case 'typography':
          setActiveSubcategory('headings');
          break;
        case 'color':
          setActiveSubcategory('palette');
          break;
        case 'spacing':
          setActiveSubcategory('system');
          break;
        default:
          setActiveSubcategory('');
      }
    }
  };
  
  // Render the appropriate content based on active category and subcategory
  const renderContent = () => {
    const key = getItemKey(activeCategory, activeSubcategory);
    
    switch (key) {
      case 'typography.headings':
        return <TypographyHeadings />;
      case 'typography.paragraphs':
        return <TypographyParagraphs />;
      case 'color.palette':
        return <ColorPalette />;
      case 'color.semantics':
        return <ColorSemantics />;
      case 'spacing.system':
        return <SpacingSystem />;
      default:
        return <TypographyHeadings />;
    }
  };
  
  return (
    <div className="container mx-auto px-4">
      <div className="mb-8">
        <Heading variant="h1">Design System</Heading>
        <Text className="text-muted-foreground">Guidelines and components for consistent design</Text>
      </div>
      
      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar navigation */}
        <div className="md:w-64 flex-shrink-0">
          <Card>
            <CardContent className="p-4">
              <DesignNavItem 
                title="Typography" 
                active={activeCategory === 'typography'}
                onClick={() => handleItemClick('typography')}
              >
                <DesignNavSubItem
                  title="Headings"
                  active={activeCategory === 'typography' && activeSubcategory === 'headings'}
                  onClick={() => handleItemClick('typography', 'headings')}
                />
                <DesignNavSubItem
                  title="Paragraphs"
                  active={activeCategory === 'typography' && activeSubcategory === 'paragraphs'}
                  onClick={() => handleItemClick('typography', 'paragraphs')}
                />
              </DesignNavItem>
              
              <DesignNavItem 
                title="Color" 
                active={activeCategory === 'color'}
                onClick={() => handleItemClick('color')}
              >
                <DesignNavSubItem
                  title="Primary Palette"
                  active={activeCategory === 'color' && activeSubcategory === 'palette'}
                  onClick={() => handleItemClick('color', 'palette')}
                />
                <DesignNavSubItem
                  title="Semantic Colors"
                  active={activeCategory === 'color' && activeSubcategory === 'semantics'}
                  onClick={() => handleItemClick('color', 'semantics')}
                />
              </DesignNavItem>
              
              <DesignNavItem 
                title="Spacing" 
                active={activeCategory === 'spacing'}
                onClick={() => handleItemClick('spacing')}
              >
                <DesignNavSubItem
                  title="Spacing System"
                  active={activeCategory === 'spacing' && activeSubcategory === 'system'}
                  onClick={() => handleItemClick('spacing', 'system')}
                />
              </DesignNavItem>
              
              <DesignNavItem 
                title="Iconography" 
                active={activeCategory === 'iconography'}
                onClick={() => handleItemClick('iconography')}
              />
              
              <DesignNavItem 
                title="Motion" 
                active={activeCategory === 'motion'}
                onClick={() => handleItemClick('motion')}
              />
              
              <DesignNavItem 
                title="Patterns" 
                active={activeCategory === 'patterns'}
                onClick={() => handleItemClick('patterns')}
              />
            </CardContent>
          </Card>
        </div>
        
        {/* Main content area */}
        <div className="flex-1">
          <Card>
            <CardContent className="p-6">
              {renderContent()}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DesignSystemPage; 