import React from 'react';
import { useTheme } from '@/lib/theme-provider';

interface ButtonProps {
  children?: React.ReactNode;
  onClick?: () => void;
  className?: string;
  variant?: string;
}

export default function Button({ 
  children = 'Button', 
  onClick, 
  className = '',
  variant = 'primary'
}: ButtonProps) {
  const { currentTheme } = useTheme();
  
  // Apply theme-specific class
  const themeClass = `${currentTheme}-button`;
  
  return (
    <button 
      onClick={onClick} 
      className={`${themeClass} ${className}`}
    >
      {children}
    </button>
  );
} 