import { useState, useEffect } from 'react';
import { 
  Card, 
  Title, 
  Text, 
  Tab, 
  TabGroup, 
  TabList, 
  TabPanel, 
  TabPanels,
  Grid,
  Metric,
  ProgressBar,
  Flex,
  AreaChart,
  DonutChart
} from '@tremor/react';
import { Calendar, Clock, FileType, Layers, Users } from 'lucide-react';
import { Button } from '../components/ui/button';
import { ThemeProvider } from '../lib/theme-context';
import { DashboardCard } from '../components/dashboard/DashboardCard';
import { DashboardGrid } from '../components/dashboard/DashboardGrid';

// Placeholder data for designer dashboards
const designProjects = [
  { id: 1, name: 'Brand Refresh - Acme Inc', status: 'In Progress', completion: 65, deadline: '2023-05-15', collaborators: 3, client: 'Acme Inc' },
  { id: 2, name: 'Website Redesign - TechStart', status: 'Review', completion: 80, deadline: '2023-05-20', collaborators: 4, client: 'TechStart' },
  { id: 3, name: 'App Interface - HealthMobile', status: 'Planning', completion: 25, deadline: '2023-06-10', collaborators: 2, client: 'HealthMobile' },
  { id: 4, name: 'Marketing Campaign - FitGear', status: 'Completed', completion: 100, deadline: '2023-04-30', collaborators: 5, client: 'FitGear' },
];

const designAssets = [
  { id: 1, name: 'Logo Variations', type: 'Vector', created: '2023-04-28', size: '2.4MB', project: 'Acme Inc' },
  { id: 2, name: 'Brand Guidelines', type: 'PDF', created: '2023-04-29', size: '5.8MB', project: 'Acme Inc' },
  { id: 3, name: 'Website Mockups', type: 'Figma', created: '2023-05-01', size: '12MB', project: 'TechStart' },
  { id: 4, name: 'Social Media Templates', type: 'PSD', created: '2023-05-02', size: '18MB', project: 'FitGear' },
  { id: 5, name: 'App Icons', type: 'Vector', created: '2023-05-03', size: '1.2MB', project: 'HealthMobile' },
];

const timeTracking = [
  { date: '2023-04-27', hours: 5.5 },
  { date: '2023-04-28', hours: 6.2 },
  { date: '2023-04-29', hours: 7.8 },
  { date: '2023-04-30', hours: 4.5 },
  { date: '2023-05-01', hours: 8.0 },
  { date: '2023-05-02', hours: 7.2 },
  { date: '2023-05-03', hours: 6.8 },
];

const projectDistribution = [
  { name: 'Branding', value: 35 },
  { name: 'Web Design', value: 30 },
  { name: 'UI/UX', value: 20 },
  { name: 'Print', value: 15 },
];

