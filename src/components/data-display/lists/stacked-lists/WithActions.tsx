'use client'

import React from 'react'
import { EllipsisVerticalIcon } from '@heroicons/react/20/solid'

interface Project {
  id: string
  name: string
  description: string
  lastUpdated: string
  bgColorClass: string
  initials: string
  href?: string
}

interface WithActionsProps {
  projects: Project[]
  className?: string
  onEdit?: (project: Project) => void
  onDelete?: (project: Project) => void
}

export function WithActions({ projects, className = '', onEdit, onDelete }: WithActionsProps) {
  return (
    <div className={className}>
      <ul role="list" className="divide-y divide-gray-100">
        {projects.map((project) => (
          <li key={project.id} className="flex items-center justify-between gap-x-6 py-5">
            <div className="flex min-w-0 gap-x-4">
              <div className={`flex-none rounded-full ${project.bgColorClass} p-2`}>
                <div className="h-8 w-8 flex items-center justify-center font-medium text-white">
                  {project.initials}
                </div>
              </div>
              <div className="min-w-0 flex-auto">
                <p className="text-sm font-semibold leading-6 text-gray-900">{project.name}</p>
                <p className="mt-1 truncate text-xs leading-5 text-gray-500">{project.description}</p>
              </div>
            </div>
            <div className="flex shrink-0 items-center gap-x-4">
              <div className="hidden sm:flex sm:flex-col sm:items-end">
                <p className="text-sm leading-6 text-gray-900">Last updated</p>
                <p className="mt-1 text-xs leading-5 text-gray-500">{project.lastUpdated}</p>
              </div>
              <div className="relative flex-none">
                <button 
                  type="button" 
                  className="-m-2.5 block p-2.5 text-gray-500 hover:text-gray-900" 
                  id={`options-menu-${project.id}`}
                  aria-expanded="false"
                  aria-haspopup="true"
                  onClick={() => {
                    // This would typically open a dropdown menu
                    // For simplicity, we're not implementing the full dropdown
                  }}
                >
                  <span className="sr-only">Open options</span>
                  <EllipsisVerticalIcon className="h-5 w-5" aria-hidden="true" />
                </button>
                {/* This would typically be a dropdown menu */}
                <div className="hidden absolute right-0 z-10 mt-2 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none">
                  <button
                    className="block w-full px-3 py-1 text-left text-sm leading-6 text-gray-900 hover:bg-gray-50"
                    onClick={() => onEdit && onEdit(project)}
                  >
                    Edit
                  </button>
                  <button
                    className="block w-full px-3 py-1 text-left text-sm leading-6 text-gray-900 hover:bg-gray-50"
                    onClick={() => onDelete && onDelete(project)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

// Example usage:
// <WithActions
//   projects={[
//     {
//       id: '1',
//       name: 'Website Redesign',
//       description: 'Redesign the company website to improve UX and conversion rates',
//       lastUpdated: '3d ago',
//       bgColorClass: 'bg-pink-600',
//       initials: 'WR',
//     },
//     {
//       id: '2',
//       name: 'Mobile App Development',
//       description: 'Build a native mobile app for iOS and Android platforms',
//       lastUpdated: '1w ago',
//       bgColorClass: 'bg-purple-600',
//       initials: 'MA',
//     },
//     {
//       id: '3',
//       name: 'E-commerce Integration',
//       description: 'Integrate payment gateways and product management systems',
//       lastUpdated: '2w ago',
//       bgColorClass: 'bg-blue-600',
//       initials: 'EC',
//     },
//   ]}
//   onEdit={(project) => console.log('Edit project:', project)}
//   onDelete={(project) => console.log('Delete project:', project)}
// /> 