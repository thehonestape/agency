import { describe, it, expect } from 'vitest';
import React from 'react';
import { render, screen } from './test-utils';
import { 
  Button, 
  Container, 
  Card,
  ThemeProvider,
  AppShell,
  useTheme
} from '../component-system';

describe('Component System', () => {
  it('renders Button component correctly', () => {
    render(<Button>Test Button</Button>);
    expect(screen.getByRole('button', { name: 'Test Button' })).toBeInTheDocument();
  });

  it('renders Container component correctly', () => {
    render(
      <Container data-testid="container">
        <div>Container Content</div>
      </Container>
    );
    const container = screen.getByTestId('container');
    expect(container).toBeInTheDocument();
    expect(container).toHaveTextContent('Container Content');
  });

  it('renders Card component correctly', () => {
    render(
      <Card data-testid="card">
        <div>Card Content</div>
      </Card>
    );
    const card = screen.getByTestId('card');
    expect(card).toBeInTheDocument();
    expect(card).toHaveTextContent('Card Content');
  });

  it('renders AppShell component correctly', () => {
    render(
      <AppShell data-testid="app-shell">
        <div>App Shell Content</div>
      </AppShell>
    );
    const appShell = screen.getByTestId('app-shell');
    expect(appShell).toBeInTheDocument();
    expect(appShell).toHaveTextContent('App Shell Content');
  });

  it('ThemeProvider provides theme context', () => {
    const TestComponent = () => {
      const { theme } = useTheme();
      return <div data-testid="theme-test">{theme ? 'Theme exists' : 'No theme'}</div>;
    };

    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );
    
    expect(screen.getByTestId('theme-test')).toHaveTextContent('Theme exists');
  });

  // Integration test to verify components work together
  it('components can be composed together', () => {
    render(
      <ThemeProvider>
        <AppShell data-testid="app-shell">
          <Container data-testid="container">
            <Card data-testid="card">
              <Button data-testid="button">Click Me</Button>
            </Card>
          </Container>
        </AppShell>
      </ThemeProvider>
    );
    
    expect(screen.getByTestId('app-shell')).toBeInTheDocument();
    expect(screen.getByTestId('container')).toBeInTheDocument();
    expect(screen.getByTestId('card')).toBeInTheDocument();
    expect(screen.getByTestId('button')).toBeInTheDocument();
    
    // Verify the component hierarchy
    const appShell = screen.getByTestId('app-shell');
    const container = screen.getByTestId('container');
    const card = screen.getByTestId('card');
    const button = screen.getByTestId('button');
    
    expect(appShell).toContainElement(container);
    expect(container).toContainElement(card);
    expect(card).toContainElement(button);
  });
}); 