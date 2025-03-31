import React from 'react';
import { Card, Text, Title, Grid } from '@tremor/react';
import { themeToTremorColors, defaultTremorColors } from './theme-config';

export const TremorColorPreview = () => {
  // Theme colors to Tremor colors mapping
  const themeColors = Object.entries(themeToTremorColors);
  
  // All Tremor colors
  const tremorColors = [
    "slate", "gray", "zinc", "neutral", "stone", 
    "red", "orange", "amber", "yellow", "lime", 
    "green", "emerald", "teal", "cyan", "sky", 
    "blue", "indigo", "violet", "purple", 
    "fuchsia", "pink", "rose"
  ];
  
  // The default colors used in charts
  const chartColors = defaultTremorColors.chart;
  
  return (
    <Card className="p-6">
      <Title>Theme Color System</Title>
      <Text className="mb-4">This shows how our semantic theme colors map to Tremor colors</Text>
      
      <div className="space-y-6">
        {/* Theme colors mapping */}
        <div>
          <Title className="text-lg mb-2">Theme Colors → Tremor Colors</Title>
          <Grid numItemsSm={2} numItemsMd={3} numItemsLg={4} className="gap-3">
            {themeColors.map(([themeName, tremorName]) => (
              <Card key={themeName} className="p-0 overflow-hidden">
                <div className={`h-12 bg-${tremorName}-500`}></div>
                <div className="p-2">
                  <Text className="font-medium">{themeName}</Text>
                  <Text className="text-xs text-muted-foreground">maps to {tremorName}</Text>
                </div>
              </Card>
            ))}
          </Grid>
        </div>
        
        {/* Chart colors used */}
        <div>
          <Title className="text-lg mb-2">Default Chart Colors</Title>
          <div className="grid grid-cols-5 gap-2">
            {chartColors.map((color, index) => (
              <div key={index} className="flex flex-col items-center">
                <div className={`h-8 w-8 rounded-full bg-${color}-500`}></div>
                <Text className="text-xs mt-1">{color}</Text>
              </div>
            ))}
          </div>
        </div>
        
        {/* All Tremor colors */}
        <div>
          <Title className="text-lg mb-2">All Available Tremor Colors</Title>
          <Grid numItemsSm={3} numItemsMd={4} numItemsLg={7} className="gap-2">
            {tremorColors.map(color => (
              <div key={color} className="flex flex-col items-center">
                <div className={`h-8 w-8 rounded-full bg-${color}-500`}></div>
                <Text className="text-xs mt-1">{color}</Text>
              </div>
            ))}
          </Grid>
        </div>
      </div>
    </Card>
  );
}; 