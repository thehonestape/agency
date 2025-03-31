'use client'

import React, { Fragment, useState } from 'react'
import { Dialog, Menu, Transition } from '@headlessui/react'
import {
  Bars3Icon,
  BellIcon,
  HomeIcon,
  XMarkIcon,
  BookOpenIcon,
  GlobeAltIcon,
  ShareIcon,
  ChartBarIcon,
  Cog6ToothIcon,
  BeakerIcon,
  SwatchIcon,
  MagnifyingGlassIcon,
  UserCircleIcon,
  EnvelopeIcon,
  PhotoIcon,
  CubeIcon,
  WrenchScrewdriverIcon,
  CurrencyDollarIcon,
  ChevronRightIcon,
  Squares2X2Icon,
  RectangleGroupIcon
} from '@heroicons/react/24/outline'
import { Link, useLocation, useParams } from 'react-router-dom'
import { cn } from '../../../lib/utils'
import { ScrollArea } from '../../../components/ui/scroll-area'
import { Button } from '../../../components/ui/button'
import { ThemeSwitcher } from '../../../components/ui/theme-switcher'
import { 
  FiLayout as Layout,
  FiFileText as FormInput,
  FiList as List,
  FiGrid as Grid,
  FiBox as Box,
  FiSettings as Settings,
  FiBell as Bell,
  FiMail as Mail
} from 'react-icons/fi'

interface NavigationItem {
  name: string;
  href?: string;
  icon?: any; // Using any for now since we're importing various icon types
  children?: NavigationItem[];
}

interface NavItemProps {
  item: NavigationItem;
  isNested?: boolean;
}

const navigation: NavigationItem[] = [
  { 
    name: 'Brand',
    icon: SwatchIcon,
    children: [
      { name: 'Identity', href: '/admin/brand/identity' },
      { name: 'Guidelines', href: '/admin/brand/guidelines' }
    ]
  },
  {
    name: 'Website',
    icon: GlobeAltIcon,
    children: [
      { name: 'Pages', href: '/admin/website/pages' },
      { name: 'Styles', href: '/admin/website/styles' }
    ]
  },
  {
    name: 'Email',
    icon: EnvelopeIcon,
    children: [
      { name: 'Newsletter', href: '/admin/email/newsletter' },
      { name: 'Lists', href: '/admin/email/lists' }
    ]
  },
  {
    name: 'Media',
    icon: PhotoIcon,
    children: [
      { name: 'Images', href: '/admin/media/images' },
      { name: 'Video', href: '/admin/media/video' }
    ]
  },
  { name: 'Products', href: '/admin/products', icon: CubeIcon },
  { name: 'Services', href: '/admin/services', icon: WrenchScrewdriverIcon },
  { name: 'Invoicing and Billing', href: '/admin/billing', icon: CurrencyDollarIcon },
  {
    name: 'Components',
    icon: Squares2X2Icon,
    children: [
      { name: 'Form Components', href: '/components/forms' },
      { name: 'List Components', href: '/components/lists' },
      { name: 'Layout Components', href: '/components/layout' },
      { name: 'UI Components', href: '/components/ui' }
    ]
  },
  {
    name: 'Patterns',
    icon: RectangleGroupIcon,
    children: [
      { name: 'Form Patterns', href: '/components/patterns/forms' },
      { name: 'List Patterns', href: '/components/patterns/lists' },
      { name: 'Dashboard Patterns', href: '/components/patterns/dashboard' }
    ]
  },
  { name: 'Settings', href: '/components/settings', icon: Cog6ToothIcon }
]

const userNavigation = [
  { name: 'Your Profile', href: '/profile' },
  { name: 'Settings', href: '/admin/settings' },
  { name: 'Sign out', href: '/logout' },
]

interface BrandSidebarWithHeaderProps {
  children?: React.ReactNode
}

const NavItem = ({ item, isNested = false }: NavItemProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const isActive = item.href ? location.pathname === item.href : false;
  const hasChildren = Boolean(item.children?.length);

  return (
    <li>
      {item.href ? (
        <Link
          to={item.href}
          className={cn(
            isActive
              ? 'bg-gray-50 text-indigo-600'
              : 'text-gray-700 hover:text-indigo-600 hover:bg-gray-50',
            'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold',
            isNested && 'pl-11'
          )}
        >
          {item.icon && (
            <item.icon
              className={cn(
                isActive ? 'text-indigo-600' : 'text-gray-400 group-hover:text-indigo-600',
                'h-6 w-6 shrink-0'
              )}
              aria-hidden="true"
            />
          )}
          {item.name}
        </Link>
      ) : (
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={cn(
            'w-full text-left text-gray-700 hover:text-indigo-600 hover:bg-gray-50',
            'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold items-center justify-between'
          )}
        >
          <div className="flex items-center gap-x-3">
            {item.icon && (
              <item.icon
                className="h-6 w-6 shrink-0 text-gray-400 group-hover:text-indigo-600"
                aria-hidden="true"
              />
            )}
            {item.name}
          </div>
          <ChevronRightIcon
            className={cn(
              'h-5 w-5 shrink-0 text-gray-400 transition-transform',
              isOpen && 'transform rotate-90'
            )}
          />
        </button>
      )}
      {hasChildren && isOpen && item.children && (
        <ul role="list" className="mt-1">
          {item.children.map((child: NavigationItem) => (
            <NavItem key={child.name} item={child} isNested={true} />
          ))}
        </ul>
      )}
    </li>
  );
};

