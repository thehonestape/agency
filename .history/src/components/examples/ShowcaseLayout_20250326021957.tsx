import React, { useState } from 'react';
import { cn } from '@/lib/utils';

// Define the icon component type
type IconType = React.ComponentType<{ className?: string }>;

// Import icons from react-icons (reuse existing icon imports from the project)
let FiChevronLeft: IconType | undefined;
let FiChevronRight: IconType | undefined;
let FiBox: IconType | undefined;
let FiType: IconType | undefined;
let FiLayout: IconType | undefined;
let FiToggleRight: IconType | undefined;
let FiTable: IconType | undefined;
let FiBarChart2: IconType | undefined;
let FiSettings: IconType | undefined;

try {
  const icons = require('react-icons/fi');
  FiChevronLeft = icons.FiChevronLeft;
  FiChevronRight = icons.FiChevronRight;
  FiBox = icons.FiBox;
  FiType = icons.FiType;
  FiLayout = icons.FiLayout;
  FiToggleRight = icons.FiToggleRight;
  FiTable = icons.FiTable;
  FiBarChart2 = icons.FiBarChart2;
  FiSettings = icons.FiSettings;
} catch (e) {
  console.warn('Could not load icons:', (e as Error).message);
}

// Define section type for navigation
interface NavSection {
  id: string;
  title: string;
  icon: IconType | undefined;
}

// Component Props
interface ShowcaseLayoutProps {
  children: React.ReactNode;
  activeSection?: string;
  onSectionChange?: (sectionId: string) => void;
}

export function ShowcaseLayout({ 
  children,
  activeSection = 'typography',
  onSectionChange
}: ShowcaseLayoutProps) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [sidebarMobileOpen, setSidebarMobileOpen] = useState(false);
  
  // Define navigation sections
  const sections: NavSection[] = [
    { id: 'typography', title: 'Typography', icon: FiType },
    { id: 'basic', title: 'Basic UI', icon: FiBox },
    { id: 'forms', title: 'Form Controls', icon: FiToggleRight },
    { id: 'layouts', title: 'Layouts', icon: FiLayout },
    { id: 'tables', title: 'Tables', icon: FiTable },
    { id: 'data', title: 'Data Viz', icon: FiBarChart2 },
    { id: 'theme', title: 'Theme Editor', icon: FiSettings }
  ];
  
  // Toggle sidebar expanded/collapsed
  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };
  
  // Toggle mobile sidebar
  const toggleMobileSidebar = () => {
    setSidebarMobileOpen(!sidebarMobileOpen);
  };
  
  // Close mobile sidebar when clicking outside
  const closeMobileSidebar = () => {
    setSidebarMobileOpen(false);
  };
  
  // Handle section click
  const handleSectionClick = (sectionId: string) => {
    if (onSectionChange) {
      onSectionChange(sectionId);
    }
    
    // Close mobile sidebar after selection on small screens
    if (window.innerWidth < 768) {
      closeMobileSidebar();
    }
  };
  
  return (
    <div className="flex h-screen overflow-hidden bg-white dark:bg-gray-950">
      {/* Mobile sidebar backdrop with blur effect */}
      {sidebarMobileOpen && (
        <div 
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 md:hidden" 
          onClick={closeMobileSidebar}
          aria-hidden="true"
        />
      )}
      
      {/* Sidebar - mobile and desktop versions */}
      <div
        className={cn(
          "fixed md:relative z-50 md:z-auto transition-all duration-300 ease-in-out h-full shadow-md",
          "bg-gray-50 dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800",
          sidebarMobileOpen ? "left-0" : "-left-64 md:left-0",
          sidebarCollapsed ? "w-16" : "w-64"
        )}
      >
        {/* Sidebar Header */}
        <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
          {!sidebarCollapsed && (
            <h1 className="text-lg font-medium text-gray-900 dark:text-gray-100">
              Components
            </h1>
          )}
          <button 
            onClick={toggleSidebar}
            className="p-1.5 rounded-md text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 dark:text-gray-400"
            aria-label={sidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
            title={sidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {sidebarCollapsed && FiChevronRight ? (
              <FiChevronRight className="h-5 w-5" />
            ) : FiChevronLeft ? (
              <FiChevronLeft className="h-5 w-5" />
            ) : null}
          </button>
        </div>
        
        {/* Sidebar Navigation */}
        <nav className="p-3 h-[calc(100%-4rem)] overflow-y-auto">
          <ul className="space-y-1">
            {sections.map((section) => (
              <li key={section.id}>
                <button
                  onClick={() => handleSectionClick(section.id)}
                  className={cn(
                    "flex items-center w-full rounded-md px-3 py-2.5 text-sm transition-colors",
                    activeSection === section.id 
                      ? "bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 font-medium" 
                      : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800",
                    sidebarCollapsed && "justify-center"
                  )}
                  aria-current={activeSection === section.id ? "page" : undefined}
                  title={section.title}
                >
                  {section.icon && (
                    <section.icon className={cn(
                      "h-5 w-5 flex-shrink-0",
                      activeSection === section.id 
                        ? "text-blue-600 dark:text-blue-400" 
                        : "text-gray-500 dark:text-gray-400"
                    )} />
                  )}
                  {!sidebarCollapsed && (
                    <span className="ml-3">{section.title}</span>
                  )}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      
      {/* Main Content Area */}
      <div 
        className={cn(
          "flex-1 flex flex-col overflow-hidden transition-all duration-300 ease-in-out",
          sidebarCollapsed ? "md:ml-16" : "md:ml-64"
        )}
      >
        {/* Mobile Header */}
        <header className="md:hidden flex items-center h-16 px-4 border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-sm">
          <button
            onClick={toggleMobileSidebar}
            className="p-1.5 mr-3 rounded-md text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 dark:text-gray-400"
            aria-label="Open sidebar menu"
            title="Open sidebar menu"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <h1 className="text-lg font-medium text-gray-900 dark:text-gray-100">
            {sections.find(s => s.id === activeSection)?.title || 'Component Showcase'}
          </h1>
        </header>
        
        {/* Main Content */}
        <main className="flex-1 overflow-y-auto bg-white dark:bg-gray-950">
          <div className="max-w-5xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}

export default ShowcaseLayout; 