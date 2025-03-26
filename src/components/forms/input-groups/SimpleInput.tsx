'use client'

import React, { forwardRef } from 'react'

export interface SimpleInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string
  helperText?: string
  error?: string
  name: string
  containerClassName?: string
  labelClassName?: string
  inputClassName?: string
  errorClassName?: string
  helperClassName?: string
}

export const SimpleInput = forwardRef<HTMLInputElement, SimpleInputProps>(
  (
    {
      label,
      helperText,
      error,
      name,
      containerClassName = '',
      labelClassName = '',
      inputClassName = '',
      errorClassName = '',
      helperClassName = '',
      ...props
    },
    ref
  ) => {
    const hasError = Boolean(error);
    
    return (
      <div className={`${containerClassName}`}>
        <label htmlFor={name} className={`block text-sm font-medium leading-6 text-gray-900 ${labelClassName}`}>
          {label}
        </label>
        <div className="mt-2">
          <input
            ref={ref}
            id={name}
            name={name}
            className={`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ${
              hasError ? 'ring-red-300 focus:ring-red-500' : 'ring-gray-300 focus:ring-indigo-600'
            } placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6 ${inputClassName}`}
            aria-invalid={hasError ? "true" : "false"}
            aria-describedby={hasError ? `${name}-error` : helperText ? `${name}-description` : undefined}
            {...props}
          />
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

SimpleInput.displayName = 'SimpleInput'

// Example usage:
// <SimpleInput
//   label="Email"
//   name="email"
//   type="email"
//   autoComplete="email"
//   required
//   helperText="We'll never share your email with anyone else."
// />
//
// // With error
// <SimpleInput
//   label="Password"
//   name="password"
//   type="password"
//   autoComplete="current-password"
//   required
//   error="Password must be at least 8 characters long"
// /> 