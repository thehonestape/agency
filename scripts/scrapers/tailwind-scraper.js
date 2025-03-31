#!/usr/bin/env node

/**
 * Tailwind Plus UI Components Scraper
 * This script scrapes the Tailwind Plus UI website to extract component information
 * and organize it in our component library.
 *
 * Usage:
 * 1. Set your Tailwind Plus credentials in .env
 * 2. Run: node agency/scripts/scrapers/tailwind-scraper.js
 */

import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import prettier from 'prettier';

// Get current file path in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables
dotenv.config({ path: path.join(__dirname, '../../.env.scraper') });

// Configuration
const TAILWIND_EMAIL = process.env.TAILWIND_EMAIL;
const TAILWIND_PASSWORD = process.env.TAILWIND_PASSWORD;
const BASE_URL = 'https://tailwindcss.com/plus/ui-blocks';
const COMPONENT_CATEGORIES = [
  {
    id: 'application-ui',
    url: `${BASE_URL}/application-ui`,
    outputDir: path.join(__dirname, '../../src/components'),
  },
  {
    id: 'ecommerce',
    url: `${BASE_URL}/ecommerce`,
    outputDir: path.join(__dirname, '../../src/components'),
  },
  {
    id: 'marketing',
    url: `${BASE_URL}/marketing`,
    outputDir: path.join(__dirname, '../../src/components'),
  },
  // You can add more categories as needed
];

// Track component counts for verification
const componentCounts = {
  total: 0,
  byCategory: {},
  bySection: {},
};

// Helper for creating directories
const createDirIfNotExists = (dirPath) => {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
    console.log(`Created directory: ${dirPath}`);
  }
};

// Convert component name to file name (PascalCase)
const toComponentFileName = (name) => {
  return name
    .split(' ')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join('')
    .replace(/[^a-zA-Z0-9]/g, '');
};

// Convert to directory name (kebab-case)
const toDirName = (name) => {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
};

