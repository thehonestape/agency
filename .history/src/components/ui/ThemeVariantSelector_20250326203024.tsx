import React, { useEffect, useState } from 'react'
import { useTheme } from '../../lib/theme-context'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './select'
import { cn } from '../../lib/utils'
import { Palette } from 'lucide-react'

export interface ThemeVariantSelectorProps extends React.HTMLAttributes<HTMLDivElement> {
  triggerClassName?: string;
}

export function ThemeVariantSelector({ 
  className, 
  triggerClassName,
  ...props 
}: ThemeVariantSelectorProps) {
  const { currentThemeId, availableThemes, setCurrentThemeId } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Only show after mounted to prevent hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return <div className="h-9 w-[120px]" />
  }

  return (
    <div className={cn("relative", className)} {...props}>
      <Select
        value={currentThemeId}
        onValueChange={setCurrentThemeId}
      >
        <SelectTrigger 
          className={cn(
            "h-9 min-w-[160px] rounded-md px-3",
            "bg-background hover:bg-accent/50 border-input",
            "focus:ring-1 focus:ring-ring",
            "inline-flex items-center justify-between gap-2",
            triggerClassName
          )}
          aria-label="Select theme variant"
        >
          <div className="inline-flex items-center gap-2">
            <Palette className="h-4 w-4 flex-shrink-0" />
            <span className={cn(
              "text-sm font-medium",
              triggerClassName?.includes('!min-w-0') && "hidden"
            )}>
              {availableThemes.find(t => t.metadata.id === currentThemeId)?.metadata.name || "Select theme"}
            </span>
          </div>
          <SelectValue placeholder="Select theme" className="hidden" />
        </SelectTrigger>
        <SelectContent className="min-w-[160px] p-1">
          {availableThemes.map((theme) => (
            <SelectItem 
              key={theme.metadata.id} 
              value={theme.metadata.id}
              className="flex items-center gap-3 py-2 px-3 cursor-pointer rounded-sm text-sm"
            >
              <div 
                className="w-3 h-3 rounded-full flex-shrink-0" 
                style={{ backgroundColor: theme.tokens?.colors?.primary || '#888' }} 
              />
              <span className="truncate">
                {theme.metadata.name}
              </span>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
} 