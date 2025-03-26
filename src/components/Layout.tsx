import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FiHome, FiBriefcase, FiLayers, FiBox, FiCpu, FiUser, FiMoon, FiSun, FiTrello } from 'react-icons/fi';
import { useTheme } from '../lib/ThemeProvider';
import { cn } from '../lib/utils';

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const { theme, setTheme } = useTheme();
  const location = useLocation();

  const navigation = [
    { name: 'Dashboard', href: '/', icon: <FiHome className="w-5 h-5" /> },
    { name: 'Brands', href: '/brands', icon: <FiBriefcase className="w-5 h-5" /> },
    { name: 'Projects', href: '/projects', icon: <FiLayers className="w-5 h-5" /> },
    { name: 'Project Management', href: '/project-management', icon: <FiTrello className="w-5 h-5" /> },
    { name: 'Assets', href: '/assets', icon: <FiBox className="w-5 h-5" /> },
    { name: 'AI Help', href: '/ai-help', icon: <FiCpu className="w-5 h-5" /> },
  ];

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <header className="bg-primary text-primary-foreground sticky top-0 z-40 w-full border-b">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link to="/" className="text-xl font-bold">
              Workhorse AI Platform
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="p-2 rounded-md hover:bg-primary-foreground/10"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <FiSun className="w-5 h-5" /> : <FiMoon className="w-5 h-5" />}
            </button>
            <button className="flex items-center gap-2 p-2 rounded-md hover:bg-primary-foreground/10">
              <FiUser className="w-5 h-5" />
              <span>Account</span>
            </button>
          </div>
        </div>
      </header>

      <div className="flex-1 flex">
        <aside className="w-64 border-r bg-card hidden md:block">
          <nav className="flex flex-col gap-1 p-4">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={cn(
                  'flex items-center gap-3 px-3 py-2 rounded-md transition-colors',
                  isActive(item.href)
                    ? 'bg-primary text-primary-foreground'
                    : 'hover:bg-muted'
                )}
              >
                {item.icon}
                <span>{item.name}</span>
              </Link>
            ))}
          </nav>
        </aside>
        
        <main className="flex-1 overflow-auto">
          <div className="container py-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
} 