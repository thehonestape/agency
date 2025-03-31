import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './tabs';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from './Card';
import { Button } from './button';
import { Input } from './input';
import { Heading, Text } from './typography';
import { Badge } from './badge';
import { useComponentRegistry } from '../../lib/discovery/ComponentRegistry';

interface ComponentViewProps {
  initialTab?: string;
  initialSearchTerm?: string;
  showRegistryTab?: boolean;
  title?: string;
  description?: string;
}

/**
 * A reusable component view for displaying UI components
 * Can be configured to show different tabs and initial states
 */
const ComponentView: React.FC<ComponentViewProps> = ({
  initialTab = 'registry',
  initialSearchTerm = '',
  showRegistryTab = true,
  title = 'Component Explorer',
  description = 'Browse and test our collection of UI components'
}) => {
  const componentRegistry = useComponentRegistry();
  const [searchTerm, setSearchTerm] = useState(initialSearchTerm);
  
  // Get all components from registry
  const registeredComponents = componentRegistry.getAll();
  
  // Filter components based on search term
  const filteredComponents = searchTerm.length > 0
    ? componentRegistry.search(searchTerm)
    : registeredComponents;
  
  // Group components by category
  const componentsByCategory = filteredComponents.reduce((acc, component) => {
    const category = component.metadata.category || 'Uncategorized';
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(component);
    return acc;
  }, {} as Record<string, typeof filteredComponents>);
  
  // Sort categories alphabetically
  const sortedCategories = Object.keys(componentsByCategory).sort();
  
  return (
    <div className="space-y-6">
      <div>
        <Heading variant="h1" className="text-3xl font-bold">{title}</Heading>
        <Text className="text-muted-foreground">{description}</Text>
      </div>
      
      <Tabs defaultValue={initialTab}>
        <TabsList>
          {showRegistryTab && <TabsTrigger value="registry">Registry</TabsTrigger>}
          <TabsTrigger value="buttons">Buttons</TabsTrigger>
          <TabsTrigger value="inputs">Inputs</TabsTrigger>
          <TabsTrigger value="data-display">Data Display</TabsTrigger>
          <TabsTrigger value="feedback">Feedback</TabsTrigger>
          <TabsTrigger value="navigation">Navigation</TabsTrigger>
        </TabsList>
        
        {showRegistryTab && (
          <TabsContent value="registry" className="mt-6">
            <div className="space-y-6">
              <div className="max-w-md">
                <Input 
                  placeholder="Search components..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              {searchTerm && (
                <Text className="text-sm">Found {filteredComponents.length} components matching "{searchTerm}"</Text>
              )}
              
              {sortedCategories.length === 0 ? (
                <div className="p-6 text-center border rounded-md bg-card">
                  <Text>No components found in the registry.</Text>
                </div>
              ) : (
                <div className="space-y-8">
                  {sortedCategories.map((category) => (
                    <div key={category} className="space-y-4">
                      <Heading variant="h2">{category}</Heading>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {componentsByCategory[category].map((component) => (
                          <Card key={component.id} className="h-full">
                            <CardHeader>
                              <CardTitle className="flex justify-between items-start">
                                <span>{component.metadata.name}</span>
                                <Badge variant="outline">{component.descriptor.type}</Badge>
                              </CardTitle>
                              {component.metadata.description && (
                                <CardDescription>{component.metadata.description}</CardDescription>
                              )}
                            </CardHeader>
                            <CardContent className="space-y-4">
                              {component.metadata.tags && component.metadata.tags.length > 0 && (
                                <div className="flex flex-wrap gap-1">
                                  {component.metadata.tags.map(tag => (
                                    <Badge key={tag} variant="secondary" className="text-xs">{tag}</Badge>
                                  ))}
                                </div>
                              )}
                              <div className="text-xs text-muted-foreground space-y-1">
                                <div><strong>ID:</strong> {component.id}</div>
                                {component.metadata.version && (
                                  <div><strong>Version:</strong> {component.metadata.version}</div>
                                )}
                                {component.metadata.author && (
                                  <div><strong>Author:</strong> {component.metadata.author}</div>
                                )}
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </TabsContent>
        )}
        
        <TabsContent value="buttons" className="mt-6">
          <div className="grid lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Button Variants</CardTitle>
                <CardDescription>Different button styles for various purposes</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-wrap gap-4">
                  <Button variant="default">Default</Button>
                  <Button variant="secondary">Secondary</Button>
                  <Button variant="outline">Outline</Button>
                  <Button variant="ghost">Ghost</Button>
                  <Button variant="link">Link</Button>
                  <Button variant="destructive">Destructive</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        {/* Other tab contents would go here */}
        <TabsContent value="inputs" className="mt-6">
          <div className="grid lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Input Elements</CardTitle>
                <CardDescription>Form input components</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Input placeholder="Standard input" />
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ComponentView; 