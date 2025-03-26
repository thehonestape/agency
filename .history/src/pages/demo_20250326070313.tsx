import { useState } from 'react'
import { Sidebar } from '../components/layout/Sidebar'
import { Header } from '../components/layout/Header'
import { ComponentShowcase } from '../components/demo/ComponentShowcase'

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

export default function DemoPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div>
      <Sidebar
        navigation={navigation}
        components={components}
        teams={teams}
        isMobile={true}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <Sidebar
        navigation={navigation}
        components={components}
        teams={teams}
      />

      <Header onOpenSidebar={() => setSidebarOpen(true)} />

      {/* Main content */}
      <main className="lg:pl-72">
        <div className="px-4 py-10 sm:px-6 lg:px-8 lg:py-6">
          <ComponentShowcase />
        </div>
      </main>

      {/* Secondary column */}
      <aside className="fixed inset-y-0 right-0 hidden w-96 overflow-y-auto border-l border-border px-4 py-6 sm:px-6 lg:px-8 xl:block">
        <div className="rounded-lg border border-border bg-card p-4 h-96 flex items-center justify-center">
          <p className="text-muted-foreground">Secondary column</p>
        </div>
      </aside>
    </div>
  )
} 