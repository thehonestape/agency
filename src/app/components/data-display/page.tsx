'use client'

import React from 'react'
import Link from 'next/link'
import { 
  ChartBarIcon, 
  CalendarIcon, 
  TableCellsIcon, 
  ArrowRightIcon
} from '@heroicons/react/24/outline'

export default function DataDisplayIndex() {
  const dataDisplayCategories = [
    {
      name: 'Stats',
      description: 'Display metrics and key indicators with various styles',
      href: '/components/data-display/stats',
      icon: ChartBarIcon,
      components: ['SimpleCards', 'WithBrandIcon']
    },
    {
      name: 'Calendars',
      description: 'Date pickers and calendar views for events and scheduling',
      href: '/components/data-display/calendars',
      icon: CalendarIcon,
      components: ['MonthView']
    },
    {
      name: 'Tables',
      description: 'Organize and display data in tabular format',
      href: '/components/data-display/tables',
      icon: TableCellsIcon,
      components: ['SimpleTable', 'SortableTable', 'WithPagination']
    }
  ]

  return (
    <div className="w-full px-4 py-8">
      <h1 className="text-2xl font-semibold mb-2">Data Display Components</h1>
      <p className="text-gray-600 mb-8">Components for displaying data and information in various formats</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {dataDisplayCategories.map((category) => (
          <div 
            key={category.name}
            className="bg-white rounded-lg shadow overflow-hidden hover:shadow-md transition-shadow"
          >
            <div className="p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0 p-2 bg-blue-50 rounded-md">
                  <category.icon className="h-6 w-6 text-blue-600" />
                </div>
                <h2 className="ml-3 text-lg font-medium text-gray-900">{category.name}</h2>
              </div>
              
              <p className="mt-3 text-gray-600">{category.description}</p>
              
              <div className="mt-4">
                <h3 className="text-sm font-medium text-gray-700">Components:</h3>
                <ul className="mt-2 space-y-1">
                  {category.components.map((component) => (
                    <li key={component} className="text-sm text-gray-600">
                      • {component}
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="mt-5">
                <Link 
                  href={category.href} 
                  className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-800"
                >
                  View {category.name}
                  <ArrowRightIcon className="ml-1 h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-12 bg-blue-50 rounded-lg p-6">
        <h2 className="text-lg font-medium text-gray-900">Getting Started with Data Display</h2>
        <p className="mt-2 text-gray-600">
          Our data display components help you present information in clear, 
          visually appealing ways. Choose from different styles and options 
          to best showcase your data.
        </p>
        <div className="mt-4">
          <Link
            href="/components/data-display/stats"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
          >
            Explore Stats Components
          </Link>
        </div>
      </div>
    </div>
  )
} 