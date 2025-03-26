import { describe, it, expect } from 'vitest';
import { render, screen } from '../../../test/test-utils';
import { Container } from '../../../component-system';

describe('Container Component', () => {
  it('renders children correctly', () => {
    render(
      <Container>
        <div data-testid="test-child">Test Content</div>
      </Container>
    );
    
    const childElement = screen.getByTestId('test-child');
    expect(childElement).toBeInTheDocument();
    expect(childElement).toHaveTextContent('Test Content');
  });

  it('applies default classes', () => {
    render(<Container data-testid="container">Content</Container>);
    
    const container = screen.getByTestId('container');
    expect(container).toHaveClass('mx-auto');
    expect(container).toHaveClass('px-4');
  });

  it('applies the correct size class based on size prop', () => {
    render(<Container size="sm" data-testid="container">Content</Container>);
    
    const container = screen.getByTestId('container');
    expect(container).toHaveClass('max-w-screen-sm');
  });

  it('applies additional className when provided', () => {
    render(
      <Container className="test-class" data-testid="container">
        Content
      </Container>
    );
    
    const container = screen.getByTestId('container');
    expect(container).toHaveClass('test-class');
  });
}); 