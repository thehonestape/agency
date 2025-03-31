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
  LayoutIcon,
  Cog6ToothIcon
} from '@heroicons/react/24/outline'
import { Link, useLocation, useParams } from 'react-router-dom'
import { cn } from '../../../lib/utils'
import { ScrollArea } from '../../../components/ui/scroll-area'
import { Button } from '../../../components/ui/button'
import { ThemeSwitcher } from '../../../components/ui/theme-switcher'

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
    icon: LayoutIcon,
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

export function BrandSidebarWithHeader({ children }: BrandSidebarWithHeaderProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const location = useLocation()
  const { brandId = 'workhorse' } = useParams()

  // Update navigation hrefs with current brandId
  const currentNavigation = navigation.map(item => {
    // Skip items without href
    if (!item.href) {
      return item;
    }
    return {
      ...item,
      href: item.href.replace('workhorse', brandId),
      current: location.pathname === item.href.replace('workhorse', brandId)
    };
  });

  return (
    <div className="relative h-screen bg-white">
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
                  <div className="flex h-16 shrink-0 items-center">
                    <img
                      className="h-8 w-auto"
                      src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                      alt="Your Company"
                    />
                  </div>
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

      {/* Desktop sidebar */}
      <aside className="invisible lg:visible fixed inset-y-0 left-0 z-50 w-72 bg-white border-r border-gray-200">
        <div className="flex h-full flex-col">
          <div className="flex h-16 shrink-0 items-center px-6">
            <img
              className="h-8 w-auto"
              src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
              alt="Your Company"
            />
          </div>
          <nav className="flex-1 overflow-y-auto px-6 pb-4">
            <ul role="list" className="flex flex-1 flex-col gap-y-7">
              <li>
                <ul role="list" className="-mx-2 space-y-1">
                  {navigation.map((item) => (
                    <NavItem key={item.name} item={item} />
                  ))}
                </ul>
              </li>
              <li className="mt-auto">
                <Link
                  to="/admin/settings"
                  className="group -mx-2 flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-gray-700 hover:bg-gray-50 hover:text-indigo-600"
                >
                  <Cog6ToothIcon
                    className="h-6 w-6 shrink-0 text-gray-400 group-hover:text-indigo-600"
                    aria-hidden="true"
                  />
                  Settings
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </aside>

      {/* Main content */}
      <div className="lg:pl-72 flex flex-col min-h-screen">
        {/* Top header */}
        <header className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 bg-white px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
          <Button
            variant="ghost"
            size="icon"
            className="-m-2.5 p-2.5 text-gray-700 lg:hidden"
            onClick={() => setSidebarOpen(true)}
          >
            <span className="sr-only">Open sidebar</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </Button>

          {/* Separator */}
          <div className="h-6 w-px bg-gray-200 lg:hidden" aria-hidden="true" />

          <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
            <form className="relative flex flex-1" action="#" method="GET">
              <label htmlFor="search-field" className="sr-only">
                Search
              </label>
              <MagnifyingGlassIcon
                className="pointer-events-none absolute inset-y-0 left-0 h-full w-5 text-gray-400"
                aria-hidden="true"
              />
              <input
                id="search-field"
                className="block h-full w-full border-0 py-0 pl-8 pr-0 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm"
                placeholder="Search..."
                type="search"
                name="search"
              />
            </form>
            <div className="flex items-center gap-x-4 lg:gap-x-6">
              <Button
                variant="ghost"
                size="icon"
                className="-m-2.5 p-2.5 text-gray-400 hover:text-gray-500"
              >
                <span className="sr-only">View notifications</span>
                <BellIcon className="h-6 w-6" aria-hidden="true" />
              </Button>

              <ThemeSwitcher />

              {/* Separator */}
              <div className="hidden lg:block lg:h-6 lg:w-px lg:bg-gray-200" aria-hidden="true" />

              {/* Profile dropdown */}
              <Menu as="div" className="relative">
                <Menu.Button className="-m-1.5 flex items-center p-1.5">
                  <span className="sr-only">Open user menu</span>
                  <UserCircleIcon className="h-8 w-8 text-gray-400" aria-hidden="true" />
                  <span className="hidden lg:flex lg:items-center">
                    <span className="ml-4 text-sm font-semibold leading-6 text-gray-900" aria-hidden="true">
                      Admin User
                    </span>
                  </span>
                </Menu.Button>
                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="absolute right-0 z-10 mt-2.5 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none">
                    {userNavigation.map((item) => (
                      <Menu.Item key={item.name}>
                        {({ active }) => (
                          <Link
                            to={item.href}
                            className={cn(
                              active ? 'bg-gray-50' : '',
                              'block px-3 py-1 text-sm leading-6 text-gray-900'
                            )}
                          >
                            {item.name}
                          </Link>
                        )}
                      </Menu.Item>
                    ))}
                  </Menu.Items>
                </Transition>
              </Menu>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1">
          {children}
        </main>
      </div>
    </div>
  )
} 