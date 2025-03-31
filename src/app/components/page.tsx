'use client';

import React from 'react';
import Link from 'next/link';
import {
  DocumentTextIcon,
  DocumentDuplicateIcon,
  ChartBarIcon,
  CalendarIcon,
  TableCellsIcon,
  CubeIcon,
  ArrowRightIcon,
  ClockIcon,
  ExclamationCircleIcon,
} from '@heroicons/react/24/outline';

export default function ComponentsLanding() {
  const categories = [
    {
      name: 'Form Components',
      description: 'Input fields, select menus, checkboxes, and authentication forms',
      href: '/components/forms',
      icon: DocumentTextIcon,
      count: 14,
      subcategories: [
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
      description: 'Containers, grids, and structural elements',
      href: '/components/layout',
      icon: DocumentDuplicateIcon,
      count: 6,
      subcategories: [
        { name: 'Containers', href: '/components/layout/containers' },
        { name: 'Grids', href: '/components/layout/grids' },
        { name: 'Cards', href: '/components/layout/cards' },
      ],
    },
    {
      name: 'Data Display',
      description: 'Stats, calendars, tables, and charts for visualizing data',
      href: '/components/data-display',
      icon: ChartBarIcon,
      count: 8,
      subcategories: [
        { name: 'Stats', href: '/components/data-display/stats' },
        { name: 'Calendars', href: '/components/data-display/calendars' },
        { name: 'Tables', href: '/components/data-display/tables' },
        { name: 'Charts', href: '/components/data-display/charts' },
      ],
    },
    {
      name: 'Feedback',
      description: 'Alert messages, notifications, and empty states',
      href: '/components/feedback',
      icon: ExclamationCircleIcon,
      count: 5,
      subcategories: [
        { name: 'Alerts', href: '/components/feedback/alerts' },
        { name: 'Empty States', href: '/components/feedback/empty-states' },
      ],
    },
  ];

  const recentComponents = [
    {
      name: 'MonthView Calendar',
      category: 'Data Display',
      href: '/components/data-display/calendars',
    },
    {
      name: 'Stats with Brand Icon',
      category: 'Data Display',
      href: '/components/data-display/stats',
    },
    {
      name: 'Input with Leading Icon',
      category: 'Form Components',
      href: '/components/forms/input-groups',
    },
    { name: 'Simple Checkbox', category: 'Form Components', href: '/components/forms/checkboxes' },
    {
      name: 'Authentication Forms',
      category: 'Form Components',
      href: '/components/forms/authentication',
    },
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Tailwind UI Components
        </h1>
        <p className="mt-3 text-xl text-gray-500 sm:mt-4">
          Beautiful, fully responsive UI components for your next project
        </p>
      </div>

      <div className="mt-16">
        <h2 className="text-lg font-medium text-gray-900">Browse components by category</h2>
        <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((category) => (
            <div
              key={category.name}
              className="group relative rounded-lg border border-gray-200 bg-white p-6 shadow-sm transition-all duration-200 hover:shadow-md"
            >
              <div>
                <span className="inline-flex items-center justify-center rounded-md bg-blue-50 p-3">
                  <category.icon className="h-6 w-6 text-blue-600" aria-hidden="true" />
                </span>
              </div>
              <div className="mt-4">
                <h3 className="text-lg font-medium text-gray-900">
                  <Link href={category.href} className="focus:outline-none">
                    <span className="absolute inset-0" aria-hidden="true" />
                    {category.name}
                  </Link>
                </h3>
                <p className="mt-2 text-sm text-gray-500">{category.description}</p>
                <div className="mt-4">
                  <span className="text-xs font-medium text-gray-400">
                    {category.count} components
                  </span>
                </div>
                <div className="mt-3 space-y-1">
                  {category.subcategories.map((subcat) => (
                    <Link
                      key={subcat.name}
                      href={subcat.href}
                      className="relative z-10 flex items-center text-sm text-blue-600 hover:text-blue-800"
                    >
                      <ArrowRightIcon className="mr-1 h-3 w-3" />
                      {subcat.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-16">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-medium text-gray-900">Recently added</h2>
          <Link
            href="/components/all"
            className="text-sm font-medium text-blue-600 hover:text-blue-500"
          >
            View all
          </Link>
        </div>
        <div className="mt-6 overflow-hidden rounded-lg border border-gray-200 shadow">
          <ul role="list" className="divide-y divide-gray-200">
            {recentComponents.map((component) => (
              <li key={component.name} className="group hover:bg-gray-50">
                <Link href={component.href} className="block p-4">
                  <div className="flex items-center">
                    <div className="mr-3 flex-shrink-0">
                      <ClockIcon className="h-5 w-5 text-gray-400" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium text-gray-900">{component.name}</p>
                      <p className="truncate text-sm text-gray-500">{component.category}</p>
                    </div>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-16 rounded-lg bg-blue-50 p-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900">Getting Started</h2>
          <p className="mt-4 text-lg text-gray-600">
            Explore our component library and start building beautiful interfaces quickly
          </p>
          <div className="mt-6">
            <Link
              href="/components/all"
              className="inline-flex items-center rounded-md border border-transparent bg-blue-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-blue-700"
            >
              Browse all components
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
