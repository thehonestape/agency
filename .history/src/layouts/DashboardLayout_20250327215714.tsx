import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { SideNav } from '../components/patterns/navigation/SideNav';
import { TopBar } from '../components/patterns/navigation/TopBar';
import { FiBell } from 'react-icons/fi';

// Define navigation items for the sidebar
const navItems = [
  {
    label: 'Main Navigation',
    items: [
      { label: 'Dashboard', href: '/dashboard', icon: 'dashboard' },
      { label: 'Projects', href: '/dashboard/projects', icon: 'folder' },
      { label: 'Team', href: '/dashboard/team', icon: 'users' },
      { label: 'Analytics', href: '/dashboard/analytics', icon: 'chart' },
      { label: 'Components', href: '/dashboard/components', icon: 'components' },
      { label: 'Settings', href: '/dashboard/settings', icon: 'settings' }
    ]
  },
  {
    label: 'Resources',
    items: [
      { label: 'Documentation', href: '/dashboard/docs', icon: 'document' },
      { label: 'Help', href: '/dashboard/help', icon: 'help' }
    ]
  }
];

// User profile section for the top bar
const userProfile = (
  <div className="flex items-center space-x-4">
    <button 
      className="p-1 rounded-full text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
      aria-label="View notifications"
    >
      <FiBell className="w-6 h-6" />
    </button>
    <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center">
      <span className="font-medium text-sm text-gray-800">AB</span>
    </div>
  </div>
);

/**
 * DashboardLayout - The main layout for dashboard pages
 * Uses SideNav and TopBar components
 */
const DashboardLayout: React.FC = () => {
  const location = useLocation();
  
  // Determine active page from current route
  const currentPath = location.pathname;
  const navigationWithActive = navItems.map(section => ({
    ...section,
    items: section.items.map(item => ({
      ...item,
      active: item.href === currentPath
    }))
  }));

  // Get page title based on current path
  const getPageTitle = () => {
    const activePage = navItems
      .flatMap(section => section.items)
      .find(item => item.href === currentPath);
    
    return activePage ? `${activePage.label}` : 'Dashboard';
  };

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      {/* Sidebar */}
      <SideNav items={navigationWithActive} />
      
      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <TopBar title={getPageTitle()} rightContent={userProfile} />
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout; 