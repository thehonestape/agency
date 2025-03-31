import { useState, ReactNode } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/Card';

// Simple interface for our views
type View = {
  id: string;
  label: string;
  content: ReactNode;
};

// Props for our component
type SimpleViewSwitcherProps = {
  views: View[];
  defaultView?: string;
};

/**
 * A dead simple view switcher that just uses state to switch between views.
 * No routing, no complexity.
 */
export default function SimpleViewSwitcher({ views, defaultView }: SimpleViewSwitcherProps) {
  // Set the current view, defaulting to the first view if no default is provided
  const [currentView, setCurrentView] = useState(defaultView || views[0]?.id);
  
  // Find the active view
  const activeView = views.find(view => view.id === currentView) || views[0];
  
  return (
    <div>
      {/* Simple button navigation */}
      <div className="flex gap-2 mb-4">
        {views.map(view => (
          <Button
            key={view.id}
            variant={currentView === view.id ? 'default' : 'outline'}
            onClick={() => setCurrentView(view.id)}
          >
            {view.label}
          </Button>
        ))}
      </div>
      
      {/* View content */}
      <Card>
        <CardContent>
          {activeView?.content}
        </CardContent>
      </Card>
    </div>
  );
} 