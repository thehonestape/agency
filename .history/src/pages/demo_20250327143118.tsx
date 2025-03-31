import { ThemeProvider } from '../lib/theme-context'
import { 
  BrandSidebarWithHeader,
  DarkNavWithWhitePageHeader,
  FullWidthThreeColumn
} from '../components/ui/shell'
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
  FiType as Type,
  FiEdit3 as Edit3,
  FiDroplet as Droplet,
  FiGrid as LayoutGrid,
  FiMenu as Menu,
  FiX as X
} from "react-icons/fi"
import { Button } from '../components/ui/button'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../components/ui/data-display/card'
import { Heading, Text } from '../components/ui/typography'
import { Input } from '../components/ui/form/input'
import { Label } from '../components/ui/form/label'
import { Select } from '../components/ui/form/select'
import { Switch } from '../components/ui/form/switch'
import { Alert } from '../components/ui/feedback/alert'
import { Toast } from '../components/ui/feedback/toast'

// Navigation items for shell layouts
const navigationItems = [
  {
    id: "dashboard",
    label: "Dashboard",
    href: "/dashboard",
    icon: <LayoutDashboard className="h-5 w-5" />,
    active: true
  },
  {
    id: "projects",
    label: "Projects",
    href: "/projects",
    icon: <FolderOpen className="h-5 w-5" />
  },
  {
    id: "team",
    label: "Team",
    href: "/team",
    icon: <Users className="h-5 w-5" />
  },
  {
    id: "calendar",
    label: "Calendar",
    href: "/calendar",
    icon: <Calendar className="h-5 w-5" />
  },
  {
    id: "documents",
    label: "Documents",
    href: "/documents",
    icon: <FileText className="h-5 w-5" />
  },
  {
    id: "reports",
    label: "Reports",
    href: "/reports",
    icon: <BarChart className="h-5 w-5" />
  }
]

const userNavigation = [
  { id: "profile", label: "Your Profile", href: "/profile" },
  { id: "settings", label: "Settings", href: "/settings" },
  { id: "signout", label: "Sign out", href: "/logout" }
]

// Example content for the three-column layout
const mainContent = (
  <div className="space-y-6">
    <div className="flex items-center justify-between">
      <div>
        <Heading variant="h1" size="4xl">Dashboard</Heading>
        <Text className="text-muted-foreground">Welcome back to your workspace</Text>
      </div>
      <Button>
        <Plus className="mr-2 h-4 w-4" />
        New Project
      </Button>
    </div>

    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
          <BarChart className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">$45,231.89</div>
          <p className="text-xs text-muted-foreground">+20.1% from last month</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Subscriptions</CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">+2350</div>
          <p className="text-xs text-muted-foreground">+180.1% from last month</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Sales</CardTitle>
          <Share2 className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">+12,234</div>
          <p className="text-xs text-muted-foreground">+19% from last month</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Active Now</CardTitle>
          <MessageCircle className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">+573</div>
          <p className="text-xs text-muted-foreground">+201 since last hour</p>
        </CardContent>
      </Card>
    </div>
  </div>
)

const rightSidebar = (
  <div className="space-y-6">
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex items-center gap-4">
              <div className="h-8 w-8 rounded-full bg-muted" />
              <div className="flex-1 space-y-1">
                <p className="text-sm font-medium">User {i}</p>
                <p className="text-sm text-muted-foreground">Completed task {i}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  </div>
)

