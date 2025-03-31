import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import SimpleViewSwitcher from './SimpleViewSwitcher';
import TabViewSwitcher from './TabViewSwitcher';

// Create some sample view content
const DashboardView = () => (
  <div className="space-y-4">
    <h2 className="text-2xl font-bold">Dashboard</h2>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <Card>
        <CardHeader>
          <CardTitle size="sm">Projects</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold">12</div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle size="sm">Tasks</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold">34</div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle size="sm">Completed</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold">26</div>
        </CardContent>
      </Card>
    </div>
  </div>
);

const ProjectsView = () => (
  <div className="space-y-4">
    <h2 className="text-2xl font-bold">Projects</h2>
    <div className="space-y-3">
      <Card>
        <CardHeader>
          <CardTitle size="sm">Project Alpha</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between items-center">
            <div>Website redesign for client X</div>
            <Button size="sm">View</Button>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle size="sm">Project Beta</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between items-center">
            <div>Mobile app for client Y</div>
            <Button size="sm">View</Button>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle size="sm">Project Gamma</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between items-center">
            <div>E-commerce site for client Z</div>
            <Button size="sm">View</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  </div>
);

const TeamView = () => (
  <div className="space-y-4">
    <h2 className="text-2xl font-bold">Team</h2>
    <div className="space-y-3">
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center space-x-4">
            <div className="h-10 w-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground">
              JD
            </div>
            <div>
              <div className="font-medium">John Doe</div>
              <div className="text-sm text-muted-foreground">Project Manager</div>
            </div>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center space-x-4">
            <div className="h-10 w-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground">
              AS
            </div>
            <div>
              <div className="font-medium">Alice Smith</div>
              <div className="text-sm text-muted-foreground">Designer</div>
            </div>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center space-x-4">
            <div className="h-10 w-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground">
              RJ
            </div>
            <div>
              <div className="font-medium">Robert Johnson</div>
              <div className="text-sm text-muted-foreground">Developer</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  </div>
);

// Define our views
const views = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    content: <DashboardView />
  },
  {
    id: 'projects',
    label: 'Projects',
    content: <ProjectsView />
  },
  {
    id: 'team',
    label: 'Team',
    content: <TeamView />
  }
];

// Main example component
export default function FullViewExample() {
  const [switcherType, setSwitcherType] = useState<'buttons' | 'tabs'>('buttons');
  
  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-2">View Switcher Demo</h1>
      <p className="text-muted-foreground mb-6">
        Choose the style of view switcher you want to use
      </p>
      
      <div className="mb-6 flex gap-2">
        <Button
          variant={switcherType === 'buttons' ? 'default' : 'outline'}
          onClick={() => setSwitcherType('buttons')}
        >
          Buttons Style
        </Button>
        <Button
          variant={switcherType === 'tabs' ? 'default' : 'outline'}
          onClick={() => setSwitcherType('tabs')}
        >
          Tabs Style
        </Button>
      </div>
      
      <Card>
        <CardContent className="p-6">
          {switcherType === 'buttons' ? (
            <SimpleViewSwitcher views={views} defaultView="dashboard" />
          ) : (
            <TabViewSwitcher views={views} defaultView="dashboard" />
          )}
        </CardContent>
      </Card>
    </div>
  );
} 