'use client'

import React from 'react'
import Link from 'next/link'
import { 
  ExclamationCircleIcon, 
  XCircleIcon, 
  ArrowRightIcon,
} from '@heroicons/react/24/outline'

export default function FeedbackIndex() {
  const feedbackCategories = [
    {
      name: 'Alerts',
      description: 'Informational messages to notify users about system events or feedback',
      href: '/components/feedback/alerts',
      icon: ExclamationCircleIcon,
      components: ['SimpleAlert', 'WithDescription', 'WithActions', 'WithDismiss']
    },
    {
      name: 'Empty States',
      description: 'Placeholder content for when there is no data to display',
      href: '/components/feedback/empty-states',
      icon: XCircleIcon,
      components: ['SimpleEmptyState', 'WithAction', 'WithIllustration']
    }
  ]

  return (
    <div className="w-full px-4 py-8">
      <h1 className="text-2xl font-semibold mb-2">Feedback Components</h1>
      <p className="text-gray-600 mb-8">Components for providing feedback and guiding users</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {feedbackCategories.map((category) => (
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
        <h2 className="text-lg font-medium text-gray-900">Using Feedback Components</h2>
        <p className="mt-2 text-gray-600">
          Feedback components help provide users with important information, confirm actions, 
          show errors, or guide them when no data is available. Use these components to enhance 
          user experience and provide clear communication in your applications.
        </p>
        <div className="mt-4">
          <Link
            href="/components/feedback/alerts"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
          >
            Explore Alert Components
          </Link>
        </div>
      </div>
    </div>
  )
} 