import React, { ReactNode } from 'react';
import { Link } from 'react-router-dom';

interface NavItem {
  label: string;
  icon?: ReactNode;
  href?: string;
  active?: boolean;
  items?: {
    label: string;
    href?: string;
    active?: boolean;
  }[];
}

interface SideNavProps {
  items: NavItem[];
}

export const SideNav: React.FC<SideNavProps> = ({ items }) => {
  return (
    <div className="hidden md:flex md:flex-col md:w-64 md:bg-gray-50 dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700">
      <div className="flex flex-col h-0 flex-1 overflow-y-auto">
        <div className="flex-1 flex flex-col pt-5 pb-4">
          <div className="flex items-center flex-shrink-0 px-4">
            <h1 className="text-xl font-bold text-gray-900 dark:text-white">Workhorse</h1>
          </div>
          
          <nav className="mt-8 flex-1 px-4 space-y-4">
            {items.map((group, groupIndex) => (
              <div key={groupIndex} className="space-y-2">
                <h3 className="text-xs uppercase tracking-widest font-semibold text-gray-500 dark:text-gray-400 flex items-center">
                  {group.icon && <span className="mr-2">{group.icon}</span>}
                  {group.label}
                </h3>
                
                <div className="space-y-1">
                  {group.items?.map((item, itemIndex) => (
                    <Link
                      key={itemIndex}
                      to={item.href || '#'}
                      className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md ${
                        item.active
                          ? 'bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-200'
                          : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white'
                      }`}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
};

export default SideNav; 