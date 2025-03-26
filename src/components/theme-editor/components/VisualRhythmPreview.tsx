import React from 'react';
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from '@/components/ui/Card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Eye } from 'lucide-react';

interface VisualRhythmPreviewProps {
  baseUnit: number;
  baseFontSize: number;
  typeScale: string;
  spacingDensity: 'compact' | 'comfortable' | 'spacious';
  headingFont: string;
  bodyFont: string;
  primaryColor: string;
  showBaseline?: boolean;
  toggleBaseline?: () => void;
}

export function VisualRhythmPreview({
  baseUnit = 4,
  baseFontSize = 16,
  typeScale = '1.25',
  spacingDensity = 'comfortable',
  headingFont = 'Inter',
  bodyFont = 'Inter',
  primaryColor = '#3b82f6',
  showBaseline = false,
  toggleBaseline = () => {}
}: VisualRhythmPreviewProps) {
  // Density multipliers
  const densityMultipliers = {
    compact: 0.75,
    comfortable: 1,
    spacious: 1.5
  };
  
  // Calculate spacing values
  const getSpacing = (factor: number) => {
    return Math.round(baseUnit * factor * densityMultipliers[spacingDensity]);
  };
  
  // Calculate font size based on scale
  const getFontSize = (level: number) => {
    const scale = parseFloat(typeScale);
    if (level === 0) return baseFontSize;
    return Math.round(baseFontSize * Math.pow(scale, level));
  };

  return (
    <Card className="visual-rhythm-preview">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div className="flex items-center space-x-2">
          <div className="bg-primary/10 p-2 rounded-full">
            <Eye className="h-4 w-4 text-primary" />
          </div>
          <div>
            <CardTitle>Visual Rhythm</CardTitle>
            <CardDescription>See how typography and spacing work together</CardDescription>
          </div>
        </div>
        <Button 
          variant="outline" 
          size="sm"
          onClick={toggleBaseline}
        >
          {showBaseline ? 'Hide' : 'Show'} Baseline
        </Button>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="content">
          <TabsList className="grid grid-cols-3 mb-4">
            <TabsTrigger value="content">Content</TabsTrigger>
            <TabsTrigger value="components">Components</TabsTrigger>
            <TabsTrigger value="layout">Layout</TabsTrigger>
          </TabsList>
          
          <TabsContent value="content">
            <div 
              className="relative bg-card rounded-md p-6 overflow-hidden"
              style={{
                backgroundImage: showBaseline ? `repeating-linear-gradient(
                  to bottom,
                  transparent,
                  transparent ${getSpacing(2) - 1}px,
                  rgba(59, 130, 246, 0.1) ${getSpacing(2) - 1}px,
                  rgba(59, 130, 246, 0.1) ${getSpacing(2)}px
                )` : 'none'
              }}
            >
              <div 
                style={{
                  fontSize: `${getFontSize(4)}px`,
                  lineHeight: 1.1,
                  fontFamily: `${headingFont}, system-ui, sans-serif`,
                  fontWeight: 700,
                  marginBottom: `${getSpacing(4)}px`
                }}
              >
                Typography Demo
              </div>
              
              <div 
                style={{
                  fontSize: `${getFontSize(2)}px`,
                  lineHeight: 1.2,
                  fontFamily: `${headingFont}, system-ui, sans-serif`,
                  fontWeight: 700,
                  marginBottom: `${getSpacing(2)}px`
                }}
              >
                Heading Level 2
              </div>
              
              <div 
                style={{
                  fontSize: `${baseFontSize}px`,
                  lineHeight: 1.5,
                  fontFamily: `${bodyFont}, system-ui, sans-serif`,
                  marginBottom: `${getSpacing(4)}px`
                }}
              >
                This text demonstrates how the baseline grid aligns with typography. Notice how the spacing and line height 
                create a consistent vertical rhythm throughout the content.
              </div>
              
              <div 
                style={{
                  fontSize: `${getFontSize(1)}px`,
                  lineHeight: 1.3,
                  fontFamily: `${headingFont}, system-ui, sans-serif`,
                  fontWeight: 600,
                  marginBottom: `${getSpacing(2)}px`
                }}
              >
                Smaller Heading
              </div>
              
              <div 
                style={{
                  fontSize: `${baseFontSize}px`,
                  lineHeight: 1.5,
                  fontFamily: `${bodyFont}, system-ui, sans-serif`,
                  marginBottom: `${getSpacing(4)}px`
                }}
              >
                The spacing density setting affects the amount of whitespace between elements. 
                The current density is set to <strong>{spacingDensity}</strong>.
              </div>
              
              <div 
                style={{
                  display: 'flex',
                  gap: `${getSpacing(2)}px`,
                  marginBottom: `${getSpacing(4)}px`
                }}
              >
                <Button 
                  style={{
                    backgroundColor: primaryColor,
                    color: 'white',
                    padding: `${getSpacing(2)}px ${getSpacing(4)}px`,
                    fontSize: `${baseFontSize}px`,
                    lineHeight: 1,
                    borderRadius: '0.25rem',
                    border: 'none',
                    cursor: 'pointer'
                  }}
                >
                  Primary Button
                </Button>
                <Button 
                  variant="outline"
                  style={{
                    padding: `${getSpacing(2)}px ${getSpacing(4)}px`,
                    fontSize: `${baseFontSize}px`,
                    lineHeight: 1,
                    borderRadius: '0.25rem',
                    cursor: 'pointer'
                  }}
                >
                  Secondary
                </Button>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="components">
            <div 
              className="relative bg-card rounded-md p-6 overflow-hidden"
              style={{
                backgroundImage: showBaseline ? `repeating-linear-gradient(
                  to bottom,
                  transparent,
                  transparent ${getSpacing(2) - 1}px,
                  rgba(59, 130, 246, 0.1) ${getSpacing(2) - 1}px,
                  rgba(59, 130, 246, 0.1) ${getSpacing(2)}px
                )` : 'none'
              }}
            >
              <div 
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(2, 1fr)',
                  gap: `${getSpacing(4)}px`,
                  marginBottom: `${getSpacing(6)}px`
                }}
              >
                <div 
                  style={{
                    padding: `${getSpacing(4)}px`,
                    backgroundColor: 'rgba(59, 130, 246, 0.1)',
                    borderRadius: '0.25rem'
                  }}
                >
                  <div 
                    style={{
                      fontSize: `${getFontSize(1)}px`,
                      fontWeight: 600,
                      marginBottom: `${getSpacing(2)}px`,
                      fontFamily: `${headingFont}, system-ui, sans-serif`,
                    }}
                  >
                    Card Title
                  </div>
                  <div
                    style={{
                      fontSize: `${baseFontSize}px`,
                      lineHeight: 1.5,
                      fontFamily: `${bodyFont}, system-ui, sans-serif`,
                    }}
                  >
                    Card content with consistent spacing.
                  </div>
                </div>
                
                <div 
                  style={{
                    padding: `${getSpacing(4)}px`,
                    backgroundColor: 'rgba(59, 130, 246, 0.1)',
                    borderRadius: '0.25rem'
                  }}
                >
                  <div 
                    style={{
                      fontSize: `${getFontSize(1)}px`,
                      fontWeight: 600,
                      marginBottom: `${getSpacing(2)}px`,
                      fontFamily: `${headingFont}, system-ui, sans-serif`,
                    }}
                  >
                    Card Title
                  </div>
                  <div
                    style={{
                      fontSize: `${baseFontSize}px`,
                      lineHeight: 1.5,
                      fontFamily: `${bodyFont}, system-ui, sans-serif`,
                    }}
                  >
                    Card content with consistent spacing.
                  </div>
                </div>
              </div>
              
              <div 
                style={{
                  padding: `${getSpacing(4)}px`,
                  border: '1px solid rgba(0,0,0,0.1)',
                  borderRadius: '0.25rem',
                  marginBottom: `${getSpacing(4)}px`
                }}
              >
                <div 
                  style={{
                    fontSize: `${getFontSize(1)}px`,
                    fontWeight: 600,
                    marginBottom: `${getSpacing(2)}px`,
                    fontFamily: `${headingFont}, system-ui, sans-serif`,
                  }}
                >
                  Form Element
                </div>
                <div 
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: `${getSpacing(2)}px`
                  }}
                >
                  <input 
                    type="text" 
                    placeholder="Input field"
                    style={{
                      padding: `${getSpacing(2)}px`,
                      fontSize: `${baseFontSize}px`,
                      borderRadius: '0.25rem',
                      border: '1px solid rgba(0,0,0,0.2)'
                    }}
                  />
                  <div 
                    style={{
                      padding: `${getSpacing(2)}px`,
                      fontSize: `${baseFontSize}px`,
                      backgroundColor: 'rgba(0,0,0,0.05)',
                      borderRadius: '0.25rem'
                    }}
                  >
                    Dropdown element
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="layout">
            <div 
              className="relative bg-card rounded-md p-6 overflow-hidden"
              style={{
                backgroundImage: showBaseline ? `repeating-linear-gradient(
                  to bottom,
                  transparent,
                  transparent ${getSpacing(2) - 1}px,
                  rgba(59, 130, 246, 0.1) ${getSpacing(2) - 1}px,
                  rgba(59, 130, 246, 0.1) ${getSpacing(2)}px
                )` : 'none'
              }}
            >
              <div 
                style={{
                  fontSize: `${getFontSize(2)}px`,
                  fontWeight: 600,
                  marginBottom: `${getSpacing(4)}px`,
                  fontFamily: `${headingFont}, system-ui, sans-serif`,
                }}
              >
                Layout Spacing
              </div>
              
              <div 
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: `${getSpacing(4)}px`,
                  marginBottom: `${getSpacing(6)}px`
                }}
              >
                <div 
                  style={{
                    height: `${getSpacing(6)}px`,
                    backgroundColor: 'rgba(59, 130, 246, 0.2)',
                    borderRadius: '0.25rem',
                    display: 'flex',
                    alignItems: 'center',
                    paddingLeft: `${getSpacing(4)}px`,
                    fontSize: `${baseFontSize}px`,
                  }}
                >
                  Header Section
                </div>
                <div 
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(3, 1fr)',
                    gap: `${getSpacing(4)}px`,
                  }}
                >
                  <div 
                    style={{
                      height: `${getSpacing(16)}px`,
                      backgroundColor: 'rgba(59, 130, 246, 0.1)',
                      borderRadius: '0.25rem',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: `${baseFontSize}px`,
                    }}
                  >
                    1
                  </div>
                  <div 
                    style={{
                      height: `${getSpacing(16)}px`,
                      backgroundColor: 'rgba(59, 130, 246, 0.1)',
                      borderRadius: '0.25rem',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: `${baseFontSize}px`,
                    }}
                  >
                    2
                  </div>
                  <div 
                    style={{
                      height: `${getSpacing(16)}px`,
                      backgroundColor: 'rgba(59, 130, 246, 0.1)',
                      borderRadius: '0.25rem',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: `${baseFontSize}px`,
                    }}
                  >
                    3
                  </div>
                </div>
                <div 
                  style={{
                    height: `${getSpacing(6)}px`,
                    backgroundColor: 'rgba(59, 130, 246, 0.2)',
                    borderRadius: '0.25rem',
                    display: 'flex',
                    alignItems: 'center',
                    paddingLeft: `${getSpacing(4)}px`,
                    fontSize: `${baseFontSize}px`,
                  }}
                >
                  Footer Section
                </div>
              </div>
              
              <div 
                style={{
                  display: 'flex',
                  gap: `${getSpacing(2)}px`,
                  fontSize: `${baseFontSize * 0.875}px`,
                  justifyContent: 'flex-end'
                }}
              >
                <div>Spacing Scale: <strong>{baseUnit}px</strong> base unit</div>
                <div>Density: <strong>{spacingDensity}</strong></div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
} 