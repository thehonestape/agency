#!/usr/bin/env node

/**
 * This script scrapes Tailwind Plus Alerts components using the provided credentials
 */

import { chromium } from 'playwright';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// URL to scrape
const ALERTS_URL = 'https://tailwindcss.com/plus/ui-blocks/application-ui/feedback/alerts';

// Tailwind Plus credentials
const EMAIL = 'abe@wrkhrs.co';
const PASSWORD = '6j8YTsgA3G3AR2Y';

// Function to create the output directory if it doesn't exist
async function ensureOutputDirExists() {
  const outputDir = path.join(__dirname, '..', 'src', 'data', 'tailwind-plus', 'components');
  try {
    await fs.mkdir(outputDir, { recursive: true });
    console.log(`Created output directory: ${outputDir}`);
  } catch (error) {
    console.error(`Error creating output directory: ${error.message}`);
  }
  return outputDir;
}

// Main scraping function
async function scrapeAlertComponents() {
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
    await Promise.all([
      page.waitForNavigation(),
      page.click('button[type="submit"]')
    ]);
    
    console.log('Login successful!');
    
    // Navigate to the alerts page
    console.log(`Navigating to alerts page: ${ALERTS_URL}`);
    await page.goto(ALERTS_URL);
    
    // Wait for the page to load
    await page.waitForSelector('h1:has-text("Alerts")');
    
    // Find all "Get the code" buttons
    const codeButtons = await page.$$('a:has-text("Get the code")');
    console.log(`Found ${codeButtons.length} alert components`);
    
    const alertComponents = [];
    
    // Process each "Get the code" button to extract the React code
    for (let i = 0; i < codeButtons.length; i++) {
      const button = codeButtons[i];
      
      // Get the component name from the preceding h2 or h3 element
      const componentName = await page.evaluate(btn => {
        const section = btn.closest('section');
        const heading = section?.querySelector('h2') || section?.querySelector('h3');
        return heading?.textContent?.trim() || `Alert Component ${i + 1}`;
      }, button);
      
      console.log(`Extracting code for: ${componentName}`);
      
      try {
        // Click the "Get the code" button to open the code modal
        await button.click();
        
        // Wait for the code modal to appear - try different selectors
        console.log('Waiting for code modal...');
        
        // Take a screenshot of what we're seeing
        await page.screenshot({ path: `${outputDir}/alert-${i+1}-modal.png` });
        
        // Wait for any code block to appear
        await Promise.race([
          page.waitForSelector('[data-language="jsx"]', { timeout: 5000 }),
          page.waitForSelector('[data-language="react"]', { timeout: 5000 }),
          page.waitForSelector('.language-jsx', { timeout: 5000 }),
          page.waitForSelector('.language-tsx', { timeout: 5000 }),
          page.waitForSelector('pre code', { timeout: 5000 })
        ]).catch(e => console.log('Using fallback selector method'));
        
        console.log('Modal appeared, extracting code...');
        
        // Extract the React code
        const reactCode = await page.evaluate(() => {
          // Try different selectors
          const selectors = [
            '[data-language="jsx"]',
            '[data-language="react"]',
            '.language-jsx',
            '.language-tsx',
            'pre code'
          ];
          
          for (const selector of selectors) {
            const codeElement = document.querySelector(selector);
            if (codeElement) {
              return codeElement.textContent || '';
            }
          }
          
          // Fallback: get any text inside the modal
          const modal = document.querySelector('[role="dialog"]');
          return modal ? modal.textContent.trim() : 'No code found';
        });
        
        console.log(`Code extracted, length: ${reactCode.length} characters`);
        
        // Take a screenshot of the modal
        await page.screenshot({ path: `${outputDir}/alert-${i+1}-code.png` });
        
        // Close the modal - try different close buttons
        await Promise.any([
          page.click('button[aria-label="Close"]').catch(() => {}),
          page.click('button:has-text("Close")').catch(() => {}),
          page.click('[role="dialog"] button').catch(() => {}),
          page.press('Escape').catch(() => {})
        ]).catch(() => console.log('Could not close modal, continuing anyway'));
        
        // Add the component to our collection
        alertComponents.push({
          name: componentName,
          code: reactCode,
          extractedAt: new Date().toISOString()
        });
      } catch (error) {
        console.error(`Error extracting component ${i+1} (${componentName}):`, error.message);
        
        // Take a screenshot to debug
        await page.screenshot({ path: `${outputDir}/alert-${i+1}-error.png` });
        
        // Try to continue with the next component
        try {
          await page.press('Escape');
        } catch (e) {
          // Ignore any errors here
        }
      }
      
      // Wait a bit between requests to avoid rate limiting
      await page.waitForTimeout(2000);
    }
    
    // Save the extracted components
    const outputPath = path.join(outputDir, 'alerts.json');
    await fs.writeFile(
      outputPath,
      JSON.stringify({ alertComponents }, null, 2)
    );
    console.log(`Saved alert components to ${outputPath}`);
    
    console.log('Scraping completed successfully');
  } catch (error) {
    console.error('Error during scraping:', error);
  } finally {
    await browser.close();
  }
}

// Run the scraper
scrapeAlertComponents().catch(console.error); 