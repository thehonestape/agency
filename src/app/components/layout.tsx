'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { 
  DocumentTextIcon, 
  DocumentDuplicateIcon, 
  ChartBarIcon, 
  HomeIcon,
  ExclamationCircleIcon
} from '@heroicons/react/24/outline'

export default function ComponentsLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  
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
      ]
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
      ]
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
      ]
    },
    {
      name: 'Feedback Components',
      href: '/components/feedback',
      icon: ExclamationCircleIcon,
      current: pathname.startsWith('/components/feedback'),
      subCategories: [
        { name: 'Alerts', href: '/components/feedback/alerts' },
        { name: 'Empty States', href: '/components/feedback/empty-states' },
      ]
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="fixed w-full bg-white shadow-sm z-10">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <Link href="/" className="font-bold text-xl text-blue-600">
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
                  } inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium`}
                >
                  Components
                </Link>
                <Link
                  href="/documentation"
                  className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                >
                  Documentation
                </Link>
                <Link
                  href="/examples"
                  className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                >
                  Examples
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="pt-16 pb-10">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="flex">
            {/* Sidebar */}
            <div className="hidden md:block w-64 shrink-0">
              <div className="sticky top-20 overflow-y-auto h-[calc(100vh-5rem)] pr-4">
                <nav className="space-y-1">
                  {categories.map((category) => (
                    <div key={category.name} className="mb-2">
                      <Link
                        href={category.href}
                        className={`${
                          category.current
                            ? 'bg-blue-50 text-blue-600'
                            : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                        } group flex items-center px-3 py-2 text-sm font-medium rounded-md`}
                      >
                        <category.icon
                          className={`${
                            category.current
                              ? 'text-blue-500'
                              : 'text-gray-400 group-hover:text-gray-500'
                          } flex-shrink-0 -ml-1 mr-3 h-6 w-6`}
                          aria-hidden="true"
                        />
                        <span className="truncate">{category.name}</span>
                      </Link>

                      {category.subCategories && category.current && (
                        <div className="mt-1 pl-10 space-y-1">
                          {category.subCategories.map((subCategory) => (
                            <Link
                              key={subCategory.name}
                              href={subCategory.href}
                              className={`${
                                pathname === subCategory.href
                                  ? 'text-blue-600 font-medium'
                                  : 'text-gray-500 hover:text-gray-700'
                              } group flex items-center px-3 py-2 text-sm rounded-md`}
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
            <div className="flex-1 min-w-0 bg-white p-4 sm:p-6 rounded-lg shadow">
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 