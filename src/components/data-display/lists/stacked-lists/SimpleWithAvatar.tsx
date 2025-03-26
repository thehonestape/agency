'use client'

import React from 'react'

interface User {
  id: string
  name: string
  email: string
  imageUrl: string
  href?: string
}

interface SimpleWithAvatarProps {
  users: User[]
  className?: string
}

export function SimpleWithAvatar({ users, className = '' }: SimpleWithAvatarProps) {
  return (
    <div className={className}>
      <ul role="list" className="divide-y divide-gray-200">
        {users.map((user) => (
          <li key={user.id} className="flex items-center justify-between gap-x-6 py-5">
            <div className="flex min-w-0 gap-x-4">
              <img className="h-12 w-12 flex-none rounded-full bg-gray-50" src={user.imageUrl} alt="" />
              <div className="min-w-0 flex-auto">
                {user.href ? (
                  <a href={user.href} className="text-sm font-semibold leading-6 text-gray-900 hover:underline">
                    {user.name}
                  </a>
                ) : (
                  <p className="text-sm font-semibold leading-6 text-gray-900">{user.name}</p>
                )}
                <p className="mt-1 truncate text-xs leading-5 text-gray-500">{user.email}</p>
              </div>
            </div>
            {user.href && (
              <a
                href={user.href}
                className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
              >
                View<span className="sr-only">, {user.name}</span>
              </a>
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}

// Example usage:
// <SimpleWithAvatar
//   users={[
//     {
//       id: '1',
//       name: 'Leslie Alexander',
//       email: 'leslie.alexander@example.com',
//       imageUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
//       href: '#'
//     },
//     {
//       id: '2',
//       name: 'Michael Foster',
//       email: 'michael.foster@example.com',
//       imageUrl: 'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
//       href: '#'
//     },
//   ]}
// /> 