import { useState, useEffect } from 'react';
import { SideNav } from '@/components/patterns/navigation/SideNav';
import { TopBar } from '@/components/patterns/navigation/TopBar';
import { FiBell } from 'react-icons/fi';
import ComponentView from '@/components/ui/ComponentView';
import { useComponentRegistry } from '@/lib/discovery/ComponentRegistry';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/button';
import { Heading, Text } from '@/components/ui/typography';

// Define the sections that will be in the design system
const sections = [
  { id: 'overview', label: 'Overview' },
  { id: 'components', label: 'Components' },
  { id: 'patterns', label: 'Patterns' },
  { id: 'templates', label: 'Templates' }
];

// Convert sections to navigation items for SideNav
const navItems = [
  {
    label: 'Design System',
    items: sections.map(section => ({
      label: section.label,
      href: `#${section.id}`,
      active: false
    }))
  }
];

export default function DesignSystem() {
  const [activeSection, setActiveSection] = useState<string>(sections[0].id);
  const [navigationItems, setNavigationItems] = useState(navItems);
  const componentRegistry = useComponentRegistry();

  // Get component categories
  const components = componentRegistry.getAll();
  const categories = [...new Set(components.map(c => c.metadata.category))].sort();

  // Handle scroll to section
  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    
    // Update active state in navigation
    const updatedNavItems = navItems.map(group => ({
      ...group,
      items: group.items.map(item => ({
        ...item,
        active: item.href === `#${sectionId}`
      }))
    }));
    setNavigationItems(updatedNavItems);
    
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    
    // Update URL hash without causing a page reload
    window.history.pushState(null, '', `#${sectionId}`);
  };

  // Set the active section based on the URL hash on initial load
  useEffect(() => {
    const hash = window.location.hash.replace('#', '');
    if (hash && sections.some(section => section.id === hash)) {
      setActiveSection(hash);
      
      // Update active state in navigation
      const updatedNavItems = navItems.map(group => ({
        ...group,
        items: group.items.map(item => ({
          ...item,
          active: item.href === `#${hash}`
        }))
      }));
      setNavigationItems(updatedNavItems);
      
      const element = document.getElementById(hash);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, []);

  // User profile section for the top bar
  const userProfile = (
    <div className="flex items-center space-x-4">
      <button 
        className="p-1 rounded-full text-muted-foreground hover:text-foreground"
        aria-label="View notifications"
      >
        <FiBell className="w-6 h-6" />
      </button>
      <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center">
        <span className="font-medium text-sm text-foreground">AB</span>
      </div>
    </div>
  );

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <SideNav items={navigationItems} />
      
      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <TopBar title="Workhorse Design System" rightContent={userProfile} />
        
        <main className="flex-1 overflow-y-auto">
          <div className="px-8 py-8 space-y-16">
            {/* Overview Section */}
            <section id="overview" className="scroll-mt-16">
              <Heading variant="h1" className="text-3xl font-bold mb-4">Workhorse Design</Heading>
              <Text className="text-lg text-muted-foreground mb-8">
                Our design system provides a comprehensive set of guidelines, components, and patterns 
                to create consistent and cohesive user experiences across all our products.
              </Text>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Components</CardTitle>
                    <CardDescription>Foundational UI elements</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Text>Our component library contains {components.length} reusable UI components across {categories.length} categories.</Text>
                    <Button 
                      className="mt-4" 
                      variant="outline" 
                      onClick={() => scrollToSection('components')}
                    >
                      Browse Components
                    </Button>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Patterns</CardTitle>
                    <CardDescription>Common UI patterns</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Text>Design patterns solve common interaction problems with consistent solutions.</Text>
                    <Button 
                      className="mt-4" 
                      variant="outline" 
                      onClick={() => scrollToSection('patterns')}
                    >
                      View Patterns
                    </Button>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Templates</CardTitle>
                    <CardDescription>Page layouts and structures</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Text>Pre-built page templates help maintain consistency across different page types.</Text>
                    <Button 
                      className="mt-4" 
                      variant="outline" 
                      onClick={() => scrollToSection('templates')}
                    >
                      Explore Templates
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </section>

            {/* Components Section using ComponentView */}
            <section id="components" className="scroll-mt-16">
              <ComponentView 
                title="Component Library"
                description="Browse and explore our UI component system"
                initialTab="registry"
                showRegistryTab={true}
              />
            </section>

            {/* Patterns Section */}
            <section id="patterns" className="scroll-mt-16">
              <Heading variant="h2" className="text-2xl font-semibold mb-4">Design Patterns</Heading>
              <Text className="text-muted-foreground mb-6">Common UI patterns for solving recurring design problems</Text>
              
              <Tabs defaultValue="navigation">
                <TabsList>
                  <TabsTrigger value="navigation">Navigation</TabsTrigger>
                  <TabsTrigger value="forms">Forms</TabsTrigger>
                  <TabsTrigger value="data">Data Display</TabsTrigger>
                  <TabsTrigger value="feedback">Feedback</TabsTrigger>
                </TabsList>
                
                <TabsContent value="navigation" className="mt-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card>
                      <CardHeader>
                        <CardTitle>Sidebar Navigation</CardTitle>
                        <CardDescription>Dashboard sidebar pattern</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="bg-muted rounded-md p-4 h-60 flex items-center justify-center">
                          <Text className="text-muted-foreground">Sidebar Navigation Pattern</Text>
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardHeader>
                        <CardTitle>Tabbed Navigation</CardTitle>
                        <CardDescription>Content organization with tabs</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="bg-muted rounded-md p-4 h-60 flex items-center justify-center">
                          <Text className="text-muted-foreground">Tabbed Navigation Pattern</Text>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>
                
                <TabsContent value="forms" className="mt-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card>
                      <CardHeader>
                        <CardTitle>Multi-Step Form</CardTitle>
                        <CardDescription>Complex form divided into steps</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="bg-muted rounded-md p-4 h-60 flex items-center justify-center">
                          <Text className="text-muted-foreground">Multi-Step Form Pattern</Text>
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardHeader>
                        <CardTitle>Form Validation</CardTitle>
                        <CardDescription>Input validation patterns</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="bg-muted rounded-md p-4 h-60 flex items-center justify-center">
                          <Text className="text-muted-foreground">Form Validation Pattern</Text>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>
                
                <TabsContent value="data" className="mt-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card>
                      <CardHeader>
                        <CardTitle>Data Table</CardTitle>
                        <CardDescription>Table with sorting and pagination</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="bg-muted rounded-md p-4 h-60 flex items-center justify-center">
                          <Text className="text-muted-foreground">Data Table Pattern</Text>
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardHeader>
                        <CardTitle>Data Cards</CardTitle>
                        <CardDescription>Card-based data display</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="bg-muted rounded-md p-4 h-60 flex items-center justify-center">
                          <Text className="text-muted-foreground">Data Cards Pattern</Text>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>
                
                <TabsContent value="feedback" className="mt-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card>
                      <CardHeader>
                        <CardTitle>Notifications</CardTitle>
                        <CardDescription>User notification patterns</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="bg-muted rounded-md p-4 h-60 flex items-center justify-center">
                          <Text className="text-muted-foreground">Notification Pattern</Text>
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardHeader>
                        <CardTitle>Loading States</CardTitle>
                        <CardDescription>Content loading indicators</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="bg-muted rounded-md p-4 h-60 flex items-center justify-center">
                          <Text className="text-muted-foreground">Loading State Pattern</Text>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>
              </Tabs>
            </section>
            
            {/* Templates Section */}
            <section id="templates" className="scroll-mt-16">
              <Heading variant="h2" className="text-2xl font-semibold mb-4">Page Templates</Heading>
              <Text className="text-muted-foreground mb-6">Pre-built page layouts for common scenarios</Text>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Dashboard Template</CardTitle>
                    <CardDescription>Application dashboard layout</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-muted rounded-md p-4 h-60 flex items-center justify-center">
                      <Text className="text-muted-foreground">Dashboard Layout Template</Text>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Landing Page</CardTitle>
                    <CardDescription>Marketing landing page layout</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-muted rounded-md p-4 h-60 flex items-center justify-center">
                      <Text className="text-muted-foreground">Landing Page Template</Text>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Detail Page</CardTitle>
                    <CardDescription>Item detail view layout</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-muted rounded-md p-4 h-60 flex items-center justify-center">
                      <Text className="text-muted-foreground">Detail Page Template</Text>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Settings Page</CardTitle>
                    <CardDescription>Application settings layout</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-muted rounded-md p-4 h-60 flex items-center justify-center">
                      <Text className="text-muted-foreground">Settings Page Template</Text>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
} 