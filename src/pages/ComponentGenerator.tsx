import React, { useState, useEffect, useMemo } from 'react';
import { useTheme } from '../lib/theme-context';
import { ComponentDescriptor, generateComponent } from '../lib/component-generator';
import { Theme } from '../lib/theme-registry';
import { salientTheme } from '../lib/theme-adapters/salient-adapter';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { ScrollArea } from '../components/ui/ScrollArea';

const initialDescriptor: ComponentDescriptor = {
  type: 'block',
  name: 'TestComponent',
  tag: 'div',
  layout: {
    display: 'flex',
    direction: 'column',
    align: 'center',
    justify: 'center',
    gap: 'md',
    padding: 'lg'
  },
  style: {
    width: 'full',
    borderRadius: 'md',
    shadow: 'md',
    backgroundColor: '#f9f9f9'
  },
  children: [
    {
      type: 'element',
      name: 'Heading',
      tag: 'h2',
      style: {
        color: '#333'
      },
      children: 'Generated Component'
    },
    {
      type: 'element',
      name: 'Description',
      tag: 'p',
      style: {
        color: '#666'
      },
      children: 'This component was generated from a descriptor'
    },
    {
      type: 'element',
      name: 'Button',
      tag: 'button',
      layout: {
        padding: 'md'
      },
      style: {
        backgroundColor: '#4F46E5',
        color: 'white',
        borderRadius: 'md'
      },
      behavior: {
        interactive: true
      },
      children: 'Click Me'
    }
  ]
};

