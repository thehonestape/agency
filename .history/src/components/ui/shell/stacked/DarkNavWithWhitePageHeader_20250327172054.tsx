import React, { useState } from 'react';
import { Dialog } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { HomeIcon } from '@heroicons/react/20/solid';
import { Link } from 'react-router-dom';
import { type StackedShellProps } from '../types';
import { composeStackedShellStyles } from '../compose';
import { cn } from '@/lib/utils';

const navigation = [
  { id: 'dashboard', label: 'Dashboard', href: '/dashboard', active: true },
  { id: 'team', label: 'Team', href: '/team', active: false },
  { id: 'projects', label: 'Projects', href: '/projects', active: false },
  { id: 'brands', label: 'Brands', href: '/brands', active: false },
  { id: 'components', label: 'Components', href: '/components', active: false },
];

const userNavigation = [
  { id: 'profile', label: 'Your Profile', href: '/profile' },
  { id: 'settings', label: 'Settings', href: '/settings' },
  { id: 'signout', label: 'Sign out', href: '/logout' },
];

const breadcrumbs = [
  { name: 'Projects', href: '/projects', current: false },
  { name: 'Project Nero', href: '/projects/nero', current: true },
];

export function DarkNavWithWhitePageHeader({
  children,
  title = 'Project Nero',
  description = 'Keep track of your project and monitor progress towards completion.',
  theme,
  density,
  layout,
  navigation: navConfig,
  variants,
  className,
}: StackedShellProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const styles = composeStackedShellStyles({ 
    theme, 
    density, 
    layout: { ...layout }, 
    navigation: { type: 'top', items: navigation, ...navConfig },
    variants 
  });

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="bg-card border-b">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 justify-between">
            <div className="flex">
              <div className="flex flex-shrink-0 items-center">
                <Link to="/" className="text-xl font-bold text-primary">
                  Agency
                </Link>
              </div>
              <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                <Link
                  to="/work"
                  className="inline-flex items-center border-b-2 border-transparent px-1 pt-1 text-sm font-medium text-muted-foreground hover:border-primary hover:text-foreground"
                >
                  Work
                </Link>
                <Link
                  to="/pricing"
                  className="inline-flex items-center border-b-2 border-transparent px-1 pt-1 text-sm font-medium text-muted-foreground hover:border-primary hover:text-foreground"
                >
                  Pricing
                </Link>
                <Link
                  to="/services"
                  className="inline-flex items-center border-b-2 border-transparent px-1 pt-1 text-sm font-medium text-muted-foreground hover:border-primary hover:text-foreground"
                >
                  Services
                </Link>
                <Link
                  to="/studio"
                  className="inline-flex items-center border-b-2 border-transparent px-1 pt-1 text-sm font-medium text-muted-foreground hover:border-primary hover:text-foreground"
                >
                  Studio
                </Link>
              </div>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:items-center">
              <Link
                to="/onboarding"
                className="rounded-md bg-primary px-3 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Page Header */}
      <header className="bg-card shadow">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight text-foreground">
            Welcome to Agency
          </h1>
        </div>
      </header>

      {/* Main Content */}
      <main>
        <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
          {children}
        </div>
      </main>
    </div>
  );
}

export default DarkNavWithWhitePageHeader; 