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
    href: "/catalyst",
    icon: Layout,
  },
  {
    name: "Team",
    href: "/catalyst/team",
    icon: Users,
  },
  {
    name: "Analytics",
    href: "/catalyst/analytics",
    icon: BarChart,
  },
  {
    name: "Calendar",
    href: "/catalyst/calendar",
    icon: Calendar,
  },
  {
    name: "Settings",
    href: "/catalyst/settings",
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

export default function CatalystDemo() {
  return (
    <DashboardLayout
      navigation={navigation}
      sections={sections}
    >
      <div className="space-y-8">
        <section>
          <div className="flex items-center justify-between">
            <div>
              <Heading as="h1" size="h1">Catalyst Demo</Heading>
              <Text className="text-muted-foreground">Explore the Catalyst system</Text>
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
                <CardTitle>Getting Started</CardTitle>
                <CardDescription>Quick start guide</CardDescription>
              </CardHeader>
              <CardContent>
                <Text className="text-sm text-muted-foreground">
                  Follow these steps to get started with Catalyst:
                </Text>
                <ol className="mt-4 space-y-2 text-sm">
                  <li className="flex items-center">
                    <span className="mr-2">1.</span>
                    <Text>Set up your profile</Text>
                  </li>
                  <li className="flex items-center">
                    <span className="mr-2">2.</span>
                    <Text>Configure your preferences</Text>
                  </li>
                  <li className="flex items-center">
                    <span className="mr-2">3.</span>
                    <Text>Start adding your projects</Text>
                  </li>
                </ol>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Your latest updates</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                      <Users className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <Text className="font-medium">Welcome to Catalyst</Text>
                      <Text className="text-sm text-muted-foreground">Get started by exploring the features</Text>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>Common tasks</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Button variant="outline" className="w-full justify-start">
                    <Layout className="mr-2 h-4 w-4" />
                    Create Project
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Users className="mr-2 h-4 w-4" />
                    Invite Team
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Settings className="mr-2 h-4 w-4" />
                    Settings
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
    </DashboardLayout>
  );
} 