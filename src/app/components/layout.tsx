'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  DocumentTextIcon,
  DocumentDuplicateIcon,
  ChartBarIcon,
  HomeIcon,
  ExclamationCircleIcon,
} from '@heroicons/react/24/outline';

export default function ComponentsLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const categories = [
    {
      name: 'Components Home',
      href: '/components',
      icon: HomeIcon,
      current: pathname === '/components',
    },
    {
      name: 'Form Components',
      href: '/components/forms',
      icon: DocumentTextIcon,
      current: pathname.startsWith('/components/forms'),
      subCategories: [
        { name: 'Input Groups', href: '/components/forms/input-groups' },
        { name: 'Select Menus', href: '/components/forms/select-menus' },
        { name: 'Checkboxes', href: '/components/forms/checkboxes' },
        { name: 'Authentication', href: '/components/forms/authentication' },
        { name: 'Action Panels', href: '/components/forms/action-panels' },
        { name: 'Comboboxes', href: '/components/forms/comboboxes' },
      ],
    },
    {
      name: 'Layout Components',
      href: '/components/layout',
      icon: DocumentDuplicateIcon,
      current: pathname.startsWith('/components/layout'),
      subCategories: [
        { name: 'Containers', href: '/components/layout/containers' },
        { name: 'Grids', href: '/components/layout/grids' },
        { name: 'Cards', href: '/components/layout/cards' },
      ],
    },
    {
      name: 'Data Display',
      href: '/components/data-display',
      icon: ChartBarIcon,
      current: pathname.startsWith('/components/data-display'),
      subCategories: [
        { name: 'Stats', href: '/components/data-display/stats' },
        { name: 'Calendars', href: '/components/data-display/calendars' },
        { name: 'Tables', href: '/components/data-display/tables' },
        { name: 'Charts', href: '/components/data-display/charts' },
      ],
    },
    {
      name: 'Feedback Components',
      href: '/components/feedback',
      icon: ExclamationCircleIcon,
      current: pathname.startsWith('/components/feedback'),
      subCategories: [
        { name: 'Alerts', href: '/components/feedback/alerts' },
        { name: 'Empty States', href: '/components/feedback/empty-states' },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="fixed z-10 w-full bg-white shadow-sm">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 justify-between">
            <div className="flex">
              <div className="flex flex-shrink-0 items-center">
                <Link href="/" className="text-xl font-bold text-blue-600">
                  Tailwind UI
                </Link>
              </div>
              <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                <Link
                  href="/components"
                  className={`${
                    pathname.startsWith('/components')
                      ? 'border-blue-500 text-gray-900'
                      : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                  } inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium`}
                >
                  Components
                </Link>
                <Link
                  href="/documentation"
                  className="inline-flex items-center border-b-2 border-transparent px-1 pt-1 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
                >
                  Documentation
                </Link>
                <Link
                  href="/examples"
                  className="inline-flex items-center border-b-2 border-transparent px-1 pt-1 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
                >
                  Examples
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="pt-16 pb-10">
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="flex">
            {/* Sidebar */}
            <div className="hidden w-64 shrink-0 md:block">
              <div className="sticky top-20 h-[calc(100vh-5rem)] overflow-y-auto pr-4">
                <nav className="space-y-1">
                  {categories.map((category) => (
                    <div key={category.name} className="mb-2">
                      <Link
                        href={category.href}
                        className={`${
                          category.current
                            ? 'bg-blue-50 text-blue-600'
                            : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                        } group flex items-center rounded-md px-3 py-2 text-sm font-medium`}
                      >
                        <category.icon
                          className={`${
                            category.current
                              ? 'text-blue-500'
                              : 'text-gray-400 group-hover:text-gray-500'
                          } mr-3 -ml-1 h-6 w-6 flex-shrink-0`}
                          aria-hidden="true"
                        />
                        <span className="truncate">{category.name}</span>
                      </Link>

                      {category.subCategories && category.current && (
                        <div className="mt-1 space-y-1 pl-10">
                          {category.subCategories.map((subCategory) => (
                            <Link
                              key={subCategory.name}
                              href={subCategory.href}
                              className={`${
                                pathname === subCategory.href
                                  ? 'font-medium text-blue-600'
                                  : 'text-gray-500 hover:text-gray-700'
                              } group flex items-center rounded-md px-3 py-2 text-sm`}
                            >
                              <span className="truncate">{subCategory.name}</span>
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </nav>
              </div>
            </div>

            {/* Main content */}
            <div className="min-w-0 flex-1 rounded-lg bg-white p-4 shadow sm:p-6">{children}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
