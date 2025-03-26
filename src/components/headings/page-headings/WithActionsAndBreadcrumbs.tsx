'use client'

import React from 'react'
import { ChevronRightIcon, HomeIcon } from '@heroicons/react/20/solid'

interface Breadcrumb {
  name: string
  href: string
  current?: boolean
}

interface WithActionsAndBreadcrumbsProps {
  title: string
  breadcrumbs: Breadcrumb[]
  actions?: React.ReactNode
  className?: string
}

export function WithActionsAndBreadcrumbs({ 
  title, 
  breadcrumbs, 
  actions, 
  className = '' 
}: WithActionsAndBreadcrumbsProps) {
  return (
    <div className={className}>
      <nav className="flex" aria-label="Breadcrumb">
        <ol role="list" className="flex items-center space-x-4">
          <li>
            <div>
              <a href="#" className="text-gray-400 hover:text-gray-500">
                <HomeIcon className="h-5 w-5 flex-shrink-0" aria-hidden="true" />
                <span className="sr-only">Home</span>
              </a>
            </div>
          </li>
          {breadcrumbs.map((item) => (
            <li key={item.name}>
              <div className="flex items-center">
                <ChevronRightIcon className="h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />
                <a
                  href={item.href}
                  className="ml-4 text-sm font-medium text-gray-500 hover:text-gray-700"
                  aria-current={item.current ? 'page' : undefined}
                >
                  {item.name}
                </a>
              </div>
            </li>
          ))}
        </ol>
      </nav>

      <div className="mt-4 md:flex md:items-center md:justify-between">
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
    </div>
  )
}

// Example usage:
// <WithActionsAndBreadcrumbs
//   title="Project Nero"
//   breadcrumbs={[
//     { name: 'Projects', href: '#', current: false },
//     { name: 'Project Nero', href: '#', current: true },
//   ]}
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