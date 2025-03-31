'use client';

import React, { useState } from 'react';
import {
  ApplicationShellExamples,
  DataDisplayExamples,
  HeadingExamples,
} from '@/components/examples';

type ExampleCategory = 'application-shells' | 'data-display' | 'headings';

export default function ExamplesPage() {
  const [activeCategory, setActiveCategory] = useState<ExampleCategory>('application-shells');

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Component Examples</h1>
          <p className="mt-2 text-lg text-gray-600">Browse through our library of UI components</p>
        </div>

        <div className="mb-6">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              <button
                onClick={() => setActiveCategory('application-shells')}
                className={`border-b-2 px-1 py-4 text-sm font-medium ${
                  activeCategory === 'application-shells'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                }`}
              >
                Application Shells
              </button>
              <button
                onClick={() => setActiveCategory('data-display')}
                className={`border-b-2 px-1 py-4 text-sm font-medium ${
                  activeCategory === 'data-display'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                }`}
              >
                Data Display
              </button>
              <button
                onClick={() => setActiveCategory('headings')}
                className={`border-b-2 px-1 py-4 text-sm font-medium ${
                  activeCategory === 'headings'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                }`}
              >
                Headings
              </button>
            </nav>
          </div>
        </div>

        <div className="rounded-lg bg-white shadow">
          {activeCategory === 'application-shells' && <ApplicationShellExamples />}
          {activeCategory === 'data-display' && <DataDisplayExamples />}
          {activeCategory === 'headings' && <HeadingExamples />}
        </div>
      </div>
    </div>
  );
}
