import React from 'react';
import { useTheme } from 'next-themes';

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <button
      type="button"
      className="flex h-6 w-6 items-center justify-center rounded-md transition hover:bg-zinc-900/5 dark:hover:bg-white/5"
      aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
    >
      <svg
        viewBox="0 0 20 20"
        fill="none"
        aria-hidden="true"
        className="h-5 w-5 stroke-zinc-500 dark:hidden"
      >
        <path
          d="M12.5 10a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Z"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M10 5.5v-1M13.182 6.818l.707-.707M14.5 10h1M13.182 13.182l.707.707M10 14.5v1M6.818 13.182l-.707.707M5.5 10h-1M6.818 6.818l-.707-.707"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <svg
        viewBox="0 0 20 20"
        fill="none"
        aria-hidden="true"
        className="hidden h-5 w-5 stroke-zinc-400 dark:block"
      >
        <path
          d="M10 16.5a6.5 6.5 0 1 0 0-13 6.5 6.5 0 0 0 0 13Z"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M10 3v1M10 16v1M3 10h1M16 10h1M5.05 5.05l.707.707M14.243 14.243l.707.707M14.243 5.05l-.707.707M5.05 14.243l.707.707"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
} 