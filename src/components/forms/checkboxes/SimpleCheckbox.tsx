'use client'

import React, { forwardRef } from 'react'

export interface SimpleCheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label: string;
  description?: string;
  error?: string;
  labelClassName?: string;
  inputClassName?: string;
  descriptionClassName?: string;
  errorClassName?: string;
  containerClassName?: string;
}

export const SimpleCheckbox = forwardRef<HTMLInputElement, SimpleCheckboxProps>(
  (
    {
      label,
      description,
      error,
      labelClassName = '',
      inputClassName = '',
      descriptionClassName = '',
      errorClassName = '',
      containerClassName = '',
      ...props
    },
    ref
  ) => {
    return (
      <div className={`relative flex items-start ${containerClassName}`}>
        <div className="flex h-6 items-center">
          <input
            ref={ref}
            type="checkbox"
            className={`h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600 ${
              error ? 'border-red-300' : ''
            } ${inputClassName}`}
            {...props}
          />
        </div>
        <div className="ml-3 text-sm leading-6">
          <label
            htmlFor={props.id || props.name}
            className={`font-medium text-gray-900 ${labelClassName}`}
          >
            {label}
          </label>
          {description && (
            <p className={`text-gray-500 ${descriptionClassName}`}>{description}</p>
          )}
          {error && (
            <p className={`text-red-600 ${errorClassName}`}>{error}</p>
          )}
        </div>
      </div>
    )
  }
)

SimpleCheckbox.displayName = 'SimpleCheckbox'

// Example usage:
// <SimpleCheckbox
//   label="Email notifications"
//   description="Get notified when someone mentions you in a comment."
//   name="email-notifications"
//   id="email-notifications"
// />
//
// <SimpleCheckbox
//   label="Accept terms and conditions"
//   error="You must accept the terms to continue"
//   name="terms"
//   id="terms"
// /> 