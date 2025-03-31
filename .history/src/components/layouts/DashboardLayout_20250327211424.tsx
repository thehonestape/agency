import React from 'react';
import { SideNav } from '../navigation/side-nav';
import { TopBar } from '../navigation/top-bar';

interface DashboardLayoutProps {
  children: React.ReactNode;
  navigation?: Array<{
    name: string;
    href: string;
    icon: React.ComponentType<{ className?: string }>;
  }>;
  sections?: Array<{
    title: string;
    items: Array<{
      name: string;
      href: string;
      icon: React.ComponentType<{ className?: string }>;
    }>;
  }>;
}

export function DashboardLayout({ children, navigation, sections }: DashboardLayoutProps) {
  return (
    <div className="flex h-screen bg-background">
      <SideNav navigation={navigation} sections={sections} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <TopBar />
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          {children}
        </main>
      </div>
    </div>
  );
} 