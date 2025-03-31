import React from 'react';
import { type FeatureProps } from '../types';
import { composeFeatureStyles } from '../compose';
import { cn } from '@/lib/utils';

export function FeatureSection({
  title = "Everything you need to deploy your app",
  description = "Phasellus tellus lacus, tincidunt nec aliquet ac, tincidunt ac nisi. Mauris a libero risus, condimentum mauris ligula, accumsan nulla tortor.",
  icon,
  image,
  features = [
    {
      title: "Push to deploy",
      description: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores impedit perferendis suscipit eaque, iste dolor cupiditate blanditiis ratione.",
      icon: "🚀",
    },
    {
      title: "SSL certificates",
      description: "Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui lorem cupidatat commodo.",
      icon: "🔒",
    },
    {
      title: "Database backups",
      description: "Ac tincidunt sapien vehicula erat auctor pellentesque rhoncus. Et magna sit morbi lobortis.",
      icon: "💾",
    },
  ],
  theme,
  density,
  container,
  variants,
  className,
}: FeatureProps) {
  const styles = composeFeatureStyles({ theme, density, container, variants });

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
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className={styles.feature.title}>
            {title}
          </h2>
          <p className={styles.feature.description}>
            {description}
          </p>
        </div>
        <div className={styles.feature.grid}>
          {features.map((feature, index) => (
            <div key={index} className="relative pl-16">
              <dt className="text-base font-semibold leading-7 text-foreground">
                <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
                  {feature.icon}
                </div>
                {feature.title}
              </dt>
              <dd className="mt-2 text-base leading-7 text-muted-foreground">
                {feature.description}
              </dd>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default FeatureSection; 