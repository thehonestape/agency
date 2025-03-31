import React from 'react';
import { Button } from '@/components/ui/button';
import { type HeroProps } from '../types';
import { composeHeroStyles } from '../compose';
import { cn } from '@/lib/utils';

export function HeroBasic({
  title = "Deploy to the cloud with confidence",
  description = "Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui lorem cupidatat commodo. Elit sunt amet fugiat veniam occaecat fugiat aliqua.",
  ctaText = "Get started",
  secondaryCtaText = "Learn more",
  onCtaClick,
  onSecondaryCtaClick,
  theme,
  density,
  container,
  variants,
  className,
}: HeroProps) {
  const styles = composeHeroStyles({ theme, density, container, variants });

  return (
    <div className={cn(
      styles.base.padding,
      styles.base.background,
      styles.density,
      container?.name && styles.container[container.name],
      variants?.sm,
      variants?.md,
      variants?.lg,
      variants?.xl,
      className
    )}>
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className={styles.hero.title}>
            {title}
          </h1>
          <p className={styles.hero.description}>
            {description}
          </p>
          <div className={styles.hero.cta}>
            <Button onClick={onCtaClick}>{ctaText}</Button>
            <Button 
              variant="link" 
              onClick={onSecondaryCtaClick}
              className="text-sm font-semibold leading-6 text-foreground"
            >
              {secondaryCtaText} <span aria-hidden="true">→</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HeroBasic; 