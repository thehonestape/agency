'use client'

import React from 'react'

interface WithActionsProps {
  title: string
  description?: string
  actions?: React.ReactNode
  className?: string
}

export function WithActions({ 
  title, 
  description, 
  actions, 
  className = '' 
}: WithActionsProps) {
  return (
    <div className={`pb-5 ${className}`}>
      <div className="sm:flex sm:items-center sm:justify-between">
        <div>
          <h3 className="text-base font-semibold leading-6 text-gray-900">{title}</h3>
          {description && (
            <p className="mt-2 max-w-4xl text-sm text-gray-500">{description}</p>
          )}
        </div>
        {actions && (
          <div className="mt-3 flex sm:ml-4 sm:mt-0">{actions}</div>
        )}
      </div>
    </div>
  )
}

// Example usage:
// <WithActions
//   title="Recent Activity"
//   description="A list of all the recent activity in your account."
//   actions={
//     <button
//       type="button"
//       className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
//     >
//       View all
//     </button>
//   }
// /> 