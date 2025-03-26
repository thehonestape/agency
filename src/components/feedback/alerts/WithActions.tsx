import React from 'react';
import { CheckCircleIcon } from '@heroicons/react/20/solid';

export interface ActionButton {
  label: string;
  onClick: () => void;
}

export interface WithActionsProps {
  title: string;
  description?: string;
  primaryAction?: ActionButton;
  secondaryAction?: ActionButton;
  className?: string;
}

export function WithActions({
  title,
  description,
  primaryAction,
  secondaryAction,
  className = ''
}: WithActionsProps) {
  return (
    <div className={`rounded-md bg-green-50 p-4 ${className}`}>
      <div className="flex">
        <div className="shrink-0">
          <CheckCircleIcon aria-hidden="true" className="size-5 text-green-400" />
        </div>
        <div className="ml-3">
          <h3 className="text-sm font-medium text-green-800">{title}</h3>
          {description && (
            <div className="mt-2 text-sm text-green-700">
              <p>{description}</p>
            </div>
          )}
          {(primaryAction || secondaryAction) && (
            <div className="mt-4">
              <div className="-mx-2 -my-1.5 flex">
                {primaryAction && (
                  <button
                    type="button"
                    onClick={primaryAction.onClick}
                    className="rounded-md bg-green-50 px-2 py-1.5 text-sm font-medium text-green-800 hover:bg-green-100 focus:ring-2 focus:ring-green-600 focus:ring-offset-2 focus:ring-offset-green-50 focus:outline-hidden"
                  >
                    {primaryAction.label}
                  </button>
                )}
                {secondaryAction && (
                  <button
                    type="button"
                    onClick={secondaryAction.onClick}
                    className="ml-3 rounded-md bg-green-50 px-2 py-1.5 text-sm font-medium text-green-800 hover:bg-green-100 focus:ring-2 focus:ring-green-600 focus:ring-offset-2 focus:ring-offset-green-50 focus:outline-hidden"
                  >
                    {secondaryAction.label}
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 