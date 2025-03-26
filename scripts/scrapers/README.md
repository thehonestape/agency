# Tailwind UI Component Scraper

This directory contains scripts to automatically scrape and integrate Tailwind UI components into our component library.

## Prerequisites

1. A valid Tailwind Plus subscription (formerly Tailwind UI)
2. Node.js 14+ installed
3. Required npm packages: puppeteer, dotenv, prettier

## Setup

1. Create a `.env.scraper` file in the `agency/` directory with your Tailwind Plus credentials:

```
TAILWIND_EMAIL=your-email@example.com
TAILWIND_PASSWORD=your-password

# Scraper configuration
SCRAPER_HEADLESS=false
COMPONENT_LIMIT=3
```

2. Install the required npm packages (if not already installed):

```bash
cd agency
npm install
```

## Usage

### 1. Run the Full Synchronization Process

This will prepare the directory structure, run the scraper, and update the component audit in one go:

```bash
npm run sync-tailwind-components
```

### 2. Run Individual Steps

If you prefer to run each step individually:

```bash
# Prepare the directory structure
npm run prepare-component-dirs

# Run the scraper (requires Tailwind Plus credentials)
npm run scrape-tailwind

# Update the component audit document
npm run update-component-audit
```

## Included Categories

The scraper is configured to capture components from the following Tailwind Plus sections:

1. **Application UI** - Form layouts, tables, modal dialogs, etc.
2. **Ecommerce** - Product overviews, shopping carts, checkout forms, etc.
3. **Marketing** - Heroes, features, pricing, testimonials, etc.

## Customization

The scraper is configured to capture components from the Application UI section by default. To include other sections:

1. Edit `tailwind-scraper.js` and add additional categories to the `COMPONENT_CATEGORIES` array:

```javascript
const COMPONENT_CATEGORIES = [
  {
    id: 'application-ui',
    url: `${BASE_URL}/application-ui`,
    outputDir: 'agency/src/components'
  },
  {
    id: 'marketing',
    url: `${BASE_URL}/marketing`,
    outputDir: 'agency/src/components'
  },
  // Add more categories as needed
];
```

2. Update the `prepare-component-dirs.js` script to include the directory structure for new categories.

## Output

The scraper will:

1. Create or update component directories in `agency/src/components/`
2. Save component files as TypeScript React files (.tsx)
3. Create index.ts files for each component category and section
4. Update the component registry at `agency/src/data/components/tailwind-components.json`
5. Update the audit document at `agency/THEMING-COMPONENT-AUDIT.md`

## Themes and Adaptation

The scraper automatically adapts components to use our theming system by:

1. Replacing hardcoded Tailwind colors with our CSS variables
2. Removing direct dark mode variants (we use CSS variables for theming)
3. Converting class names to className attributes

You may need to further refine the components manually for full theme compliance.

## Important Notes

- The first run may take some time as it creates directories and downloads components
- By default, the scraper will only download 3 components per section to avoid rate limiting
- To scrape all components, set `COMPONENT_LIMIT=-1` in your `.env.scraper` file
- The browser window will open during scraping unless `SCRAPER_HEADLESS=true` is set 