export default function DesignerDashboard() {
  const [selectedTab, setSelectedTab] = useState(0);
  const [selectedTheme, setSelectedTheme] = useState('wrkhrsco');
  
  // Calculate project stats
  const totalProjects = designProjects.length;
  const activeProjects = designProjects.filter(p => p.status !== 'Completed').length;
  const completedProjects = designProjects.filter(p => p.status === 'Completed').length;
  
  // Calculate time tracking totals
  const totalHours = timeTracking.reduce((sum, day) => sum + day.hours, 0);
  const avgHoursPerDay = totalHours / timeTracking.length;
  
  return (
    <ThemeProvider defaultThemeId="salient">
      <div className="min-h-screen bg-background">
        {/* Header */}
        <header className="px-6 py-4 border-b border-[var(--border)] flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-[var(--foreground)]">Designer Dashboard</h1>
            <p className="text-[var(--muted-foreground)]">Manage your design projects and assets</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" size="sm">
              <Clock className="h-4 w-4 mr-2" />
              Start Timer
            </Button>
            <Button size="sm">
              <FileType className="h-4 w-4 mr-2" />
              New Project
            </Button>
          </div>
        </header>
        
        {/* Main Content */}
        <main className="flex-1 p-6">
          {/* Overview Section */}
          <section className="mb-6">
            <DashboardGrid>
              <DashboardCard title="Active Projects" value={activeProjects.toString()} icon={<Layers className="h-6 w-6 text-primary" />} />
              <DashboardCard title="Completed Projects" value={completedProjects.toString()} icon={<FileType className="h-6 w-6 text-success" />} />
              <DashboardCard title="Total Collaborators" value="14" icon={<Users className="h-6 w-6 text-info" />} />
              <DashboardCard title="Hours This Week" value={totalHours.toFixed(1)} icon={<Clock className="h-6 w-6 text-accent" />} />
            </DashboardGrid>
          </section>
          
          {/* Tabs Section */}
          <TabGroup className="mt-6" onIndexChange={setSelectedTab}>
            <TabList variant="solid" color="indigo">
              <Tab>Projects</Tab>
              <Tab>Assets</Tab>
              <Tab>Time Tracking</Tab>
              <Tab>Analytics</Tab>
            </TabList>
            
            <TabPanels>
              {/* Projects Tab */}
              <TabPanel>
                <div className="mt-6">
                  <div className="flex justify-between items-center mb-4">
                    <Title>Current Projects</Title>
                    <Button variant="outline" size="sm">View All</Button>
                  </div>
                  
                  <Grid numItemsMd={2} numItemsLg={2} className="gap-6 mt-6">
                    {designProjects.map((project) => (
                      <Card key={project.id} className="p-4 hover:shadow-md transition-shadow">
                        <div className="flex justify-between items-start">
                          <div>
                            <Text className="text-muted-foreground">{project.client}</Text>
                            <Title className="text-lg font-medium mt-1">{project.name}</Title>
                          </div>
                          <div className="px-2 py-1 rounded-full text-xs font-medium" 
                            style={{ 
                              backgroundColor: 
                                project.status === 'Completed' ? 'var(--success-50)' : 
                                project.status === 'In Progress' ? 'var(--primary-50)' : 
                                project.status === 'Review' ? 'var(--info-50)' :
                                'var(--warning-50)',
                              color: 
                                project.status === 'Completed' ? 'var(--success)' : 
                                project.status === 'In Progress' ? 'var(--primary)' : 
                                project.status === 'Review' ? 'var(--info)' :
                                'var(--warning)'
                            }}>
                            {project.status}
                          </div>
                        </div>
                        
                        <div className="mt-4">
                          <div className="flex justify-between items-center mb-2">
                            <Text className="text-sm">Progress</Text>
                            <Text className="text-sm font-medium">{project.completion}%</Text>
                          </div>
                          <ProgressBar value={project.completion} color={
                            project.completion < 30 ? "amber" : 
                            project.completion < 70 ? "blue" : 
                            "emerald"
                          } />
                        </div>
                        
                        <div className="flex justify-between mt-4 text-sm text-muted-foreground">
                          <div className="flex items-center">
                            <Calendar className="h-4 w-4 mr-1" />
                            <span>Due: {project.deadline}</span>
                          </div>
                          <div className="flex items-center">
                            <Users className="h-4 w-4 mr-1" />
                            <span>{project.collaborators} team members</span>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </Grid>
                </div>
              </TabPanel>
              
              {/* Assets Tab */}
              <TabPanel>
                <div className="mt-6">
                  <div className="flex justify-between items-center mb-4">
                    <Title>Recent Assets</Title>
                    <Button variant="outline" size="sm">Upload New</Button>
                  </div>
                  
                  <Card>
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b border-border">
                            <th className="text-left py-3 px-4 font-medium">Name</th>
                            <th className="text-left py-3 px-4 font-medium">Type</th>
                            <th className="text-left py-3 px-4 font-medium">Project</th>
                            <th className="text-left py-3 px-4 font-medium">Created</th>
                            <th className="text-left py-3 px-4 font-medium">Size</th>
                            <th className="text-right py-3 px-4 font-medium">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {designAssets.map((asset) => (
                            <tr key={asset.id} className="border-b border-border hover:bg-muted/50">
                              <td className="py-3 px-4">{asset.name}</td>
                              <td className="py-3 px-4">{asset.type}</td>
                              <td className="py-3 px-4">{asset.project}</td>
                              <td className="py-3 px-4">{asset.created}</td>
                              <td className="py-3 px-4">{asset.size}</td>
                              <td className="py-3 px-4 text-right">
                                <Button variant="ghost" size="sm">View</Button>
                                <Button variant="ghost" size="sm">Download</Button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </Card>
                </div>
              </TabPanel>
              
              {/* Time Tracking Tab */}
              <TabPanel>
                <div className="mt-6">
                  <Grid numItemsMd={2} numItemsLg={2} className="gap-6">
                    <Card className="p-4">
                      <Title>Hours Logged</Title>
                      <div className="mt-4">
                        <AreaChart
                          className="h-72 mt-4"
                          data={timeTracking}
                          index="date"
                          categories={["hours"]}
                          colors={["purple"]}
                          valueFormatter={(value) => `${value.toFixed(1)}h`}
                          showLegend={false}
                        />
                      </div>
                    </Card>
                    
                    <Card className="p-4">
                      <Title>Time Summary</Title>
                      <div className="mt-8 space-y-6">
                        <div>
                          <Text className="text-muted-foreground">Total Hours This Week</Text>
                          <Metric>{totalHours.toFixed(1)} hours</Metric>
                        </div>
                        <div>
                          <Text className="text-muted-foreground">Average Daily Hours</Text>
                          <Metric>{avgHoursPerDay.toFixed(1)} hours</Metric>
                        </div>
                        <div>
                          <Text className="text-muted-foreground">Most Productive Day</Text>
                          <Metric>Monday (8.0 hours)</Metric>
                        </div>
                      </div>
                    </Card>
                  </Grid>
                </div>
              </TabPanel>
              
              {/* Analytics Tab */}
              <TabPanel>
                <div className="mt-6">
                  <Grid numItemsMd={2} numItemsLg={2} className="gap-6">
                    <Card className="p-4">
                      <Title>Project Type Distribution</Title>
                      <div className="mt-4">
                        <DonutChart
                          className="h-60 mt-8"
                          data={projectDistribution}
                          category="value"
                          index="name"
                          colors={["indigo", "violet", "fuchsia", "rose"]}
                          valueFormatter={(value) => `${value}%`}
                        />
                      </div>
                    </Card>
                    
                    <Card className="p-4">
                      <Title>Project Statistics</Title>
                      <div className="mt-8 space-y-6">
                        <div>
                          <Text className="text-muted-foreground">Average Project Completion</Text>
                          <Metric>
                            {(designProjects.reduce((sum, p) => sum + p.completion, 0) / designProjects.length).toFixed(0)}%
                          </Metric>
                          <ProgressBar 
                            value={designProjects.reduce((sum, p) => sum + p.completion, 0) / designProjects.length} 
                            className="mt-2"
                            color="purple"
                          />
                        </div>
                        <div>
                          <Text className="text-muted-foreground">Projects On Schedule</Text>
                          <Metric>75%</Metric>
                          <ProgressBar value={75} className="mt-2" color="emerald" />
                        </div>
                        <div>
                          <Text className="text-muted-foreground">Client Satisfaction</Text>
                          <Metric>92%</Metric>
                          <ProgressBar value={92} className="mt-2" color="blue" />
                        </div>
                      </div>
                    </Card>
                  </Grid>
                </div>
              </TabPanel>
            </TabPanels>
          </TabGroup>
        </main>
        
        {/* Footer */}
        <footer className="px-6 py-4 border-t border-[var(--border)]">
          <div className="flex justify-between items-center">
            <Text className="text-sm text-[var(--muted-foreground)]">© 2023 Workhorse Co.</Text>
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm">Help</Button>
              <Button variant="ghost" size="sm">Documentation</Button>
              <Button variant="ghost" size="sm">Settings</Button>
            </div>
          </div>
        </footer>
      </div>
    </ThemeProvider>
  );
} 