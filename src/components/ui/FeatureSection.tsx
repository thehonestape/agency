import React from 'react';
import { CheckCircle } from 'lucide-react';

export function FeatureSection() {
  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl sm:text-center">
          <h2 className="text-base font-semibold leading-7 text-primary">Everything you need</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">No server? No problem.</p>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores impedit perferendis suscipit eaque, iste dolor cupiditate blanditiis.
          </p>
        </div>
      </div>
      <div className="mx-auto mt-16 max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:max-w-none">
          <div className="grid grid-cols-1 gap-y-10 gap-x-8 lg:grid-cols-3">
            {features.map((feature) => (
              <div key={feature.name} className="relative pl-9">
                <dt className="inline font-semibold text-gray-900">
                  <CheckCircle className="absolute left-1 top-1 h-5 w-5 text-primary" aria-hidden="true" />
                  {feature.name}
                </dt>{' '}
                <dd className="inline text-gray-600">{feature.description}</dd>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

const features = [
  {
    name: 'Push to deploy',
    description: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit aute id magna.',
  },
  {
    name: 'SSL certificates',
    description: 'Anim aute id magna aliqua ad ad non deserunt sunt qui irure qui lorem cupidatat.',
  },
  {
    name: 'Database backups',
    description: 'Ac tincidunt sapien vehicula erat auctor pellentesque rhoncus voluptas.',
  },
  {
    name: 'Smart caching',
    description: 'Maiores impedit perferendis suscipit eaque, iste dolor cupiditate.',
  },
  {
    name: 'Advanced security',
    description: 'Cupiditate blanditiis ratione dolorem reiciendis sunt cupidatat magnam.',
  },
  {
    name: 'Powerful API',
    description: 'Anim aute id magna aliqua ad ad non deserunt sunt qui lorem cupidatat.',
  },
];

export default FeatureSection; 