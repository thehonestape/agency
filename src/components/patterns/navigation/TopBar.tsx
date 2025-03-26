import React, { ReactNode } from 'react';

interface TopBarProps {
  title?: string;
  rightContent?: ReactNode;
}

export const TopBar: React.FC<TopBarProps> = ({ 
  title = 'Dashboard',
  rightContent
}) => {
  return (
    <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
      <div className="px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        <h1 className="text-xl font-semibold text-gray-900 dark:text-white">{title}</h1>
        {rightContent && (
          <div className="flex items-center space-x-4">
            {rightContent}
          </div>
        )}
      </div>
    </header>
  );
};

export default TopBar; 