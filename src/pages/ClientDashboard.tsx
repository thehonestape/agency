import { useState } from 'react';
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
  AreaChart,
  BarChart
} from '@tremor/react';
import { Calendar, FileText, MessageSquare, CreditCard, Clock, FileCheck, AlertCircle } from 'lucide-react';
import { Button } from '../components/ui/button';
import { ThemeProvider } from '../lib/theme-context';
import { DashboardCard } from '../components/dashboard/DashboardCard';
import { DashboardGrid } from '../components/dashboard/DashboardGrid';

// Placeholder data for client dashboards
const clientProjects = [
  { id: 1, name: 'Brand Refresh', status: 'In Progress', completion: 65, deadline: '2023-05-15', designer: 'Alex Morgan', lastUpdate: '2 days ago' },
  { id: 2, name: 'Website Redesign', status: 'Review', completion: 80, deadline: '2023-05-20', designer: 'Sam Taylor', lastUpdate: '1 day ago' },
  { id: 3, name: 'App Interface', status: 'Planning', completion: 25, deadline: '2023-06-10', designer: 'Jamie Smith', lastUpdate: '5 days ago' },
];

const clientInvoices = [
  { id: 1, number: 'INV-001', date: '2023-04-15', amount: 1500.00, status: 'Paid', project: 'Brand Refresh' },
  { id: 2, number: 'INV-002', date: '2023-04-30', amount: 2200.00, status: 'Pending', project: 'Website Redesign' },
  { id: 3, number: 'INV-003', date: '2023-05-02', amount: 800.00, status: 'Paid', project: 'App Interface' },
];

const approvalRequests = [
  { id: 1, title: 'Logo Design Options', type: 'Design', requested: '2023-04-28', project: 'Brand Refresh', priority: 'High' },
  { id: 2, title: 'Homepage Layout', type: 'Web Design', requested: '2023-05-01', project: 'Website Redesign', priority: 'Medium' },
  { id: 3, title: 'Color Palette Selection', type: 'Branding', requested: '2023-05-03', project: 'Brand Refresh', priority: 'Low' },
];

const budgetData = [
  { category: 'Branding', budget: 5000, spent: 3250, remaining: 1750 },
  { category: 'Web Design', budget: 7500, spent: 6000, remaining: 1500 },
  { category: 'App Development', budget: 10000, spent: 2500, remaining: 7500 },
];

const timelineData = [
  { date: '2023-04-01', milestone: 'Project Start' },
  { date: '2023-04-15', milestone: 'Brand Strategy Complete' },
  { date: '2023-05-01', milestone: 'Logo Design Approval' },
  { date: '2023-05-15', milestone: 'Website Mockups' },
  { date: '2023-06-01', milestone: 'Website Development' },
  { date: '2023-06-30', milestone: 'Project Completion' },
];

