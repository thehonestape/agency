import React, { useState } from 'react';
import {
  Card,
  Grid,
  Title, 
  Text,
  Metric,
  Flex,
  Divider,
  Badge
} from '@/components/ui/tremor';
import { FiFolder, FiUsers, FiCheckCircle, FiPieChart, FiPlusCircle } from 'react-icons/fi';
import { DashboardLayout } from '@/components/layouts/DashboardLayout';
import { projects, artifacts } from '@/data/mock-data';
import { Project } from '@/types/project.types';
import { ProjectDashboard } from '@/components/patterns/dashboard/ProjectDashboard';

// Create a custom Bold component since it's not in our tremor exports
const Bold = ({ children }: { children: React.ReactNode }) => (
  <span className="font-medium">{children}</span>
);

export default function Dashboard() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header section */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
          <div>
            <Title>Dashboard</Title>
            <Text>Welcome back! Here's an overview of your agency projects.</Text>
          </div>
          <div className="mt-4 lg:mt-0">
            <button className="bg-primary text-white px-4 py-2 rounded-md flex items-center space-x-2">
              <FiPlusCircle className="w-5 h-5" />
              <span>New Project</span>
            </button>
          </div>
        </div>

        {/* Key metrics section */}
        <Grid numItemsSm={2} numItemsLg={4} className="gap-6">
          {/* Active Projects Card */}
          <Card decoration="top" decorationColor="primary">
            <Flex justifyContent="start" className="space-x-4">
              <div className="flex-1">
                <Text>Active Projects</Text>
                <Metric className="mt-1">{projects.filter((p: Project) => p.status === 'active').length}</Metric>
              </div>
              <div className="bg-primary/10 p-2 rounded-full">
                <FiFolder className="text-primary w-6 h-6" />
              </div>
            </Flex>
            <Divider />
            <Text className="text-xs text-muted-foreground">
              {projects.filter((p: Project) => p.status === 'active').length} active of {projects.length} total
            </Text>
          </Card>

          {/* Team Members Card */}
          <Card decoration="top" decorationColor="info">
            <Flex justifyContent="start" className="space-x-4">
              <div className="flex-1">
                <Text>Team Members</Text>
                <Metric className="mt-1">12</Metric>
              </div>
              <div className="bg-info/10 p-2 rounded-full">
                <FiUsers className="text-info w-6 h-6" />
              </div>
            </Flex>
            <Divider />
            <Text className="text-xs text-muted-foreground">
              <Bold>8</Bold> active in the last week
            </Text>
          </Card>

          {/* Pending Approvals Card */}
          <Card decoration="top" decorationColor="warning">
            <Flex justifyContent="start" className="space-x-4">
              <div className="flex-1">
                <Text>Pending Approvals</Text>
                <Metric className="mt-1">7</Metric>
              </div>
              <div className="bg-warning/10 p-2 rounded-full">
                <FiCheckCircle className="text-warning w-6 h-6" />
              </div>
            </Flex>
            <Divider />
            <Text className="text-xs text-muted-foreground">
              <Bold>3</Bold> high priority items
            </Text>
          </Card>

          {/* AI Usage Card */}
          <Card decoration="top" decorationColor="success">
            <Flex justifyContent="start" className="space-x-4">
              <div className="flex-1">
                <Text>AI Usage</Text>
                <Metric className="mt-1">89%</Metric>
              </div>
              <div className="bg-success/10 p-2 rounded-full">
                <FiPieChart className="text-success w-6 h-6" />
              </div>
            </Flex>
            <Divider />
            <Text className="text-xs text-muted-foreground">
              <Bold>21</Bold> AI generated artifacts this month
            </Text>
          </Card>
        </Grid>

        {/* Project dashboard section */}
        <div className="mt-6">
          <Card>
            <ProjectDashboard
              projects={projects}
              selectedProject={projects[0]}
              artifacts={artifacts}
              onSelectProject={(project: Project) => setSelectedProject(project)}
            />
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
} 