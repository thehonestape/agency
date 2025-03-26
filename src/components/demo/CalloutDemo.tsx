import { Callout } from "@/components/ui/Callout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card"

export function CalloutDemo() {
  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle>Callout Component</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <Callout title="Note Callout" type="note">
          <p>This is a note callout with useful information.</p>
          <p>It uses our theming architecture with accent colors.</p>
        </Callout>

        <Callout title="Warning Callout" type="warning">
          <p>This is a warning callout for important alerts.</p>
          <p>It uses our theming architecture with destructive colors.</p>
        </Callout>

        <Callout title="Info Callout" type="info">
          <p>This is an info callout for general information.</p>
          <p>It uses our theming architecture with primary colors.</p>
        </Callout>
      </CardContent>
    </Card>
  )
} 