export default function ClientDashboard() {
  const [selectedTab, setSelectedTab] = useState(0);
  
  // Calculate stats
  const totalProjects = clientProjects.length;
  const pendingApprovals = approvalRequests.length;
  const totalInvoices = clientInvoices.length;
  const pendingInvoices = clientInvoices.filter(i => i.status === 'Pending').length;
  
  return (
    <ThemeProvider defaultThemeId="salient">
      <div className="flex flex-col min-h-screen bg-[hsl(var(--background))]" data-theme="wrkhrsco">
        {/* Header */}
        <header className="px-6 py-4 border-b border-[hsl(var(--border))] flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-[hsl(var(--foreground))]">Client Portal</h1>
            <p className="text-[hsl(var(--muted-foreground))]">Track your projects and approvals</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" size="sm">
              <MessageSquare className="h-4 w-4 mr-2" />
              Contact Designer
            </Button>
            <Button size="sm">
              <FileText className="h-4 w-4 mr-2" />
              View Files
            </Button>
          </div>
        </header>
        
        {/* Main Content */}
        <main className="flex-1 p-6">
          {/* Overview Section */}
          <section className="mb-6">
            <DashboardGrid>
              <DashboardCard title="Active Projects" value={totalProjects.toString()} icon={<FileText className="h-6 w-6 text-primary" />} />
              <DashboardCard title="Pending Approvals" value={pendingApprovals.toString()} icon={<AlertCircle className="h-6 w-6 text-warning" />} />
              <DashboardCard title="Invoices" value={`${pendingInvoices}/${totalInvoices}`} icon={<CreditCard className="h-6 w-6 text-info" />} />
              <DashboardCard title="Next Milestone" value="May 15" icon={<Calendar className="h-6 w-6 text-success" />} />
            </DashboardGrid>
          </section>
          
          {/* Tabs Section */}
          <TabGroup className="mt-6" onIndexChange={setSelectedTab}>
            <TabList variant="solid" color="indigo">
              <Tab>Projects</Tab>
              <Tab>Approvals</Tab>
              <Tab>Finances</Tab>
              <Tab>Timeline</Tab>
            </TabList>
            
            <TabPanels>
              {/* Projects Tab */}
              <TabPanel>
                <div className="mt-6">
                  <div className="flex justify-between items-center mb-4">
                    <Title>Your Projects</Title>
                    <Button variant="outline" size="sm">Request New Project</Button>
                  </div>
                  
                  <Grid numItemsMd={2} numItemsLg={2} className="gap-6 mt-6">
                    {clientProjects.map((project) => (
                      <Card key={project.id} className="p-4 hover:shadow-md transition-shadow">
                        <div className="flex justify-between items-start">
                          <Title className="text-lg font-medium">{project.name}</Title>
                          <div className="px-2 py-1 rounded-full text-xs font-medium" 
                            style={{ 
                              backgroundColor: 
                                project.status === 'Completed' ? 'hsl(var(--success) / 0.2)' : 
                                project.status === 'In Progress' ? 'hsl(var(--primary) / 0.2)' : 
                                project.status === 'Review' ? 'hsl(var(--info) / 0.2)' :
                                'hsl(var(--warning) / 0.2)',
                              color: 
                                project.status === 'Completed' ? 'hsl(var(--success))' : 
                                project.status === 'In Progress' ? 'hsl(var(--primary))' : 
                                project.status === 'Review' ? 'hsl(var(--info))' :
                                'hsl(var(--warning))'
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
                            <Clock className="h-4 w-4 mr-1" />
                            <span>Updated: {project.lastUpdate}</span>
                          </div>
                        </div>
                        
                        <div className="mt-4 pt-4 border-t border-border">
                          <Text className="text-sm text-muted-foreground">Designer: {project.designer}</Text>
                          <div className="mt-3 flex gap-2">
                            <Button size="sm" variant="secondary">View Details</Button>
                            <Button size="sm" variant="outline">Files</Button>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </Grid>
                </div>
              </TabPanel>
              
              {/* Approvals Tab */}
              <TabPanel>
                <div className="mt-6">
                  <div className="flex justify-between items-center mb-4">
                    <Title>Pending Approvals</Title>
                  </div>
                  
                  <Card>
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b border-border">
                            <th className="text-left py-3 px-4 font-medium">Title</th>
                            <th className="text-left py-3 px-4 font-medium">Type</th>
                            <th className="text-left py-3 px-4 font-medium">Project</th>
                            <th className="text-left py-3 px-4 font-medium">Requested</th>
                            <th className="text-left py-3 px-4 font-medium">Priority</th>
                            <th className="text-right py-3 px-4 font-medium">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {approvalRequests.map((request) => (
                            <tr key={request.id} className="border-b border-border hover:bg-muted/50">
                              <td className="py-3 px-4">{request.title}</td>
                              <td className="py-3 px-4">{request.type}</td>
                              <td className="py-3 px-4">{request.project}</td>
                              <td className="py-3 px-4">{request.requested}</td>
                              <td className="py-3 px-4">
                                <span className="px-2 py-1 rounded-full text-xs font-medium" 
                                  style={{ 
                                    backgroundColor: 
                                      request.priority === 'High' ? 'hsl(var(--destructive) / 0.2)' : 
                                      request.priority === 'Medium' ? 'hsl(var(--warning) / 0.2)' : 
                                      'hsl(var(--info) / 0.2)',
                                    color: 
                                      request.priority === 'High' ? 'hsl(var(--destructive))' : 
                                      request.priority === 'Medium' ? 'hsl(var(--warning))' : 
                                      'hsl(var(--info))'
                                  }}>
                                  {request.priority}
                                </span>
                              </td>
                              <td className="py-3 px-4 text-right">
                                <Button variant="default" size="sm" className="mr-2">Review</Button>
                                <Button variant="outline" size="sm">Later</Button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </Card>
                </div>
              </TabPanel>
              
              {/* Finances Tab */}
              <TabPanel>
                <div className="mt-6">
                  <Grid numItemsMd={2} numItemsLg={2} className="gap-6">
                    <Card className="p-4">
                      <Title>Budget Overview</Title>
                      <div className="mt-4">
                        <BarChart
                          className="h-72 mt-4"
                          data={budgetData}
                          index="category"
                          categories={["budget", "spent", "remaining"]}
                          colors={["indigo", "violet", "fuchsia"]}
                          valueFormatter={(value) => `$${value.toLocaleString()}`}
                          stack={false}
                        />
                      </div>
                    </Card>
                    
                    <Card className="p-4">
                      <Title>Invoices</Title>
                      <div className="overflow-x-auto mt-4">
                        <table className="w-full text-sm">
                          <thead>
                            <tr className="border-b border-border">
                              <th className="text-left py-3 px-4 font-medium">Invoice</th>
                              <th className="text-left py-3 px-4 font-medium">Date</th>
                              <th className="text-left py-3 px-4 font-medium">Project</th>
                              <th className="text-right py-3 px-4 font-medium">Amount</th>
                              <th className="text-right py-3 px-4 font-medium">Status</th>
                            </tr>
                          </thead>
                          <tbody>
                            {clientInvoices.map((invoice) => (
                              <tr key={invoice.id} className="border-b border-border hover:bg-muted/50">
                                <td className="py-3 px-4">{invoice.number}</td>
                                <td className="py-3 px-4">{invoice.date}</td>
                                <td className="py-3 px-4">{invoice.project}</td>
                                <td className="py-3 px-4 text-right">${invoice.amount.toLocaleString()}</td>
                                <td className="py-3 px-4 text-right">
                                  <span className="px-2 py-1 rounded-full text-xs font-medium" 
                                    style={{ 
                                      backgroundColor: 
                                        invoice.status === 'Paid' ? 'hsl(var(--success) / 0.2)' : 
                                        'hsl(var(--warning) / 0.2)',
                                      color: 
                                        invoice.status === 'Paid' ? 'hsl(var(--success))' : 
                                        'hsl(var(--warning))'
                                    }}>
                                    {invoice.status}
                                  </span>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </Card>
                  </Grid>
                </div>
              </TabPanel>
              
              {/* Timeline Tab */}
              <TabPanel>
                <div className="mt-6">
                  <Card className="p-4">
                    <Title>Project Timeline</Title>
                    <div className="mt-8">
                      <div className="relative">
                        {timelineData.map((milestone, i) => (
                          <div key={i} className="mb-8 flex items-start">
                            <div className="flex flex-col items-center mr-4">
                              <div className={`rounded-full h-4 w-4 flex items-center justify-center ${i < 3 ? 'bg-primary' : 'bg-muted'}`}></div>
                              {i < timelineData.length - 1 && (
                                <div className="h-full w-px bg-border flex-1 my-1"></div>
                              )}
                            </div>
                            <div className="bg-card border border-border p-4 rounded-lg flex-1">
                              <div className="flex justify-between items-start">
                                <div>
                                  <Text className="text-muted-foreground">{milestone.date}</Text>
                                  <Title className="text-lg font-medium mt-1">{milestone.milestone}</Title>
                                </div>
                                {i < 3 && (
                                  <div className="px-2 py-1 rounded-full text-xs font-medium bg-success/20 text-success">
                                    Completed
                                  </div>
                                )}
                                {i === 3 && (
                                  <div className="px-2 py-1 rounded-full text-xs font-medium bg-primary/20 text-primary">
                                    Current
                                  </div>
                                )}
                                {i > 3 && (
                                  <div className="px-2 py-1 rounded-full text-xs font-medium bg-muted text-muted-foreground">
                                    Upcoming
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </Card>
                </div>
              </TabPanel>
            </TabPanels>
          </TabGroup>
        </main>
        
        {/* Footer */}
        <footer className="px-6 py-4 border-t border-[hsl(var(--border))]">
          <div className="flex justify-between items-center">
            <Text className="text-sm text-[hsl(var(--muted-foreground))]">© 2023 Workhorse Co.</Text>
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm">Help</Button>
              <Button variant="ghost" size="sm">Support</Button>
              <Button variant="ghost" size="sm">Settings</Button>
            </div>
          </div>
        </footer>
      </div>
    </ThemeProvider>
  );
} 