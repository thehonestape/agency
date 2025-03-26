'use client'

import React, { forwardRef } from 'react'

export interface InputWithLeadingIconProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string
  icon: React.ReactNode
  helperText?: string
  error?: string
  name: string
  containerClassName?: string
  labelClassName?: string
  inputClassName?: string
  errorClassName?: string
  helperClassName?: string
}

export const InputWithLeadingIcon = forwardRef<HTMLInputElement, InputWithLeadingIconProps>(
  (
    {
      label,
      icon,
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
        <div className="relative mt-2 rounded-md shadow-sm">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            {icon}
          </div>
          <input
            ref={ref}
            id={name}
            name={name}
            className={`block w-full rounded-md border-0 py-1.5 pl-10 text-gray-900 shadow-sm ring-1 ring-inset ${
              error ? 'ring-red-300 focus:ring-red-500' : 'ring-gray-300 focus:ring-indigo-600'
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

InputWithLeadingIcon.displayName = 'InputWithLeadingIcon'

// Example usage:
// <InputWithLeadingIcon
//   label="Email"
//   name="email"
//   type="email"
//   autoComplete="email"
//   icon={
//     <svg className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
//       <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
//       <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
//     </svg>
//   }
//   placeholder="you@example.com"
// /> 