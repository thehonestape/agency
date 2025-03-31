import React, { useState } from 'react';
import { useComponentRegistry } from '../lib/registry/component-registry';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../components/ui/tabs';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../components/ui/Card';
import { Heading, Text } from '../components/ui/typography';
import { Badge } from '../components/ui/badge';

const ComponentRegistry: React.FC = () => {
  const registry = useComponentRegistry();
  const [searchQuery, setSearchQuery] = useState('');
  
  // Get components by category
  const uiComponents = registry.getComponentsByCategory('ui');
  const patternComponents = registry.getComponentsByCategory('pattern');
  const blockComponents = registry.getComponentsByCategory('block');
  const pageComponents = registry.getComponentsByCategory('page');
  const coreComponents = registry.getComponentsByCategory('core');
  
  // Handle search
  const filteredComponents = searchQuery 
    ? registry.searchComponents(searchQuery)
    : [];
  
  const renderComponentCard = (item: any) => {
    const ComponentPreview = item.component;
    return (
      <Card key={item.metadata.id} className="mb-4">
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle>{item.metadata.name}</CardTitle>
              <CardDescription>{item.metadata.description}</CardDescription>
            </div>
            <Badge>{item.metadata.category}</Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="mb-2">
            {item.metadata.tags.map((tag: string) => (
              <Badge key={tag} variant="outline" className="mr-1 mb-1">{tag}</Badge>
            ))}
          </div>
          
          <div className="border p-4 rounded-md bg-card/50 mb-4">
            {item.metadata.example ? (
              item.metadata.example
            ) : (
              <div className="p-2 text-center text-muted-foreground">
                <Text>No preview available</Text>
              </div>
            )}
          </div>
          
          <Text className="text-xs text-muted-foreground">
            Component ID: {item.metadata.id}
          </Text>
        </CardContent>
      </Card>
    );
  };
  
  // Render component list by category
  const renderComponentList = (components: any[]) => {
    if (components.length === 0) {
      return (
        <div className="p-4 text-center">
          <Text>No components found in this category</Text>
        </div>
      );
    }
    
    return components.map(renderComponentCard);
  };
  
  return (
    <div className="container mx-auto py-8">
      <div className="mb-8">
        <Heading level={1}>Component Registry</Heading>
        <Text className="text-muted-foreground">
          Browse and explore all registered components in the system
        </Text>
      </div>
      
      <div className="mb-8">
        <div className="flex gap-4">
          <Input
            placeholder="Search components..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="max-w-md"
          />
          <Button variant="ghost" onClick={() => setSearchQuery('')}>
            Clear
          </Button>
        </div>
        
        {searchQuery && (
          <div className="mt-4">
            <Heading level={3}>Search Results</Heading>
            <Text className="text-muted-foreground">
              Found {filteredComponents.length} components matching "{searchQuery}"
            </Text>
            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredComponents.map(renderComponentCard)}
            </div>
          </div>
        )}
      </div>
      
      {!searchQuery && (
        <Tabs defaultValue="ui">
          <TabsList className="mb-4">
            <TabsTrigger value="ui">UI Components ({uiComponents.length})</TabsTrigger>
            <TabsTrigger value="pattern">Patterns ({patternComponents.length})</TabsTrigger>
            <TabsTrigger value="block">Blocks ({blockComponents.length})</TabsTrigger>
            <TabsTrigger value="page">Pages ({pageComponents.length})</TabsTrigger>
            <TabsTrigger value="core">Core ({coreComponents.length})</TabsTrigger>
          </TabsList>
          
          <TabsContent value="ui" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {renderComponentList(uiComponents)}
          </TabsContent>
          
          <TabsContent value="pattern" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {renderComponentList(patternComponents)}
          </TabsContent>
          
          <TabsContent value="block" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {renderComponentList(blockComponents)}
          </TabsContent>
          
          <TabsContent value="page" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {renderComponentList(pageComponents)}
          </TabsContent>
          
          <TabsContent value="core" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {renderComponentList(coreComponents)}
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
};

export default ComponentRegistry; 