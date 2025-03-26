import React, { ReactNode, useEffect } from 'react';
import { useTheme } from '../../../components/theme-provider';

interface AppShellProps {
  children: ReactNode;
  forceLightMode?: boolean;
}

export const AppShell: React.FC<AppShellProps> = ({ children, forceLightMode = false }) => {
  const { setTheme } = useTheme();
  
  // Force light mode if specified
  useEffect(() => {
    if (forceLightMode) {
      setTheme('light');
    }
  }, [forceLightMode, setTheme]);
  
  return (
    <div className="h-screen flex overflow-hidden bg-background text-foreground">
      {children}
    </div>
  );
};

export default AppShell; 