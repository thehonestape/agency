import React from 'react';
import { useView } from './ViewSwitcher';

interface NavItemProps {
  name: string;
  label: string;
}

const NavItem: React.FC<NavItemProps> = ({ name, label }) => {
  const { currentView, setCurrentView } = useView();
  
  return (
    <button
      onClick={() => setCurrentView(name)}
      className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
        currentView === name
          ? 'bg-primary text-white'
          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
      }`}
    >
      {label}
    </button>
  );
};

export const NavBar: React.FC = () => {
  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="text-lg font-bold">View Prototype</div>
          <nav className="flex space-x-2">
            <NavItem name="home" label="Home" />
            <NavItem name="about" label="About" />
            <NavItem name="settings" label="Settings" />
          </nav>
        </div>
      </div>
    </header>
  );
}; 