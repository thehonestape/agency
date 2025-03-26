import React, { useState } from 'react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui';

import ShowcaseLayout from './ShowcaseLayout';
import TypographySystem from './TypographySystem'; // Direct import

// Import examples, but handle errors gracefully
let FormControlsExample: React.ComponentType<any> | undefined;
let BasicComponentsExample: React.ComponentType<any> | undefined;
let LayoutExamples: React.ComponentType<any> | undefined;
// TypographySystem is now imported directly
let ThemeEditor: React.ComponentType<any> | undefined;
let TableExample: React.ComponentType<any> | undefined;
let DataDisplayExample: React.ComponentType<any> | undefined;

// Try to import the examples
try {
  const examples = require('@/components/examples');
  FormControlsExample = examples.FormControlsExample;
  BasicComponentsExample = examples.BasicComponentsExample;
  LayoutExamples = examples.LayoutExamples;
  // TypographySystem is already imported above
  ThemeEditor = examples.ThemeEditor;
  TableExample = examples.TableExample;
  DataDisplayExample = examples.DataDisplayExample;
} catch (e) {
  console.warn("Couldn't import all example components:", (e as Error).message);
}

// Fallback component when an example is not available
const ExampleFallback = ({ name }: { name: string }) => (
  <Card className="fallback-card border border-border shadow-sm bg-card">
    <CardHeader className="fallback-card-header bg-secondary border-b border-border">
      <CardTitle className="text-foreground">Example Not Available</CardTitle>
      <CardDescription className="text-muted-foreground">The {name} example could not be loaded.</CardDescription>
    </CardHeader>
    <CardContent className="fallback-card-content bg-card text-card-foreground py-6">
      <div className="fallback-content flex gap-3 items-start">
        <div className="fallback-icon rounded-full bg-warning/20 p-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-warning" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
          </svg>
        </div>
        <div className="fallback-message">
          <p className="text-card-foreground mb-2">
            This component may not be available due to:
          </p>
          <ul className="fallback-list list-disc list-inside text-muted-foreground space-y-1">
            <li>Missing dependencies in the project</li>
            <li>An error in the component implementation</li>
            <li>The component hasn't been implemented yet</li>
          </ul>
        </div>
      </div>
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
        return <TypographySystem />; // Direct usage, no conditional
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
        return (
          <div className="component-placeholder flex items-center justify-center p-12 text-muted-foreground border border-dashed border-border rounded-lg">
            Select a component category from the sidebar
          </div>
        );
    }
  };

  return (
    <ShowcaseLayout 
      activeSection={activeSection}
      onSectionChange={setActiveSection}
    >
      <div className="component-showcase space-y-6">
        <header className="component-header mb-8 border-b border-border pb-4 hidden md:block">
          <h1 className="component-title text-2xl font-bold text-foreground">
            {getSectionTitle(activeSection)}
          </h1>
          <p className="component-description text-muted-foreground mt-1">
            {getSectionDescription(activeSection)}
          </p>
        </header>
        <div className="component-container mt-4">
          {renderComponent()}
        </div>
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

// Helper function to get the section description
function getSectionDescription(sectionId: string): string {
  const descriptions: Record<string, string> = {
    'typography': 'Text styles and typography components for consistent content presentation.',
    'basic': 'Common interface elements used across the application.',
    'forms': 'Input components and controls for gathering user data.',
    'layouts': 'Structural components for organizing page content.', 
    'tables': 'Components for displaying tabular data in various formats.',
    'data': 'Charts, graphs and other data visualization components.',
    'theme': 'Customize the visual appearance of the UI components.'
  };
  
  return descriptions[sectionId] || 'Explore the component library';
}

export default ComponentShowcase; 