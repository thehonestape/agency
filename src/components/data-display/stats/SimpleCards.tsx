'use client'

import React from 'react'

interface StatItem {
  name: string
  value: string
  unit?: string
  change?: {
    value: string
    trend: 'up' | 'down' | 'neutral'
  }
}

interface SimpleCardsProps {
  stats: StatItem[]
  columns?: 1 | 2 | 3 | 4
  className?: string
}

export function SimpleCards({ stats, columns = 3, className = '' }: SimpleCardsProps) {
  const getGridCols = () => {
    switch(columns) {
      case 1: return 'sm:grid-cols-1';
      case 2: return 'sm:grid-cols-2';
      case 3: return 'sm:grid-cols-3';
      case 4: return 'sm:grid-cols-4';
      default: return 'sm:grid-cols-3';
    }
  }

  const getTrendColor = (trend: 'up' | 'down' | 'neutral') => {
    switch(trend) {
      case 'up': return 'text-green-600';
      case 'down': return 'text-red-600';
      case 'neutral': return 'text-gray-500';
    }
  }

  return (
    <div className={className}>
      <dl className={`grid grid-cols-1 gap-5 ${getGridCols()}`}>
        {stats.map((stat) => (
          <div
            key={stat.name}
            className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6"
          >
            <dt className="truncate text-sm font-medium text-gray-500">{stat.name}</dt>
            <dd className="mt-1 flex items-baseline justify-between md:block lg:flex">
              <div className="flex items-baseline text-2xl font-semibold text-indigo-600">
                {stat.value}
                {stat.unit && (
                  <span className="ml-2 text-sm font-medium text-gray-500">{stat.unit}</span>
                )}
              </div>

              {stat.change && (
                <div
                  className={`inline-flex items-baseline rounded-full px-2.5 py-0.5 text-sm font-medium md:mt-2 lg:mt-0 ${
                    getTrendColor(stat.change.trend)
                  }`}
                >
                  {stat.change.trend === 'up' && (
                    <svg
                      className="-ml-1 mr-0.5 h-5 w-5 flex-shrink-0 self-center text-green-500"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 17a.75.75 0 01-.75-.75V5.612L5.29 9.77a.75.75 0 01-1.08-1.04l5.25-5.5a.75.75 0 011.08 0l5.25 5.5a.75.75 0 11-1.08 1.04l-3.96-4.158V16.25A.75.75 0 0110 17z"
                        clipRule="evenodd"
                      />
                    </svg>
                  )}
                  {stat.change.trend === 'down' && (
                    <svg
                      className="-ml-1 mr-0.5 h-5 w-5 flex-shrink-0 self-center text-red-500"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 3a.75.75 0 01.75.75v10.638l3.96-4.158a.75.75 0 111.08 1.04l-5.25 5.5a.75.75 0 01-1.08 0l-5.25-5.5a.75.75 0 111.08-1.04l3.96 4.158V3.75A.75.75 0 0110 3z"
                        clipRule="evenodd"
                      />
                    </svg>
                  )}
                  <span className="sr-only">
                    {stat.change.trend === 'up' ? 'Increased' : 'Decreased'} by
                  </span>
                  {stat.change.value}
                </div>
              )}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  )
}

// Example usage:
// <SimpleCards
//   stats={[
//     { name: 'Total Subscribers', value: '71,897', change: { value: '12%', trend: 'up' } },
//     { name: 'Avg. Open Rate', value: '58.16', unit: '%', change: { value: '5.4%', trend: 'up' } },
//     { name: 'Avg. Click Rate', value: '24.57', unit: '%', change: { value: '3.2%', trend: 'down' } },
//   ]}
// /> 