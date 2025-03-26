import { useState } from 'react'
import { Card } from '../component-system'
import { CardHeader, CardTitle, CardContent } from '../components/ui/Card'
import { Button } from '../components/ui/button'
import { Sidebar } from '../component-system'

const navigation = [
  { name: 'Introduction', href: '#introduction', current: true },
  { name: 'Getting Started', href: '#getting-started', current: false },
  { name: 'Installation', href: '#installation', current: false },
]

const sections = [
  { 
    title: 'Foundation',
    items: [
      { name: 'Colors', href: '#colors', current: false },
      { name: 'Typography', href: '#typography', current: false },
      { name: 'Spacing', href: '#spacing', current: false },
      { name: 'Shadows', href: '#shadows', current: false },
      { name: 'Border Radius', href: '#border-radius', current: false },
      { name: 'Z-Index', href: '#z-index', current: false },
    ]
  },
  {
    title: 'Components',
    items: [
      { name: 'Button', href: '#button', current: false },
      { name: 'Input', href: '#input', current: false },
      { name: 'Select', href: '#select', current: false },
      { name: 'Card', href: '#card', current: false },
      { name: 'Dialog', href: '#dialog', current: false },
    ]
  },
  {
    title: 'Patterns',
    items: [
      { name: 'Page Layouts', href: '#page-layouts', current: false },
      { name: 'Forms', href: '#forms', current: false },
      { name: 'Navigation', href: '#navigation', current: false },
    ]
  }
]

export default function DemoPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="min-h-screen bg-background">
      <Sidebar
        navigation={navigation}
        sections={sections}
        variant="primary"
        mobile="overlay"
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <div className="lg:pl-72">
        <header className="flex h-16 items-center gap-x-4 border-b border-border bg-card px-6">
          <button
            type="button"
            className="lg:hidden"
            onClick={() => setSidebarOpen(true)}
          >
            <span className="sr-only">Open sidebar</span>
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
          </button>
          <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
            <div className="flex flex-1 items-center">
              <h1 className="text-2xl font-semibold text-foreground">Components</h1>
            </div>
            <div className="flex items-center gap-x-4 lg:gap-x-6">
              <Button variant="default" size="sm">
                View on GitHub
              </Button>
            </div>
          </div>
        </header>

        <main className="py-10">
          <div className="px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Typography</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h1 className="text-4xl font-bold">Heading 1</h1>
                    <p className="text-xs text-muted-foreground">4xl / Bold / Leading-tight</p>
                  </div>
                  <div>
                    <h2 className="text-3xl font-semibold">Heading 2</h2>
                    <p className="text-xs text-muted-foreground">3xl / Semibold / Leading-tight</p>
                  </div>
                  <div>
                    <h3 className="text-2xl font-medium">Heading 3</h3>
                    <p className="text-xs text-muted-foreground">2xl / Medium / Leading-tight</p>
                  </div>
                  <div>
                    <p className="text-base">Body text that flows naturally and provides a comfortable reading experience for your users. Good typography makes content both readable and scannable.</p>
                    <p className="text-xs text-muted-foreground">Base / Regular / Leading-normal</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Colors</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="h-10 w-full rounded-md bg-primary"></div>
                      <p className="mt-1 text-xs text-muted-foreground">Primary</p>
                    </div>
                    <div>
                      <div className="h-10 w-full rounded-md bg-background"></div>
                      <p className="mt-1 text-xs text-muted-foreground">Background</p>
                    </div>
                    <div>
                      <div className="h-10 w-full rounded-md bg-secondary"></div>
                      <p className="mt-1 text-xs text-muted-foreground">Secondary</p>
                    </div>
                    <div>
                      <div className="h-10 w-full rounded-md bg-muted"></div>
                      <p className="mt-1 text-xs text-muted-foreground">Muted</p>
                    </div>
                    <div>
                      <div className="h-10 w-full rounded-md bg-accent"></div>
                      <p className="mt-1 text-xs text-muted-foreground">Accent</p>
                    </div>
                    <div>
                      <div className="h-10 w-full rounded-md bg-card"></div>
                      <p className="mt-1 text-xs text-muted-foreground">Card</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
} 