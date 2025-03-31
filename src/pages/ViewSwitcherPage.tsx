import { useState } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Navbar } from '@/components/ui/navigation/navbar';
import { cn } from '@/lib/utils';

// Define our views
const VIEWS = {
  HOME: 'home',
  ABOUT: 'about',
  SETTINGS: 'settings',
};

// Define our view components
const HomeView = () => (
  <div className="p-8 max-w-4xl mx-auto">
    <h1 className="text-4xl font-bold mb-6">Home</h1>
    <p className="text-lg mb-4">
      Welcome to the home view. This is a simple example of using state to manage views without React Router.
    </p>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
      <div className="bg-card p-6 rounded-lg shadow-sm">
        <h2 className="text-xl font-semibold mb-2">Feature 1</h2>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
      </div>
      <div className="bg-card p-6 rounded-lg shadow-sm">
        <h2 className="text-xl font-semibold mb-2">Feature 2</h2>
        <p>Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
      </div>
    </div>
  </div>
);

const AboutView = () => (
  <div className="p-8 max-w-4xl mx-auto">
    <h1 className="text-4xl font-bold mb-6">About</h1>
    <p className="text-lg mb-4">
      This is the about view. It provides information about this application.
    </p>
    <div className="mt-6 bg-muted p-6 rounded-lg">
      <h2 className="text-xl font-semibold mb-4">Our Story</h2>
      <p className="mb-4">
        This example demonstrates a simple view switching mechanism without using React Router.
        It's perfect for prototyping or creating simple applications where you don't need complex routing.
      </p>
      <p>
        The views are managed using React state, making it easy to switch between different screens
        without page reloads or URL changes.
      </p>
    </div>
  </div>
);

const SettingsView = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);
  
  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold mb-6">Settings</h1>
      <p className="text-lg mb-6">
        Configure your application preferences here.
      </p>
      
      <div className="space-y-6">
        <div className="bg-card p-6 rounded-lg shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-medium">Dark Mode</h3>
              <p className="text-muted-foreground">Toggle between light and dark themes</p>
            </div>
            <Button 
              variant={isDarkMode ? "default" : "outline"}
              onClick={() => setIsDarkMode(!isDarkMode)}
            >
              {isDarkMode ? "Enabled" : "Disabled"}
            </Button>
          </div>
        </div>
        
        <div className="bg-card p-6 rounded-lg shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-medium">Notifications</h3>
              <p className="text-muted-foreground">Receive alerts and notifications</p>
            </div>
            <Button 
              variant={notifications ? "default" : "outline"}
              onClick={() => setNotifications(!notifications)}
            >
              {notifications ? "Enabled" : "Disabled"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Main component with tab-based view switching
const ViewSwitcherWithTabs = () => {
  const [activeView, setActiveView] = useState(VIEWS.HOME);

  return (
    <div className="min-h-screen bg-background">
      <Navbar className="border-b border-border px-6">
        <div className="flex-1">
          <h1 className="text-xl font-bold">My App</h1>
        </div>
      </Navbar>
      
      <Tabs value={activeView} onValueChange={setActiveView} className="mx-auto max-w-5xl py-6">
        <div className="px-4">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value={VIEWS.HOME}>Home</TabsTrigger>
            <TabsTrigger value={VIEWS.ABOUT}>About</TabsTrigger>
            <TabsTrigger value={VIEWS.SETTINGS}>Settings</TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value={VIEWS.HOME}>
          <HomeView />
        </TabsContent>
        
        <TabsContent value={VIEWS.ABOUT}>
          <AboutView />
        </TabsContent>
        
        <TabsContent value={VIEWS.SETTINGS}>
          <SettingsView />
        </TabsContent>
      </Tabs>
    </div>
  );
};

// Alternative implementation with button-based navigation
const ViewSwitcherWithButtons = () => {
  const [activeView, setActiveView] = useState(VIEWS.HOME);

  return (
    <div className="min-h-screen bg-background">
      <Navbar className="border-b border-border px-6">
        <div className="flex-1">
          <h1 className="text-xl font-bold">My App</h1>
        </div>
        <div className="flex gap-2">
          <Button
            variant={activeView === VIEWS.HOME ? "default" : "outline"}
            onClick={() => setActiveView(VIEWS.HOME)}
          >
            Home
          </Button>
          <Button
            variant={activeView === VIEWS.ABOUT ? "default" : "outline"}
            onClick={() => setActiveView(VIEWS.ABOUT)}
          >
            About
          </Button>
          <Button
            variant={activeView === VIEWS.SETTINGS ? "default" : "outline"}
            onClick={() => setActiveView(VIEWS.SETTINGS)}
          >
            Settings
          </Button>
        </div>
      </Navbar>
      
      <div className="container mx-auto py-6">
        {activeView === VIEWS.HOME && <HomeView />}
        {activeView === VIEWS.ABOUT && <AboutView />}
        {activeView === VIEWS.SETTINGS && <SettingsView />}
      </div>
    </div>
  );
};

// Export both versions, but use the tab version as default
export default ViewSwitcherWithTabs;
export { ViewSwitcherWithButtons }; 