import React from 'react'
import { CalloutDemo } from '@/components/demo/CalloutDemo'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'

export default function ComponentShowcase() {
  return (
    <div className="container py-10 space-y-10">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Component Showcase</h1>
        <p className="text-muted-foreground mt-2">
          A showcase of our themed UI components
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Component Gallery</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-6">
            These components use our theming architecture with CSS variables for consistent styling across light and dark modes.
          </p>
          
          <div className="grid gap-6">
            <section id="callouts">
              <h2 className="text-xl font-semibold mb-4">Callouts</h2>
              <CalloutDemo />
            </section>
            
            {/* Add more component sections here as they're created */}
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 