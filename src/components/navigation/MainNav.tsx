import React from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { FiHome, FiBriefcase, FiBox, FiSettings, FiLayers } from 'react-icons/fi';

interface MainNavProps {
  className?: string;
  currentPath?: string;
}

export function MainNav({ className, currentPath }: MainNavProps) {
  const routes = [
    {
      href: '/',
      label: 'Home',
      icon: FiHome,
      active: currentPath === '/'
    },
    {
      href: '/dashboard',
      label: 'Dashboard',
      icon: FiBriefcase,
      active: currentPath === '/dashboard'
    },
    {
      href: '/brands/builder',
      label: 'Brand Builder',
      icon: FiLayers,
      active: currentPath === '/brands/builder'
    },
    {
      href: '/components',
      label: 'Components',
      icon: FiBox,
      active: currentPath === '/components'
    },
    {
      href: '/settings',
      label: 'Settings',
      icon: FiSettings,
      active: currentPath === '/settings'
    }
  ];

  return (
    <nav className={cn('flex items-center space-x-6', className)}>
      {routes.map((route) => (
        <Link
          key={route.href}
          to={route.href}
          className={cn(
            'flex items-center space-x-2 text-sm font-medium transition-colors hover:text-primary',
            route.active ? 'text-primary' : 'text-muted-foreground'
          )}
        >
          <route.icon className="h-4 w-4" />
          <span>{route.label}</span>
        </Link>
      ))}
    </nav>
  );
}

export default MainNav; 