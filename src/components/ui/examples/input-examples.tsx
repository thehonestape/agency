import * as React from 'react';
import { Input } from '@/components/ui/form/input';
import { Search, Eye, EyeOff } from 'lucide-react';

export function InputExamples() {
  const [showPassword, setShowPassword] = React.useState(false);
  const [value, setValue] = React.useState('');

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-lg font-semibold mb-4">Prop-Based API (Chakra UI Style)</h2>
        <div className="space-y-4 max-w-md">
          {/* Basic input */}
          <div>
            <label className="block text-sm font-medium mb-1">Basic Input</label>
            <Input 
              placeholder="Enter your name" 
              size="md"
            />
          </div>
          
          {/* Input with error */}
          <div>
            <label className="block text-sm font-medium mb-1">Input with Error</label>
            <Input 
              placeholder="Email address" 
              isInvalid={true}
              errorMessage="Please enter a valid email address"
              renderErrorMessage={true}
            />
          </div>
          
          {/* Input with helper text */}
          <div>
            <label className="block text-sm font-medium mb-1">Input with Helper Text</label>
            <Input 
              placeholder="Create a password" 
              type={showPassword ? "text" : "password"}
              helperText="Password must be at least 8 characters"
              renderHelperText={true}
            />
          </div>
          
          {/* Different sizes */}
          <div className="space-y-2">
            <label className="block text-sm font-medium mb-1">Different Sizes</label>
            <Input size="xs" placeholder="Extra Small" className="mb-2" />
            <Input size="sm" placeholder="Small" className="mb-2" />
            <Input size="md" placeholder="Medium" className="mb-2" />
            <Input size="lg" placeholder="Large" className="mb-2" />
            <Input size="xl" placeholder="Extra Large" />
          </div>
          
          {/* Disabled and Read-only */}
          <div className="space-y-2">
            <label className="block text-sm font-medium mb-1">States</label>
            <Input isDisabled={true} placeholder="Disabled input" className="mb-2" />
            <Input isReadOnly={true} value="Read-only input" />
          </div>
        </div>
      </div>
      
      <div>
        <h2 className="text-lg font-semibold mb-4">Legacy/Class-Based API (DaisyUI Style)</h2>
        <div className="space-y-4 max-w-md">
          {/* Default input */}
          <div>
            <label className="block text-sm font-medium mb-1">Default Input</label>
            <Input 
              placeholder="Default input" 
              inputSize="md"
            />
          </div>
          
          {/* Input with state */}
          <div>
            <label className="block text-sm font-medium mb-1">Input States</label>
            <Input 
              placeholder="Error state" 
              state="error"
              className="mb-2"
            />
            <Input 
              placeholder="Success state" 
              state="success"
              className="mb-2"
            />
            <Input 
              placeholder="Warning state" 
              state="warning"
            />
          </div>
          
          {/* Input variants */}
          <div>
            <label className="block text-sm font-medium mb-1">Input Variants</label>
            <Input 
              placeholder="Default variant" 
              variant="default"
              className="mb-2"
            />
            <Input 
              placeholder="Subtle variant" 
              variant="subtle"
              className="mb-2"
            />
            <Input 
              placeholder="Muted variant" 
              variant="muted"
            />
          </div>
          
          {/* Border variants */}
          <div>
            <label className="block text-sm font-medium mb-1">Border Variants</label>
            <Input 
              placeholder="No border" 
              border="none"
              className="mb-2"
            />
            <Input 
              placeholder="Default border" 
              border="default"
              className="mb-2"
            />
            <Input 
              placeholder="Strong border" 
              border="strong"
            />
          </div>
          
          {/* Rounded variants */}
          <div>
            <label className="block text-sm font-medium mb-1">Rounded Variants</label>
            <Input 
              placeholder="No rounding" 
              rounded="none"
              className="mb-2"
            />
            <Input 
              placeholder="Medium rounding" 
              rounded="md"
              className="mb-2"
            />
            <Input 
              placeholder="Full rounding" 
              rounded="full"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
