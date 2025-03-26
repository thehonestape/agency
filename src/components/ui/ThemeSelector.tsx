import React, { useEffect, useState } from 'react'
import { useTheme } from '@/components/theme-provider'
import clsx from 'clsx'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

// Define theme options
const themes = [
  { name: 'Light', value: 'light', icon: LightIcon },
  { name: 'Dark', value: 'dark', icon: DarkIcon },
  { name: 'System', value: 'system', icon: SystemIcon },
]

function LightIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg aria-hidden="true" viewBox="0 0 16 16" {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M7 1a1 1 0 0 1 2 0v1a1 1 0 1 1-2 0V1Zm4 7a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm2.657-5.657a1 1 0 0 0-1.414 0l-.707.707a1 1 0 0 0 1.414 1.414l.707-.707a1 1 0 0 0 0-1.414Zm-1.415 11.313-.707-.707a1 1 0 0 1 1.415-1.415l.707.708a1 1 0 0 1-1.415 1.414ZM16 7.999a1 1 0 0 0-1-1h-1a1 1 0 1 0 0 2h1a1 1 0 0 0 1-1ZM7 14a1 1 0 1 1 2 0v1a1 1 0 1 1-2 0v-1Zm-2.536-2.464a1 1 0 0 0-1.414 0l-.707.707a1 1 0 0 0 1.414 1.414l.707-.707a1 1 0 0 0 0-1.414Zm0-8.486A1 1 0 0 1 3.05 4.464l-.707-.707a1 1 0 0 1 1.414-1.414l.707.707ZM3 8a1 1 0 0 0-1-1H1a1 1 0 0 0 0 2h1a1 1 0 0 0 1-1Z"
      />
    </svg>
  )
}

function DarkIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg aria-hidden="true" viewBox="0 0 16 16" {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M7.23 3.333C7.757 2.905 7.68 2 7 2a6 6 0 1 0 0 12c.68 0 .758-.905.23-1.332A5.989 5.989 0 0 1 5 8c0-1.885.87-3.568 2.23-4.668ZM12 5a1 1 0 0 1 1 1 1 1 0 0 0 1 1 1 1 0 1 1 0 2 1 1 0 0 0-1 1 1 1 0 1 1-2 0 1 1 0 0 0-1-1 1 1 0 1 1 0-2 1 1 0 0 0 1-1 1 1 0 0 1 1-1Z"
      />
    </svg>
  )
}

function SystemIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg aria-hidden="true" viewBox="0 0 16 16" {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M1 4a3 3 0 0 1 3-3h8a3 3 0 0 1 3 3v4a3 3 0 0 1-3 3h-1.5l.31 1.242c.084.333.36.573.63.808.091.08.182.158.264.24A1 1 0 0 1 11 15H5a1 1 0 0 1-.704-1.71c.082-.082.173-.16.264-.24.27-.235.546-.475.63-.808L5.5 11H4a3 3 0 0 1-3-3V4Zm3-1a1 1 0 0 0-1 1v4a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1H4Z"
      />
    </svg>
  )
}

interface ThemeSelectorProps extends React.HTMLAttributes<HTMLDivElement> {
  triggerClassName?: string;
}

export function ThemeSelector({ 
  className, 
  triggerClassName,
  ...props 
}: ThemeSelectorProps) {
  const { theme, setTheme, availableThemes } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Only show after mounted to prevent hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return <div className="h-6 w-6" />
  }

  // Get the appropriate icon based on current theme
  const getThemeIcon = (currentTheme: string) => {
    if (currentTheme === 'light' || (currentTheme === 'system' && !window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      return <LightIcon className="h-4 w-4 text-foreground" />
    }
    return <DarkIcon className="h-4 w-4 text-foreground" />
  }

  // Filter to only include built-in themes (light, dark, system)
  const builtInThemes = themes.filter(t => 
    availableThemes.includes(t.value)
  )

  return (
    <div className={clsx("relative", className)} {...props}>
      <Select
        value={theme}
        onValueChange={value => setTheme(value)}
      >
        <SelectTrigger 
          className={clsx(
            "h-9 w-9 rounded-md p-0 flex items-center justify-center", 
            "bg-background hover:bg-accent border-input",
            "focus:ring-1 focus:ring-ring",
            triggerClassName
          )}
          aria-label="Select theme"
        >
          <SelectValue>
            {getThemeIcon(theme)}
          </SelectValue>
        </SelectTrigger>
        <SelectContent>
          {builtInThemes.map((theme) => (
            <SelectItem 
              key={theme.value} 
              value={theme.value}
              className="flex items-center gap-2"
            >
              <div className="bg-background rounded-sm p-1 flex items-center justify-center border border-input">
                <theme.icon className="h-4 w-4 text-primary" />
              </div>
              <span>{theme.name}</span>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
} 