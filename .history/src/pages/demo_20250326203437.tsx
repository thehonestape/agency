import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../components/ui/Card'
import { Heading, Text } from '../components/ui/typography'
import { DashboardLayout } from '../components/layouts/DashboardLayout'
import { ThemeProvider } from '../lib/theme-context'
import { ThemeColorDisplay } from '../components/ui/ThemeColorDisplay'
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
        <div className="space-y-8">
          {/* Color System */}
          <section>
            <Heading as="h2" size="h2" className="mb-4">Color System</Heading>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {colorTokens.map((token) => (
                <Card key={token.name} className="p-4">
                  <div className={`h-24 rounded-md ${token.class} mb-2`} />
                  <Text className={token.textClass}>{token.name}</Text>
                </Card>
              ))}
            </div>
          </section>

          {/* Typography */}
          <section>
            <Heading as="h2" size="h2" className="mb-4">Typography</Heading>
            <div className="space-y-4">
              {typographyExamples.map((example) => (
                <div key={example.size} className="space-y-1">
                  <Heading as={example.size} size={example.size}>
                    {example.label}
                  </Heading>
                  <Text className="text-muted-foreground">{example.description}</Text>
                </div>
              ))}
            </div>
          </section>

          {/* Component Examples */}
          <section>
            <Heading as="h2" size="h2" className="mb-4">Component Examples</Heading>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle>Card Title</CardTitle>
                  <CardDescription>Card Description</CardDescription>
                </CardHeader>
                <CardContent>
                  <Text>This is a sample card component with proper theming.</Text>
                </CardContent>
              </Card>
            </div>
          </section>
        </div>
      </DashboardLayout>
    </ThemeProvider>
  )
} 