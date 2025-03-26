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
    <div className="space-y-12">
      {/* Overview */}
      <div className="mb-12">
        <h1 className="text-4xl font-bold tracking-tight text-foreground mb-4">Component System</h1>
        <p className="text-xl text-muted-foreground">A comprehensive set of reusable UI components built with React and Tailwind CSS.</p>
      </div>

      {/* Core Components */}
      <Section id="core-components" title="Core Components">
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
            <Container size="full" className="bg-muted p-4 rounded-lg w-full">
              <p className="text-muted-foreground">Fluid Container Component</p>
            </Container>
          </div>
        </div>
      </Section>

      {/* Pattern Components */}
      <Section id="pattern-components" title="Pattern Components">
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
      </Section>

      {/* Block Components */}
      <Section id="block-components" title="Block Components">
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
      </Section>

      {/* Theme System */}
      <Section id="theme-system" title="Theme System">
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
      </Section>
    </div>
  )
} 