'use client'

import React from 'react'
import { SimpleSignIn, SignInWithSocialOptions, RegistrationForm, ResetPasswordForm } from '@/components/forms/sign-in'

export default function AuthenticationShowcase() {
  const socialProviders = [
    { 
      name: 'GitHub', 
      id: 'github', 
      icon: (
        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
          <path
            fillRule="evenodd"
            d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z"
            clipRule="evenodd"
          />
        </svg>
      )
    },
    { 
      name: 'Twitter', 
      id: 'twitter', 
      icon: (
        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
          <path d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84" />
        </svg>
      )
    },
    { 
      name: 'Google', 
      id: 'google', 
      icon: (
        <svg className="h-5 w-5" aria-hidden="true" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12.0003 4.75C13.7703 4.75 15.3553 5.36002 16.6053 6.54998L20.0303 3.125C17.9502 1.19 15.2353 0 12.0003 0C7.31028 0 3.25527 2.69 1.28027 6.60998L5.27028 9.70498C6.21525 6.86002 8.87028 4.75 12.0003 4.75Z" fill="#EA4335" />
          <path d="M23.49 12.275C23.49 11.49 23.415 10.73 23.3 10H12V14.51H18.47C18.18 15.99 17.34 17.25 16.08 18.1L19.945 21.1C22.2 19.01 23.49 15.92 23.49 12.275Z" fill="#4285F4" />
          <path d="M5.26498 14.2949C5.02498 13.5699 4.88501 12.7999 4.88501 11.9999C4.88501 11.1999 5.01998 10.4299 5.26498 9.7049L1.275 6.60986C0.46 8.22986 0 10.0599 0 11.9999C0 13.9399 0.46 15.7699 1.28 17.3899L5.26498 14.2949Z" fill="#FBBC05" />
          <path d="M12.0004 24C15.2404 24 17.9654 22.935 19.9454 21.095L16.0804 18.095C15.0054 18.82 13.6204 19.245 12.0004 19.245C8.8704 19.245 6.21537 17.135 5.2654 14.29L1.27539 17.385C3.25539 21.31 7.3104 24 12.0004 24Z" fill="#34A853" />
        </svg>
      )
    }
  ]

  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-2">Authentication Forms</h1>
      <p className="text-gray-600 mb-10">Sign-in, registration, and password reset form components</p>
      
      <div className="space-y-16">
        {/* Simple Sign In */}
        <section>
          <h2 className="text-xl font-semibold mb-6 border-b pb-2">Simple Sign In</h2>
          <div className="p-6 bg-white rounded-lg shadow">
            <SimpleSignIn />
            
            <div className="mt-10 p-4 bg-gray-50 rounded-md">
              <h4 className="text-sm font-semibold mb-2">Example Code</h4>
              <pre className="text-xs overflow-auto p-2 bg-gray-100 rounded">
{`<SimpleSignIn 
  onSubmit={(data) => {
    console.log('Form submitted:', data);
    // Handle authentication logic
  }}
  forgotPasswordHref="/forgot-password"
  createAccountHref="/register"
/>`}
              </pre>
            </div>
          </div>
        </section>
        
        {/* Sign In with Social Options */}
        <section>
          <h2 className="text-xl font-semibold mb-6 border-b pb-2">Sign In with Social Options</h2>
          <div className="p-6 bg-white rounded-lg shadow">
            <SignInWithSocialOptions socialProviders={socialProviders} />
            
            <div className="mt-10 p-4 bg-gray-50 rounded-md">
              <h4 className="text-sm font-semibold mb-2">Example Code</h4>
              <pre className="text-xs overflow-auto p-2 bg-gray-100 rounded">
{`<SignInWithSocialOptions 
  onSubmit={(data) => {
    console.log('Form submitted:', data);
    // Handle authentication logic
  }}
  onSocialLogin={(provider) => {
    console.log('Social login with:', provider);
    // Handle social authentication
  }}
  socialProviders={[
    { name: 'Facebook', id: 'facebook', icon: <Facebook className="h-5 w-5" /> },
    { name: 'Twitter', id: 'twitter', icon: <Twitter className="h-5 w-5" /> },
    { name: 'GitHub', id: 'github', icon: <GitHub className="h-5 w-5" /> },
  ]}
  forgotPasswordHref="/forgot-password"
  createAccountHref="/register"
/>`}
              </pre>
            </div>
          </div>
        </section>
        
        {/* Registration Form */}
        <section>
          <h2 className="text-xl font-semibold mb-6 border-b pb-2">Registration Form</h2>
          <div className="p-6 bg-white rounded-lg shadow">
            <RegistrationForm />
            
            <div className="mt-10 p-4 bg-gray-50 rounded-md">
              <h4 className="text-sm font-semibold mb-2">Example Code</h4>
              <pre className="text-xs overflow-auto p-2 bg-gray-100 rounded">
{`<RegistrationForm 
  onSubmit={(data) => {
    console.log('Form submitted:', data);
    // Handle registration logic
  }}
  termsHref="/terms"
  policyHref="/privacy"
  signInHref="/signin"
/>`}
              </pre>
            </div>
          </div>
        </section>
        
        {/* Reset Password Form */}
        <section>
          <h2 className="text-xl font-semibold mb-6 border-b pb-2">Reset Password Form</h2>
          <div className="p-6 bg-white rounded-lg shadow">
            <ResetPasswordForm />
            
            <div className="mt-10 p-4 bg-gray-50 rounded-md">
              <h4 className="text-sm font-semibold mb-2">Example Code</h4>
              <pre className="text-xs overflow-auto p-2 bg-gray-100 rounded">
{`<ResetPasswordForm 
  onSubmit={(data) => {
    console.log('Reset password requested for:', data.email);
    // Handle password reset logic
  }}
  signInHref="/signin"
/>`}
              </pre>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
} 