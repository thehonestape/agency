import { BrandSidebarWithHeader } from '../components/application-shells/sidebar'
import { Card } from '../components/ui/Card'

const colorTokens = [
  { name: 'Primary', class: 'bg-primary', textClass: 'text-primary-foreground' },
  { name: 'Secondary', class: 'bg-secondary', textClass: 'text-secondary-foreground' },
  { name: 'Accent', class: 'bg-accent', textClass: 'text-accent-foreground' },
  { name: 'Background', class: 'bg-background', textClass: 'text-foreground' },
  { name: 'Muted', class: 'bg-muted', textClass: 'text-muted-foreground' },
  { name: 'Card', class: 'bg-card', textClass: 'text-card-foreground' },
  { name: 'Destructive', class: 'bg-destructive', textClass: 'text-destructive-foreground' },
  { name: 'Success', class: 'bg-success', textClass: 'text-success-foreground' },
  { name: 'Warning', class: 'bg-warning', textClass: 'text-warning-foreground' },
  { name: 'Info', class: 'bg-info', textClass: 'text-info-foreground' }
]

const typographyExamples = [
  { element: 'h1', class: 'text-4xl font-bold', label: '4xl / Bold / Leading-tight' },
  { element: 'h2', class: 'text-3xl font-semibold', label: '3xl / Semibold / Leading-tight' },
  { element: 'h3', class: 'text-2xl font-medium', label: '2xl / Medium / Leading-tight' },
  { element: 'p', class: 'text-base', label: 'Base / Regular / Leading-normal', 
    content: 'Body text that flows naturally and provides a comfortable reading experience for your users. Good typography makes content both readable and scannable.' }
]

export default function DemoPage() {
  return (
    <BrandSidebarWithHeader>
      <div className="py-10">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <Card className="rounded-lg border bg-card text-card-foreground shadow-sm">
              <div className="flex flex-col space-y-1.5 p-6">
                <h3 className="font-semibold tracking-tight text-2xl">Typography</h3>
              </div>
              <div className="p-6 pt-0 space-y-4">
                {typographyExamples.map(({ element, class: className, label, content }) => {
                  const Component = element as keyof JSX.IntrinsicElements
                  return (
                    <div key={label}>
                      <Component className={className}>
                        {content || element.toUpperCase()}
                      </Component>
                      <p className="text-xs text-muted-foreground">{label}</p>
                    </div>
                  )
                })}
              </div>
            </Card>

            <Card className="rounded-lg border bg-card text-card-foreground shadow-sm">
              <div className="flex flex-col space-y-1.5 p-6">
                <h3 className="font-semibold tracking-tight text-2xl">Colors</h3>
              </div>
              <div className="p-6 pt-0">
                <div className="grid grid-cols-2 gap-4">
                  {colorTokens.map(({ name, class: className, textClass }) => (
                    <div key={name}>
                      <div className={`h-10 w-full rounded-md flex items-center justify-center ${className} ${textClass}`}>
                        {name}
                      </div>
                      <p className="mt-1 text-xs text-muted-foreground">{name}</p>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </BrandSidebarWithHeader>
  )
} 