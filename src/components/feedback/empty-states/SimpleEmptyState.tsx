import React from 'react';
import { PlusIcon } from '@heroicons/react/20/solid';

export interface SimpleEmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description: string;
  buttonText?: string;
  onButtonClick?: () => void;
  className?: string;
}

export function SimpleEmptyState({
  icon,
  title,
  description,
  buttonText,
  onButtonClick,
  className = ''
}: SimpleEmptyStateProps) {
  const defaultIcon = (
    <svg
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="mx-auto size-12 text-gray-400"
    >
      <path
        d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z"
        strokeWidth={2}
        vectorEffect="non-scaling-stroke"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );

  return (
    <div className={`text-center ${className}`}>
      {icon || defaultIcon}
      <h3 className="mt-2 text-sm font-semibold text-gray-900">{title}</h3>
      <p className="mt-1 text-sm text-gray-500">{description}</p>
      {buttonText && onButtonClick && (
        <div className="mt-6">
          <button
            type="button"
            onClick={onButtonClick}
            className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            <PlusIcon aria-hidden="true" className="mr-1.5 -ml-0.5 size-5" />
            {buttonText}
          </button>
        </div>
      )}
    </div>
  );
} 