import * as React from 'react';
import { Button } from '@/components/ui/button';
import { Mail, ArrowRight, Settings } from 'lucide-react';

export function ButtonExamples() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-lg font-semibold mb-4">Prop-Based API (Chakra UI Style)</h2>
        <div className="flex flex-wrap gap-4">
          {/* Basic button with variant and colorScheme */}
          <Button 
            variant="default" 
            colorScheme="primary"
          >
            Primary Button
          </Button>
          
          {/* Button with icons */}
          <Button 
            variant="default" 
            colorScheme="secondary"
            leftIcon={<Mail size={16} />}
          >
            Email Us
          </Button>
          
          {/* Button with right icon */}
          <Button 
            variant="outline" 
            colorScheme="primary"
            rightIcon={<ArrowRight size={16} />}
          >
            Next Step
          </Button>
          
          {/* Loading state */}
          <Button 
            variant="default" 
            colorScheme="success"
            isLoading={true}
          >
            Saving...
          </Button>
          
          {/* Different sizes */}
          <Button 
            variant="default" 
            colorScheme="info"
            size="sm"
          >
            Small
          </Button>
          
          <Button 
            variant="default" 
            colorScheme="info"
            size="default"
          >
            Medium
          </Button>
          
          <Button 
            variant="default" 
            colorScheme="info"
            size="lg"
          >
            Large
          </Button>
          
          {/* Icon button with shape */}
          <Button 
            variant="ghost"
            shape="circle"
            aria-label="Settings"
          >
            <Settings size={18} />
          </Button>
        </div>
      </div>
      
      <div>
        <h2 className="text-lg font-semibold mb-4">Legacy/Class-Based API (DaisyUI Style)</h2>
        <div className="flex flex-wrap gap-4">
          {/* Default button */}
          <Button variant="default">
            Default
          </Button>
          
          {/* Destructive button */}
          <Button variant="destructive">
            Delete
          </Button>
          
          {/* Outline button */}
          <Button variant="outline">
            Outline
          </Button>
          
          {/* Secondary button */}
          <Button variant="secondary">
            Secondary
          </Button>
          
          {/* Ghost button */}
          <Button variant="ghost">
            Ghost
          </Button>
          
          {/* Link button */}
          <Button variant="link">
            Link
          </Button>
          
          {/* Loading button */}
          <Button variant="default" loading={true}>
            Loading
          </Button>
          
          {/* Full width button */}
          <Button variant="default" fullWidth={true} className="mt-4">
            Full Width
          </Button>
        </div>
      </div>
      
      <div>
        <h2 className="text-lg font-semibold mb-4">Elevation Examples</h2>
        <div className="flex flex-wrap gap-4">
          <Button variant="default" colorScheme="primary" elevation="flat">
            Flat
          </Button>
          
          <Button variant="default" colorScheme="primary" elevation="raised">
            Raised
          </Button>
          
          <Button variant="default" colorScheme="primary" elevation="elevated">
            Elevated
          </Button>
        </div>
      </div>
    </div>
  );
}
