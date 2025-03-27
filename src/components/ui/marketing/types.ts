import { type ColorTokens, type SpacingTokens, type TypographyTokens } from '@/lib/theme-adapters/types';

export interface BaseMarketingProps {
  // Theme tokens
  theme?: {
    colors?: ColorTokens;
    spacing?: SpacingTokens;
    typography?: TypographyTokens;
  };
  
  // Density control
  density?: 'compact' | 'comfortable' | 'spacious';
  
  // Container queries
  container?: {
    name?: string;
    query?: string;
  };
  
  // Responsive variants
  variants?: {
    sm?: Record<string, string>;
    md?: Record<string, string>;
    lg?: Record<string, string>;
    xl?: Record<string, string>;
  };

  // Common className prop
  className?: string;
}

// Hero component props
export interface HeroProps extends BaseMarketingProps {
  title: string;
  description: string;
  ctaText?: string;
  secondaryCtaText?: string;
  onCtaClick?: () => void;
  onSecondaryCtaClick?: () => void;
  image?: {
    src: string;
    alt: string;
    position?: 'left' | 'right';
  };
  background?: {
    color?: string;
    image?: string;
    overlay?: string;
  };
}

// Feature component props
export interface FeatureProps extends BaseMarketingProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
  image?: {
    src: string;
    alt: string;
    position?: 'left' | 'right';
  };
  features?: Array<{
    title: string;
    description: string;
    icon?: React.ReactNode;
  }>;
}

// CTA component props
export interface CTAProps extends BaseMarketingProps {
  title: string;
  description: string;
  ctaText: string;
  secondaryCtaText?: string;
  onCtaClick: () => void;
  onSecondaryCtaClick?: () => void;
  image?: {
    src: string;
    alt: string;
    position?: 'left' | 'right';
  };
  background?: {
    color?: string;
    image?: string;
    overlay?: string;
  };
}

// Testimonial component props
export interface TestimonialProps extends BaseMarketingProps {
  title: string;
  description: string;
  testimonials: Array<{
    quote: string;
    author: {
      name: string;
      role?: string;
      image?: string;
    };
  }>;
  layout?: 'grid' | 'carousel';
}

// Pricing component props
export interface PricingProps extends BaseMarketingProps {
  title: string;
  description: string;
  plans: Array<{
    name: string;
    price: string;
    description: string;
    features: string[];
    ctaText: string;
    onCtaClick: () => void;
    highlighted?: boolean;
  }>;
  toggle?: {
    monthly: string;
    yearly: string;
    value: 'monthly' | 'yearly';
    onChange: (value: 'monthly' | 'yearly') => void;
  };
} 