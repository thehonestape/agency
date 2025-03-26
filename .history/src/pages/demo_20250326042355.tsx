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
  { name: 'Reports', href: '#', icon: ChartPieIcon, current: false },
]

const components = [
  { name: 'Application Shells', href: '#application-shells', current: false },
  { name: 'Page Headings', href: '#page-headings', current: false },
  { name: 'Data Display', href: '#data-display', current: false },
  { name: 'UI Components', href: '#ui-components', current: false },
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
          <div className="fixed inset-0 bg-primary/10" />

          <div className="fixed inset-0 flex">
            <Dialog.Panel className="relative mr-16 flex w-full max-w-xs flex-1">
              <div className="absolute left-full top-0 flex w-16 justify-center pt-5">
                <button type="button" onClick={() => setSidebarOpen(false)} className="-m-2.5 p-2.5">
                  <span className="sr-only">Close sidebar</span>
                  <XMarkIcon className="h-6 w-6 text-foreground" aria-hidden="true" />
                </button>
              </div>

              {/* Sidebar component for mobile */}
              <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-card px-6 pb-2 border-r border-border">
                <div className="flex h-16 shrink-0 items-center">
                  <img
                    className="h-8 w-auto"
                    src="/workhorse.png"
                    alt="Workhorse"
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
                                  'flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border text-[0.625rem] font-medium bg-muted'
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
          <div className="flex grow flex-col gap-y-5 overflow-y-auto border-r border-border bg-card px-6">
            <div className="flex h-16 shrink-0 items-center">
              <img
                className="h-8 w-auto"
                src="/workhorse.png"
                alt="Workhorse"
              />
            </div>
            <nav className="flex flex-1 flex-col">
              <ul role="list" className="flex flex-1 flex-col gap-y-7">
                {/* Reports Section */}
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

                {/* Components Section */}
                <li>
                  <div className="text-xs font-semibold leading-6 text-muted-foreground mb-2">Components</div>
                  <ul role="list" className="-mx-2 space-y-1">
                    {components.map((item) => (
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
                          {item.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </li>

                {/* Teams Section - Moved to bottom */}
                <li className="mt-auto">
                  <div className="text-xs font-semibold leading-6 text-muted-foreground mb-2">Your teams</div>
                  <ul role="list" className="-mx-2 space-y-1">
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
                              'flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border text-[0.625rem] font-medium bg-muted'
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
              </ul>
            </nav>
          </div>
        </div>

        {/* Mobile header */}
        <div className="sticky top-0 z-40 flex items-center gap-x-6 bg-card border-b border-border px-4 py-4 shadow-sm sm:px-6">
          <button type="button" onClick={() => setSidebarOpen(true)} className="-m-2.5 p-2.5 text-muted-foreground hover:text-foreground lg:hidden">
            <span className="sr-only">Open sidebar</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
          <div className="flex-1 text-sm font-semibold leading-6 text-foreground">Components</div>
          <a href="#" className="relative">
            <span className="sr-only">Your profile</span>
            <img
              className="h-8 w-8 rounded-full ring-1 ring-border bg-muted"
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
              alt=""
            />
            <span className="absolute -bottom-0.5 -right-0.5 rounded-full bg-primary w-2 h-2 ring-1 ring-background" />
          </a>
        </div>

        {/* Main content */}
        <main className="lg:pl-72">
          <div className="px-4 py-10 sm:px-6 lg:px-8 lg:py-6">
            {/* Two Column Layout */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 mb-12">
              <div className="rounded-lg border border-border bg-card p-4">
                <p className="text-muted-foreground">Column 1</p>
              </div>
              <div className="rounded-lg border border-border bg-card p-4">
                <p className="text-muted-foreground">Column 2</p>
              </div>
            </div>

            {/* Component Gallery */}
            <div className="space-y-12">
              <div className="text-center">
                <h1 className="text-4xl font-bold tracking-tight text-foreground">Agency Component Gallery</h1>
                <p className="text-muted-foreground mt-2">Current theme: salient</p>
              </div>

              {/* Table of Contents */}
              <nav className="rounded-lg border border-border bg-card p-6">
                <h2 className="text-lg font-semibold mb-4 text-foreground">Table of Contents</h2>
                <ul className="space-y-2">
                  <li>
                    <a href="#application-shells" className="text-primary hover:text-primary/80">Application Shells</a>
                  </li>
                  <li>
                    <a href="#page-headings" className="text-primary hover:text-primary/80">Page Headings</a>
                  </li>
                  <li>
                    <a href="#data-display" className="text-primary hover:text-primary/80">Data Display</a>
                  </li>
                  <li>
                    <a href="#ui-components" className="text-primary hover:text-primary/80">UI Components</a>
                  </li>
                </ul>
              </nav>

              {/* Application Shells */}
              <section id="application-shells" className="space-y-6">
                <h2 className="text-2xl font-semibold tracking-tight text-foreground">Application Shells</h2>
                <div className="rounded-lg border border-border bg-card p-6">
                  <h3 className="text-lg font-medium mb-2 text-foreground">Dark Nav with White Page Header</h3>
                  <p className="text-muted-foreground mb-4">A stacked layout with dark navigation and white page header</p>
                  <div className="rounded-lg border border-border bg-muted p-4">
                    <div className="h-32 flex items-center justify-center bg-card text-muted-foreground">
                      Shell Preview
                    </div>
                  </div>
                </div>
              </section>

              {/* Page Headings */}
              <section id="page-headings" className="space-y-6">
                <h2 className="text-2xl font-semibold tracking-tight text-foreground">Page Headings</h2>
                <div className="rounded-lg border border-border bg-card p-6">
                  <h3 className="text-lg font-medium mb-2 text-foreground">Simple With Actions</h3>
                  <p className="text-muted-foreground mb-4">Page heading with action buttons</p>
                  <div className="rounded-lg border border-border bg-background/50 p-4">
                    <div className="flex justify-between items-center">
                      <h3 className="text-xl font-semibold text-foreground">Projects</h3>
                      <Button>Add Project</Button>
                    </div>
                  </div>
                </div>
              </section>

              {/* Data Display */}
              <section id="data-display" className="space-y-6">
                <h2 className="text-2xl font-semibold tracking-tight text-foreground">Data Display</h2>
                <div className="rounded-lg border border-border bg-card p-6">
                  <h3 className="text-lg font-medium mb-2 text-foreground">Data Grid</h3>
                  <p className="text-muted-foreground mb-4">Display data in a structured grid format</p>
                  <div className="rounded-lg border border-border bg-background/50 p-4">
                    <div className="divide-y divide-border">
                      <div className="py-3 px-4 text-foreground">Row 1</div>
                      <div className="py-3 px-4 text-foreground">Row 2</div>
                      <div className="py-3 px-4 text-foreground">Row 3</div>
                    </div>
                  </div>
                </div>
              </section>

              {/* UI Components */}
              <section id="ui-components" className="space-y-6">
                <h2 className="text-2xl font-semibold tracking-tight text-foreground">UI Components</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="rounded-lg border border-border bg-card p-6">
                    <h3 className="text-lg font-medium mb-4 text-foreground">Buttons</h3>
                    <div className="flex flex-wrap gap-4">
                      <Button>Default</Button>
                      <Button variant="secondary">Secondary</Button>
                      <Button variant="outline">Outline</Button>
                    </div>
                  </div>
                  <div className="rounded-lg border border-border bg-card p-6">
                    <h3 className="text-lg font-medium mb-4 text-foreground">Cards</h3>
                    <Card className="p-4 bg-background/50">
                      <h4 className="font-medium text-foreground">Card Title</h4>
                      <p className="text-muted-foreground mt-2">Card content goes here</p>
                    </Card>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </main>

        {/* Secondary column */}
        <aside className="fixed inset-y-0 right-0 hidden w-96 overflow-y-auto border-l border-border px-4 py-6 sm:px-6 lg:px-8 xl:block">
          <div className="rounded-lg border border-border bg-card p-4 h-96 flex items-center justify-center">
            <p className="text-muted-foreground">Secondary column</p>
          </div>
        </aside>
      </div>
    </>
  )
} 