import { useState, ReactNode } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { cn } from '@/lib/utils';

// Simple interface for our views
type View = {
  id: string;
  label: string;
  content: ReactNode;
  icon?: ReactNode;
};

// Props for our component
type SimpleViewSwitcherProps = {
  views: View[];
  defaultView?: string;
  className?: string;
  contentClassName?: string;
};

/**
 * A simple view switcher that uses state to switch between views without React Router.
 * Uses proper UI components from the component system.
 */
export default function SimpleViewSwitcher({ 
  views, 
  defaultView,
  className,
  contentClassName
}: SimpleViewSwitcherProps) {
  // Set the current view, defaulting to the first view if no default is provided
  const [currentView, setCurrentView] = useState(defaultView || views[0]?.id);
  
  // Find the active view
  const activeView = views.find(view => view.id === currentView) || views[0];
  
  return (
    <div className={cn("w-full", className)}>
      {/* Navigation */}
      <div className="flex flex-wrap gap-2 pb-4 mb-6 border-b">
        {views.map(view => (
          <Button
            key={view.id}
            variant={currentView === view.id ? 'default' : 'outline'}
            onClick={() => setCurrentView(view.id)}
            className="flex items-center gap-2"
            size="default"
          >
            {view.icon && <span>{view.icon}</span>}
            {view.label}
          </Button>
        ))}
      </div>
      
      {/* View content */}
      <Card className={cn("border shadow-sm", contentClassName)}>
        <CardHeader>
          <CardTitle>
            {activeView?.label}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {activeView?.content}
        </CardContent>
      </Card>
    </div>
  );
} 