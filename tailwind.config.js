/** @type {import('tailwindcss').Config} */
import { baseColors, semanticColors, blueTheme, tealTheme, purpleTheme, indigoTheme, roseTheme } from './src/tokens/index';

// Default to blue theme since we can't rely on process.env in the browser
const activeTheme = 'blue';

// Map theme names to theme objects
const themeMap = {
  blue: blueTheme,
  teal: tealTheme,
  purple: purpleTheme,
  indigo: indigoTheme,
  rose: roseTheme,
};

// Get the theme colors for the active theme
const themeColors = themeMap[activeTheme] || blueTheme;

export default {
  darkMode: "class",
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Direct base colors - always available regardless of theme
        gray: baseColors.gray,
        blue: baseColors.blue,
        green: baseColors.green,
        red: baseColors.red,
        amber: baseColors.amber,
        purple: baseColors.purple,
        teal: baseColors.teal,
        indigo: baseColors.indigo,
        rose: baseColors.rose,
        
        // Surface colors - backgrounds for different UI layers
        background: {
          DEFAULT: themeColors.surface.background,
          subtle: themeColors.surface.subtle,
          muted: themeColors.surface.muted,
          hover: themeColors.surface.hover,
          active: themeColors.surface.active,
          disabled: themeColors.surface.disabled,
        },
        
        // Content colors - text and icon colors
        foreground: {
          DEFAULT: themeColors.content.primary,
          secondary: themeColors.content.secondary,
          muted: themeColors.content.muted,
          placeholder: themeColors.content.placeholder,
          disabled: themeColors.content.disabled,
          inverted: themeColors.content.inverted,
          brand: themeColors.content.brand,
        },
        
        // Border colors
        border: {
          DEFAULT: themeColors.border.default,
          subtle: themeColors.border.subtle,
          strong: themeColors.border.strong,
          focus: themeColors.border.focus,
          hover: themeColors.border.hover,
          disabled: themeColors.border.disabled,
        },
        input: themeColors.border.default,
        ring: themeColors.border.focus,
        
        // Interactive colors - buttons, links, and other interactive elements
        interactive: {
          DEFAULT: themeColors.interactive.default,
          hover: themeColors.interactive.hover,
          active: themeColors.interactive.active,
          subtle: themeColors.interactive.subtle,
          text: themeColors.interactive.onInteractive,
          secondary: themeColors.interactive.secondary,
          secondaryHover: themeColors.interactive.secondaryHover,
          secondaryActive: themeColors.interactive.secondaryActive,
          secondaryText: themeColors.interactive.onSecondary,
        },
        
        // Primary brand colors
        primary: {
          DEFAULT: themeColors.interactive.default,
          foreground: themeColors.interactive.onInteractive,
          50: baseColors.blue[50],
          100: baseColors.blue[100],
          200: baseColors.blue[200],
          300: baseColors.blue[300],
          400: baseColors.blue[400],
          500: baseColors.blue[500],
          600: baseColors.blue[600],
          700: baseColors.blue[700],
          800: baseColors.blue[800],
          900: baseColors.blue[900],
          950: baseColors.blue[950],
        },
        
        // Secondary colors
        secondary: {
          DEFAULT: themeColors.interactive.secondary,
          foreground: themeColors.interactive.onSecondary,
          50: baseColors.gray[50],
          100: baseColors.gray[100],
          200: baseColors.gray[200],
          300: baseColors.gray[300],
          400: baseColors.gray[400],
          500: baseColors.gray[500],
          600: baseColors.gray[600],
          700: baseColors.gray[700],
          800: baseColors.gray[800],
          900: baseColors.gray[900],
          950: baseColors.gray[950],
        },
        
        // Status colors - feedback and status indicators
        destructive: {
          DEFAULT: themeColors.status.error,
          foreground: themeColors.status.errorContent,
          subtle: themeColors.status.errorSubtle,
          border: themeColors.status.errorBorder,
          50: baseColors.red[50],
          100: baseColors.red[100],
          200: baseColors.red[200],
          300: baseColors.red[300],
          400: baseColors.red[400],
          500: baseColors.red[500],
          600: baseColors.red[600],
          700: baseColors.red[700],
          800: baseColors.red[800],
          900: baseColors.red[900],
          950: baseColors.red[950],
        },
        success: {
          DEFAULT: themeColors.status.success,
          foreground: themeColors.status.successContent,
          subtle: themeColors.status.successSubtle,
          border: themeColors.status.successBorder,
          50: baseColors.green[50],
          100: baseColors.green[100],
          200: baseColors.green[200],
          300: baseColors.green[300],
          400: baseColors.green[400],
          500: baseColors.green[500],
          600: baseColors.green[600],
          700: baseColors.green[700],
          800: baseColors.green[800],
          900: baseColors.green[900],
          950: baseColors.green[950],
        },
        warning: {
          DEFAULT: themeColors.status.warning,
          foreground: themeColors.status.warningContent,
          subtle: themeColors.status.warningSubtle,
          border: themeColors.status.warningBorder,
          50: baseColors.amber[50],
          100: baseColors.amber[100],
          200: baseColors.amber[200],
          300: baseColors.amber[300],
          400: baseColors.amber[400],
          500: baseColors.amber[500],
          600: baseColors.amber[600],
          700: baseColors.amber[700],
          800: baseColors.amber[800],
          900: baseColors.amber[900],
          950: baseColors.amber[950],
        },
        info: {
          DEFAULT: themeColors.status.info,
          foreground: themeColors.status.infoContent,
          subtle: themeColors.status.infoSubtle,
          border: themeColors.status.infoBorder,
          50: baseColors.blue[50],
          100: baseColors.blue[100],
          200: baseColors.blue[200],
          300: baseColors.blue[300],
          400: baseColors.blue[400],
          500: baseColors.blue[500],
          600: baseColors.blue[600],
          700: baseColors.blue[700],
          800: baseColors.blue[800],
          900: baseColors.blue[900],
          950: baseColors.blue[950],
        },
        
        // Component-specific colors
        card: {
          DEFAULT: themeColors.components.card.bg,
          foreground: themeColors.components.card.text,
          hover: themeColors.components.card.hoverBg,
          border: themeColors.components.card.border,
        },
        
        // Alert component colors
        alert: {
          info: {
            DEFAULT: themeColors.components.alert.infoBg,
            foreground: themeColors.components.alert.infoText,
            border: themeColors.components.alert.infoBorder,
          },
          success: {
            DEFAULT: themeColors.components.alert.successBg,
            foreground: themeColors.components.alert.successText,
            border: themeColors.components.alert.successBorder,
          },
          warning: {
            DEFAULT: themeColors.components.alert.warningBg,
            foreground: themeColors.components.alert.warningText,
            border: themeColors.components.alert.warningBorder,
          },
          error: {
            DEFAULT: themeColors.components.alert.errorBg,
            foreground: themeColors.components.alert.errorText,
            border: themeColors.components.alert.errorBorder,
          },
        },
        
        // Form component colors
        form: {
          input: {
            DEFAULT: themeColors.components.form.inputBg,
            text: themeColors.components.form.inputText,
            border: themeColors.components.form.inputBorder,
            placeholder: themeColors.components.form.inputPlaceholder,
            focus: themeColors.components.form.inputFocusRing,
            disabled: {
              bg: themeColors.components.form.inputDisabledBg,
              text: themeColors.components.form.inputDisabledText,
            },
            error: {
              border: themeColors.components.form.inputErrorBorder,
              ring: themeColors.components.form.inputErrorRing,
            },
            success: {
              border: themeColors.components.form.inputSuccessBorder,
              ring: themeColors.components.form.inputSuccessRing,
            },
          },
        },
        
        // Muted colors (for backward compatibility)
        muted: {
          DEFAULT: themeColors.surface.muted,
          foreground: themeColors.content.muted,
        },
      },
      
      // Spacing system
      spacing: {
        ...baseSpacing,
        // Semantic spacing
        'component-xs': 'var(--component-spacing-xs)',
        'component-sm': 'var(--component-spacing-sm)',
        'component-md': 'var(--component-spacing-md)',
        'component-lg': 'var(--component-spacing-lg)',
        'component-xl': 'var(--component-spacing-xl)',
        
        'content-xs': 'var(--content-spacing-xs)',
        'content-sm': 'var(--content-spacing-sm)',
        'content-md': 'var(--content-spacing-md)',
        'content-lg': 'var(--content-spacing-lg)',
        'content-xl': 'var(--content-spacing-xl)',
        
        'layout-xs': 'var(--layout-spacing-xs)',
        'layout-sm': 'var(--layout-spacing-sm)',
        'layout-md': 'var(--layout-spacing-md)',
        'layout-lg': 'var(--layout-spacing-lg)',
        'layout-xl': 'var(--layout-spacing-xl)',
      },
      
      // Size system
      size: {
        ...baseSizing,
        // Semantic sizing
        'icon-xs': 'var(--icon-size-xs)',
        'icon-sm': 'var(--icon-size-sm)',
        'icon-md': 'var(--icon-size-md)',
        'icon-lg': 'var(--icon-size-lg)',
        'icon-xl': 'var(--icon-size-xl)',
        
        'component-xs': 'var(--component-size-xs)',
        'component-sm': 'var(--component-size-sm)',
        'component-md': 'var(--component-size-md)',
        'component-lg': 'var(--component-size-lg)',
        'component-xl': 'var(--component-size-xl)',
      },
      
      // Border radius
      borderRadius: {
        'none': '0',
        'sm': 'var(--radius-sm)',
        'md': 'var(--radius-md)',
        DEFAULT: 'var(--radius)',
        'lg': 'var(--radius-lg)',
        'xl': 'var(--radius-xl)',
        '2xl': 'var(--radius-2xl)',
        'full': '9999px',
      },
      
      // Animation durations
      transitionDuration: {
        'fastest': 'var(--speed-fastest)',
        'fast': 'var(--speed-fast)',
        DEFAULT: 'var(--speed-normal)',
        'slow': 'var(--speed-slow)',
        'slowest': 'var(--speed-slowest)',
      },
    },
  },
  plugins: [],
}