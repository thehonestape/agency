import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '../../../test/test-utils';
import { BrandThemeGenerator } from './BrandThemeGenerator';
import { Theme } from '../../../component-system';

describe('BrandThemeGenerator Component', () => {
  it('renders the component correctly', () => {
    render(<BrandThemeGenerator />);
    
    // Check that the main sections are rendered
    expect(screen.getByText('Brand Colors')).toBeInTheDocument();
    expect(screen.getByText('Typography')).toBeInTheDocument();
    expect(screen.getByText('Spacing')).toBeInTheDocument();
    
    // Check that the brand name input is there
    expect(screen.getByLabelText('Brand Name')).toBeInTheDocument();
    
    // Check that color inputs are there
    expect(screen.getByLabelText('Primary Color')).toBeInTheDocument();
    expect(screen.getByLabelText('Secondary Color')).toBeInTheDocument();
    expect(screen.getByLabelText('Accent Color')).toBeInTheDocument();
    
    // Check that action buttons are rendered
    expect(screen.getByRole('button', { name: /Generate Theme/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Apply Theme/i })).toBeDisabled();
  });

  it('calls onThemeGenerated when the Generate Theme button is clicked', () => {
    const onThemeGenerated = vi.fn();
    render(<BrandThemeGenerator onThemeGenerated={onThemeGenerated} />);
    
    // Click the generate theme button
    fireEvent.click(screen.getByRole('button', { name: /Generate Theme/i }));
    
    // Check that the callback was called with a theme object
    expect(onThemeGenerated).toHaveBeenCalledTimes(1);
    expect(onThemeGenerated).toHaveBeenCalledWith(expect.objectContaining({
      colors: expect.any(Object),
      fonts: expect.any(Object),
      spacing: expect.any(Object),
      radius: expect.any(Object)
    }));
    
    // Apply button should now be enabled
    expect(screen.getByRole('button', { name: /Apply Theme/i })).not.toBeDisabled();
  });

  it('allows updating brand colors', () => {
    render(<BrandThemeGenerator />);
    
    // Change the primary color
    const primaryColorInput = screen.getAllByLabelText('Primary Color')[1]; // Get the text input
    fireEvent.change(primaryColorInput, { target: { value: '#ff0000' } });
    
    // Check that the input value changed
    expect(primaryColorInput).toHaveValue('#ff0000');
    
    // Generate the theme
    fireEvent.click(screen.getByRole('button', { name: /Generate Theme/i }));
    
    // Apply button should be enabled
    expect(screen.getByRole('button', { name: /Apply Theme/i })).not.toBeDisabled();
  });
}); 