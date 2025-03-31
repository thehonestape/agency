'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function FeedbackLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const feedbackCategories = [
    {
      name: 'Alerts',
      href: '/components/feedback/alerts',
      current: pathname === '/components/feedback/alerts',
    },
    {
      name: 'Empty States',
      href: '/components/feedback/empty-states',
      current: pathname === '/components/feedback/empty-states',
    },
  ];

  return (
    <div className="relative">
      <div className="mx-auto w-full px-4">
        <h1 className="mb-6 text-3xl font-bold">Feedback Components</h1>

        <div className="flex flex-col gap-8 sm:flex-row">
          {/* Sidebar navigation */}
          <div className="w-full sm:w-1/5">
            <nav className="sticky top-4 space-y-1">
              {feedbackCategories.map((category) => (
                <Link
                  key={category.name}
                  href={category.href}
                  className={`${
                    category.current
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-transparent text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  } flex items-center border-l-4 px-3 py-2 text-sm font-medium`}
                  aria-current={category.current ? 'page' : undefined}
                >
                  {category.name}
                </Link>
              ))}
            </nav>
          </div>

          {/* Main content area */}
          <div className="w-full sm:w-4/5">{children}</div>
        </div>
      </div>
    </div>
  );
}
