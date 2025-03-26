import React from "react";
import { DashboardLayout } from "../components/layouts/DashboardLayout";
import { Heading, Text } from "../components/ui/typography";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "../components/ui/Card";
import { Button } from "../components/ui/button";
import { 
  FiLayout as Layout,
  FiUsers as Users,
  FiSettings as Settings,
  FiActivity as Activity,
  FiBarChart as BarChart,
  FiCalendar as Calendar,
  FiBell as Bell,
  FiMail as Mail
} from "react-icons/fi";

// Navigation sections
const navigation = [
  {
    name: "Overview",
    href: "/theme",
    icon: Layout,
  },
  {
    name: "Colors",
    href: "/theme/colors",
    icon: Activity,
  },
  {
    name: "Typography",
    href: "/theme/typography",
    icon: Users,
  },
  {
    name: "Components",
    href: "/theme/components",
    icon: BarChart,
  },
  {
    name: "Settings",
    href: "/theme/settings",
    icon: Settings,
  }
];

const sections = [
  {
    title: "Notifications",
    items: [
      {
        name: "Messages",
        href: "#",
        icon: Mail,
      },
      {
        name: "Alerts",
        href: "#",
        icon: Bell,
      }
    ]
  }
];

export default function ThemeDemo() {
  return (
    <DashboardLayout
      navigation={navigation}
      sections={sections}
    >
      <div className="space-y-8">
        <section>
          <div className="flex items-center justify-between">
            <div>
              <Heading as="h1" size="h1">Theme Demo</Heading>
              <Text className="text-muted-foreground">Explore the theme system</Text>
            </div>
            <Button>
              <Activity className="mr-2 h-4 w-4" />
              View Activity
            </Button>
          </div>
        </section>

        <section>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Color System</CardTitle>
                <CardDescription>Explore the color palette</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="h-24 rounded-md bg-primary" />
                  <div className="h-24 rounded-md bg-secondary" />
                  <div className="h-24 rounded-md bg-accent" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Typography</CardTitle>
                <CardDescription>Text styles and hierarchy</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Heading as="h1" size="h1">Heading 1</Heading>
                  <Heading as="h2" size="h2">Heading 2</Heading>
                  <Heading as="h3" size="h3">Heading 3</Heading>
                  <Text>Regular text</Text>
                  <Text className="text-muted-foreground">Muted text</Text>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Components</CardTitle>
                <CardDescription>UI component examples</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Button>Default Button</Button>
                  <Button variant="secondary">Secondary Button</Button>
                  <Button variant="outline">Outline Button</Button>
                  <Button variant="ghost">Ghost Button</Button>
                  <Button variant="link">Link Button</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
    </DashboardLayout>
  );
} 