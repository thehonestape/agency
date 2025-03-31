import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/Card';
import { Heading, Text } from '../../components/ui/typography';

interface ColorSwatchProps {
  name: string;
  className: string;
  value?: string;
  description?: string;
}

const ColorSwatch: React.FC<ColorSwatchProps> = ({ name, className, value, description }) => (
  <div className="rounded-lg overflow-hidden shadow-md">
    <div className={`h-24 ${className}`}></div>
    <div className="p-3 bg-card">
      <Heading variant="h4" className="mb-1">{name}</Heading>
      {value && <Text className="text-xs font-mono">{value}</Text>}
      {description && <Text className="text-sm text-muted-foreground mt-1">{description}</Text>}
    </div>
  </div>
);

export const ColorDesignPage: React.FC = () => {
  return (
    <div className="container mx-auto px-4">
      <div className="mb-8">
        <Heading variant="h1">Color</Heading>
        <Text className="text-muted-foreground">Color palette and system used across the platform</Text>
      </div>
      
      <div className="space-y-10">
        {/* Primary Colors */}
        <Card>
          <CardHeader>
            <CardTitle>Primary Colors</CardTitle>
            <CardDescription>Core brand colors that define the visual identity</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <ColorSwatch 
                name="Primary" 
                className="bg-primary"
                value="hsl(var(--primary))"
                description="Main brand color used for primary actions and emphasis"
              />
              <ColorSwatch 
                name="Primary Foreground" 
                className="bg-primary-foreground"
                value="hsl(var(--primary-foreground))"
                description="Text color on primary backgrounds"
              />
              <ColorSwatch 
                name="Secondary" 
                className="bg-secondary"
                value="hsl(var(--secondary))"
                description="Supporting brand color for secondary elements"
              />
              <ColorSwatch 
                name="Secondary Foreground" 
                className="bg-secondary-foreground"
                value="hsl(var(--secondary-foreground))"
                description="Text color on secondary backgrounds"
              />
              <ColorSwatch 
                name="Accent" 
                className="bg-accent"
                value="hsl(var(--accent))"
                description="Used for highlights and to draw attention"
              />
              <ColorSwatch 
                name="Accent Foreground" 
                className="bg-accent-foreground"
                value="hsl(var(--accent-foreground))"
                description="Text color on accent backgrounds"
              />
            </div>
          </CardContent>
        </Card>
        
        {/* Semantic Colors */}
        <Card>
          <CardHeader>
            <CardTitle>Semantic Colors</CardTitle>
            <CardDescription>Colors that convey specific meaning within the interface</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <ColorSwatch 
                name="Success" 
                className="bg-success"
                value="hsl(var(--success))"
                description="Positive actions and confirmations"
              />
              <ColorSwatch 
                name="Warning" 
                className="bg-warning"
                value="hsl(var(--warning))"
                description="Alerts requiring attention"
              />
              <ColorSwatch 
                name="Destructive" 
                className="bg-destructive"
                value="hsl(var(--destructive))"
                description="Error states and destructive actions"
              />
              <ColorSwatch 
                name="Info" 
                className="bg-info"
                value="hsl(var(--info))"
                description="Informational and help contexts"
              />
            </div>
          </CardContent>
        </Card>
        
        {/* UI Colors */}
        <Card>
          <CardHeader>
            <CardTitle>UI Colors</CardTitle>
            <CardDescription>Colors used for interface elements and backgrounds</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <ColorSwatch 
                name="Background" 
                className="bg-background"
                value="hsl(var(--background))"
                description="Main application background"
              />
              <ColorSwatch 
                name="Foreground" 
                className="bg-foreground"
                value="hsl(var(--foreground))"
                description="Primary text color"
              />
              <ColorSwatch 
                name="Card" 
                className="bg-card"
                value="hsl(var(--card))"
                description="Card and elevated surface background"
              />
              <ColorSwatch 
                name="Card Foreground" 
                className="bg-card-foreground"
                value="hsl(var(--card-foreground))"
                description="Text color on card backgrounds"
              />
              <ColorSwatch 
                name="Muted" 
                className="bg-muted"
                value="hsl(var(--muted))"
                description="Subdued background for less emphasis"
              />
              <ColorSwatch 
                name="Muted Foreground" 
                className="bg-muted-foreground"
                value="hsl(var(--muted-foreground))"
                description="Subdued text for secondary information"
              />
              <ColorSwatch 
                name="Border" 
                className="bg-border"
                value="hsl(var(--border))"
                description="Border color for UI elements"
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}; 