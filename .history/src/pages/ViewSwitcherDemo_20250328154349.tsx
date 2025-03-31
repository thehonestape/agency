import { useState } from 'react';
import { ViewSwitcher, ViewConfig } from '@/components/ViewSwitcher';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/button';
import { Navbar } from '@/components/ui/navigation/navbar';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { HomeIcon, InfoIcon, SettingsIcon, UserIcon, BellIcon, BookIcon } from 'lucide-react';

// Sample view content components
const HomeContent = () => (
  <div className="space-y-4">
    <h2 className="text-2xl font-bold">Home Dashboard</h2>
    <p>Welcome to your dashboard! This is a simple home view.</p>
    
    <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <p>You have 3 new notifications</p>
          <Button variant="outline" size="sm" className="mt-4">View All</Button>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Quick Stats</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between">
            <span>Projects</span>
            <span className="font-medium">12</span>
          </div>
          <div className="flex justify-between mt-2">
            <span>Tasks</span>
            <span className="font-medium">34</span>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Team</CardTitle>
        </CardHeader>
        <CardContent>
          <p>5 active members</p>
          <Button variant="outline" size="sm" className="mt-4">Manage Team</Button>
        </CardContent>
      </Card>
    </div>
  </div>
);

const ProfileContent = () => (
  <div className="space-y-4">
    <h2 className="text-2xl font-bold">Your Profile</h2>
    <p>Manage your personal information and preferences.</p>
    
    <Card>
      <CardHeader>
        <CardTitle>Personal Information</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid gap-2">
          <Label htmlFor="name">Full Name</Label>
          <input 
            id="name" 
            className="border p-2 rounded-md w-full" 
            defaultValue="John Doe" 
            aria-label="Full Name"
          />
        </div>
        
        <div className="grid gap-2">
          <Label htmlFor="email">Email Address</Label>
          <input 
            id="email" 
            className="border p-2 rounded-md w-full" 
            defaultValue="john.doe@example.com" 
            aria-label="Email Address"
          />
        </div>
        
        <Button className="mt-2">Save Changes</Button>
      </CardContent>
    </Card>
  </div>
);

const SettingsContent = () => {
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Settings</h2>
      <p>Configure your application preferences.</p>
      
      <Card>
        <CardHeader>
          <CardTitle>Preferences</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="notifications">Notifications</Label>
              <p className="text-sm text-muted-foreground">Receive email notifications</p>
            </div>
            <Switch 
              id="notifications" 
              checked={notifications} 
              onCheckedChange={setNotifications} 
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="darkMode">Dark Mode</Label>
              <p className="text-sm text-muted-foreground">Enable dark theme</p>
            </div>
            <Switch 
              id="darkMode" 
              checked={darkMode} 
              onCheckedChange={setDarkMode} 
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

// Define our views configuration
const views: ViewConfig[] = [
  {
    id: 'home',
    label: 'Home',
    icon: <HomeIcon className="h-4 w-4" />,
    content: <HomeContent />
  },
  {
    id: 'profile',
    label: 'Profile',
    icon: <UserIcon className="h-4 w-4" />,
    content: <ProfileContent />
  },
  {
    id: 'settings',
    label: 'Settings',
    icon: <SettingsIcon className="h-4 w-4" />,
    content: <SettingsContent />
  },
];

// More sample views for the sidebar example
const docViews: ViewConfig[] = [
  {
    id: 'overview',
    label: 'Overview',
    icon: <HomeIcon className="h-4 w-4" />,
    content: (
      <div>
        <h2 className="text-2xl font-bold mb-4">Documentation Overview</h2>
        <p className="mb-4">This is a sample documentation page showing the sidebar view switcher variant.</p>
        <p>The sidebar layout is perfect for documentation, settings pages, or any interface where you want persistent navigation alongside the main content.</p>
      </div>
    )
  },
  {
    id: 'getting-started',
    label: 'Getting Started',
    icon: <BookIcon className="h-4 w-4" />,
    content: (
      <div>
        <h2 className="text-2xl font-bold mb-4">Getting Started</h2>
        <p className="mb-4">Learn how to get started with our application.</p>
        <ol className="list-decimal pl-5 space-y-2">
          <li>Install the dependencies</li>
          <li>Configure your settings</li>
          <li>Start building your first project</li>
        </ol>
      </div>
    )
  },
  {
    id: 'notifications',
    label: 'Notifications',
    icon: <BellIcon className="h-4 w-4" />,
    content: (
      <div>
        <h2 className="text-2xl font-bold mb-4">Notification Settings</h2>
        <p>Configure how and when you receive notifications.</p>
      </div>
    )
  },
];

// Main demo component
const ViewSwitcherDemo = () => {
  const [variant, setVariant] = useState<'tabs' | 'buttons' | 'sidebar'>('tabs');
  const [orientation, setOrientation] = useState<'horizontal' | 'vertical'>('horizontal');
  
  // Only show orientation toggle for tabs and buttons variants
  const showOrientationToggle = variant !== 'sidebar';
  
  return (
    <div className="min-h-screen bg-background">
      <Navbar className="border-b px-6 flex items-center">
        <div className="flex-1">
          <h1 className="text-xl font-bold">ViewSwitcher Demo</h1>
        </div>
      </Navbar>
      
      <div className="container mx-auto py-8">
        <div className="mb-8 p-6 bg-muted rounded-lg">
          <h2 className="text-xl font-semibold mb-4">ViewSwitcher Configuration</h2>
          
          <div className="flex flex-wrap gap-4 mb-6">
            <Button 
              variant={variant === 'tabs' ? 'default' : 'outline'} 
              onClick={() => setVariant('tabs')}
            >
              Tabs Variant
            </Button>
            <Button 
              variant={variant === 'buttons' ? 'default' : 'outline'} 
              onClick={() => setVariant('buttons')}
            >
              Buttons Variant
            </Button>
            <Button 
              variant={variant === 'sidebar' ? 'default' : 'outline'} 
              onClick={() => setVariant('sidebar')}
            >
              Sidebar Variant
            </Button>
          </div>
          
          {showOrientationToggle && (
            <div className="flex items-center space-x-2">
              <Switch 
                id="orientation-toggle" 
                checked={orientation === 'vertical'} 
                onCheckedChange={(checked) => setOrientation(checked ? 'vertical' : 'horizontal')} 
              />
              <Label htmlFor="orientation-toggle">Vertical Orientation</Label>
            </div>
          )}
        </div>
        
        <div className="mb-12">
          <h2 className="text-xl font-semibold mb-4">
            {variant === 'tabs' 
              ? 'Tabs Variant' 
              : variant === 'buttons' 
                ? 'Buttons Variant' 
                : 'Sidebar Variant'
            }
            {showOrientationToggle && ` (${orientation} orientation)`}
          </h2>
          
          <div className="border rounded-lg p-6 bg-card">
            {variant === 'sidebar' ? (
              <ViewSwitcher
                views={docViews}
                variant={variant}
                defaultView="overview"
              />
            ) : (
              <ViewSwitcher
                views={views}
                variant={variant}
                orientation={orientation}
                defaultView="home"
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewSwitcherDemo; 