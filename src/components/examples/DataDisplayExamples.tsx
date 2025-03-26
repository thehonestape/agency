'use client'

import React, { useState } from 'react'
import { UsersIcon, EnvelopeOpenIcon, CursorArrowRaysIcon } from '@heroicons/react/24/outline'
import * as DescriptionLists from '../data-display/description-lists'
import * as Stats from '../data-display/stats'
import * as Calendars from '../data-display/calendars'
import { SimpleWithDividers } from '../data-display/lists/stacked-lists/SimpleWithDividers'
import { SimpleWithAvatar } from '../data-display/lists/stacked-lists/SimpleWithAvatar'
import { WithActions } from '../data-display/lists/stacked-lists/WithActions'
import { SimpleWithHeaderFooter, TableColumn } from '../data-display/lists/tables/SimpleWithHeaderFooter'
import { SimpleWithImages } from '../data-display/lists/grid-lists/SimpleWithImages'
import { SimpleActivityFeed, ActivityItem } from '../data-display/lists/feeds/SimpleActivityFeed'

type DataDisplayCategory = 'description-lists' | 'stats' | 'calendars' | 'stacked-lists' | 'tables' | 'grid-lists' | 'feeds'

export default function DataDisplayExamples() {
  const [activeCategory, setActiveCategory] = useState<DataDisplayCategory>('description-lists')
  
  // Example data
  const descriptionListItems = [
    { term: 'Full name', details: 'Jane Cooper' },
    { term: 'Application for', details: 'Frontend Developer' },
    { term: 'Email address', details: 'jane.cooper@example.com' },
    { term: 'Salary expectation', details: '$120,000' },
    { term: 'About', details: 'Fugiat ipsum ipsum deserunt culpa aute sint do nostrud anim incididunt cillum culpa consequat.' },
  ]

  const statItems = [
    { name: 'Total Subscribers', value: '71,897', change: { value: '12%', trend: 'up' as const } },
    { name: 'Avg. Open Rate', value: '58.16', unit: '%', change: { value: '5.4%', trend: 'up' as const } },
    { name: 'Avg. Click Rate', value: '24.57', unit: '%', change: { value: '3.2%', trend: 'down' as const } },
  ]

  // Calendar events
  const today = new Date()
  const year = today.getFullYear()
  const month = today.getMonth() + 1
  const day = today.getDate()
  
  const dateString = (d: number) => `${year}-${String(month).padStart(2, '0')}-${String(d).padStart(2, '0')}`
  
  const calendarEvents = {
    [dateString(day)]: [
      { id: '1', name: 'Team Meeting', time: '10:00 AM' },
      { id: '2', name: 'Project Review', time: '2:00 PM' }
    ],
    [dateString(day + 2)]: [
      { id: '3', name: 'Product Launch', time: '9:00 AM' },
      { id: '4', name: 'Client Call', time: '3:30 PM' },
      { id: '5', name: 'Marketing Review', time: '5:00 PM' }
    ]
  }

  // List items
  const stackedListItems = [
    { id: '1', name: 'Focus on user experience design', description: 'Improve the user flow and overall usability of the application' },
    { id: '2', name: 'Mobile responsiveness', description: 'Ensure all pages work well on various screen sizes' },
    { id: '3', name: 'API integration', description: 'Connect with backend services and implement data fetching' },
    { id: '4', name: 'Accessibility compliance', description: 'Make sure the app meets WCAG 2.1 standards' },
  ]

  const users = [
    {
      id: '1',
      name: 'Leslie Alexander',
      email: 'leslie.alexander@example.com',
      imageUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      href: '#'
    },
    {
      id: '2',
      name: 'Michael Foster',
      email: 'michael.foster@example.com',
      imageUrl: 'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      href: '#'
    },
  ]

  const projects = [
    {
      id: '1',
      name: 'Website Redesign',
      description: 'Redesign the company website to improve UX and conversion rates',
      lastUpdated: '3d ago',
      bgColorClass: 'bg-pink-600',
      initials: 'WR',
    },
    {
      id: '2',
      name: 'Mobile App Development',
      description: 'Build a native mobile app for iOS and Android platforms',
      lastUpdated: '1w ago',
      bgColorClass: 'bg-purple-600',
      initials: 'MA',
    },
  ]

  // Table data
  const peopleData = [
    { id: 1, name: 'Lindsay Walton', title: 'Front-end Developer', email: 'lindsay.walton@example.com', role: 'Member' },
    { id: 2, name: 'Courtney Henry', title: 'Designer', email: 'courtney.henry@example.com', role: 'Admin' },
    { id: 3, name: 'Tom Cook', title: 'Product Manager', email: 'tom.cook@example.com', role: 'Member' },
  ]

  // Grid list items
  const gridItems = [
    {
      id: '1',
      name: 'Jane Cooper',
      description: 'Regional Paradigm Technician',
      imageUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60',
      href: '#'
    },
    {
      id: '2',
      name: 'Michael Foster',
      description: 'Product Manager',
      imageUrl: 'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60',
      href: '#'
    },
    {
      id: '3',
      name: 'Dries Vincent',
      description: 'UI Designer',
      imageUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60',
      href: '#'
    },
  ]

  // Feed activities
  const activities: ActivityItem[] = [
    {
      id: '1',
      person: {
        name: 'Chelsea Hagon',
        imageUrl: 'https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      },
      content: (
        <p>
          Deployed our new project to production and resolved all client feedback.
        </p>
      ),
      date: '3h ago',
      commentCount: 5,
      shareCount: 2,
    },
    {
      id: '2',
      person: {
        name: 'Michael Foster',
        imageUrl: 'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      },
      content: (
        <p>
          Launched the new marketing campaign on social media channels.
        </p>
      ),
      date: '1d ago',
      commentCount: 0,
      shareCount: 0,
    },
  ]
  
  return (
    <div className="space-y-8 p-4">
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setActiveCategory('description-lists')}
          className={`rounded-md px-3 py-2 text-sm font-medium ${
            activeCategory === 'description-lists' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'
          }`}
        >
          Description Lists
        </button>
        <button
          onClick={() => setActiveCategory('stats')}
          className={`rounded-md px-3 py-2 text-sm font-medium ${
            activeCategory === 'stats' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'
          }`}
        >
          Stats
        </button>
        <button
          onClick={() => setActiveCategory('calendars')}
          className={`rounded-md px-3 py-2 text-sm font-medium ${
            activeCategory === 'calendars' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'
          }`}
        >
          Calendars
        </button>
        <button
          onClick={() => setActiveCategory('stacked-lists')}
          className={`rounded-md px-3 py-2 text-sm font-medium ${
            activeCategory === 'stacked-lists' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'
          }`}
        >
          Stacked Lists
        </button>
        <button
          onClick={() => setActiveCategory('tables')}
          className={`rounded-md px-3 py-2 text-sm font-medium ${
            activeCategory === 'tables' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'
          }`}
        >
          Tables
        </button>
        <button
          onClick={() => setActiveCategory('grid-lists')}
          className={`rounded-md px-3 py-2 text-sm font-medium ${
            activeCategory === 'grid-lists' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'
          }`}
        >
          Grid Lists
        </button>
        <button
          onClick={() => setActiveCategory('feeds')}
          className={`rounded-md px-3 py-2 text-sm font-medium ${
            activeCategory === 'feeds' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'
          }`}
        >
          Feeds
        </button>
      </div>

      <div className="space-y-6">
        {activeCategory === 'description-lists' && (
          <>
            <div className="border rounded-md overflow-hidden">
              <h3 className="bg-gray-100 px-4 py-2 font-medium">SimpleWithCards</h3>
              <div className="p-4">
                <DescriptionLists.SimpleWithCards 
                  items={[
                    { term: 'Application for', details: 'Frontend Developer' },
                    { term: 'Job status', details: 'Full-time' },
                    { term: 'Work schedule', details: 'Remote' },
                    { term: 'Salary expectation', details: '$120,000 USD' },
                  ]}
                />
              </div>
            </div>

            <div className="border rounded-md overflow-hidden">
              <h3 className="bg-gray-100 px-4 py-2 font-medium">LeftAlignedInCard</h3>
              <div className="p-4">
                <DescriptionLists.LeftAlignedInCard
                  title="Applicant Information"
                  items={descriptionListItems}
                />
              </div>
            </div>
          </>
        )}

        {activeCategory === 'stats' && (
          <>
            <div className="border rounded-md overflow-hidden">
              <h3 className="bg-gray-100 px-4 py-2 font-medium">SimpleCards</h3>
              <div className="p-4">
                <Stats.SimpleCards
                  stats={statItems}
                />
              </div>
            </div>

            <div className="border rounded-md overflow-hidden">
              <h3 className="bg-gray-100 px-4 py-2 font-medium">WithBrandIcon</h3>
              <div className="p-4">
                <Stats.WithBrandIcon
                  stats={[
                    { 
                      name: 'Total Subscribers', 
                      value: '71,897', 
                      icon: <UsersIcon className="h-6 w-6 text-white" aria-hidden="true" />,
                      description: 'from last month'
                    },
                    { 
                      name: 'Avg. Open Rate', 
                      value: '58.16%', 
                      icon: <EnvelopeOpenIcon className="h-6 w-6 text-white" aria-hidden="true" />,
                      description: 'from last month'
                    },
                    { 
                      name: 'Avg. Click Rate', 
                      value: '24.57%', 
                      icon: <CursorArrowRaysIcon className="h-6 w-6 text-white" aria-hidden="true" />,
                      description: 'from last month'
                    },
                  ]}
                />
              </div>
            </div>
          </>
        )}

        {activeCategory === 'calendars' && (
          <>
            <div className="border rounded-md overflow-hidden">
              <h3 className="bg-gray-100 px-4 py-2 font-medium">MonthView</h3>
              <div className="p-4">
                <Calendars.MonthView 
                  events={calendarEvents}
                  onDateSelect={(date) => console.log('Selected date:', date)}
                  onEventSelect={(event) => console.log('Selected event:', event)}
                />
              </div>
            </div>
          </>
        )}

        {activeCategory === 'stacked-lists' && (
          <>
            <div className="border rounded-md overflow-hidden">
              <h3 className="bg-gray-100 px-4 py-2 font-medium">SimpleWithDividers</h3>
              <div className="p-4">
                <SimpleWithDividers items={stackedListItems} />
              </div>
            </div>

            <div className="border rounded-md overflow-hidden">
              <h3 className="bg-gray-100 px-4 py-2 font-medium">SimpleWithAvatar</h3>
              <div className="p-4">
                <SimpleWithAvatar users={users} />
              </div>
            </div>

            <div className="border rounded-md overflow-hidden">
              <h3 className="bg-gray-100 px-4 py-2 font-medium">WithActions</h3>
              <div className="p-4">
                <WithActions 
                  projects={projects}
                  onEdit={(project) => console.log('Edit project:', project)}
                  onDelete={(project) => console.log('Delete project:', project)}
                />
              </div>
            </div>
          </>
        )}

        {activeCategory === 'tables' && (
          <>
            <div className="border rounded-md overflow-hidden">
              <h3 className="bg-gray-100 px-4 py-2 font-medium">SimpleWithHeaderFooter</h3>
              <div className="p-4">
                <SimpleWithHeaderFooter
                  title="Users"
                  description="A list of all users in your account"
                  columns={[
                    { header: 'Name', accessor: 'name' },
                    { header: 'Title', accessor: 'title' },
                    { header: 'Email', accessor: 'email' },
                    { header: 'Role', accessor: 'role' },
                    {
                      header: 'Actions',
                      accessor: (person) => (
                        <button className="text-indigo-600 hover:text-indigo-900">
                          Edit
                        </button>
                      ),
                      className: 'text-right pr-6'
                    },
                  ]}
                  data={peopleData}
                  keyField="id"
                  footerContent={<div className="text-sm text-gray-700">Showing 3 of 10 users</div>}
                />
              </div>
            </div>
          </>
        )}

        {activeCategory === 'grid-lists' && (
          <>
            <div className="border rounded-md overflow-hidden">
              <h3 className="bg-gray-100 px-4 py-2 font-medium">SimpleWithImages</h3>
              <div className="p-4">
                <SimpleWithImages
                  columns={3}
                  items={gridItems}
                  onItemClick={(item) => console.log('Clicked item:', item)}
                />
              </div>
            </div>
          </>
        )}

        {activeCategory === 'feeds' && (
          <>
            <div className="border rounded-md overflow-hidden">
              <h3 className="bg-gray-100 px-4 py-2 font-medium">SimpleActivityFeed</h3>
              <div className="p-4">
                <SimpleActivityFeed activities={activities} />
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
} 