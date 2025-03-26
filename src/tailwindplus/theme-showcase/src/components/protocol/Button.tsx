import React from 'react';
import { Button as UIButton, ButtonProps } from '../ui/button';

export default function Button({ className, ...props }: ButtonProps) {
  return <UIButton className={`protocol-button ${className || ''}`} {...props} />;
} 