# Testing System

This directory contains the testing setup for the component system. It uses Vitest with React Testing Library to create a comprehensive test suite for our components.

## Running Tests

```bash
# Run tests once
npm run test

# Run tests in watch mode (for development)
npm run test:watch
```

## Test Structure

Tests are organized alongside the components they test. For example:

- `src/components/core/Button.tsx` has its test in `src/components/core/Button.test.tsx`
- `src/components/core/layout/Container.tsx` has its test in `src/components/core/layout/Container.test.tsx`

## Test Utilities

The `test-utils.tsx` file provides custom render functions that include providers like `ThemeProvider` to make testing components easier. Use this instead of the default render function from React Testing Library.

```tsx
import { render, screen } from '../../test/test-utils';
```

## Writing Tests

When writing tests, follow these conventions:

1. Import from the component-system rather than directly from component files
2. Test both functionality and appearance
3. Include tests for different props and variants
4. Include accessibility tests where relevant

Example:

```tsx
import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '../../test/test-utils';
import { Button } from '../../component-system';

describe('Button Component', () => {
  it('renders with children', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole('button')).toHaveTextContent('Click me');
  });
  
  it('handles clicks', () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Click me</Button>);
    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
```

## Jest DOM Matchers

The testing system includes `@testing-library/jest-dom` for additional DOM-based assertions:

```tsx
expect(element).toBeInTheDocument();
expect(element).toHaveClass('my-class');
expect(element).toBeDisabled();
expect(element).toHaveTextContent('Hello');
``` 