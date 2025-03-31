import { ReactNode, useState } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

// Type definitions
export type ViewConfig = {
  id: string;
  label: string;
  content: ReactNode;
  icon?: ReactNode;
};

export type ViewSwitcherProps = {
  views: ViewConfig[];
  defaultView?: string;
  variant?: 'tabs' | 'buttons' | 'sidebar';
  className?: string;
  contentClassName?: string;
};

/**
 * A minimal view switcher component that can be inserted into any existing layout
 * without adding extra navigation bars.
 */
export default function SimpleViewSwitcher({
  views,
  defaultView,
  variant = 'tabs',
  className = '',
  contentClassName = '',
}: ViewSwitcherProps) {
  const [activeView, setActiveView] = useState(defaultView || views[0]?.id || '');

  if (!views.length) {
    return <div className="text-muted-foreground">No views configured</div>;
  }

  // Render based on variant
  switch (variant) {
    case 'tabs':
      return (
        <Tabs value={activeView} onValueChange={setActiveView} className={cn('w-full', className)}>
          <TabsList className="w-full grid grid-flow-col auto-cols-fr">
            {views.map((view) => (
              <TabsTrigger key={view.id} value={view.id} className="flex items-center gap-2">
                {view.icon && <span>{view.icon}</span>}
                <span>{view.label}</span>
              </TabsTrigger>
            ))}
          </TabsList>

          <div className={cn('mt-6', contentClassName)}>
            {views.map((view) => (
              <TabsContent key={view.id} value={view.id}>
                {view.content}
              </TabsContent>
            ))}
          </div>
        </Tabs>
      );

    case 'buttons':
      return (
        <div className={cn('w-full', className)}>
          <div className="flex gap-2 border-b pb-2 mb-6">
            {views.map((view) => (
              <Button
                key={view.id}
                variant={activeView === view.id ? 'default' : 'outline'}
                onClick={() => setActiveView(view.id)}
                className="flex items-center gap-2"
              >
                {view.icon && <span>{view.icon}</span>}
                {view.label}
              </Button>
            ))}
          </div>

          <div className={contentClassName}>
            {views.map((view) => (
              view.id === activeView && (
                <div key={view.id}>{view.content}</div>
              )
            ))}
          </div>
        </div>
      );

    case 'sidebar':
      return (
        <div className={cn('grid grid-cols-1 md:grid-cols-[200px_1fr] gap-6', className)}>
          <div className="space-y-1 bg-card p-3 rounded-lg border">
            {views.map((view) => (
              <Button
                key={view.id}
                variant={activeView === view.id ? 'default' : 'ghost'}
                onClick={() => setActiveView(view.id)}
                className="w-full justify-start"
                size="sm"
              >
                {view.icon && <span className="mr-2">{view.icon}</span>}
                {view.label}
              </Button>
            ))}
          </div>

          <div className={contentClassName}>
            {views.map((view) => (
              view.id === activeView && (
                <div key={view.id}>{view.content}</div>
              )
            ))}
          </div>
        </div>
      );
  }
} 