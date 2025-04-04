/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      // Typography system with relational approach
      typography: {
        DEFAULT: {
          css: {
            maxWidth: '65ch',
            color: 'var(--content-primary)',
            h1: {
              fontWeight: 600, // semibold for h1
            },
            h2: {
              fontWeight: 600, // semibold for h2
            },
            h3: {
              fontWeight: 500, // medium for h3
            },
            h4: {
              fontWeight: 500, // medium for h4
            },
            h5: {
              fontWeight: 500, // medium for h5
            },
            h6: {
              fontWeight: 500, // medium for h6
            },
          },
        },
      },
      // Font weights based on the balanced approach
      fontWeight: {
        regular: 400,
        medium: 500,
        semibold: 600,
        bold: 700,
      },
      // Text styles for semantic scale
      textStyles: {
        display: {
          fontSize: 'var(--font-size-display)',
          lineHeight: 'var(--line-height-display)',
          fontWeight: 'var(--font-weight-semibold)',
          letterSpacing: 'var(--letter-spacing-tight)',
        },
        title: {
          fontSize: 'var(--font-size-title)',
          lineHeight: 'var(--line-height-title)',
          fontWeight: 'var(--font-weight-semibold)',
          letterSpacing: 'var(--letter-spacing-tight)',
        },
        heading: {
          fontSize: 'var(--font-size-heading)',
          lineHeight: 'var(--line-height-heading)',
          fontWeight: 'var(--font-weight-medium)',
          letterSpacing: 'var(--letter-spacing-normal)',
        },
        subheading: {
          fontSize: 'var(--font-size-subheading)',
          lineHeight: 'var(--line-height-subheading)',
          fontWeight: 'var(--font-weight-medium)',
          letterSpacing: 'var(--letter-spacing-normal)',
        },
        subtitle: {
          fontSize: 'var(--font-size-subtitle)',
          lineHeight: 'var(--line-height-subtitle)',
          fontWeight: 'var(--font-weight-medium)',
          letterSpacing: 'var(--letter-spacing-normal)',
        },
        browline: {
          fontSize: 'var(--font-size-browline)',
          lineHeight: 'var(--line-height-browline)',
          fontWeight: 'var(--font-weight-medium)',
          letterSpacing: 'var(--letter-spacing-wide)',
          textTransform: 'uppercase',
        },
        label: {
          fontSize: 'var(--font-size-label)',
          lineHeight: 'var(--line-height-label)',
          fontWeight: 'var(--font-weight-medium)',
          letterSpacing: 'var(--letter-spacing-normal)',
        },
        body: {
          fontSize: 'var(--font-size-body)',
          lineHeight: 'var(--line-height-body)',
          fontWeight: 'var(--font-weight-regular)',
          letterSpacing: 'var(--letter-spacing-normal)',
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('tailwindcss-animate'),
    require('tailwindcss-fluid-type'),
    require('./src/styles/text-styles-plugin'),
  ],
}
