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
  containerClassName?: string;
  orientation?: 'horizontal' | 'vertical';
};

/**
 * A flexible ViewSwitcher component that can be used to create simple navigation
 * between different views without using React Router.
 * 
 * Supports multiple display variants and orientations.
 */
export const ViewSwitcher = ({
  views,
  defaultView,
  variant = 'tabs',
  className = '',
  containerClassName = '',
  orientation = 'horizontal',
}: ViewSwitcherProps) => {
  const [activeView, setActiveView] = useState(defaultView || views[0]?.id || '');

  if (!views.length) {
    return <div className="p-4 text-muted-foreground">No views configured</div>;
  }

  // Helper to render the right navigation variant
  const renderNavigation = () => {
    switch (variant) {
      case 'tabs':
        return (
          <Tabs 
            value={activeView} 
            onValueChange={setActiveView} 
            className={cn(
              'w-full',
              orientation === 'vertical' && 'flex flex-row',
              containerClassName
            )}
          >
            <div className={cn(
              orientation === 'vertical' 
                ? 'w-48 flex-shrink-0 border-r pr-2' 
                : 'mb-4'
            )}>
              <TabsList 
                className={cn(
                  orientation === 'vertical' 
                    ? 'flex flex-col h-auto w-full space-y-1' 
                    : 'grid grid-flow-col auto-cols-fr w-full',
                  className
                )}
              >
                {views.map((view) => (
                  <TabsTrigger 
                    key={view.id} 
                    value={view.id}
                    className={cn(
                      'flex items-center space-x-2',
                      orientation === 'vertical' && 'justify-start'
                    )}
                  >
                    {view.icon && <span>{view.icon}</span>}
                    <span>{view.label}</span>
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>
            
            <div className={cn(
              'flex-grow',
              orientation === 'vertical' && 'pl-6'
            )}>
              {views.map((view) => (
                <TabsContent 
                  key={view.id} 
                  value={view.id}
                  className="mt-0 pt-2"
                >
                  {view.content}
                </TabsContent>
              ))}
            </div>
          </Tabs>
        );
        
      case 'buttons':
        return (
          <div className={cn('w-full', containerClassName)}>
            <div className={cn(
              'flex mb-6 border-b pb-2',
              orientation === 'vertical' 
                ? 'flex-col space-y-2 border-b-0 border-r pr-2 pb-0 mb-0 w-48 flex-shrink-0' 
                : 'space-x-2',
              className
            )}>
              {views.map((view) => (
                <Button
                  key={view.id}
                  variant={activeView === view.id ? 'default' : 'outline'}
                  onClick={() => setActiveView(view.id)}
                  className={cn(
                    'flex items-center',
                    orientation === 'vertical' && 'justify-start w-full'
                  )}
                >
                  {view.icon && <span className="mr-2">{view.icon}</span>}
                  {view.label}
                </Button>
              ))}
            </div>
            
            <div className={cn(
              orientation === 'vertical' && 'flex-grow pl-6',
              'flex-grow'
            )}>
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
          <div className={cn(
            'grid grid-cols-1 md:grid-cols-[240px_1fr] gap-4',
            containerClassName
          )}>
            <div className={cn(
              'bg-card p-4 rounded-lg border',
              className
            )}>
              <div className="space-y-1">
                {views.map((view) => (
                  <Button
                    key={view.id}
                    variant={activeView === view.id ? 'default' : 'ghost'}
                    onClick={() => setActiveView(view.id)}
                    className="justify-start w-full"
                  >
                    {view.icon && <span className="mr-2">{view.icon}</span>}
                    {view.label}
                  </Button>
                ))}
              </div>
            </div>
            
            <div className="p-4">
              {views.map((view) => (
                view.id === activeView && (
                  <div key={view.id}>{view.content}</div>
                )
              ))}
            </div>
          </div>
        );
    }
  };

  return (
    <div className={cn(
      'w-full',
      orientation === 'vertical' && 'flex',
    )}>
      {renderNavigation()}
    </div>
  );
}; 