import { useState, ReactNode } from 'react';
import { cn } from '@/lib/utils';

// Simple interface for views
type View = {
  id: string;
  content: ReactNode;
};

// Props for the component
type MinimalViewSwitcherProps = {
  views: View[];
  defaultView?: string;
  className?: string;
  activeView?: string; // External control of the active view
  onViewChange?: (viewId: string) => void; // Callback for view changes
};

/**
 * A truly minimal view switcher that only handles content switching.
 * Designed to integrate with your existing navigation structure.
 */
export default function MinimalViewSwitcher({ 
  views, 
  defaultView,
  className,
  activeView: externalActiveView,
  onViewChange
}: MinimalViewSwitcherProps) {
  // Internal state for the current view when not externally controlled
  const [internalActiveView, setInternalActiveView] = useState(defaultView || views[0]?.id);
  
  // Use either the external or internal active view
  const currentViewId = externalActiveView !== undefined ? externalActiveView : internalActiveView;
  
  // Find the active view content
  const activeViewContent = views.find(view => view.id === currentViewId)?.content || views[0]?.content;
  
  // Handle view changes
  const handleViewChange = (viewId: string) => {
    if (externalActiveView === undefined) {
      setInternalActiveView(viewId);
    }
    
    if (onViewChange) {
      onViewChange(viewId);
    }
  };
  
  return (
    <div className={cn("w-full", className)}>
      {activeViewContent}
    </div>
  );
} 