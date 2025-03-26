#!/usr/bin/env node

/**
 * Tailwind UI Component Synchronization
 * 
 * This script orchestrates the entire process of:
 * 1. Preparing directory structure
 * 2. Scraping Tailwind UI components
 * 3. Updating component audit document
 */

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get current file path in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration
const SCRIPTS_DIR = __dirname;
const ENV_FILE = path.join(__dirname, '..', '.env.scraper');

// Check if the .env.scraper file exists
if (!fs.existsSync(ENV_FILE)) {
  console.error(`ERROR: ${ENV_FILE} not found.`);
  console.error('Please create this file with your Tailwind Plus credentials.');
  process.exit(1);
}

// Run a script and handle errors
const runScript = (scriptName, args = []) => {
  console.log(`\n--- Running ${scriptName} ---\n`);
  
  try {
    // Fix the path handling for paths with spaces
    const scriptPath = path.join(SCRIPTS_DIR, scriptName);
    execSync(`node "${scriptPath}" ${args.join(' ')}`, {
      stdio: 'inherit',
    });
    console.log(`\n--- ${scriptName} completed successfully ---\n`);
    return true;
  } catch (error) {
    console.error(`\n--- ERROR running ${scriptName} ---\n`);
    console.error(error.message);
    return false;
  }
};

// Main function to orchestrate the process
const syncTailwindComponents = async () => {
  console.log('=== Starting Tailwind UI Component Synchronization ===\n');
  
  // Step 1: Prepare directory structure
  if (!runScript('prepare-component-dirs.js')) {
    console.error('Failed to prepare component directories. Exiting.');
    process.exit(1);
  }
  
  // Step 2: Run the scraper
  if (!runScript('scrapers/tailwind-scraper.js')) {
    console.error('Scraper encountered errors. Continuing with audit update...');
    // Continue anyway as we might have partial results
  }
  
  // Step 3: Update the component audit document
  if (!runScript('update-component-audit.js')) {
    console.error('Failed to update component audit. Please check the logs.');
    process.exit(1);
  }
  
  console.log('\n=== Tailwind UI Component Synchronization Complete ===');
  console.log('Please check the component library and audit document for details.');
};

// Run the synchronization process
syncTailwindComponents().catch(error => {
  console.error('Unhandled error during synchronization:', error);
  process.exit(1);
}); 