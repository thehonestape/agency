#!/usr/bin/env node

/**
 * Website Scraper and Report Generator
 * This script scrapes websites and generates comprehensive reports about their structure and content.
 */

import { chromium } from 'playwright';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { createObjectCsvWriter } from 'csv-writer';
import { JSDOM } from 'jsdom';
import { processWithSpidergram } from './integrations/index.js';
import { analyzeWithAI } from './ai-analysis-engine.js';
import { generateAIDashboard } from './ai-dashboard-generator.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration
const CONFIG = {
  maxPages: 100, // Maximum number of pages to scrape
  maxDepth: 3,   // Maximum depth for crawling
  timeout: 30000, // Page load timeout in ms
  outputDir: path.join(__dirname, '..', 'src', 'data', 'scraped-sites'),
  pageSpeedApiKey: process.env.PAGESPEED_API_KEY, // Add your API key to environment variables
  takeScreenshots: true, // Enable screenshots by default
  saveAsMarkdown: true, // Enable Markdown export by default
  analyzeBrandElements: true, // Enable brand element analysis by default
  captureElementScreenshots: true, // Enable element screenshots
  analyzeTextContent: true, // Enable text content analysis
  topNKeywords: 20, // Number of top keywords/bigrams to report
  useSpidergram: true, // Enable Spidergram integration
  spidergramConfig: {
    arangoUrl: 'http://localhost:8529',
    arangoDb: 'spidergram',
    arangoUser: 'root',
    arangoPassword: '',
  },
  commonStopWords: [ // Basic list of stop words
    'a', 'an', 'the', 'is', 'are', 'was', 'were', 'be', 'been', 'being', 
    'have', 'has', 'had', 'do', 'does', 'did', 'will', 'would', 'should', 'can', 'could',
    'and', 'but', 'or', 'nor', 'for', 'so', 'yet', 'in', 'on', 'at', 'by', 'from', 'to', 'of',
    'with', 'about', 'as', 'into', 'like', 'through', 'after', 'over', 'between', 'out',
    'against', 'during', 'without', 'before', 'under', 'around', 'above', 'below', 'up', 'down',
    'i', 'me', 'my', 'myself', 'we', 'our', 'ours', 'ourselves', 'you', 'your', 'yours', 'yourself', 'yourselves',
    'he', 'him', 'his', 'himself', 'she', 'her', 'hers', 'herself', 'it', 'its', 'itself',
    'they', 'them', 'their', 'theirs', 'themselves', 'what', 'which', 'who', 'whom', 'this', 'that', 
    'these', 'those', 'am', 's', 't', 'just', 'dont', 'cant', 'not', 'com', 'org', 'www', 'http', 'https', 'also', 'more', 'all', 'any'
  ],
  commonCTAPhrases: [
    'learn more', 'sign up', 'contact us', 'get started', 'buy now', 'shop now',
    'view details', 'read more', 'submit', 'download', 'request a demo', 'apply now',
    'book now', 'explore', 'discover', 'join us', 'subscribe', 'get quote', 'free trial'
  ],
  selectorsToCaptureForElementScreenshot: [ // Define selectors for element screenshots
    { name: 'buttons', selector: 'button, a[role="button"], input[type="button"], input[type="submit"]' },
    { name: 'headings-h1', selector: 'h1' },
    { name: 'headings-h2', selector: 'h2' },
    { name: 'links', selector: 'a[href]' },
    { name: 'inputs', selector: 'input[type="text"], input[type="email"], textarea' },
    // Add more selectors as needed, e.g., for cards, navs, specific components
  ],
};

// Data structures to store scraped information
const scrapedData = {
  pages: [],
  links: [],
  siteMap: {},
  pageTypes: {},
  seoData: {},
  performance: {},
  accessibility: {},
  brandElements: { // New section for brand analysis
    colors: [],
    fonts: [],
    logos: [], // Placeholder for later
    elementScreenshots: {}, // Placeholder for later
    textContentAnalysis: { // New section for text analysis
      keywordFrequencies: {},
      bigramFrequencies: {},
      ctaTexts: [],
    },
  },
  reportDir: null,
};

// Helper function to create output directory
async function ensureOutputDirExists() {
  try {
    await fs.mkdir(CONFIG.outputDir, { recursive: true });
    console.log(`Created output directory: ${CONFIG.outputDir}`);
  } catch (error) {
    console.error(`Error creating output directory: ${error.message}`);
  }
  return CONFIG.outputDir;
}

