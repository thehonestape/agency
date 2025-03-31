import { useState } from 'react';
import { ViewSwitcher, ViewConfig } from '@/components/ViewSwitcher';
import { Button } from '@/components/ui/button';
import { Navbar } from '@/components/ui/navigation/navbar';
import { DashboardIcon, FileIcon, GearIcon, HomeIcon, ImageIcon, UsersIcon, UserIcon } from 'lucide-react';

// Simple content components for each view
const DashboardContent = () => (
  <div className="p-6">
    <h2 className="text-3xl font-bold mb-6">Dashboard</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <div className="bg-card p-4 rounded-lg border">
        <h3 className="font-semibold mb-2">Projects</h3>
        <div className="text-2xl font-bold">12</div>
      </div>
      <div className="bg-card p-4 rounded-lg border">
        <h3 className="font-semibold mb-2">Tasks</h3>
        <div className="text-2xl font-bold">34</div>
      </div>
      <div className="bg-card p-4 rounded-lg border">
        <h3 className="font-semibold mb-2">Team Members</h3>
        <div className="text-2xl font-bold">5</div>
      </div>
      <div className="bg-card p-4 rounded-lg border">
        <h3 className="font-semibold mb-2">Active Tasks</h3>
        <div className="text-2xl font-bold">8</div>
      </div>
      <div className="bg-card p-4 rounded-lg border">
        <h3 className="font-semibold mb-2">Completed</h3>
        <div className="text-2xl font-bold">26</div>
      </div>
      <div className="bg-card p-4 rounded-lg border">
        <h3 className="font-semibold mb-2">Resources</h3>
        <div className="text-2xl font-bold">18</div>
      </div>
    </div>
    <div className="mt-8">
      <h3 className="text-xl font-semibold mb-4">Recent Activity</h3>
      <div className="space-y-3">
        <div className="bg-card p-3 rounded-lg border">
          <div className="font-medium">Project Alpha updated</div>
          <div className="text-sm text-muted-foreground">Yesterday at 2:30 PM</div>
        </div>
        <div className="bg-card p-3 rounded-lg border">
          <div className="font-medium">New team member added</div>
          <div className="text-sm text-muted-foreground">Yesterday at 11:15 AM</div>
        </div>
        <div className="bg-card p-3 rounded-lg border">
          <div className="font-medium">Task completed: Design homepage</div>
          <div className="text-sm text-muted-foreground">2 days ago</div>
        </div>
      </div>
    </div>
  </div>
);

const ProjectsContent = () => (
  <div className="p-6">
    <h2 className="text-3xl font-bold mb-6">Projects</h2>
    <div className="space-y-4">
      <div className="bg-card p-4 rounded-lg border">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-semibold">Project Alpha</h3>
            <p className="text-sm text-muted-foreground">Website Redesign</p>
          </div>
          <Button size="sm">View</Button>
        </div>
      </div>
      <div className="bg-card p-4 rounded-lg border">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-semibold">Project Beta</h3>
            <p className="text-sm text-muted-foreground">Mobile App Development</p>
          </div>
          <Button size="sm">View</Button>
        </div>
      </div>
      <div className="bg-card p-4 rounded-lg border">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-semibold">Project Gamma</h3>
            <p className="text-sm text-muted-foreground">Marketing Campaign</p>
          </div>
          <Button size="sm">View</Button>
        </div>
      </div>
    </div>
  </div>
);

const TeamContent = () => (
  <div className="p-6">
    <h2 className="text-3xl font-bold mb-6">Team</h2>
    <div className="space-y-4">
      <div className="bg-card p-4 rounded-lg border flex items-center">
        <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground mr-3">
          JD
        </div>
        <div>
          <h3 className="font-semibold">John Doe</h3>
          <p className="text-sm text-muted-foreground">Product Manager</p>
        </div>
      </div>
      <div className="bg-card p-4 rounded-lg border flex items-center">
        <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground mr-3">
          JS
        </div>
        <div>
          <h3 className="font-semibold">Jane Smith</h3>
          <p className="text-sm text-muted-foreground">UI Designer</p>
        </div>
      </div>
      <div className="bg-card p-4 rounded-lg border flex items-center">
        <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground mr-3">
          RJ
        </div>
        <div>
          <h3 className="font-semibold">Robert Johnson</h3>
          <p className="text-sm text-muted-foreground">Frontend Developer</p>
        </div>
      </div>
    </div>
  </div>
);

const SettingsContent = () => (
  <div className="p-6">
    <h2 className="text-3xl font-bold mb-6">Settings</h2>
    <div className="space-y-6">
      <div className="bg-card p-4 rounded-lg border">
        <h3 className="font-semibold mb-3">Account Settings</h3>
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span>Email Notifications</span>
            <Button variant="outline" size="sm">Edit</Button>
          </div>
          <div className="flex justify-between items-center">
            <span>Password</span>
            <Button variant="outline" size="sm">Change</Button>
          </div>
          <div className="flex justify-between items-center">
            <span>Two-Factor Authentication</span>
            <Button variant="outline" size="sm">Setup</Button>
          </div>
        </div>
      </div>
      <div className="bg-card p-4 rounded-lg border">
        <h3 className="font-semibold mb-3">Preferences</h3>
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span>Theme</span>
            <Button variant="outline" size="sm">Light</Button>
          </div>
          <div className="flex justify-between items-center">
            <span>Language</span>
            <Button variant="outline" size="sm">English</Button>
          </div>
        </div>
      </div>
    </div>
  </div>
);

// Define app views
const appViews: ViewConfig[] = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    icon: <DashboardIcon className="h-4 w-4" />,
    content: <DashboardContent />
  },
  {
    id: 'projects',
    label: 'Projects',
    icon: <FileIcon className="h-4 w-4" />,
    content: <ProjectsContent />
  },
  {
    id: 'team',
    label: 'Team',
    icon: <UsersIcon className="h-4 w-4" />,
    content: <TeamContent />
  },
  {
    id: 'settings',
    label: 'Settings',
    icon: <GearIcon className="h-4 w-4" />,
    content: <SettingsContent />
  }
];

/**
 * A completely standalone app that doesn't use React Router at all.
 * Perfect for prototyping or creating simple applications.
 */
export default function StandaloneViewDemo() {
  const [viewType, setViewType] = useState<'sidebar' | 'tabs'>('sidebar');
  
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar className="border-b px-6">
        <div className="flex-1">
          <h1 className="text-xl font-bold">Prototype App</h1>
        </div>
        <div className="flex space-x-3">
          <Button 
            variant={viewType === 'sidebar' ? 'default' : 'outline'} 
            size="sm"
            onClick={() => setViewType('sidebar')}
          >
            Sidebar Layout
          </Button>
          <Button 
            variant={viewType === 'tabs' ? 'default' : 'outline'} 
            size="sm"
            onClick={() => setViewType('tabs')}
          >
            Tabs Layout
          </Button>
        </div>
      </Navbar>
      
      <div className="flex-1 p-4">
        <ViewSwitcher
          views={appViews}
          defaultView="dashboard"
          variant={viewType}
        />
      </div>
    </div>
  );
} 