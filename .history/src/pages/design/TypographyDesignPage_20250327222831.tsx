import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/Card';
import { Heading, Text } from '../../components/ui/typography';

export const TypographyDesignPage: React.FC = () => {
  return (
    <div className="container mx-auto px-4">
      <div className="mb-8">
        <Heading variant="h1">Typography</Heading>
        <Text className="text-muted-foreground">Text styles and hierarchies in the design system</Text>
      </div>
      
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
        
        {/* Font styles */}
        <Card>
          <CardHeader>
            <CardTitle>Font Weights</CardTitle>
            <CardDescription>Various text weights available in the system</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-muted/20 rounded-md">
                <Text className="font-light">Light (300): The quick brown fox jumps over the lazy dog</Text>
              </div>
              <div className="p-4 bg-muted/20 rounded-md">
                <Text className="font-normal">Regular (400): The quick brown fox jumps over the lazy dog</Text>
              </div>
              <div className="p-4 bg-muted/20 rounded-md">
                <Text className="font-medium">Medium (500): The quick brown fox jumps over the lazy dog</Text>
              </div>
              <div className="p-4 bg-muted/20 rounded-md">
                <Text className="font-semibold">Semibold (600): The quick brown fox jumps over the lazy dog</Text>
              </div>
              <div className="p-4 bg-muted/20 rounded-md">
                <Text className="font-bold">Bold (700): The quick brown fox jumps over the lazy dog</Text>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}; 