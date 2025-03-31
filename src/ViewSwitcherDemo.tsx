import { useState } from 'react';

// Define your views/pages as simple components
const HomeView = () => (
  <div>
    <h1>Home Page</h1>
    <p>This is the home view with your content.</p>
    <div className="grid grid-cols-2 gap-4 mt-4">
      <div className="bg-white p-4 rounded shadow">
        <h3>Panel 1</h3>
        <p>Content for first panel</p>
      </div>
      <div className="bg-white p-4 rounded shadow">
        <h3>Panel 2</h3>
        <p>Content for second panel</p>
      </div>
    </div>
  </div>
);

const AboutView = () => (
  <div>
    <h1>About Page</h1>
    <p>This is the about view with information about your app or company.</p>
    <div className="bg-white p-4 rounded shadow mt-4">
      <h3>Our Story</h3>
      <p>Details about your company, project or app would go here.</p>
    </div>
  </div>
);

const SettingsView = () => (
  <div>
    <h1>Settings Page</h1>
    <p>Configure your app settings here.</p>
    <div className="bg-white p-4 rounded shadow mt-4">
      <h3>Preferences</h3>
      <div className="mt-2">
        <label className="block">
          <input type="checkbox" className="mr-2" />
          Dark Mode
        </label>
        <label className="block mt-2">
          <input type="checkbox" className="mr-2" />
          Notifications
        </label>
      </div>
    </div>
  </div>
);

// Super simple view switcher
export default function ViewSwitcherDemo() {
  // State to track the current view
  const [currentView, setCurrentView] = useState('home');
  
  // Render the appropriate view based on state
  const renderView = () => {
    switch(currentView) {
      case 'home':
        return <HomeView />;
      case 'about':
        return <AboutView />;
      case 'settings':
        return <SettingsView />;
      default:
        return <HomeView />;
    }
  };
  
  return (
    <div className="p-4 max-w-4xl mx-auto">
      {/* Simple navigation */}
      <div className="flex gap-2 mb-6">
        <button 
          onClick={() => setCurrentView('home')}
          className={`px-4 py-2 rounded ${currentView === 'home' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
        >
          Home
        </button>
        <button 
          onClick={() => setCurrentView('about')}
          className={`px-4 py-2 rounded ${currentView === 'about' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
        >
          About
        </button>
        <button 
          onClick={() => setCurrentView('settings')}
          className={`px-4 py-2 rounded ${currentView === 'settings' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
        >
          Settings
        </button>
      </div>
      
      {/* View container */}
      <div className="bg-gray-100 p-6 rounded">
        {renderView()}
      </div>
    </div>
  );
} 