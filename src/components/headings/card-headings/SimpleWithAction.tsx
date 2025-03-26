'use client'

import React from 'react'

interface SimpleWithActionProps {
  title: string
  action?: React.ReactNode
  className?: string
}

export function SimpleWithAction({ title, action, className = '' }: SimpleWithActionProps) {
  return (
    <div className={`px-4 py-5 sm:px-6 ${className}`}>
      <div className="flex items-center justify-between">
        <h3 className="text-base font-semibold leading-6 text-gray-900">{title}</h3>
        {action && action}
      </div>
    </div>
  )
}

// Example usage:
// <SimpleWithAction
//   title="User Information"
//   action={
//     <button
//       type="button"
//       className="rounded-md bg-white font-medium text-indigo-600 hover:text-indigo-500"
//     >
//       Edit
//     </button>
//   }
// /> 