import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import DOMPurify from 'dompurify';
import './component-viewer.css';

// @ts-ignore - Importing JSON directly
import rawComponentsData from '../data/components/tailwind-components.json';

type Component = {
  name: string;
  url: string;
  count: number;
  type: string;
  html?: string;
};

type Section = {
  name: string;
  components: Component[];
};

type Category = {
  id: string;
  name: string;
  sections: Section[];
};

type ComponentsData = {
  categories: Category[];
};

type ComponentViewerProps = {
  categoryId?: string;
  sectionName?: string;
};

export default function TailwindComponentViewer({ categoryId, sectionName }: ComponentViewerProps) {
  const params = useParams();
  const activeCategoryId = categoryId || params.categoryId;
  const activeSectionName = sectionName || params.sectionName;
  
  // Find the category and section
  const category = (rawComponentsData as ComponentsData).categories.find(cat => cat.id === activeCategoryId);
  const section = category?.sections.find(sec => 
    sec.name.toLowerCase().replace(/\s+/g, '-') === activeSectionName
  );
  
  if (!category || !section) {
    return (
      <div className="p-8">
        <h1 className="text-2xl font-bold mb-4">Component not found</h1>
        <Link to="/components" className="text-indigo-600 hover:text-indigo-800">
          ← Back to component browser
        </Link>
      </div>
    );
  }

  // Function to render HTML safely
  const renderHTML = (html: string) => {
    return { __html: DOMPurify.sanitize(html) };
  };

  return (
    <div className="bg-gray-50 min-h-screen pb-12">
      {/* Header with navigation */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center">
            <div>
              <Link to="/components" className="text-indigo-600 hover:text-indigo-800 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                Back to component browser
              </Link>
              <h1 className="text-2xl font-semibold text-gray-900 mt-2">{section.name}</h1>
              <p className="text-sm text-gray-500">From {category.name}</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Main content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <div className="space-y-16">
          {section.components.map((component: Component, index) => (
            <div key={component.name} className="bg-white rounded-lg shadow-md overflow-hidden">
              {/* Component header */}
              <div className="border-b border-gray-200 bg-white px-6 py-4">
                <h2 className="text-lg font-semibold text-gray-900">{component.name}</h2>
                <p className="text-sm text-gray-500 mt-1">
                  {component.count > 0 ? `${component.count} ${component.type}s` : component.type}
                </p>
              </div>
              
              {/* Component preview */}
              <div className="tailwind-preview-container relative">
                <div className="tailwind-preview-bg">
                  {component.html ? (
                    <div 
                      className="component-preview"
                      dangerouslySetInnerHTML={renderHTML(component.html)}
                    />
                  ) : (
                    <div className="flex justify-center items-center p-16 text-center">
                      <div className="text-gray-400">
                        <p>No preview available for this component</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 