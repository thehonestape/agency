import React, { useState } from 'react';
import {
  Bars3Icon,
  XMarkIcon,
  HomeIcon,
  UsersIcon,
  FolderIcon,
  CalendarIcon,
  DocumentDuplicateIcon,
  ChartPieIcon,
  Cog6ToothIcon,
  SwatchIcon
} from '@heroicons/react/24/outline';
import { TypographySystem } from '@/components/examples/TypographySystem';
import { FormControlsExample } from '@/components/examples/FormControlsExample';
import { TableExample } from '@/components/examples/TableExample';
import { DataDisplayExample } from '@/components/examples/DataDisplayExample';
import { ThemeEditor } from '@/components/examples/ThemeEditor';

// Navigation items
const navigation = [
  { name: 'Typography', id: 'typography', icon: HomeIcon, current: true },
  { name: 'Form Controls', id: 'forms', icon: DocumentDuplicateIcon, current: false },
  { name: 'Tables', id: 'tables', icon: TableIcon, current: false },
  { name: 'Data Visualization', id: 'data', icon: ChartPieIcon, current: false },
  { name: 'Theme Editor', id: 'theme', icon: SwatchIcon, current: false },
];

// Teams
const categories = [
  { id: 1, name: 'Basic Components', href: '#', initial: 'B', current: false },
  { id: 2, name: 'Advanced UI', href: '#', initial: 'A', current: false },
  { id: 3, name: 'Layouts', href: '#', initial: 'L', current: false },
];

// Helper function for class name conditionals
function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

// TableIcon component since it's not in heroicons/24/outline
const TableIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.375 19.5h17.25m-17.25 0a1.125 1.125 0 01-1.125-1.125M3.375 19.5h7.5c.621 0 1.125-.504 1.125-1.125m-9.75 0V5.625m0 12.75v-1.5c0-.621.504-1.125 1.125-1.125m18.375 2.625V5.625m0 12.75c0 .621-.504 1.125-1.125 1.125m1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125m0 3.75h-7.5A1.125 1.125 0 0112 18.375m9.75-12.75c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125m19.5 0v1.5c0 .621-.504 1.125-1.125 1.125M2.25 5.625v1.5c0 .621.504 1.125 1.125 1.125m0 0h17.25m-17.25 0h7.5c.621 0 1.125.504 1.125 1.125M3.375 8.25c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125m1.125-3.75h7.5c.621 0 1.125.504 1.125 1.125m-9.75 0h9.75m0 0c.621 0 1.125.504 1.125 1.125m-1.125 0H3.375m0 0c-.621 0-1.125.504-1.125 1.125M12 12.75h8.25m0 0c.621 0 1.125.504 1.125 1.125M20.25 12.75H3.375c-.621 0-1.125.504-1.125 1.125m18 0v7.5c0 .621-.504 1.125-1.125 1.125H3.375c-.621 0-1.125-.504-1.125-1.125v-7.5" />
  </svg>
);

