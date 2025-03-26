'use client'

import React, { useState } from 'react'
import { SimpleSelect } from '@/components/forms/select-menus'

export default function SelectMenusShowcase() {
  const [selectedCountry, setSelectedCountry] = useState('')
  const [selectedCountryError, setSelectedCountryError] = useState('')
  
  const countries = [
    { value: '', label: 'Select a country' },
    { value: 'us', label: 'United States' },
    { value: 'ca', label: 'Canada' },
    { value: 'mx', label: 'Mexico' },
    { value: 'uk', label: 'United Kingdom' },
    { value: 'fr', label: 'France' },
    { value: 'de', label: 'Germany' },
    { value: 'jp', label: 'Japan' },
    { value: 'au', label: 'Australia' },
    { value: 'br', label: 'Brazil' },
  ]

  const handleCountryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCountry(e.target.value)
    setSelectedCountryError('')
  }

  const validateCountry = () => {
    if (!selectedCountry) {
      setSelectedCountryError('Please select a country')
      return
    }
    alert(`Selected country: ${selectedCountry}`)
  }

  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-2">Select Menus</h1>
      <p className="text-gray-600 mb-10">Form select menu components for various use cases</p>
      
      <div className="space-y-16">
        {/* Simple Select */}
        <section>
          <h2 className="text-xl font-semibold mb-6 border-b pb-2">Simple Select</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Default State */}
            <div className="p-6 bg-white rounded-lg shadow">
              <h3 className="font-medium mb-4">Default State</h3>
              <SimpleSelect 
                label="Country"
                name="country"
                options={countries}
                value={selectedCountry}
                onChange={handleCountryChange}
                helperText="Select your country of residence"
              />
              <button 
                className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                onClick={validateCountry}
              >
                Submit
              </button>
              
              <div className="mt-10 p-4 bg-gray-50 rounded-md">
                <h4 className="text-sm font-semibold mb-2">Example Code</h4>
                <pre className="text-xs overflow-auto p-2 bg-gray-100 rounded">
{`<SimpleSelect 
  label="Country"
  name="country"
  options={[
    { value: '', label: 'Select a country' },
    { value: 'us', label: 'United States' },
    { value: 'ca', label: 'Canada' },
    // More options...
  ]}
  value={selectedCountry}
  onChange={handleChange}
  helperText="Select your country of residence"
/>`}
                </pre>
              </div>
            </div>
            
            {/* With Error */}
            <div className="p-6 bg-white rounded-lg shadow">
              <h3 className="font-medium mb-4">With Error</h3>
              <SimpleSelect 
                label="Country"
                name="country-error"
                options={countries}
                value={selectedCountry}
                onChange={handleCountryChange}
                error={selectedCountryError}
              />
              <button 
                className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                onClick={() => setSelectedCountryError('Please select a country')}
              >
                Show Error
              </button>
              
              <div className="mt-10 p-4 bg-gray-50 rounded-md">
                <h4 className="text-sm font-semibold mb-2">Example Code</h4>
                <pre className="text-xs overflow-auto p-2 bg-gray-100 rounded">
{`<SimpleSelect 
  label="Country"
  name="country"
  options={countries}
  value={selectedCountry}
  onChange={handleChange}
  error="Please select a country"
/>`}
                </pre>
              </div>
            </div>
            
            {/* Disabled State */}
            <div className="p-6 bg-white rounded-lg shadow">
              <h3 className="font-medium mb-4">Disabled State</h3>
              <SimpleSelect 
                label="Country"
                name="country-disabled"
                options={countries}
                value="us"
                disabled
                helperText="This select is disabled"
              />
              
              <div className="mt-10 p-4 bg-gray-50 rounded-md">
                <h4 className="text-sm font-semibold mb-2">Example Code</h4>
                <pre className="text-xs overflow-auto p-2 bg-gray-100 rounded">
{`<SimpleSelect 
  label="Country"
  name="country"
  options={countries}
  value="us"
  disabled
  helperText="This select is disabled"
/>`}
                </pre>
              </div>
            </div>
            
            {/* Required Field */}
            <div className="p-6 bg-white rounded-lg shadow">
              <h3 className="font-medium mb-4">Required Field</h3>
              <SimpleSelect 
                label="Country"
                name="country-required"
                options={countries}
                value={selectedCountry}
                onChange={handleCountryChange}
                required
                helperText="This field is required"
              />
              
              <div className="mt-10 p-4 bg-gray-50 rounded-md">
                <h4 className="text-sm font-semibold mb-2">Example Code</h4>
                <pre className="text-xs overflow-auto p-2 bg-gray-100 rounded">
{`<SimpleSelect 
  label="Country"
  name="country"
  options={countries}
  value={selectedCountry}
  onChange={handleChange}
  required
  helperText="This field is required"
/>`}
                </pre>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
} 