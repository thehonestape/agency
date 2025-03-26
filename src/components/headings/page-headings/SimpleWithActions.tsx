'use client'

import React from 'react'

interface SimpleWithActionsProps {
  title: string
  actions?: React.ReactNode
  className?: string
}

export function SimpleWithActions({ title, actions, className = '' }: SimpleWithActionsProps) {
  return (
    <div className={`md:flex md:items-center md:justify-between ${className}`}>
      <div className="min-w-0 flex-1">
        <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
          {title}
        </h2>
      </div>
      {actions && (
        <div className="mt-4 flex md:ml-4 md:mt-0">
          {actions}
        </div>
      )}
    </div>
  )
}

// Example usage:
// <SimpleWithActions 
//   title="Back End Developer" 
//   actions={
//     <>
//       <button
//         type="button"
//         className="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
//       >
//         Edit
//       </button>
//       <button
//         type="button"
//         className="ml-3 inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
//       >
//         Publish
//       </button>
//     </>
//   }
// /> 