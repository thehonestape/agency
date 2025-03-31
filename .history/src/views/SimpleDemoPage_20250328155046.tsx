import SimpleViewSwitcher from './SimpleViewSwitcher';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/button';

// Define our view contents using our component system
const HomeView = () => (
  <div className="space-y-4">
    <h2 className="text-2xl font-bold">Home</h2>
    <p>Welcome to the home page. This is a simple view without any routing.</p>
    
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
      <Card>
        <CardHeader>
          <CardTitle size="sm">Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            <li>Updated project settings</li>
            <li>Added new team member</li>
            <li>Completed homepage design</li>
          </ul>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle size="sm">Stats</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>Projects</span>
              <span>12</span>
            </div>
            <div className="flex justify-between">
              <span>Tasks</span>
              <span>34</span>
            </div>
            <div className="flex justify-between">
              <span>Completed</span>
              <span>26</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  </div>
);

const AboutView = () => (
  <div className="space-y-4">
    <h2 className="text-2xl font-bold">About</h2>
    <p>This is the about page. Learn more about our company and mission.</p>
    
    <Card>
      <CardHeader>
        <CardTitle size="sm">Our Story</CardTitle>
      </CardHeader>
      <CardContent>
        <p>
          We're a forward-thinking company focused on creating intuitive and powerful solutions.
          Our mission is to simplify complex problems through thoughtful design and engineering.
        </p>
        <Button className="mt-4" variant="outline">Learn More</Button>
      </CardContent>
    </Card>
  </div>
);

const SettingsView = () => (
  <div className="space-y-4">
    <h2 className="text-2xl font-bold">Settings</h2>
    <p>Configure your preferences and account settings.</p>
    
    <Card>
      <CardHeader>
        <CardTitle size="sm">Preferences</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span>Dark Mode</span>
            <Button variant="outline" size="sm">Enable</Button>
          </div>
          <div className="flex justify-between items-center">
            <span>Notifications</span>
            <Button variant="outline" size="sm">Enable</Button>
          </div>
          <div className="flex justify-between items-center">
            <span>Email Updates</span>
            <Button variant="outline" size="sm">Disable</Button>
          </div>
        </div>
      </CardContent>
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
      content: <HomeView />
    },
    {
      id: 'about',
      label: 'About',
      content: <AboutView />
    },
    {
      id: 'settings',
      label: 'Settings',
      content: <SettingsView />
    }
  ];
  
  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-2">Simple View Switcher</h1>
      <p className="text-muted-foreground mb-6">
        A minimal implementation that uses state to manage views without React Router
      </p>
      
      <SimpleViewSwitcher views={views} defaultView="home" />
    </div>
  );
} 