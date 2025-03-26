'use client'

import React, { ReactNode } from 'react'

interface StatItem {
  name: string
  value: string
  icon?: ReactNode
  description?: string
}

interface WithBrandIconProps {
  stats: StatItem[]
  columns?: 1 | 2 | 3 | 4
  className?: string
}

export function WithBrandIcon({ stats, columns = 3, className = '' }: WithBrandIconProps) {
  const getGridCols = () => {
    switch(columns) {
      case 1: return 'sm:grid-cols-1';
      case 2: return 'sm:grid-cols-2';
      case 3: return 'sm:grid-cols-3';
      case 4: return 'sm:grid-cols-4';
      default: return 'sm:grid-cols-3';
    }
  }

  return (
    <div className={className}>
      <dl className={`grid grid-cols-1 gap-5 ${getGridCols()}`}>
        {stats.map((stat) => (
          <div key={stat.name} className="relative overflow-hidden rounded-lg bg-white px-4 pt-5 pb-12 shadow sm:px-6 sm:pt-6">
            <dt>
              {stat.icon && (
                <div className="absolute rounded-md bg-indigo-500 p-3">
                  {stat.icon}
                </div>
              )}
              <p className={`ml-${stat.icon ? '16' : '0'} truncate text-sm font-medium text-gray-500`}>
                {stat.name}
              </p>
            </dt>
            <dd className={`ml-${stat.icon ? '16' : '0'} flex items-baseline pb-6 sm:pb-7`}>
              <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
              {stat.description && (
                <p className="ml-2 flex items-baseline text-sm font-semibold text-green-600">
                  {stat.description}
                </p>
              )}
              <div className="absolute inset-x-0 bottom-0 bg-gray-50 px-4 py-4 sm:px-6">
                <div className="text-sm">
                  <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                    View details
                  </a>
                </div>
              </div>
            </dd>
          </div>
        ))}
      </dl>
    </div>
  )
}

// Example usage:
// <WithBrandIcon
//   stats={[
//     { 
//       name: 'Total Subscribers', 
//       value: '71,897', 
//       icon: <UsersIcon className="h-6 w-6 text-white" aria-hidden="true" />,
//       description: 'from last month'
//     },
//     { 
//       name: 'Avg. Open Rate', 
//       value: '58.16%', 
//       icon: <EnvelopeOpenIcon className="h-6 w-6 text-white" aria-hidden="true" />,
//       description: 'from last month'
//     },
//     { 
//       name: 'Avg. Click Rate', 
//       value: '24.57%', 
//       icon: <CursorClickIcon className="h-6 w-6 text-white" aria-hidden="true" />,
//       description: 'from last month'
//     },
//   ]}
// /> 