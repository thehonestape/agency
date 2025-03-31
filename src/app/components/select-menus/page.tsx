'use client';

import React, { useState } from 'react';
import { SimpleSelect } from '@/components/forms/select-menus';

export default function SelectMenusShowcase() {
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedCountryError, setSelectedCountryError] = useState('');

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
  ];

  const handleCountryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCountry(e.target.value);
    setSelectedCountryError('');
  };

  const validateCountry = () => {
    if (!selectedCountry) {
      setSelectedCountryError('Please select a country');
      return;
    }
    alert(`Selected country: ${selectedCountry}`);
  };

  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="mb-2 text-3xl font-bold">Select Menus</h1>
      <p className="mb-10 text-gray-600">Form select menu components for various use cases</p>

      <div className="space-y-16">
        {/* Simple Select */}
        <section>
          <h2 className="mb-6 border-b pb-2 text-xl font-semibold">Simple Select</h2>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {/* Default State */}
            <div className="rounded-lg bg-white p-6 shadow">
              <h3 className="mb-4 font-medium">Default State</h3>
              <SimpleSelect
                label="Country"
                name="country"
                options={countries}
                value={selectedCountry}
                onChange={handleCountryChange}
                helperText="Select your country of residence"
              />
              <button
                className="mt-4 rounded bg-blue-600 px-4 py-2 text-white transition hover:bg-blue-700"
                onClick={validateCountry}
              >
                Submit
              </button>

              <div className="mt-10 rounded-md bg-gray-50 p-4">
                <h4 className="mb-2 text-sm font-semibold">Example Code</h4>
                <pre className="overflow-auto rounded bg-gray-100 p-2 text-xs">
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
            <div className="rounded-lg bg-white p-6 shadow">
              <h3 className="mb-4 font-medium">With Error</h3>
              <SimpleSelect
                label="Country"
                name="country-error"
                options={countries}
                value={selectedCountry}
                onChange={handleCountryChange}
                error={selectedCountryError}
              />
              <button
                className="mt-4 rounded bg-blue-600 px-4 py-2 text-white transition hover:bg-blue-700"
                onClick={() => setSelectedCountryError('Please select a country')}
              >
                Show Error
              </button>

              <div className="mt-10 rounded-md bg-gray-50 p-4">
                <h4 className="mb-2 text-sm font-semibold">Example Code</h4>
                <pre className="overflow-auto rounded bg-gray-100 p-2 text-xs">
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
            <div className="rounded-lg bg-white p-6 shadow">
              <h3 className="mb-4 font-medium">Disabled State</h3>
              <SimpleSelect
                label="Country"
                name="country-disabled"
                options={countries}
                value="us"
                disabled
                helperText="This select is disabled"
              />

              <div className="mt-10 rounded-md bg-gray-50 p-4">
                <h4 className="mb-2 text-sm font-semibold">Example Code</h4>
                <pre className="overflow-auto rounded bg-gray-100 p-2 text-xs">
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
            <div className="rounded-lg bg-white p-6 shadow">
              <h3 className="mb-4 font-medium">Required Field</h3>
              <SimpleSelect
                label="Country"
                name="country-required"
                options={countries}
                value={selectedCountry}
                onChange={handleCountryChange}
                required
                helperText="This field is required"
              />

              <div className="mt-10 rounded-md bg-gray-50 p-4">
                <h4 className="mb-2 text-sm font-semibold">Example Code</h4>
                <pre className="overflow-auto rounded bg-gray-100 p-2 text-xs">
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
  );
}