const ComponentGenerator: React.FC = () => {
  const { currentTheme, isLoading } = useTheme();
  const [descriptor, setDescriptor] = useState<ComponentDescriptor>(initialDescriptor);
  const [generatedComponent, setGeneratedComponent] = useState<React.FC<any> | null>(null);
  const [descriptorJson, setDescriptorJson] = useState<string>(
    JSON.stringify(initialDescriptor, null, 2)
  );
  const [imageUrl, setImageUrl] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  
  // Use a fallback theme if the current theme is not loaded yet
  const activeTheme = useMemo<Theme>(() => {
    return currentTheme || salientTheme;
  }, [currentTheme]);
  
  useEffect(() => {
    console.log("Theme state:", { currentTheme, isLoading, activeTheme });
    
    try {
      // Update JSON representation
      setDescriptorJson(JSON.stringify(descriptor, null, 2));
      
      // Generate component from descriptor using activeTheme (which is either currentTheme or fallback)
      const component = generateComponent(descriptor, activeTheme);
      console.log("Generated component:", component.displayName);
      setGeneratedComponent(component);
    } catch (error) {
      console.error('Error generating component:', error);
      setGeneratedComponent(null);
    }
  }, [descriptor, activeTheme]);
  
  const handleJsonChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    try {
      const newDescriptor = JSON.parse(e.target.value);
      setDescriptorJson(e.target.value);
      setDescriptor(newDescriptor);
    } catch (error) {
      // Invalid JSON, just update the text
      setDescriptorJson(e.target.value);
    }
  };
  
  const handleImageSubmit = async () => {
    if (!imageUrl) return;
    
    setLoading(true);
    try {
      // This would call the AI-powered image analysis in a real implementation
      // For now, we'll just create a mock placeholder component
      const mockDescriptor: ComponentDescriptor = {
        type: 'block',
        name: 'ImageGeneratedComponent',
        tag: 'div',
        layout: {
          display: 'flex',
          direction: 'column',
          align: 'center',
          justify: 'center',
          gap: 'md',
          padding: 'lg'
        },
        style: {
          width: 'full',
          borderRadius: 'md',
          shadow: 'md',
          backgroundColor: '#f5f7f9'
        },
        children: [
          {
            type: 'element',
            name: 'Heading',
            tag: 'h2',
            style: {
              color: '#333'
            },
            children: 'Component Generated from Image'
          },
          {
            type: 'element',
            name: 'ImagePreview',
            tag: 'img',
            props: {
              src: imageUrl,
              alt: 'Generated from this image'
            },
            style: {
              width: 'full',
              borderRadius: 'md'
            }
          },
          {
            type: 'element',
            name: 'Description',
            tag: 'p',
            style: {
              color: '#666'
            },
            children: 'This component was generated from an image input'
          }
        ]
      };
      
      setDescriptor(mockDescriptor);
      setDescriptorJson(JSON.stringify(mockDescriptor, null, 2));
    } catch (error) {
      console.error('Error generating from image:', error);
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Component Generator</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <Tabs defaultValue="json">
            <TabsList>
              <TabsTrigger value="json">JSON Editor</TabsTrigger>
              <TabsTrigger value="image">Image to Component</TabsTrigger>
            </TabsList>
            
            <TabsContent value="json" className="space-y-4">
              <Card variant="default">
                <div className="p-4">
                  <h2 className="text-xl font-semibold mb-2">Component Descriptor</h2>
                  <ScrollArea className="h-[500px] w-full">
                    <textarea
                      className="w-full h-[480px] font-mono text-sm p-4 bg-muted rounded-md"
                      value={descriptorJson}
                      onChange={handleJsonChange}
                      aria-label="Component descriptor JSON editor"
                    />
                  </ScrollArea>
                </div>
              </Card>
            </TabsContent>
            
            <TabsContent value="image" className="space-y-4">
              <Card variant="default">
                <div className="p-4">
                  <h2 className="text-xl font-semibold mb-2">Generate from Image</h2>
                  <div className="space-y-4">
                    <Input
                      type="text"
                      placeholder="Enter image URL"
                      value={imageUrl}
                      onChange={(e) => setImageUrl(e.target.value)}
                    />
                    
                    <Button 
                      onClick={handleImageSubmit}
                      disabled={!imageUrl || loading}
                      loading={loading}
                    >
                      Generate Component
                    </Button>
                    
                    {imageUrl && (
                      <div className="mt-4">
                        <p className="text-sm mb-2">Preview:</p>
                        <img 
                          src={imageUrl} 
                          alt="Preview" 
                          className="max-w-full max-h-[300px] rounded-md"
                          onError={(e) => {
                            e.currentTarget.src = 'https://placehold.co/600x400?text=Invalid+Image+URL';
                          }}
                        />
                      </div>
                    )}
                  </div>
                </div>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
        
        <div>
          <Card variant="default">
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-2">Preview</h2>
              <div className="border rounded-md p-6 min-h-[500px] bg-white relative">
                {generatedComponent ? (
                  <div className={isLoading ? "opacity-70" : ""}>
                    {(() => {
                      try {
                        return React.createElement(generatedComponent);
                      } catch (error) {
                        console.error("Error rendering component:", error);
                        return (
                          <div className="p-4 bg-red-50 text-red-800 rounded-md">
                            <h3 className="font-semibold">Render Error</h3>
                            <p>Something went wrong while rendering the component</p>
                          </div>
                        );
                      }
                    })()}
                    {isLoading && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black/10 rounded-md">
                        <p className="bg-white px-4 py-2 rounded-md shadow-md">
                          Using preview theme (loading actual theme...)
                        </p>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <p className="text-muted-foreground">
                      Generate a component to see preview
                    </p>
                  </div>
                )}
              </div>
            </div>
          </Card>
        </div>
      </div>
      
      <div className="mt-8">
        <Card variant="default">
          <div className="p-4">
            <h2 className="text-xl font-semibold mb-2">How It Works</h2>
            <div className="space-y-2">
              <p>This component generator allows you to:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Define components using a JSON descriptor</li>
                <li>Generate UI components from images (simulated)</li>
                <li>Preview components in real-time</li>
                <li>Adjust properties and see changes instantly</li>
              </ul>
              <p className="mt-4">
                In a production version, this could be integrated with AI services to analyze images 
                and generate component code automatically.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default ComponentGenerator; 