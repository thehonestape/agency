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
    <div className="border-border bg-background hidden border-r md:flex md:w-64 md:flex-col">
      <div className="flex h-0 flex-1 flex-col overflow-y-auto">
        <div className="flex flex-1 flex-col pt-5 pb-4">
          <div className="flex flex-shrink-0 items-center px-4">
            <h1 className="text-foreground text-xl font-bold">Workhorse</h1>
          </div>

          <nav className="mt-8 flex-1 space-y-4 px-4">
            {items.map((group, groupIndex) => (
              <div key={groupIndex} className="space-y-2">
                <h3 className="text-muted-foreground flex items-center text-xs font-semibold tracking-widest uppercase">
                  {group.icon && <span className="mr-2">{group.icon}</span>}
                  {group.label}
                </h3>

                <div className="space-y-1">
                  {group.items?.map((item, itemIndex) => (
                    <Link
                      key={itemIndex}
                      to={item.href || '#'}
                      className={`group flex items-center rounded-md px-2 py-2 text-sm font-medium ${
                        item.active
                          ? 'bg-primary text-primary-foreground'
                          : 'text-foreground hover:bg-muted hover:text-primary'
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
