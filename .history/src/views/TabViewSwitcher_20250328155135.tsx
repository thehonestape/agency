import { ReactNode } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';

// Simple interface for our views
type View = {
  id: string;
  label: string;
  content: ReactNode;
};

// Props for our component
type TabViewSwitcherProps = {
  views: View[];
  defaultView?: string;
};

/**
 * A tabs-based view switcher that uses the Tabs component.
 * No routing, just simple state-based views.
 */
export default function TabViewSwitcher({ views, defaultView }: TabViewSwitcherProps) {
  // Default to the first view if no default is provided
  const defaultTab = defaultView || views[0]?.id;
  
  return (
    <Tabs defaultValue={defaultTab} className="w-full">
      <TabsList className="grid w-full grid-cols-3">
        {views.map(view => (
          <TabsTrigger key={view.id} value={view.id}>
            {view.label}
          </TabsTrigger>
        ))}
      </TabsList>
      
      {views.map(view => (
        <TabsContent key={view.id} value={view.id} className="mt-6">
          {view.content}
        </TabsContent>
      ))}
    </Tabs>
  );
} 