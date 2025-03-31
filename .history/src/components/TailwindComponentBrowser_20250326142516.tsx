import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

type Component = {
  name: string;
  url: string;
  count: number;
  type: 'component' | 'example';
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
  categories: {
    id: string;
    name: string;
    sections: {
      name: string;
      components: {
        name: string;
        url: string;
        count: number;
        type: string;
      }[];
    }[];
  }[];
};

// Import the JSON data
// @ts-ignore - Importing JSON directly
import rawComponentsData from '../data/components/tailwind-components.json';
const componentsData = rawComponentsData as ComponentsData;

export default function TailwindComponentBrowser() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  
  useEffect(() => {
    // Process the imported data to ensure type compatibility
    const processedCategories = componentsData.categories.map(category => ({
      id: category.id,
      name: category.name,
      sections: category.sections.map(section => ({
        name: section.name,
        components: section.components.map(component => ({
          name: component.name,
          url: component.url,
          count: component.count,
          // Ensure type is either 'component' or 'example'
          type: component.type === 'example' ? 'example' : 'component'
        })) as Component[]
      }))
    }));
    
    setCategories(processedCategories as Category[]);
    
    // Set the first category as active by default
    if (processedCategories.length > 0) {
      setActiveCategory(processedCategories[0].id);
    }
  }, []);
  
  // Get the active category object
  const activeCategoryObj = categories.find(cat => cat.id === activeCategory);
  
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
        Tailwind Component Browser
      </h1>
      <p className="mt-2 text-lg text-gray-600">
        Browse components and UI patterns from Tailwind Plus UI Blocks
      </p>
      
      {/* Link to Component Gallery */}
      <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-100">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-blue-800">New Component Gallery Available</h2>
            <p className="text-sm text-blue-600">
              View all our UI components organized from smallest to largest in our new component gallery.
            </p>
          </div>
          <Link 
            to="/component-gallery" 
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            View Gallery
          </Link>
        </div>
      </div>
      
      {/* Category Tabs */}
      <div className="mt-8 border-b border-gray-200">
        <nav className="-mb-px flex space-x-8" aria-label="Tabs">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`
                whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium
                ${category.id === activeCategory
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'}
              `}
            >
              {category.name}
            </button>
          ))}
        </nav>
      </div>
      
      {/* Sections */}
      {activeCategoryObj && (
        <div className="mt-8 grid grid-cols-1 gap-y-8 lg:grid-cols-2 lg:gap-x-8 lg:gap-y-12">
          {activeCategoryObj.sections.map((section) => (
            <div key={section.name} className="bg-white p-6 rounded-lg shadow">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-900">{section.name}</h2>
                <Link 
                  to={`/components/view/${activeCategoryObj.id}/${section.name.toLowerCase().replace(/\s+/g, '-')}`}
                  className="text-sm text-indigo-600 hover:text-indigo-800"
                >
                  View all →
                </Link>
              </div>
              <ul className="mt-4 space-y-3">
                {section.components.map((component) => (
                  <li key={component.name} className="flex items-center justify-between">
                    <div>
                      <Link 
                        to={`/components/view/${activeCategoryObj.id}/${section.name.toLowerCase().replace(/\s+/g, '-')}`}
                        className="text-indigo-600 hover:text-indigo-800 font-medium"
                      >
                        {component.name}
                      </Link>
                      <span className="ml-2 text-sm text-gray-500">
                        {component.count > 0 ? `(${component.count} ${component.type}s)` : ''}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-800">
                        {component.type}
                      </span>
                      <a 
                        href={component.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-xs text-indigo-500 hover:text-indigo-700"
                        title="View on Tailwind Plus"
                      >
                        External ↗
                      </a>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
} 