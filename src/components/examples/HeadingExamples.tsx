'use client'

import React, { useState } from 'react'
import * as PageHeadings from '../headings/page-headings'
import * as CardHeadings from '../headings/card-headings'
import * as SectionHeadings from '../headings/section-headings'

type HeadingCategory = 'page' | 'card' | 'section'

export default function HeadingExamples() {
  const [activeCategory, setActiveCategory] = useState<HeadingCategory>('page')
  
  return (
    <div className="space-y-8 p-4">
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setActiveCategory('page')}
          className={`rounded-md px-3 py-2 text-sm font-medium ${
            activeCategory === 'page' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'
          }`}
        >
          Page Headings
        </button>
        <button
          onClick={() => setActiveCategory('card')}
          className={`rounded-md px-3 py-2 text-sm font-medium ${
            activeCategory === 'card' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'
          }`}
        >
          Card Headings
        </button>
        <button
          onClick={() => setActiveCategory('section')}
          className={`rounded-md px-3 py-2 text-sm font-medium ${
            activeCategory === 'section' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'
          }`}
        >
          Section Headings
        </button>
      </div>

      <div className="space-y-4">
        {activeCategory === 'page' && (
          <>
            <div className="border rounded-md overflow-hidden">
              <h3 className="bg-gray-100 px-4 py-2 font-medium">SimpleWithActions</h3>
              <div className="p-4">
                <PageHeadings.SimpleWithActions 
                  title="Back End Developer" 
                  actions={
                    <>
                      <button
                        type="button"
                        className="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        className="ml-3 inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                      >
                        Publish
                      </button>
                    </>
                  }
                />
              </div>
            </div>

            <div className="border rounded-md overflow-hidden">
              <h3 className="bg-gray-100 px-4 py-2 font-medium">WithActionsAndBreadcrumbs</h3>
              <div className="p-4">
                <PageHeadings.WithActionsAndBreadcrumbs
                  title="Project Nero"
                  breadcrumbs={[
                    { name: 'Projects', href: '#', current: false },
                    { name: 'Project Nero', href: '#', current: true },
                  ]}
                  actions={
                    <>
                      <button
                        type="button"
                        className="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        className="ml-3 inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                      >
                        Publish
                      </button>
                    </>
                  }
                />
              </div>
            </div>

            <div className="border rounded-md overflow-hidden">
              <h3 className="bg-gray-100 px-4 py-2 font-medium">WithActionsAndMetaOnDark</h3>
              <div>
                <PageHeadings.WithActionsAndMetaOnDark
                  title="New API Integration"
                  meta={[
                    { label: 'Status', value: 'In Progress' },
                    { label: 'Due Date', value: 'March 25, 2023' },
                    { label: 'Team', value: 'Engineering' },
                  ]}
                  actions={
                    <>
                      <button
                        type="button"
                        className="inline-flex items-center rounded-md bg-gray-700 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-600"
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        className="ml-3 inline-flex items-center rounded-md bg-indigo-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                      >
                        Publish
                      </button>
                    </>
                  }
                />
              </div>
            </div>
          </>
        )}

        {activeCategory === 'card' && (
          <>
            <div className="border rounded-md overflow-hidden">
              <h3 className="bg-gray-100 px-4 py-2 font-medium">SimpleWithAction</h3>
              <div className="border rounded-md m-4">
                <CardHeadings.SimpleWithAction
                  title="User Information"
                  action={
                    <button
                      type="button"
                      className="rounded-md bg-white font-medium text-indigo-600 hover:text-indigo-500"
                    >
                      Edit
                    </button>
                  }
                />
                <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
                  <dl className="sm:divide-y sm:divide-gray-200">
                    <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 sm:py-5">
                      <dt className="text-sm font-medium text-gray-500">Full name</dt>
                      <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">Jane Cooper</dd>
                    </div>
                    <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 sm:py-5">
                      <dt className="text-sm font-medium text-gray-500">Email address</dt>
                      <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">jane.cooper@example.com</dd>
                    </div>
                  </dl>
                </div>
              </div>
            </div>

            <div className="border rounded-md overflow-hidden">
              <h3 className="bg-gray-100 px-4 py-2 font-medium">WithDescription</h3>
              <div className="border rounded-md m-4">
                <CardHeadings.WithDescription
                  title="Applicant Information"
                  description="Personal details and application."
                  action={
                    <button
                      type="button"
                      className="rounded-md bg-white font-medium text-indigo-600 hover:text-indigo-500"
                    >
                      Edit
                    </button>
                  }
                />
                <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
                  <dl className="sm:divide-y sm:divide-gray-200">
                    <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 sm:py-5">
                      <dt className="text-sm font-medium text-gray-500">Name</dt>
                      <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">John Smith</dd>
                    </div>
                    <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 sm:py-5">
                      <dt className="text-sm font-medium text-gray-500">Email</dt>
                      <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">john.smith@example.com</dd>
                    </div>
                  </dl>
                </div>
              </div>
            </div>

            <div className="border rounded-md overflow-hidden">
              <h3 className="bg-gray-100 px-4 py-2 font-medium">WithActionsAndTabs</h3>
              <div className="border rounded-md m-4">
                <CardHeadings.WithActionsAndTabs
                  title="Project Settings"
                  description="Manage your project configuration."
                  tabs={[
                    { name: 'General', href: '#', current: true },
                    { name: 'Members', href: '#', current: false },
                    { name: 'Billing', href: '#', current: false },
                    { name: 'Integrations', href: '#', current: false },
                  ]}
                  actions={
                    <button
                      type="button"
                      className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                      Add member
                    </button>
                  }
                />
                <div className="p-4">
                  <p className="text-gray-500">Content for the selected tab appears here.</p>
                </div>
              </div>
            </div>
          </>
        )}

        {activeCategory === 'section' && (
          <>
            <div className="border rounded-md overflow-hidden">
              <h3 className="bg-gray-100 px-4 py-2 font-medium">Simple</h3>
              <div className="p-4">
                <SectionHeadings.Simple title="Team Members" />
                <div className="mt-4 bg-gray-50 p-4 rounded-md">
                  <p className="text-gray-500">Content for this section appears here.</p>
                </div>
              </div>
            </div>

            <div className="border rounded-md overflow-hidden">
              <h3 className="bg-gray-100 px-4 py-2 font-medium">WithDescription</h3>
              <div className="p-4">
                <SectionHeadings.WithDescription 
                  title="Team Members" 
                  description="A list of all the members in your account including their name, title, email and role."
                />
                <div className="mt-4 bg-gray-50 p-4 rounded-md">
                  <p className="text-gray-500">Content for this section appears here.</p>
                </div>
              </div>
            </div>

            <div className="border rounded-md overflow-hidden">
              <h3 className="bg-gray-100 px-4 py-2 font-medium">WithActions</h3>
              <div className="p-4">
                <SectionHeadings.WithActions
                  title="Recent Activity"
                  description="A list of all the recent activity in your account."
                  actions={
                    <button
                      type="button"
                      className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                      View all
                    </button>
                  }
                />
                <div className="mt-4 bg-gray-50 p-4 rounded-md">
                  <p className="text-gray-500">Content for this section appears here.</p>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
} 