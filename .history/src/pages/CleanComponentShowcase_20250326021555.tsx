import React, { useState } from 'react';
import { SimpleDashboard } from '@/components/dashboard';

// Import examples directly without complex layout dependencies
import { FormControlsExample } from '@/components/examples/FormControlsExample';
import { TableExample } from '@/components/examples/TableExample';
import { DataDisplayExample } from '@/components/examples/DataDisplayExample'; 

// Define icons for sidebar
const FormIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
    <path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z" />
  </svg>
);

const TableIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M5 4a3 3 0 00-3 3v6a3 3 0 003 3h10a3 3 0 003-3V7a3 3 0 00-3-3H5zm-1 9v-1h5v2H5a1 1 0 01-1-1zm7 1h4a1 1 0 001-1v-1h-5v2zm0-4h5V8h-5v2zM9 8H4v2h5V8z" clipRule="evenodd" />
  </svg>
);

const ChartIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
    <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
  </svg>
);

export default function CleanComponentShowcase() {
  const [activeSection, setActiveSection] = useState('forms');
  
  const sidebarItems = [
    { id: 'forms', label: 'Form Controls', icon: <FormIcon /> },
    { id: 'tables', label: 'Tables', icon: <TableIcon /> },
    { id: 'data', label: 'Data Visualization', icon: <ChartIcon /> }
  ];

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
        return <div>Select a component category from the sidebar</div>;
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
    <SimpleDashboard
      title="Component Showcase"
      sidebarItems={sidebarItems}
      activeSidebarItem={activeSection}
      onSidebarItemChange={setActiveSection}
    >
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">{getSectionTitle()}</h1>
        <div className="space-y-8">
          {renderComponent()}
        </div>
      </div>
    </SimpleDashboard>
  );
} 