'use client'

import React, { useState } from 'react'
import { Dialog } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { HomeIcon } from '@heroicons/react/20/solid'
import { cn } from '../../../lib/utils'
import { Link } from 'react-router-dom'

const navigation = [
  { name: 'Dashboard', href: '/dashboard', current: true },
  { name: 'Team', href: '/team', current: false },
  { name: 'Projects', href: '/projects', current: false },
  { name: 'Brands', href: '/brands', current: false },
  { name: 'Components', href: '/components', current: false },
]

const userNavigation = [
  { name: 'Your Profile', href: '/profile' },
  { name: 'Settings', href: '/settings' },
  { name: 'Sign out', href: '/logout' },
]

const breadcrumbs = [
  { name: 'Projects', href: '/projects', current: false },
  { name: 'Project Nero', href: '/projects/nero', current: true },
]

interface DarkNavWithWhitePageHeaderProps {
  children?: React.ReactNode
  title?: string
  description?: string
}

export function DarkNavWithWhitePageHeader({
  children,
  title = 'Project Nero',
  description = 'Keep track of your project and monitor progress towards completion.',
}: DarkNavWithWhitePageHeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <header className="bg-gray-900">
        <nav className="mx-auto flex max-w-7xl items-center justify-between gap-x-6 p-6 lg:px-8" aria-label="Global">
          <div className="flex lg:flex-1">
            <Link to="/" className="-m-1.5 p-1.5">
              <span className="sr-only">Your Company</span>
              <img
                className="h-8 w-auto"
                src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                alt=""
              />
            </Link>
          </div>
          <div className="hidden lg:flex lg:gap-x-12">
            {navigation.map((item) => (
              <Link 
                key={item.name} 
                to={item.href}
                className={cn(
                  'text-sm font-semibold leading-6',
                  item.current 
                    ? 'text-white' 
                    : 'text-gray-300 hover:text-white'
                )}
                aria-current={item.current ? 'page' : undefined}
              >
                {item.name}
              </Link>
            ))}
          </div>
          <div className="flex flex-1 items-center justify-end gap-x-6">
            <Link to="/login" className="hidden lg:block lg:text-sm lg:font-semibold lg:leading-6 lg:text-gray-300 lg:hover:text-white">
              Log in
            </Link>
            <Link
              to="/register"
              className="rounded-md bg-primary px-3 py-2 text-sm font-semibold text-primary-foreground shadow-sm hover:bg-primary/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            >
              Sign up
            </Link>
          </div>
          <div className="flex lg:hidden">
            <button
              type="button"
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-400"
              onClick={() => setMobileMenuOpen(true)}
            >
              <span className="sr-only">Open main menu</span>
              <Bars3Icon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
        </nav>
        <Dialog as="div" className="lg:hidden" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
          <div className="fixed inset-0 z-10" />
          <Dialog.Panel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-gray-900 px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-white/10">
            <div className="flex items-center gap-x-6">
              <Link to="/" className="-m-1.5 p-1.5">
                <span className="sr-only">Your Company</span>
                <img
                  className="h-8 w-auto"
                  src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                  alt=""
                />
              </Link>
              <Link
                to="/register"
                className="ml-auto rounded-md bg-primary px-3 py-2 text-sm font-semibold text-primary-foreground shadow-sm hover:bg-primary/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              >
                Sign up
              </Link>
              <button
                type="button"
                className="-m-2.5 rounded-md p-2.5 text-gray-400"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="sr-only">Close menu</span>
                <XMarkIcon className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-gray-500/25">
                <div className="space-y-2 py-6">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      to={item.href}
                      className={cn(
                        'block px-3 py-2 text-base font-semibold leading-7 rounded-lg',
                        item.current 
                          ? 'text-white bg-gray-800' 
                          : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                      )}
                      aria-current={item.current ? 'page' : undefined}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
                <div className="py-6">
                  <Link
                    to="/login"
                    className="-mx-3 block px-3 py-2.5 text-base font-semibold leading-7 text-gray-300 hover:bg-gray-800 hover:text-white"
                  >
                    Log in
                  </Link>
                </div>
              </div>
            </div>
          </Dialog.Panel>
        </Dialog>
      </header>

      {/* Page header */}
      <div className="bg-white shadow">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <div className="lg:flex lg:items-center lg:justify-between">
            <div className="min-w-0 flex-1">
              <nav className="flex" aria-label="Breadcrumb">
                <ol className="flex items-center space-x-2">
                  <li>
                    <div className="flex">
                      <Link to="/" className="text-sm font-medium text-gray-500 hover:text-gray-700">
                        <HomeIcon className="h-4 w-4 flex-shrink-0" aria-hidden="true" />
                        <span className="sr-only">Home</span>
                      </Link>
                    </div>
                  </li>
                  {breadcrumbs.map((item) => (
                    <li key={item.name}>
                      <div className="flex items-center">
                        <svg
                          className="h-5 w-5 flex-shrink-0 text-gray-400"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          aria-hidden="true"
                        >
                          <path d="M5.555 17.776l8-16 .894.448-8 16-.894-.448z" />
                        </svg>
                        <Link
                          to={item.href}
                          className={cn(
                            'ml-2 text-sm font-medium',
                            item.current
                              ? 'text-gray-900'
                              : 'text-gray-500 hover:text-gray-700'
                          )}
                          aria-current={item.current ? 'page' : undefined}
                        >
                          {item.name}
                        </Link>
                      </div>
                    </li>
                  ))}
                </ol>
              </nav>
              <h2 className="mt-2 text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
                {title}
              </h2>
              <p className="mt-1 text-sm text-gray-500">
                {description}
              </p>
            </div>
            <div className="mt-5 flex lg:ml-4 lg:mt-0">
              <span className="ml-3 sm:ml-0">
                <button
                  type="button"
                  className="inline-flex items-center rounded-md bg-primary px-3 py-2 text-sm font-semibold text-primary-foreground shadow-sm hover:bg-primary/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                >
                  Action
                </button>
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Main content area */}
      <main>
        <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">{children}</div>
      </main>
    </div>
  )
} 