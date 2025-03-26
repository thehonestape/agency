'use client'

import React, { useState } from 'react'
import { ApplicationShellExamples, DataDisplayExamples, HeadingExamples } from '@/components/examples'

type ExampleCategory = 'application-shells' | 'data-display' | 'headings'

export default function ExamplesPage() {
  const [activeCategory, setActiveCategory] = useState<ExampleCategory>('application-shells')

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Component Examples</h1>
          <p className="mt-2 text-lg text-gray-600">
            Browse through our library of UI components
          </p>
        </div>

        <div className="mb-6">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              <button
                onClick={() => setActiveCategory('application-shells')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeCategory === 'application-shells'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Application Shells
              </button>
              <button
                onClick={() => setActiveCategory('data-display')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeCategory === 'data-display'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Data Display
              </button>
              <button
                onClick={() => setActiveCategory('headings')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeCategory === 'headings'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Headings
              </button>
            </nav>
          </div>
        </div>

        <div className="bg-white shadow rounded-lg">
          {activeCategory === 'application-shells' && <ApplicationShellExamples />}
          {activeCategory === 'data-display' && <DataDisplayExamples />}
          {activeCategory === 'headings' && <HeadingExamples />}
        </div>
      </div>
    </div>
  )
} 