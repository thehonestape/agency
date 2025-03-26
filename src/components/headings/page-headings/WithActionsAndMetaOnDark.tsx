'use client'

import React from 'react'

interface MetaItem {
  label: string
  value: string
}

interface WithActionsAndMetaOnDarkProps {
  title: string
  meta?: MetaItem[]
  actions?: React.ReactNode
  className?: string
}

export function WithActionsAndMetaOnDark({ 
  title, 
  meta, 
  actions, 
  className = '' 
}: WithActionsAndMetaOnDarkProps) {
  return (
    <div className={`bg-gray-800 shadow ${className}`}>
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="md:flex md:items-center md:justify-between">
          <div className="min-w-0 flex-1">
            <h2 className="text-2xl font-bold leading-7 text-white sm:truncate sm:text-3xl sm:tracking-tight">
              {title}
            </h2>
            {meta && (
              <div className="mt-1 flex flex-col sm:mt-0 sm:flex-row sm:flex-wrap sm:space-x-6">
                {meta.map((item) => (
                  <div key={item.label} className="mt-2 flex items-center text-sm text-gray-300">
                    <span className="mr-1.5 font-medium text-gray-400">{item.label}:</span>
                    {item.value}
                  </div>
                ))}
              </div>
            )}
          </div>
          {actions && (
            <div className="mt-4 flex md:ml-4 md:mt-0">
              {actions}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

// Example usage:
// <WithActionsAndMetaOnDark
//   title="New API Integration"
//   meta={[
//     { label: 'Status', value: 'In Progress' },
//     { label: 'Due Date', value: 'March 25, 2023' },
//     { label: 'Team', value: 'Engineering' },
//   ]}
//   actions={
//     <>
//       <button
//         type="button"
//         className="inline-flex items-center rounded-md bg-gray-700 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-600"
//       >
//         Edit
//       </button>
//       <button
//         type="button"
//         className="ml-3 inline-flex items-center rounded-md bg-indigo-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
//       >
//         Publish
//       </button>
//     </>
//   }
// /> 