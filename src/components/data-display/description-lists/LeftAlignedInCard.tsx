'use client'

import React from 'react'

interface DescriptionItem {
  term: string
  details: React.ReactNode
}

interface LeftAlignedInCardProps {
  title?: string
  items: DescriptionItem[]
  className?: string
}

export function LeftAlignedInCard({ title, items, className = '' }: LeftAlignedInCardProps) {
  return (
    <div className={`overflow-hidden bg-white shadow sm:rounded-lg ${className}`}>
      {title && (
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-base font-semibold leading-6 text-gray-900">{title}</h3>
        </div>
      )}
      <div className="border-t border-gray-200">
        <dl className="divide-y divide-gray-200">
          {items.map((item, index) => (
            <div key={index} className="px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">{item.term}</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{item.details}</dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  )
}

// Example usage:
// <LeftAlignedInCard
//   title="Applicant Information"
//   items={[
//     { term: 'Full name', details: 'Jane Cooper' },
//     { term: 'Application for', details: 'Frontend Developer' },
//     { term: 'Email address', details: 'jane.cooper@example.com' },
//     { term: 'Salary expectation', details: '$120,000' },
//     { term: 'About', details: 'Fugiat ipsum ipsum deserunt culpa aute sint do nostrud anim incididunt cillum culpa consequat.' },
//   ]}
// /> 