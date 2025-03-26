import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/button';
import { Code, Copy, Check, ArrowLeft, ExternalLink, Smartphone, Tablet, Monitor, Sun, Moon } from 'lucide-react';

interface UIBlockPreviewProps {
  title: string;
  description?: string;
  children: React.ReactNode;
  codeString: string;
}

export function UIBlockPreview({ title, description, children, codeString }: UIBlockPreviewProps) {
  const [showCode, setShowCode] = useState(false);
  const [copied, setCopied] = useState(false);
  const [previewMode, setPreviewMode] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  const handleCopyCode = () => {
    navigator.clipboard.writeText(codeString);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getPreviewWidth = () => {
    switch (previewMode) {
      case 'mobile': return 'max-w-[320px]';
      case 'tablet': return 'max-w-[768px]';
      case 'desktop': return 'w-full';
      default: return 'w-full';
    }
  };

  return (
    <Card className="overflow-hidden mb-8">
      <div className="p-4 bg-muted/40 border-b flex justify-between items-center">
        <h3 className="font-medium text-lg">{title}</h3>
        <div className="flex space-x-2">
          {!showCode && (
            <div className="flex border rounded-md overflow-hidden mr-2">
              <Button 
                variant={previewMode === 'mobile' ? "secondary" : "ghost"} 
                size="sm" 
                className="px-2"
                onClick={() => setPreviewMode('mobile')}
                title="Mobile view"
              >
                <Smartphone className="h-4 w-4" />
              </Button>
              <Button 
                variant={previewMode === 'tablet' ? "secondary" : "ghost"} 
                size="sm" 
                className="px-2"
                onClick={() => setPreviewMode('tablet')}
                title="Tablet view"
              >
                <Tablet className="h-4 w-4" />
              </Button>
              <Button 
                variant={previewMode === 'desktop' ? "secondary" : "ghost"} 
                size="sm" 
                className="px-2"
                onClick={() => setPreviewMode('desktop')}
                title="Desktop view"
              >
                <Monitor className="h-4 w-4" />
              </Button>
            </div>
          )}
          
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
            title={theme === 'light' ? 'Switch to dark theme' : 'Switch to light theme'}
          >
            {theme === 'light' ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
          </Button>
          
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => setShowCode(!showCode)}
          >
            {showCode ? <ArrowLeft className="h-4 w-4 mr-2" /> : <Code className="h-4 w-4 mr-2" />}
            {showCode ? 'Back to Preview' : 'View Code'}
          </Button>
          
          {showCode && (
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleCopyCode}
            >
              {copied ? <Check className="h-4 w-4 mr-2" /> : <Copy className="h-4 w-4 mr-2" />}
              {copied ? 'Copied!' : 'Copy'}
            </Button>
          )}
          
          <Button 
            variant="outline" 
            size="sm" 
            asChild
          >
            <a href={`/ui-blocks/preview/${title.toLowerCase().replace(/\s+/g, '-')}`} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="h-4 w-4 mr-2" />
              Isolate
            </a>
          </Button>
        </div>
      </div>
      
      {description && (
        <div className="px-4 py-2 bg-muted/20 border-b">
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
      )}
      
      {showCode ? (
        <div className="overflow-auto max-h-[600px] bg-gray-950 p-4">
          <pre className="text-white text-sm font-mono">
            <code>{codeString}</code>
          </pre>
        </div>
      ) : (
        <CardContent className={`p-0 ${theme === 'dark' ? 'bg-gray-900 text-white' : ''}`}>
          <div className={`preview-container mx-auto transition-all duration-200 ${getPreviewWidth()}`}>
            <div className={theme === 'dark' ? 'dark' : ''}>
              {children}
            </div>
          </div>
        </CardContent>
      )}
    </Card>
  );
}

export default UIBlockPreview; 