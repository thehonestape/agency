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

// Import examples, but handle errors gracefully
let FormControlsExample: React.ComponentType<any> | undefined;
let BasicComponentsExample: React.ComponentType<any> | undefined;
let LayoutExamples: React.ComponentType<any> | undefined;
let TypographySystem: React.ComponentType<any> | undefined;
let ThemeEditor: React.ComponentType<any> | undefined;
let TableExample: React.ComponentType<any> | undefined;
let DataDisplayExample: React.ComponentType<any> | undefined;

// Try to import the examples
try {
  const examples = require('@/components/examples');
  FormControlsExample = examples.FormControlsExample;
  BasicComponentsExample = examples.BasicComponentsExample;
  LayoutExamples = examples.LayoutExamples;
  TypographySystem = examples.TypographySystem;
  ThemeEditor = examples.ThemeEditor;
  TableExample = examples.TableExample;
  DataDisplayExample = examples.DataDisplayExample;
} catch (e) {
  console.warn("Couldn't import all example components:", (e as Error).message);
}

// Fallback component when an example is not available
const ExampleFallback = ({ name }: { name: string }) => (
  <Card>
    <CardHeader>
      <CardTitle>Example Not Available</CardTitle>
      <CardDescription>The {name} example could not be loaded.</CardDescription>
    </CardHeader>
    <CardContent>
      <p className="text-muted-foreground">This may be due to missing dependencies or an error in the component.</p>
    </CardContent>
  </Card>
);

export function ComponentShowcase() {
  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8">Component Showcase</h1>
      
      <Tabs defaultValue="typography" className="w-full">
        <TabsList className="grid grid-cols-7 mb-8">
          <TabsTrigger value="typography">Typography</TabsTrigger>
          <TabsTrigger value="basic">Basic UI</TabsTrigger>
          <TabsTrigger value="forms">Form Controls</TabsTrigger>
          <TabsTrigger value="layouts">Layouts</TabsTrigger>
          <TabsTrigger value="tables">Tables</TabsTrigger>
          <TabsTrigger value="data">Data Viz</TabsTrigger>
          <TabsTrigger value="theme">Theme Editor</TabsTrigger>
        </TabsList>
        
        <TabsContent value="typography" className="space-y-8">
          {TypographySystem ? <TypographySystem /> : <ExampleFallback name="Typography System" />}
        </TabsContent>
        
        <TabsContent value="basic" className="space-y-8">
          {BasicComponentsExample ? <BasicComponentsExample /> : <ExampleFallback name="Basic Components" />}
        </TabsContent>
        
        <TabsContent value="forms" className="space-y-8">
          {FormControlsExample ? <FormControlsExample /> : <ExampleFallback name="Form Controls" />}
        </TabsContent>
        
        <TabsContent value="layouts" className="space-y-8">
          {LayoutExamples ? <LayoutExamples /> : <ExampleFallback name="Layouts" />}
        </TabsContent>
        
        <TabsContent value="tables" className="space-y-8">
          {TableExample ? <TableExample /> : <ExampleFallback name="Tables" />}
        </TabsContent>
        
        <TabsContent value="data" className="space-y-8">
          {DataDisplayExample ? <DataDisplayExample /> : <ExampleFallback name="Data Visualization" />}
        </TabsContent>

        <TabsContent value="theme" className="space-y-8">
          {ThemeEditor ? <ThemeEditor /> : <ExampleFallback name="Theme Editor" />}
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default ComponentShowcase; 