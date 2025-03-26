/**
 * Semantic color tokens
 * These map the base colors to their semantic meaning in the UI.
 * Each semantic token includes both light and dark mode values.
 */

import { baseColors } from '../base/colors';

export interface SemanticColorToken {
  light: string;
  dark: string;
  description?: string;
}

export const semanticColors = {
  // Core interface colors
  background: {
    base: {
      light: baseColors.white,
      dark: baseColors.gray[950],
      description: 'Primary background color for the UI'
    },
    subtle: {
      light: baseColors.gray[50],
      dark: baseColors.gray[900],
      description: 'Subtle background for contrasting elements'
    },
    muted: {
      light: baseColors.gray[100],
      dark: baseColors.gray[800],
      description: 'Muted background for less emphasis'
    },
    emphasized: {
      light: baseColors.gray[200],
      dark: baseColors.gray[700],
      description: 'Emphasized background for higher contrast'
    },
  },
  
  // Foreground/text colors
  foreground: {
    base: {
      light: baseColors.gray[900],
      dark: baseColors.gray[50],
      description: 'Primary text color'
    },
    muted: {
      light: baseColors.gray[600],
      dark: baseColors.gray[400],
      description: 'Muted text color for less emphasis'
    },
    subtle: {
      light: baseColors.gray[500],
      dark: baseColors.gray[500],
      description: 'Subtle text color for tertiary content'
    },
    accent: {
      light: baseColors.blue[700],
      dark: baseColors.blue[400],
      description: 'Accent text color for highlighting important text'
    },
  },
  
  // Border colors
  border: {
    base: {
      light: baseColors.gray[200],
      dark: baseColors.gray[700],
      description: 'Primary border color'
    },
    subtle: {
      light: baseColors.gray[100],
      dark: baseColors.gray[800],
      description: 'Subtle border for less emphasis'
    },
    emphasized: {
      light: baseColors.gray[300],
      dark: baseColors.gray[600],
      description: 'Emphasized border for higher contrast'
    },
    focus: {
      light: baseColors.blue[500],
      dark: baseColors.blue[500],
      description: 'Focus ring color'
    },
  },
  
  // Interactive element colors
  interactive: {
    base: {
      light: baseColors.blue[600],
      dark: baseColors.blue[500],
      description: 'Base color for interactive elements'
    },
    hover: {
      light: baseColors.blue[700],
      dark: baseColors.blue[400],
      description: 'Hover state for interactive elements'
    },
    active: {
      light: baseColors.blue[800],
      dark: baseColors.blue[300],
      description: 'Active state for interactive elements'
    },
    muted: {
      light: baseColors.blue[50],
      dark: baseColors.blue[950],
      description: 'Background for interactive elements with less emphasis'
    },
    text: {
      light: baseColors.white,
      dark: baseColors.white,
      description: 'Text color on interactive elements'
    },
  },
  
  // Status colors
  status: {
    success: {
      light: baseColors.green[600],
      dark: baseColors.green[500],
      description: 'Success status color'
    },
    success_subtle: {
      light: baseColors.green[50],
      dark: baseColors.green[950],
      description: 'Subtle success background'
    },
    error: {
      light: baseColors.red[600],
      dark: baseColors.red[500],
      description: 'Error status color'
    },
    error_subtle: {
      light: baseColors.red[50],
      dark: baseColors.red[950],
      description: 'Subtle error background'
    },
    warning: {
      light: baseColors.amber[500],
      dark: baseColors.amber[400],
      description: 'Warning status color'
    },
    warning_subtle: {
      light: baseColors.amber[50],
      dark: baseColors.amber[950],
      description: 'Subtle warning background'
    },
    info: {
      light: baseColors.blue[500],
      dark: baseColors.blue[400],
      description: 'Info status color'
    },
    info_subtle: {
      light: baseColors.blue[50],
      dark: baseColors.blue[950],
      description: 'Subtle info background'
    },
  },
  
  // Component-specific semantic colors
  component: {
    // Button component colors
    button: {
      background: {
        primary: {
          light: baseColors.blue[600],
          dark: baseColors.blue[500],
          description: 'Primary button background'
        },
        secondary: {
          light: baseColors.gray[200],
          dark: baseColors.gray[700],
          description: 'Secondary button background'
        },
        destructive: {
          light: baseColors.red[600],
          dark: baseColors.red[500],
          description: 'Destructive button background'
        },
        ghost: {
          light: 'transparent',
          dark: 'transparent',
          description: 'Ghost button background'
        },
      },
      text: {
        primary: {
          light: baseColors.white,
          dark: baseColors.white,
          description: 'Primary button text'
        },
        secondary: {
          light: baseColors.gray[900],
          dark: baseColors.gray[100],
          description: 'Secondary button text'
        },
        destructive: {
          light: baseColors.white,
          dark: baseColors.white,
          description: 'Destructive button text'
        },
        ghost: {
          light: baseColors.blue[700],
          dark: baseColors.blue[400],
          description: 'Ghost button text'
        },
      },
    },
    
    // Card component colors
    card: {
      background: {
        light: baseColors.white,
        dark: baseColors.gray[900],
        description: 'Card background'
      },
      border: {
        light: baseColors.gray[200],
        dark: baseColors.gray[800],
        description: 'Card border'
      },
      shadow: {
        light: '0 1px 3px rgba(0, 0, 0, 0.1)',
        dark: '0 1px 3px rgba(0, 0, 0, 0.3)',
        description: 'Card shadow'
      },
    },
    
    // Input component colors
    input: {
      background: {
        light: baseColors.white,
        dark: baseColors.gray[900],
        description: 'Input background'
      },
      text: {
        light: baseColors.gray[900],
        dark: baseColors.gray[50],
        description: 'Input text color'
      },
      border: {
        base: {
          light: baseColors.gray[300],
          dark: baseColors.gray[700],
          description: 'Input border'
        },
        focus: {
          light: baseColors.blue[500],
          dark: baseColors.blue[500],
          description: 'Input focus border'
        },
        error: {
          light: baseColors.red[500],
          dark: baseColors.red[500],
          description: 'Input error border'
        },
      },
      placeholder: {
        light: baseColors.gray[500],
        dark: baseColors.gray[500],
        description: 'Input placeholder text'
      },
    },
  },
};

export default semanticColors; 