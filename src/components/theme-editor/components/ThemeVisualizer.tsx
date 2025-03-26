import React from 'react';
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from '@/components/ui/Card';
import { Badge } from '@/components/ui/badge';
import { Eye, Zap } from 'lucide-react';

interface ThemeVisualizerProps {
  primaryColor: string;
  backgroundColor: string;
  borderRadius: number;
  fontSize: number;
  headingFont: string;
  bodyFont: string;
  spacingDensity: 'compact' | 'comfortable' | 'spacious';
}

export function ThemeVisualizer({
  primaryColor = '#3b82f6',
  backgroundColor = '#ffffff',
  borderRadius = 0.5,
  fontSize = 16,
  headingFont = 'Inter',
  bodyFont = 'Inter',
  spacingDensity = 'comfortable'
}: ThemeVisualizerProps) {
  // Compute spacing based on density
  const getSpacing = (factor: number) => {
    const baseUnit = 4; // px
    const multiplier = spacingDensity === 'compact' ? 0.75 : spacingDensity === 'spacious' ? 1.5 : 1;
    return `${Math.round(baseUnit * factor * multiplier)}px`;
  };
  
  return (
    <Card className="theme-visualizer">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div className="flex items-center space-x-2">
          <div className="bg-primary/10 p-2 rounded-full">
            <Eye className="h-4 w-4 text-primary" />
          </div>
          <div>
            <CardTitle>Theme Visualizer</CardTitle>
            <CardDescription>See how elements look with your theme</CardDescription>
          </div>
        </div>
        <Badge variant="outline" className="flex items-center gap-1">
          <Zap className="h-3 w-3" />
          <span>Live</span>
        </Badge>
      </CardHeader>
      <CardContent>
        <div 
          className="p-6 rounded-lg bg-card border shadow-sm overflow-hidden"
          style={{
            backgroundColor,
            fontFamily: `${bodyFont}, system-ui, sans-serif`,
            fontSize: `${fontSize}px`,
            borderRadius: `${borderRadius}rem`
          }}
        >
          {/* Sample UI showcasing theme */}
          <div className="mb-6">
            <div 
              style={{
                fontFamily: `${headingFont}, system-ui, sans-serif`,
                fontSize: `${fontSize * 1.5}px`,
                fontWeight: 700,
                marginBottom: getSpacing(2)
              }}
            >
              Visual Theme
            </div>
            <div 
              className="opacity-80"
              style={{
                marginBottom: getSpacing(4)
              }}
            >
              Experience how your theme looks with interactive elements.
            </div>
          </div>
          
          <div 
            className="grid gap-4 mb-4" 
            style={{ 
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: getSpacing(4)
            }}
          >
            {/* Sample card 1 */}
            <div 
              className="p-4 shadow-sm" 
              style={{ 
                backgroundColor: 'rgba(0,0,0,0.03)', 
                borderRadius: `${borderRadius * 0.75}rem`,
                padding: getSpacing(4)
              }}
            >
              <div 
                style={{ 
                  fontFamily: `${headingFont}, system-ui, sans-serif`,
                  fontWeight: 600,
                  marginBottom: getSpacing(2)
                }}
              >
                Card Example
              </div>
              <div className="opacity-80" style={{ fontSize: `${fontSize * 0.875}px` }}>
                This card demonstrates spacing and typography.
              </div>
              <div 
                style={{ 
                  marginTop: getSpacing(3), 
                  padding: `${getSpacing(1.5)} ${getSpacing(3)}`,
                  backgroundColor: primaryColor,
                  color: '#fff', 
                  borderRadius: `${borderRadius * 0.75}rem`,
                  display: 'inline-block',
                  fontSize: `${fontSize * 0.875}px`,
                  fontWeight: 500
                }}
              >
                Button
              </div>
            </div>
            
            {/* Sample card 2 */}
            <div 
              className="p-4 shadow-sm" 
              style={{ 
                backgroundColor: 'rgba(0,0,0,0.03)', 
                borderRadius: `${borderRadius * 0.75}rem`,
                padding: getSpacing(4)
              }}
            >
              <div 
                style={{ 
                  fontFamily: `${headingFont}, system-ui, sans-serif`,
                  fontWeight: 600,
                  marginBottom: getSpacing(2) 
                }}
              >
                Elements
              </div>
              <div className="opacity-80" style={{ fontSize: `${fontSize * 0.875}px` }}>
                Consistent styling with your brand colors.
              </div>
              <div 
                style={{ 
                  display: 'flex',
                  gap: getSpacing(2),
                  marginTop: getSpacing(3)
                }}
              >
                <div 
                  style={{ 
                    height: getSpacing(4),
                    width: getSpacing(4),
                    borderRadius: `${borderRadius * 0.5}rem`,
                    backgroundColor: primaryColor
                  }}
                ></div>
                <div 
                  style={{ 
                    height: getSpacing(4),
                    width: getSpacing(4),
                    borderRadius: `${borderRadius * 0.5}rem`,
                    backgroundColor: primaryColor,
                    opacity: 0.7
                  }}
                ></div>
                <div 
                  style={{ 
                    height: getSpacing(4),
                    width: getSpacing(4),
                    borderRadius: `${borderRadius * 0.5}rem`,
                    backgroundColor: primaryColor,
                    opacity: 0.4
                  }}
                ></div>
              </div>
            </div>
          </div>
          
          <div 
            style={{ 
              display: 'flex',
              flexDirection: 'column',
              gap: getSpacing(2)
            }}
          >
            <div style={{ height: '2px', width: '100%', background: `${primaryColor}20` }}></div>
            
            <div 
              style={{ 
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center' 
              }}
            >
              <div style={{ fontSize: `${fontSize * 0.875}px` }}>
                Theme Preview
              </div>
              <div 
                style={{ 
                  display: 'flex',
                  gap: getSpacing(2)
                }}
              >
                <div 
                  style={{ 
                    padding: `${getSpacing(1)} ${getSpacing(2)}`,
                    borderRadius: `${borderRadius * 0.5}rem`,
                    border: '1px solid rgba(0,0,0,0.1)',
                    fontSize: `${fontSize * 0.75}px`
                  }}
                >
                  {borderRadius}rem radius
                </div>
                <div 
                  style={{ 
                    padding: `${getSpacing(1)} ${getSpacing(2)}`,
                    borderRadius: `${borderRadius * 0.5}rem`,
                    border: '1px solid rgba(0,0,0,0.1)',
                    fontSize: `${fontSize * 0.75}px`
                  }}
                >
                  {fontSize}px text
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
} 