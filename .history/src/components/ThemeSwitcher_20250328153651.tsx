import React from 'react';
import { useTheme } from '@/lib/ThemeProvider';

interface ThemeOption {
  id: string;
  name: string;
}

export const ThemeSwitcher: React.FC = () => {
  const { theme, setTheme, isDark } = useTheme();
  
  const themes: ThemeOption[] = [
    { id: 'blue-light', name: 'Blue Light' },
    { id: 'blue-dark', name: 'Blue Dark' },
    { id: 'green-light', name: 'Green Light' },
    { id: 'green-dark', name: 'Green Dark' },
    { id: 'zinc-light', name: 'Zinc Light' },
    { id: 'zinc-dark', name: 'Zinc Dark' },
    { id: 'rose-light', name: 'Rose Light' },
    { id: 'rose-dark', name: 'Rose Dark' }
  ];

  return (
    <div className={`bg-card p-4 rounded-lg border shadow-sm ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
      <h3 className="text-xl font-semibold mb-4">Theme Switcher</h3>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {themes.map((themeOption) => (
          <button
            key={themeOption.id}
            onClick={() => setTheme(themeOption.id as any)}
            className={`px-3 py-2 rounded text-sm transition-colors ${
              theme === themeOption.id
                ? 'bg-primary text-primary-foreground'
                : 'bg-muted hover:bg-muted/80'
            }`}
          >
            {themeOption.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ThemeSwitcher; 