import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/Card';
import { Heading, Text } from '../../components/ui/typography';
import { Button } from '../../components/ui/button';

export const ButtonDesignPage: React.FC = () => {
  return (
    <div className="container mx-auto px-4">
      <div className="mb-8">
        <Heading variant="h1">Button</Heading>
        <Text className="text-muted-foreground">Interactive button components for user actions</Text>
      </div>
      
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
              
              <div>
                <Text className="font-medium mb-3">States</Text>
                <div className="flex flex-wrap gap-4">
                  <Button disabled>Disabled</Button>
                  <Button variant="outline" disabled>Disabled Outline</Button>
                  <Button className="pointer-events-none">
                    <svg className="mr-2 h-4 w-4 animate-spin" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Loading
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
              <Button size="icon" aria-label="Icon button">
                <svg 
                  className="h-4 w-4" 
                  xmlns="http://www.w3.org/2000/svg" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                >
                  <path d="M12 5v14M5 12h14" />
                </svg>
              </Button>
            </div>
          </CardContent>
        </Card>
        
        {/* Button with Icons */}
        <Card>
          <CardHeader>
            <CardTitle>Button with Icons</CardTitle>
            <CardDescription>Buttons enhanced with icons for better context</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div>
                <Text className="font-medium mb-3">Leading Icons</Text>
                <div className="flex flex-wrap gap-4">
                  <Button>
                    <svg className="mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    Add Item
                  </Button>
                  <Button variant="outline">
                    <svg className="mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    Back
                  </Button>
                </div>
              </div>
              
              <div>
                <Text className="font-medium mb-3">Trailing Icons</Text>
                <div className="flex flex-wrap gap-4">
                  <Button variant="default">
                    Next
                    <svg className="ml-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Button>
                  <Button variant="secondary">
                    Settings
                    <svg className="ml-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Usage Guidelines */}
        <Card>
          <CardHeader>
            <CardTitle>Usage Guidelines</CardTitle>
            <CardDescription>Best practices for button implementation</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <Text className="font-medium mb-2">Primary Actions</Text>
                <Text className="text-muted-foreground">Use default variant for primary actions that advance the user's workflow.</Text>
              </div>
              
              <div>
                <Text className="font-medium mb-2">Secondary Actions</Text>
                <Text className="text-muted-foreground">Use secondary or outline variants for less emphasized but still important actions.</Text>
              </div>
              
              <div>
                <Text className="font-medium mb-2">Tertiary Actions</Text>
                <Text className="text-muted-foreground">Use ghost or link variants for the least important actions or in tight spaces.</Text>
              </div>
              
              <div>
                <Text className="font-medium mb-2">Destructive Actions</Text>
                <Text className="text-muted-foreground">Use destructive variant for actions that can't be easily reversed like deletion.</Text>
              </div>
              
              <div>
                <Text className="font-medium mb-2">Button Text</Text>
                <Text className="text-muted-foreground">Use clear, concise, action-oriented labels. Start with a verb when possible.</Text>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}; 