// Main scraping function
async function scrapeWebsite(url) {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();
  
  try {
    console.log(`Starting to scrape: ${url}`);
    
    // Initialize report directory
    const baseOutputDir = await ensureOutputDirExists(); 
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const currentReportDir = path.join(baseOutputDir, timestamp); 
    
    // Set the report directory in scrapedData
    scrapedData.reportDir = currentReportDir;
    
    // Create all needed directories upfront
    await fs.mkdir(currentReportDir, { recursive: true });
    await fs.mkdir(path.join(currentReportDir, 'screenshots'), { recursive: true });
    await fs.mkdir(path.join(currentReportDir, 'markdown'), { recursive: true });
    if (CONFIG.captureElementScreenshots) {
      await fs.mkdir(path.join(currentReportDir, 'element-screenshots'), { recursive: true });
    }
    if (CONFIG.analyzeBrandElements) { 
      await fs.mkdir(path.join(currentReportDir, 'logos'), { recursive: true });
    }
    console.log('Output directory for this run:', currentReportDir);
    
    const visitedUrls = new Set();
    const queue = [{ url, depth: 0 }];
    
    while (queue.length > 0 && scrapedData.pages.length < CONFIG.maxPages) {
      const { url: currentUrl, depth } = queue.shift();
      
      if (visitedUrls.has(currentUrl) || depth > CONFIG.maxDepth) continue;
      visitedUrls.add(currentUrl);
      
      console.log(`Scraping page: ${currentUrl} (depth: ${depth})`);
      
      try {
        await page.goto(currentUrl, { 
          waitUntil: 'networkidle',
          timeout: CONFIG.timeout 
        });
        
        // Wait for any remaining dynamic content
        await page.waitForTimeout(1000);
        
        // Extract page data
        const pageData = await extractPageData(page, currentUrl);
        
        // Take screenshot if enabled
        if (CONFIG.takeScreenshots) {
          console.log('Taking screenshot...');
          const screenshotFilename = await takeScreenshot(page, currentUrl);
          pageData.screenshot = screenshotFilename;
        }
        
        // Save content as Markdown if enabled
        if (CONFIG.saveAsMarkdown) {
          console.log('Saving content as Markdown...');
          const markdownFilename = await saveAsMarkdown(page, currentUrl);
          pageData.markdown = markdownFilename;
        }
        
        // 🎯 BRAND ANALYSIS - Extract brand elements if enabled
        if (CONFIG.analyzeBrandElements) {
          console.log('Extracting brand elements...');
          await extractBrandElements(page);
          await extractAndSaveLogos(page, currentUrl);
        }

        // 🎯 ELEMENT SCREENSHOTS - Capture element screenshots if enabled
        if (CONFIG.captureElementScreenshots) {
          console.log('Capturing element screenshots...');
          await captureElementScreenshots(page, currentUrl);
        }

        // 🎯 TEXT ANALYSIS - Analyze text content for keywords and CTAs
        if (CONFIG.analyzeTextContent) {
          console.log('Analyzing text content...');
          await analyzePageTextContent(page);
        }
        
        scrapedData.pages.push(pageData);
        
        // Update site map
        const domain = new URL(currentUrl).hostname;
        if (!scrapedData.siteMap[domain]) {
          scrapedData.siteMap[domain] = [];
        }
        scrapedData.siteMap[domain].push({
          path: new URL(currentUrl).pathname,
          title: pageData.title,
        });
        
        // Extract and queue new links
        if (depth < CONFIG.maxDepth) {
          const links = await extractLinks(page, currentUrl);
          scrapedData.links.push(...links);
          
          // Add new links to queue
          links.forEach(link => {
            if (!visitedUrls.has(link.to)) {
              queue.push({ url: link.to, depth: depth + 1 });
            }
          });
        }
        
        // Analyze page type
        analyzePageType(pageData);
        
        // Collect SEO data
        await collectSeoData(page, currentUrl);
        
        // Measure performance
        await measurePerformance(page, currentUrl);
        
        // Check accessibility
        await checkAccessibility(page, currentUrl);
        
      } catch (error) {
        console.error(`Error scraping ${currentUrl}:`, error.message);
      }
    }
    
    console.log('Scraping completed successfully');
  } catch (error) {
    console.error('Scraping error:', error);
  } finally {
    await browser.close();
  }
}

// Extract page data
async function extractPageData(page, url) {
  const title = await page.title();
  const elements = await countElements(page);
  
  return {
    url,
    title,
    type: 'general', // Will be updated by analyzePageType
    elements,
    timestamp: new Date().toISOString(),
  };
}

// Extract links from page
async function extractLinks(page, baseUrl) {
  const links = await page.evaluate((baseUrl) => {
    const base = new URL(baseUrl);
    return Array.from(document.querySelectorAll('a[href]'))
      .map(a => {
        try {
          const href = a.href;
          const url = new URL(href, baseUrl);
          return {
            from: baseUrl,
            to: url.href,
            text: a.textContent.trim(),
          };
        } catch (e) {
          return null;
        }
      })
      .filter(link => link && link.to.startsWith(base.origin));
  }, baseUrl);
  
  return links;
}

// Determine page type
function determinePageType(dom) {
  const document = dom.window.document;
  
  // Check for common page types
  if (document.querySelector('form')) return 'form';
  if (document.querySelector('article')) return 'article';
  if (document.querySelector('.product, [itemtype*="Product"]')) return 'product';
  if (document.querySelector('.blog-post, .post')) return 'blog';
  if (document.querySelector('.contact-form')) return 'contact';
  
  return 'general';
}

// Analyze page type and update statistics
function analyzePageType(pageData) {
  if (!scrapedData.pageTypes[pageData.type]) {
    scrapedData.pageTypes[pageData.type] = 0;
  }
  scrapedData.pageTypes[pageData.type]++;
}

// Collect SEO data
async function collectSeoData(page, url) {
  const seoData = await page.evaluate(() => {
    const meta = {};
    document.querySelectorAll('meta').forEach(tag => {
      const name = tag.getAttribute('name') || tag.getAttribute('property');
      const content = tag.getAttribute('content');
      if (name && content) {
        meta[name] = content;
      }
    });
    
    return {
      title: document.title,
      meta,
      h1: document.querySelector('h1')?.textContent,
      canonical: document.querySelector('link[rel="canonical"]')?.href,
    };
  });
  
  scrapedData.seoData[url] = seoData;
}

