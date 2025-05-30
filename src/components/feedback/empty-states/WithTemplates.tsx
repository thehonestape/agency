import React from 'react';
import {
  Bars4Icon,
  CalendarIcon,
  ClockIcon,
  PhotoIcon,
  TableCellsIcon,
  ViewColumnsIcon,
} from '@heroicons/react/24/outline';

export interface TemplateItem {
  title: string;
  description: string;
  icon: React.ElementType;
  background: string;
  href?: string;
  onClick?: () => void;
}

export interface WithTemplatesProps {
  title: string;
  description: string;
  items?: TemplateItem[];
  emptyProjectLinkText?: string;
  emptyProjectHref?: string;
  onEmptyProjectClick?: () => void;
  className?: string;
}

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

export function WithTemplates({
  title,
  description,
  items,
  emptyProjectLinkText = 'Or start from an empty project',
  emptyProjectHref,
  onEmptyProjectClick,
  className = ''
}: WithTemplatesProps) {
  const defaultItems: TemplateItem[] = [
    {
      title: 'Create a List',
      description: 'Another to-do system you\'ll try but eventually give up on.',
      icon: Bars4Icon,
      background: 'bg-pink-500',
    },
    {
      title: 'Create a Calendar',
      description: 'Stay on top of your deadlines, or don\'t — it\'s up to you.',
      icon: CalendarIcon,
      background: 'bg-yellow-500',
    },
    {
      title: 'Create a Gallery',
      description: 'Great for mood boards and inspiration.',
      icon: PhotoIcon,
      background: 'bg-green-500',
    },
    {
      title: 'Create a Board',
      description: 'Track tasks in different stages of your project.',
      icon: ViewColumnsIcon,
      background: 'bg-blue-500',
    },
    {
      title: 'Create a Spreadsheet',
      description: 'Lots of numbers and things — good for nerds.',
      icon: TableCellsIcon,
      background: 'bg-indigo-500',
    },
    {
      title: 'Create a Timeline',
      description: 'Get a birds-eye-view of your procrastination.',
      icon: ClockIcon,
      background: 'bg-purple-500',
    },
  ];

  const displayItems = items || defaultItems;

  return (
    <div className={className}>
      <h2 className="text-base font-semibold text-gray-900">{title}</h2>
      <p className="mt-1 text-sm text-gray-500">{description}</p>
      <ul role="list" className="mt-6 grid grid-cols-1 gap-6 border-t border-b border-gray-200 py-6 sm:grid-cols-2">
        {displayItems.map((item, itemIdx) => (
          <li key={itemIdx} className="flow-root">
            <div className="relative -m-2 flex items-center space-x-4 rounded-xl p-2 focus-within:ring-2 focus-within:ring-indigo-500 hover:bg-gray-50">
              <div
                className={classNames(item.background, 'flex size-16 shrink-0 items-center justify-center rounded-lg')}
              >
                <item.icon aria-hidden="true" className="size-6 text-white" />
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-900">
                  <a 
                    href={item.href || '#'} 
                    onClick={item.onClick}
                    className="focus:outline-hidden"
                  >
                    <span aria-hidden="true" className="absolute inset-0" />
                    <span>{item.title}</span>
                    <span aria-hidden="true"> &rarr;</span>
                  </a>
                </h3>
                <p className="mt-1 text-sm text-gray-500">{item.description}</p>
              </div>
            </div>
          </li>
        ))}
      </ul>
      {(emptyProjectHref || onEmptyProjectClick) && (
        <div className="mt-4 flex">
          <a 
            href={emptyProjectHref || '#'} 
            onClick={onEmptyProjectClick}
            className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
          >
            {emptyProjectLinkText}
            <span aria-hidden="true"> &rarr;</span>
          </a>
        </div>
      )}
    </div>
  );
} 