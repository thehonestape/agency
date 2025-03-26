import { useState } from 'react'
import { Dialog } from '@headlessui/react'
import {
  Bars3Icon,
  CalendarIcon,
  ChartPieIcon,
  DocumentDuplicateIcon,
  FolderIcon,
  HomeIcon,
  UsersIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline'
import {
  Button,
  Card,
  FeatureCard,
  FeatureSection,
  Container,
} from '../component-system'

const navigation = [
  { name: 'Dashboard', href: '#', icon: HomeIcon, current: true },
  { name: 'Team', href: '#', icon: UsersIcon, current: false },
  { name: 'Projects', href: '#', icon: FolderIcon, current: false },
  { name: 'Calendar', href: '#', icon: CalendarIcon, current: false },
  { name: 'Documents', href: '#', icon: DocumentDuplicateIcon, current: false },
  { name: 'Reports', href: '#', icon: ChartPieIcon, current: false },
]

const teams = [
  { id: 1, name: 'Heroicons', href: '#', initial: 'H', current: false },
  { id: 2, name: 'Tailwind Labs', href: '#', initial: 'T', current: false },
  { id: 3, name: 'Workcation', href: '#', initial: 'W', current: false },
]

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

export default function DemoPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <>
      <div>
        <Dialog open={sidebarOpen} onClose={setSidebarOpen} className="relative z-50 lg:hidden">
          <div className="fixed inset-0 bg-gray-900/80" />

          <div className="fixed inset-0 flex">
            <Dialog.Panel className="relative mr-16 flex w-full max-w-xs flex-1">
              <div className="absolute left-full top-0 flex w-16 justify-center pt-5">
                <button type="button" onClick={() => setSidebarOpen(false)} className="-m-2.5 p-2.5">
                  <span className="sr-only">Close sidebar</span>
                  <XMarkIcon className="h-6 w-6 text-white" aria-hidden="true" />
                </button>
              </div>

              {/* Sidebar component for mobile */}
              <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-background px-6 pb-2">
                <div className="flex h-16 shrink-0 items-center">
                  <img
                    className="h-8 w-auto"
                    src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                    alt="Your Company"
                  />
                </div>
                <nav className="flex flex-1 flex-col">
                  <ul role="list" className="flex flex-1 flex-col gap-y-7">
                    <li>
                      <ul role="list" className="-mx-2 space-y-1">
                        {navigation.map((item) => (
                          <li key={item.name}>
                            <a
                              href={item.href}
                              className={classNames(
                                item.current
                                  ? 'bg-secondary text-primary'
                                  : 'text-foreground hover:bg-secondary hover:text-primary',
                                'group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6'
                              )}
                            >
                              <item.icon
                                className={classNames(
                                  item.current ? 'text-primary' : 'text-muted-foreground group-hover:text-primary',
                                  'h-6 w-6 shrink-0'
                                )}
                                aria-hidden="true"
                              />
                              {item.name}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </li>
                    <li>
                      <div className="text-xs font-semibold leading-6 text-muted-foreground">Your teams</div>
                      <ul role="list" className="-mx-2 mt-2 space-y-1">
                        {teams.map((team) => (
                          <li key={team.name}>
                            <a
                              href={team.href}
                              className={classNames(
                                team.current
                                  ? 'bg-secondary text-primary'
                                  : 'text-foreground hover:bg-secondary hover:text-primary',
                                'group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6'
                              )}
                            >
                              <span
                                className={classNames(
                                  team.current
                                    ? 'border-primary text-primary'
                                    : 'border-border text-muted-foreground group-hover:border-primary group-hover:text-primary',
                                  'flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border text-[0.625rem] font-medium bg-background'
                                )}
                              >
                                {team.initial}
                              </span>
                              <span className="truncate">{team.name}</span>
                            </a>
                          </li>
                        ))}
                      </ul>
                    </li>
                    <li className="-mx-6 mt-auto">
                      <a
                        href="#"
                        className="flex items-center gap-x-4 px-6 py-3 text-sm font-semibold leading-6 text-foreground hover:bg-secondary"
                      >
                        <img
                          className="h-8 w-8 rounded-full bg-secondary"
                          src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                          alt=""
                        />
                        <span className="sr-only">Your profile</span>
                        <span aria-hidden="true">Tom Cook</span>
                      </a>
                    </li>
                  </ul>
                </nav>
              </div>
            </Dialog.Panel>
          </div>
        </Dialog>

        {/* Static sidebar for desktop */}
        <div className="lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
          <div className="flex grow flex-col gap-y-5 overflow-y-auto border-r border-border bg-background px-6">
            <div className="flex h-16 shrink-0 items-center">
              <img
                className="h-8 w-auto"
                src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                alt="Your Company"
              />
            </div>
            <nav className="flex flex-1 flex-col">
              <ul role="list" className="flex flex-1 flex-col gap-y-7">
                <li>
                  <ul role="list" className="-mx-2 space-y-1">
                    {navigation.map((item) => (
                      <li key={item.name}>
                        <a
                          href={item.href}
                          className={classNames(
                            item.current
                              ? 'bg-gray-50 text-indigo-600'
                              : 'text-gray-700 hover:bg-gray-50 hover:text-indigo-600',
                            'group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6'
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
                        </a>
                      </li>
                    ))}
                  </ul>
                </li>
                <li>
                  <div className="text-xs font-semibold leading-6 text-gray-400">Your teams</div>
                  <ul role="list" className="-mx-2 mt-2 space-y-1">
                    {teams.map((team) => (
                      <li key={team.name}>
                        <a
                          href={team.href}
                          className={classNames(
                            team.current
                              ? 'bg-gray-50 text-indigo-600'
                              : 'text-gray-700 hover:bg-gray-50 hover:text-indigo-600',
                            'group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6'
                          )}
                        >
                          <span
                            className={classNames(
                              team.current
                                ? 'border-primary text-primary'
                                : 'border-border text-muted-foreground group-hover:border-primary group-hover:text-primary',
                              'flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border text-[0.625rem] font-medium bg-background'
                            )}
                          >
                            {team.initial}
                          </span>
                          <span className="truncate">{team.name}</span>
                        </a>
                      </li>
                    ))}
                  </ul>
                </li>
                <li className="-mx-6 mt-auto">
                  <a
                    href="#"
                    className="flex items-center gap-x-4 px-6 py-3 text-sm font-semibold leading-6 text-gray-900 hover:bg-gray-50"
                  >
                    <img
                      className="h-8 w-8 rounded-full bg-gray-50"
                      src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                      alt=""
                    />
                    <span className="sr-only">Your profile</span>
                    <span aria-hidden="true">Tom Cook</span>
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>

        {/* Mobile header */}
        <div className="sticky top-0 z-40 flex items-center gap-x-6 bg-background border-b border-border px-4 py-4 shadow-sm sm:px-6">
          <button type="button" onClick={() => setSidebarOpen(true)} className="-m-2.5 p-2.5 text-muted-foreground hover:text-foreground lg:hidden">
            <span className="sr-only">Open sidebar</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
          <div className="flex-1 text-sm font-semibold leading-6 text-foreground">Dashboard</div>
          <a href="#" className="relative">
            <span className="sr-only">Your profile</span>
            <img
              className="h-8 w-8 rounded-full ring-1 ring-border bg-secondary"
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
              alt=""
            />
            <span className="absolute -bottom-0.5 -right-0.5 rounded-full bg-success w-2 h-2 ring-1 ring-background" />
          </a>
        </div>

        {/* Main content */}
        <main className="lg:pl-72">
          <div className="px-4 py-10 sm:px-6 lg:px-8 lg:py-6">
            {/* Two Column Layout */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 mb-12">
              <div className="rounded-lg border-2 border-dashed border-border p-4">
                <p className="text-muted-foreground">Column 1</p>
              </div>
              <div className="rounded-lg border-2 border-dashed border-border p-4">
                <p className="text-muted-foreground">Column 2</p>
              </div>
            </div>

            {/* Component Gallery */}
            <div className="space-y-12">
              <div className="text-center">
                <h1 className="text-3xl font-bold">Agency Component Gallery</h1>
                <p className="text-muted-foreground mt-2">Current theme: salient</p>
              </div>

              {/* Application Shells */}
              <section className="space-y-6">
                <h2 className="text-2xl font-semibold">Application Shells</h2>
                <div className="rounded-lg border border-border p-6">
                  <h3 className="text-lg font-medium mb-2">Dark Nav with White Page Header</h3>
                  <p className="text-muted-foreground mb-4">A stacked layout with dark navigation and white page header</p>
                  <div className="rounded-lg border border-border bg-card p-4">
                    {/* Example content */}
                    <div className="h-32 flex items-center justify-center bg-muted">
                      Shell Preview
                    </div>
                  </div>
                </div>
              </section>

              {/* Page Headings */}
              <section className="space-y-6">
                <h2 className="text-2xl font-semibold">Page Headings</h2>
                <div className="rounded-lg border border-border p-6">
                  <h3 className="text-lg font-medium mb-2">Simple With Actions</h3>
                  <p className="text-muted-foreground mb-4">Page heading with action buttons</p>
                  <div className="rounded-lg border border-border bg-card p-4">
                    <div className="flex justify-between items-center">
                      <h3 className="text-xl font-semibold">Projects</h3>
                      <Button>Add Project</Button>
                    </div>
                  </div>
                </div>
              </section>

              {/* Data Display */}
              <section className="space-y-6">
                <h2 className="text-2xl font-semibold">Data Display</h2>
                <div className="rounded-lg border border-border p-6">
                  <h3 className="text-lg font-medium mb-2">Data Grid</h3>
                  <p className="text-muted-foreground mb-4">Display data in a structured grid format</p>
                  <div className="rounded-lg border border-border bg-card p-4">
                    <div className="divide-y divide-border">
                      <div className="py-3 px-4">Row 1</div>
                      <div className="py-3 px-4">Row 2</div>
                      <div className="py-3 px-4">Row 3</div>
                    </div>
                  </div>
                </div>
              </section>

              {/* UI Components */}
              <section className="space-y-6">
                <h2 className="text-2xl font-semibold">UI Components</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="rounded-lg border border-border p-6">
                    <h3 className="text-lg font-medium mb-2">Buttons</h3>
                    <div className="flex flex-wrap gap-4">
                      <Button>Default</Button>
                      <Button variant="secondary">Secondary</Button>
                      <Button variant="outline">Outline</Button>
                    </div>
                  </div>
                  <div className="rounded-lg border border-border p-6">
                    <h3 className="text-lg font-medium mb-2">Cards</h3>
                    <Card className="p-4">
                      <h4 className="font-medium">Card Title</h4>
                      <p className="text-muted-foreground">Card content goes here</p>
                    </Card>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </main>

        {/* Secondary column */}
        <aside className="fixed inset-y-0 right-0 hidden w-96 overflow-y-auto border-l border-border px-4 py-6 sm:px-6 lg:px-8 xl:block">
          <div className="rounded-lg border-2 border-dashed border-border p-4 h-96 flex items-center justify-center">
            <p className="text-muted-foreground">Secondary column</p>
          </div>
        </aside>
      </div>
    </>
  )
} 