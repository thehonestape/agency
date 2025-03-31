#!/usr/bin/env node

/**
 * This script scrapes Tailwind Plus UI Blocks pages using the provided credentials
 */

import { chromium } from 'playwright';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// URLs to scrape
const URLS = [
  'https://tailwindcss.com/plus/ui-blocks/marketing',
  'https://tailwindcss.com/plus/ui-blocks/application-ui',
  'https://tailwindcss.com/plus/ui-blocks/ecommerce',
];

// Tailwind Plus credentials
const EMAIL = 'abe@wrkhrs.co';
const PASSWORD = '6j8YTsgA3G3AR2Y';

// Function to create the output directory if it doesn't exist
async function ensureOutputDirExists() {
  const outputDir = path.join(__dirname, '..', 'src', 'data', 'tailwind-plus');
  try {
    await fs.mkdir(outputDir, { recursive: true });
    console.log(`Created output directory: ${outputDir}`);
  } catch (error) {
    console.error(`Error creating output directory: ${error.message}`);
  }
  return outputDir;
}

// Main scraping function
async function scrapeTailwindPlus() {
  const outputDir = await ensureOutputDirExists();
  const browser = await chromium.launch({ headless: false }); // Set to true for production
  const context = await browser.newContext();
  const page = await context.newPage();

  try {
    // Login to Tailwind Plus
    console.log('Logging in to Tailwind Plus...');
    await page.goto('https://tailwindcss.com/plus/sign-in');

    // Wait for the login form to be visible
    await page.waitForSelector('input[type="email"]');

    // Fill in the login form
    await page.fill('input[type="email"]', EMAIL);
    await page.fill('input[type="password"]', PASSWORD);

    // Submit the form
    await page.click('button[type="submit"]');

    // Wait for login to complete
    await page.waitForNavigation();
    console.log('Login successful');

    // Scrape each URL
    for (const url of URLS) {
      console.log(`Scraping ${url}...`);
      await page.goto(url);

      // Wait for content to load
      await page.waitForSelector('main', { timeout: 10000 });

      // Extract the category name from the URL
      const category = url.split('/').pop();

      // Get page content
      const pageContent = await page.content();

      // Scrape component links and additional data
      const componentData = await page.evaluate(() => {
        const components = [];
        const sections = document.querySelectorAll('h3');

        sections.forEach((section) => {
          const sectionName = section.textContent?.trim();
          const componentList = section.nextElementSibling;

          if (componentList && componentList.tagName === 'UL') {
            const items = componentList.querySelectorAll('li');
            items.forEach((item) => {
              const link = item.querySelector('a');
              if (link) {
                const componentName = link.textContent?.split(/\d/)[0]?.trim();
                const href = link.getAttribute('href');
                const countText = link.textContent?.match(/\d+\s+components?/)?.[0] || '';

                components.push({
                  section: sectionName,
                  name: componentName,
                  href,
                  count: countText,
                });
              }
            });
          }
        });

        return components;
      });

      // Save the data
      const outputPath = path.join(outputDir, `${category}.json`);
      await fs.writeFile(
        outputPath,
        JSON.stringify(
          {
            url,
            html: pageContent,
            components: componentData,
            scrapedAt: new Date().toISOString(),
          },
          null,
          2
        )
      );
      console.log(`Saved data to ${outputPath}`);
    }

    console.log('Scraping completed successfully');
  } catch (error) {
    console.error('Error during scraping:', error);
  } finally {
    await browser.close();
  }
}

// Run the scraper
scrapeTailwindPlus().catch(console.error);
