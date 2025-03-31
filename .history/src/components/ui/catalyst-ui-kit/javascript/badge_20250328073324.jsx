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
  
  // Legacy color support
  red: 'bg-red-500/15 text-red-700 group-data-hover:bg-red-500/25 dark:bg-red-500/10 dark:text-red-400 dark:group-data-hover:bg-red-500/20',
  orange: 'bg-orange-500/15 text-orange-700 group-data-hover:bg-orange-500/25 dark:bg-orange-500/10 dark:text-orange-400 dark:group-data-hover:bg-orange-500/20',
  amber: 'bg-amber-400/20 text-amber-700 group-data-hover:bg-amber-400/30 dark:bg-amber-400/10 dark:text-amber-400 dark:group-data-hover:bg-amber-400/15',
  yellow: 'bg-yellow-400/20 text-yellow-700 group-data-hover:bg-yellow-400/30 dark:bg-yellow-400/10 dark:text-yellow-300 dark:group-data-hover:bg-yellow-400/15',
  lime: 'bg-lime-400/20 text-lime-700 group-data-hover:bg-lime-400/30 dark:bg-lime-400/10 dark:text-lime-300 dark:group-data-hover:bg-lime-400/15',
  green: 'bg-green-500/15 text-green-700 group-data-hover:bg-green-500/25 dark:bg-green-500/10 dark:text-green-400 dark:group-data-hover:bg-green-500/20',
  emerald: 'bg-emerald-500/15 text-emerald-700 group-data-hover:bg-emerald-500/25 dark:bg-emerald-500/10 dark:text-emerald-400 dark:group-data-hover:bg-emerald-500/20',
  teal: 'bg-teal-500/15 text-teal-700 group-data-hover:bg-teal-500/25 dark:bg-teal-500/10 dark:text-teal-300 dark:group-data-hover:bg-teal-500/20',
  cyan: 'bg-cyan-400/20 text-cyan-700 group-data-hover:bg-cyan-400/30 dark:bg-cyan-400/10 dark:text-cyan-300 dark:group-data-hover:bg-cyan-400/15',
  sky: 'bg-sky-500/15 text-sky-700 group-data-hover:bg-sky-500/25 dark:bg-sky-500/10 dark:text-sky-300 dark:group-data-hover:bg-sky-500/20',
  blue: 'bg-blue-500/15 text-blue-700 group-data-hover:bg-blue-500/25 dark:text-blue-400 dark:group-data-hover:bg-blue-500/25',
  indigo: 'bg-indigo-500/15 text-indigo-700 group-data-hover:bg-indigo-500/25 dark:text-indigo-400 dark:group-data-hover:bg-indigo-500/20',
  violet: 'bg-violet-500/15 text-violet-700 group-data-hover:bg-violet-500/25 dark:text-violet-400 dark:group-data-hover:bg-violet-500/20',
  purple: 'bg-purple-500/15 text-purple-700 group-data-hover:bg-purple-500/25 dark:text-purple-400 dark:group-data-hover:bg-purple-500/20',
  fuchsia: 'bg-fuchsia-400/15 text-fuchsia-700 group-data-hover:bg-fuchsia-400/25 dark:bg-fuchsia-400/10 dark:text-fuchsia-400 dark:group-data-hover:bg-fuchsia-400/20',
  pink: 'bg-pink-400/15 text-pink-700 group-data-hover:bg-pink-400/25 dark:bg-pink-400/10 dark:text-pink-400 dark:group-data-hover:bg-pink-400/20',
  rose: 'bg-rose-400/15 text-rose-700 group-data-hover:bg-rose-400/25 dark:bg-rose-400/10 dark:text-rose-400 dark:group-data-hover:bg-rose-400/20',
  zinc: 'bg-zinc-600/10 text-zinc-700 group-data-hover:bg-zinc-600/20 dark:bg-white/5 dark:text-zinc-400 dark:group-data-hover:bg-white/10',
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
