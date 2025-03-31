import SimpleViewSwitcher from './SimpleViewSwitcher';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/Card';
import { Button } from '@/components/ui/button';
import { Home, Info, Settings } from 'lucide-react';

// Define our view contents using our component system
const HomeView = () => (
  <div className="space-y-4">
    <p className="text-muted-foreground">Welcome to the home page. This is a simple view without any routing.</p>
    
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle size="sm">Recent Activity</CardTitle>
          <CardDescription>Latest updates to the project</CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2 text-sm">
            <li className="flex items-center gap-2">
              <span className="bg-primary/10 text-primary p-1 rounded-full w-6 h-6 flex items-center justify-center text-xs">1</span>
              <span>Updated project settings</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="bg-primary/10 text-primary p-1 rounded-full w-6 h-6 flex items-center justify-center text-xs">2</span>
              <span>Added new team member</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="bg-primary/10 text-primary p-1 rounded-full w-6 h-6 flex items-center justify-center text-xs">3</span>
              <span>Completed homepage design</span>
            </li>
          </ul>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle size="sm">Stats</CardTitle>
          <CardDescription>Current project metrics</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex justify-between items-center py-1 border-b">
              <span className="text-muted-foreground">Projects</span>
              <span className="font-medium text-lg">12</span>
            </div>
            <div className="flex justify-between items-center py-1 border-b">
              <span className="text-muted-foreground">Tasks</span>
              <span className="font-medium text-lg">34</span>
            </div>
            <div className="flex justify-between items-center py-1">
              <span className="text-muted-foreground">Completed</span>
              <span className="font-medium text-lg">26</span>
            </div>
          </div>
        </CardContent>
        <CardFooter className="pt-0">
          <Button variant="ghost" size="sm" className="ml-auto">View All</Button>
        </CardFooter>
      </Card>
    </div>
  </div>
);

const AboutView = () => (
  <div className="space-y-4">
    <p className="text-muted-foreground">
      This is the about page. Learn more about our company and mission.
    </p>
    
    <Card className="mt-6">
      <CardHeader className="pb-2">
        <CardTitle size="sm">Our Story</CardTitle>
        <CardDescription>How we started and where we're going</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm leading-relaxed">
          We're a forward-thinking company focused on creating intuitive and powerful solutions.
          Our mission is to simplify complex problems through thoughtful design and engineering.
          Founded in 2023, we've been helping clients transform their ideas into reality.
        </p>
      </CardContent>
      <CardFooter>
        <Button className="ml-auto" variant="outline" size="sm">Learn More</Button>
      </CardFooter>
    </Card>
  </div>
);

const SettingsView = () => (
  <div className="space-y-4">
    <p className="text-muted-foreground">Configure your preferences and account settings.</p>
    
    <Card className="mt-6">
      <CardHeader className="pb-2">
        <CardTitle size="sm">Preferences</CardTitle>
        <CardDescription>Manage your application settings</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex justify-between items-center py-2 border-b">
            <div>
              <p className="font-medium">Dark Mode</p>
              <p className="text-xs text-muted-foreground">Enable dark theme for the application</p>
            </div>
            <Button variant="outline" size="sm">Enable</Button>
          </div>
          <div className="flex justify-between items-center py-2 border-b">
            <div>
              <p className="font-medium">Notifications</p>
              <p className="text-xs text-muted-foreground">Receive in-app notifications</p>
            </div>
            <Button variant="outline" size="sm">Enable</Button>
          </div>
          <div className="flex justify-between items-center py-2">
            <div>
              <p className="font-medium">Email Updates</p>
              <p className="text-xs text-muted-foreground">Receive email updates about your account</p>
            </div>
            <Button variant="outline" size="sm">Disable</Button>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button className="ml-auto" size="sm">Save Changes</Button>
      </CardFooter>
    </Card>
  </div>
);

// Our main demo page
export default function SimpleDemoPage() {
  // Define our views
  const views = [
    {
      id: 'home',
      label: 'Home',
      icon: <Home className="h-4 w-4" />,
      content: <HomeView />
    },
    {
      id: 'about',
      label: 'About',
      icon: <Info className="h-4 w-4" />,
      content: <AboutView />
    },
    {
      id: 'settings',
      label: 'Settings',
      icon: <Settings className="h-4 w-4" />,
      content: <SettingsView />
    }
  ];
  
  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Simple View Switcher</h1>
        <p className="text-muted-foreground mt-2">
          A minimal implementation that uses state to manage views without React Router
        </p>
      </div>
      
      <SimpleViewSwitcher views={views} defaultView="home" />
    </div>
  );
} 