// Theme adaptation - convert hardcoded colors to theme variables
const adaptToTheming = (code) => {
  // This includes additional replacements for Tailwind v4 compatibility
  const replacements = [
    // Background colors
    { from: /bg-white/g, to: 'bg-background' },
    { from: /bg-gray-50/g, to: 'bg-muted' },
    { from: /bg-gray-100/g, to: 'bg-muted' },
    { from: /bg-gray-900/g, to: 'bg-primary' },
    { from: /bg-indigo-600/g, to: 'bg-primary' },
    { from: /bg-indigo-500/g, to: 'bg-primary' },
    { from: /bg-blue-600/g, to: 'bg-primary' },

    // Text colors
    { from: /text-gray-500/g, to: 'text-muted-foreground' },
    { from: /text-gray-600/g, to: 'text-muted-foreground' },
    { from: /text-gray-700/g, to: 'text-foreground' },
    { from: /text-gray-900/g, to: 'text-foreground' },
    { from: /text-white/g, to: 'text-primary-foreground' },
    { from: /text-indigo-600/g, to: 'text-primary' },
    { from: /text-blue-600/g, to: 'text-primary' },

    // Border colors
    { from: /border-gray-200/g, to: 'border-border' },
    { from: /border-gray-300/g, to: 'border-input' },
    { from: /border-indigo-600/g, to: 'border-primary' },
    { from: /border-indigo-500/g, to: 'border-primary' },

    // Hover states with new shorthand syntax in v4
    { from: /hover:bg-indigo-700/g, to: 'hover:bg-primary/90' },
    { from: /hover:bg-indigo-600/g, to: 'hover:bg-primary/90' },
    { from: /hover:bg-gray-100/g, to: 'hover:bg-muted/80' },
    { from: /hover:bg-gray-50/g, to: 'hover:bg-muted/60' },

    // Focus states
    { from: /focus:ring-indigo-500/g, to: 'focus:ring-primary' },
    { from: /focus:border-indigo-500/g, to: 'focus:border-primary' },

    // Tailwind v4 specific patterns
    { from: /text-\[#\w+\]/g, to: 'text-foreground' }, // Arbitrary color values
    { from: /bg-\[#\w+\]/g, to: 'bg-background' }, // Arbitrary color values

    // Remove dark mode variants (we use CSS variables)
    { from: /dark:[a-zA-Z0-9-\/\[\]#]+/g, to: '' },
  ];

  let themedCode = code;
  replacements.forEach(({ from, to }) => {
    themedCode = themedCode.replace(from, to);
  });

  // Additional v4-specific processing
  // Handle arbitrary properties with new syntax
  themedCode = themedCode.replace(/\[([^[\]]+)\]/g, (match, content) => {
    // Keep non-color arbitrary values unchanged
    if (!content.startsWith('#') && !content.includes('rgb')) {
      return match;
    }
    // Use theme variables for colors
    return 'primary';
  });

  return themedCode;
};

// Create React component from HTML snippet
const createReactComponent = (name, htmlCode) => {
  // Convert the HTML to JSX (simplified version)
  let jsxCode = htmlCode.replace(/class=/g, 'className=').replace(/for=/g, 'htmlFor=');

  // Apply theming
  jsxCode = adaptToTheming(jsxCode);

  // Create a full React component
  return `import React from 'react';

export const ${toComponentFileName(name)} = () => {
  return (
    ${jsxCode}
  );
};

export default ${toComponentFileName(name)};
`;
};

// Create index file for a directory
const createIndexFile = (dirPath, components) => {
  const imports = components
    .map((name) => `export * from './${toComponentFileName(name)}';`)
    .join('\n');

  fs.writeFileSync(path.join(dirPath, 'index.ts'), imports);
  console.log(`Created index file in ${dirPath}`);
};

// Generate component JSON data
const generateComponentData = (category, sections) => {
  return {
    id: category.id,
    name: category.id
      .split('-')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' '),
    sections: sections.map((section) => ({
      name: section.name,
      components: section.components.map((comp) => ({
        name: comp.name,
        url: comp.url,
        count: comp.count || 0,
        type: comp.type || 'component',
      })),
    })),
  };
};

// Main scraper function
async function scrape() {
  const browser = await puppeteer.launch({
    headless: process.env.SCRAPER_HEADLESS !== 'false',
    defaultViewport: null,
    args: ['--window-size=1280,800'],
  });

  try {
    const page = await browser.newPage();

    // Enable console logging from browser to Node.js
    page.on('console', (msg) => console.log('BROWSER:', msg.text()));

    // Login first
    await login(page);

    console.log('\nStarting to scrape marketing components...');
    const results = await scrapeAllSections(page);

    // Save results
    const componentsDir = path.join(__dirname, '../../src/data/components');
    if (!fs.existsSync(componentsDir)) {
      fs.mkdirSync(componentsDir, { recursive: true });
    }

    // Save each section's components
    for (const [section, components] of Object.entries(results)) {
      const sectionDir = path.join(componentsDir, section);
      if (!fs.existsSync(sectionDir)) {
        fs.mkdirSync(sectionDir, { recursive: true });
      }

      // Save individual components
      components.forEach((code, index) => {
        const fileName = `${section}-${index + 1}.tsx`;
        const filePath = path.join(sectionDir, fileName);
        fs.writeFileSync(filePath, code);
        console.log(`Saved component: ${fileName}`);
      });

      // Create index.ts for the section
      const indexContent = components
        .map((_, index) => {
          const componentName = `${toPascalCase(section)}${index + 1}`;
          return `export { default as ${componentName} } from './${section}-${index + 1}';`;
        })
        .join('\n');

      fs.writeFileSync(path.join(sectionDir, 'index.ts'), indexContent);
      console.log(`Created index for section: ${section}`);
    }

    console.log('\nScraping completed successfully!');
  } catch (error) {
    console.error('Scraping error:', error);
  } finally {
    await browser.close();
  }
}

// Helper function to convert to PascalCase
function toPascalCase(str) {
  return str
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join('');
}

// Login to Tailwind Plus
async function login(page) {
  try {
    console.log('Logging in to Tailwind Plus...');
    await page.goto('https://tailwindcss.com/plus/login');

    // Wait for the login form
    await page.waitForSelector('input[type="email"]');

    // Fill credentials
    await page.type('input[type="email"]', TAILWIND_EMAIL);
    await page.type('input[type="password"]', TAILWIND_PASSWORD);

    // Submit form
    await Promise.all([
      page.click('button[type="submit"]'),
      page.waitForNavigation({ waitUntil: 'networkidle0' }),
    ]);

    // Check if login successful - modify the URL check to be more flexible
    const url = page.url();
    if (url.includes('tailwindcss.com/plus') && !url.includes('login')) {
      console.log('Successfully logged in!');
    } else {
      throw new Error('Login failed. Check your credentials.');
    }
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
}

// Scrape a category page to get sections and components
async function scrapeCategory(page, category) {
  await page.goto(category.url, { waitUntil: 'networkidle0' });
  console.log(`Scraping category page: ${category.url}`);

  // Extract sections and components
  const sections = await page.evaluate(() => {
    const sectionElements = Array.from(document.querySelectorAll('h3 + ul'));

    return sectionElements.map((sectionEl) => {
      // Get section name from previous h3
      const sectionNameEl = sectionEl.previousElementSibling;
      const sectionName = sectionNameEl ? sectionNameEl.textContent.trim() : 'Unknown Section';

      // Get components in this section
      const components = Array.from(sectionEl.querySelectorAll('li')).map((li) => {
        const link = li.querySelector('a');
        const countText = li.textContent.match(/(\d+) components?/);

        return {
          name: link ? link.textContent.trim().split(/\s+\d+/)[0] : 'Unknown Component',
          url: link ? link.href : '',
          count: countText ? parseInt(countText[1]) : 0,
          type: 'component',
        };
      });

      return { name: sectionName, components };
    });
  });

  console.log(`Found ${sections.length} sections in ${category.id}`);

  // Process each section
  for (const section of sections) {
    console.log(`\nProcessing section: ${section.name}`);
    componentCounts.bySection[`${category.id}-${section.name}`] = section.components.length;

    const sectionDirName = toDirName(section.name);
    const sectionDir = path.join(
      category.outputDir,
      category.id.replace(/-/g, '-'), // Ensure consistent directory structure
      sectionDirName
    );
    createDirIfNotExists(sectionDir);

    // Get component limit from env var or default to 3
    const COMPONENT_LIMIT = process.env.COMPONENT_LIMIT ? parseInt(process.env.COMPONENT_LIMIT) : 3;

    // Process each component (limit based on env var, -1 means all)
    const componentsToProcess =
      COMPONENT_LIMIT === -1 ? section.components : section.components.slice(0, COMPONENT_LIMIT);

    for (const component of componentsToProcess) {
      await scrapeComponent(page, component, sectionDir);
    }

    // Create index file for the section
    createIndexFile(
      sectionDir,
      section.components.map((c) => c.name)
    );
  }

  return sections;
}

// Scrape a specific component
async function scrapeComponent(page, component, outputDir) {
  try {
    console.log(`  Scraping component: ${component.name}`);
    await page.goto(component.url, { waitUntil: 'networkidle0' });

    // Wait for page to load
    await page.waitForSelector('button, [role="tab"]', { timeout: 10000 });

    // Find the Code tab within this component
    const codeTab = await component.$('[role="tab"]');
    if (!codeTab) {
      console.log('No code tab found for component');
      return null;
    }

    // Click the Code tab
    await codeTab.click();
    await page.waitForTimeout(500); // Wait for tab panel to appear

    // Look for and click the React tab if it exists
    const reactTab = await component.$('button:has-text("React")');
    if (reactTab) {
      await reactTab.click();
      await page.waitForTimeout(500); // Wait for tab switch
    }

    // Extract the code from the tab panel
    const code = await component.evaluate((el) => {
      // Try multiple selectors to find the code
      const codeElements = [
        ...el.querySelectorAll('[role="tabpanel"] pre'),
        ...el.querySelectorAll('[role="tabpanel"] [class*="prism"]'),
        ...el.querySelectorAll('[role="tabpanel"] [class*="code"]'),
      ];

      // If no code found in primary selectors, try visible code elements
      if (codeElements.length === 0) {
        const visibleCode = Array.from(el.querySelectorAll('pre, code')).filter((el) => {
          const style = window.getComputedStyle(el);
          return style.display !== 'none' && style.visibility !== 'hidden';
        });
        if (visibleCode.length > 0) {
          return visibleCode[0].textContent;
        }
      } else {
        return codeElements[0].textContent;
      }
      return null;
    });

    if (!code) {
      console.log('No React code found for this component');
      return null;
    }

    // Create and save the component file
    const componentName = toComponentFileName(component.name);
    const componentCode = createReactComponent(component.name, code);

    // Format the code with prettier
    const formattedCode = await prettier.format(componentCode, {
      parser: 'typescript',
      singleQuote: true,
      trailingComma: 'es5',
      tabWidth: 2,
    });

    // Save the component file
    fs.writeFileSync(path.join(outputDir, `${componentName}.tsx`), formattedCode);

    console.log(`  Component saved: ${componentName}.tsx`);

    return code;
  } catch (error) {
    console.error(`  Error scraping component ${component.name}:`, error);
    return null;
  }
}

// Update the main component registry
function updateComponentRegistry(newComponentData) {
  const registryPath = path.join(
    __dirname,
    '../../src/data/components',
    'tailwind-components.json'
  );
  let registry = { categories: [] };

  // Load existing registry if it exists
  if (fs.existsSync(registryPath)) {
    registry = JSON.parse(fs.readFileSync(registryPath, 'utf8'));
  }

  // Check if category already exists
  const categoryIndex = registry.categories.findIndex((cat) => cat.id === newComponentData.id);

  if (categoryIndex >= 0) {
    // Replace existing category
    registry.categories[categoryIndex] = newComponentData;
  } else {
    // Add new category
    registry.categories.push(newComponentData);
  }

  // Save updated registry
  fs.writeFileSync(registryPath, JSON.stringify(registry, null, 2));
  console.log(`Updated component registry at ${registryPath}`);
}

async function scrapeAllSections(page) {
  // Navigate to the marketing page
  await page.goto('https://tailwindcss.com/plus/ui-blocks/marketing', {
    waitUntil: 'networkidle0',
    timeout: 30000,
  });

  // Debug: Log page title and content
  const title = await page.title();
  console.log('Page title:', title);

  // Wait for the page to be fully interactive
  await page.waitForTimeout(5000);

  // Extract section links from the sidebar
  const sectionLinks = await page.evaluate(() => {
    const sections = [];

    // Find all section headings (h3) in the sidebar
    const headings = document.querySelectorAll('h3');
    headings.forEach((heading) => {
      // Get the section name
      const sectionName = heading.textContent.trim();

      // Get all links under this section
      const links = Array.from(heading.nextElementSibling.querySelectorAll('a')).map((a) => ({
        href: a.href,
        text: a.textContent.trim(),
        section: sectionName,
      }));

      sections.push(...links);
    });

    return sections;
  });

  console.log(`Found ${sectionLinks.length} sections in sidebar`);

  const results = {};

  for (const link of sectionLinks) {
    try {
      // Get section name and URL
      const href = link.href;
      const sectionName = link.text
        .split(/\s+\d+/)[0]
        .toLowerCase()
        .replace(/\s+/g, '-');
      const sectionUrl = href;

      console.log(`\nProcessing section: ${sectionName} (${link.section})`);

      // Navigate to section
      await page.goto(sectionUrl, {
        waitUntil: 'networkidle0',
        timeout: 30000,
      });

      // Take debug screenshot
      await page.screenshot({
        path: `src/components/marketing/${sectionName}_debug.png`,
        fullPage: true,
      });

      // Debug: Log the page structure
      const pageStructure = await page.evaluate(() => {
        return {
          title: document.title,
          headings: Array.from(document.querySelectorAll('h1, h2, h3')).map((h) => ({
            tag: h.tagName,
            text: h.textContent.trim(),
          })),
          mainContent: document.querySelector('main')?.innerHTML || 'No main content found',
          components: Array.from(document.querySelectorAll('.component-preview')).map((c) => ({
            id: c.id,
            class: c.className,
          })),
        };
      });

      console.log('Page structure:', JSON.stringify(pageStructure, null, 2));

      // Wait for components to load - try multiple selectors
      const componentSelectors = ['.component-preview', '[role="group"]', '.preview', '.example'];

      let components = [];
      for (const selector of componentSelectors) {
        try {
          await page.waitForSelector(selector, { visible: true, timeout: 5000 });
          components = await page.$$(selector);
          if (components.length > 0) {
            console.log(`Found ${components.length} components using selector: ${selector}`);
            break;
          }
        } catch (e) {
          console.log(`Selector ${selector} not found`);
        }
      }

      if (components.length === 0) {
        console.log('No components found with any selector');
        continue;
      }

      const sectionComponents = [];

      for (let i = 0; i < components.length; i++) {
        try {
          console.log(`Processing component ${i + 1}/${components.length}`);

          // Wait for component to be visible and clickable
          await page.waitForTimeout(1000); // Give time for animations

          // Try to click the component
          try {
            await components[i].click({ timeout: 5000 });
          } catch (clickError) {
            console.log('Could not click component directly, trying alternative method');
            // Try clicking by evaluating click event
            await page.evaluate((index) => {
              const elements = document.querySelectorAll(
                '.component-preview, [role="group"], .preview, .example'
              );
              if (elements[index]) {
                elements[index].dispatchEvent(
                  new MouseEvent('click', {
                    bubbles: true,
                    cancelable: true,
                    view: window,
                  })
                );
              }
            }, i);
          }

          // Wait for code button to appear
          await page.waitForTimeout(2000);

          // Find and click the Code button
          const codeButton = await page.waitForSelector('button:has-text("Code")', {
            visible: true,
            timeout: 5000,
          });

          if (codeButton) {
            await codeButton.click();

            // Wait for React tab to appear
            await page.waitForTimeout(1000);

            // Find and click the React tab
            const reactTab = await page.waitForSelector('button:has-text("React")', {
              visible: true,
              timeout: 5000,
            });

            if (reactTab) {
              await reactTab.click();

              // Wait for code to load
              await page.waitForTimeout(1000);

              // Try multiple selectors to find the code
              const codeSelectors = [
                'pre[class*="language-"]',
                'code[class*="language-"]',
                '.prism-code',
                '.code-content',
              ];

              let code = null;
              for (const selector of codeSelectors) {
                const element = await page.$(selector);
                if (element) {
                  code = await element.evaluate((el) => el.textContent);
                  if (code && code.includes('export') && code.includes('React')) {
                    break;
                  }
                }
              }

              if (code) {
                // Save the code
                const fileName = `${sectionName}-${i + 1}.tsx`;
                await fs.writeFile(`src/components/marketing/${fileName}`, code, 'utf8');
                console.log(`Saved component code to ${fileName}`);
                sectionComponents.push(code);
              } else {
                console.log('No React code found for this component');
              }
            }
          }

          // Try to close the modal/panel
          try {
            const closeButton = await page.waitForSelector('button[aria-label="Close"]', {
              visible: true,
              timeout: 5000,
            });
            if (closeButton) {
              await closeButton.click();
            }
          } catch (closeError) {
            console.log('Could not find close button');
          }

          // Wait before next component
          await page.waitForTimeout(1000);
        } catch (componentError) {
          console.error(`Error processing component ${i + 1}:`, componentError);
          // Try to recover by refreshing the page
          await page.reload({ waitUntil: 'networkidle0' });
          await page.waitForTimeout(2000);
        }
      }

      results[sectionName] = sectionComponents;
      console.log(`Completed section: ${sectionName} (${sectionComponents.length} components)`);
    } catch (sectionError) {
      console.error(`Scraping error:`, sectionError);
      // Try to recover by refreshing the page
      await page.reload({ waitUntil: 'networkidle0' });
      await page.waitForTimeout(2000);
    }
  }

  return results;
}

// Run the scraper
scrape().catch(console.error);
