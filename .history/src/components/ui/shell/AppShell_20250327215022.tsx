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
        <header className="sticky top-0 z-40 border-b border-border bg-card">
          <div className="container mx-auto px-4">
            <div className="flex h-16 items-center justify-between">
              <div className="flex items-center gap-2">
                <Link to="/" className="text-xl font-bold text-foreground">Semantic UI</Link>
              </div>
              <div className="flex items-center gap-4">
                <nav className="hidden md:flex items-center space-x-4">
                  <Link to="/" className="text-sm font-medium text-muted-foreground hover:text-foreground">Home</Link>
                  <Link to="/components" className="text-sm font-medium text-muted-foreground hover:text-foreground">Components</Link>
                  <Link to="/demo" className="text-sm font-medium text-muted-foreground hover:text-foreground">Demo</Link>
                  <Link to="/theme" className="text-sm font-medium text-muted-foreground hover:text-foreground">Theme</Link>
                </nav>
                <ThemeSwitcher />
              </div>
            </div>
          </div>
        </header>
      )}
      
      {children}
      
      <footer className="border-t border-border bg-card">
        <div className="container mx-auto px-4">
          <div className="py-6 text-center text-sm text-muted-foreground">
            <p>© {new Date().getFullYear()} Semantic UI. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}; 