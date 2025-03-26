import React from 'react';
import { ExclamationTriangleIcon } from '@heroicons/react/20/solid';

export interface WithAccentBorderProps {
  message: string;
  actionText?: string;
  actionHref?: string;
  className?: string;
}

export function WithAccentBorder({ 
  message, 
  actionText, 
  actionHref,
  className = '' 
}: WithAccentBorderProps) {
  return (
    <div className={`border-l-4 border-yellow-400 bg-yellow-50 p-4 ${className}`}>
      <div className="flex">
        <div className="shrink-0">
          <ExclamationTriangleIcon aria-hidden="true" className="size-5 text-yellow-400" />
        </div>
        <div className="ml-3">
          <p className="text-sm text-yellow-700">
            {message}{' '}
            {actionText && actionHref && (
              <a href={actionHref} className="font-medium text-yellow-700 underline hover:text-yellow-600">
                {actionText}
              </a>
            )}
          </p>
        </div>
      </div>
    </div>
  );
} 