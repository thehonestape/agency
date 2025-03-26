import React, { useState } from 'react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui';

import ShowcaseLayout from './ShowcaseLayout';

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
  // State to track the current active section
  const [activeSection, setActiveSection] = useState('typography');
  
  // Render the appropriate component based on the active section
  const renderComponent = () => {
    switch (activeSection) {
      case 'typography':
        return TypographySystem ? <TypographySystem /> : <ExampleFallback name="Typography System" />;
      case 'basic':
        return BasicComponentsExample ? <BasicComponentsExample /> : <ExampleFallback name="Basic Components" />;
      case 'forms':
        return FormControlsExample ? <FormControlsExample /> : <ExampleFallback name="Form Controls" />;
      case 'layouts':
        return LayoutExamples ? <LayoutExamples /> : <ExampleFallback name="Layouts" />;
      case 'tables':
        return TableExample ? <TableExample /> : <ExampleFallback name="Tables" />;
      case 'data':
        return DataDisplayExample ? <DataDisplayExample /> : <ExampleFallback name="Data Visualization" />;
      case 'theme':
        return ThemeEditor ? <ThemeEditor /> : <ExampleFallback name="Theme Editor" />;
      default:
        return <div>Select a component category</div>;
    }
  };

  return (
    <ShowcaseLayout 
      activeSection={activeSection}
      onSectionChange={setActiveSection}
    >
      <div className="space-y-8">
        <h1 className="text-3xl font-bold mb-8 hidden md:block">{getSectionTitle(activeSection)}</h1>
        {renderComponent()}
      </div>
    </ShowcaseLayout>
  );
}

// Helper function to get the section title
function getSectionTitle(sectionId: string): string {
  const titles: Record<string, string> = {
    'typography': 'Typography System',
    'basic': 'Basic UI Components',
    'forms': 'Form Controls',
    'layouts': 'Layout Examples', 
    'tables': 'Tables',
    'data': 'Data Visualization',
    'theme': 'Theme Editor'
  };
  
  return titles[sectionId] || 'Component Showcase';
}

export default ComponentShowcase; 