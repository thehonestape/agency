import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../components/ui/Card'

export function BrandsPage() {
  return (
    <>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Brands</h1>
          <p className="text-muted-foreground">
            Manage your organization's brands
          </p>
        </div>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>All Brands</CardTitle>
          <CardDescription>View and manage your brands</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Brand management functionality will be implemented here.</p>
        </CardContent>
      </Card>
    </>
  )
} 