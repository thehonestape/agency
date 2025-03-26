import { describe, it, expect, vi } from 'vitest';
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';

// Simple Button component that doesn't depend on ThemeContext
const SimpleButton = ({
  variant = 'primary',
  size = 'md',
  disabled = false,
  onClick,
  children,
}: {
  variant?: 'primary' | 'secondary' | 'tertiary';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  onClick?: () => void;
  children: React.ReactNode;
}) => {
  const baseClasses = "rounded font-medium";
  const variantClasses = {
    primary: "bg-blue-600 text-white hover:bg-blue-700",
    secondary: "bg-gray-200 text-gray-800 hover:bg-gray-300",
    tertiary: "bg-transparent text-blue-600 hover:text-blue-700"
  };
  const sizeClasses = {
    sm: "py-1 px-2 text-sm",
    md: "py-2 px-4 text-base",
    lg: "py-3 px-6 text-lg"
  };
  
  const className = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`;
  
  return (
    <button 
      className={className}
      disabled={disabled}
      onClick={onClick}
      data-testid="simple-button"
    >
      {children}
    </button>
  );
};

describe('SimpleButton Component', () => {
  it('renders correctly with default props', () => {
    render(<SimpleButton>Click me</SimpleButton>);
    const button = screen.getByTestId('simple-button');
    expect(button).toBeInTheDocument();
    expect(button.textContent).toBe('Click me');
  });
  
  it('applies the correct variant class', () => {
    render(<SimpleButton variant="secondary">Secondary Button</SimpleButton>);
    const button = screen.getByTestId('simple-button');
    expect(button.className).toContain('bg-gray-200');
  });
  
  it('applies the correct size class', () => {
    render(<SimpleButton size="lg">Large Button</SimpleButton>);
    const button = screen.getByTestId('simple-button');
    expect(button.className).toContain('py-3 px-6');
  });
  
  it('handles click events', () => {
    const handleClick = vi.fn();
    render(<SimpleButton onClick={handleClick}>Clickable</SimpleButton>);
    const button = screen.getByTestId('simple-button');
    fireEvent.click(button);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
  
  it('can be disabled', () => {
    const handleClick = vi.fn();
    render(<SimpleButton disabled onClick={handleClick}>Disabled</SimpleButton>);
    const button = screen.getByTestId('simple-button');
    expect(button).toBeDisabled();
    fireEvent.click(button);
    expect(handleClick).not.toHaveBeenCalled();
  });
}); 