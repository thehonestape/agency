import React from 'react';
import { ArrowTrendingUpIcon, ArrowTrendingDownIcon, MinusIcon } from '@heroicons/react/24/solid';

type Stat = {
  id: string;
  name: string;
  value: string;
  change: number;
  changeType?: 'increase' | 'decrease' | 'neutral';
  previousPeriod?: string;
};

type StatsSectionProps = {
  title?: string;
  description?: string;
  stats?: Stat[];
  className?: string;
  columns?: 3 | 4 | 5;
};

export default function StatsSection({
  title = "Last 30 days",
  description = "Key metrics to help you track performance across your business",
  stats = defaultStats,
  className = "",
  columns = 4,
}: StatsSectionProps) {
  return (
    <section className={`bg-white py-24 sm:py-32 ${className}`}>
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">{title}</h2>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            {description}
          </p>
        </div>
        <div className={`mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 overflow-hidden lg:mx-0 lg:max-w-none lg:grid-cols-${columns}`}>
          {stats.map((stat) => (
            <StatCard key={stat.id} stat={stat} />
          ))}
        </div>
      </div>
    </section>
  );
}

function StatCard({ stat }: { stat: Stat }) {
  const getChangeColor = (change: number, changeType?: 'increase' | 'decrease' | 'neutral') => {
    if (changeType === 'increase') return 'text-green-600';
    if (changeType === 'decrease') return 'text-red-600';
    if (changeType === 'neutral') return 'text-gray-600';
    
    return change > 0 ? 'text-green-600' : change < 0 ? 'text-red-600' : 'text-gray-600';
  };

  const getChangeIcon = (change: number, changeType?: 'increase' | 'decrease' | 'neutral') => {
    if (changeType === 'increase') return <ArrowTrendingUpIcon className="h-4 w-4 text-green-600" aria-hidden="true" />;
    if (changeType === 'decrease') return <ArrowTrendingDownIcon className="h-4 w-4 text-red-600" aria-hidden="true" />;
    if (changeType === 'neutral') return <MinusIcon className="h-4 w-4 text-gray-600" aria-hidden="true" />;
    
    return change > 0 ? (
      <ArrowTrendingUpIcon className="h-4 w-4 text-green-600" aria-hidden="true" />
    ) : change < 0 ? (
      <ArrowTrendingDownIcon className="h-4 w-4 text-red-600" aria-hidden="true" />
    ) : (
      <MinusIcon className="h-4 w-4 text-gray-600" aria-hidden="true" />
    );
  };

  return (
    <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
      <p className="text-sm font-medium leading-6 text-gray-600">{stat.name}</p>
      <p className="mt-2 flex items-baseline gap-x-2">
        <span className="text-4xl font-semibold tracking-tight text-gray-900">{stat.value}</span>
      </p>
      <div className="mt-4 flex items-center text-xs">
        {getChangeIcon(stat.change, stat.changeType)}
        <span className={`ml-1 text-sm font-medium ${getChangeColor(stat.change, stat.changeType)}`}>
          {Math.abs(stat.change)}%
        </span>
        <span className="ml-1 text-sm text-gray-500">{stat.previousPeriod || 'vs. previous period'}</span>
      </div>
    </div>
  );
}

const defaultStats: Stat[] = [
  {
    id: '1',
    name: 'Total Revenue',
    value: '$45,231',
    change: 12.3,
    changeType: 'increase',
    previousPeriod: 'from last month'
  },
  {
    id: '2',
    name: 'New Customers',
    value: '2,463',
    change: 5.4,
    changeType: 'increase',
    previousPeriod: 'from last month'
  },
  {
    id: '3',
    name: 'Active Users',
    value: '18,472',
    change: 2.8,
    changeType: 'increase',
    previousPeriod: 'from last month'
  },
  {
    id: '4',
    name: 'Conversion Rate',
    value: '3.6%',
    change: 0.4,
    changeType: 'decrease',
    previousPeriod: 'from last month'
  },
]; 