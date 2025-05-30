import React, { useState, useEffect } from "react";
import { SideNav } from "../navigation/side-nav";
import { TopBar } from "../navigation/top-bar";
import { cn } from "../../lib/utils";

export interface DashboardLayoutProps {
  children: React.ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [sidebarMobileOpen, setSidebarMobileOpen] = useState(false);
  
  // Track window width for responsive behavior
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== 'undefined' ? window.innerWidth : 0
  );

  // Auto-collapse sidebar on smaller screens
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      // Auto-collapse on medium screens
      if (window.innerWidth < 1024 && window.innerWidth >= 768) {
        setSidebarCollapsed(true);
      } else if (window.innerWidth >= 1024) {
        setSidebarCollapsed(false);
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Handle sidebar toggle for both desktop and mobile
  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  // Handle mobile sidebar specifically
  const toggleMobileSidebar = () => {
    setSidebarMobileOpen(!sidebarMobileOpen);
  };

  // Close mobile sidebar when clicking outside
  const closeMobileSidebar = () => {
    setSidebarMobileOpen(false);
  };

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      {/* Mobile sidebar backdrop with subtle blur effect */}
      {sidebarMobileOpen && (
        <div 
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 md:hidden" 
          onClick={closeMobileSidebar}
          aria-hidden="true"
        />
      )}
      
      {/* Sidebar - mobile version slides in, desktop version is fixed */}
      <div
        className={cn(
          "fixed md:relative z-50 md:z-auto transition-all duration-300 ease-in-out h-full",
          sidebarMobileOpen ? "left-0" : "-left-56 md:left-0",
          sidebarCollapsed ? "w-12 md:w-12" : "w-56"
        )}
      >
        <SideNav 
          collapsed={sidebarCollapsed} 
          onToggle={toggleSidebar}
        />
      </div>
      
      {/* Main content area */}
      <div 
        className={cn(
          "flex-1 flex flex-col overflow-hidden transition-all duration-300 ease-in-out",
          sidebarCollapsed ? "md:ml-12" : "md:ml-0"
        )}
      >
        <TopBar 
          onMobileMenuToggle={toggleMobileSidebar}
          sidebarCollapsed={sidebarCollapsed}
        />
        
        <main className="flex-1 overflow-y-auto p-3 md:p-4 bg-gray-50/50 dark:bg-gray-900/30">
          <div className="mx-auto w-full max-w-7xl space-y-4">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
} 