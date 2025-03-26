'use client'

import React, { forwardRef } from 'react'

export interface InputWithAddOnProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'className'> {
  label?: string;
  addOnText?: string;
  addOnPosition?: 'leading' | 'trailing';
  helperText?: string;
  error?: string;
  labelClassName?: string;
  inputClassName?: string;
  addOnClassName?: string;
  helperTextClassName?: string;
  errorClassName?: string;
  containerClassName?: string;
}

export const InputWithAddOn = forwardRef<HTMLInputElement, InputWithAddOnProps>(
  (
    {
      label,
      addOnText,
      addOnPosition = 'leading',
      helperText,
      error,
      labelClassName = '',
      inputClassName = '',
      addOnClassName = '',
      helperTextClassName = '',
      errorClassName = '',
      containerClassName = '',
      ...props
    },
    ref
  ) => {
    const isLeading = addOnPosition === 'leading'
    const hasError = Boolean(error)
    
    return (
      <div className={containerClassName}>
        {label && (
          <label
            htmlFor={props.id || props.name}
            className={`block text-sm font-medium leading-6 text-gray-900 ${labelClassName}`}
          >
            {label}
          </label>
        )}
        <div className="mt-2">
          <div className="flex rounded-md shadow-sm">
            {isLeading && (
              <span className={`inline-flex items-center rounded-l-md border border-r-0 border-gray-300 px-3 text-gray-500 sm:text-sm ${addOnClassName}`}>
                {addOnText}
              </span>
            )}
            <input
              ref={ref}
              className={`block w-full min-w-0 flex-1 rounded-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${
                isLeading ? 'rounded-l-none' : 'rounded-r-none'
              } ${error ? 'ring-red-300' : 'ring-gray-300'} ${inputClassName}`}
              aria-invalid={hasError ? "true" : "false"}
              aria-describedby={
                error
                  ? `${props.id || props.name}-error`
                  : helperText
                  ? `${props.id || props.name}-description`
                  : undefined
              }
              {...props}
            />
            {!isLeading && (
              <span className={`inline-flex items-center rounded-r-md border border-l-0 border-gray-300 px-3 text-gray-500 sm:text-sm ${addOnClassName}`}>
                {addOnText}
              </span>
            )}
          </div>
          {error ? (
            <p className={`mt-2 text-sm text-red-600 ${errorClassName}`} id={`${props.id || props.name}-error`}>
              {error}
            </p>
          ) : helperText ? (
            <p className={`mt-2 text-sm text-gray-500 ${helperTextClassName}`} id={`${props.id || props.name}-description`}>
              {helperText}
            </p>
          ) : null}
        </div>
      </div>
    )
  }
)

InputWithAddOn.displayName = 'InputWithAddOn'

// Example usage:
// <InputWithAddOn
//   label="Website"
//   addOnText="https://"
//   addOnPosition="leading"
//   placeholder="www.example.com"
//   helperText="Enter your website address without the protocol."
//   name="website"
// />
//
// <InputWithAddOn
//   label="Username"
//   addOnText="@"
//   addOnPosition="trailing"
//   placeholder="username"
//   name="username"
// /> 