'use client'

import React from 'react'

interface WithDescriptionProps {
  title: string
  description: string
  action?: React.ReactNode
  className?: string
}

export function WithDescription({ 
  title, 
  description, 
  action, 
  className = '' 
}: WithDescriptionProps) {
  return (
    <div className={`px-4 py-5 sm:px-6 ${className}`}>
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-base font-semibold leading-6 text-gray-900">{title}</h3>
          <p className="mt-1 max-w-2xl text-sm text-gray-500">{description}</p>
        </div>
        {action && <div className="ml-4 flex-shrink-0">{action}</div>}
      </div>
    </div>
  )
}

// Example usage:
// <WithDescription
//   title="Applicant Information"
//   description="Personal details and application."
//   action={
//     <button
//       type="button"
//       className="rounded-md bg-white font-medium text-indigo-600 hover:text-indigo-500"
//     >
//       Edit
//     </button>
//   }
// /> 