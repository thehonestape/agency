import { useState, useEffect, ReactNode } from 'react';
import { useLocation } from 'react-router-dom';
import MainNav from '../navigation/MainNav';
import { SideNav } from '../navigation/side-nav';
import { AIQuickAccessButton } from '../ai/AIQuickAccessButton';
import MotionLayout from '../motion/MotionLayout';

// Define the props for the RootLayout component
interface RootLayoutProps {
  children: ReactNode;
  hideSidebar?: boolean; // Added prop to control sidebar visibility
}

// Define paths that should use marketing layout
const marketingPaths = ['/', '/services', '/pricing', '/studio', '/work'];

const RootLayout = ({ children, hideSidebar = false }: RootLayoutProps) => {
  const location = useLocation();
  const [isMarketing, setIsMarketing] = useState(false);
  const [sideNavCollapsed, setSideNavCollapsed] = useState(false);
  
  // Determine if we're on a marketing page
  useEffect(() => {
    setIsMarketing(marketingPaths.includes(location.pathname));
  }, [location.pathname]);
  
  // Toggle sidebar collapsed state
  const toggleSideNav = () => {
    setSideNavCollapsed(prev => !prev);
  };
  
  // Marketing pages have a different layout without side nav
  if (isMarketing) {
    return (
      <div className="flex flex-col min-h-screen">
        {/* Top navigation for marketing pages - full width */}
        <header className="w-full border-b border-gray-200 px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="text-xl font-bold">WORKHORSE</div>
            <MainNav />
          </div>
        </header>
        
        {/* Main content */}
        <main className="flex-1">
          <MotionLayout>
            {children}
          </MotionLayout>
        </main>
        
        {/* Footer */}
        <footer className="bg-gray-100 py-6 px-8">
          <div className="flex justify-between items-center">
            <div className="text-sm text-gray-500">© 2025 Workhorse. All rights reserved.</div>
            <div className="text-sm text-gray-500">
              <a href="#" className="hover:text-gray-900 mr-4">Terms</a>
              <a href="#" className="hover:text-gray-900">Privacy</a>
            </div>
          </div>
        </footer>
      </div>
    );
  }
  
  // Application pages have side navigation
  return (
    <div className="flex h-screen bg-white">
      {/* Side navigation - Always shown by default unless explicitly hidden */}
      <div className={hideSidebar ? 'hidden' : 'block'}>
        <SideNav collapsed={sideNavCollapsed} onToggle={toggleSideNav} />
      </div>
      
      {/* Main content area */}
      <div className="flex flex-col flex-1">
        {/* Top bar */}
        <header className="border-b border-gray-200 dark:border-gray-800 px-8 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-semibold">
              {location.pathname.split('/')[1]?.charAt(0).toUpperCase() + location.pathname.split('/')[1]?.slice(1) || 'Dashboard'}
            </h1>
            <div className="flex items-center gap-4">
              <AIQuickAccessButton />
              <div className="h-8 w-8 rounded-full bg-gray-200"></div>
            </div>
          </div>
        </header>
        
        {/* Page content */}
        <main className="flex-1 overflow-auto p-6">
          <MotionLayout>
            {children}
          </MotionLayout>
        </main>
      </div>
    </div>
  );
};

export default RootLayout; 