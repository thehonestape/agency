import React from "react";
import { useParams } from "react-router-dom";
import { DashboardLayout } from "../components/layouts/DashboardLayout";
import { Heading, Text } from "../components/ui/typography";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "../components/ui/Card";
import { 
  FiLayout as LayoutDashboard,
  FiFolder as FolderOpen,
  FiSettings as Settings,
  FiUsers as Users,
  FiActivity as Activity
} from "react-icons/fi";

// Navigation sections
const navigation = [
  {
    name: "Overview",
    href: "/projects/:id",
    icon: LayoutDashboard,
  },
  {
    name: "Files",
    href: "/projects/:id/files",
    icon: FolderOpen,
  },
  {
    name: "Settings",
    href: "/projects/:id/settings",
    icon: Settings,
  }
];

const sections = [
  {
    title: "Team",
    items: [
      {
        name: "Members",
        href: "/projects/:id/team",
        icon: Users,
      },
      {
        name: "Activity",
        href: "/projects/:id/activity",
        icon: Activity,
      }
    ]
  }
];

export default function ProjectView() {
  const { id } = useParams();

  return (
    <DashboardLayout
      navigation={navigation}
      sections={sections}
    >
      <div className="space-y-8">
        <section>
          <Heading as="h1" size="h1">Project Overview</Heading>
          <Text className="text-muted-foreground">Project ID: {id}</Text>
        </section>

        <section>
          <Card>
            <CardHeader>
              <CardTitle>Project Details</CardTitle>
              <CardDescription>Basic information about the project</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <Text className="font-medium">Status</Text>
                  <Text className="text-muted-foreground">In Progress</Text>
                </div>
                <div>
                  <Text className="font-medium">Created</Text>
                  <Text className="text-muted-foreground">January 1, 2024</Text>
                </div>
                <div>
                  <Text className="font-medium">Last Updated</Text>
                  <Text className="text-muted-foreground">January 15, 2024</Text>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </DashboardLayout>
  );
} 