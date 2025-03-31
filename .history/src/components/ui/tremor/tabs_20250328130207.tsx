import React from 'react';
import { 
  TabGroup as TremorTabGroup, 
  TabList as TremorTabList,
  Tab as TremorTab,
  TabPanel as TremorTabPanel,
  TabPanels as TremorTabPanels
} from '@tremor/react';
import { cn } from '@/lib/utils';
import { getTremorColor } from './theme-config';

// TabGroup
interface TabGroupProps {
  className?: string;
  children: React.ReactNode;
  defaultIndex?: number;
  index?: number;
  onIndexChange?: (index: number) => void;
}

export const TabGroup = React.forwardRef<HTMLDivElement, TabGroupProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <TremorTabGroup
        ref={ref}
        className={cn('w-full', className)}
        {...props}
      >
        {children}
      </TremorTabGroup>
    );
  }
);

TabGroup.displayName = 'TabGroup';

// TabList
interface TabListProps {
  className?: string;
  children: React.ReactNode;
  variant?: "line" | "solid";
  color?: string;
}

export const TabList = React.forwardRef<HTMLDivElement, TabListProps>(
  ({ className, color = 'primary', children, ...props }, ref) => {
    // Map the color to a valid Tremor color
    const tremorColor = getTremorColor(color);
    
    return (
      <TremorTabList
        ref={ref}
        className={cn('border-border', className)}
        color={tremorColor}
        {...props}
      >
        {children}
      </TremorTabList>
    );
  }
);

TabList.displayName = 'TabList';

// Tab
interface TabProps {
  className?: string;
  children: React.ReactNode;
}

export const Tab = React.forwardRef<HTMLButtonElement, TabProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <TremorTab
        ref={ref}
        className={cn('text-foreground hover:text-primary', className)}
        {...props}
      >
        {children}
      </TremorTab>
    );
  }
);

Tab.displayName = 'Tab';

// TabPanels
interface TabPanelsProps {
  className?: string;
  children: React.ReactNode;
}

export const TabPanels = React.forwardRef<HTMLDivElement, TabPanelsProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <TremorTabPanels
        ref={ref}
        className={cn('mt-2', className)}
        {...props}
      >
        {children}
      </TremorTabPanels>
    );
  }
);

TabPanels.displayName = 'TabPanels';

// TabPanel
interface TabPanelProps {
  className?: string;
  children: React.ReactNode;
}

export const TabPanel = React.forwardRef<HTMLDivElement, TabPanelProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <TremorTabPanel
        ref={ref}
        className={cn('p-0', className)}
        {...props}
      >
        {children}
      </TremorTabPanel>
    );
  }
);

TabPanel.displayName = 'TabPanel';

// Export the original components for those who need them
export { TremorTabGroup as TabGroup, TremorTab as Tab, TremorTabPanel as TabPanel, TremorTabPanels as TabPanels }; 