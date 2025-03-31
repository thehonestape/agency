import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import MainNavbar from '@/components/navigation/MainNavbar';
import { cn } from '@/lib/utils';

// Define the sections that will be in the design system
const sections = [
  { id: 'typography', label: 'Typography' },
  { id: 'colors', label: 'Colors' },
  { id: 'buttons', label: 'Buttons' },
  { id: 'forms', label: 'Forms' },
  { id: 'cards', label: 'Cards' },
  { id: 'navigation', label: 'Navigation' },
  { id: 'feedback', label: 'Feedback' },
  { id: 'layout', label: 'Layout' },
];

interface DesignSystemLayoutProps {
  children: React.ReactNode;
}

export default function DesignSystemLayout({ children }: DesignSystemLayoutProps) {
  const location = useLocation();
  const [activeSection, setActiveSection] = useState<string>('');

  // Set the active section based on the URL hash
  useEffect(() => {
    const hash = location.hash.replace('#', '');
    if (hash && sections.some(section => section.id === hash)) {
      setActiveSection(hash);
    } else {
      // Default to the first section if no hash or invalid hash
      setActiveSection(sections[0].id);
    }
  }, [location.hash]);

  // Handle scroll to section
  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    // Update URL hash without causing a page reload
    window.history.pushState(null, '', `#${sectionId}`);
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Main Navigation Bar */}
      <MainNavbar />
      
      {/* Page Header */}
      <div className="bg-muted">
        <div className="container py-6">
          <h1 className="text-3xl font-bold">Design</h1>
          <p className="text-muted-foreground mt-2">
            Our complete design system documentation
          </p>
        </div>
      </div>
      
      {/* Main Content with Sidebar */}
      <div className="container flex-1 flex py-8">
        {/* Sidebar Navigation */}
        <aside className="w-64 flex-shrink-0 pr-8">
          <nav className="sticky top-8 space-y-1">
            {sections.map(section => (
              <button
                key={section.id}
                className={cn(
                  "w-full text-left px-4 py-2 rounded-md text-sm font-medium transition-colors",
                  activeSection === section.id
                    ? "bg-primary text-primary-foreground"
                    : "hover:bg-muted"
                )}
                onClick={() => scrollToSection(section.id)}
              >
                {section.label}
              </button>
            ))}
          </nav>
        </aside>
        
        {/* Main Content */}
        <main className="flex-1">
          {children}
        </main>
      </div>
      
      {/* Footer */}
      <footer className="border-t py-6">
        <div className="container text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} Workhorse Design. All rights reserved.
        </div>
      </footer>
    </div>
  );
} 