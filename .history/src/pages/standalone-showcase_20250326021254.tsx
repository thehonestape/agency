import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui';

// Import examples directly
import { FormControlsExample } from '@/components/examples/FormControlsExample';
import { TableExample } from '@/components/examples/TableExample';
import { DataDisplayExample } from '@/components/examples/DataDisplayExample'; 

// Basic sidebar navigation component that doesn't rely on external imports
function SimpleSidebar({ activeSection, onSectionChange }: { 
  activeSection: string; 
  onSectionChange: (section: string) => void;
}) {
  const sections = [
    { id: 'forms', title: 'Form Controls' },
    { id: 'tables', title: 'Tables' },
    { id: 'data', title: 'Data Visualization' }
  ];

  return (
    <div className="h-screen w-64 bg-gray-100 p-4 border-r border-gray-200">
      <h2 className="text-lg font-bold mb-4">Components</h2>
      <nav>
        <ul className="space-y-2">
          {sections.map(section => (
            <li key={section.id}>
              <button
                onClick={() => onSectionChange(section.id)}
                className={`w-full text-left px-4 py-2 rounded ${
                  activeSection === section.id 
                    ? 'bg-blue-100 text-blue-700' 
                    : 'hover:bg-gray-200'
                }`}
              >
                {section.title}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
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

export default function StandaloneShowcase() {
  const [activeSection, setActiveSection] = useState('forms');
  
  // Render the appropriate component based on the active section
  const renderComponent = () => {
    switch (activeSection) {
      case 'forms':
        return <FormControlsExample />;
      case 'tables':
        return <TableExample />;
      case 'data':
        return <DataDisplayExample />;
      default:
        return <div>Select a component category</div>;
    }
  };

  // Get section title for display
  const getSectionTitle = () => {
    const titles: Record<string, string> = {
      'forms': 'Form Controls',
      'tables': 'Tables',
      'data': 'Data Visualization'
    };
    
    return titles[activeSection] || 'Component Showcase';
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <SimpleSidebar 
        activeSection={activeSection}
        onSectionChange={setActiveSection}
      />
      <main className="flex-1 overflow-y-auto bg-white p-8">
        <h1 className="text-3xl font-bold mb-8">{getSectionTitle()}</h1>
        <div className="space-y-8">
          {renderComponent()}
        </div>
      </main>
    </div>
  );
} 