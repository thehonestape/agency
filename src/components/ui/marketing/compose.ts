import { type BaseMarketingProps } from './types';
import { cn } from '@/lib/utils';

export function composeMarketingStyles(props: BaseMarketingProps) {
  const { theme, density, container, variants } = props;
  
  return {
    // Base styles
    base: {
      padding: theme?.spacing?.section?.padding || 'py-24',
      background: theme?.colors?.background?.default || 'bg-background',
    },
    
    // Density adjustments
    density: {
      compact: 'py-16',
      comfortable: 'py-24',
      spacious: 'py-32',
    }[density || 'comfortable'],
    
    // Container query styles
    container: container?.name ? {
      [container.name]: {
        padding: container.query || 'py-16',
      }
    } : {},
    
    // Responsive variants
    variants: variants || {},
  };
}

export function composeHeroStyles(props: BaseMarketingProps) {
  const baseStyles = composeMarketingStyles(props);
  
  return {
    ...baseStyles,
    // Hero-specific styles
    hero: {
      title: cn(
        "text-4xl font-bold tracking-tight",
        props.theme?.typography?.textStyles?.h1
      ),
      description: cn(
        "mt-6 text-lg leading-8",
        props.theme?.typography?.textStyles?.body
      ),
      cta: cn(
        "mt-10 flex items-center justify-center gap-x-6",
        props.theme?.spacing?.stack?.lg
      ),
    },
  };
}

export function composeFeatureStyles(props: BaseMarketingProps) {
  const baseStyles = composeMarketingStyles(props);
  
  return {
    ...baseStyles,
    // Feature-specific styles
    feature: {
      title: cn(
        "text-3xl font-bold tracking-tight",
        props.theme?.typography?.textStyles?.h2
      ),
      description: cn(
        "mt-4 text-lg leading-8",
        props.theme?.typography?.textStyles?.body
      ),
      grid: cn(
        "mt-16 grid gap-8",
        props.theme?.spacing?.grid?.lg
      ),
    },
  };
}

export function composeCTAStyles(props: BaseMarketingProps) {
  const baseStyles = composeMarketingStyles(props);
  
  return {
    ...baseStyles,
    // CTA-specific styles
    cta: {
      title: cn(
        "text-3xl font-bold tracking-tight",
        props.theme?.typography?.textStyles?.h2
      ),
      description: cn(
        "mt-4 text-lg leading-8",
        props.theme?.typography?.textStyles?.body
      ),
      buttons: cn(
        "mt-8 flex items-center gap-x-6",
        props.theme?.spacing?.stack?.md
      ),
    },
  };
}

export function composeTestimonialStyles(props: BaseMarketingProps) {
  const baseStyles = composeMarketingStyles(props);
  
  return {
    ...baseStyles,
    // Testimonial-specific styles
    testimonial: {
      title: cn(
        "text-3xl font-bold tracking-tight",
        props.theme?.typography?.textStyles?.h2
      ),
      description: cn(
        "mt-4 text-lg leading-8",
        props.theme?.typography?.textStyles?.body
      ),
      grid: cn(
        "mt-16 grid gap-8",
        props.theme?.spacing?.grid?.lg
      ),
    },
  };
}

export function composePricingStyles(props: BaseMarketingProps) {
  const baseStyles = composeMarketingStyles(props);
  
  return {
    ...baseStyles,
    // Pricing-specific styles
    pricing: {
      title: cn(
        "text-3xl font-bold tracking-tight",
        props.theme?.typography?.textStyles?.h2
      ),
      description: cn(
        "mt-4 text-lg leading-8",
        props.theme?.typography?.textStyles?.body
      ),
      grid: cn(
        "mt-16 grid gap-8",
        props.theme?.spacing?.grid?.lg
      ),
      toggle: cn(
        "mt-8 flex items-center justify-center gap-x-4",
        props.theme?.spacing?.stack?.md
      ),
    },
  };
} 