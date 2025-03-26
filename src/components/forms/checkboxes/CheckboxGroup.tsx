'use client'

import React, { useState } from 'react'

export interface CheckboxOption {
  id: string;
  label: string;
  description?: string;
  value: string;
}

export interface CheckboxGroupProps {
  legend: string;
  options: CheckboxOption[];
  defaultSelected?: string[];
  onChange?: (selectedValues: string[]) => void;
  error?: string;
  legendClassName?: string;
  checkboxClassName?: string;
  errorClassName?: string;
  containerClassName?: string;
}

export function CheckboxGroup({
  legend,
  options,
  defaultSelected = [],
  onChange,
  error,
  legendClassName = '',
  checkboxClassName = '',
  errorClassName = '',
  containerClassName = '',
}: CheckboxGroupProps) {
  const [selectedValues, setSelectedValues] = useState<string[]>(defaultSelected)

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = event.target
    
    const newSelectedValues = checked
      ? [...selectedValues, value]
      : selectedValues.filter((v) => v !== value)
    
    setSelectedValues(newSelectedValues)
    
    if (onChange) {
      onChange(newSelectedValues)
    }
  }

  return (
    <fieldset className={containerClassName}>
      <legend className={`text-base font-semibold leading-6 text-gray-900 ${legendClassName}`}>
        {legend}
      </legend>
      <div className="mt-4 space-y-4">
        {options.map((option) => (
          <div key={option.id} className={`relative flex items-start ${checkboxClassName}`}>
            <div className="flex h-6 items-center">
              <input
                id={option.id}
                name={option.id}
                type="checkbox"
                value={option.value}
                checked={selectedValues.includes(option.value)}
                onChange={handleChange}
                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
              />
            </div>
            <div className="ml-3 text-sm leading-6">
              <label htmlFor={option.id} className="font-medium text-gray-900">
                {option.label}
              </label>
              {option.description && (
                <p className="text-gray-500">{option.description}</p>
              )}
            </div>
          </div>
        ))}
      </div>
      {error && (
        <p className={`mt-2 text-sm text-red-600 ${errorClassName}`}>
          {error}
        </p>
      )}
    </fieldset>
  )
}

// Example usage:
// <CheckboxGroup
//   legend="Notifications"
//   options={[
//     {
//       id: "comments",
//       label: "Comments",
//       description: "Get notified when someone comments on your post.",
//       value: "comments"
//     },
//     {
//       id: "mentions",
//       label: "Mentions",
//       description: "Get notified when someone mentions you.",
//       value: "mentions"
//     },
//     {
//       id: "follows",
//       label: "Follows",
//       description: "Get notified when someone follows you.",
//       value: "follows"
//     }
//   ]}
//   defaultSelected={["comments"]}
//   onChange={(values) => console.log('Selected notifications:', values)}
// /> 