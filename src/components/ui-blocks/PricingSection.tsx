import React from 'react';
import { Button } from '@/components/ui/button';
import { CheckIcon } from 'lucide-react';

type Feature = {
  included: boolean;
  text: string;
};

type PricingTier = {
  id: string;
  name: string;
  price: {
    monthly: string;
    annually: string;
  };
  description: string;
  features: Feature[];
  buttonText: string;
  popular?: boolean;
};

type PricingSectionProps = {
  title?: string;
  description?: string;
  pricingTiers?: PricingTier[];
  className?: string;
  annualBilling?: boolean;
  onBillingChange?: (isAnnual: boolean) => void;
};

export default function PricingSection({
  title = "Simple, transparent pricing",
  description = "Choose the plan that's right for your business. All plans include a 14-day free trial.",
  pricingTiers = defaultPricingTiers,
  className = "",
  annualBilling = true,
  onBillingChange,
}: PricingSectionProps) {
  const [isAnnual, setIsAnnual] = React.useState(annualBilling);

  const handleBillingToggle = () => {
    const newValue = !isAnnual;
    setIsAnnual(newValue);
    if (onBillingChange) {
      onBillingChange(newValue);
    }
  };

  return (
    <section className={`bg-white py-24 sm:py-32 ${className}`}>
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">{title}</h2>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            {description}
          </p>
        </div>
        
        {/* Billing toggle */}
        <div className="mt-12 flex justify-center">
          <div className="relative flex items-center rounded-full p-1 bg-gray-100">
            <button
              type="button"
              className={`flex items-center rounded-full py-2 px-6 text-sm font-medium ${
                !isAnnual 
                  ? 'bg-white shadow-sm text-gray-900' 
                  : 'text-gray-500 hover:text-gray-700'
              }`}
              onClick={handleBillingToggle}
            >
              Monthly
            </button>
            <button
              type="button"
              className={`flex items-center rounded-full py-2 px-6 text-sm font-medium ${
                isAnnual 
                  ? 'bg-white shadow-sm text-gray-900' 
                  : 'text-gray-500 hover:text-gray-700'
              }`}
              onClick={handleBillingToggle}
            >
              Annually<span className="ml-2 text-primary text-xs font-bold">Save 20%</span>
            </button>
          </div>
        </div>
        
        {/* Pricing tiers */}
        <div className="mx-auto mt-16 grid max-w-lg grid-cols-1 gap-y-6 sm:mt-20 sm:gap-y-0 lg:max-w-4xl lg:grid-cols-3">
          {pricingTiers.map((tier, tierIdx) => (
            <div
              key={tier.id}
              className={`flex flex-col rounded-3xl p-8 ${
                tier.popular
                  ? 'z-10 ring-1 ring-gray-900/10 lg:bg-gray-50 lg:shadow-md'
                  : 'border-t border-gray-200 lg:border-t-0 lg:border-l lg:border-r lg:border-gray-200'
              } ${
                tierIdx === 0 ? 'lg:rounded-l-3xl lg:rounded-r-none' : ''
              } ${
                tierIdx === pricingTiers.length - 1 ? 'lg:rounded-r-3xl lg:rounded-l-none' : ''
              }`}
            >
              {tier.popular && (
                <div className="absolute inset-x-8 -top-3 flex justify-center">
                  <span className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary ring-1 ring-inset ring-primary/20">
                    Most popular
                  </span>
                </div>
              )}
              <div className="flex-1">
                <h3 className="text-xl font-semibold leading-8 text-gray-900">{tier.name}</h3>
                <p className="mt-4 text-sm leading-6 text-gray-600">{tier.description}</p>
                <p className="mt-6 flex items-baseline">
                  <span className="text-4xl font-bold tracking-tight text-gray-900">
                    {isAnnual ? tier.price.annually : tier.price.monthly}
                  </span>
                  <span className="ml-1 text-sm font-semibold leading-6 text-gray-600">
                    {isAnnual ? '/year' : '/month'}
                  </span>
                </p>
                <ul className="mt-8 space-y-3 text-sm leading-6 text-gray-600">
                  {tier.features.map((feature, featureIdx) => (
                    <li key={featureIdx} className="flex gap-x-3">
                      {feature.included ? (
                        <CheckIcon className="h-5 w-5 flex-none text-primary" aria-hidden="true" />
                      ) : (
                        <div className="h-5 w-5 flex-none" />
                      )}
                      {feature.text}
                    </li>
                  ))}
                </ul>
              </div>
              <Button
                variant={tier.popular ? 'default' : 'outline'}
                className="mt-8 w-full"
              >
                {tier.buttonText}
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const defaultPricingTiers: PricingTier[] = [
  {
    id: 'starter',
    name: 'Starter',
    price: {
      monthly: '$15',
      annually: '$144',
    },
    description: 'Everything you need to get started with a small project.',
    features: [
      { included: true, text: 'Up to 5 projects' },
      { included: true, text: '1 team member' },
      { included: true, text: '5GB cloud storage' },
      { included: false, text: 'Advanced analytics' },
      { included: false, text: 'Priority support' },
    ],
    buttonText: 'Get started',
  },
  {
    id: 'professional',
    name: 'Professional',
    price: {
      monthly: '$49',
      annually: '$468',
    },
    description: 'Perfect for teams and small businesses.',
    features: [
      { included: true, text: 'Unlimited projects' },
      { included: true, text: 'Up to 10 team members' },
      { included: true, text: '50GB cloud storage' },
      { included: true, text: 'Advanced analytics' },
      { included: false, text: 'Priority support' },
    ],
    buttonText: 'Get started',
    popular: true,
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    price: {
      monthly: '$99',
      annually: '$948',
    },
    description: 'For organizations with advanced needs.',
    features: [
      { included: true, text: 'Unlimited projects' },
      { included: true, text: 'Unlimited team members' },
      { included: true, text: '500GB cloud storage' },
      { included: true, text: 'Advanced analytics' },
      { included: true, text: 'Priority support' },
    ],
    buttonText: 'Contact sales',
  },
]; 