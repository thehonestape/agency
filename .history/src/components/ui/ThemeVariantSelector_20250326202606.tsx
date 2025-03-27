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
            "h-9 min-w-[160px] rounded-md",
            "bg-background hover:bg-accent/50 border-input",
            "focus:ring-1 focus:ring-ring",
            triggerClassName
          )}
          aria-label="Select theme variant"
        >
          <Palette className="h-4 w-4 mr-2" />
          <SelectValue placeholder="Select theme variant" />
        </SelectTrigger>
        <SelectContent>
          {availableThemes.map((theme) => (
            <SelectItem 
              key={theme.metadata.id} 
              value={theme.metadata.id}
              className="flex items-center gap-2"
            >
              <div 
                className="w-3 h-3 rounded-full" 
                style={{ backgroundColor: theme.tokens?.colors?.primary || '#888' }} 
              />
              <span>{theme.metadata.name}</span>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
} 