'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function DataDisplayLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  
  const dataDisplayCategories = [
    {
      name: 'Stats',
      href: '/components/data-display/stats',
      current: pathname === '/components/data-display/stats',
    },
    {
      name: 'Calendars',
      href: '/components/data-display/calendars',
      current: pathname === '/components/data-display/calendars',
    },
    {
      name: 'Tables',
      href: '/components/data-display/tables',
      current: pathname === '/components/data-display/tables',
    },
    {
      name: 'Charts',
      href: '/components/data-display/charts',
      current: pathname === '/components/data-display/charts',
    },
  ]

  return (
    <div className="relative">
      <div className="w-full mx-auto px-4">
        <h1 className="text-3xl font-bold mb-6">Data Display Components</h1>
        
        <div className="flex flex-col sm:flex-row gap-8">
          {/* Sidebar navigation */}
          <div className="w-full sm:w-1/5">
            <nav className="space-y-1 sticky top-4">
              {dataDisplayCategories.map((category) => (
                <Link
                  key={category.name}
                  href={category.href}
                  className={`${
                    category.current
                      ? 'bg-blue-50 border-blue-500 text-blue-700'
                      : 'border-transparent text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  } flex items-center px-3 py-2 text-sm font-medium border-l-4`}
                  aria-current={category.current ? 'page' : undefined}
                >
                  {category.name}
                </Link>
              ))}
            </nav>
          </div>
          
          {/* Main content area */}
          <div className="w-full sm:w-4/5">
            {children}
          </div>
        </div>
      </div>
    </div>
  )
} 