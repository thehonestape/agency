import React from 'react';
import { Card, Title, Text, Grid, Badge, ProgressBar, DonutChart, Legend } from '@tremor/react';
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
  
  // Create sample data for DonutChart
  const donutData = [
    { name: "Primary", value: 35 },
    { name: "Info", value: 25 },
    { name: "Success", value: 20 },
    { name: "Warning", value: 15 },
    { name: "Destructive", value: 5 },
  ];
  
  return (
    <Card className="p-6">
      <Title>Theme Color System</Title>
      <Text className="mb-4">Visual reference for how semantic theme colors map to Tremor colors</Text>
      
      <div className="space-y-8">
        {/* Color mapping side by side */}
        <div>
          <Title className="text-lg mb-2">Theme Colors → Tremor Colors</Title>
          <Grid numItemsSm={2} numItemsMd={3} numItemsLg={4} className="gap-3">
            {themeColors.map(([themeName, tremorName]) => (
              <Card key={themeName} className="p-0 overflow-hidden">
                <div className="grid grid-cols-2 h-24">
                  <div className={`bg-${themeName}`} title={`Theme color: ${themeName}`}></div>
                  <div className={`bg-${tremorName}-500`} title={`Tremor color: ${tremorName}`}></div>
                </div>
                <div className="p-3">
                  <Text className="font-medium">{themeName}</Text>
                  <Text className="text-xs text-muted-foreground">maps to {tremorName}</Text>
                </div>
              </Card>
            ))}
          </Grid>
        </div>
        
        {/* Badges */}
        <div>
          <Title className="text-lg mb-2">Badges</Title>
          <div className="flex flex-wrap gap-3">
            {tremorColors.map(color => (
              <Badge key={color} color={color}>
                {color}
              </Badge>
            ))}
          </div>
          <div className="mt-4 flex flex-wrap gap-3">
            {Object.keys(themeToTremorColors).map(themeColor => (
              <Badge key={themeColor} color={themeToTremorColors[themeColor as keyof typeof themeToTremorColors]}>
                {themeColor}
              </Badge>
            ))}
          </div>
        </div>
        
        {/* Progress bars */}
        <div>
          <Title className="text-lg mb-2">Progress Bars</Title>
          <div className="space-y-3">
            {tremorColors.slice(0, 8).map((color, index) => (
              <div key={color} className="space-y-1">
                <Text className="text-xs">{color}</Text>
                <ProgressBar value={45 + index * 5} color={color} />
              </div>
            ))}
            <div className="h-8"></div>
            {Object.entries(themeToTremorColors).map(([themeColor, tremorColor], index) => (
              <div key={themeColor} className="space-y-1">
                <Text className="text-xs">{themeColor}</Text>
                <ProgressBar value={45 + index * 7} color={tremorColor} />
              </div>
            ))}
          </div>
        </div>
        
        {/* Chart colors */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Title className="text-lg mb-2">Donut Chart with Theme Colors</Title>
            <DonutChart
              data={donutData}
              index="name"
              category="value"
              colors={Object.values(themeToTremorColors).slice(0, 5)}
              className="h-56 mt-4"
            />
            <Legend
              className="mt-3"
              categories={donutData.map(item => item.name)}
              colors={Object.values(themeToTremorColors).slice(0, 5)}
            />
          </div>
          
          <div>
            <Title className="text-lg mb-2">Donut Chart with Default Colors</Title>
            <DonutChart
              data={donutData}
              index="name"
              category="value"
              colors={defaultTremorColors.chart}
              className="h-56 mt-4"
            />
            <Legend
              className="mt-3"
              categories={donutData.map(item => item.name)}
              colors={defaultTremorColors.chart}
            />
          </div>
        </div>
      </div>
    </Card>
  );
}; 