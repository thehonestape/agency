'use client'

import React from 'react'

interface WithDescriptionProps {
  title: string
  description: string
  className?: string
}

export function WithDescription({ title, description, className = '' }: WithDescriptionProps) {
  return (
    <div className={className}>
      <h2 className="text-lg font-medium leading-6 text-gray-900">{title}</h2>
      <p className="mt-1 text-sm text-gray-500">{description}</p>
    </div>
  )
}

// Example usage:
// <WithDescription 
//   title="Team Members" 
//   description="A list of all the members in your account including their name, title, email and role."
// /> 