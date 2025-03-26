/**
 * FormControl Component Example
 * This shows how to create form components using our Box component as a base
 */

import React from 'react';
import Box, { BoxProps } from './Box';
import { cn } from '../../../lib/utils';

// FormControl Component
export interface FormControlProps extends BoxProps {
  id?: string;
  isRequired?: boolean;
  isInvalid?: boolean;
  isDisabled?: boolean;
  isReadOnly?: boolean;
  label?: string;
  helperText?: string;
  errorText?: string;
}

/**
 * FormControl provides context and layout for form elements
 * 
 * Example usage:
 * <FormControl 
 *   id="email"
 *   label="Email Address"
 *   helperText="We'll never share your email."
 *   isRequired
 * >
 *   <Input />
 * </FormControl>
 */
export const FormControl = React.forwardRef<HTMLDivElement, FormControlProps>(
  ({ 
    id,
    isRequired,
    isInvalid,
    isDisabled,
    isReadOnly,
    label,
    helperText,
    errorText,
    className,
    children,
    ...props 
  }, ref) => {
    // Create a context ID to link label with input
    const formId = id || `form-${Math.random().toString(36).substring(2, 9)}`;
    
    // Create a form context to pass down to children (in a real implementation)
    const formContext = {
      id: formId,
      isRequired,
      isInvalid,
      isDisabled,
      isReadOnly,
    };
    
    return (
      <Box
        ref={ref}
        className={cn('form-control', className)}
        mb="md"
        {...props}
      >
        {label && (
          <FormLabel
            htmlFor={formId}
            isRequired={isRequired}
            isDisabled={isDisabled}
          >
            {label}
          </FormLabel>
        )}
        
        {/* Here we would use React Context to pass formContext to children */}
        {children}
        
        {helperText && !isInvalid && (
          <FormHelperText>{helperText}</FormHelperText>
        )}
        
        {(errorText && isInvalid) && (
          <FormErrorMessage>{errorText}</FormErrorMessage>
        )}
      </Box>
    );
  }
);

FormControl.displayName = 'FormControl';

// FormLabel Component
export interface FormLabelProps extends Omit<BoxProps, 'htmlFor'> {
  htmlFor?: string;
  isRequired?: boolean;
  isDisabled?: boolean;
}

export const FormLabel = React.forwardRef<HTMLLabelElement, FormLabelProps>(
  ({ htmlFor, isRequired, isDisabled, className, children, ...props }, ref) => {
    return (
      <Box
        ref={ref as any} // Cast ref to work with both HTMLLabelElement and HTMLDivElement
        as="label"
        htmlFor={htmlFor}
        className={cn('form-label', className)}
        display="block"
        mb="xs"
        fontWeight="medium"
        opacity={isDisabled ? 0.4 : 1}
        {...props}
      >
        {children}
        {isRequired && (
          <Box as="span" color="red.500" ml="1">*</Box>
        )}
      </Box>
    );
  }
);

FormLabel.displayName = 'FormLabel';

// Input Component
export interface InputProps extends Omit<BoxProps, 'type' | 'size' | 'onChange'> {
  type?: string;
  placeholder?: string;
  value?: string;
  defaultValue?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  isDisabled?: boolean;
  isInvalid?: boolean;
  isRequired?: boolean;
  isReadOnly?: boolean;
  size?: 'xs' | 'sm' | 'md' | 'lg';
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ 
    type = 'text', 
    size = 'md',
    isDisabled, 
    isInvalid, 
    isReadOnly,
    className, 
    ...props 
  }, ref) => {
    // Size styles
    const sizeStyles = {
      xs: { px: 2, py: 1, fontSize: 'xs' },
      sm: { px: 3, py: 1.5, fontSize: 'sm' },
      md: { px: 4, py: 2, fontSize: 'md' },
      lg: { px: 5, py: 3, fontSize: 'lg' },
    };
    
    return (
      <Box
        ref={ref as any} // Cast ref to work with both HTMLInputElement and HTMLDivElement
        as="input"
        type={type}
        className={cn('input', className)}
        display="block"
        width="100%"
        borderWidth="1px"
        borderStyle="solid"
        borderColor={isInvalid ? 'red.500' : 'gray.200'}
        borderRadius="md"
        bg={isDisabled ? 'gray.100' : 'white'}
        color={isDisabled ? 'gray.400' : 'gray.800'}
        disabled={isDisabled}
        readOnly={isReadOnly}
        transition="all 0.2s"
        _hover={{
          borderColor: !isDisabled && !isInvalid ? 'primary' : undefined,
        }}
        _focus={{
          borderColor: !isInvalid ? 'primary' : 'red.500',
          boxShadow: !isInvalid ? '0 0 0 1px rgba(66, 153, 225, 0.6)' : '0 0 0 1px rgba(245, 101, 101, 0.6)',
        }}
        {...sizeStyles[size as keyof typeof sizeStyles]}
        {...props}
      />
    );
  }
);

Input.displayName = 'Input';

// FormHelperText Component
export interface FormHelperTextProps extends BoxProps {}

export const FormHelperText = React.forwardRef<HTMLParagraphElement, FormHelperTextProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <Box
        ref={ref as any} // Cast ref to work with HTMLParagraphElement
        className={cn('form-helper-text', className)}
        mt="xs"
        fontSize="sm"
        color="gray.500"
        {...props}
      >
        {children}
      </Box>
    );
  }
);

FormHelperText.displayName = 'FormHelperText';

// FormErrorMessage Component
export interface FormErrorMessageProps extends BoxProps {}

export const FormErrorMessage = React.forwardRef<HTMLParagraphElement, FormErrorMessageProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <Box
        ref={ref as any} // Cast ref to work with HTMLParagraphElement
        className={cn('form-error-message', className)}
        mt="xs"
        fontSize="sm"
        color="red.500"
        {...props}
      >
        {children}
      </Box>
    );
  }
);

FormErrorMessage.displayName = 'FormErrorMessage';

export default {
  FormControl,
  FormLabel,
  Input,
  FormHelperText,
  FormErrorMessage,
}; 