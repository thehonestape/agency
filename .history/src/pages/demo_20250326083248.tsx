import { Card } from '../component-system'
import { Heading, Text } from '../components/ui/typography'
import RootLayout from '../components/layouts/RootLayout'

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
  { size: 'h1' as const, label: 'Heading 1', description: 'Bold / Leading-tight' },
  { size: 'h2' as const, label: 'Heading 2', description: 'Semibold / Leading-tight' },
  { size: 'h3' as const, label: 'Heading 3', description: 'Medium / Leading-tight' },
  { size: 'h4' as const, label: 'Heading 4', description: 'Regular / Leading-normal' },
  { size: 'h5' as const, label: 'Heading 5', description: 'Regular / Leading-normal' },
  { size: 'h6' as const, label: 'Heading 6', description: 'Regular / Leading-normal' }
]

export default function DemoPage() {
  return (
    <RootLayout>
      <div className="py-10">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <Card>
              <div className="flex flex-col space-y-1.5 p-6">
                <Heading size="h3">Typography</Heading>
              </div>
              <div className="p-6 pt-0 space-y-4">
                {typographyExamples.map(({ size, label, description }) => (
                  <div key={label} className="space-y-1">
                    <Heading size={size}>{label}</Heading>
                    <Text size="sm" variant="muted">{description}</Text>
                  </div>
                ))}
                <div className="space-y-1">
                  <Text>Body text that flows naturally and provides a comfortable reading experience for your users. Good typography makes content both readable and scannable.</Text>
                  <Text size="sm" variant="muted">Base / Regular / Leading-normal</Text>
                </div>
              </div>
            </Card>

            <Card>
              <div className="flex flex-col space-y-1.5 p-6">
                <Heading size="h3">Colors</Heading>
              </div>
              <div className="p-6 pt-0">
                <div className="grid grid-cols-2 gap-4">
                  {colorTokens.map(({ name, class: className, textClass }) => (
                    <div key={name}>
                      <div className={`h-10 w-full rounded-md flex items-center justify-center ${className} ${textClass}`}>
                        <Text size="sm">{name}</Text>
                      </div>
                      <Text size="xs" variant="muted" className="mt-1">{name}</Text>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </RootLayout>
  )
} 