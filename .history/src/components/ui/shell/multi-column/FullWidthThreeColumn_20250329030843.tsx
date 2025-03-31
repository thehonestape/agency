import React, { Fragment, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';
import { type MultiColumnShellProps } from '../types';
import { composeMultiColumnShellStyles } from '../compose';
import { cn } from '@/lib/utils';

const navigation = [
  { id: 'dashboard', label: 'Dashboard', href: '/dashboard', active: true },
  { id: 'team', label: 'Team', href: '/team', active: false },
  { id: 'projects', label: 'Projects', href: '/projects', active: false },
  { id: 'calendar', label: 'Calendar', href: '/calendar', active: false },
  { id: 'documents', label: 'Documents', href: '/documents', active: false },
  { id: 'reports', label: 'Reports', href: '/reports', active: false },
];

const userNavigation = [
  { id: 'profile', label: 'Your profile', href: '/profile' },
  { id: 'settings', label: 'Settings', href: '/settings' },
  { id: 'signout', label: 'Sign out', href: '/logout' },
];

export function FullWidthThreeColumn({
  children,
  title = 'Project Overview',
  description = 'A comprehensive view with three columns for optimal information display.',
  theme,
  density,
  layout = {
    type: 'multi-column',
    columns: {
      left: { width: 'w-72' },
      main: { width: 'flex-1' },
      right: { width: 'w-72' },
    },
  },
  navigation: navConfig,
  variants,
  className,
}: MultiColumnShellProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const styles = composeMultiColumnShellStyles({ 
    theme, 
    density, 
    layout,
    navigation: { 
      type: 'side', 
      items: navConfig?.items || navigation,
    },
    variants 
  });

  // Use the custom navigation items if provided, otherwise fallback to default
  const sideNavItems = navConfig?.items || navigation;
  const useDefaultNav = !navConfig?.items;

  return (
    <div className={cn(styles.multiColumn.container, className)}>
      {/* Mobile sidebar */}
      <Transition.Root show={sidebarOpen} as={Fragment}>
        <Dialog as="div" className="relative z-50 lg:hidden" onClose={setSidebarOpen}>
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-900/80" />
          </Transition.Child>

          <div className="fixed inset-0 flex">
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <Dialog.Panel className="relative mr-16 flex w-full max-w-xs flex-1">
                <Transition.Child
                  as={Fragment}
                  enter="ease-in-out duration-300"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="ease-in-out duration-300"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <div className="absolute left-full top-0 flex w-16 justify-center pt-5">
                    <button type="button" className="-m-2.5 p-2.5" onClick={() => setSidebarOpen(false)}>
                      <span className="sr-only">Close sidebar</span>
                      <XMarkIcon className="h-6 w-6 text-white" aria-hidden="true" />
                    </button>
                  </div>
                </Transition.Child>
                {/* Sidebar component for mobile */}
                <div className={cn(
                  "flex grow flex-col gap-y-5 overflow-y-auto bg-gray-900 px-6 pb-4",
                  styles.multiColumn.left
                )}>
                  <div className="flex h-16 shrink-0 items-center">
                    <img
                      className="h-8 w-auto"
                      src="https://tailwindui.com/img/logos/mark.svg?color=white"
                      alt="Your Company"
                    />
                  </div>
                  <nav className="flex flex-1 flex-col">
                    <ul role="list" className="flex flex-1 flex-col gap-y-7">
                      <li>
                        <ul role="list" className="-mx-2 space-y-1">
                          {sideNavItems.map((item) => (
                            <li key={item.id}>
                              <Link
                                to={item.href || '#'}
                                className={cn(
                                  item.active
                                    ? 'bg-gray-800 text-white'
                                    : 'text-gray-400 hover:text-white hover:bg-gray-800',
                                  'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold'
                                )}
                              >
                                {item.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </li>
                      {useDefaultNav && (
                        <li className="mt-auto">
                          <ul role="list" className="-mx-2 space-y-1">
                            {userNavigation.map((item) => (
                              <li key={item.id}>
                                <Link
                                  to={item.href}
                                  className={cn(
                                    'text-gray-400 hover:text-white hover:bg-gray-800',
                                    'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold'
                                  )}
                                >
                                  {item.label}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </li>
                      )}
                    </ul>
                  </nav>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>

      {/* Static sidebar for desktop */}
      {navConfig?.items ? (
        // This is an empty div that prevents layout shift but doesn't show navigation
        <div className={cn(
          "hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:flex-col",
          layout.columns.left?.width || styles.multiColumn.left
        )}></div>
      ) : (
        <div className={cn(
          "hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:flex-col",
          layout.columns.left?.width || styles.multiColumn.left
        )}>
          <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-gray-900 px-6 pb-4">
            <div className="flex h-16 shrink-0 items-center">
              <img
                className="h-8 w-auto"
                src="https://tailwindui.com/img/logos/mark.svg?color=white"
                alt="Your Company"
              />
            </div>
            <nav className="flex flex-1 flex-col">
              <ul role="list" className="flex flex-1 flex-col gap-y-7">
                <li>
                  <ul role="list" className="-mx-2 space-y-1">
                    {sideNavItems.map((item) => (
                      <li key={item.id}>
                        <Link
                          to={item.href || '#'}
                          className={cn(
                            item.active
                              ? 'bg-gray-800 text-white'
                              : 'text-gray-400 hover:text-white hover:bg-gray-800',
                            'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold'
                          )}
                        >
                          {'icon' in item && item.icon ? item.icon : null}
                          {item.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </li>
                <li className="mt-auto">
                  <ul role="list" className="-mx-2 space-y-1">
                    {userNavigation.map((item) => (
                      <li key={item.id}>
                        <Link
                          to={item.href}
                          className={cn(
                            'text-gray-400 hover:text-white hover:bg-gray-800',
                            'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold'
                          )}
                        >
                          {item.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      )}

      {/* Main content */}
      <div className={cn("lg:pl-72", styles.multiColumn.main)}>
        <div className={cn(
          "sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 bg-white px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8",
          styles.content.header
        )}>
          <button
            type="button"
            className="-m-2.5 p-2.5 text-gray-700 lg:hidden"
            onClick={() => setSidebarOpen(true)}
          >
            <span className="sr-only">Open sidebar</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>

          {/* Separator */}
          <div className="h-6 w-px bg-gray-200 lg:hidden" aria-hidden="true" />

          <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
            <div className="flex flex-1">
              <h1 className="text-2xl font-semibold text-gray-900">{title}</h1>
              {description && (
                <p className="mt-1 text-sm text-gray-500">{description}</p>
              )}
            </div>
          </div>
        </div>

        <main className="py-10">
          <div className="px-4 sm:px-6 lg:px-8">
            {children}
          </div>
        </main>
      </div>

      {/* Right column */}
      <div className={cn(
        "hidden xl:fixed xl:inset-y-0 xl:right-0 xl:z-50 xl:flex xl:flex-col",
        layout.columns.right?.width || styles.multiColumn.right
      )}>
        <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-gray-50 px-6 pb-4">
          <div className="flex h-16 shrink-0 items-center">
            <h2 className="text-lg font-semibold text-gray-900">Details</h2>
          </div>
          <div className="flex flex-1 flex-col">
            {/* Add your right column content here */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default FullWidthThreeColumn; 