export function TwoColumnShowcase() {
  const [activeSection, setActiveSection] = useState('typography');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Update navigation current state when active section changes
  const updatedNavigation = navigation.map(item => ({
    ...item,
    current: item.id === activeSection
  }));

  // Render the appropriate component based on the active section
  const renderComponent = () => {
    switch (activeSection) {
      case 'typography':
        return <TypographySystem />;
      case 'forms':
        return <FormControlsExample />;
      case 'tables':
        return <TableExample />;
      case 'data':
        return <DataDisplayExample />;
      case 'theme':
        return <ThemeEditor />;
      default:
        return <TypographySystem />;
    }
  };

  return (
    <div className="h-screen bg-white">
      {/* Mobile sidebar */}
      <div className={`fixed inset-0 z-50 lg:hidden ${sidebarOpen ? 'block' : 'hidden'}`}>
        <div className="fixed inset-0 bg-gray-900/80" onClick={() => setSidebarOpen(false)} />

        <div className="fixed inset-0 flex">
          <div className="relative mr-16 flex w-full max-w-xs flex-1 transform transition duration-300 ease-in-out bg-white">
            <div className="absolute top-0 left-full flex w-16 justify-center pt-5">
              <button type="button" onClick={() => setSidebarOpen(false)} className="-m-2.5 p-2.5">
                <span className="sr-only">Close sidebar</span>
                <XMarkIcon className="h-6 w-6 text-white" aria-hidden="true" />
              </button>
            </div>
            
            {/* Sidebar content for mobile */}
            <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-white px-6 pb-2">
              <div className="flex h-16 shrink-0 items-center">
                <img
                  src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                  alt="Your Company"
                  className="h-8 w-auto"
                />
              </div>
              <nav className="flex flex-1 flex-col">
                <ul role="list" className="flex flex-1 flex-col gap-y-7">
                  <li>
                    <ul role="list" className="-mx-2 space-y-1">
                      {updatedNavigation.map((item) => (
                        <li key={item.name}>
                          <button
                            onClick={() => setActiveSection(item.id)}
                            className={classNames(
                              item.current
                                ? 'bg-gray-50 text-indigo-600'
                                : 'text-gray-700 hover:bg-gray-50 hover:text-indigo-600',
                              'group flex w-full gap-x-3 rounded-md p-2 text-sm font-semibold'
                            )}
                          >
                            <item.icon
                              className={classNames(
                                item.current ? 'text-indigo-600' : 'text-gray-400 group-hover:text-indigo-600',
                                'h-6 w-6 shrink-0'
                              )}
                              aria-hidden="true"
                            />
                            {item.name}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </li>
                  <li>
                    <div className="text-xs font-semibold text-gray-400">Categories</div>
                    <ul role="list" className="-mx-2 mt-2 space-y-1">
                      {categories.map((category) => (
                        <li key={category.name}>
                          <a
                            href={category.href}
                            className={classNames(
                              category.current
                                ? 'bg-gray-50 text-indigo-600'
                                : 'text-gray-700 hover:bg-gray-50 hover:text-indigo-600',
                              'group flex gap-x-3 rounded-md p-2 text-sm font-semibold'
                            )}
                          >
                            <span
                              className={classNames(
                                category.current
                                  ? 'border-indigo-600 text-indigo-600'
                                  : 'border-gray-200 text-gray-400 group-hover:border-indigo-600 group-hover:text-indigo-600',
                                'flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border bg-white text-[0.625rem] font-medium'
                              )}
                            >
                              {category.initial}
                            </span>
                            <span className="truncate">{category.name}</span>
                          </a>
                        </li>
                      ))}
                    </ul>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </div>

      {/* Static sidebar for desktop */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
        <div className="flex grow flex-col gap-y-5 overflow-y-auto border-r border-gray-200 bg-white px-6">
          <div className="flex h-16 shrink-0 items-center">
            <img
              src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
              alt="Your Company"
              className="h-8 w-auto"
            />
          </div>
          <nav className="flex flex-1 flex-col">
            <ul role="list" className="flex flex-1 flex-col gap-y-7">
              <li>
                <ul role="list" className="-mx-2 space-y-1">
                  {updatedNavigation.map((item) => (
                    <li key={item.name}>
                      <button
                        onClick={() => setActiveSection(item.id)}
                        className={classNames(
                          item.current
                            ? 'bg-gray-50 text-indigo-600'
                            : 'text-gray-700 hover:bg-gray-50 hover:text-indigo-600',
                          'group flex w-full gap-x-3 rounded-md p-2 text-sm font-semibold'
                        )}
                      >
                        <item.icon
                          className={classNames(
                            item.current ? 'text-indigo-600' : 'text-gray-400 group-hover:text-indigo-600',
                            'h-6 w-6 shrink-0'
                          )}
                          aria-hidden="true"
                        />
                        {item.name}
                      </button>
                    </li>
                  ))}
                </ul>
              </li>
              <li>
                <div className="text-xs font-semibold text-gray-400">Categories</div>
                <ul role="list" className="-mx-2 mt-2 space-y-1">
                  {categories.map((category) => (
                    <li key={category.name}>
                      <a
                        href={category.href}
                        className={classNames(
                          category.current
                            ? 'bg-gray-50 text-indigo-600'
                            : 'text-gray-700 hover:bg-gray-50 hover:text-indigo-600',
                          'group flex gap-x-3 rounded-md p-2 text-sm font-semibold'
                        )}
                      >
                        <span
                          className={classNames(
                            category.current
                              ? 'border-indigo-600 text-indigo-600'
                              : 'border-gray-200 text-gray-400 group-hover:border-indigo-600 group-hover:text-indigo-600',
                            'flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border bg-white text-[0.625rem] font-medium'
                          )}
                        >
                          {category.initial}
                        </span>
                        <span className="truncate">{category.name}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </li>
              <li className="-mx-6 mt-auto">
                <a
                  href="#"
                  className="flex items-center gap-x-4 px-6 py-3 text-sm font-semibold text-gray-900 hover:bg-gray-50"
                >
                  <img
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                    alt=""
                    className="h-8 w-8 rounded-full bg-gray-50"
                  />
                  <span className="sr-only">Your profile</span>
                  <span aria-hidden="true">John Doe</span>
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>

      {/* Mobile top bar */}
      <div className="sticky top-0 z-40 flex items-center gap-x-6 bg-white px-4 py-4 shadow-xs sm:px-6 lg:hidden">
        <button 
          type="button" 
          onClick={() => setSidebarOpen(true)} 
          className="-m-2.5 p-2.5 text-gray-700 lg:hidden"
        >
          <span className="sr-only">Open sidebar</span>
          <Bars3Icon className="h-6 w-6" aria-hidden="true" />
        </button>
        <div className="flex-1 text-sm font-semibold text-gray-900">
          {updatedNavigation.find(item => item.current)?.name || 'Component Showcase'}
        </div>
        <a href="#">
          <span className="sr-only">Your profile</span>
          <img
            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
            alt=""
            className="h-8 w-8 rounded-full bg-gray-50"
          />
        </a>
      </div>

      {/* Main content area */}
      <main className="lg:pl-72">
        <div className="xl:pr-96">
          <div className="px-4 py-10 sm:px-6 lg:px-8 lg:py-6">
            {/* Main component content */}
            {renderComponent()}
          </div>
        </div>
      </main>

      {/* Right sidebar */}
      <aside className="fixed inset-y-0 right-0 hidden w-96 overflow-y-auto border-l border-gray-200 px-4 py-6 sm:px-6 lg:px-8 xl:block">
        {/* Component metadata and details */}
        <div className="space-y-6">
          <div>
            <h2 className="text-lg font-medium text-gray-900">Component Details</h2>
            <p className="mt-1 text-sm text-gray-500">
              Information about the currently selected component.
            </p>
          </div>

          <div className="border-t border-gray-200 pt-5">
            <dl className="divide-y divide-gray-200">
              <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4">
                <dt className="text-sm font-medium text-gray-500">Component</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                  {updatedNavigation.find(item => item.current)?.name}
                </dd>
              </div>
              <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4">
                <dt className="text-sm font-medium text-gray-500">Type</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                  {activeSection === 'typography' && 'Text Display'}
                  {activeSection === 'forms' && 'User Input'}
                  {activeSection === 'tables' && 'Data Display'}
                  {activeSection === 'data' && 'Visualization'}
                  {activeSection === 'theme' && 'Customization'}
                </dd>
              </div>
              <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4">
                <dt className="text-sm font-medium text-gray-500">Usage</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                  {activeSection === 'typography' && 'For displaying text content with proper hierarchy and styling.'}
                  {activeSection === 'forms' && 'For collecting user input in a structured manner.'}
                  {activeSection === 'tables' && 'For displaying structured data in rows and columns.'}
                  {activeSection === 'data' && 'For visually representing data trends and patterns.'}
                  {activeSection === 'theme' && 'For customizing the visual appearance of the application.'}
                </dd>
              </div>
              <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4">
                <dt className="text-sm font-medium text-gray-500">Status</dt>
                <dd className="mt-1 text-sm sm:col-span-2 sm:mt-0">
                  <span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                    Active
                  </span>
                </dd>
              </div>
            </dl>
          </div>

          <div className="border-t border-gray-200 pt-5">
            <h3 className="text-sm font-medium text-gray-500">Notes</h3>
            <div className="mt-3 rounded-md border border-gray-300 bg-gray-50 p-4">
              <p className="text-sm text-gray-700">
                {activeSection === 'typography' && 'Typography components follow a consistent scale for better readability and hierarchy.'}
                {activeSection === 'forms' && 'Form controls are built with accessibility in mind, supporting keyboard navigation and screen readers.'}
                {activeSection === 'tables' && 'Tables support sorting, pagination, and responsive behavior for mobile devices.'}
                {activeSection === 'data' && 'Data visualization components are built with D3.js and React for interactive, responsive displays.'}
                {activeSection === 'theme' && 'Theme editor supports live preview and exports CSS variables for easy integration.'}
              </p>
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
}

export default TwoColumnShowcase; 