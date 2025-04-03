import * as React from 'react';
import { LightbulbIcon, AlertTriangleIcon, InfoIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

const styles = {
  note: {
    container: 'bg-muted border-l-4 border-accent',
    title: 'text-foreground',
    body: 'text-muted-foreground',
  },
  warning: {
    container: 'bg-muted border-l-4 border-destructive',
    title: 'text-foreground',
    body: 'text-muted-foreground',
  },
  info: {
    container: 'bg-muted border-l-4 border-primary',
    title: 'text-foreground',
    body: 'text-muted-foreground',
  },
};

const icons = {
  note: (props: { className?: string }) => <LightbulbIcon {...props} />,
  warning: (props: { className?: string }) => <AlertTriangleIcon {...props} />,
  info: (props: { className?: string }) => <InfoIcon {...props} />,
};

interface CalloutProps {
  title: string;
  children: React.ReactNode;
  type?: keyof typeof styles;
  className?: string;
}

export function Callout({ title, children, type = 'note', className }: CalloutProps) {
  const IconComponent = icons[type];
  
  // Get the appropriate icon color based on type
  const iconColorClass = type === 'note' 
    ? 'text-accent' 
    : type === 'warning' 
      ? 'text-destructive' 
      : 'text-primary';

  return (
    <div className={cn('my-6 flex rounded-lg p-4', styles[type].container, className)}>
      <IconComponent className={cn(iconColorClass, 'h-6 w-6 flex-none')} />
      <div className="ml-4 flex-auto">
        <p className={cn('m-0 text-lg font-medium', styles[type].title)}>{title}</p>
        <div className={cn('mt-2', styles[type].body)}>{children}</div>
      </div>
    </div>
  );
}
