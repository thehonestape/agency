import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';

interface UIBlocksNavProps {
  activeCategory?: string;
  onCategoryChange?: (category: string) => void;
}

const UIBlocksNav: React.FC<UIBlocksNavProps> = ({ 
  activeCategory = 'marketing',
  onCategoryChange
}) => {
  const location = useLocation();

  const navItems = [
    { label: 'UI Blocks', href: '/ui-blocks', primary: true },
    { label: 'Demo', href: '/ui-blocks/demo' },
    { label: 'Style Tile', href: '/style-tile' },
  ];

  // Category items for UI Blocks page
  const categoryItems = [
    { label: 'Marketing', value: 'marketing' },
    { label: 'Application UI', value: 'application-ui' },
    { label: 'Ecommerce', value: 'ecommerce' },
    { label: 'Documentation', value: 'docs' },
  ];

  const isUIBlocksPage = location.pathname === '/ui-blocks';

  return (
    <nav className="flex items-center space-x-8">
      {navItems.map((item) => (
        <Link
          key={item.href}
          to={item.href}
          className={cn(
            'text-sm font-medium transition-colors hover:text-primary',
            item.primary ? 'font-bold' : '',
            location.pathname === item.href
              ? 'text-primary'
              : 'text-muted-foreground'
          )}
        >
          {item.label}
        </Link>
      ))}

      {isUIBlocksPage && onCategoryChange && (
        <div className="ml-8 border-l pl-8 flex items-center space-x-4">
          {categoryItems.map((item) => (
            <button
              key={item.value}
              onClick={() => onCategoryChange(item.value)}
              className={cn(
                'text-sm transition-colors hover:text-primary',
                activeCategory === item.value
                  ? 'text-primary font-medium'
                  : 'text-muted-foreground'
              )}
            >
              {item.label}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
};

export default UIBlocksNav; 