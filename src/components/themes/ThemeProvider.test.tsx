import { describe, it, expect } from 'vitest';
import { render, screen, renderHook, act } from '../../test/test-utils';
import { ThemeProvider, useTheme } from '../../component-system';

describe('ThemeProvider Component', () => {
  it('provides theme context to children', () => {
    render(
      <ThemeProvider>
        <ThemeConsumer />
      </ThemeProvider>
    );

    expect(screen.getByTestId('theme-display')).toBeInTheDocument();
    expect(screen.getByTestId('theme-display')).toHaveTextContent('Theme is available');
  });

  it('allows changing the theme', () => {
    const { result } = renderHook(() => useTheme(), {
      wrapper: ThemeProvider,
    });
    
    const newTheme = {
      ...result.current.theme,
      colors: {
        ...result.current.theme.colors,
        primary: '#ff0000',
      },
    };
    
    act(() => {
      result.current.setTheme(newTheme);
    });
    
    expect(result.current.theme.colors.primary).toBe('#ff0000');
  });
});

// Helper component to test ThemeProvider context
function ThemeConsumer() {
  const { theme } = useTheme();
  
  return (
    <div data-testid="theme-display">
      {theme ? 'Theme is available' : 'Theme is not available'}
    </div>
  );
} 