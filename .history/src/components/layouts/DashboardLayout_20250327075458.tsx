import React, { useState, useEffect } from "react";
import { SideNav } from "../navigation/side-nav";
import { TopBar } from "../navigation/top-bar";
import { cn } from "../../lib/utils";

export interface DashboardLayoutProps {
  children: React.ReactNode;
  navigation?: Array<{
    name: string;
    href: string;
    icon: React.ComponentType<{ className?: string }>;
    count?: string;
    initial?: string;
    children?: Array<{
      name: string;
      href: string;
      icon: React.ComponentType<{ className?: string }>;
      count?: string;
      initial?: string;
    }>;
  }>;
  sections?: Array<{
    title: string;
    items: Array<{
      name: string;
      href: string;
      icon: React.ComponentType<{ className?: string }>;
      count?: string;
      initial?: string;
    }>;
  }>;
}

export function DashboardLayout({ children, navigation = [], sections = [] }: DashboardLayoutProps) {
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
    handleResize(); // Initial check

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  const toggleMobileSidebar = () => {
    setSidebarMobileOpen(!sidebarMobileOpen);
  };

  // Close mobile sidebar when clicking outside
  const closeMobileSidebar = () => {
    setSidebarMobileOpen(false);
  };

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      {/* Mobile sidebar backdrop */}
      {sidebarMobileOpen && (
        <div 
          className="fixed inset-0 bg-overlay-backdrop backdrop-blur-sm z-40 md:hidden" 
          onClick={closeMobileSidebar}
          aria-hidden="true"
        />
      )}
      
      {/* Navigation Sidebar */}
      <aside
        className={cn(
          "fixed md:relative z-50 md:z-auto transition-all duration-300 ease-in-out h-full border-r border-border-subtle dark:border-border-subtle-dark",
          sidebarMobileOpen ? "left-0" : "-left-56 md:left-0",
          sidebarCollapsed ? "w-12 md:w-12" : "w-56"
        )}
      >
        <SideNav 
          collapsed={sidebarCollapsed} 
          onToggle={toggleSidebar}
          navigation={navigation}
          sections={sections}
        />
      </aside>
      
      {/* Main Content Area */}
      <div 
        className={cn(
          "flex-1 flex flex-col overflow-hidden transition-all duration-300 ease-in-out",
          sidebarCollapsed ? "md:ml-12" : "md:ml-0"
        )}
      >
        {/* Top Navigation Bar */}
        <header>
          <TopBar 
            onMobileMenuToggle={toggleMobileSidebar}
            sidebarCollapsed={sidebarCollapsed}
          />
        </header>
        
        {/* Main Content */}
        <main className="flex-1 overflow-y-auto bg-background">
          {/* Content Container */}
          <div className="h-full p-4 md:p-6 lg:p-8">
            {/* Content Wrapper */}
            <div className="mx-auto w-full max-w-7xl">
              {children}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
} 