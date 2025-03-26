import { useState } from 'react'
import { Sidebar } from '../components/layout/Sidebar'
import { Header } from '../components/layout/Header'

const navigation = [
  { name: 'Introduction', href: '#introduction', current: true },
  { name: 'Getting Started', href: '#getting-started', current: false },
  { name: 'Installation', href: '#installation', current: false },
]

const foundationNav = [
  { name: 'Colors', href: '#colors', current: false },
  { name: 'Typography', href: '#typography', current: false },
  { name: 'Spacing', href: '#spacing', current: false },
  { name: 'Shadows', href: '#shadows', current: false },
  { name: 'Border Radius', href: '#border-radius', current: false },
  { name: 'Z-Index', href: '#z-index', current: false },
]

const componentNav = [
  // Form Controls
  { name: 'Button', href: '#button', current: false },
  { name: 'Input', href: '#input', current: false },
  { name: 'Select', href: '#select', current: false },
  { name: 'Checkbox', href: '#checkbox', current: false },
  { name: 'Radio', href: '#radio', current: false },
  { name: 'Switch', href: '#switch', current: false },
  
  // Data Display
  { name: 'Table', href: '#table', current: false },
  { name: 'Card', href: '#card', current: false },
  { name: 'List', href: '#list', current: false },
  { name: 'Badge', href: '#badge', current: false },
  
  // Navigation
  { name: 'Menu', href: '#menu', current: false },
  { name: 'Tabs', href: '#tabs', current: false },
  { name: 'Breadcrumb', href: '#breadcrumb', current: false },
  { name: 'Pagination', href: '#pagination', current: false },
  
  // Feedback
  { name: 'Alert', href: '#alert', current: false },
  { name: 'Toast', href: '#toast', current: false },
  { name: 'Progress', href: '#progress', current: false },
  { name: 'Spinner', href: '#spinner', current: false },
]

const patternNav = [
  { name: 'Page Layouts', href: '#page-layouts', current: false },
  { name: 'Forms', href: '#forms', current: false },
  { name: 'Lists', href: '#lists', current: false },
  { name: 'Cards', href: '#cards', current: false },
  { name: 'Navigation', href: '#navigation', current: false },
]

const sections = [
  { name: 'Foundation', href: '#foundation', items: foundationNav },
  { name: 'Components', href: '#components', items: componentNav },
  { name: 'Patterns', href: '#patterns', items: patternNav },
]

const teams = [
  { id: 1, name: 'Salient', href: '#', initial: 'S', current: true },
  { id: 2, name: 'Protocol', href: '#', initial: 'P', current: false },
]

export default function DemoPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="min-h-screen bg-background">
      <Sidebar
        navigation={navigation}
        components={sections}
        teams={teams}
        isMobile={true}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <div className="lg:pl-72">
        <Header onOpenSidebar={() => setSidebarOpen(true)} />

        {/* Main content */}
        <main className="py-10">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            {/* Page header */}
            <div className="mb-16">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-4xl font-bold tracking-tight text-foreground">Components</h1>
                  <p className="mt-2 text-lg text-muted-foreground">
                    A collection of pre-built components ready for your next project
                  </p>
                </div>
                <div>
                  <button
                    type="button"
                    className="inline-flex items-center rounded-md bg-primary px-3 py-2 text-sm font-semibold text-primary-foreground shadow-sm hover:bg-primary/90"
                  >
                    View on GitHub
                  </button>
                </div>
              </div>
            </div>

            {/* Two column layout */}
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
              {/* Column 1 */}
              <div className="space-y-8">
                {/* Typography Card */}
                <div className="rounded-lg border border-border bg-card overflow-hidden">
                  <div className="border-b border-border bg-muted px-4 py-3">
                    <h3 className="text-sm font-medium leading-6">Typography</h3>
                  </div>
                  <div className="p-4">
                    <div className="space-y-6">
                      <div>
                        <h1 className="text-4xl font-bold">Heading 1</h1>
                        <p className="text-sm text-muted-foreground mt-1">4xl / Bold / Leading-tight</p>
                      </div>
                      <div>
                        <h2 className="text-3xl font-semibold">Heading 2</h2>
                        <p className="text-sm text-muted-foreground mt-1">3xl / Semibold / Leading-tight</p>
                      </div>
                      <div>
                        <h3 className="text-2xl font-medium">Heading 3</h3>
                        <p className="text-sm text-muted-foreground mt-1">2xl / Medium / Leading-tight</p>
                      </div>
                      <div>
                        <p className="text-base">Body text that flows naturally and provides a comfortable reading experience for your users. Good typography makes content both readable and scannable.</p>
                        <p className="text-sm text-muted-foreground mt-1">Base / Regular / Leading-normal</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Column 2 */}
              <div className="space-y-8">
                {/* Colors Card */}
                <div className="rounded-lg border border-border bg-card overflow-hidden">
                  <div className="border-b border-border bg-muted px-4 py-3">
                    <h3 className="text-sm font-medium leading-6">Colors</h3>
                  </div>
                  <div className="p-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-3">
                        <div>
                          <div className="h-10 w-full rounded-md bg-primary"></div>
                          <p className="mt-1.5 text-sm text-muted-foreground">Primary</p>
                        </div>
                        <div>
                          <div className="h-10 w-full rounded-md bg-secondary"></div>
                          <p className="mt-1.5 text-sm text-muted-foreground">Secondary</p>
                        </div>
                        <div>
                          <div className="h-10 w-full rounded-md bg-accent"></div>
                          <p className="mt-1.5 text-sm text-muted-foreground">Accent</p>
                        </div>
                      </div>
                      <div className="space-y-3">
                        <div>
                          <div className="h-10 w-full rounded-md bg-background"></div>
                          <p className="mt-1.5 text-sm text-muted-foreground">Background</p>
                        </div>
                        <div>
                          <div className="h-10 w-full rounded-md bg-muted"></div>
                          <p className="mt-1.5 text-sm text-muted-foreground">Muted</p>
                        </div>
                        <div>
                          <div className="h-10 w-full rounded-md bg-card"></div>
                          <p className="mt-1.5 text-sm text-muted-foreground">Card</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
} 