'use client';

import React from 'react';
import { SimpleCards, WithBrandIcon } from '@/components/data-display/stats';
import {
  CurrencyDollarIcon,
  UserGroupIcon,
  ArrowTrendingUpIcon,
  CubeIcon,
} from '@heroicons/react/24/outline';
import { CubeIcon as CubeSolidIcon } from '@heroicons/react/24/solid';

export default function StatsShowcase() {
  const simpleStats = [
    { name: 'Total Revenue', value: '$405,091', change: '+4.75%', changeType: 'increase' },
    { name: 'Active Users', value: '2,483', change: '+21.5%', changeType: 'increase' },
    { name: 'Conversion Rate', value: '3.6%', change: '-0.8%', changeType: 'decrease' },
    { name: 'Avg. Order Value', value: '$287.32', change: '+6.2%', changeType: 'increase' },
  ];

  const iconStats = [
    {
      name: 'Total Revenue',
      value: '$405,091',
      description: 'Last 30 days',
      icon: CurrencyDollarIcon,
      change: '+4.75%',
      changeType: 'increase',
    },
    {
      name: 'Active Users',
      value: '2,483',
      description: 'Up from 1,982 last month',
      icon: UserGroupIcon,
      change: '+21.5%',
      changeType: 'increase',
    },
    {
      name: 'Conversion Rate',
      value: '3.6%',
      description: 'Down from 4.4% last month',
      icon: ArrowTrendingUpIcon,
      change: '-0.8%',
      changeType: 'decrease',
    },
    {
      name: 'Products',
      value: '248',
      description: '18 new products added this month',
      icon: CubeIcon,
      change: '+7.8%',
      changeType: 'increase',
    },
  ];

  const brandIconStats = [
    {
      name: 'Total Revenue',
      value: '$405,091',
      description: 'Last 30 days',
      icon: CurrencyDollarIcon,
      iconBackground: 'bg-green-500',
      change: '+4.75%',
      changeType: 'increase',
    },
    {
      name: 'Active Users',
      value: '2,483',
      description: 'Up from 1,982 last month',
      icon: UserGroupIcon,
      iconBackground: 'bg-blue-500',
      change: '+21.5%',
      changeType: 'increase',
    },
    {
      name: 'Conversion Rate',
      value: '3.6%',
      description: 'Down from 4.4% last month',
      icon: ArrowTrendingUpIcon,
      iconBackground: 'bg-purple-500',
      change: '-0.8%',
      changeType: 'decrease',
    },
    {
      name: 'Products',
      value: '248',
      description: '18 new products added this month',
      icon: CubeSolidIcon,
      iconBackground: 'bg-amber-500',
      change: '+7.8%',
      changeType: 'increase',
    },
  ];

  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="mb-2 text-3xl font-bold">Stats Components</h1>
      <p className="mb-10 text-gray-600">Display stats and metrics in various formats</p>

      <div className="space-y-16">
        {/* Simple Cards */}
        <section>
          <h2 className="mb-6 border-b pb-2 text-xl font-semibold">Simple Cards</h2>
          <div className="rounded-lg bg-white p-6 shadow">
            <SimpleCards stats={simpleStats} />

            <div className="mt-10 rounded-md bg-gray-50 p-4">
              <h4 className="mb-2 text-sm font-semibold">Example Code</h4>
              <pre className="overflow-auto rounded bg-gray-100 p-2 text-xs">
                {`const stats = [
  { name: 'Total Revenue', value: '$405,091', change: '+4.75%', changeType: 'increase' },
  { name: 'Active Users', value: '2,483', change: '+21.5%', changeType: 'increase' },
  { name: 'Conversion Rate', value: '3.6%', change: '-0.8%', changeType: 'decrease' },
  { name: 'Avg. Order Value', value: '$287.32', change: '+6.2%', changeType: 'increase' },
]

<SimpleCards stats={stats} />`}
              </pre>
            </div>
          </div>
        </section>

        {/* With Brand Icon */}
        <section>
          <h2 className="mb-6 border-b pb-2 text-xl font-semibold">With Brand Icon</h2>
          <div className="rounded-lg bg-white p-6 shadow">
            <WithBrandIcon stats={brandIconStats} />

            <div className="mt-10 rounded-md bg-gray-50 p-4">
              <h4 className="mb-2 text-sm font-semibold">Example Code</h4>
              <pre className="overflow-auto rounded bg-gray-100 p-2 text-xs">
                {`import { CurrencyDollarIcon, UserGroupIcon } from '@heroicons/react/24/solid'

const stats = [
  { 
    name: 'Total Revenue', 
    value: '$405,091', 
    description: 'Last 30 days', 
    icon: CurrencyDollarIcon,
    iconBackground: 'bg-green-500',
    change: '+4.75%', 
    changeType: 'increase' 
  },
  { 
    name: 'Active Users', 
    value: '2,483', 
    description: 'Up from 1,982 last month', 
    icon: UserGroupIcon,
    iconBackground: 'bg-blue-500',
    change: '+21.5%', 
    changeType: 'increase' 
  },
  // More stats...
]

<WithBrandIcon stats={stats} />`}
              </pre>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