// Enhanced performance measurement
async function measurePerformance(page, url) {
  // Existing performance metrics
  const performance = await page.evaluate(() => {
    const perf = window.performance;
    const timing = perf.timing;
    
    return {
      loadTime: timing.loadEventEnd - timing.navigationStart,
      domContentLoaded: timing.domContentLoadedEventEnd - timing.navigationStart,
      firstPaint: perf.getEntriesByType('paint')
        .find(entry => entry.name === 'first-paint')?.startTime,
      resourceCount: perf.getEntriesByType('resource').length,
    };
  });

  // Add PageSpeed Insights data if API key is available
  if (CONFIG.pageSpeedApiKey) {
    try {
      const pageSpeedUrl = `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${encodeURIComponent(url)}&key=${CONFIG.pageSpeedApiKey}`;
      const response = await fetch(pageSpeedUrl);
      const pageSpeedData = await response.json();
      
      performance.pageSpeed = {
        score: pageSpeedData.lighthouseResult.categories.performance.score * 100,
        firstContentfulPaint: pageSpeedData.lighthouseResult.audits['first-contentful-paint'].numericValue,
        speedIndex: pageSpeedData.lighthouseResult.audits['speed-index'].numericValue,
        largestContentfulPaint: pageSpeedData.lighthouseResult.audits['largest-contentful-paint'].numericValue,
        timeToInteractive: pageSpeedData.lighthouseResult.audits['interactive'].numericValue,
        totalBlockingTime: pageSpeedData.lighthouseResult.audits['total-blocking-time'].numericValue,
        cumulativeLayoutShift: pageSpeedData.lighthouseResult.audits['cumulative-layout-shift'].numericValue,
      };
    } catch (error) {
      console.error(`Error fetching PageSpeed data for ${url}:`, error.message);
    }
  }
  
  scrapedData.performance[url] = performance;
}

// Check page accessibility
async function checkAccessibility(page, url) {
  const accessibility = await page.evaluate(() => {
    // Helper function to get element selector
    function getSelector(element) {
      if (element.id) return `#${element.id}`;
      if (element.className) return `.${element.className.split(' ').join('.')}`;
      return element.tagName.toLowerCase();
    }

    // Helper function to check color contrast
    function isColorContrastValid(color1, color2) {
      // Basic implementation - in reality, you'd want to use a proper color contrast algorithm
      return true;
    }

    const issues = [];
    
    // Check for alt text on images
    document.querySelectorAll('img:not([alt])').forEach(img => {
      issues.push({
        type: 'missing-alt',
        element: 'img',
        selector: getSelector(img),
      });
    });
    
    // Check for ARIA labels
    document.querySelectorAll('[role]:not([aria-label])').forEach(el => {
      issues.push({
        type: 'missing-aria-label',
        element: el.tagName,
        selector: getSelector(el),
      });
    });
    
    // Check for color contrast (basic check)
    document.querySelectorAll('*').forEach(el => {
      const style = window.getComputedStyle(el);
      const color = style.color;
      const bgColor = style.backgroundColor;
      if (color && bgColor && !isColorContrastValid(color, bgColor)) {
        issues.push({
          type: 'low-contrast',
          element: el.tagName,
          selector: getSelector(el),
        });
      }
    });
    
    return issues;
  });
  
  scrapedData.accessibility[url] = accessibility;
}

// Modify generateReports function to create screenshots directory
async function generateReports(baseUrl, reportDir) {
  console.log(`Generating reports in specific directory: ${reportDir}`);

  // Sort and trim keyword frequencies
  if (scrapedData.brandElements.textContentAnalysis) {
    const sortAndTrim = (frequencies) => {
      return Object.entries(frequencies)
        .sort(([,a],[,b]) => b - a)
        .slice(0, CONFIG.topNKeywords)
        .reduce((obj, [key, value]) => { obj[key] = value; return obj; }, {});
    };
    scrapedData.brandElements.textContentAnalysis.keywordFrequencies = 
      sortAndTrim(scrapedData.brandElements.textContentAnalysis.keywordFrequencies);
    scrapedData.brandElements.textContentAnalysis.bigramFrequencies = 
      sortAndTrim(scrapedData.brandElements.textContentAnalysis.bigramFrequencies);
  }

  const csvWriter = createObjectCsvWriter({
    path: path.join(reportDir, 'pages.csv'),
    header: [
      { id: 'url', title: 'URL' },
      { id: 'title', title: 'Title' },
      { id: 'type', title: 'Type' },
      { id: 'headings', title: 'Headings' },
      { id: 'links', title: 'Links' },
      { id: 'images', title: 'Images' },
      { id: 'forms', title: 'Forms' },
      { id: 'screenshot', title: 'Screenshot' },
      { id: 'markdown', title: 'Markdown' },
    ],
  });
  
  const csvData = scrapedData.pages.map(page => ({
    url: page.url,
    title: page.title,
    type: page.type,
    headings: page.elements.headings,
    links: page.elements.links,
    images: page.elements.images,
    forms: page.elements.forms,
    screenshot: page.screenshot || '',
    markdown: page.markdown || '',
  }));
  
  await csvWriter.writeRecords(csvData);

  const reportJson = {
    baseUrl,
    timestamp: new Date().toISOString(),
    summary: {
      totalPages: scrapedData.pages.length,
      totalDomains: Object.keys(scrapedData.siteMap).length,
      pageTypes: scrapedData.pageTypes,
    },
    brandAnalysis: scrapedData.brandElements,
    data: scrapedData, 
  };
  
  await fs.writeFile(
    path.join(reportDir, 'report.json'),
    JSON.stringify(reportJson, null, 2)
  );
  
  console.log(`Reports generated and saved in: ${reportDir}`);
}

