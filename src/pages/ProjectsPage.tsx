import React from "react";
import { DashboardLayout } from "../components/layouts/DashboardLayout";
import { Heading, Text } from "../components/ui/typography";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "../components/ui/Card";
import { Button } from "../components/ui/button";
import { 
  FiFolder as FolderOpen,
  FiPlus as Plus,
  FiUsers as Users,
  FiCalendar as Calendar,
  FiBarChart2 as BarChart
} from "react-icons/fi";

// Navigation sections
const navigation = [
  {
    name: "All Projects",
    href: "/projects",
    icon: FolderOpen,
  },
  {
    name: "Team",
    href: "/projects/team",
    icon: Users,
  },
  {
    name: "Calendar",
    href: "/projects/calendar",
    icon: Calendar,
  },
  {
    name: "Analytics",
    href: "/projects/analytics",
    icon: BarChart,
  }
];

const sections = [
  {
    title: "Quick Actions",
    items: [
      {
        name: "New Project",
        href: "/projects/new",
        icon: Plus,
      }
    ]
  }
];

export default function ProjectsPage() {
  return (
    <DashboardLayout
      navigation={navigation}
      sections={sections}
    >
      <div className="space-y-8">
        <section>
          <div className="flex items-center justify-between">
            <div>
              <Heading as="h1" size="h1">Projects</Heading>
              <Text className="text-muted-foreground">Manage and track your projects</Text>
            </div>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              New Project
            </Button>
          </div>
        </section>

        <section>
          <Card>
            <CardHeader>
              <CardTitle>Recent Projects</CardTitle>
              <CardDescription>Your most recently accessed projects</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-4">
                    <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <FolderOpen className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <Text className="font-medium">Website Redesign</Text>
                      <Text className="text-sm text-muted-foreground">Last updated 2 days ago</Text>
                    </div>
                  </div>
                  <Button variant="ghost">View</Button>
                </div>
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-4">
                    <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <FolderOpen className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <Text className="font-medium">Mobile App Development</Text>
                      <Text className="text-sm text-muted-foreground">Last updated 5 days ago</Text>
                    </div>
                  </div>
                  <Button variant="ghost">View</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </DashboardLayout>
  );
} 