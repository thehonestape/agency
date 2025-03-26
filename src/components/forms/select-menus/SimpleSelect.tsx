'use client'

import React, { forwardRef } from 'react'

export interface Option {
  value: string
  label: string
}

export interface SimpleSelectProps extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'value'> {
  label: string
  options: Option[]
  value?: string
  helperText?: string
  error?: string
  name: string
  containerClassName?: string
  labelClassName?: string
  selectClassName?: string
  errorClassName?: string
  helperClassName?: string
}

export const SimpleSelect = forwardRef<HTMLSelectElement, SimpleSelectProps>(
  (
    {
      label,
      options,
      value,
      helperText,
      error,
      name,
      containerClassName = '',
      labelClassName = '',
      selectClassName = '',
      errorClassName = '',
      helperClassName = '',
      ...props
    },
    ref
  ) => {
    return (
      <div className={`${containerClassName}`}>
        <label htmlFor={name} className={`block text-sm font-medium leading-6 text-gray-900 ${labelClassName}`}>
          {label}
        </label>
        <div className="mt-2">
          <select
            ref={ref}
            id={name}
            name={name}
            value={value}
            className={`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ${
              error ? 'ring-red-300 focus:ring-red-500' : 'ring-gray-300 focus:ring-indigo-600'
            } focus:ring-2 focus:ring-inset sm:max-w-xs sm:text-sm sm:leading-6 ${selectClassName}`}
            aria-describedby={error ? `${name}-error` : helperText ? `${name}-description` : undefined}
            {...props}
          >
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
        {error ? (
          <p className={`mt-2 text-sm text-red-600 ${errorClassName}`} id={`${name}-error`}>
            {error}
          </p>
        ) : helperText ? (
          <p className={`mt-2 text-sm text-gray-500 ${helperClassName}`} id={`${name}-description`}>
            {helperText}
          </p>
        ) : null}
      </div>
    )
  }
)

SimpleSelect.displayName = 'SimpleSelect'

// Example usage:
// <SimpleSelect
//   label="Country"
//   name="country"
//   options={[
//     { value: '', label: 'Select a country' },
//     { value: 'us', label: 'United States' },
//     { value: 'ca', label: 'Canada' },
//     { value: 'mx', label: 'Mexico' },
//   ]}
//   helperText="Choose the country where you currently reside."
// /> 