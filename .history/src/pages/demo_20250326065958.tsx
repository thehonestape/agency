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
  ChevronLeft,
  ArrowRight,
} from '@heroicons/react/24/outline'
import {
  Button,
  Card,
  FeatureCard,
  FeatureSection,
  Container,
  AppShell,
} from '../component-system'

const navigation = [
  { name: 'Overview', href: '#overview', current: true },
]

const components = [
  { name: 'Core Components', href: '#core-components', current: false },
  { name: 'Pattern Components', href: '#pattern-components', current: false },
  { name: 'Block Components', href: '#block-components', current: false },
  { name: 'Theme System', href: '#theme-system', current: false },
]

const teams = [
  { id: 1, name: 'Salient', href: '#', initial: 'S', current: true },
  { id: 2, name: 'Protocol', href: '#', initial: 'P', current: false },
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
              <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-primary px-6 pb-2">
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
                                  ? 'bg-primary-foreground/10 text-primary-foreground'
                                  : 'text-primary-foreground/80 hover:bg-primary-foreground/10 hover:text-primary-foreground',
                                'group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6'
                              )}
                            >
                              <item.icon
                                className={classNames(
                                  item.current ? 'text-primary-foreground' : 'text-primary-foreground/80 group-hover:text-primary-foreground',
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
                      <div className="text-xs font-semibold leading-6 text-primary-foreground/80 mb-2">Components</div>
                      <ul role="list" className="-mx-2 space-y-1">
                        {components.map((item) => (
                          <li key={item.name}>
                            <a
                              href={item.href}
                              className={classNames(
                                item.current
                                  ? 'bg-primary-foreground/10 text-primary-foreground'
                                  : 'text-primary-foreground/80 hover:bg-primary-foreground/10 hover:text-primary-foreground',
                                'group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6'
                              )}
                            >
                              {item.name}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </li>
                    <li className="mt-auto">
                      <div className="text-xs font-semibold leading-6 text-primary-foreground/80 mb-2">Your teams</div>
                      <ul role="list" className="-mx-2 space-y-1">
                        {teams.map((team) => (
                          <li key={team.name}>
                            <a
                              href={team.href}
                              className={classNames(
                                team.current
                                  ? 'bg-primary-foreground/10 text-primary-foreground'
                                  : 'text-primary-foreground/80 hover:bg-primary-foreground/10 hover:text-primary-foreground',
                                'group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6'
                              )}
                            >
                              <span
                                className={classNames(
                                  team.current
                                    ? 'border-primary-foreground text-primary-foreground'
                                    : 'border-primary-foreground/20 text-primary-foreground/80 group-hover:border-primary-foreground/60 group-hover:text-primary-foreground',
                                  'flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border text-[0.625rem] font-medium bg-primary-foreground/10'
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
            </Dialog.Panel>
          </div>
        </Dialog>

        {/* Static sidebar for desktop */}
        <div className="lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
          <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-primary px-6">
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
                              ? 'bg-primary-foreground/10 text-primary-foreground'
                              : 'text-primary-foreground/80 hover:bg-primary-foreground/10 hover:text-primary-foreground',
                            'group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6'
                          )}
                        >
                          <item.icon
                            className={classNames(
                              item.current ? 'text-primary-foreground' : 'text-primary-foreground/80 group-hover:text-primary-foreground',
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
                  <div className="text-xs font-semibold leading-6 text-primary-foreground/80 mb-2">Components</div>
                  <ul role="list" className="-mx-2 space-y-1">
                    {components.map((item) => (
                      <li key={item.name}>
                        <a
                          href={item.href}
                          className={classNames(
                            item.current
                              ? 'bg-primary-foreground/10 text-primary-foreground'
                              : 'text-primary-foreground/80 hover:bg-primary-foreground/10 hover:text-primary-foreground',
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
                  <div className="text-xs font-semibold leading-6 text-primary-foreground/80 mb-2">Your teams</div>
                  <ul role="list" className="-mx-2 space-y-1">
                    {teams.map((team) => (
                      <li key={team.name}>
                        <a
                          href={team.href}
                          className={classNames(
                            team.current
                              ? 'bg-primary-foreground/10 text-primary-foreground'
                              : 'text-primary-foreground/80 hover:bg-primary-foreground/10 hover:text-primary-foreground',
                            'group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6'
                          )}
                        >
                          <span
                            className={classNames(
                              team.current
                                ? 'border-primary-foreground text-primary-foreground'
                                : 'border-primary-foreground/20 text-primary-foreground/80 group-hover:border-primary-foreground/60 group-hover:text-primary-foreground',
                              'flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border text-[0.625rem] font-medium bg-primary-foreground/10'
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
        <div className="sticky top-0 z-40 flex items-center gap-x-6 bg-primary px-4 py-4 shadow-sm sm:px-6">
          <button type="button" onClick={() => setSidebarOpen(true)} className="-m-2.5 p-2.5 text-primary-foreground hover:text-primary-foreground/90 lg:hidden">
            <span className="sr-only">Open sidebar</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
          <div className="flex-1 text-sm font-semibold leading-6 text-primary-foreground">Components</div>
          <a href="#" className="relative">
            <span className="sr-only">Your profile</span>
            <img
              className="h-8 w-8 rounded-full ring-1 ring-border bg-muted"
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
              alt=""
            />
            <span className="absolute -bottom-0.5 -right-0.5 rounded-full bg-success w-2 h-2 ring-1 ring-background" />
          </a>
        </div>

        {/* Main content */}
        <main className="lg:pl-72">
          <div className="px-4 py-10 sm:px-6 lg:px-8 lg:py-6">
            {/* Overview Section */}
            <div className="mb-12">
              <h1 className="text-4xl font-bold tracking-tight text-foreground mb-4">Component System</h1>
              <p className="text-xl text-muted-foreground">A comprehensive set of reusable UI components built with React and Tailwind CSS.</p>
            </div>

            {/* Core Components */}
            <section id="core-components" className="mb-12">
              <h2 className="text-2xl font-semibold mb-6">Core Components</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="rounded-lg border border-border bg-card p-6">
                  <h3 className="text-lg font-medium mb-4">Buttons</h3>
                  <div className="flex flex-wrap gap-4">
                    <Button>Default</Button>
                    <Button variant="secondary">Secondary</Button>
                    <Button variant="outline">Outline</Button>
                    <Button variant="ghost">Ghost</Button>
                  </div>
                </div>
                <div className="rounded-lg border border-border bg-card p-6">
                  <h3 className="text-lg font-medium mb-4">Layout</h3>
                  <Container className="bg-muted p-4 rounded-lg">
                    <p className="text-muted-foreground">Container Component</p>
                  </Container>
                </div>
              </div>
            </section>

            {/* Pattern Components */}
            <section id="pattern-components" className="mb-12">
              <h2 className="text-2xl font-semibold mb-6">Pattern Components</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="p-6">
                  <h3 className="text-lg font-medium mb-2">Basic Card</h3>
                  <p className="text-muted-foreground">A versatile card component for content organization.</p>
                </Card>
                <Card className="p-6">
                  <h3 className="text-lg font-medium mb-2">Interactive Card</h3>
                  <p className="text-muted-foreground mb-4">A card with interactive elements.</p>
                  <Button variant="outline" size="sm">Learn More</Button>
                </Card>
              </div>
            </section>

            {/* Block Components */}
            <section id="block-components" className="mb-12">
              <h2 className="text-2xl font-semibold mb-6">Block Components</h2>
              <FeatureSection
                title="Feature Section"
                description="Showcase your product features with this customizable section."
                features={[
                  {
                    title: "Customizable",
                    description: "Easily customize the appearance and content of each feature.",
                    icon: <ArrowRight className="h-6 w-6" />
                  },
                  {
                    title: "Responsive",
                    description: "Looks great on all screen sizes and devices.",
                    icon: <ChevronLeft className="h-6 w-6" />
                  }
                ]}
              />
            </section>

            {/* Theme System */}
            <section id="theme-system" className="mb-12">
              <h2 className="text-2xl font-semibold mb-6">Theme System</h2>
              <div className="rounded-lg border border-border bg-card p-6">
                <h3 className="text-lg font-medium mb-4">Current Theme: Salient</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="flex flex-col gap-2">
                    <div className="h-12 w-full rounded-md bg-primary"></div>
                    <span className="text-sm text-muted-foreground">Primary</span>
                  </div>
                  <div className="flex flex-col gap-2">
                    <div className="h-12 w-full rounded-md bg-secondary"></div>
                    <span className="text-sm text-muted-foreground">Secondary</span>
                  </div>
                  <div className="flex flex-col gap-2">
                    <div className="h-12 w-full rounded-md bg-card"></div>
                    <span className="text-sm text-muted-foreground">Card</span>
                  </div>
                  <div className="flex flex-col gap-2">
                    <div className="h-12 w-full rounded-md bg-muted"></div>
                    <span className="text-sm text-muted-foreground">Muted</span>
                  </div>
                </div>
              </div>
            </section>
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