// Modify scrapePage function to fix screenshot functionality
async function scrapePage(page, url, depth = 0) {
  if (depth > CONFIG.maxDepth || scrapedData.pages.length >= CONFIG.maxPages) {
    return;
  }

  if (scrapedData.pages.some(p => p.url === url)) {
    return;
  }

  console.log(`Scraping page: ${url} (depth: ${depth})`);
  console.log('Report directory:', scrapedData.reportDir);

  try {
    console.log('Navigating to page...');
    // Navigate to page and wait for load
    await page.goto(url, {
      waitUntil: 'networkidle',
      timeout: CONFIG.timeout,
    });
    
    console.log('Page loaded, waiting for dynamic content...');
    // Wait for any remaining dynamic content
    await page.waitForTimeout(1000);
    
    console.log('Extracting page data...');
    // Extract page data first
    const pageData = await extractPageData(page, url);
    
    // Take screenshot if enabled
    let screenshotFilename = null;
    if (CONFIG.takeScreenshots) {
      console.log('Taking screenshot...');
      screenshotFilename = await takeScreenshot(page, url);
      console.log('Screenshot filename:', screenshotFilename);
      pageData.screenshot = screenshotFilename;
    } else {
      console.log('Screenshots disabled');
    }
    
    // Save content as Markdown if enabled
    let markdownFilename = null;
    if (CONFIG.saveAsMarkdown) {
      console.log('Saving content as Markdown...');
      markdownFilename = await saveAsMarkdown(page, url);
      console.log('Markdown filename:', markdownFilename);
      pageData.markdown = markdownFilename;
    }
    
    // Extract brand elements if enabled (do this for each page to aggregate)
    if (CONFIG.analyzeBrandElements) {
      await extractBrandElements(page);
      await extractAndSaveLogos(page, url);
    }

    // Capture element screenshots if enabled
    if (CONFIG.captureElementScreenshots) {
        await captureElementScreenshots(page, url);
    }

    // Analyze text content for keywords and CTAs
    if (CONFIG.analyzeTextContent) {
      await analyzePageTextContent(page);
    }

    // Add page data to scraped data
    scrapedData.pages.push(pageData);
    
    // Update site map
    const domain = new URL(url).hostname;
    if (!scrapedData.siteMap[domain]) {
      scrapedData.siteMap[domain] = [];
    }
    scrapedData.siteMap[domain].push({
      path: new URL(url).pathname,
      title: pageData.title,
    });
    
    // Extract and queue new links
    if (depth < CONFIG.maxDepth) {
      const links = await extractLinks(page, url);
      scrapedData.links.push(...links);
      
      // Add new links to queue
      for (const link of links) {
        if (!scrapedData.pages.some(p => p.url === link.to)) {
          await scrapePage(page, link.to, depth + 1);
        }
      }
    }
    
    // Analyze page type
    analyzePageType(pageData);
    
    // Collect SEO data
    await collectSeoData(page, url);
    
    // Measure performance
    await measurePerformance(page, url);
    
    // Check accessibility
    await checkAccessibility(page, url);
    
  } catch (error) {
    console.error(`Error scraping ${url}:`, error.message);
    console.error('Error stack:', error.stack);
  }
}

// Improved screenshot function
async function takeScreenshot(page, url) {
  try {
    if (!scrapedData.reportDir) {
        console.error('Report directory not set for takeScreenshot');
        return null;
    }
    console.log(`Taking full page screenshot for: ${url} into ${scrapedData.reportDir}`);
    
    const urlObj = new URL(url);
    const filename = `${urlObj.hostname}${urlObj.pathname.replace(/\//g, '_')}.png`;
    const safeFilename = filename.replace(/[^a-z0-9._-]/gi, '_');
    const screenshotPath = path.join(scrapedData.reportDir, 'screenshots', safeFilename);
    
    const buffer = await page.screenshot({ fullPage: true });
    await fs.writeFile(screenshotPath, buffer);
    
    console.log(`Full page screenshot saved: ${screenshotPath}`);
    return safeFilename; // Filename relative to the 'screenshots' folder
  } catch (error) {
    console.error(`Error taking screenshot for ${url}:`, error.message);
    console.error('Error stack:', error.stack);
    return null;
  }
}

// Add function to save content as Markdown
async function saveAsMarkdown(page, url) {
  try {
    if (!scrapedData.reportDir) {
        console.error('Report directory not set for saveAsMarkdown');
        return null;
    }
    console.log(`Saving content as Markdown for: ${url} into ${scrapedData.reportDir}`);
    
    const urlObj = new URL(url);
    const filename = `${urlObj.hostname}${urlObj.pathname.replace(/\//g, '_')}.md`;
    const safeFilename = filename.replace(/[^a-z0-9._-]/gi, '_');
    
    const markdownDir = path.join(scrapedData.reportDir, 'markdown'); // Already correct
    // await fs.mkdir(markdownDir, { recursive: true }); // This is done in main now
    
    const markdownPath = path.join(markdownDir, safeFilename);
    const content = await page.evaluate(() => {
      const title = document.title;
      const metaDescription = document.querySelector('meta[name="description"]')?.content || '';
      const mainContent = document.querySelector('main')?.innerText || 
                         document.querySelector('article')?.innerText || 
                         document.querySelector('#content')?.innerText || 
                         document.body.innerText;
      const headings = Array.from(document.querySelectorAll('h1, h2, h3, h4, h5, h6'))
        .map(h => `${h.tagName.toLowerCase()}: ${h.innerText}`).join('\n');
      return { title, metaDescription, mainContent, headings };
    });
    
    const markdown = `# ${content.title}\n\nURL: ${url}\n\n## Description\n\n${content.metaDescription}\n\n## Headings\n\n${content.headings}\n\n## Content\n\n${content.mainContent}\n\n---\nGenerated on: ${new Date().toISOString()}`;
    
    await fs.writeFile(markdownPath, markdown);
    console.log(`Markdown saved: ${markdownPath}`);
    return safeFilename; // Filename relative to the 'markdown' folder
  } catch (error) {
    console.error(`Error saving Markdown for ${url}:`, error.message);
    console.error('Error stack:', error.stack);
    return null;
  }
}

// Add countElements function
async function countElements(page) {
  return await page.evaluate(() => {
    return {
      headings: document.querySelectorAll('h1, h2, h3, h4, h5, h6').length,
      links: document.querySelectorAll('a').length,
      images: document.querySelectorAll('img').length,
      forms: document.querySelectorAll('form').length,
    };
  });
}

