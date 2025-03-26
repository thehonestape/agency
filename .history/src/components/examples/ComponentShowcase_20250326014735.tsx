import React, { useState } from 'react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  Button,
} from '@/components/ui';

import {
  FormControlsExample,
  BasicComponentsExample,
  LayoutExamples,
  TypographySystem,
  ThemeEditor,
} from '@/components/examples';

export function ComponentShowcase() {
  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8">Component Showcase</h1>
      
      <Tabs defaultValue="typography" className="w-full">
        <TabsList className="grid grid-cols-5 mb-8">
          <TabsTrigger value="typography">Typography</TabsTrigger>
          <TabsTrigger value="basic">Basic UI</TabsTrigger>
          <TabsTrigger value="forms">Form Controls</TabsTrigger>
          <TabsTrigger value="layouts">Layouts</TabsTrigger>
          <TabsTrigger value="theme">Theme Editor</TabsTrigger>
        </TabsList>
        
        <TabsContent value="typography" className="space-y-8">
          <TypographySystem />
        </TabsContent>
        
        <TabsContent value="basic" className="space-y-8">
          <BasicComponentsExample />
        </TabsContent>
        
        <TabsContent value="forms" className="space-y-8">
          <FormControlsExample />
        </TabsContent>
        
        <TabsContent value="layouts" className="space-y-8">
          <LayoutExamples />
        </TabsContent>
        
        <TabsContent value="theme" className="space-y-8">
          <ThemeEditor />
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default ComponentShowcase; 