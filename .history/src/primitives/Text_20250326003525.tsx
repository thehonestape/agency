/**
 * Text Primitive Component
 * 
 * An intelligent text component with semantic understanding and automatic adaptations.
 */

import React, { forwardRef, useEffect, useState } from 'react';
import Box, { BoxProps } from './Box';

export interface TextAnalysis {
  sentiment?: 'positive' | 'negative' | 'neutral';
  importance?: 'high' | 'medium' | 'low';
  complexity?: number; // 0-1 scale
  readability?: number; // 0-1 scale
  contentType?: 'heading' | 'paragraph' | 'list-item' | 'quote' | 'code' | 'unknown';
}

export interface TextProps extends BoxProps {
  // Text-specific props
  truncate?: boolean | number;
  casing?: 'uppercase' | 'lowercase' | 'capitalize' | 'normal';
  
  // Semantic adaptation
  semanticRole?: 'heading' | 'body' | 'caption' | 'quote' | 'code' | 'label' | 'error' | 'success' | 'warning' | 'info';
  semanticImportance?: 'primary' | 'secondary' | 'tertiary';
  
  // Intelligent features
  adaptToReadability?: boolean;
  enhanceWithAI?: boolean;
  textAnalysis?: TextAnalysis;
  
  // Smart text variants
  variant?: 'normal' | 'emphasis' | 'muted' | 'gradient';
}

/**
 * Text is a primitive component for displaying text with intelligence.
 * It extends Box and adds typography-specific properties and behaviors.
 * 
 * Example usage:
 * <Text 
 *   fontSize="lg" 
 *   color="primary"
 *   semanticRole="heading"
 *   adaptToReadability
 * >
 *   Intelligent text component
 * </Text>
 */
export const Text = forwardRef<HTMLDivElement, TextProps>(
  ({ 
    as = 'p',
    children,
    truncate = false,
    casing = 'normal',
    semanticRole,
    semanticImportance = 'primary',
    adaptToReadability = false,
    enhanceWithAI = false,
    textAnalysis,
    variant = 'normal',
    ...props 
  }, ref) => {
    // Analyze text content if needed
    const [analysis, setAnalysis] = useState<TextAnalysis | undefined>(textAnalysis);
    
    // Apply text truncation
    const truncateStyles = 
      truncate === true
        ? { 
            overflow: 'hidden', 
            textOverflow: 'ellipsis', 
            whiteSpace: 'nowrap' 
          }
        : typeof truncate === 'number'
        ? { 
            overflow: 'hidden',
            display: '-webkit-box',
            WebkitLineClamp: truncate,
            WebkitBoxOrient: 'vertical',
            textOverflow: 'ellipsis'
          }
        : {};
    
    // Apply text casing
    const casingStyles = {
      textTransform: 
        casing === 'uppercase' ? 'uppercase' :
        casing === 'lowercase' ? 'lowercase' :
        casing === 'capitalize' ? 'capitalize' : 'none'
    };
    
    // Determine element based on semantic role
    const semanticElement = 
      semanticRole === 'heading' ? 'h2' :
      semanticRole === 'body' ? 'p' :
      semanticRole === 'caption' ? 'figcaption' :
      semanticRole === 'quote' ? 'blockquote' :
      semanticRole === 'code' ? 'code' :
      semanticRole === 'label' ? 'label' :
      semanticRole === 'error' ? 'div' :
      semanticRole === 'success' ? 'div' :
      semanticRole === 'warning' ? 'div' :
      semanticRole === 'info' ? 'div' :
      as;
    
    // Apply semantic styles
    const getSemanticStyles = () => {
      // Base styles for semantic role
      const roleStyles = {
        heading: { fontWeight: 'bold', fontSize: 'xl', lineHeight: 'tight' },
        body: { fontSize: 'md', lineHeight: 'normal' },
        caption: { fontSize: 'sm', fontStyle: 'italic', color: 'gray.600' },
        quote: { fontStyle: 'italic', borderLeftWidth: '4px', paddingLeft: '4', fontFamily: 'serif' },
        code: { fontFamily: 'mono', bg: 'gray.100', p: '1', borderRadius: 'sm' },
        label: { fontSize: 'sm', fontWeight: 'medium' },
        error: { color: 'destructive' },
        success: { color: 'success' },
        warning: { color: 'warning' },
        info: { color: 'info' },
      };
      
      // Importance modifier
      const importanceStyles = {
        primary: { fontWeight: 'bold' },
        secondary: { fontWeight: 'normal' },
        tertiary: { fontWeight: 'light', color: 'gray.600' },
      };
      
      return semanticRole ? {
        ...roleStyles[semanticRole as keyof typeof roleStyles],
        ...(semanticRole !== 'heading' && importanceStyles[semanticImportance])
      } : {};
    };
    
    // Apply variant styles
    const getVariantStyles = () => {
      switch (variant) {
        case 'emphasis':
          return { fontWeight: 'bold', color: 'primary' };
        case 'muted':
          return { color: 'gray.500', fontSize: 'sm' };
        case 'gradient':
          return { 
            bgGradient: 'linear(to-r, primary, secondary)',
            bgClip: 'text',
            textFillColor: 'transparent'
          };
        default:
          return {};
      }
    };
    
    // Analyze text content (simplified implementation)
    useEffect(() => {
      if (enhanceWithAI && !textAnalysis && typeof children === 'string') {
        // This would be where we'd call an AI service to analyze the text
        // For demo purposes, we'll simulate with basic analysis
        const text = children;
        const complexityScore = Math.min(text.split(/\s+/).length / 10, 1);
        
        const mockAnalysis: TextAnalysis = {
          complexity: complexityScore,
          readability: 1 - complexityScore,
          contentType: text.length < 50 ? 'heading' : 'paragraph',
          importance: complexityScore > 0.7 ? 'high' : complexityScore > 0.3 ? 'medium' : 'low'
        };
        
        setAnalysis(mockAnalysis);
      }
    }, [children, enhanceWithAI, textAnalysis]);
    
    // Apply readability enhancements based on analysis
    const readabilityStyles = 
      adaptToReadability && analysis
        ? analysis.complexity > 0.7
          ? { lineHeight: 'relaxed', fontSize: 'lg', letterSpacing: 'wide' }
          : analysis.complexity > 0.4
          ? { lineHeight: 'base' }
          : { lineHeight: 'tight' }
        : {};
    
    return (
      <Box
        as={semanticElement}
        ref={ref}
        {...props}
        {...truncateStyles}
        {...casingStyles}
        {...getSemanticStyles()}
        {...getVariantStyles()}
        {...readabilityStyles}
      >
        {children}
      </Box>
    );
  }
);

Text.displayName = 'Text';

export default Text; 