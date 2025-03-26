'use client'

import React from 'react'

interface GridItem {
  id: string
  name: string
  description?: string
  imageUrl: string
  href?: string
}

interface SimpleWithImagesProps {
  items: GridItem[]
  columns?: 1 | 2 | 3 | 4
  className?: string
  onItemClick?: (item: GridItem) => void
}

export function SimpleWithImages({ 
  items, 
  columns = 3, 
  className = '', 
  onItemClick 
}: SimpleWithImagesProps) {
  const getGridCols = () => {
    switch(columns) {
      case 1: return 'sm:grid-cols-1';
      case 2: return 'sm:grid-cols-2';
      case 3: return 'sm:grid-cols-3';
      case 4: return 'sm:grid-cols-4';
      default: return 'sm:grid-cols-3';
    }
  }

  return (
    <div className={className}>
      <ul role="list" className={`grid grid-cols-1 gap-6 ${getGridCols()}`}>
        {items.map((item) => (
          <li 
            key={item.id} 
            className="col-span-1 divide-y divide-gray-200 rounded-lg bg-white shadow"
            onClick={() => onItemClick && onItemClick(item)}
          >
            <div className="flex w-full flex-col items-center p-6">
              <img 
                className="mx-auto h-32 w-32 flex-shrink-0 rounded-full" 
                src={item.imageUrl}
                alt={item.name}
              />
              <h3 className="mt-6 text-sm font-medium text-gray-900">{item.name}</h3>
              {item.description && (
                <p className="mt-1 text-sm text-gray-500">{item.description}</p>
              )}
              {item.href && (
                <a 
                  href={item.href}
                  className="mt-4 text-indigo-600 hover:text-indigo-500"
                  onClick={(e) => e.stopPropagation()}
                >
                  View details
                </a>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

// Example usage:
// <SimpleWithImages
//   columns={3}
//   items={[
//     {
//       id: '1',
//       name: 'Jane Cooper',
//       description: 'Regional Paradigm Technician',
//       imageUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60',
//       href: '#'
//     },
//     {
//       id: '2',
//       name: 'Michael Foster',
//       description: 'Product Manager',
//       imageUrl: 'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60',
//       href: '#'
//     },
//     {
//       id: '3',
//       name: 'Dries Vincent',
//       description: 'UI Designer',
//       imageUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60',
//       href: '#'
//     },
//   ]}
//   onItemClick={(item) => console.log('Clicked item:', item)}
// /> 