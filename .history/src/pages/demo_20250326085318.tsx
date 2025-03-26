import { Card, Sidebar } from '../component-system'
import { Heading, Text } from '../components/ui/typography'
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
  FiFlag as Flag,
  FiTarget as Target,
  FiImage as Image,
  FiArchive as Archive,
  FiMap as Map,
  FiFileText as FileText,
  FiPlus as Plus,
  FiStar as Star,
  FiGrid as LayoutGrid,
  FiType as Typography,
  FiEdit3 as Paintbrush,
  FiDroplet as Droplet
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
    name: "Brand Builder",
    href: "/brands/builder",
    icon: Layers,
    count: "12"
  },
  {
    name: "Assets",
    href: "/assets",
    icon: Image,
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
    title: "Brand Framework",
    items: [
      {
        name: "Brands",
        href: "/brands",
        icon: Palette
      },
      {
        name: "Workhorse Brand",
        href: "/brands/workhorse",
        icon: Layers
      },
      {
        name: "Brand Analytics",
        href: "/brand-analytics",
        icon: BarChart
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
        name: "Catalyst UI",
        href: "/catalyst-demo",
        icon: Box
      },
      {
        name: "Themed UI",
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
        name: "Style Tile",
        href: "/style-tile",
        icon: Palette
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
      },
      {
        name: "Sitemap",
        href: "/sitemap",
        icon: Map
      }
    ]
  }
]

export default function DemoPage() {
  return (
    <div className="flex h-screen bg-background">
      <Sidebar 
        navigation={navigation}
        sections={sections}
        variant="default"
        size="default"
        mobile="overlay"
      />
      <main className="flex-1 overflow-y-auto p-6">
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
      </main>
    </div>
  )
} 