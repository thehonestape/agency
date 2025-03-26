import React from 'react';
import { ExclamationTriangleIcon } from '@heroicons/react/20/solid';

export interface SimpleAlertProps {
  title: string;
  description?: string;
  className?: string;
}

export function SimpleAlert({ title, description, className = '' }: SimpleAlertProps) {
  return (
    <div className={`rounded-md bg-yellow-50 p-4 ${className}`}>
      <div className="flex">
        <div className="shrink-0">
          <ExclamationTriangleIcon aria-hidden="true" className="size-5 text-yellow-400" />
        </div>
        <div className="ml-3">
          <h3 className="text-sm font-medium text-yellow-800">{title}</h3>
          {description && (
            <div className="mt-2 text-sm text-yellow-700">
              <p>{description}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 