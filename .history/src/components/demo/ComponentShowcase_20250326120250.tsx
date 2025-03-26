import {
  Button,
  Card,
  FeatureCard,
  FeatureSection,
  Container,
} from '../../component-system'

interface ShowcaseSection {
  id: string
  title: string
  description?: string
  children: React.ReactNode
}

function Section({ id, title, description, children }: ShowcaseSection) {
  return (
    <section id={id} className="mb-12">
      <h2 className="text-2xl font-semibold mb-6">{title}</h2>
      {description && (
        <p className="text-muted-foreground mb-6">{description}</p>
      )}
      {children}
    </section>
  )
}

export function ComponentShowcase() {
  return (
    <main data-layout-content="true" className="flex-1 overflow-y-auto p-3 md:p-4 bg-surface-secondary/50 dark:bg-surface-secondary-dark/30">
      <div data-layout-container="true" className="mx-auto w-full max-w-7xl space-y-4">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* Core Components */}
          <div className="card card-default" style={{ borderRadius: '16px', overflow: 'hidden', backgroundColor: 'rgb(255, 255, 255)', boxShadow: 'rgba(0, 0, 0, 0.05) 0px 1px 2px 0px', border: '1px solid rgb(229, 231, 235)' }}>
            <div className="card-content" style={{ padding: '1.5rem' }}>
              <div className="flex flex-col space-y-1.5 p-6">
                <h3 className="font-heading text-[hsl(var(--foreground-base))] text-2xl lg:text-3xl font-semibold text-left tracking-tight">Core Components</h3>
              </div>
              <div className="p-6 pt-0 space-y-4">
                <div className="space-y-4">
                  <div>
                    <h4 className="text-lg font-medium mb-4">Buttons</h4>
                    <div className="flex flex-wrap gap-4">
                      <Button>Default</Button>
                      <Button variant="secondary">Secondary</Button>
                      <Button variant="outline">Outline</Button>
                      <Button variant="ghost">Ghost</Button>
                    </div>
                  </div>
                  <div>
                    <h4 className="text-lg font-medium mb-4">Layout</h4>
                    <div className="bg-muted p-4 rounded-lg">
                      <p className="text-muted-foreground">Container Component</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Pattern Components */}
          <div className="card card-default" style={{ borderRadius: '16px', overflow: 'hidden', backgroundColor: 'rgb(255, 255, 255)', boxShadow: 'rgba(0, 0, 0, 0.05) 0px 1px 2px 0px', border: '1px solid rgb(229, 231, 235)' }}>
            <div className="card-content" style={{ padding: '1.5rem' }}>
              <div className="flex flex-col space-y-1.5 p-6">
                <h3 className="font-heading text-[hsl(var(--foreground-base))] text-2xl lg:text-3xl font-semibold text-left tracking-tight">Pattern Components</h3>
              </div>
              <div className="p-6 pt-0 space-y-4">
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
            </div>
          </div>

          {/* Block Components */}
          <div className="card card-default lg:col-span-2" style={{ borderRadius: '16px', overflow: 'hidden', backgroundColor: 'rgb(255, 255, 255)', boxShadow: 'rgba(0, 0, 0, 0.05) 0px 1px 2px 0px', border: '1px solid rgb(229, 231, 235)' }}>
            <div className="card-content" style={{ padding: '1.5rem' }}>
              <div className="flex flex-col space-y-1.5 p-6">
                <h3 className="font-heading text-[hsl(var(--foreground-base))] text-2xl lg:text-3xl font-semibold text-left tracking-tight">Block Components</h3>
              </div>
              <div className="p-6 pt-0">
                <FeatureSection
                  title="Feature Section"
                  description="Showcase your product features with this customizable section."
                  features={[
                    {
                      title: "Customizable",
                      description: "Easily customize the appearance and content of each feature."
                    },
                    {
                      title: "Responsive",
                      description: "Looks great on all screen sizes and devices."
                    }
                  ]}
                />
              </div>
            </div>
          </div>

          {/* Theme System */}
          <div className="card card-default lg:col-span-2" style={{ borderRadius: '16px', overflow: 'hidden', backgroundColor: 'rgb(255, 255, 255)', boxShadow: 'rgba(0, 0, 0, 0.05) 0px 1px 2px 0px', border: '1px solid rgb(229, 231, 235)' }}>
            <div className="card-content" style={{ padding: '1.5rem' }}>
              <div className="flex flex-col space-y-1.5 p-6">
                <h3 className="font-heading text-[hsl(var(--foreground-base))] text-2xl lg:text-3xl font-semibold text-left tracking-tight">Theme System</h3>
              </div>
              <div className="p-6 pt-0">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="flex flex-col gap-2">
                    <div className="h-10 w-full rounded-md flex items-center justify-center bg-primary text-primary-foreground">
                      <p className="text-[hsl(var(--foreground-base))] text-sm font-normal text-left tracking-normal leading-normal">Primary</p>
                    </div>
                    <p className="text-xs font-normal text-left text-[hsl(var(--foreground-muted))] tracking-normal leading-normal">Primary</p>
                  </div>
                  <div className="flex flex-col gap-2">
                    <div className="h-10 w-full rounded-md flex items-center justify-center bg-secondary text-secondary-foreground">
                      <p className="text-[hsl(var(--foreground-base))] text-sm font-normal text-left tracking-normal leading-normal">Secondary</p>
                    </div>
                    <p className="text-xs font-normal text-left text-[hsl(var(--foreground-muted))] tracking-normal leading-normal">Secondary</p>
                  </div>
                  <div className="flex flex-col gap-2">
                    <div className="h-10 w-full rounded-md flex items-center justify-center bg-card text-card-foreground">
                      <p className="text-[hsl(var(--foreground-base))] text-sm font-normal text-left tracking-normal leading-normal">Card</p>
                    </div>
                    <p className="text-xs font-normal text-left text-[hsl(var(--foreground-muted))] tracking-normal leading-normal">Card</p>
                  </div>
                  <div className="flex flex-col gap-2">
                    <div className="h-10 w-full rounded-md flex items-center justify-center bg-muted text-muted-foreground">
                      <p className="text-[hsl(var(--foreground-base))] text-sm font-normal text-left tracking-normal leading-normal">Muted</p>
                    </div>
                    <p className="text-xs font-normal text-left text-[hsl(var(--foreground-muted))] tracking-normal leading-normal">Muted</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
} 