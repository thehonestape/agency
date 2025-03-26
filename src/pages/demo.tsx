import { BrandSidebarWithHeader } from '../components/application-shells/sidebar'
import { Card } from '../components/ui/Card'

export default function DemoPage() {
  return (
    <BrandSidebarWithHeader>
      <div className="py-10">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <Card>
              <div className="flex flex-col space-y-1.5 p-6">
                <h3 className="font-semibold tracking-tight text-2xl">Typography</h3>
              </div>
              <div className="p-6 pt-0 space-y-4">
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
              </div>
            </Card>

            <Card>
              <div className="flex flex-col space-y-1.5 p-6">
                <h3 className="font-semibold tracking-tight text-2xl">Colors</h3>
              </div>
              <div className="p-6 pt-0">
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
              </div>
            </Card>
          </div>
        </div>
      </div>
    </BrandSidebarWithHeader>
  )
} 