import React from 'react';
import { ViewSwitcher, View } from './ViewSwitcher';
import { NavBar } from './NavBar';

const HomeView: React.FC = () => (
  <div className="p-6">
    <h1 className="text-2xl font-bold mb-4">Home</h1>
    <p className="text-gray-700">This is the home view of the prototype. The navigation is handled using React state without React Router.</p>
    <div className="mt-4 p-6 border rounded-lg bg-gray-50">
      <h3 className="text-lg font-medium mb-2">Key Features</h3>
      <ul className="list-disc list-inside space-y-1">
        <li>Simple state-based navigation</li>
        <li>No external routing libraries</li>
        <li>Clean view separation</li>
      </ul>
    </div>
  </div>
);

const AboutView: React.FC = () => (
  <div className="p-6">
    <h1 className="text-2xl font-bold mb-4">About</h1>
    <p className="text-gray-700">This is the about view where you can learn more about this prototype.</p>
    <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="p-4 border rounded-lg bg-white shadow-sm">
        <h3 className="text-lg font-medium mb-2">Purpose</h3>
        <p className="text-gray-600">This prototype demonstrates a clean way to handle view switching in React without external libraries.</p>
      </div>
      <div className="p-4 border rounded-lg bg-white shadow-sm">
        <h3 className="text-lg font-medium mb-2">Implementation</h3>
        <p className="text-gray-600">Uses React Context API and useState hook to manage the current view state.</p>
      </div>
    </div>
  </div>
);

const SettingsView: React.FC = () => (
  <div className="p-6">
    <h1 className="text-2xl font-bold mb-4">Settings</h1>
    <p className="text-gray-700">This is the settings view where you can configure the prototype.</p>
    <div className="mt-6 max-w-md">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1" id="theme-label">Theme</label>
          <select 
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
            aria-labelledby="theme-label"
          >
            <option>Light</option>
            <option>Dark</option>
            <option>System</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1" id="language-label">Language</label>
          <select 
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
            aria-labelledby="language-label"
          >
            <option>English</option>
            <option>Spanish</option>
            <option>French</option>
          </select>
        </div>
        <div className="pt-2">
          <button className="px-4 py-2 bg-primary text-white rounded-md hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">
            Save Settings
          </button>
        </div>
      </div>
    </div>
  </div>
);

export const ViewPrototype: React.FC = () => {
  return (
    <ViewSwitcher>
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <NavBar />
        <main className="flex-1">
          <View name="home">
            <HomeView />
          </View>
          <View name="about">
            <AboutView />
          </View>
          <View name="settings">
            <SettingsView />
          </View>
        </main>
      </div>
    </ViewSwitcher>
  );
}; 