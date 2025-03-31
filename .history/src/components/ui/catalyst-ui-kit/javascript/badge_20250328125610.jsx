import * as Headless from '@headlessui/react'
import clsx from 'clsx'
import React, { forwardRef } from 'react'
import { TouchTarget } from './button'
import { Link } from './link'

const colors = {
  // Theme-based colors
  primary: 'bg-primary/15 text-primary-700 group-data-hover:bg-primary/25 dark:bg-primary/10 dark:text-primary-400 dark:group-data-hover:bg-primary/20',
  secondary: 'bg-secondary/15 text-secondary-700 group-data-hover:bg-secondary/25 dark:bg-secondary/10 dark:text-secondary-400 dark:group-data-hover:bg-secondary/20',
  accent: 'bg-accent/15 text-accent-700 group-data-hover:bg-accent/25 dark:bg-accent/10 dark:text-accent-400 dark:group-data-hover:bg-accent/20',
  muted: 'bg-muted/15 text-muted-700 group-data-hover:bg-muted/25 dark:bg-muted/10 dark:text-muted-400 dark:group-data-hover:bg-muted/20',
  destructive: 'bg-destructive/15 text-destructive-700 group-data-hover:bg-destructive/25 dark:bg-destructive/10 dark:text-destructive-400 dark:group-data-hover:bg-destructive/20',
  success: 'bg-success/15 text-success-700 group-data-hover:bg-success/25 dark:bg-success/10 dark:text-success-400 dark:group-data-hover:bg-success/20',
  warning: 'bg-warning/15 text-warning-700 group-data-hover:bg-warning/25 dark:bg-warning/10 dark:text-warning-400 dark:group-data-hover:bg-warning/20',
  info: 'bg-info/15 text-info-700 group-data-hover:bg-info/25 dark:bg-info/10 dark:text-info-400 dark:group-data-hover:bg-info/20',
  
  // Legacy color support - now use theme variables
  red: 'bg-destructive/15 text-destructive-700 group-data-hover:bg-destructive/25 dark:bg-destructive/10 dark:text-destructive-400 dark:group-data-hover:bg-destructive/20',
  orange: 'bg-warning/15 text-warning-700 group-data-hover:bg-warning/25 dark:bg-warning/10 dark:text-warning-400 dark:group-data-hover:bg-warning/20',
  amber: 'bg-warning/15 text-warning-700 group-data-hover:bg-warning/25 dark:bg-warning/10 dark:text-warning-400 dark:group-data-hover:bg-warning/20',
  yellow: 'bg-warning/15 text-warning-700 group-data-hover:bg-warning/25 dark:bg-warning/10 dark:text-warning-400 dark:group-data-hover:bg-warning/20',
  lime: 'bg-success/15 text-success-700 group-data-hover:bg-success/25 dark:bg-success/10 dark:text-success-400 dark:group-data-hover:bg-success/20',
  green: 'bg-success/15 text-success-700 group-data-hover:bg-success/25 dark:bg-success/10 dark:text-success-400 dark:group-data-hover:bg-success/20',
  emerald: 'bg-success/15 text-success-700 group-data-hover:bg-success/25 dark:bg-success/10 dark:text-success-400 dark:group-data-hover:bg-success/20',
  teal: 'bg-primary/15 text-primary-700 group-data-hover:bg-primary/25 dark:bg-primary/10 dark:text-primary-400 dark:group-data-hover:bg-primary/20',
  cyan: 'bg-info/15 text-info-700 group-data-hover:bg-info/25 dark:bg-info/10 dark:text-info-400 dark:group-data-hover:bg-info/20',
  sky: 'bg-info/15 text-info-700 group-data-hover:bg-info/25 dark:bg-info/10 dark:text-info-400 dark:group-data-hover:bg-info/20',
  blue: 'bg-primary/15 text-primary-700 group-data-hover:bg-primary/25 dark:bg-primary/10 dark:text-primary-400 dark:group-data-hover:bg-primary/20',
  indigo: 'bg-primary/15 text-primary-700 group-data-hover:bg-primary/25 dark:bg-primary/10 dark:text-primary-400 dark:group-data-hover:bg-primary/20',
  violet: 'bg-accent/15 text-accent-700 group-data-hover:bg-accent/25 dark:bg-accent/10 dark:text-accent-400 dark:group-data-hover:bg-accent/20',
  purple: 'bg-accent/15 text-accent-700 group-data-hover:bg-accent/25 dark:bg-accent/10 dark:text-accent-400 dark:group-data-hover:bg-accent/20',
  fuchsia: 'bg-accent/15 text-accent-700 group-data-hover:bg-accent/25 dark:bg-accent/10 dark:text-accent-400 dark:group-data-hover:bg-accent/20',
  pink: 'bg-accent/15 text-accent-700 group-data-hover:bg-accent/25 dark:bg-accent/10 dark:text-accent-400 dark:group-data-hover:bg-accent/20',
  rose: 'bg-destructive/15 text-destructive-700 group-data-hover:bg-destructive/25 dark:bg-destructive/10 dark:text-destructive-400 dark:group-data-hover:bg-destructive/20',
  zinc: 'bg-muted/15 text-muted-700 group-data-hover:bg-muted/25 dark:bg-muted/10 dark:text-muted-400 dark:group-data-hover:bg-muted/20',
}

export function Badge({ color = 'zinc', className, ...props }) {
  return (
    <span
      {...props}
      className={clsx(
        className,
        'inline-flex items-center gap-x-1.5 rounded-md px-1.5 py-0.5 text-sm/5 font-medium sm:text-xs/5 forced-colors:outline',
        colors[color]
      )}
    />
  )
}

export const BadgeButton = forwardRef(function BadgeButton(
  { color = 'zinc', className, children, ...props },
  ref
) {
  let classes = clsx(
    className,
    'group relative inline-flex rounded-md focus:outline-hidden data-focus:outline-2 data-focus:outline-offset-2 data-focus:outline-primary'
  )

  return 'href' in props ? (
    <Link {...props} className={classes} ref={ref}>
      <TouchTarget>
        <Badge color={color}>{children}</Badge>
      </TouchTarget>
    </Link>
  ) : (
    <Headless.Button {...props} className={classes} ref={ref}>
      <TouchTarget>
        <Badge color={color}>{children}</Badge>
      </TouchTarget>
    </Headless.Button>
  )
})
