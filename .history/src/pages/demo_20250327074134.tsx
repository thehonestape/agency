import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../components/ui/Card'
import { Heading, Text } from '../components/ui/typography'
import { DashboardLayout } from '../components/layouts/DashboardLayout'
import { ThemeProvider } from '../lib/theme-context'
import { ThemeColorDisplay } from '../components/ui/ThemeColorDisplay'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { Label } from '../components/ui/label'
import { 
  FiLayout as LayoutDashboard, 
  FiFolder as FolderOpen, 
  FiPenTool as Palette, 
  FiShare2 as Share2, 
  FiMail as Mail, 
  FiSettings as Settings, 
  FiUsers as Users, 
  FiCalendar as Calendar,
  FiLayers as Layers,
  FiBarChart2 as BarChart,
  FiBox as Box,
  FiSliders as Sliders,
  FiMessageCircle as MessageCircle,
  FiPlus as Plus,
  FiFileText as FileText,
  FiType as Typography,
  FiEdit3 as Paintbrush,
  FiDroplet as Droplet,
  FiGrid as LayoutGrid
} from "react-icons/fi"

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

// Navigation sections
const navigation = [
  {
    name: "Latest Projects",
    href: "/projects",
    icon: FolderOpen,
    count: "3"
  },
  {
    name: "Assets",
    href: "/assets",
    icon: Layers,
    count: "24"
  },
  {
    name: "Email Marketing",
    href: "/email",
    icon: Mail,
    count: "5"
  }
]

const sections = [
  {
    title: "Projects",
    items: [
      {
        name: "New Project",
        href: "/projects/new",
        icon: Plus,
        initial: "NP"
      },
      {
        name: "New Document",
        href: "/documents/new",
        icon: FileText,
        initial: "ND"
      }
    ]
  },
  {
    title: "Content & Assets",
    items: [
      {
        name: "Content Calendar",
        href: "/calendar",
        icon: Calendar
      }
    ]
  },
  {
    title: "Marketing",
    items: [
      {
        name: "Social Media",
        href: "/social",
        icon: Share2
      }
    ]
  },
  {
    title: "Team",
    items: [
      {
        name: "Team",
        href: "/team",
        icon: Users
      },
      {
        name: "Conversations",
        href: "/conversations",
        icon: MessageCircle
      }
    ]
  },
  {
    title: "UI",
    items: [
      {
        name: "Theme Demo",
        href: "/theme-demo",
        icon: Sliders
      },
      {
        name: "Theme Showcase",
        href: "/theme-showcase",
        icon: Palette
      },
      {
        name: "Component Showcase",
        href: "/components/showcase",
        icon: Box
      },
      {
        name: "UI Blocks",
        href: "/ui-blocks",
        icon: LayoutGrid
      }
    ]
  },
  {
    title: "Admin",
    items: [
      {
        name: "Settings",
        href: "/settings",
        icon: Settings
      }
    ]
  }
]

export default function DemoPage() {
  return (
    <ThemeProvider defaultThemeId="salient">
      <DashboardLayout
        navigation={navigation}
        sections={sections}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Typography - Left Column */}
          <div className="space-y-8">
            {/* Typography Scale */}
            <section className="space-y-4">
              <Heading as="h2" size="h2">Typography Scale</Heading>
              <Card>
                <CardHeader>
                  <CardTitle>Heading Hierarchy</CardTitle>
                  <CardDescription>Our complete heading scale from h1 to h6</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {typographyExamples.map((example) => (
                    <div key={example.size} className="space-y-1">
                      <Heading as={example.size} size={example.size}>
                        {example.label}
                      </Heading>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <span>{example.description}</span>
                        <span className="text-xs">•</span>
                        <span className="font-mono text-xs">size: {example.size}</span>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </section>

            {/* Body Text */}
            <section className="space-y-4">
              <Heading as="h2" size="h2">Body Text</Heading>
              <Card>
                <CardHeader>
                  <CardTitle>Text Styles</CardTitle>
                  <CardDescription>Different text styles for body content</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Text size="lg" className="font-medium">Large Text</Text>
                    <Text size="lg">Large body text for important content and lead paragraphs. This style is perfect for introducing new sections or highlighting key information.</Text>
                  </div>
                  <div className="space-y-2">
                    <Text className="font-medium">Regular Text</Text>
                    <Text>Regular body text for normal content and paragraphs. This is our standard text size for most content throughout the application.</Text>
                  </div>
                  <div className="space-y-2">
                    <Text size="sm" className="font-medium">Small Text</Text>
                    <Text size="sm">Small body text for secondary information, footnotes, and supporting content. Use this for less prominent information.</Text>
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* Form Components */}
            <section className="space-y-4">
              <Heading as="h2" size="h2">Form Components</Heading>
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Input Fields</CardTitle>
                    <CardDescription>Different types of input components</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Name</Label>
                      <Input id="name" placeholder="Enter your name" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" placeholder="Enter your email" />
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Buttons</CardTitle>
                    <CardDescription>Different button variants and states</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex flex-wrap gap-2">
                      <Button>Default Button</Button>
                      <Button variant="secondary">Secondary</Button>
                      <Button variant="outline">Outline</Button>
                      <Button variant="ghost">Ghost</Button>
                      <Button variant="link">Link</Button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <Button size="sm">Small</Button>
                      <Button>Default</Button>
                      <Button size="lg">Large</Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </section>
          </div>

          {/* Colors - Right Column */}
          <div className="space-y-8">
            <section className="space-y-4">
              <Heading as="h2" size="h2">Color System</Heading>
              <div className="grid grid-cols-1 gap-4">
                {colorTokens.map((token) => (
                  <Card key={token.name}>
                    <CardContent className="p-4">
                      <div className={`h-24 rounded-md ${token.class} flex items-center justify-center`}>
                        <Text className={token.textClass}>{token.name}</Text>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>

            <section className="space-y-4">
              <Heading as="h2" size="h2">Cards and Layout</Heading>
              <div className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Basic Card</CardTitle>
                    <CardDescription>A simple card with header and content</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Text>This is a basic card component showing the standard layout with header and content sections.</Text>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Interactive Card</CardTitle>
                    <CardDescription>Card with interactive elements</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Text>This card demonstrates how interactive elements like buttons work within cards.</Text>
                    <Button variant="outline">Action Button</Button>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Data Card</CardTitle>
                    <CardDescription>Card displaying structured data</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <Text className="text-muted-foreground">Status</Text>
                        <Text>Active</Text>
                      </div>
                      <div className="flex justify-between">
                        <Text className="text-muted-foreground">Last Updated</Text>
                        <Text>2 hours ago</Text>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </section>
          </div>
        </div>
      </DashboardLayout>
    </ThemeProvider>
  )
} 