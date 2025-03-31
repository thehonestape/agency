import SimpleViewSwitcher, { ViewConfig } from '@/components/SimpleViewSwitcher';
import { HomeIcon, UserIcon, SettingsIcon } from 'lucide-react';

// Sample content components
const HomeContent = () => (
  <div className="space-y-4">
    <h2 className="text-2xl font-bold">Home</h2>
    <p>This is the home view. Welcome to the simple view switcher demo.</p>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
      <div className="p-4 border rounded-lg bg-card">
        <h3 className="font-medium mb-2">Quick Stats</h3>
        <div className="text-sm text-muted-foreground">
          <div className="flex justify-between py-1">
            <span>Projects</span>
            <span>12</span>
          </div>
          <div className="flex justify-between py-1">
            <span>Tasks</span>
            <span>34</span>
          </div>
          <div className="flex justify-between py-1">
            <span>Completed</span>
            <span>26</span>
          </div>
        </div>
      </div>
      <div className="p-4 border rounded-lg bg-card">
        <h3 className="font-medium mb-2">Recent Activity</h3>
        <ul className="text-sm space-y-2">
          <li className="text-muted-foreground">Updated project settings</li>
          <li className="text-muted-foreground">Added new team member</li>
          <li className="text-muted-foreground">Completed homepage design</li>
        </ul>
      </div>
    </div>
  </div>
);

const ProfileContent = () => (
  <div className="space-y-4">
    <h2 className="text-2xl font-bold">Profile</h2>
    <p>This is the profile view. View and manage your account details.</p>
    
    <div className="p-4 border rounded-lg bg-card mt-4">
      <div className="flex items-center space-x-4">
        <div className="h-12 w-12 rounded-full bg-primary flex items-center justify-center text-primary-foreground">
          JD
        </div>
        <div>
          <h3 className="font-medium">John Doe</h3>
          <p className="text-sm text-muted-foreground">john.doe@example.com</p>
        </div>
      </div>
      
      <div className="mt-4 pt-4 border-t">
        <h4 className="text-sm font-medium mb-2">Account Information</h4>
        <div className="text-sm space-y-2">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Member Since</span>
            <span>Jan 15, 2023</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Role</span>
            <span>Administrator</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Status</span>
            <span className="text-success">Active</span>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const SettingsContent = () => (
  <div className="space-y-4">
    <h2 className="text-2xl font-bold">Settings</h2>
    <p>This is the settings view. Configure your preferences.</p>
    
    <div className="space-y-4 mt-4">
      <div className="p-4 border rounded-lg bg-card">
        <h3 className="font-medium mb-3">Notification Preferences</h3>
        <div className="space-y-2">
          <div className="flex items-center">
            <input type="checkbox" id="email-notifications" className="mr-2" defaultChecked />
            <label htmlFor="email-notifications" className="text-sm">Email Notifications</label>
          </div>
          <div className="flex items-center">
            <input type="checkbox" id="push-notifications" className="mr-2" defaultChecked />
            <label htmlFor="push-notifications" className="text-sm">Push Notifications</label>
          </div>
          <div className="flex items-center">
            <input type="checkbox" id="sms-notifications" className="mr-2" />
            <label htmlFor="sms-notifications" className="text-sm">SMS Notifications</label>
          </div>
        </div>
      </div>
      
      <div className="p-4 border rounded-lg bg-card">
        <h3 className="font-medium mb-3">Display Settings</h3>
        <div className="space-y-2">
          <div className="flex items-center">
            <input type="checkbox" id="dark-mode" className="mr-2" />
            <label htmlFor="dark-mode" className="text-sm">Dark Mode</label>
          </div>
          <div className="flex items-center">
            <input type="checkbox" id="compact-view" className="mr-2" />
            <label htmlFor="compact-view" className="text-sm">Compact View</label>
          </div>
        </div>
      </div>
    </div>
  </div>
);

// Define our views
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
  }
];

// Demo for the tabs variant
export default function SimpleDemoPage() {
  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">View Switcher (No Extra Navigation)</h1>
      <p className="mb-8 text-muted-foreground">
        This example shows how to use the simplified view switcher component that doesn't add extra navigation bars
        and can be inserted directly into your existing layouts.
      </p>
      
      <div className="space-y-12">
        <div>
          <h2 className="text-xl font-semibold mb-4">Tabs Variant</h2>
          <div className="p-6 border rounded-lg">
            <SimpleViewSwitcher views={views} variant="tabs" />
          </div>
        </div>
        
        <div>
          <h2 className="text-xl font-semibold mb-4">Buttons Variant</h2>
          <div className="p-6 border rounded-lg">
            <SimpleViewSwitcher views={views} variant="buttons" />
          </div>
        </div>
        
        <div>
          <h2 className="text-xl font-semibold mb-4">Sidebar Variant</h2>
          <div className="p-6 border rounded-lg">
            <SimpleViewSwitcher views={views} variant="sidebar" />
          </div>
        </div>
      </div>
    </div>
  );
} 