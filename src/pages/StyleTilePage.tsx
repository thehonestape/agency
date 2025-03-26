import React from 'react'
import { Callout } from '@/components/ui/Callout'
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/Card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ThemeSelector } from '@/components/ui/ThemeSelector'
import { Badge } from '@/components/ui/badge'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Avatar } from '@/components/ui/avatar'
import { Switch } from '@/components/ui/switch'
import { Slider } from '@/components/ui/slider'
import { Textarea } from '@/components/ui/textarea'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { ScrollArea } from '@/components/ui/ScrollArea'

// Import some icons
import { 
  AlertCircle, 
  Check, 
  Info, 
  Bell, 
  Palette, 
  LightbulbIcon, 
  AlertTriangleIcon, 
  CheckCircle 
} from 'lucide-react'

export default function StyleTilePage() {
  return (
    <div className="bg-background text-foreground min-h-screen p-8">
      <div className="max-w-7xl mx-auto">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold tracking-tight mb-3">Design System Style Tile</h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            A comprehensive overview of our UI components and their styling, showcasing the design system.
          </p>
          <div className="mt-6 flex justify-center">
            <ThemeSelector />
          </div>
        </header>

        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 pb-2 border-b">Typography</h2>
          <div className="grid gap-8">
            <div>
              <h1 className="text-5xl font-bold mb-1">Heading 1</h1>
              <p className="text-muted-foreground">font-size: 3rem, font-weight: 700</p>
            </div>
            <div>
              <h2 className="text-4xl font-bold mb-1">Heading 2</h2>
              <p className="text-muted-foreground">font-size: 2.25rem, font-weight: 700</p>
            </div>
            <div>
              <h3 className="text-3xl font-bold mb-1">Heading 3</h3>
              <p className="text-muted-foreground">font-size: 1.875rem, font-weight: 700</p>
            </div>
            <div>
              <h4 className="text-2xl font-bold mb-1">Heading 4</h4>
              <p className="text-muted-foreground">font-size: 1.5rem, font-weight: 700</p>
            </div>
            <div>
              <h5 className="text-xl font-bold mb-1">Heading 5</h5>
              <p className="text-muted-foreground">font-size: 1.25rem, font-weight: 700</p>
            </div>
            <div>
              <h6 className="text-lg font-bold mb-1">Heading 6</h6>
              <p className="text-muted-foreground">font-size: 1.125rem, font-weight: 700</p>
            </div>
            <div>
              <p className="text-base mb-1">Body Text - Regular</p>
              <p className="text-muted-foreground">font-size: 1rem, font-weight: 400</p>
            </div>
            <div>
              <p className="text-sm mb-1">Small Text</p>
              <p className="text-muted-foreground">font-size: 0.875rem</p>
            </div>
            <div>
              <p className="text-xs mb-1">Extra Small Text</p>
              <p className="text-muted-foreground">font-size: 0.75rem</p>
            </div>
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 pb-2 border-b">Colors</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            <ColorSwatch name="Primary" className="bg-primary text-primary-foreground" />
            <ColorSwatch name="Secondary" className="bg-secondary text-secondary-foreground" />
            <ColorSwatch name="Accent" className="bg-accent text-accent-foreground" />
            <ColorSwatch name="Muted" className="bg-muted text-muted-foreground" />
            <ColorSwatch name="Card" className="bg-card text-card-foreground border" />
            <ColorSwatch name="Background" className="bg-background text-foreground border" />
            <ColorSwatch name="Destructive" className="bg-destructive text-destructive-foreground" />
            <ColorSwatch name="Success" className="bg-green-500 text-white" />
            <ColorSwatch name="Warning" className="bg-yellow-500 text-white" />
            <ColorSwatch name="Info" className="bg-blue-500 text-white" />
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 pb-2 border-b">Buttons</h2>
          <div className="grid gap-8">
            <div className="flex flex-wrap gap-4">
              <Button>Default Button</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="link">Link</Button>
              <Button variant="destructive">Destructive</Button>
            </div>
            <div className="flex flex-wrap gap-4">
              <Button size="sm">Small Button</Button>
              <Button>Default Size</Button>
              <Button size="lg">Large Button</Button>
            </div>
            <div className="flex flex-wrap gap-4">
              <Button disabled>Disabled Button</Button>
              <Button>
                <Check className="mr-2 h-4 w-4" /> With Icon
              </Button>
              <Button variant="outline" className="gap-2">
                <Bell className="h-4 w-4" /> Notifications <Badge>5</Badge>
              </Button>
            </div>
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 pb-2 border-b">Inputs & Controls</h2>
          <div className="grid gap-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" placeholder="Enter your email" type="email" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input id="password" placeholder="Enter your password" type="password" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <Textarea id="message" placeholder="Type your message here" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="selection">Select Option</Label>
                <Select>
                  <SelectTrigger id="selection">
                    <SelectValue placeholder="Select an option" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="option1">Option 1</SelectItem>
                    <SelectItem value="option2">Option 2</SelectItem>
                    <SelectItem value="option3">Option 3</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="flex flex-wrap gap-8">
              <div className="flex items-center space-x-2">
                <Switch id="airplane-mode" />
                <Label htmlFor="airplane-mode">Airplane Mode</Label>
              </div>
              <div className="w-full max-w-sm">
                <Label htmlFor="temperature">Temperature</Label>
                <Slider id="temperature" defaultValue={[50]} max={100} step={1} />
              </div>
            </div>
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 pb-2 border-b">Cards</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Card Title</CardTitle>
                <CardDescription>Card description goes here, providing more context.</CardDescription>
              </CardHeader>
              <CardContent>
                <p>This is the main content of the card. It can contain any elements.</p>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="ghost">Cancel</Button>
                <Button>Submit</Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader className="bg-primary/10">
                <CardTitle>Featured Card</CardTitle>
                <CardDescription>With a highlighted header background</CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <p>Cards can be used for a wide variety of content and layouts.</p>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">View Details</Button>
              </CardFooter>
            </Card>
            
            <Card className="border-primary/50">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Avatar>
                    <div className="bg-primary text-primary-foreground font-medium w-full h-full flex items-center justify-center">
                      JD
                    </div>
                  </Avatar>
                  <div>
                    <CardTitle>User Card</CardTitle>
                    <CardDescription>With avatar and custom border</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p>Showing user information with avatar integration.</p>
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 pb-2 border-b">Alerts & Notifications</h2>
          <div className="grid gap-6">
            <Alert>
              <Info className="h-4 w-4" />
              <AlertDescription>This is a standard information alert.</AlertDescription>
            </Alert>
            
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>Error! Something went wrong.</AlertDescription>
            </Alert>
            
            <Alert variant="success" className="bg-green-50 dark:bg-green-900/20 border-green-300 dark:border-green-800 text-green-800 dark:text-green-300">
              <CheckCircle className="h-4 w-4" />
              <AlertDescription>Success! Your action was completed.</AlertDescription>
            </Alert>

            <div className="flex flex-wrap gap-3">
              <Badge>Default</Badge>
              <Badge variant="secondary">Secondary</Badge>
              <Badge variant="outline">Outline</Badge>
              <Badge variant="destructive">Destructive</Badge>
              <Badge className="bg-green-500 hover:bg-green-600">Success</Badge>
              <Badge className="bg-yellow-500 hover:bg-yellow-600">Warning</Badge>
            </div>
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 pb-2 border-b">Callouts</h2>
          <div className="grid gap-6">
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
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 pb-2 border-b">Tabs</h2>
          <Tabs defaultValue="account" className="w-full">
            <TabsList className="grid grid-cols-3 w-full max-w-md mb-4">
              <TabsTrigger value="account">Account</TabsTrigger>
              <TabsTrigger value="password">Password</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>
            <TabsContent value="account" className="border rounded-lg p-6">
              <h3 className="text-lg font-medium mb-2">Account Settings</h3>
              <p className="text-muted-foreground mb-4">Manage your account information and preferences.</p>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" defaultValue="John Doe" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="username">Username</Label>
                  <Input id="username" defaultValue="johndoe" />
                </div>
                <Button>Save Changes</Button>
              </div>
            </TabsContent>
            <TabsContent value="password" className="border rounded-lg p-6">
              <h3 className="text-lg font-medium mb-2">Change Password</h3>
              <p className="text-muted-foreground mb-4">Update your password for increased security.</p>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="current-password">Current Password</Label>
                  <Input id="current-password" type="password" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="new-password">New Password</Label>
                  <Input id="new-password" type="password" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirm-password">Confirm Password</Label>
                  <Input id="confirm-password" type="password" />
                </div>
                <Button>Update Password</Button>
              </div>
            </TabsContent>
            <TabsContent value="settings" className="border rounded-lg p-6">
              <h3 className="text-lg font-medium mb-2">General Settings</h3>
              <p className="text-muted-foreground mb-4">Configure your application preferences.</p>
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="notifications">Enable Notifications</Label>
                    <p className="text-sm text-muted-foreground">Receive updates and alerts</p>
                  </div>
                  <Switch id="notifications" />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="marketing">Marketing Emails</Label>
                    <p className="text-sm text-muted-foreground">Receive marketing emails</p>
                  </div>
                  <Switch id="marketing" />
                </div>
                <Button>Save Preferences</Button>
              </div>
            </TabsContent>
          </Tabs>
        </section>

        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 pb-2 border-b">Avatar</h2>
          <div className="flex flex-wrap gap-6 items-center">
            <Avatar className="h-12 w-12">
              <div className="bg-primary text-primary-foreground font-medium w-full h-full flex items-center justify-center">
                JD
              </div>
            </Avatar>
            
            <Avatar className="h-16 w-16">
              <div className="bg-secondary text-secondary-foreground font-medium w-full h-full flex items-center justify-center">
                AB
              </div>
            </Avatar>
            
            <Avatar className="h-20 w-20">
              <div className="bg-accent text-accent-foreground font-medium w-full h-full flex items-center justify-center">
                CD
              </div>
            </Avatar>
            
            <Avatar className="h-12 w-12">
              <div className="bg-destructive text-destructive-foreground font-medium w-full h-full flex items-center justify-center">
                <AlertCircle className="h-6 w-6" />
              </div>
            </Avatar>
            
            <Avatar className="h-12 w-12">
              <div className="bg-green-500 text-white font-medium w-full h-full flex items-center justify-center">
                <Check className="h-6 w-6" />
              </div>
            </Avatar>
          </div>
        </section>

        <footer className="text-center py-8 text-muted-foreground">
          <p>Design System Style Tile - For reference and development</p>
        </footer>
      </div>
    </div>
  )
}

// Helper component for color swatches
function ColorSwatch({ name, className }: { name: string, className: string }) {
  return (
    <div className="space-y-2">
      <div className={`h-20 rounded-md flex items-center justify-center ${className}`}>
        {name}
      </div>
      <p className="text-sm font-medium">{name}</p>
    </div>
  )
} 