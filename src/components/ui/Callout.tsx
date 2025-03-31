import * as React from 'react';
import { LightbulbIcon, AlertTriangleIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

const styles = {
  note: {
    container: 'bg-accent dark:bg-accent/20 border-l-4 border-accent-foreground',
    title: 'text-accent-foreground dark:text-accent-foreground',
    body: 'text-accent-foreground/90 dark:text-accent-foreground/90',
  },
  warning: {
    container: 'bg-destructive/20 dark:bg-destructive/20 border-l-4 border-destructive',
    title: 'text-destructive-foreground dark:text-destructive-foreground',
    body: 'text-destructive-foreground/90 dark:text-destructive-foreground/90',
  },
  info: {
    container: 'bg-primary/10 dark:bg-primary/10 border-l-4 border-primary',
    title: 'text-primary-foreground dark:text-primary-foreground',
    body: 'text-primary-foreground/90 dark:text-primary-foreground/90',
  },
};

const icons = {
  note: (props: { className?: string }) => <LightbulbIcon {...props} />,
  warning: (props: { className?: string }) => <AlertTriangleIcon {...props} />,
  info: (props: { className?: string }) => <AlertTriangleIcon {...props} />,
};

interface CalloutProps {
  title: string;
  children: React.ReactNode;
  type?: keyof typeof styles;
  className?: string;
}

export function Callout({ title, children, type = 'note', className }: CalloutProps) {
  const IconComponent = icons[type];

  return (
    <div className={cn('my-6 flex rounded-lg p-4', styles[type].container, className)}>
      <IconComponent className="text-accent-foreground h-6 w-6 flex-none" />
      <div className="ml-4 flex-auto">
        <p className={cn('m-0 text-lg font-medium', styles[type].title)}>{title}</p>
        <div className={cn('prose mt-2', styles[type].body)}>{children}</div>
      </div>
    </div>
  );
}
