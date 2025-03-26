import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/Card'
import { Button } from '../../components/ui/button'
import { Plus } from 'lucide-react'

export default function BrainstormHome() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">
            Brainstorm
          </h1>
          <p className="text-muted-foreground mt-1">
            Your creative workspace for ideas, inspiration, and exploration.
          </p>
        </div>
        <Button variant="default" className="gap-2">
          <Plus className="h-4 w-4" />
          New Workspace
        </Button>
      </div>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Workspaces</CardTitle>
            <CardDescription>
              Your most recently accessed creative spaces
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center text-muted-foreground py-8">
              No workspaces yet. Create your first workspace to get started.
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 