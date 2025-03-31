import React from 'react';
import { ThemeProvider } from 'next-themes';
import { Toaster } from 'react-hot-toast';
import { AppShell } from '../components/ui/shell/AppShell';
import { BrandSidebarWithHeader } from './application/sidebar/BrandSidebarWithHeader';

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <AppShell>
        <BrandSidebarWithHeader>
          {children}
        </BrandSidebarWithHeader>
      </AppShell>
      <Toaster position="top-right" />
    </ThemeProvider>
  );
};

export default MainLayout; 