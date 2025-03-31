import React from 'react';
import { Link } from 'react-router-dom';
import { ThemeSwitcher } from '../theme-switcher';

interface AppShellProps {
  children: React.ReactNode;
  hideHeader?: boolean;
}

export const AppShell = ({ children, hideHeader = false }: AppShellProps) => {
  return (
    <div className="min-h-screen bg-background">
      {!hideHeader && (
        <header className="sticky top-0 z-40 border-b border-border bg-card" data-component="header" role="banner">
          <div className="container mx-auto px-4">
            <div className="flex h-16 items-center justify-between">
              <div className="flex items-center gap-2">
                <Link to="/" className="text-xl font-bold text-foreground">Semantic UI</Link>
              </div>
              <div className="flex items-center gap-4">
                <nav className="hidden md:flex items-center space-x-4" data-component="main-nav" role="navigation" aria-label="Main Navigation">
                  <Link to="/" className="text-sm font-medium text-muted-foreground hover:text-foreground" data-nav-item="home">Home</Link>
                  <Link to="/components" className="text-sm font-medium text-muted-foreground hover:text-foreground" data-nav-item="components">Components</Link>
                  <Link to="/demo" className="text-sm font-medium text-muted-foreground hover:text-foreground" data-nav-item="demo">Demo</Link>
                  <Link to="/theme" className="text-sm font-medium text-muted-foreground hover:text-foreground" data-nav-item="theme">Theme</Link>
                </nav>
                <ThemeSwitcher />
              </div>
            </div>
          </div>
        </header>
      )}
      
      <main data-component="main-content" role="main">
        {children}
      </main>
      
      <footer className="border-t border-border bg-card" data-component="footer" role="contentinfo">
        <div className="container mx-auto px-4">
          <div className="py-6 text-center text-sm text-muted-foreground">
            <p>&copy; {new Date().getFullYear()} Semantic UI. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}; 