// New function to extract brand elements (colors and fonts)
async function extractBrandElements(page) {
  console.log('Extracting brand elements...');
  try {
    const brandData = await page.evaluate(() => {
      const collectedColors = new Set();
      const collectedFonts = new Set();

      // Function to add color if valid
      const addColor = (color) => {
        if (color && color !== 'rgba(0, 0, 0, 0)' && color !== 'transparent') {
          collectedColors.add(color);
        }
      };

      // Elements to check
      const elementsToCheck = document.querySelectorAll(
        'body, h1, h2, h3, h4, h5, h6, p, a, button, span, div'
      );

      elementsToCheck.forEach(el => {
        const style = window.getComputedStyle(el);
        addColor(style.color);
        addColor(style.backgroundColor);
        addColor(style.borderColor);

        // Extract font info
        if (style.fontFamily) {
          collectedFonts.add(
            `${style.fontFamily.split(',')[0].trim().replace(/['\"]/g, '')} (${style.fontSize}, ${style.fontWeight})`
          );
        }
      });
      
      // Check for CSS Custom Properties (variables) for colors
      const rootStyle = window.getComputedStyle(document.documentElement);
      for (let i = 0; i < rootStyle.length; i++) {
        const propName = rootStyle[i];
        if (propName.startsWith('--') && (propName.toLowerCase().includes('color') || propName.toLowerCase().includes('brand'))) {
          const propValue = rootStyle.getPropertyValue(propName).trim();
          if (propValue) addColor(propValue);
        }
      }

      return {
        colors: Array.from(collectedColors),
        fonts: Array.from(collectedFonts),
      };
    });

    // Aggregate unique colors and fonts across pages
    brandData.colors.forEach(color => {
      if (!scrapedData.brandElements.colors.includes(color)) {
        scrapedData.brandElements.colors.push(color);
      }
    });
    brandData.fonts.forEach(font => {
      if (!scrapedData.brandElements.fonts.includes(font)) {
        scrapedData.brandElements.fonts.push(font);
      }
    });
    
    console.log('Brand elements extracted:', { colors: brandData.colors.length, fonts: brandData.fonts.length });

  } catch (error) {
    console.error('Error extracting brand elements:', error.message);
    console.error('Error stack:', error.stack);
  }
}

