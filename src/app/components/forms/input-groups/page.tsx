'use client';

import React, { useState } from 'react';
import { InputWithLeadingIcon } from '@/components/forms/input-groups';
import { EnvelopeIcon, UserIcon, ExclamationCircleIcon } from '@heroicons/react/24/outline';

export default function InputGroupsShowcase() {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [name, setName] = useState('');

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    setEmailError('');
  };

  const validateEmail = () => {
    if (!email) {
      setEmailError('Email is required');
      return;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError('Please enter a valid email address');
      return;
    }
    alert(`Email validated: ${email}`);
  };

  return (
    <div className="w-full px-4 py-8">
      <h1 className="mb-2 text-2xl font-semibold">Input Group Components</h1>
      <p className="mb-8 text-gray-600">
        Form input components with various decorations and states
      </p>

      <div className="space-y-16">
        {/* Input with Leading Icon */}
        <section>
          <h2 className="mb-6 border-b pb-2 text-xl font-semibold">Input with Leading Icon</h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {/* Default State */}
            <div className="rounded-lg bg-white p-6 shadow">
              <h3 className="mb-4 font-medium">Default State</h3>

              <InputWithLeadingIcon
                label="Email"
                name="email"
                type="email"
                icon={<EnvelopeIcon className="h-5 w-5 text-gray-400" />}
                placeholder="you@example.com"
                value={email}
                onChange={handleEmailChange}
                helperText="We'll never share your email with anyone else."
              />

              <button
                className="mt-4 rounded bg-blue-600 px-4 py-2 text-white transition hover:bg-blue-700"
                onClick={validateEmail}
              >
                Validate
              </button>

              <div className="mt-10 rounded-md bg-gray-50 p-4">
                <h4 className="mb-2 text-sm font-semibold">Example Code</h4>
                <pre className="overflow-auto rounded bg-gray-100 p-2 text-xs">
                  {`<InputWithLeadingIcon
  label="Email"
  name="email"
  type="email"
  icon={<EnvelopeIcon className="h-5 w-5 text-gray-400" />}
  placeholder="you@example.com"
  value={email}
  onChange={handleChange}
  helperText="We'll never share your email with anyone else."
/>`}
                </pre>
              </div>
            </div>

            {/* With Error */}
            <div className="rounded-lg bg-white p-6 shadow">
              <h3 className="mb-4 font-medium">With Error</h3>

              <InputWithLeadingIcon
                label="Email"
                name="email-error"
                type="email"
                icon={<EnvelopeIcon className="h-5 w-5 text-gray-400" />}
                placeholder="you@example.com"
                value={email}
                onChange={handleEmailChange}
                error={emailError}
              />

              <button
                className="mt-4 rounded bg-blue-600 px-4 py-2 text-white transition hover:bg-blue-700"
                onClick={() => setEmailError('Please enter a valid email address')}
              >
                Show Error
              </button>

              <div className="mt-10 rounded-md bg-gray-50 p-4">
                <h4 className="mb-2 text-sm font-semibold">Example Code</h4>
                <pre className="overflow-auto rounded bg-gray-100 p-2 text-xs">
                  {`<InputWithLeadingIcon
  label="Email"
  name="email"
  type="email"
  icon={<EnvelopeIcon className="h-5 w-5 text-gray-400" />}
  placeholder="you@example.com"
  value={email}
  onChange={handleChange}
  error="Please enter a valid email address"
/>`}
                </pre>
              </div>
            </div>

            {/* Disabled State */}
            <div className="rounded-lg bg-white p-6 shadow">
              <h3 className="mb-4 font-medium">Disabled State</h3>

              <InputWithLeadingIcon
                label="Username"
                name="username-disabled"
                icon={<UserIcon className="h-5 w-5 text-gray-400" />}
                placeholder="johndoe"
                value="admin"
                disabled
                helperText="This field is read-only"
              />

              <div className="mt-10 rounded-md bg-gray-50 p-4">
                <h4 className="mb-2 text-sm font-semibold">Example Code</h4>
                <pre className="overflow-auto rounded bg-gray-100 p-2 text-xs">
                  {`<InputWithLeadingIcon
  label="Username"
  name="username"
  icon={<UserIcon className="h-5 w-5 text-gray-400" />}
  placeholder="johndoe"
  value="admin"
  disabled
  helperText="This field is read-only"
/>`}
                </pre>
              </div>
            </div>

            {/* Required Field */}
            <div className="rounded-lg bg-white p-6 shadow">
              <h3 className="mb-4 font-medium">Required Field</h3>

              <InputWithLeadingIcon
                label="Full Name"
                name="name-required"
                icon={<UserIcon className="h-5 w-5 text-gray-400" />}
                placeholder="John Doe"
                value={name}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
                required
                helperText="This field is required"
              />

              <div className="mt-10 rounded-md bg-gray-50 p-4">
                <h4 className="mb-2 text-sm font-semibold">Example Code</h4>
                <pre className="overflow-auto rounded bg-gray-100 p-2 text-xs">
                  {`<InputWithLeadingIcon
  label="Full Name"
  name="name"
  icon={<UserIcon className="h-5 w-5 text-gray-400" />}
  placeholder="John Doe"
  value={name}
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
