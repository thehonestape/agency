import { BrandSidebarWithHeader } from '../components/application-shells/sidebar'
import { Card } from '../components/ui/Card'
import { BrandHeading } from '../components/brand/BrandHeading'
import { BrandText } from '../components/brand/BrandText'

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
  { level: 1 as const, label: 'Heading 1', description: 'Bold / Leading-tight' },
  { level: 2 as const, label: 'Heading 2', description: 'Semibold / Leading-tight' },
  { level: 3 as const, label: 'Heading 3', description: 'Medium / Leading-tight' },
  { level: 4 as const, label: 'Heading 4', description: 'Regular / Leading-normal' },
  { level: 5 as const, label: 'Heading 5', description: 'Regular / Leading-normal' },
  { level: 6 as const, label: 'Heading 6', description: 'Regular / Leading-normal' }
]

export default function DemoPage() {
  return (
    <BrandSidebarWithHeader>
      <div className="py-10">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <Card className="rounded-lg border bg-card text-card-foreground shadow-sm">
              <div className="flex flex-col space-y-1.5 p-6">
                <BrandHeading level={3}>Typography</BrandHeading>
              </div>
              <div className="p-6 pt-0 space-y-4">
                {typographyExamples.map(({ level, label, description }) => (
                  <div key={label} className="space-y-1">
                    <BrandHeading level={level}>{label}</BrandHeading>
                    <BrandText size="sm" color="muted">{description}</BrandText>
                  </div>
                ))}
                <div className="space-y-1">
                  <BrandText>Body text that flows naturally and provides a comfortable reading experience for your users. Good typography makes content both readable and scannable.</BrandText>
                  <BrandText size="sm" color="muted">Base / Regular / Leading-normal</BrandText>
                </div>
              </div>
            </Card>

            <Card className="rounded-lg border bg-card text-card-foreground shadow-sm">
              <div className="flex flex-col space-y-1.5 p-6">
                <BrandHeading level={3}>Colors</BrandHeading>
              </div>
              <div className="p-6 pt-0">
                <div className="grid grid-cols-2 gap-4">
                  {colorTokens.map(({ name, class: className, textClass }) => (
                    <div key={name}>
                      <div className={`h-10 w-full rounded-md flex items-center justify-center ${className} ${textClass}`}>
                        <BrandText size="sm">{name}</BrandText>
                      </div>
                      <BrandText size="xs" color="muted" className="mt-1">{name}</BrandText>
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