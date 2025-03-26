import React, { useEffect } from 'react';
import { FiActivity, FiCpu, FiEdit3, FiFile, FiGrid, FiLayers, FiPlus, FiUsers } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import RootLayout from '../components/layouts/RootLayout';
import { BrandContainer } from '../components/brand/BrandContainer';
import { BrandHeading } from '../components/brand/BrandHeading';
import { BrandText } from '../components/brand/BrandText';
import { BrandGrid } from '../components/brand/BrandGrid';
import { BrandCard } from '../components/brand/BrandCard';
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/Card";
import { BrandStyledButton } from '../components/brand/BrandStyledButton';
import { useBrand } from '../components/brand/BrandProvider';
import { AIQuickAccessButton } from '../components/ai/AIQuickAccessButton';
import { UtilityPanel } from '../components/dashboard/DashboardNav';
import { useTheme } from '../components/theme-provider';
import { Button } from '../components/ui/button';
import { CardDescription, CardFooter } from "../components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { BsFillLightningChargeFill } from 'react-icons/bs';
import { MdOutlineAnalytics, MdSupervisorAccount } from 'react-icons/md';
import { AiOutlineUsergroupAdd } from 'react-icons/ai';

// Recent activity type
interface Activity {
  id: number;
  title: string;
  time: string;
  description: string;
}

// Dummy data for recent activities
const recentActivities: Activity[] = [
  {
    id: 1,
    title: 'New Client Added',
    time: '2 hours ago',
    description: 'John Doe was added as a new client'
  },
  {
    id: 2,
    title: 'Project Completed',
    time: '1 day ago',
    description: 'Website redesign for ABC Corp was marked as complete'
  },
  {
    id: 3,
    title: 'Invoice Paid',
    time: '3 days ago',
    description: 'Invoice #1234 for $1,500 was paid by XYZ Ltd'
  }
];

const DefaultDashboardPage = () => {
  const { setBrandBySlug } = useBrand();
  const { theme, setTheme, applyCustomTheme, availableThemes } = useTheme();
  
  // Set default brand to Workhorse
  useEffect(() => {
    setBrandBySlug('workhorse');
  }, [setBrandBySlug]);
  
  // Sample theme definitions
  const blueTheme = {
    primary: '8 145 178', // blue
    background: '250 250 252', // light background
    card: '255 255 255', // white cards
  };

  const purpleTheme = {
    primary: '128 63 180', // purple
    background: '250 250 252', // light background
    card: '255 255 255',
  };

  const darkBlueTheme = {
    primary: '56 189 248', // light blue
    background: '15 23 42', // dark slate
    card: '30 41 59', // slate 800
  };

  return (
    <div className="flex h-screen">
      <UtilityPanel 
        title="Theme Testing" 
        storageKey="theme-panel" 
        defaultWidth={360}
        defaultCollapsed={false}
        className="bg-white dark:bg-slate-900"
      >
        <div className="col-span-8 p-4 space-y-6">
          <div>
            <h3 className="text-lg font-medium mb-2 text-gray-900 dark:text-white">Current Theme: {theme}</h3>
            <div className="flex flex-wrap gap-2">
              {availableThemes.map(t => (
                <Button 
                  key={t} 
                  variant={theme === t ? 'default' : 'outline'} 
                  onClick={() => setTheme(t)}
                  size="sm"
                >
                  {t}
                </Button>
              ))}
            </div>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">Custom Themes</h3>
            <div className="grid grid-cols-3 gap-2">
              <Button 
                onClick={() => applyCustomTheme(blueTheme, 'blue')}
                size="sm"
                className="bg-[rgb(8,145,178)] text-white"
              >
                Blue
              </Button>
              <Button 
                onClick={() => applyCustomTheme(purpleTheme, 'purple')}
                size="sm"
                className="bg-[rgb(128,63,180)] text-white"
              >
                Purple
              </Button>
              <Button 
                onClick={() => applyCustomTheme(darkBlueTheme, 'darkBlue')}
                size="sm"
                className="bg-[rgb(30,41,59)] text-white"
              >
                Dark Blue
              </Button>
            </div>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">Theme Preview</h3>
            <div className="space-y-2">
              <div className="flex gap-2">
                <Button variant="default">Default</Button>
                <Button variant="destructive">Destructive</Button>
                <Button variant="outline">Outline</Button>
              </div>
              <div className="flex gap-2">
                <Button variant="secondary">Secondary</Button>
                <Button variant="ghost">Ghost</Button>
                <Button variant="link">Link</Button>
              </div>
            </div>
            <Card>
              <CardHeader>
                <CardTitle>Card Example</CardTitle>
                <p className="text-sm text-gray-500 dark:text-gray-400">This is a card component with the current theme</p>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 dark:text-gray-300">Card content with theme colors applied.</p>
              </CardContent>
              <div className="px-6 pb-6">
                <Button>Action</Button>
              </div>
            </Card>
          </div>
        </div>
      </UtilityPanel>
      
      <div className="flex-1 overflow-auto">
        <div className="container p-6 mx-auto">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white">Welcome to your Dashboard</h1>
            <p className="text-gray-500 dark:text-gray-400 mt-2">Here's what's happening with your business today.</p>
          </div>
          
          <div className="grid gap-6 mb-8 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Total Clients</CardTitle>
                <MdSupervisorAccount className="w-5 h-5 text-gray-500 dark:text-gray-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-900 dark:text-white">24</div>
                <p className="text-xs text-gray-500 dark:text-gray-400">+2 from last month</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Active Projects</CardTitle>
                <BsFillLightningChargeFill className="w-4 h-4 text-gray-500 dark:text-gray-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-900 dark:text-white">7</div>
                <p className="text-xs text-gray-500 dark:text-gray-400">3 due this week</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Team Members</CardTitle>
                <AiOutlineUsergroupAdd className="w-5 h-5 text-gray-500 dark:text-gray-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-900 dark:text-white">12</div>
                <p className="text-xs text-gray-500 dark:text-gray-400">2 new this month</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Analytics</CardTitle>
                <MdOutlineAnalytics className="w-5 h-5 text-gray-500 dark:text-gray-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-900 dark:text-white">$14.2k</div>
                <p className="text-xs text-gray-500 dark:text-gray-400">+8% from last month</p>
              </CardContent>
            </Card>
          </div>
          
          <div className="grid gap-6 mb-8 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <p className="text-sm text-gray-500 dark:text-gray-400">Common tasks to help you get started</p>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <Button className="w-full">Add New Client</Button>
                  <Button className="w-full">Create Project</Button>
                  <Button className="w-full">Generate Invoice</Button>
                  <Button className="w-full">Schedule Meeting</Button>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <p className="text-sm text-gray-500 dark:text-gray-400">Latest updates from your team</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivities.map(activity => (
                    <div key={activity.id} className="border-b pb-3 last:border-0 last:pb-0">
                      <div className="flex justify-between">
                        <h4 className="font-medium text-gray-800 dark:text-gray-200">{activity.title}</h4>
                        <span className="text-xs text-gray-500 dark:text-gray-400">{activity.time}</span>
                      </div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{activity.description}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
              <div className="px-6 pb-6">
                <Button variant="outline" className="w-full">View All Activity</Button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DefaultDashboardPage; 