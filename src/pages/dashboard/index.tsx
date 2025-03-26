import { useState } from 'react';
import { Card, Grid, Title, Text, Button, Metric, Flex, Bold, Divider, Badge } from '@tremor/react';
import { 
  FiUsers, 
  FiCheckSquare, 
  FiFolder, 
  FiPlusCircle,
  FiCpu 
} from 'react-icons/fi';
import { DashboardLayout } from '../../components/layouts/DashboardLayout';
import { ProjectDashboard } from '../../components/ProjectDashboard';
// Mock data
import { projects, artifacts } from '@/data/mock-data';
import { Project, Artifact } from '../../types/project.types';

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
            <Button icon={FiPlusCircle}>
              New Project
            </Button>
          </div>
        </div>

        {/* Key metrics section */}
        <Grid numItemsSm={2} numItemsLg={4} className="gap-6">
          {/* Active Projects Card */}
          <Card decoration="top" decorationColor="blue">
            <Flex justifyContent="start" className="space-x-4">
              <div className="flex-1">
                <Text>Active Projects</Text>
                <Metric className="mt-1">{projects.filter((p: Project) => p.status === 'active').length}</Metric>
              </div>
              <div className="bg-blue-100 dark:bg-blue-900/30 p-2 rounded-full">
                <FiFolder className="text-blue-700 dark:text-blue-400 w-6 h-6" />
              </div>
            </Flex>
            <Divider />
            <Text className="text-xs text-gray-600 dark:text-gray-400">
              {projects.filter((p: Project) => p.status === 'active').length} active of {projects.length} total
            </Text>
          </Card>

          {/* Team Members Card */}
          <Card decoration="top" decorationColor="indigo">
            <Flex justifyContent="start" className="space-x-4">
              <div className="flex-1">
                <Text>Team Members</Text>
                <Metric className="mt-1">8</Metric>
              </div>
              <div className="bg-indigo-100 dark:bg-indigo-900/30 p-2 rounded-full">
                <FiUsers className="text-indigo-700 dark:text-indigo-400 w-6 h-6" />
              </div>
            </Flex>
            <Divider />
            <Text className="text-xs text-gray-600 dark:text-gray-400">
              6 active, 2 on leave
            </Text>
          </Card>

          {/* Pending Approvals Card */}
          <Card decoration="top" decorationColor="amber">
            <Flex justifyContent="start" className="space-x-4">
              <div className="flex-1">
                <Text>Pending Approvals</Text>
                <Metric className="mt-1">{artifacts.filter((a: Artifact) => a.status === 'review').length}</Metric>
              </div>
              <div className="bg-amber-100 dark:bg-amber-900/30 p-2 rounded-full">
                <FiCheckSquare className="text-amber-700 dark:text-amber-400 w-6 h-6" />
              </div>
            </Flex>
            <Divider />
            <Text className="text-xs text-gray-600 dark:text-gray-400">
              {artifacts.filter((a: Artifact) => a.status === 'review' && new Date(a.updatedAt) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)).length} new this week
            </Text>
          </Card>

          {/* AI Usage Card */}
          <Card decoration="top" decorationColor="green">
            <Flex justifyContent="start" className="space-x-4">
              <div className="flex-1">
                <Text>AI Usage</Text>
                <Metric className="mt-1">234</Metric>
              </div>
              <div className="bg-green-100 dark:bg-green-900/30 p-2 rounded-full">
                <FiCpu className="text-green-700 dark:text-green-400 w-6 h-6" />
              </div>
            </Flex>
            <Divider />
            <Text className="text-xs text-gray-600 dark:text-gray-400">
              <Bold className="text-green-600 dark:text-green-400">+12%</Bold> from last month
            </Text>
          </Card>
        </Grid>

        {/* Project dashboard section */}
        <ProjectDashboard 
          projects={projects} 
          artifacts={artifacts}
          selectedProject={selectedProject}
          onSelectProject={(project: Project) => setSelectedProject(project)}
        />
      </div>
    </DashboardLayout>
  );
} 