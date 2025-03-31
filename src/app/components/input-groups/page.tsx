'use client';

import React from 'react';
import { SimpleInput, InputWithLeadingIcon, InputWithAddOn } from '@/components/forms/input-groups';

export default function InputGroupsShowcase() {
  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="mb-2 text-3xl font-bold">Input Groups</h1>
      <p className="mb-10 text-gray-600">Form input components with various styles and options</p>

      <div className="space-y-12">
        {/* Simple Input */}
        <section>
          <h2 className="mb-6 border-b pb-2 text-xl font-semibold">Simple Input</h2>
          <div className="grid gap-8 md:grid-cols-2">
            <div className="rounded-lg bg-white p-6 shadow">
              <h3 className="mb-4 text-lg font-medium">Default</h3>
              <SimpleInput
                label="Email"
                name="email"
                type="email"
                placeholder="you@example.com"
                helperText="We'll never share your email with anyone else."
              />

              <div className="mt-6 rounded-md bg-gray-50 p-4">
                <h4 className="mb-2 text-sm font-semibold">Example Code</h4>
                <pre className="overflow-auto rounded bg-gray-100 p-2 text-xs">
                  {`<SimpleInput
  label="Email"
  name="email"
  type="email"
  placeholder="you@example.com"
  helperText="We'll never share your email with anyone else."
/>`}
                </pre>
              </div>
            </div>

            <div className="rounded-lg bg-white p-6 shadow">
              <h3 className="mb-4 text-lg font-medium">With Error</h3>
              <SimpleInput
                label="Password"
                name="password"
                type="password"
                placeholder="Enter password"
                error="Password must be at least 8 characters long"
              />

              <div className="mt-6 rounded-md bg-gray-50 p-4">
                <h4 className="mb-2 text-sm font-semibold">Example Code</h4>
                <pre className="overflow-auto rounded bg-gray-100 p-2 text-xs">
                  {`<SimpleInput
  label="Password"
  name="password"
  type="password"
  placeholder="Enter password"
  error="Password must be at least 8 characters long"
/>`}
                </pre>
              </div>
            </div>
          </div>
        </section>

        {/* Input with Leading Icon */}
        <section>
          <h2 className="mb-6 border-b pb-2 text-xl font-semibold">Input with Leading Icon</h2>
          <div className="grid gap-8 md:grid-cols-2">
            <div className="rounded-lg bg-white p-6 shadow">
              <h3 className="mb-4 text-lg font-medium">Default</h3>
              <InputWithLeadingIcon
                label="Email"
                name="email-icon"
                type="email"
                placeholder="you@example.com"
                icon={
                  <svg
                    className="h-5 w-5 text-gray-400"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                }
              />

              <div className="mt-6 rounded-md bg-gray-50 p-4">
                <h4 className="mb-2 text-sm font-semibold">Example Code</h4>
                <pre className="overflow-auto rounded bg-gray-100 p-2 text-xs">
                  {`<InputWithLeadingIcon
  label="Email"
  name="email-icon"
  type="email"
  placeholder="you@example.com"
  icon={
    <svg className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
    </svg>
  }
/>`}
                </pre>
              </div>
            </div>

            <div className="rounded-lg bg-white p-6 shadow">
              <h3 className="mb-4 text-lg font-medium">With Error</h3>
              <InputWithLeadingIcon
                label="Search"
                name="search-icon"
                type="search"
                placeholder="Search..."
                error="No results found"
                icon={
                  <svg
                    className="h-5 w-5 text-gray-400"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
                      clipRule="evenodd"
                    />
                  </svg>
                }
              />

              <div className="mt-6 rounded-md bg-gray-50 p-4">
                <h4 className="mb-2 text-sm font-semibold">Example Code</h4>
                <pre className="overflow-auto rounded bg-gray-100 p-2 text-xs">
                  {`<InputWithLeadingIcon
  label="Search"
  name="search-icon"
  type="search"
  placeholder="Search..."
  error="No results found"
  icon={
    <svg className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
      <path fillRule="evenodd" d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z" clipRule="evenodd" />
    </svg>
  }
/>`}
                </pre>
              </div>
            </div>
          </div>
        </section>

        {/* Input with Add-On */}
        <section>
          <h2 className="mb-6 border-b pb-2 text-xl font-semibold">Input with Add-On</h2>
          <div className="grid gap-8 md:grid-cols-2">
            <div className="rounded-lg bg-white p-6 shadow">
              <h3 className="mb-4 text-lg font-medium">Leading Add-On</h3>
              <InputWithAddOn
                label="Website"
                name="website"
                placeholder="example.com"
                addOnText="https://"
                addOnPosition="leading"
                helperText="Enter your website domain without the protocol."
              />

              <div className="mt-6 rounded-md bg-gray-50 p-4">
                <h4 className="mb-2 text-sm font-semibold">Example Code</h4>
                <pre className="overflow-auto rounded bg-gray-100 p-2 text-xs">
                  {`<InputWithAddOn
  label="Website"
  name="website"
  placeholder="example.com"
  addOnText="https://"
  addOnPosition="leading"
  helperText="Enter your website domain without the protocol."
/>`}
                </pre>
              </div>
            </div>

            <div className="rounded-lg bg-white p-6 shadow">
              <h3 className="mb-4 text-lg font-medium">Trailing Add-On</h3>
              <InputWithAddOn
                label="Username"
                name="username"
                placeholder="yourname"
                addOnText="@example.com"
                addOnPosition="trailing"
                helperText="Enter your username for the email address."
              />

              <div className="mt-6 rounded-md bg-gray-50 p-4">
                <h4 className="mb-2 text-sm font-semibold">Example Code</h4>
                <pre className="overflow-auto rounded bg-gray-100 p-2 text-xs">
                  {`<InputWithAddOn
  label="Username"
  name="username"
  placeholder="yourname"
  addOnText="@example.com"
  addOnPosition="trailing"
  helperText="Enter your username for the email address."
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
