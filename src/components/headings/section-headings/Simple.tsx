'use client'

import React from 'react'

interface SimpleProps {
  title: string
  className?: string
}

export function Simple({ title, className = '' }: SimpleProps) {
  return (
    <div className={className}>
      <h2 className="text-lg font-medium leading-6 text-gray-900">{title}</h2>
    </div>
  )
}

// Example usage:
// <Simple title="Team Members" /> 