export const BrandSidebarWithHeader: React.FC<BrandSidebarWithHeaderProps> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const location = useLocation()
  const params = useParams()

  return (
    <>
      {/* Mobile sidebar */}
      <Transition.Root show={sidebarOpen} as={Fragment}>
        <Dialog as="div" className="relative z-50 lg:hidden" onClose={setSidebarOpen}>
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-900/80" />
          </Transition.Child>

          <div className="fixed inset-0 flex">
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <Dialog.Panel className="relative mr-16 flex w-full max-w-xs flex-1">
                <Transition.Child
                  as={Fragment}
                  enter="ease-in-out duration-300"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="ease-in-out duration-300"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <div className="absolute left-full top-0 flex w-16 justify-center pt-5">
                    <button type="button" className="-m-2.5 p-2.5" onClick={() => setSidebarOpen(false)}>
                      <span className="sr-only">Close sidebar</span>
                      <XMarkIcon className="h-6 w-6 text-white" aria-hidden="true" />
                    </button>
                  </div>
                </Transition.Child>
                {/* Mobile sidebar content */}
                <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-white px-6 pb-4">
                  {!location.pathname.startsWith('/components') && (
                    <div className="flex h-16 shrink-0 items-center">
                      <img
                        className="h-8 w-auto"
                        src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                        alt="Your Company"
                      />
                    </div>
                  )}
                  <ScrollArea className="flex-1">
                    <nav className="flex flex-1 flex-col">
                      <ul role="list" className="flex flex-1 flex-col gap-y-7">
                        <li>
                          <ul role="list" className="-mx-2 space-y-1">
                            {navigation.map((item) => (
                              <NavItem key={item.name} item={item} />
                            ))}
                          </ul>
                        </li>
                      </ul>
                    </nav>
                  </ScrollArea>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>

      {/* Static sidebar for desktop */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col">
        <div className="flex flex-grow flex-col overflow-y-auto border-r border-border bg-card pt-5 pb-4">
          {/* Header */}
          <div className="flex flex-shrink-0 items-center px-4">
            <div className="flex items-center space-x-2">
              <img
                className="h-8 w-8"
                src="/logo.svg"
                alt="Agency"
              />
              <h1 className="text-xl font-bold">Agency</h1>
            </div>
          </div>

          {/* Navigation */}
          <nav className="mt-5 flex-1 space-y-1 px-2">
            {navigation.map((item) => {
              const isActive = location.pathname === item.href;
              return (
                <Link
                  key={item.name}
                  to={item.href || '/'}
                  className={cn(
                    isActive
                      ? 'bg-primary text-primary-foreground'
                      : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground',
                    'group flex items-center px-2 py-2 text-sm font-medium rounded-md'
                  )}
                >
                  <item.icon
                    className={cn(
                      isActive ? 'text-primary-foreground' : 'text-muted-foreground group-hover:text-accent-foreground',
                      'mr-3 h-6 w-6 flex-shrink-0'
                    )}
                  />
                  {item.name}
                </Link>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Main content */}
      <div className="lg:pl-64 flex flex-col flex-1">
        {/* Header */}
        <div className="sticky top-0 z-10 flex h-16 flex-shrink-0 border-b border-border bg-card">
          <div className="flex flex-1 justify-between px-4">
            <div className="flex flex-1">
              <h2 className="text-lg font-semibold">
                {navigation.find(item => item.href === location.pathname)?.name || 'Dashboard'}
              </h2>
            </div>
            <div className="ml-4 flex items-center md:ml-6">
              <button
                type="button"
                className="rounded-full bg-card p-1 text-muted-foreground hover:text-accent-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
              >
                <span className="sr-only">View notifications</span>
                <BellIcon className="h-6 w-6" />
              </button>
              <button
                type="button"
                className="ml-3 rounded-full bg-card p-1 text-muted-foreground hover:text-accent-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
              >
                <span className="sr-only">View messages</span>
                <EnvelopeIcon className="h-6 w-6" />
              </button>
              <div className="ml-3">
                <ThemeSwitcher />
              </div>
            </div>
          </div>
        </div>

        {/* Page content */}
        <main className="flex-1">
          <div className="py-6">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
              {children}
            </div>
          </div>
        </main>
      </div>
    </>
  )
} 