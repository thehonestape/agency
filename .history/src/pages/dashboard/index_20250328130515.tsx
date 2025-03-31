import { useState } from 'react';
import { 
  Card, 
  Grid, 
  Title, 
  Text, 
  Button, 
  Metric, 
  Flex, 
  Divider 
} from '@/components/ui/tremor';
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

// For Bold, we'll use a simple span since it's not in our tremor exports
const Bold = ({ children, className = '' }: { children: React.ReactNode, className?: string }) => (
  <span className={`font-bold ${className}`}>{children}</span>
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
            <Button icon={FiPlusCircle} color="primary">
              New Project
            </Button>
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
                <Metric className="mt-1">8</Metric>
              </div>
              <div className="bg-info/10 p-2 rounded-full">
                <FiUsers className="text-info w-6 h-6" />
              </div>
            </Flex>
            <Divider />
            <Text className="text-xs text-muted-foreground">
              6 active, 2 on leave
            </Text>
          </Card>

          {/* Pending Approvals Card */}
          <Card decoration="top" decorationColor="warning">
            <Flex justifyContent="start" className="space-x-4">
              <div className="flex-1">
                <Text>Pending Approvals</Text>
                <Metric className="mt-1">{artifacts.filter((a: Artifact) => a.status === 'review').length}</Metric>
              </div>
              <div className="bg-warning/10 p-2 rounded-full">
                <FiCheckSquare className="text-warning w-6 h-6" />
              </div>
            </Flex>
            <Divider />
            <Text className="text-xs text-muted-foreground">
              {artifacts.filter((a: Artifact) => a.status === 'review' && new Date(a.updatedAt) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)).length} new this week
            </Text>
          </Card>

          {/* AI Usage Card */}
          <Card decoration="top" decorationColor="success">
            <Flex justifyContent="start" className="space-x-4">
              <div className="flex-1">
                <Text>AI Usage</Text>
                <Metric className="mt-1">234</Metric>
              </div>
              <div className="bg-success/10 p-2 rounded-full">
                <FiCpu className="text-success w-6 h-6" />
              </div>
            </Flex>
            <Divider />
            <Text className="text-xs text-muted-foreground">
              <Bold className="text-success">+12%</Bold> from last month
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