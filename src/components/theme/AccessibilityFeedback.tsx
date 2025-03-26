import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from '@/components/ui/Card';
import { Badge } from '@/components/ui/badge';
import { AlertCircle, CheckCircle2, AlertTriangle, Lightbulb } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface AccessibilityFeedbackProps {
  primaryColor: string;
  backgroundColor: string;
}

export function AccessibilityFeedback({
  primaryColor,
  backgroundColor
}: AccessibilityFeedbackProps) {
  const [contrastRatio, setContrastRatio] = useState<number>(0);
  const [contrastScore, setContrastScore] = useState<'AA' | 'AAA' | 'Fail'>('Fail');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  
  // Helper function to convert hex to RGB
  const hexToRgb = (hex: string) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return { r, g, b };
  };
  
  // Calculate relative luminance for a color
  const calculateLuminance = (color: string) => {
    const { r, g, b } = hexToRgb(color);
    
    // Convert RGB to linear values
    const rLinear = r / 255 <= 0.03928 ? r / 255 / 12.92 : Math.pow((r / 255 + 0.055) / 1.055, 2.4);
    const gLinear = g / 255 <= 0.03928 ? g / 255 / 12.92 : Math.pow((g / 255 + 0.055) / 1.055, 2.4);
    const bLinear = b / 255 <= 0.03928 ? b / 255 / 12.92 : Math.pow((b / 255 + 0.055) / 1.055, 2.4);
    
    // Calculate luminance
    return 0.2126 * rLinear + 0.7152 * gLinear + 0.0722 * bLinear;
  };
  
  // Calculate contrast ratio between two colors
  const calculateContrastRatio = (color1: string, color2: string) => {
    const luminance1 = calculateLuminance(color1);
    const luminance2 = calculateLuminance(color2);
    
    const lighter = Math.max(luminance1, luminance2);
    const darker = Math.min(luminance1, luminance2);
    
    return (lighter + 0.05) / (darker + 0.05);
  };
  
  // Determine WCAG 2.1 compliance level
  const getComplianceLevel = (ratio: number) => {
    if (ratio >= 7) return 'AAA';
    if (ratio >= 4.5) return 'AA';
    return 'Fail';
  };
  
  // Generate suggestions for improvement
  const generateSuggestions = (ratio: number, luminance1: number, luminance2: number) => {
    const suggestions: string[] = [];
    
    if (ratio < 4.5) {
      const threshold = 4.5;
      
      if (luminance1 > luminance2) {
        // Background is lighter than text
        suggestions.push('Try a darker background or lighter text for better contrast');
      } else {
        // Text is lighter than background
        suggestions.push('Try a lighter text color or darker background for better contrast');
      }
      
      suggestions.push(`Current contrast ratio (${ratio.toFixed(2)}) doesn't meet WCAG AA standard minimum of 4.5:1`);
    } else if (ratio < 7) {
      suggestions.push('Good contrast for standard text, but consider improving for enhanced accessibility');
    } else {
      suggestions.push('Excellent contrast that meets the highest accessibility standards');
    }
    
    return suggestions;
  };
  
  // Update calculations when colors change
  useEffect(() => {
    if (!primaryColor || !backgroundColor) return;
    
    const ratio = calculateContrastRatio(primaryColor, backgroundColor);
    setContrastRatio(ratio);
    
    const level = getComplianceLevel(ratio);
    setContrastScore(level);
    
    const primaryLuminance = calculateLuminance(primaryColor);
    const bgLuminance = calculateLuminance(backgroundColor);
    const newSuggestions = generateSuggestions(ratio, primaryLuminance, bgLuminance);
    setSuggestions(newSuggestions);
  }, [primaryColor, backgroundColor]);

  return (
    <Card className="accessibility-feedback">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div className="flex items-center space-x-2">
          <div className="bg-primary/10 p-2 rounded-full">
            <CheckCircle2 className="h-4 w-4 text-primary" />
          </div>
          <div>
            <CardTitle>Accessibility Check</CardTitle>
            <CardDescription>Review color contrast and accessibility</CardDescription>
          </div>
        </div>
        <Badge 
          variant={contrastScore === 'AAA' ? 'default' : contrastScore === 'AA' ? 'outline' : 'destructive'}
          className="px-2.5 py-0.5"
        >
          {contrastScore === 'AAA' ? 'AAA' : contrastScore === 'AA' ? 'AA' : 'Needs Improvement'}
        </Badge>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="contrast" className="w-full">
          <TabsList className="grid grid-cols-2 mb-4">
            <TabsTrigger value="contrast">Contrast</TabsTrigger>
            <TabsTrigger value="preview">Preview</TabsTrigger>
          </TabsList>
          
          <TabsContent value="contrast" className="space-y-4">
            <div className="p-4 bg-muted rounded-md">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div 
                    className="w-5 h-5 rounded"
                    style={{ backgroundColor: primaryColor }}
                  ></div>
                  <span className="text-sm font-medium">Primary</span>
                  <code className="text-xs bg-primary/10 px-1.5 py-0.5 rounded">{primaryColor}</code>
                </div>
                <div className="flex items-center gap-2">
                  <div 
                    className="w-5 h-5 rounded"
                    style={{ backgroundColor: backgroundColor }}
                  ></div>
                  <span className="text-sm font-medium">Background</span>
                  <code className="text-xs bg-primary/10 px-1.5 py-0.5 rounded">{backgroundColor}</code>
                </div>
              </div>
              
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-medium">Contrast Ratio</span>
                <Badge 
                  variant="outline" 
                  className={`font-mono ${
                    contrastScore === 'AAA' 
                      ? 'bg-green-500/10 text-green-700' 
                      : contrastScore === 'AA'
                        ? 'bg-yellow-500/10 text-yellow-700'
                        : 'bg-red-500/10 text-red-700'
                  }`}
                >
                  {contrastRatio.toFixed(2)}:1
                </Badge>
              </div>
              
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  {contrastScore === 'AAA' ? (
                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                  ) : contrastScore === 'AA' ? (
                    <AlertTriangle className="h-4 w-4 text-yellow-500" />
                  ) : (
                    <AlertCircle className="h-4 w-4 text-red-500" />
                  )}
                  
                  <span className="text-sm">
                    {contrastScore === 'AAA'
                      ? 'Meets WCAG AAA standard (7:1+)'
                      : contrastScore === 'AA'
                        ? 'Meets WCAG AA standard (4.5:1+)'
                        : 'Does not meet WCAG AA standard'}
                  </span>
                </div>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Lightbulb className="h-4 w-4 text-amber-500" />
                <span className="text-sm font-medium">Suggestions</span>
              </div>
              <ul className="space-y-1.5 pl-6 text-sm">
                {suggestions.map((suggestion, index) => (
                  <li key={index} className="list-disc text-muted-foreground">
                    {suggestion}
                  </li>
                ))}
              </ul>
            </div>
          </TabsContent>
          
          <TabsContent value="preview" className="space-y-4">
            <div 
              className="p-4 rounded-md border" 
              style={{ 
                backgroundColor: backgroundColor,
                color: primaryColor
              }}
            >
              <h2 
                style={{ 
                  color: primaryColor,
                  fontSize: '18px',
                  fontWeight: 600,
                  marginBottom: '8px'
                }}
              >
                Primary color on background
              </h2>
              <p 
                style={{ 
                  color: primaryColor,
                  fontSize: '14px'
                }}
              >
                This text is displayed using your primary color on your selected background. 
                It demonstrates how readable the text will be in your actual design.
              </p>
            </div>
            
            <div 
              className="p-4 rounded-md border" 
              style={{ 
                backgroundColor: primaryColor,
                color: backgroundColor
              }}
            >
              <h2 
                style={{ 
                  color: backgroundColor,
                  fontSize: '18px',
                  fontWeight: 600,
                  marginBottom: '8px'
                }}
              >
                Background color on primary
              </h2>
              <p 
                style={{ 
                  color: backgroundColor,
                  fontSize: '14px'
                }}
              >
                This text is displayed using your background color on your primary color background.
                This is important for buttons and other elements with inverted colors.
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
} 