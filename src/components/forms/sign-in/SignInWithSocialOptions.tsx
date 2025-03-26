'use client'

import React, { useState } from 'react'

export interface SocialProvider {
  name: string;
  id: string;
  icon: React.ReactNode;
}

export interface SignInWithSocialOptionsProps {
  onSubmit?: (data: { email: string; password: string; remember: boolean }) => void;
  onSocialLogin?: (provider: string) => void;
  socialProviders: SocialProvider[];
  forgotPasswordHref?: string;
  createAccountHref?: string;
  className?: string;
}

export function SignInWithSocialOptions({ 
  onSubmit, 
  onSocialLogin,
  socialProviders = [],
  forgotPasswordHref = '#', 
  createAccountHref = '#',
  className = '' 
}: SignInWithSocialOptionsProps) {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    remember: false,
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (onSubmit) {
      onSubmit(formData)
    }
  }

  const handleSocialLogin = (providerId: string) => {
    if (onSocialLogin) {
      onSocialLogin(providerId)
    }
  }

  return (
    <div className={`${className}`}>
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Sign in to your account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
              Email address
            </label>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                Password
              </label>
              <div className="text-sm">
                <a href={forgotPasswordHref} className="font-semibold text-indigo-600 hover:text-indigo-500">
                  Forgot password?
                </a>
              </div>
            </div>
            <div className="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={formData.password}
                onChange={handleChange}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember"
                name="remember"
                type="checkbox"
                checked={formData.remember}
                onChange={handleChange}
                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
              />
              <label htmlFor="remember" className="ml-3 block text-sm leading-6 text-gray-900">
                Remember me
              </label>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Sign in
            </button>
          </div>
        </form>

        {socialProviders.length > 0 && (
          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="bg-white px-2 text-gray-500">Or continue with</span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-3 gap-3">
              {socialProviders.map((provider) => (
                <button
                  key={provider.id}
                  type="button"
                  onClick={() => handleSocialLogin(provider.id)}
                  className="inline-flex w-full justify-center rounded-md bg-white px-4 py-2 text-gray-500 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0"
                >
                  <span className="sr-only">Sign in with {provider.name}</span>
                  {provider.icon}
                </button>
              ))}
            </div>
          </div>
        )}

        <p className="mt-10 text-center text-sm text-gray-500">
          Not a member?{' '}
          <a href={createAccountHref} className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
            Create an account
          </a>
        </p>
      </div>
    </div>
  )
}

// Example usage:
// import { Facebook, Twitter, GitHub } from '@/path-to-your-icons'
// 
// <SignInWithSocialOptions 
//   onSubmit={(data) => {
//     console.log('Form submitted:', data);
//     // Handle authentication logic
//   }}
//   onSocialLogin={(provider) => {
//     console.log('Social login with:', provider);
//     // Handle social authentication
//   }}
//   socialProviders={[
//     { name: 'Facebook', id: 'facebook', icon: <Facebook className="h-5 w-5" /> },
//     { name: 'Twitter', id: 'twitter', icon: <Twitter className="h-5 w-5" /> },
//     { name: 'GitHub', id: 'github', icon: <GitHub className="h-5 w-5" /> },
//   ]}
//   forgotPasswordHref="/forgot-password"
//   createAccountHref="/register"
// /> 