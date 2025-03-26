'use client'

import React from 'react'

export interface ActivityItem {
  id: string
  content: React.ReactNode
  person: {
    name: string
    imageUrl: string
    href?: string
  }
  date: string
  commentCount?: number
  shareCount?: number
}

interface SimpleActivityFeedProps {
  activities: ActivityItem[]
  className?: string
}

export function SimpleActivityFeed({ activities, className = '' }: SimpleActivityFeedProps) {
  return (
    <div className={className}>
      <ul role="list" className="space-y-6">
        {activities.map((activity) => (
          <li key={activity.id} className="relative flex gap-x-4">
            <div className="absolute left-0 top-0 flex w-6 justify-center -bottom-6">
              <div className="w-px bg-gray-200"></div>
            </div>
            <img
              src={activity.person.imageUrl}
              alt=""
              className="relative mt-3 h-6 w-6 flex-none rounded-full bg-gray-50"
            />
            <div className="flex-auto rounded-md p-3 ring-1 ring-inset ring-gray-200">
              <div className="flex justify-between gap-x-4">
                <div className="py-0.5 text-xs leading-5 text-gray-500">
                  <span className="font-medium text-gray-900">{activity.person.name}</span> posted
                </div>
                <time className="flex-none py-0.5 text-xs leading-5 text-gray-500">{activity.date}</time>
              </div>
              <div className="mt-2 text-sm text-gray-700">{activity.content}</div>
              
              {(activity.commentCount !== undefined || activity.shareCount !== undefined) && (
                <div className="mt-4 flex items-center gap-x-4">
                  {activity.commentCount !== undefined && (
                    <button type="button" className="flex items-center text-sm text-gray-500">
                      <svg className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 01-.923 1.785A5.969 5.969 0 006 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337z" />
                      </svg>
                      Comment{activity.commentCount > 0 ? ` (${activity.commentCount})` : ''}
                    </button>
                  )}
                  
                  {activity.shareCount !== undefined && (
                    <button type="button" className="flex items-center text-sm text-gray-500">
                      <svg className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z" />
                      </svg>
                      Share{activity.shareCount > 0 ? ` (${activity.shareCount})` : ''}
                    </button>
                  )}
                </div>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

// Example usage:
// <SimpleActivityFeed
//   activities={[
//     {
//       id: '1',
//       person: {
//         name: 'Chelsea Hagon',
//         imageUrl: 'https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
//       },
//       content: (
//         <p>
//           Deployed our new project to production and resolved all client feedback.
//         </p>
//       ),
//       date: '3h ago',
//       commentCount: 5,
//       shareCount: 2,
//     },
//     {
//       id: '2',
//       person: {
//         name: 'Michael Foster',
//         imageUrl: 'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
//       },
//       content: (
//         <p>
//           Launched the new marketing campaign on social media channels.
//         </p>
//       ),
//       date: '1d ago',
//       commentCount: 0,
//       shareCount: 0,
//     },
//   ]}
// /> 