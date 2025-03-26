'use client'

import React, { useState } from 'react'
import { cn } from '../../../lib/utils'

interface Tab {
  name: string
  href: string
  current?: boolean
}

interface WithActionsAndTabsProps {
  title: string
  description?: string
  tabs: Tab[]
  actions?: React.ReactNode
  className?: string
  onTabChange?: (tabName: string) => void
}

export function WithActionsAndTabs({ 
  title, 
  description, 
  tabs: initialTabs, 
  actions, 
  className = '',
  onTabChange 
}: WithActionsAndTabsProps) {
  const [tabs, setTabs] = useState(initialTabs)

  const handleTabClick = (tabName: string) => {
    const newTabs = tabs.map(tab => ({
      ...tab,
      current: tab.name === tabName
    }))
    setTabs(newTabs)
    if (onTabChange) {
      onTabChange(tabName)
    }
  }

  return (
    <div className={className}>
      <div className="border-b border-gray-200 px-4 py-5 sm:px-6">
        <div className="-ml-4 -mt-2 flex flex-wrap items-center justify-between sm:flex-nowrap">
          <div className="ml-4 mt-2">
            <h3 className="text-base font-semibold leading-6 text-gray-900">{title}</h3>
            {description && (
              <p className="mt-1 text-sm text-gray-500">{description}</p>
            )}
          </div>
          {actions && (
            <div className="ml-4 mt-2 flex-shrink-0">{actions}</div>
          )}
        </div>
        <div className="mt-4">
          <div className="sm:hidden">
            <label htmlFor="current-tab" className="sr-only">
              Select a tab
            </label>
            <select
              id="current-tab"
              name="current-tab"
              className="block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600"
              defaultValue={tabs.find(tab => tab.current)?.name}
              onChange={(e) => handleTabClick(e.target.value)}
            >
              {tabs.map((tab) => (
                <option key={tab.name} value={tab.name}>
                  {tab.name}
                </option>
              ))}
            </select>
          </div>
          <div className="hidden sm:block">
            <nav className="-mb-px mt-2 flex space-x-8">
              {tabs.map((tab) => (
                <a
                  key={tab.name}
                  href={tab.href}
                  onClick={(e) => {
                    e.preventDefault()
                    handleTabClick(tab.name)
                  }}
                  className={cn(
                    tab.current
                      ? 'border-indigo-500 text-indigo-600'
                      : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700',
                    'whitespace-nowrap border-b-2 px-1 pb-4 text-sm font-medium'
                  )}
                  aria-current={tab.current ? 'page' : undefined}
                >
                  {tab.name}
                </a>
              ))}
            </nav>
          </div>
        </div>
      </div>
    </div>
  )
}

// Example usage:
// <WithActionsAndTabs
//   title="Project Settings"
//   description="Manage your project configuration."
//   tabs={[
//     { name: 'General', href: '#', current: true },
//     { name: 'Members', href: '#', current: false },
//     { name: 'Billing', href: '#', current: false },
//     { name: 'Integrations', href: '#', current: false },
//   ]}
//   actions={
//     <button
//       type="button"
//       className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
//     >
//       Add member
//     </button>
//   }
//   onTabChange={(tabName) => console.log(`Tab changed to: ${tabName}`)}
// /> 