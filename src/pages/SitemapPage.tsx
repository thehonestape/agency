import React from 'react';
import { DashboardLayout } from '../components/layouts/DashboardLayout';
import { Heading, Text } from '../components/ui/typography';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../components/ui/Card';
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
    href: "/sitemap",
    icon: Layout,
  },
  {
    name: "Editor",
    href: "/sitemap/editor",
    icon: Activity,
  },
  {
    name: "Generator",
    href: "/sitemap/generator",
    icon: BarChart,
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

export default function SitemapPage() {
  return (
    <DashboardLayout
      navigation={navigation}
      sections={sections}
    >
      <div className="space-y-8">
        <section>
          <div className="flex items-center justify-between">
            <div>
              <Heading as="h1" size="h1">Sitemap Overview</Heading>
              <Text className="text-muted-foreground">Manage your website structure</Text>
            </div>
          </div>
        </section>

        <section>
          <Card>
            <CardHeader>
              <CardTitle>Site Structure</CardTitle>
              <CardDescription>Overview of your website's organization</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <Text className="font-medium">Total Pages</Text>
                  <Text className="text-muted-foreground">24</Text>
                </div>
                <div>
                  <Text className="font-medium">Categories</Text>
                  <Text className="text-muted-foreground">5</Text>
                </div>
                <div>
                  <Text className="font-medium">Last Updated</Text>
                  <Text className="text-muted-foreground">2 hours ago</Text>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </DashboardLayout>
  );
} 