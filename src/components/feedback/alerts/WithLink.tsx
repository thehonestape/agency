import React from 'react';
import { InformationCircleIcon } from '@heroicons/react/20/solid';

export interface WithLinkProps {
  message: string;
  linkText: string;
  href: string;
  className?: string;
}

export function WithLink({ message, linkText, href, className = '' }: WithLinkProps) {
  return (
    <div className={`rounded-md bg-blue-50 p-4 ${className}`}>
      <div className="flex">
        <div className="shrink-0">
          <InformationCircleIcon aria-hidden="true" className="size-5 text-blue-400" />
        </div>
        <div className="ml-3 flex-1 md:flex md:justify-between">
          <p className="text-sm text-blue-700">{message}</p>
          <p className="mt-3 text-sm md:mt-0 md:ml-6">
            <a href={href} className="font-medium whitespace-nowrap text-blue-700 hover:text-blue-600">
              {linkText}
              <span aria-hidden="true"> &rarr;</span>
            </a>
          </p>
        </div>
      </div>
    </div>
  );
} 