// New function to capture screenshots of specific UI elements
async function captureElementScreenshots(page, url) {
  if (!CONFIG.captureElementScreenshots || !scrapedData.reportDir) return;
  console.log(`Capturing element screenshots for: ${url} into ${scrapedData.reportDir}`)

  const sanitizedUrlPath = new URL(url).pathname.replace(/\//g, '_').replace(/[^a-z0-9_-]/gi, '') || 'index';
  // Base directory for all element screenshots for this run is now clearly from scrapedData.reportDir
  const pageElementScreenshotDir = path.join(scrapedData.reportDir, 'element-screenshots', sanitizedUrlPath);
  await fs.mkdir(pageElementScreenshotDir, { recursive: true });

  if (!scrapedData.brandElements.elementScreenshots[url]) {
    scrapedData.brandElements.elementScreenshots[url] = {};
  }

  for (const item of CONFIG.selectorsToCaptureForElementScreenshot) {
    try {
      const elements = await page.$$(item.selector);
      if (!elements.length) continue;

      console.log(`Found ${elements.length} elements for selector '${item.name}'`);
      scrapedData.brandElements.elementScreenshots[url][item.name] = [];

      const elementTypeDir = path.join(pageElementScreenshotDir, item.name);
      await fs.mkdir(elementTypeDir, { recursive: true });

      for (let i = 0; i < Math.min(elements.length, 5); i++) { 
        const element = elements[i];
        if (!(await element.isVisible()) || !(await element.boundingBox())) {
            console.log(`Element ${i} for ${item.name} is not visible or has no bounding box, skipping.`);
            continue;
        }
        const screenshotFilename = `${item.name}-${i + 1}.png`;
        const screenshotPath = path.join(elementTypeDir, screenshotFilename);
        
        await element.screenshot({ path: screenshotPath });
        
        // Construct relative path from the *actual* reportDir for storage in JSON
        const relativePath = path.relative(scrapedData.reportDir, screenshotPath);
        scrapedData.brandElements.elementScreenshots[url][item.name].push(relativePath);
        console.log(`Saved element screenshot: ${relativePath} (relative to ${scrapedData.reportDir})`);
      }
    } catch (error) {
      console.error(`Error capturing screenshots for selector ${item.name} on ${url}:`, error.message);
    }
  }
}

// New function to analyze text content for keywords, bigrams, and CTAs
async function analyzePageTextContent(page) {
  if (!CONFIG.analyzeTextContent) return;
  console.log('Analyzing page text content...');

  try {
    const pageTextContent = await page.evaluate(() => document.body.innerText || '');
    const pageLinkAndButtonTexts = await page.evaluate(() => {
        const texts = new Set();
        document.querySelectorAll('a, button, input[type="button"], input[type="submit"]').forEach(el => {
            const text = (el.innerText || el.value || el.getAttribute('aria-label') || '').trim().toLowerCase();
            if (text) texts.add(text);
        });
        return Array.from(texts);
    });

    // --- Keyword and Bigram Frequency --- 
    const words = pageTextContent.toLowerCase()
        .replace(/[\W_]+/g, ' ') // Replace non-alphanumeric with space
        .split(/\s+/)
        .filter(word => word.length > 2 && !CONFIG.commonStopWords.includes(word));

    words.forEach(word => {
      scrapedData.brandElements.textContentAnalysis.keywordFrequencies[word] = 
        (scrapedData.brandElements.textContentAnalysis.keywordFrequencies[word] || 0) + 1;
    });

    for (let i = 0; i < words.length - 1; i++) {
      const bigram = `${words[i]} ${words[i+1]}`;
      scrapedData.brandElements.textContentAnalysis.bigramFrequencies[bigram] = 
        (scrapedData.brandElements.textContentAnalysis.bigramFrequencies[bigram] || 0) + 1;
    }

    // --- CTA Identification --- 
    pageLinkAndButtonTexts.forEach(text => {
      if (CONFIG.commonCTAPhrases.some(cta => text.includes(cta))) {
        if (!scrapedData.brandElements.textContentAnalysis.ctaTexts.includes(text)) {
          scrapedData.brandElements.textContentAnalysis.ctaTexts.push(text);
        }
      }
    });

    console.log('Page text content analysis complete.');
  } catch (error) {
    console.error('Error analyzing page text content:', error.message);
    console.error('Error stack:', error.stack);
  }
}

// New function to extract and save logos
async function extractAndSaveLogos(page, currentUrl) {
  if (!CONFIG.analyzeBrandElements) return;
  console.log(`Extracting and saving logos for: ${currentUrl}`);

  const logoDir = path.join(scrapedData.reportDir, 'logos');
  // Directory is created in main, but ensure it for robustness if called standalone (though not current design)
  await fs.mkdir(logoDir, { recursive: true }); 

  const potentialLogos = await page.evaluate(() => {
    const foundLogos = [];
    // Heuristics for <img> tags
    document.querySelectorAll('img').forEach(img => {
      const alt = (img.alt || '').toLowerCase();
      const src = img.src || '';
      const className = (img.className || '').toLowerCase();
      if (alt.includes('logo') || src.includes('logo') || src.includes('brand') || 
          className.includes('logo') || className.includes('brand')) {
        if (img.offsetParent !== null && img.clientWidth > 10 && img.clientHeight > 10) { // Basic visibility and size check
            foundLogos.push({ type: 'img', src: img.src, alt: img.alt });
        }
      }
    });

    // Heuristics for <svg> tags
    document.querySelectorAll('svg').forEach((svg, index) => {
      const ariaLabel = (svg.getAttribute('aria-label') || '').toLowerCase();
      const id = (svg.id || '').toLowerCase();
      const className = (svg.className.baseVal || '').toLowerCase(); // For SVGAnimatedString
      const parentClassName = (svg.parentElement?.className || '').toLowerCase();

      if (ariaLabel.includes('logo') || id.includes('logo') || className.includes('logo') || 
          parentClassName.includes('logo') || parentClassName.includes('brand')) {
        if (svg.offsetParent !== null) { // Basic visibility check
            foundLogos.push({ type: 'svg', html: svg.outerHTML, id: svg.id || `svg-logo-${index}` });
        }
      }
    });
    return foundLogos;
  });

  for (const logo of potentialLogos) {
    try {
      let logoFilename = '';
      let relativeLogoPath = '';

      if (logo.type === 'img' && logo.src) {
        const logoUrl = new URL(logo.src, currentUrl).href;
        const response = await fetch(logoUrl);
        if (!response.ok) {
          console.warn(`Failed to fetch logo image ${logoUrl}: ${response.statusText}`);
          continue;
        }
        const buffer = await response.arrayBuffer();
        const originalFilename = path.basename(new URL(logoUrl).pathname);
        logoFilename = `${Date.now()}-${originalFilename.replace(/[^a-z0-9._-]/gi, '_')}`;
        const logoPath = path.join(logoDir, logoFilename);
        await fs.writeFile(logoPath, Buffer.from(buffer));
        relativeLogoPath = path.join('logos', logoFilename);
      } else if (logo.type === 'svg' && logo.html) {
        logoFilename = `${Date.now()}-${logo.id.replace(/[^a-z0-9_-]/gi, '_') || 'inline-logo'}.svg`;
        const logoPath = path.join(logoDir, logoFilename);
        await fs.writeFile(logoPath, logo.html);
        relativeLogoPath = path.join('logos', logoFilename);
      }

      if (relativeLogoPath && !scrapedData.brandElements.logos.includes(relativeLogoPath)) {
        scrapedData.brandElements.logos.push(relativeLogoPath);
        console.log(`Saved logo: ${relativeLogoPath}`);
      }
    } catch (error) {
      console.error(`Error processing potential logo (src: ${logo.src || 'inline SVG'}):`, error.message);
    }
  }
}

// New function to generate the HTML report (Refactored)
async function generateHtmlReport(reportData, reportDir) {
  console.log(`Generating HTML report in: ${reportDir}`);
  try {
    const { baseUrl, timestamp, summary, brandAnalysis, data } = reportData;
    const pages = data?.pages ?? []; // Use nullish coalescing for safety

    // --- Helper Functions for HTML Generation ---
    const sanitize = (str) => {
      if (typeof str !== 'string') return '';
      return str.replace(/[&<>'"\/]/g, match => ({
        '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;', '/': '&#x2F;'
      }[match]));
    };

    const generateSummaryHtml = (summaryData) => {
      let html = '<section class="mb-8">';
      html += '<h2 class="text-2xl font-semibold mb-3 border-b pb-2 text-gray-700">Summary</h2>';
      html += '<div class="grid grid-cols-1 md:grid-cols-3 gap-4">';
      html += `<div class="bg-blue-50 p-4 rounded-lg shadow"><h3 class="font-bold text-blue-800">Total Pages Scraped</h3><p class="text-3xl">${summaryData?.totalPages ?? 0}</p></div>`;
      html += `<div class="bg-green-50 p-4 rounded-lg shadow"><h3 class="font-bold text-green-800">Total Domains Found</h3><p class="text-3xl">${summaryData?.totalDomains ?? 0}</p></div>`;
      html += '<div class="bg-yellow-50 p-4 rounded-lg shadow"><h3 class="font-bold text-yellow-800">Page Types</h3>';
      const pageTypesHtml = Object.entries(summaryData?.pageTypes ?? {}).map(([type, count]) => `<p><span class="font-semibold">${sanitize(type)}:</span> ${count}</p>`).join('');
      html += pageTypesHtml || '<p>N/A</p>';
      html += '</div></div></section>';
      return html;
    };

    const generateBrandAnalysisHtml = (brandData) => {
      let html = '<section class="mb-8">';
      html += '<h2 class="text-2xl font-semibold mb-4 border-b pb-2 text-gray-700">Brand Analysis</h2>';
      html += '<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">';

      // Colors
      html += '<div class="bg-gray-50 p-4 rounded-lg shadow">';
      html += '<h3 class="font-bold text-gray-800 mb-2">Colors</h3>';
      const colorsHtml = (brandData?.colors ?? []).map(color => `<div><span class="color-swatch" style="background-color: ${sanitize(color)};"></span> ${sanitize(color)}</div>`).join('');
      html += colorsHtml || '<p>N/A</p>';
      html += '</div>';

      // Fonts
      html += '<div class="bg-gray-50 p-4 rounded-lg shadow">';
      html += '<h3 class="font-bold text-gray-800 mb-2">Fonts</h3>';
      const fontsHtml = (brandData?.fonts ?? []).map(font => `<div class="font-sample text-sm">${sanitize(font)}</div>`).join('');
      html += fontsHtml || '<p>N/A</p>';
      html += '</div>';

      // Logos
      html += '<div class="bg-gray-50 p-4 rounded-lg shadow">';
      html += '<h3 class="font-bold text-gray-800 mb-2">Detected Logos</h3>';
      const logosHtml = (brandData?.logos ?? []).map(logoPath => `<img src="${sanitize(logoPath)}" alt="Detected Logo" class="logo-image">`).join('');
      html += logosHtml || '<p>No logos detected</p>';
      html += '</div>';
      
      // Text Analysis
      html += '<div class="bg-gray-50 p-4 rounded-lg shadow col-span-1 md:col-span-2 lg:col-span-3">';
      html += '<h3 class="font-bold text-gray-800 mb-2">Text Content Analysis</h3>';
      html += '<div class="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">';
      html += '<div><h4 class="font-semibold mb-1">Top Keywords</h4><ul>';
      const keywordsHtml = Object.entries(brandData?.textContentAnalysis?.keywordFrequencies ?? {}).map(([kw, count]) => `<li>${sanitize(kw)} (${count})</li>`).join('');
      html += keywordsHtml || '<li>N/A</li>';
      html += '</ul></div>';
      html += '<div><h4 class="font-semibold mb-1">Top Phrases (Bigrams)</h4><ul>';
      const bigramsHtml = Object.entries(brandData?.textContentAnalysis?.bigramFrequencies ?? {}).map(([phrase, count]) => `<li>${sanitize(phrase)} (${count})</li>`).join('');
      html += bigramsHtml || '<li>N/A</li>';
      html += '</ul></div>';
      html += '<div><h4 class="font-semibold mb-1">Detected CTAs</h4><ul>';
      const ctasHtml = (brandData?.textContentAnalysis?.ctaTexts ?? []).map(cta => `<li>${sanitize(cta)}</li>`).join('');
      html += ctasHtml || '<li>N/A</li>';
      html += '</ul></div>';
      html += '</div></div>'; // Close grid and card

      html += '</div></section>'; // Close grid and section
      return html;
    };
    
    const generateElementGalleryHtml = (elementScreenshots) => {
      let html = '<section class="mb-8">';
      html += '<h2 class="text-2xl font-semibold mb-4 border-b pb-2 text-gray-700">Element Screenshot Gallery</h2>';
      const galleryHtml = Object.entries(elementScreenshots ?? {}).map(([pageUrl, elements]) => {
        let pageHtml = '<div class="mb-6 bg-gray-50 p-4 rounded-lg shadow">';
        pageHtml += `<h3 class="font-bold text-gray-800 mb-2 break-all">Page: ${sanitize(pageUrl)}</h3>`;
        pageHtml += Object.entries(elements).map(([elementType, paths]) => {
          let typeHtml = '<div class="mb-3">';
          typeHtml += `<h4 class="font-semibold capitalize text-gray-700">${sanitize(elementType.replace(/-/g, ' '))}</h4>`;
          typeHtml += '<div>';
          typeHtml += (paths ?? []).map(imgPath => `<div class="element-screenshot"><img src="${sanitize(imgPath)}" alt="${sanitize(elementType)} screenshot" loading="lazy"></div>`).join('');
          typeHtml += '</div></div>';
          return typeHtml;
        }).join('');
        pageHtml += '</div>';
        return pageHtml;
      }).join('');
      html += galleryHtml || '<p>No element screenshots captured.</p>';
      html += '</section>';
      return html;
    };

    const generatePagesTableHtml = (pageList, brandData) => {
        let html = '<section class="mb-8">';
        html += '<h2 class="text-2xl font-semibold mb-4 border-b pb-2 text-gray-700">Scraped Pages Overview</h2>';
        html += '<div class="overflow-x-auto">';
        html += '<table class="min-w-full bg-white border border-gray-300 text-sm">';
        html += '<thead class="bg-gray-200"><tr>';
        ['URL', 'Title', 'Type', 'Elements (H/L/I/F)', 'Links'].forEach(header => {
            html += `<th class="py-2 px-4 border-b">${header}</th>`;
        });
        html += '</tr></thead><tbody>';
        pageList.forEach(page => {
            html += '<tr class="hover:bg-gray-50">';
            html += `<td class="py-2 px-4 border-b break-all"><a href="${sanitize(page.url)}" target="_blank" class="text-blue-600 hover:underline">${sanitize(page.url)}</a></td>`;
            html += `<td class="py-2 px-4 border-b">${sanitize(page.title)}</td>`;
            html += `<td class="py-2 px-4 border-b">${sanitize(page.type)}</td>`;
            html += `<td class="py-2 px-4 border-b">${page.elements?.headings ?? 0}/${page.elements?.links ?? 0}/${page.elements?.images ?? 0}/${page.elements?.forms ?? 0}</td>`;
            html += '<td class="py-2 px-4 border-b">';
            if (page.screenshot) html += `<a href="screenshots/${sanitize(page.screenshot)}" target="_blank" class="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded mr-1 hover:bg-blue-200">Screenshot</a>`;
            if (page.markdown) html += `<a href="markdown/${sanitize(page.markdown)}" target="_blank" class="text-xs bg-green-100 text-green-700 px-2 py-1 rounded mr-1 hover:bg-green-200">Markdown</a>`;
            if (brandData?.elementScreenshots?.[page.url]) html += '<span class="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded">(Elements Captured)</span>';
            html += '</td></tr>';
        });
        html += '</tbody></table></div></section>';
        return html;
    };

    // --- Assemble Full HTML --- 
    let fullHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Website Analysis Report: ${sanitize(baseUrl)}</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <style>
    .color-swatch { display: inline-block; width: 20px; height: 20px; border: 1px solid #ccc; vertical-align: middle; margin-right: 5px; }
    .font-sample { border: 1px solid #eee; padding: 5px 10px; margin-bottom: 5px; border-radius: 4px; background-color: #f9f9f9; }
    .element-screenshot { border: 1px solid #ddd; padding: 4px; margin: 5px; display: inline-block; background-color: #fff; }
    .element-screenshot img { max-width: 200px; max-height: 100px; object-fit: contain; }
    .logo-image { max-width: 150px; max-height: 75px; object-fit: contain; border: 1px solid #eee; padding: 5px; background-color: #f9f9f9; margin: 5px; }
  </style>
</head>
<body class="bg-gray-100 font-sans leading-normal tracking-normal">
  <div class="container mx-auto p-6 bg-white shadow-md rounded-lg mt-10">
    <h1 class="text-3xl font-bold mb-2 text-gray-800">Website Analysis Report</h1>
    <p class="text-lg text-blue-600 mb-1">URL: <a href="${sanitize(baseUrl)}" target="_blank" class="hover:underline">${sanitize(baseUrl)}</a></p>
    <p class="text-sm text-gray-500 mb-6">Generated: ${new Date(timestamp).toLocaleString()}</p>
    `;

    fullHtml += generateSummaryHtml(summary);
    fullHtml += generateBrandAnalysisHtml(brandAnalysis);
    fullHtml += generateElementGalleryHtml(brandAnalysis?.elementScreenshots);
    fullHtml += generatePagesTableHtml(pages, brandAnalysis);

    fullHtml += `
  </div>
</body>
</html>
    `;

    const reportPath = path.join(reportDir, 'visual-report.html');
    await fs.writeFile(reportPath, fullHtml);
    console.log(`HTML report saved successfully to: ${reportPath}`);

  } catch (error) {
    console.error('Error generating HTML report:', error.message);
    console.error('Error stack:', error.stack);
  }
}

// Main function
async function main() {
  if (process.argv.length < 3) {
    console.error('Please provide a URL to scrape');
    process.exit(1);
  }

  const startUrl = process.argv[2];
  await scrapeWebsite(startUrl);
  
  // Generate reports
  if (scrapedData.reportDir) {
    await generateReports(startUrl, scrapedData.reportDir);
    
    // Generate HTML report
    await generateHtmlReport(scrapedData, scrapedData.reportDir);
    
    // 🤖 Generate AI Analysis and Dashboard
    console.log('🤖 Starting AI analysis and dashboard generation...');
    try {
      // Run AI analysis on scraped data
      const aiInsights = await analyzeWithAI(scrapedData);
      
      // Save AI insights to JSON
      const aiInsightsPath = path.join(scrapedData.reportDir, 'ai-insights.json');
      await fs.writeFile(aiInsightsPath, JSON.stringify(aiInsights, null, 2));
      console.log(`✅ AI insights saved to: ${aiInsightsPath}`);
      
      // Generate AI-native dashboard
      const dashboardPath = await generateAIDashboard(scrapedData, aiInsights, scrapedData.reportDir);
      console.log(`🎯 AI Dashboard available at: ${dashboardPath}`);
      
      // Update the main report data with AI insights
      const enhancedReportData = {
        ...scrapedData,
        aiInsights,
        dashboardPath: path.basename(dashboardPath)
      };
      
      // Save enhanced report
      const enhancedReportPath = path.join(scrapedData.reportDir, 'enhanced-report.json');
      await fs.writeFile(enhancedReportPath, JSON.stringify(enhancedReportData, null, 2));
      console.log(`📊 Enhanced report with AI insights saved to: ${enhancedReportPath}`);
      
    } catch (error) {
      console.error('❌ Error during AI analysis:', error.message);
      console.error('Stack trace:', error.stack);
    }
    
    // Process with Spidergram if enabled
    if (CONFIG.useSpidergram) {
      console.log('Processing scraped data with Spidergram...');
      try {
        const result = await processWithSpidergram(scrapedData, CONFIG.spidergramConfig);
        
        if (result.success) {
          console.log(`Spidergram processing completed successfully`);
          console.log(`Spidergram export directory: ${result.exportDir}`);
          console.log(`Spidergram reports directory: ${result.reportsDir}`);
        } else {
          console.error(`Spidergram processing failed: ${result.error}`);
        }
      } catch (error) {
        console.error('Error processing with Spidergram:', error);
      }
    }
    
    console.log('🎉 Scraping and all report generation completed successfully');
    console.log(`📁 Reports available in: ${scrapedData.reportDir}`);
    console.log(`🎯 AI Dashboard: ${path.join(scrapedData.reportDir, 'ai-dashboard.html')}`);
  } else {
    console.error('No report directory was created, cannot generate reports');
  }
}

main().catch(console.error); 