import React from 'react';
import { SideNav } from '../components/patterns/navigation/SideNav';
import { TopBar } from '../components/patterns/navigation/TopBar';
import { ProjectDashboard } from '../components/patterns/dashboard/ProjectDashboard';
import { AIUsageDashboard } from '../components/patterns/dashboard/AIUsageDashboard';
import { AIAnalyticsDashboard } from '../components/patterns/dashboard/AIAnalyticsDashboard';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../components/ui/Card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { FiHome, FiFolder, FiUsers, FiSettings, FiActivity, FiBell } from 'react-icons/fi';

// Mock data for the dashboard
const mockProject = {
  id: '1',
  name: 'Sample Project',
  clientId: 'client1',
  description: 'A sample project for demonstration',
  currentPhase: 'discovery' as const,
  startDate: new Date(),
  targetCompletionDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
  status: 'active' as const,
  createdAt: new Date(),
  updatedAt: new Date()
};

const mockProjects = [mockProject];

const mockArtifacts = [
  {
    id: '1',
    phaseId: 'discovery-1',
    name: 'Project Brief',
    status: 'approved' as const,
    createdAt: new Date(),
    updatedAt: new Date(),
    projectId: '1',
    artifactType: 'document' as const,
    version: 1,
    createdById: 'user1'
  }
];

// Define navigation items for the sidebar
const navItems = [
  {
    label: 'Main Navigation',
    items: [
      { label: 'Dashboard', href: '/dashboard', active: true },
      { label: 'Projects', href: '/dashboard/projects' },
      { label: 'Team', href: '/dashboard/team' },
      { label: 'Analytics', href: '/dashboard/analytics' },
      { label: 'Settings', href: '/dashboard/settings' }
    ]
  },
  {
    label: 'Notifications',
    items: [
      { label: 'Messages', href: '/dashboard/messages' },
      { label: 'Alerts', href: '/dashboard/alerts' }
    ]
  }
];

// User profile section for the top bar
const userProfile = (
  <div className="flex items-center space-x-4">
    <button 
      className="p-1 rounded-full text-muted-foreground hover:text-foreground"
      aria-label="View notifications"
    >
      <FiBell className="w-6 h-6" />
    </button>
    <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center">
      <span className="font-medium text-sm text-foreground">AB</span>
    </div>
  </div>
);

const DashboardPage: React.FC = () => {
  return (
    <div className="flex h-screen bg-background">
      <SideNav items={navItems} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <TopBar title="Dashboard Overview" rightContent={userProfile} />
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          <div className="grid gap-6">
            <Tabs defaultValue="overview" className="space-y-6">
              <TabsList>
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="projects">Projects</TabsTrigger>
                <TabsTrigger value="analytics">Analytics</TabsTrigger>
              </TabsList>
              
              <TabsContent value="overview" className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Project Status</CardTitle>
                      <CardDescription>Overview of your current projects</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ProjectDashboard 
                        projects={mockProjects}
                        selectedProject={mockProject}
                        artifacts={mockArtifacts}
                        onSelectProject={() => {}}
                      />
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle>AI Usage</CardTitle>
                      <CardDescription>Overview of your AI usage</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <AIUsageDashboard usage={undefined} />
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
              
              <TabsContent value="projects" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Project Dashboard</CardTitle>
                    <CardDescription>Detailed view of your projects</CardDescription>
                  </CardHeader>
                  <CardContent className="h-[600px]">
                    <ProjectDashboard 
                      projects={mockProjects}
                      selectedProject={mockProject}
                      artifacts={mockArtifacts}
                      onSelectProject={() => {}}
                    />
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="analytics" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>AI Analytics</CardTitle>
                    <CardDescription>Detailed analytics of your AI usage</CardDescription>
                  </CardHeader>
                  <CardContent className="h-[600px]">
                    <AIAnalyticsDashboard userId="user1" />
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardPage; 