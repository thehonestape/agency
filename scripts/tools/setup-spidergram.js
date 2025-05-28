#!/usr/bin/env node

/**
 * Spidergram Integration Setup Script
 * 
 * This script helps set up the Spidergram integration by:
 * 1. Checking if Spidergram is installed
 * 2. Installing ArangoDB (or providing instructions)
 * 3. Setting up the configuration
 */

import { spawn, execSync } from 'child_process';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import readline from 'readline';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const CONFIG_PATH = path.join(__dirname, '..', '..', 'spidergram.config.json');

// Create readline interface for user input
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

async function question(query) {
  return new Promise(resolve => {
    rl.question(query, answer => {
      resolve(answer);
    });
  });
}

async function main() {
  console.log('=========================================');
  console.log('  Spidergram Integration Setup');
  console.log('=========================================');
  console.log('\nThis script will help you set up the Spidergram integration for the website scraper.\n');

  // 1. Check if Spidergram is installed
  try {
    console.log('Checking if Spidergram is installed...');
    const spidergramVersion = execSync('spidergram --version', { encoding: 'utf8' });
    console.log(`✓ Spidergram is installed: ${spidergramVersion.trim()}`);
  } catch (error) {
    console.log('✗ Spidergram is not installed or not in the PATH.');
    const install = await question('Would you like to install Spidergram now? (y/n): ');
    
    if (install.toLowerCase() === 'y') {
      console.log('Installing Spidergram globally...');
      try {
        execSync('npm install -g spidergram', { stdio: 'inherit' });
        console.log('✓ Spidergram installed successfully!');
      } catch (error) {
        console.error('Error installing Spidergram:', error.message);
        console.log('\nPlease install Spidergram manually with:');
        console.log('  npm install -g spidergram');
        process.exit(1);
      }
    } else {
      console.log('\nPlease install Spidergram before continuing:');
      console.log('  npm install -g spidergram');
      process.exit(1);
    }
  }

  // 2. Check ArangoDB
  console.log('\nChecking for ArangoDB...');
  let arangoInstalled = false;
  
  try {
    // This is a simple check - we just see if we can connect to the default ArangoDB URL
    execSync('curl -s http://localhost:8529/_api/version', { stdio: 'ignore' });
    arangoInstalled = true;
    console.log('✓ ArangoDB appears to be running on the default port (8529)');
  } catch (error) {
    console.log('✗ Could not connect to ArangoDB on the default port.');
  }

  if (!arangoInstalled) {
    console.log('\nArangoDB installation options:');
    console.log('1. Download and install: https://www.arangodb.com/download/');
    console.log('2. With Docker: docker run -p 8529:8529 -e ARANGO_ROOT_PASSWORD=openSesame arangodb/arangodb');
    
    if (process.platform === 'darwin') {
      console.log('3. Mac with Homebrew: brew install arangodb');
    }
    
    console.log('\nPlease install ArangoDB and ensure it is running before using Spidergram.');
    const proceed = await question('Would you like to continue with setup anyway? (y/n): ');
    
    if (proceed.toLowerCase() !== 'y') {
      console.log('Setup cancelled.');
      process.exit(0);
    }
  }

  // 3. Configure Spidergram
  console.log('\nLet\'s configure Spidergram integration...');
  
  const useDefault = await question('Use default configuration? (y/n): ');
  
  let config = {
    database: {
      url: 'http://localhost:8529',
      name: 'spidergram',
      user: 'root',
      password: ''
    },
    crawler: {
      maxConcurrent: 5,
      maxDepth: 3,
      maxPages: 1000,
      delay: 500
    },
    reporting: {
      outputDir: 'spidergram-reports'
    }
  };
  
  if (useDefault.toLowerCase() !== 'y') {
    // Custom config
    config.database.url = await question(`ArangoDB URL [${config.database.url}]: `) || config.database.url;
    config.database.name = await question(`Database name [${config.database.name}]: `) || config.database.name;
    config.database.user = await question(`Database user [${config.database.user}]: `) || config.database.user;
    config.database.password = await question(`Database password [${config.database.password}]: `) || config.database.password;
    
    config.crawler.maxDepth = parseInt(await question(`Max crawl depth [${config.crawler.maxDepth}]: `) || config.crawler.maxDepth);
    config.crawler.maxPages = parseInt(await question(`Max pages to crawl [${config.crawler.maxPages}]: `) || config.crawler.maxPages);
  }
  
  // Save the configuration
  try {
    await fs.writeFile(CONFIG_PATH, JSON.stringify(config, null, 2), 'utf8');
    console.log(`\n✓ Configuration saved to ${CONFIG_PATH}`);
  } catch (error) {
    console.error('Error saving configuration:', error.message);
  }
  
  // 4. Update the scraper config to enable Spidergram
  console.log('\nUpdating website scraper configuration to enable Spidergram...');
  
  try {
    // Read the current scraper.js and modify it
    const scraperPath = path.join(__dirname, '..', 'website-scraper.js');
    let scraperContent = await fs.readFile(scraperPath, 'utf8');
    
    // Update the useSpidergram config option
    scraperContent = scraperContent.replace(
      'useSpidergram: false',
      'useSpidergram: true'
    );
    
    // Update the Spidergram configuration
    const configRegex = /spidergramConfig: \{[^}]*\}/gs;
    const spidergramConfigStr = `spidergramConfig: {
    arangoUrl: '${config.database.url}',
    arangoDb: '${config.database.name}',
    arangoUser: '${config.database.user}',
    arangoPassword: '${config.database.password}',
  }`;
    
    if (configRegex.test(scraperContent)) {
      scraperContent = scraperContent.replace(configRegex, spidergramConfigStr);
    }
    
    await fs.writeFile(scraperPath, scraperContent, 'utf8');
    console.log('✓ Website scraper configuration updated');
  } catch (error) {
    console.error('Error updating scraper configuration:', error.message);
  }
  
  console.log('\n=========================================');
  console.log('  Spidergram Integration Setup Complete');
  console.log('=========================================');
  console.log('\nYou can now use the website scraper with Spidergram integration enabled.');
  console.log('To run the scraper with Spidergram:');
  console.log('  npm run scrape https://example.com');
  console.log('\nAfter scraping, Spidergram reports will be available in the configured output directory.');
  
  rl.close();
}

main().catch(error => {
  console.error('Setup error:', error);
  process.exit(1);
}); 