import { FiMenu, FiSearch, FiBell, FiPlus, FiHelpCircle, FiX } from "react-icons/fi";
import { Button } from "../ui/button";
import { ThemeSwitcher } from "../ui/theme-switcher";
import { ThemeVariantSelector } from "../ui/ThemeVariantSelector";
import { cn } from "../../lib/utils";
import { useState, useEffect } from "react";

export interface TopBarProps {
  onMobileMenuToggle: () => void;
  sidebarCollapsed: boolean;
}

export function TopBar({ onMobileMenuToggle, sidebarCollapsed }: TopBarProps) {
  const [searchOpen, setSearchOpen] = useState(false);
  const [pageTitle, setPageTitle] = useState("Dashboard");
  
  // Update page title based on current path
  useEffect(() => {
    // In a real app, this would use router location to set the title
    // or read from a page title context
    const path = window.location.pathname;
    if (path.includes('projects')) {
      setPageTitle('Projects');
    } else if (path.includes('assets')) {
      setPageTitle('Assets');
    } else {
      setPageTitle('Dashboard');
    }
  }, []);

  return (
    <header className="sticky top-0 z-10 bg-background border-b border-gray-200 dark:border-gray-800">
      <div className="h-14 px-3 md:px-4 flex items-center justify-between">
        {/* Left section: menu toggle and page title */}
        <div className="flex items-center gap-2">
          {/* Mobile menu toggle with improved hover state */}
          <Button 
            variant="ghost" 
            size="sm"
            className="md:hidden hover:bg-gray-100 dark:hover:bg-gray-800"
            onClick={onMobileMenuToggle}
            aria-label="Toggle mobile menu"
          >
            <FiMenu className="h-4 w-4" />
          </Button>
          
          {/* Dynamic page title with proper text size */}
          <h1 className="text-base font-semibold hidden md:block">{pageTitle}</h1>
        </div>
        
        {/* Center section: theme variant selector */}
        <div className="hidden md:flex items-center justify-center gap-3">
          <span className="text-sm font-medium text-muted-foreground whitespace-nowrap">Theme:</span>
          <ThemeVariantSelector />
        </div>
        
        {/* Right section: search, actions, and user tools */}
        <div className="flex items-center gap-1.5 md:gap-2">
          {/* Search input with animation and proper layout */}
          <div className={cn(
            "relative transition-all duration-200 ease-in-out",
            searchOpen 
              ? "w-full absolute left-0 top-0 h-14 px-3 flex items-center bg-background z-20 border-b border-gray-200 dark:border-gray-800" 
              : "hidden md:block w-auto"
          )}>
            {searchOpen && (
              <Button
                variant="ghost"
                size="sm"
                className="mr-1.5 flex-shrink-0"
                onClick={() => setSearchOpen(false)}
                aria-label="Close search"
              >
                <FiX className="h-4 w-4" />
              </Button>
            )}
            
            <div className="relative flex-1 max-w-md">
              <FiSearch className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground pointer-events-none" />
              <input
                type="search"
                placeholder="Search..."
                className="rounded-md border border-input bg-background py-1.5 pl-8 pr-3 text-sm w-full focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-1"
              />
            </div>
          </div>
          
          {/* Mobile search toggle */}
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden"
            onClick={() => setSearchOpen(true)}
            aria-label="Open search"
          >
            <FiSearch className="h-4 w-4" />
          </Button>
          
          {/* Mobile theme selector (compact version) */}
          <div className="md:hidden">
            <ThemeVariantSelector triggerClassName="!min-w-0 w-9 h-9 !p-0 !justify-center !gap-0 bg-background" />
          </div>
          
          {/* Theme switcher */}
          <ThemeSwitcher />
          
          {/* Only show help button on larger screens */}
          <Button 
            variant="ghost" 
            size="sm"
            className="hidden md:flex"
            aria-label="Help"
          >
            <FiHelpCircle className="h-4 w-4" />
          </Button>
          
          {/* Notification button with attention-grabbing indicator */}
          <Button 
            variant="ghost" 
            size="sm" 
            className="relative"
            aria-label="Notifications"
          >
            <FiBell className="h-4 w-4" />
            <span className="absolute right-1 top-1 h-1.5 w-1.5 rounded-full bg-primary animate-pulse"></span>
          </Button>
          
          {/* Primary action button with consistent style */}
          <Button size="sm" className="hidden md:flex items-center gap-1.5 h-8 text-xs">
            <FiPlus className="h-3.5 w-3.5" />
            <span>New Project</span>
          </Button>
        </div>
      </div>
    </header>
  );
} 