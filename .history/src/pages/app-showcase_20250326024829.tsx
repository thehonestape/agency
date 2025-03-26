import React, { useState } from 'react';
import { BrandSidebarWithHeader } from '@/components/layouts/application/sidebar';
import { TypographySystem } from '@/components/examples/TypographySystem';
import { FormControlsExample } from '@/components/examples/FormControlsExample';
import { TableExample } from '@/components/examples/TableExample';
import { DataDisplayExample } from '@/components/examples/DataDisplayExample';
import { ThemeEditor } from '@/components/examples/ThemeEditor';

// Component for App Showcase
export function AppShowcase() {
  const [activeExample, setActiveExample] = useState<string>('typography');

  // Render the appropriate component based on activeExample
  const renderExample = () => {
    switch (activeExample) {
      case 'typography':
        return <TypographySystem />;
      case 'forms':
        return <FormControlsExample />;
      case 'tables':
        return <TableExample />;
      case 'data':
        return <DataDisplayExample />;
      case 'theme':
        return <ThemeEditor />;
      default:
        return <TypographySystem />;
    }
  };

  return (
    <BrandSidebarWithHeader>
      <div className="px-4 py-8 max-w-6xl mx-auto">
        <div className="mb-8 border-b border-gray-200 pb-5">
          <div className="flex flex-wrap items-baseline">
            <h1 className="text-2xl font-semibold text-gray-900">Component Examples</h1>
            <p className="ml-4 text-base text-gray-500">
              View and interact with UI components
            </p>
          </div>
          
          {/* Component Selector */}
          <div className="mt-4 sm:mt-6">
            <nav className="flex space-x-4">
              <button 
                onClick={() => setActiveExample('typography')}
                className={`px-3 py-2 text-sm font-medium rounded-md ${
                  activeExample === 'typography' 
                    ? 'bg-indigo-100 text-indigo-700' 
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Typography
              </button>
              <button 
                onClick={() => setActiveExample('forms')}
                className={`px-3 py-2 text-sm font-medium rounded-md ${
                  activeExample === 'forms' 
                    ? 'bg-indigo-100 text-indigo-700' 
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Form Controls
              </button>
              <button 
                onClick={() => setActiveExample('tables')}
                className={`px-3 py-2 text-sm font-medium rounded-md ${
                  activeExample === 'tables' 
                    ? 'bg-indigo-100 text-indigo-700' 
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Tables
              </button>
              <button 
                onClick={() => setActiveExample('data')}
                className={`px-3 py-2 text-sm font-medium rounded-md ${
                  activeExample === 'data' 
                    ? 'bg-indigo-100 text-indigo-700' 
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Data Visualization
              </button>
              <button 
                onClick={() => setActiveExample('theme')}
                className={`px-3 py-2 text-sm font-medium rounded-md ${
                  activeExample === 'theme' 
                    ? 'bg-indigo-100 text-indigo-700' 
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Theme Editor
              </button>
            </nav>
          </div>
        </div>

        {/* Example Content Area */}
        <div className="example-container">
          {renderExample()}
        </div>
      </div>
    </BrandSidebarWithHeader>
  );
}

export default AppShowcase; 