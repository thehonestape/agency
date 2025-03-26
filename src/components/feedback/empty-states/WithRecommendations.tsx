import React from 'react';
import { Bars4Icon, PhotoIcon } from '@heroicons/react/24/outline';

export interface RecommendationItem {
  title: string;
  description?: string;
  icon?: React.ElementType;
  iconColor?: string;
  href?: string;
  onClick?: () => void;
}

export interface WithRecommendationsProps {
  title: string;
  description: string;
  items?: RecommendationItem[];
  className?: string;
}

export function WithRecommendations({
  title,
  description,
  items,
  className = ''
}: WithRecommendationsProps) {
  const defaultItems: RecommendationItem[] = [
    {
      title: 'Create a Task List',
      description: 'Get started with a simple to-do list',
      icon: Bars4Icon,
      iconColor: 'text-blue-500',
    },
    {
      title: 'Upload Images',
      description: 'Add your photos to get started',
      icon: PhotoIcon,
      iconColor: 'text-green-500',
    }
  ];

  const displayItems = items || defaultItems;

  return (
    <div className={className}>
      <div className="text-center">
        <h2 className="text-base font-semibold text-gray-900">{title}</h2>
        <p className="mt-1 text-sm text-gray-500">{description}</p>
      </div>
      
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
        {displayItems.map((item, index) => {
          const Icon = item.icon;
          return (
            <a
              key={index}
              href={item.href || '#'}
              onClick={item.onClick}
              className="relative rounded-lg border border-gray-200 p-4 hover:bg-gray-50 hover:border-gray-300 transition-colors"
            >
              <div className="flex items-start space-x-3">
                {Icon && (
                  <div className={`shrink-0 ${item.iconColor || 'text-gray-400'}`}>
                    <Icon className="size-6" aria-hidden="true" />
                  </div>
                )}
                <div>
                  <h3 className="text-sm font-medium text-gray-900">
                    {item.title}
                  </h3>
                  {item.description && (
                    <p className="mt-1 text-sm text-gray-500">{item.description}</p>
                  )}
                </div>
              </div>
            </a>
          );
        })}
      </div>
    </div>
  );
} 