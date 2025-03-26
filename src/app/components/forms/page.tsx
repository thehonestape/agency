'use client'

import React from 'react'
import Link from 'next/link'
import { 
  DocumentTextIcon, 
  ListBulletIcon, 
  UserIcon, 
  ArrowRightIcon
} from '@heroicons/react/24/outline'

export default function FormsIndex() {
  const formCategories = [
    {
      name: 'Input Groups',
      description: 'Text input fields with various decorations and states',
      href: '/components/forms/input-groups',
      icon: DocumentTextIcon,
      components: ['InputWithLeadingIcon', 'InputWithAddOn', 'SimpleInput']
    },
    {
      name: 'Select Menus',
      description: 'Dropdown select fields for choosing from a list of options',
      href: '/components/forms/select-menus',
      icon: ListBulletIcon,
      components: ['SimpleSelect']
    },
    {
      name: 'Checkboxes',
      description: 'Checkbox inputs for selecting multiple options',
      href: '/components/forms/checkboxes',
      icon: ListBulletIcon,
      components: ['SimpleCheckbox', 'CheckboxGroup']
    },
    {
      name: 'Authentication',
      description: 'Sign-in, registration, and password reset forms',
      href: '/components/forms/authentication',
      icon: UserIcon,
      components: ['SimpleSignIn', 'SignInWithSocialOptions', 'RegistrationForm', 'ResetPasswordForm']
    },
    {
      name: 'Action Panels',
      description: 'Interactive panels for user actions and settings',
      href: '/components/forms/action-panels',
      icon: DocumentTextIcon,
      components: ['SimpleActionPanel', 'WithButton', 'WithToggle']
    },
    {
      name: 'Comboboxes',
      description: 'Advanced select inputs with search and autocomplete functionality',
      href: '/components/forms/comboboxes',
      icon: ListBulletIcon,
      components: ['SimpleCombobox', 'WithSearch', 'WithImages']
    }
  ]

  return (
    <div className="w-full px-4 py-8">
      <h1 className="text-2xl font-semibold mb-2">Form Components</h1>
      <p className="text-gray-600 mb-8">Build powerful forms with our collection of input components</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {formCategories.map((category) => (
          <div 
            key={category.name}
            className="bg-white rounded-lg shadow overflow-hidden hover:shadow-md transition-shadow"
          >
            <div className="p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0 p-2 bg-blue-50 rounded-md">
                  <category.icon className="h-6 w-6 text-blue-600" />
                </div>
                <h2 className="ml-3 text-lg font-medium text-gray-900">{category.name}</h2>
              </div>
              
              <p className="mt-3 text-gray-600">{category.description}</p>
              
              <div className="mt-4">
                <h3 className="text-sm font-medium text-gray-700">Components:</h3>
                <ul className="mt-2 space-y-1">
                  {category.components.map((component) => (
                    <li key={component} className="text-sm text-gray-600">
                      • {component}
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="mt-5">
                <Link 
                  href={category.href} 
                  className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-800"
                >
                  View {category.name}
                  <ArrowRightIcon className="ml-1 h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-12 bg-blue-50 rounded-lg p-6">
        <h2 className="text-lg font-medium text-gray-900">Getting Started with Forms</h2>
        <p className="mt-2 text-gray-600">
          Our form components are designed to be accessible, customizable, and easy to implement.
          They handle various states including validation, errors, and focus styles automatically.
        </p>
        <div className="mt-4 flex space-x-4">
          <Link
            href="/components/forms/input-groups"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
          >
            Explore Input Groups
          </Link>
          <Link
            href="/components/forms/authentication"
            className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50"
          >
            View Authentication Forms
          </Link>
        </div>
      </div>
    </div>
  )
} 