import React, { useEffect, useState } from 'react'
import { Card } from './card'
import { cn } from '../../lib/utils'

export interface ThemeColorDisplayProps extends React.HTMLAttributes<HTMLDivElement> {}

type ColorInfo = {
  name: string
  variable: string
  value: string
}

export function ThemeColorDisplay({ className, ...props }: ThemeColorDisplayProps) {
  const [colors, setColors] = useState<ColorInfo[]>([])

  useEffect(() => {
    // Get all CSS variables from root
    const getComputedColors = () => {
      const colorVariables = [
        { name: 'Primary', variable: '--primary' },
        { name: 'Primary Foreground', variable: '--primary-foreground' },
        { name: 'Secondary', variable: '--secondary' },
        { name: 'Secondary Foreground', variable: '--secondary-foreground' },
        { name: 'Accent', variable: '--accent' },
        { name: 'Accent Foreground', variable: '--accent-foreground' },
        { name: 'Background', variable: '--background' },
        { name: 'Foreground', variable: '--foreground' },
        { name: 'Muted', variable: '--muted' },
        { name: 'Muted Foreground', variable: '--muted-foreground' },
        { name: 'Card', variable: '--card' },
        { name: 'Card Foreground', variable: '--card-foreground' },
        { name: 'Popover', variable: '--popover' },
        { name: 'Popover Foreground', variable: '--popover-foreground' },
        { name: 'Border', variable: '--border' },
        { name: 'Input', variable: '--input' },
        { name: 'Ring', variable: '--ring' },
        { name: 'Destructive', variable: '--destructive' },
        { name: 'Destructive Foreground', variable: '--destructive-foreground' },
        { name: 'Success', variable: '--success' },
        { name: 'Success Foreground', variable: '--success-foreground' },
        { name: 'Warning', variable: '--warning' },
        { name: 'Warning Foreground', variable: '--warning-foreground' },
        { name: 'Info', variable: '--info' },
        { name: 'Info Foreground', variable: '--info-foreground' },
      ]

      const computedStyle = getComputedStyle(document.documentElement)
      
      const computedColors = colorVariables.map(({ name, variable }) => {
        const value = computedStyle.getPropertyValue(variable).trim()
        return { name, variable, value }
      })
      
      setColors(computedColors)
    }
    
    getComputedColors()
    
    // Re-compute when theme changes
    const observer = new MutationObserver(getComputedColors)
    observer.observe(document.documentElement, { 
      attributes: true,
      attributeFilter: ['class', 'style'] 
    })
    
    return () => observer.disconnect()
  }, [])

  return (
    <div className={cn("grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4", className)} {...props}>
      {colors.map((color) => (
        <Card key={color.variable} className="p-4 flex flex-col gap-2">
          <div className="flex justify-between items-center gap-2 mb-2">
            <span className="font-medium text-sm">{color.name}</span>
            <code className="text-xs bg-muted p-1 rounded">{color.variable}</code>
          </div>
          <div 
            className="h-16 rounded-md border border-border"
            style={{ backgroundColor: `var(${color.variable})` }} 
          />
          <div className="text-xs mt-1 opacity-80">
            Value: <code>{color.value || 'Not set'}</code>
          </div>
        </Card>
      ))}
    </div>
  )
} 