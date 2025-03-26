import React, { useState } from 'react';
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from '@/components/ui/Card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Smartphone, Tablet, Monitor, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface DevicePreviewProps {
  previewUrl?: string;
  primaryColor: string;
  backgroundColor: string;
  borderRadius: number;
  fontSize: number;
  headingFont: string;
  bodyFont: string;
}

export function DevicePreview({
  previewUrl = '/theme-preview',
  primaryColor = '#3b82f6',
  backgroundColor = '#ffffff',
  borderRadius = 0.5,
  fontSize = 16,
  headingFont = 'Inter',
  bodyFont = 'Inter'
}: DevicePreviewProps) {
  const [isLoading, setIsLoading] = useState(false);
  
  // Generate CSS variables for preview iframe
  const generateInjectedCSS = () => {
    return `
      :root {
        --primary: ${primaryColor};
        --font-size: ${fontSize}px;
        --font-sans: "${bodyFont}", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
        --font-heading: "${headingFont}", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
        --radius: ${borderRadius}rem;
        --background: ${backgroundColor};
      }
      body {
        font-family: var(--font-sans);
        font-size: var(--font-size);
        background-color: var(--background);
      }
      h1, h2, h3, h4, h5, h6 {
        font-family: var(--font-heading);
      }
      .rounded {
        border-radius: var(--radius);
      }
      .bg-primary {
        background-color: var(--primary);
      }
    `;
  };
  
  // Handle iframe load
  const handleIframeLoad = (iframe: HTMLIFrameElement) => {
    if (!iframe) return;
    
    setIsLoading(false);
    
    try {
      // Inject CSS into iframe
      const doc = iframe.contentDocument || iframe.contentWindow?.document;
      if (doc) {
        const style = doc.createElement('style');
        style.textContent = generateInjectedCSS();
        doc.head.appendChild(style);
      }
    } catch (error) {
      console.error('Error injecting styles into iframe:', error);
    }
  };

  // Start loading when changing tabs
  const handleTabChange = () => {
    setIsLoading(true);
  };
  
  // Open preview in new window
  const openPreviewInNewWindow = () => {
    const win = window.open(previewUrl, '_blank');
    if (win) {
      win.addEventListener('load', () => {
        const style = win.document.createElement('style');
        style.textContent = generateInjectedCSS();
        win.document.head.appendChild(style);
      });
    }
  };

  return (
    <Card className="device-preview">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div>
          <CardTitle>Device Preview</CardTitle>
          <CardDescription>See your theme on different devices</CardDescription>
        </div>
        <Button 
          variant="outline" 
          size="sm"
          onClick={openPreviewInNewWindow}
        >
          <ExternalLink className="h-4 w-4 mr-2" />
          Open in New Window
        </Button>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="desktop" onValueChange={handleTabChange}>
          <TabsList className="grid grid-cols-3 w-full">
            <TabsTrigger value="mobile" className="flex items-center">
              <Smartphone className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">Mobile</span>
            </TabsTrigger>
            <TabsTrigger value="tablet" className="flex items-center">
              <Tablet className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">Tablet</span>
            </TabsTrigger>
            <TabsTrigger value="desktop" className="flex items-center">
              <Monitor className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">Desktop</span>
            </TabsTrigger>
          </TabsList>
          
          <div className="relative mt-4 border border-border rounded-md overflow-hidden bg-muted/20">
            {isLoading && (
              <div className="absolute inset-0 flex items-center justify-center bg-background/80 z-10">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
              </div>
            )}
            
            <TabsContent value="mobile" className="m-0">
              <div className="flex justify-center py-4 bg-muted/10">
                <div className="w-[375px] h-[667px] overflow-hidden border border-border rounded-md bg-background shadow-sm">
                  <iframe 
                    src={previewUrl} 
                    className="w-full h-full"
                    title="Mobile Preview"
                    ref={(iframe) => iframe && handleIframeLoad(iframe)}
                    onLoad={(e) => handleIframeLoad(e.target as HTMLIFrameElement)}
                  />
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="tablet" className="m-0">
              <div className="flex justify-center py-4 bg-muted/10">
                <div className="w-[768px] h-[1024px] max-w-full max-h-[600px] overflow-hidden border border-border rounded-md bg-background shadow-sm">
                  <iframe 
                    src={previewUrl} 
                    className="w-full h-full"
                    title="Tablet Preview"
                    ref={(iframe) => iframe && handleIframeLoad(iframe)}
                    onLoad={(e) => handleIframeLoad(e.target as HTMLIFrameElement)}
                  />
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="desktop" className="m-0">
              <div className="py-4 px-4 bg-muted/10">
                <div className="w-full h-[600px] overflow-hidden border border-border rounded-md bg-background shadow-sm">
                  <iframe 
                    src={previewUrl} 
                    className="w-full h-full"
                    title="Desktop Preview"
                    ref={(iframe) => iframe && handleIframeLoad(iframe)}
                    onLoad={(e) => handleIframeLoad(e.target as HTMLIFrameElement)}
                  />
                </div>
              </div>
            </TabsContent>
          </div>
        </Tabs>
      </CardContent>
    </Card>
  );
} 