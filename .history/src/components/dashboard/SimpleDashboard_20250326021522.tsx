import React, { useState, ReactNode } from 'react';
import { Link } from 'react-router-dom';

// Simple dashboard interface that doesn't rely on external dependencies
interface SimpleDashboardProps {
  children: ReactNode;
  title?: string;
  sidebarItems: {
    id: string;
    label: string;
    icon?: ReactNode;
  }[];
  activeSidebarItem: string;
  onSidebarItemChange: (id: string) => void;
}

export function SimpleDashboard({
  children,
  title = 'Dashboard',
  sidebarItems,
  activeSidebarItem,
  onSidebarItemChange
}: SimpleDashboardProps) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50 dark:bg-gray-900">
      {/* Mobile overlay */}
      {mobileSidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-gray-900/50 backdrop-blur-sm md:hidden"
          onClick={() => setMobileSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside 
        className={`
          fixed z-50 h-full bg-white shadow-md transition-all duration-300 ease-in-out dark:bg-gray-800
          ${mobileSidebarOpen ? 'left-0' : '-left-64 md:left-0'}
          ${sidebarCollapsed ? 'w-16 md:w-16' : 'w-64'}
        `}
      >
        {/* Sidebar header */}
        <div className="flex h-14 items-center justify-between border-b px-4 dark:border-gray-700">
          {!sidebarCollapsed && (
            <h1 className="truncate text-lg font-semibold">{title}</h1>
          )}
          <button
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className="rounded p-1 text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700"
            aria-label={sidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            {sidebarCollapsed ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            )}
          </button>
        </div>

        {/* Sidebar content */}
        <nav className="h-[calc(100vh-3.5rem)] overflow-y-auto p-3">
          <ul className="space-y-1">
            {sidebarItems.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => onSidebarItemChange(item.id)}
                  className={`
                    flex w-full items-center rounded-md py-2 text-sm transition-colors
                    ${sidebarCollapsed ? 'justify-center px-2' : 'px-3'}
                    ${
                      activeSidebarItem === item.id
                        ? 'bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400'
                        : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700'
                    }
                  `}
                  aria-current={activeSidebarItem === item.id ? 'page' : undefined}
                >
                  {item.icon && (
                    <span className={`${!sidebarCollapsed && 'mr-3'}`}>
                      {item.icon}
                    </span>
                  )}
                  {!sidebarCollapsed && <span>{item.label}</span>}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      {/* Main content */}
      <main 
        className={`
          flex flex-1 flex-col overflow-y-auto transition-all duration-300 ease-in-out
          ${sidebarCollapsed ? 'md:ml-16' : 'md:ml-64'}
        `}
      >
        {/* Mobile header */}
        <header className="flex h-14 items-center justify-between border-b px-4 md:hidden dark:border-gray-700">
          <button
            onClick={() => setMobileSidebarOpen(true)}
            className="p-1.5 text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700"
            aria-label="Open sidebar"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" />
            </svg>
          </button>
          <h1 className="text-lg font-semibold">{title}</h1>
          <div className="w-10"></div> {/* Empty div for equal spacing */}
        </header>

        {/* Page content */}
        <div className="flex-1 overflow-auto p-4 md:p-6">
          {children}
        </div>
      </main>
    </div>
  );
}

export default SimpleDashboard; 