import { useState } from 'react';
import SimpleViewSwitcher, { ViewConfig } from '@/components/SimpleViewSwitcher';
import { 
  Home as HomeIcon, 
  BarChart as AnalyticsIcon, 
  Settings as SettingsIcon, 
  UserCircle as UserIcon,
  Mail as MailIcon,
  Calendar as CalendarIcon
} from 'lucide-react';

// Sample view content components
const DashboardContent = () => (
  <div className="p-4">
    <h2 className="text-2xl font-bold mb-4">Dashboard</h2>
    <p className="mb-6">Welcome to your personal dashboard.</p>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      <div className="bg-card p-4 rounded-md border">
        <h3 className="font-medium mb-2">Recent Activity</h3>
        <ul className="space-y-2 text-sm">
          <li>Project "Redesign" updated</li>
          <li>New comment on "Homepage"</li>
          <li>Task "Fix button styling" completed</li>
        </ul>
      </div>
      <div className="bg-card p-4 rounded-md border">
        <h3 className="font-medium mb-2">Quick Stats</h3>
        <div className="space-y-1 text-sm">
          <div className="flex justify-between">
            <span>Projects</span>
            <span className="font-medium">8</span>
          </div>
          <div className="flex justify-between">
            <span>Tasks</span>
            <span className="font-medium">24</span>
          </div>
          <div className="flex justify-between">
            <span>Completed</span>
            <span className="font-medium">16</span>
          </div>
        </div>
      </div>
      <div className="bg-card p-4 rounded-md border">
        <h3 className="font-medium mb-2">Team</h3>
        <div className="flex -space-x-2">
          <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs">JD</div>
          <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs">AS</div>
          <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs">RB</div>
          <div className="w-8 h-8 rounded-full bg-muted text-muted-foreground flex items-center justify-center text-xs">+2</div>
        </div>
      </div>
    </div>
  </div>
);

const AnalyticsContent = () => (
  <div className="p-4">
    <h2 className="text-2xl font-bold mb-4">Analytics</h2>
    <p className="mb-6">View your project performance metrics.</p>
    <div className="space-y-6">
      <div className="bg-card p-4 rounded-md border">
        <h3 className="font-medium mb-4">Weekly Progress</h3>
        <div className="h-48 flex items-end gap-2">
          <div className="bg-primary h-[30%] w-full rounded-t"></div>
          <div className="bg-primary h-[45%] w-full rounded-t"></div>
          <div className="bg-primary h-[65%] w-full rounded-t"></div>
          <div className="bg-primary h-[40%] w-full rounded-t"></div>
          <div className="bg-primary h-[80%] w-full rounded-t"></div>
          <div className="bg-primary h-[60%] w-full rounded-t"></div>
          <div className="bg-primary h-[35%] w-full rounded-t"></div>
        </div>
        <div className="flex justify-between mt-2 text-xs text-muted-foreground">
          <span>Mon</span>
          <span>Tue</span>
          <span>Wed</span>
          <span>Thu</span>
          <span>Fri</span>
          <span>Sat</span>
          <span>Sun</span>
        </div>
      </div>
    </div>
  </div>
);

const SettingsContent = () => (
  <div className="p-4">
    <h2 className="text-2xl font-bold mb-4">Settings</h2>
    <p className="mb-6">Manage your account and application preferences.</p>
    <div className="space-y-6">
      <div className="bg-card p-4 rounded-md border">
        <h3 className="font-medium mb-3">Account Settings</h3>
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span>Profile Visibility</span>
            <select className="border rounded px-2 py-1 text-sm">
              <option>Public</option>
              <option>Private</option>
              <option>Team Only</option>
            </select>
          </div>
          <div className="flex justify-between items-center">
            <span>Email Notifications</span>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" defaultChecked className="sr-only peer" />
              <div className="w-9 h-5 bg-muted peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-offset-2 peer-focus:ring-primary rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-primary"></div>
            </label>
          </div>
        </div>
      </div>
      <div className="bg-card p-4 rounded-md border">
        <h3 className="font-medium mb-3">Theme Preferences</h3>
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span>Dark Mode</span>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" />
              <div className="w-9 h-5 bg-muted peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-offset-2 peer-focus:ring-primary rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-primary"></div>
            </label>
          </div>
        </div>
      </div>
    </div>
  </div>
);

// Define views for tabs variant
const tabsViews: ViewConfig[] = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    icon: <HomeIcon className="h-4 w-4" />,
    content: <DashboardContent />
  },
  {
    id: 'analytics',
    label: 'Analytics',
    icon: <AnalyticsIcon className="h-4 w-4" />,
    content: <AnalyticsContent />
  },
  {
    id: 'settings',
    label: 'Settings',
    icon: <SettingsIcon className="h-4 w-4" />,
    content: <SettingsContent />
  }
];

// Define views for sidebar variant
const sidebarViews: ViewConfig[] = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    icon: <HomeIcon className="h-4 w-4" />,
    content: <DashboardContent />
  },
  {
    id: 'analytics',
    label: 'Analytics',
    icon: <AnalyticsIcon className="h-4 w-4" />,
    content: <AnalyticsContent />
  },
  {
    id: 'inbox',
    label: 'Inbox',
    icon: <MailIcon className="h-4 w-4" />,
    content: <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Inbox</h2>
      <p>Your messages will appear here.</p>
    </div>
  },
  {
    id: 'calendar',
    label: 'Calendar',
    icon: <CalendarIcon className="h-4 w-4" />,
    content: <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Calendar</h2>
      <p>Your schedule and events will appear here.</p>
    </div>
  },
  {
    id: 'profile',
    label: 'Profile',
    icon: <UserIcon className="h-4 w-4" />,
    content: <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Profile</h2>
      <p>Your profile information will appear here.</p>
    </div>
  },
  {
    id: 'settings',
    label: 'Settings',
    icon: <SettingsIcon className="h-4 w-4" />,
    content: <SettingsContent />
  }
];

/**
 * Example showing how to use the SimpleViewSwitcher in a real-world application context
 */
export default function ViewSwitcherExample() {
  const [variant, setVariant] = useState<'tabs' | 'buttons' | 'sidebar'>('tabs');
  
  return (
    <div>
      <div className="bg-muted p-4 mb-6 rounded-md flex flex-wrap gap-3">
        <button 
          onClick={() => setVariant('tabs')}
          className={`px-3 py-1 rounded ${variant === 'tabs' ? 'bg-primary text-primary-foreground' : 'bg-background'}`}
        >
          Tabs
        </button>
        <button 
          onClick={() => setVariant('buttons')}
          className={`px-3 py-1 rounded ${variant === 'buttons' ? 'bg-primary text-primary-foreground' : 'bg-background'}`}
        >
          Buttons
        </button>
        <button 
          onClick={() => setVariant('sidebar')}
          className={`px-3 py-1 rounded ${variant === 'sidebar' ? 'bg-primary text-primary-foreground' : 'bg-background'}`}
        >
          Sidebar
        </button>
      </div>
      
      <div className="border rounded-md p-4">
        <SimpleViewSwitcher 
          views={variant === 'sidebar' ? sidebarViews : tabsViews} 
          variant={variant}
          defaultView="dashboard"
        />
      </div>
    </div>
  );
} 