export default function DemoPage() {
  return (
    <ThemeProvider defaultThemeId="salient">
      <div className="space-y-8">
        {/* Shell Layout Examples */}
        <section className="space-y-4">
          <div className="flex items-center gap-2">
            <LayoutDashboard className="h-5 w-5 text-muted-foreground" />
            <Heading variant="h2" size="3xl">Shell Layouts</Heading>
          </div>
          
          {/* Brand Sidebar Layout */}
          <Card>
            <CardHeader>
              <CardTitle>Brand Sidebar Layout</CardTitle>
              <CardDescription>A layout with a branded sidebar and header</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px] overflow-hidden rounded-lg border">
                <BrandSidebarWithHeader
                  navigation={{
                    type: "side",
                    items: navigationItems,
                    activeItem: "dashboard"
                  }}
                  title="Dashboard"
                  description="Welcome to your workspace"
                  layout={{
                    type: "sidebar",
                    sidebarWidth: "w-64"
                  }}
                  theme={{
                    colors: {
                      primary: {
                        50: '#eef2ff',
                        100: '#e0e7ff',
                        200: '#c7d2fe',
                        300: '#a5b4fc',
                        400: '#818cf8',
                        500: '#6366f1',
                        600: '#4f46e5',
                        700: '#4338ca',
                        800: '#3730a3',
                        900: '#312e81'
                      },
                      secondary: {
                        50: '#f9fafb',
                        100: '#f3f4f6',
                        200: '#e5e7eb',
                        300: '#d1d5db',
                        400: '#9ca3af',
                        500: '#6b7280',
                        600: '#4b5563',
                        700: '#374151',
                        800: '#1f2937',
                        900: '#111827'
                      },
                      accent: {
                        50: '#fdf2f8',
                        100: '#fce7f3',
                        200: '#fbcfe8',
                        300: '#f9a8d4',
                        400: '#f472b6',
                        500: '#ec4899',
                        600: '#db2777',
                        700: '#be185d',
                        800: '#9d174d',
                        900: '#831843'
                      },
                      background: {
                        default: '#ffffff',
                        paper: '#f9fafb',
                        inverse: '#111827',
                        subtle: '#f3f4f6',
                        muted: '#e5e7eb'
                      },
                      border: {
                        default: '#e5e7eb',
                        subtle: '#f3f4f6',
                        strong: '#d1d5db',
                        inverse: '#374151'
                      },
                      text: {
                        primary: '#111827',
                        secondary: '#4b5563',
                        disabled: '#9ca3af',
                        inverse: '#ffffff',
                        link: '#3b82f6'
                      },
                      error: {
                        50: '#fef2f2',
                        100: '#fee2e2',
                        200: '#fecaca',
                        300: '#fca5a5',
                        400: '#f87171',
                        500: '#ef4444',
                        600: '#dc2626',
                        700: '#b91c1c',
                        800: '#991b1b',
                        900: '#7f1d1d'
                      },
                      warning: {
                        50: '#fffbeb',
                        100: '#fef3c7',
                        200: '#fde68a',
                        300: '#fcd34d',
                        400: '#fbbf24',
                        500: '#f59e0b',
                        600: '#d97706',
                        700: '#b45309',
                        800: '#92400e',
                        900: '#78350f'
                      },
                      success: {
                        50: '#f0fdf4',
                        100: '#dcfce7',
                        200: '#bbf7d0',
                        300: '#86efac',
                        400: '#4ade80',
                        500: '#22c55e',
                        600: '#16a34a',
                        700: '#15803d',
                        800: '#166534',
                        900: '#14532d'
                      },
                      info: {
                        50: '#eff6ff',
                        100: '#dbeafe',
                        200: '#bfdbfe',
                        300: '#93c5fd',
                        400: '#60a5fa',
                        500: '#3b82f6',
                        600: '#2563eb',
                        700: '#1d4ed8',
                        800: '#1e40af',
                        900: '#1e3a8a'
                      }
                    }
                  }}
                  density="comfortable"
                >
                  <div className="p-6">
                    <Heading variant="h3" size="2xl">Main Content</Heading>
                    <Text className="mt-2">This is the main content area of the brand sidebar layout.</Text>
                  </div>
                </BrandSidebarWithHeader>
              </div>
            </CardContent>
          </Card>

          {/* Dark Nav Layout */}
          <Card>
            <CardHeader>
              <CardTitle>Dark Navigation Layout</CardTitle>
              <CardDescription>A layout with a dark navigation bar and white page header</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px] overflow-hidden rounded-lg border">
                <DarkNavWithWhitePageHeader
                  navigation={{
                    type: "top",
                    items: navigationItems,
                    activeItem: "dashboard"
                  }}
                  title="Dashboard"
                  description="Welcome to your workspace"
                  layout={{
                    type: "stacked"
                  }}
                  theme={{
                    colors: {
                      primary: {
                        50: '#f9fafb',
                        100: '#f3f4f6',
                        200: '#e5e7eb',
                        300: '#d1d5db',
                        400: '#9ca3af',
                        500: '#6b7280',
                        600: '#4b5563',
                        700: '#374151',
                        800: '#1f2937',
                        900: '#111827'
                      },
                      secondary: {
                        50: '#eef2ff',
                        100: '#e0e7ff',
                        200: '#c7d2fe',
                        300: '#a5b4fc',
                        400: '#818cf8',
                        500: '#6366f1',
                        600: '#4f46e5',
                        700: '#4338ca',
                        800: '#3730a3',
                        900: '#312e81'
                      },
                      accent: {
                        50: '#fdf2f8',
                        100: '#fce7f3',
                        200: '#fbcfe8',
                        300: '#f9a8d4',
                        400: '#f472b6',
                        500: '#ec4899',
                        600: '#db2777',
                        700: '#be185d',
                        800: '#9d174d',
                        900: '#831843'
                      },
                      background: {
                        default: '#ffffff',
                        paper: '#f9fafb',
                        inverse: '#111827',
                        subtle: '#f3f4f6',
                        muted: '#e5e7eb'
                      },
                      border: {
                        default: '#e5e7eb',
                        subtle: '#f3f4f6',
                        strong: '#d1d5db',
                        inverse: '#374151'
                      },
                      text: {
                        primary: '#111827',
                        secondary: '#4b5563',
                        disabled: '#9ca3af',
                        inverse: '#ffffff',
                        link: '#3b82f6'
                      },
                      error: {
                        50: '#fef2f2',
                        100: '#fee2e2',
                        200: '#fecaca',
                        300: '#fca5a5',
                        400: '#f87171',
                        500: '#ef4444',
                        600: '#dc2626',
                        700: '#b91c1c',
                        800: '#991b1b',
                        900: '#7f1d1d'
                      },
                      warning: {
                        50: '#fffbeb',
                        100: '#fef3c7',
                        200: '#fde68a',
                        300: '#fcd34d',
                        400: '#fbbf24',
                        500: '#f59e0b',
                        600: '#d97706',
                        700: '#b45309',
                        800: '#92400e',
                        900: '#78350f'
                      },
                      success: {
                        50: '#f0fdf4',
                        100: '#dcfce7',
                        200: '#bbf7d0',
                        300: '#86efac',
                        400: '#4ade80',
                        500: '#22c55e',
                        600: '#16a34a',
                        700: '#15803d',
                        800: '#166534',
                        900: '#14532d'
                      },
                      info: {
                        50: '#eff6ff',
                        100: '#dbeafe',
                        200: '#bfdbfe',
                        300: '#93c5fd',
                        400: '#60a5fa',
                        500: '#3b82f6',
                        600: '#2563eb',
                        700: '#1d4ed8',
                        800: '#1e40af',
                        900: '#1e3a8a'
                      }
                    }
                  }}
                  density="comfortable"
                >
                  <div className="p-6">
                    <Heading variant="h3" size="2xl">Main Content</Heading>
                    <Text className="mt-2">This is the main content area of the dark navigation layout.</Text>
                  </div>
                </DarkNavWithWhitePageHeader>
              </div>
            </CardContent>
          </Card>

          {/* Three Column Layout */}
          <Card>
            <CardHeader>
              <CardTitle>Three Column Layout</CardTitle>
              <CardDescription>A full-width layout with left sidebar, main content, and right sidebar</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px] overflow-hidden rounded-lg border">
                <FullWidthThreeColumn
                  navigation={{
                    type: "side",
                    items: navigationItems,
                    activeItem: "dashboard"
                  }}
                  title="Dashboard"
                  description="Welcome to your workspace"
                  layout={{
                    type: "multi-column",
                    columns: {
                      left: { width: "w-72" },
                      main: { width: "flex-1" },
                      right: { width: "w-72" }
                    }
                  }}
                  theme={{
                    colors: {
                      primary: {
                        50: '#eef2ff',
                        100: '#e0e7ff',
                        200: '#c7d2fe',
                        300: '#a5b4fc',
                        400: '#818cf8',
                        500: '#6366f1',
                        600: '#4f46e5',
                        700: '#4338ca',
                        800: '#3730a3',
                        900: '#312e81'
                      },
                      secondary: {
                        50: '#f9fafb',
                        100: '#f3f4f6',
                        200: '#e5e7eb',
                        300: '#d1d5db',
                        400: '#9ca3af',
                        500: '#6b7280',
                        600: '#4b5563',
                        700: '#374151',
                        800: '#1f2937',
                        900: '#111827'
                      },
                      accent: {
                        50: '#fdf2f8',
                        100: '#fce7f3',
                        200: '#fbcfe8',
                        300: '#f9a8d4',
                        400: '#f472b6',
                        500: '#ec4899',
                        600: '#db2777',
                        700: '#be185d',
                        800: '#9d174d',
                        900: '#831843'
                      },
                      background: {
                        default: '#ffffff',
                        paper: '#f9fafb',
                        inverse: '#111827',
                        subtle: '#f3f4f6',
                        muted: '#e5e7eb'
                      },
                      border: {
                        default: '#e5e7eb',
                        subtle: '#f3f4f6',
                        strong: '#d1d5db',
                        inverse: '#374151'
                      },
                      text: {
                        primary: '#111827',
                        secondary: '#4b5563',
                        disabled: '#9ca3af',
                        inverse: '#ffffff',
                        link: '#3b82f6'
                      },
                      error: {
                        50: '#fef2f2',
                        100: '#fee2e2',
                        200: '#fecaca',
                        300: '#fca5a5',
                        400: '#f87171',
                        500: '#ef4444',
                        600: '#dc2626',
                        700: '#b91c1c',
                        800: '#991b1b',
                        900: '#7f1d1d'
                      },
                      warning: {
                        50: '#fffbeb',
                        100: '#fef3c7',
                        200: '#fde68a',
                        300: '#fcd34d',
                        400: '#fbbf24',
                        500: '#f59e0b',
                        600: '#d97706',
                        700: '#b45309',
                        800: '#92400e',
                        900: '#78350f'
                      },
                      success: {
                        50: '#f0fdf4',
                        100: '#dcfce7',
                        200: '#bbf7d0',
                        300: '#86efac',
                        400: '#4ade80',
                        500: '#22c55e',
                        600: '#16a34a',
                        700: '#15803d',
                        800: '#166534',
                        900: '#14532d'
                      },
                      info: {
                        50: '#eff6ff',
                        100: '#dbeafe',
                        200: '#bfdbfe',
                        300: '#93c5fd',
                        400: '#60a5fa',
                        500: '#3b82f6',
                        600: '#2563eb',
                        700: '#1d4ed8',
                        800: '#1e40af',
                        900: '#1e3a8a'
                      }
                    }
                  }}
                  density="comfortable"
                >
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2">
                      {mainContent}
                    </div>
                    <div>
                      {rightSidebar}
                    </div>
                  </div>
                </FullWidthThreeColumn>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Component Examples */}
        <section className="space-y-4">
          <div className="flex items-center gap-2">
            <Box className="h-5 w-5 text-muted-foreground" />
            <Heading variant="h2" size="3xl">Component Examples</Heading>
          </div>

          {/* Form Components */}
          <Card>
            <CardHeader>
              <CardTitle>Form Components</CardTitle>
              <CardDescription>Examples of our form components</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input id="name" placeholder="Enter your name" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="role">Role</Label>
                <Select>
                  <option value="admin">Admin</option>
                  <option value="user">User</option>
                  <option value="guest">Guest</option>
                </Select>
              </div>
              <div className="flex items-center space-x-2">
                <Switch id="notifications" />
                <Label htmlFor="notifications">Enable notifications</Label>
              </div>
            </CardContent>
          </Card>

          {/* Feedback Components */}
          <Card>
            <CardHeader>
              <CardTitle>Feedback Components</CardTitle>
              <CardDescription>Examples of our feedback components</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <Alert variant="default">
                This is a default alert message.
              </Alert>
              <Alert variant="subtle">
                This is a subtle alert message.
              </Alert>
              <Toast>
                This is a toast notification.
              </Toast>
            </CardContent>
          </Card>
        </section>
      </div>
    </ThemeProvider>
  )
} 