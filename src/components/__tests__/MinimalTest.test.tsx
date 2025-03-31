import { describe, it, expect } from 'vitest';
import React from 'react';
import { render, screen } from '@testing-library/react';

// Simple component that doesn't use any hooks
const SimpleComponent = ({ text }: { text: string }) => (
  <div data-testid="simple-component">{text}</div>
);

describe('Simple Component', () => {
  it('renders properly', () => {
    render(<SimpleComponent text="Hello, testing!" />);
    const element = screen.getByTestId('simple-component');
    expect(element).toBeInTheDocument();
    expect(element.textContent).toBe('Hello, testing!');
  });
});
