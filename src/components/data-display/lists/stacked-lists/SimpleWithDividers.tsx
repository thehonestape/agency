'use client'

import React from 'react'

interface ListItem {
  id: string
  name: string
  description?: string
  href?: string
}

interface SimpleWithDividersProps {
  items: ListItem[]
  className?: string
}

export function SimpleWithDividers({ items, className = '' }: SimpleWithDividersProps) {
  return (
    <div className={className}>
      <ul role="list" className="divide-y divide-gray-200">
        {items.map((item) => (
          <li key={item.id} className="py-4">
            {item.href ? (
              <a href={item.href} className="block hover:bg-gray-50">
                <p className="font-medium text-gray-900">{item.name}</p>
                {item.description && (
                  <p className="mt-1 text-sm text-gray-500">{item.description}</p>
                )}
              </a>
            ) : (
              <>
                <p className="font-medium text-gray-900">{item.name}</p>
                {item.description && (
                  <p className="mt-1 text-sm text-gray-500">{item.description}</p>
                )}
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}

// Example usage:
// <SimpleWithDividers 
//   items={[
//     { id: '1', name: 'Focus on user experience design', description: 'Improve the user flow and overall usability of the application' },
//     { id: '2', name: 'Mobile responsiveness', description: 'Ensure all pages work well on various screen sizes' },
//     { id: '3', name: 'API integration', description: 'Connect with backend services and implement data fetching' },
//     { id: '4', name: 'Accessibility compliance', description: 'Make sure the app meets WCAG 2.1 standards' },
//   ]}
// /> 