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
    <div className={cn(
      styles.stacked.container,
      styles.base.background,
      styles.density,
      layout?.container?.name && styles.container[layout.container.name],
      variants?.sm,
      variants?.md,
      variants?.lg,
      variants?.xl,
      className
    )}>
      {/* Navigation */}
      <header className={cn(
        "bg-[var(--nav-bg)]",
        "border-b border-[var(--nav-border)]",
        styles.stacked.header
      )}>
        <nav className={cn(
          "mx-auto flex max-w-7xl items-center justify-between gap-x-6 p-6 lg:px-8",
          styles.navigation?.top?.nav
        )} aria-label="Global">
          <div className="flex lg:flex-1">
            <Link to="/" className="-m-1.5 p-1.5">
              <span className="sr-only">Your Company</span>
              <img
                className="h-8 w-auto"
                src="https://tailwindui.com/img/logos/mark.svg?color=white"
                alt=""
              />
            </Link>
          </div>
          <div className="flex lg:hidden">
            <button
              type="button"
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-[var(--nav-icon)]"
              onClick={() => setMobileMenuOpen(true)}
            >
              <span className="sr-only">Open main menu</span>
              <Bars3Icon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="hidden lg:flex lg:gap-x-12">
            {navigation.map((item) => (
              <Link
                key={item.id}
                to={item.href || '#'}
                className={cn(
                  "text-sm font-semibold leading-6",
                  item.active
                    ? "text-[var(--nav-text-active)] bg-[var(--nav-bg-active)]"
                    : "text-[var(--nav-text)] hover:text-[var(--nav-text-hover)] hover:bg-[var(--nav-bg-hover)]"
                )}
              >
                {item.label}
              </Link>
            ))}
          </div>
          <div className="hidden lg:flex lg:flex-1 lg:justify-end">
            <Link
              to="/profile"
              className="text-sm font-semibold leading-6 text-[var(--nav-text)] hover:text-[var(--nav-text-hover)]"
            >
              Your profile <span aria-hidden="true">&rarr;</span>
            </Link>
          </div>
        </nav>
        <Dialog as="div" className="lg:hidden" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
          <div className="fixed inset-0 z-10" />
          <Dialog.Panel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-[var(--nav-bg)] px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-[var(--nav-border)]">
            <div className="flex items-center justify-between">
              <Link to="/" className="-m-1.5 p-1.5">
                <span className="sr-only">Your Company</span>
                <img
                  className="h-8 w-auto"
                  src="https://tailwindui.com/img/logos/mark.svg?color=white"
                  alt=""
                />
              </Link>
              <button
                type="button"
                className="-m-2.5 rounded-md p-2.5 text-[var(--nav-icon)]"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="sr-only">Close menu</span>
                <XMarkIcon className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-[var(--nav-border)]">
                <div className="space-y-2 py-6">
                  {navigation.map((item) => (
                    <Link
                      key={item.id}
                      to={item.href || '#'}
                      className={cn(
                        "-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7",
                        item.active
                          ? "bg-[var(--nav-bg-active)] text-[var(--nav-text-active)]"
                          : "text-[var(--nav-text)] hover:bg-[var(--nav-bg-hover)] hover:text-[var(--nav-text-hover)]"
                      )}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
                <div className="py-6">
                  {userNavigation.map((item) => (
                    <Link
                      key={item.id}
                      to={item.href || '#'}
                      className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-[var(--nav-text)] hover:bg-[var(--nav-bg-hover)] hover:text-[var(--nav-text-hover)]"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </Dialog.Panel>
        </Dialog>
      </header>

      {/* Page Header */}
      <header className={cn(
        "bg-[var(--background)] shadow-sm border-b border-[var(--border)]",
        styles.stacked.header
      )}>
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-[var(--foreground)]">{title}</h1>
              <p className="mt-1 text-sm text-[var(--muted-foreground)]">{description}</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className={cn(
        "py-10 bg-[var(--background)]",
        styles.stacked.main
      )}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {children}
        </div>
      </main>
    </div>
  );
}

export default DarkNavWithWhitePageHeader; 