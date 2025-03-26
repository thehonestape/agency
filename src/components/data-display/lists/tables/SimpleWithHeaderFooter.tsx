'use client'

import React from 'react'

export interface TableColumn<T> {
  header: string
  accessor: keyof T | ((item: T) => React.ReactNode)
  className?: string
}

interface SimpleWithHeaderFooterProps<T> {
  columns: TableColumn<T>[]
  data: T[]
  keyField: keyof T
  title?: string
  description?: string
  className?: string
  footerContent?: React.ReactNode
}

export function SimpleWithHeaderFooter<T>({
  columns,
  data,
  keyField,
  title,
  description,
  className = '',
  footerContent
}: SimpleWithHeaderFooterProps<T>) {
  return (
    <div className={`px-4 sm:px-6 lg:px-8 ${className}`}>
      {(title || description) && (
        <div className="sm:flex sm:items-center mb-8">
          <div className="sm:flex-auto">
            {title && <h1 className="text-base font-semibold leading-6 text-gray-900">{title}</h1>}
            {description && <p className="mt-2 text-sm text-gray-700">{description}</p>}
          </div>
        </div>
      )}
      <div className="-mx-4 sm:-mx-0 overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
        <table className="min-w-full divide-y divide-gray-300">
          <thead className="bg-gray-50">
            <tr>
              {columns.map((column, index) => (
                <th
                  key={index}
                  scope="col"
                  className={`py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6 ${column.className || ''}`}
                >
                  {column.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {data.map((item) => (
              <tr key={String(item[keyField])}>
                {columns.map((column, colIndex) => (
                  <td
                    key={colIndex}
                    className={`whitespace-nowrap py-4 pl-4 pr-3 text-sm text-gray-500 sm:pl-6 ${column.className || ''}`}
                  >
                    {typeof column.accessor === 'function'
                      ? column.accessor(item)
                      : String(item[column.accessor])}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
          {footerContent && (
            <tfoot>
              <tr>
                <td colSpan={columns.length} className="px-4 py-3 sm:px-6">
                  {footerContent}
                </td>
              </tr>
            </tfoot>
          )}
        </table>
      </div>
    </div>
  )
}

// Example usage:
// <SimpleWithHeaderFooter
//   title="Users"
//   description="A list of all users in your account"
//   columns={[
//     { header: 'Name', accessor: 'name' },
//     { header: 'Title', accessor: 'title' },
//     { header: 'Email', accessor: 'email' },
//     { header: 'Role', accessor: 'role' },
//     {
//       header: 'Actions',
//       accessor: (person) => (
//         <button className="text-indigo-600 hover:text-indigo-900">
//           Edit
//         </button>
//       ),
//       className: 'text-right pr-6'
//     },
//   ]}
//   data={[
//     { id: 1, name: 'Lindsay Walton', title: 'Front-end Developer', email: 'lindsay.walton@example.com', role: 'Member' },
//     { id: 2, name: 'Courtney Henry', title: 'Designer', email: 'courtney.henry@example.com', role: 'Admin' },
//     { id: 3, name: 'Tom Cook', title: 'Product Manager', email: 'tom.cook@example.com', role: 'Member' },
//   ]}
//   keyField="id"
//   footerContent={<div className="text-sm text-gray-700">Showing 3 of 10 users</div>}
// /> 