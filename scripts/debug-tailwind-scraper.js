#!/usr/bin/env node

/**
 * Debug script for Tailwind Plus UI scraper
 * This script will open a browser to a component page and leave it open for manual inspection
 */

import puppeteer from 'puppeteer';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// Get current file path in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables
dotenv.config({ path: path.join(__dirname, '..', '.env.scraper') });

// Configuration
const TAILWIND_EMAIL = process.env.TAILWIND_EMAIL;
const TAILWIND_PASSWORD = process.env.TAILWIND_PASSWORD;
const BASE_URL = 'https://tailwindcss.com/plus/ui-blocks';

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

    // Check if login successful
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

async function debug() {
  const browser = await puppeteer.launch({
    headless: false, // Always show the browser for debugging
    defaultViewport: null,
    args: ['--window-size=1280,800'],
  });

  try {
    const page = await browser.newPage();

    // Enable console logging from browser to Node.js
    page.on('console', (msg) => console.log('BROWSER:', msg.text()));

    // Login to Tailwind Plus
    await login(page);

    // Go to the marketing UI blocks page
    const marketingUrl = 'https://tailwindcss.com/plus/ui-blocks/marketing/sections/heroes';
    console.log(`Going to hero sections page: ${marketingUrl}`);
    await page.goto(marketingUrl, { waitUntil: 'networkidle0' });

    // Analyze the page structure
    console.log('Analyzing hero section page...');
    await page.evaluate(() => {
      console.log('Page title:', document.title);

      // Find all component previews
      const components = Array.from(document.querySelectorAll('[class*="group"]'));
      console.log('Component previews found:', components.length);

      // Look for code buttons
      const codeButtons = Array.from(document.querySelectorAll('button')).filter((btn) =>
        btn.textContent.toLowerCase().includes('code')
      );
      console.log('Code buttons found:', codeButtons.length);

      // Log the first component's structure in detail
      if (components.length > 0) {
        const firstComponent = components[0];
        console.log('\nFirst component structure:');
        console.log('HTML:', firstComponent.outerHTML);
        console.log('Classes:', firstComponent.className);
        console.log('Child elements:', firstComponent.children.length);
        Array.from(firstComponent.children).forEach((child, i) => {
          console.log(`Child ${i + 1}:`, child.tagName, child.className);
        });
      }
    });

    // Wait for components to load
    await page.waitForSelector('[class*="group"]');

    // Take a screenshot of the initial view
    await page.screenshot({ path: 'hero-section-debug.png' });

    // Try to interact with the first component's code button
    console.log('\nAttempting to access code for first component...');

    // First find all tab buttons
    const tabButtons = await page.$$('[role="tab"]');
    console.log(`Found ${tabButtons.length} tab buttons`);

    // Look for the Code tab
    for (const button of tabButtons) {
      const text = await button.evaluate((el) => el.textContent.toLowerCase());
      if (text.includes('code')) {
        console.log('Found Code tab, clicking...');
        await button.click();

        // Wait for the tab panel to appear and become visible
        await page.waitForSelector('[role="tabpanel"]');

        // Take screenshot after clicking Code tab
        await page.screenshot({ path: 'hero-code-tab-debug.png' });

        // Look for React tab
        const reactTab = await page.$('button:has-text("React")');
        if (reactTab) {
          console.log('Found React tab, clicking...');
          await reactTab.click();
          await page.waitForTimeout(500); // Wait for tab switch

          // Take screenshot of React code
          await page.screenshot({ path: 'hero-react-code-debug.png' });
        }

        // Analyze code containers
        await page.evaluate(() => {
          const codeElements = [
            ...document.querySelectorAll('[role="tabpanel"] pre'),
            ...document.querySelectorAll('[role="tabpanel"] [class*="prism"]'),
            ...document.querySelectorAll('[role="tabpanel"] [class*="code"]'),
          ];

          console.log('\nCode elements found in tab panel:', codeElements.length);
          codeElements.forEach((el, i) => {
            console.log(`\nCode element ${i + 1}:`);
            console.log('Tag:', el.tagName);
            console.log('Classes:', el.className);
            console.log('Parent role:', el.parentElement?.getAttribute('role'));
            console.log('Content preview:', el.textContent.substring(0, 200));
          });

          // If no code elements found in expected containers, try to find any visible code
          if (codeElements.length === 0) {
            console.log('\nTrying alternative code element search...');
            const visibleCode = Array.from(document.querySelectorAll('pre, code')).filter((el) => {
              const style = window.getComputedStyle(el);
              return style.display !== 'none' && style.visibility !== 'hidden';
            });
            console.log('Visible code elements found:', visibleCode.length);
            visibleCode.forEach((el, i) => {
              console.log(`\nVisible code ${i + 1}:`);
              console.log('Tag:', el.tagName);
              console.log('Classes:', el.className);
              console.log('Visibility:', window.getComputedStyle(el).visibility);
              console.log('Display:', window.getComputedStyle(el).display);
              console.log('Content preview:', el.textContent.substring(0, 200));
            });
          }
        });
        break;
      }
    }

    // Keep browser open for manual inspection
    console.log('\nBrowser will stay open for manual inspection.');
    console.log('Press Ctrl+C to close the browser.');
    await new Promise(() => {}); // Keep script running
  } catch (error) {
    console.error('Debug error:', error);
  }
}

// Run the debug function
debug().catch(console.error);
