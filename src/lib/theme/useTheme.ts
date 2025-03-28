import { useEffect, useState } from 'react';
import { Theme, ThemeConfig, ThemeMode } from './types';
import { generateTheme, applyTheme } from './generator';

interface UseThemeOptions {
  defaultConfig?: ThemeConfig;
  storageKey?: string;
}

export function useTheme(options: UseThemeOptions = {}) {
  const {
    defaultConfig = {
      primaryColor: '#3b82f6',
      mode: 'light',
    },
    storageKey = 'theme-config',
  } = options;

  // Load saved theme config from storage
  const loadSavedConfig = (): ThemeConfig => {
    if (typeof window === 'undefined') return defaultConfig;
    
    const saved = localStorage.getItem(storageKey);
    if (!saved) return defaultConfig;
    
    try {
      return JSON.parse(saved);
    } catch {
      return defaultConfig;
    }
  };

  // Save theme config to storage
  const saveConfig = (config: ThemeConfig) => {
    if (typeof window === 'undefined') return;
    localStorage.setItem(storageKey, JSON.stringify(config));
  };

  // State
  const [config, setConfig] = useState<ThemeConfig>(loadSavedConfig);
  const [theme, setTheme] = useState<Theme>(() => generateTheme(config));

  // Update theme when config changes
  useEffect(() => {
    const newTheme = generateTheme(config);
    setTheme(newTheme);
    applyTheme(newTheme);
    saveConfig(config);
  }, [config]);

  // Theme controls
  const updateConfig = (newConfig: Partial<ThemeConfig>) => {
    setConfig(prev => ({ ...prev, ...newConfig }));
  };

  const setMode = (mode: ThemeMode) => {
    updateConfig({ mode });
  };

  const setPrimaryColor = (color: string) => {
    updateConfig({ primaryColor: color });
  };

  const setSecondaryColor = (color: string) => {
    updateConfig({ secondaryColor: color });
  };

  const setAccentColor = (color: string) => {
    updateConfig({ accentColor: color });
  };

  const resetTheme = () => {
    setConfig(defaultConfig);
  };

  return {
    theme,
    config,
    updateConfig,
    setMode,
    setPrimaryColor,
    setSecondaryColor,
    setAccentColor,
    resetTheme,
  };
} 