import React, { ReactNode } from 'react';

interface TopBarProps {
  title?: string;
  rightContent?: ReactNode;
}

export const TopBar: React.FC<TopBarProps> = ({ title = 'Dashboard', rightContent }) => {
  return (
    <header className="border-b border-border bg-card">
      <div className="flex items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <h1 className="text-xl font-semibold text-foreground">{title}</h1>
        {rightContent && <div className="flex items-center space-x-4">{rightContent}</div>}
      </div>
    </header>
  );
};

export default TopBar;
