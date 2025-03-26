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
  <Card className="border border-gray-200 dark:border-gray-800 shadow-sm bg-white dark:bg-gray-800">
    <CardHeader className="bg-gray-50 dark:bg-gray-850 border-b border-gray-200 dark:border-gray-700">
      <CardTitle className="text-gray-900 dark:text-gray-100">Example Not Available</CardTitle>
      <CardDescription className="text-gray-600 dark:text-gray-400">The {name} example could not be loaded.</CardDescription>
    </CardHeader>
    <CardContent className="bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 py-6">
      <div className="flex gap-3 items-start">
        <div className="rounded-full bg-amber-100 dark:bg-amber-900/30 p-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-amber-600 dark:text-amber-400" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
          </svg>
        </div>
        <div>
          <p className="text-gray-700 dark:text-gray-300 mb-2">
            This component may not be available due to:
          </p>
          <ul className="list-disc list-inside text-gray-600 dark:text-gray-400 space-y-1">
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
        return (
          <div className="flex items-center justify-center p-12 text-gray-500 dark:text-gray-400 border border-dashed border-gray-300 dark:border-gray-700 rounded-lg">
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
      <div className="space-y-6">
        <header className="mb-8 border-b border-gray-200 dark:border-gray-800 pb-4 hidden md:block">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            {getSectionTitle(activeSection)}
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            {getSectionDescription(activeSection)}
          </p>
        </header>
        <div className="mt-4">
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