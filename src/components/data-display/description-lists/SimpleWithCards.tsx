'use client'

import React from 'react'

interface DescriptionItem {
  term: string
  details: React.ReactNode
}

interface SimpleWithCardsProps {
  items: DescriptionItem[]
  className?: string
}

export function SimpleWithCards({ items, className = '' }: SimpleWithCardsProps) {
  return (
    <div className={`${className}`}>
      <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
        {items.map((item, index) => (
          <div key={index} className="border-t border-gray-200 pt-6">
            <dt className="text-base font-medium text-gray-900">{item.term}</dt>
            <dd className="mt-2 text-sm text-gray-500">{item.details}</dd>
          </div>
        ))}
      </dl>
    </div>
  )
}

// Example usage:
// <SimpleWithCards 
//   items={[
//     { 
//       term: 'Application for', 
//       details: 'Frontend Developer' 
//     },
//     { 
//       term: 'Job status', 
//       details: 'Full-time' 
//     },
//     { 
//       term: 'Work schedule', 
//       details: 'Remote' 
//     },
//     { 
//       term: 'Salary expectation', 
//       details: '$120,000 USD' 
//     },
//   ]}
// /> 