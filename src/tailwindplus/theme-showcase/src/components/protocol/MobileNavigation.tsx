import React, { useState } from 'react';
import Link from 'next/link';

interface MobileNavigationProps {
  navigation?: Array<{ name: string; href: string }>;
}

export function MobileNavigation({ navigation = [] }: MobileNavigationProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <button
        type="button"
        className="text-zinc-500 hover:text-zinc-600 dark:text-zinc-400 dark:hover:text-zinc-300"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="sr-only">Toggle menu</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          {isOpen ? (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          ) : (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          )}
        </svg>
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 right-0 bg-white dark:bg-zinc-900 p-4 shadow-lg border-t border-zinc-100 dark:border-zinc-800">
          <nav className="space-y-4">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="block text-zinc-600 dark:text-zinc-300 hover:text-emerald-500 dark:hover:text-emerald-400"
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </div>
  );
}

export function useIsInsideMobileNavigation() {
  return false;
}

export function useMobileNavigationStore() {
  return { isOpen: false };
} 