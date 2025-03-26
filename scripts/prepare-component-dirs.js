#!/usr/bin/env node

/**
 * Prepare Component Directory Structure
 * This script creates the directory structure for Tailwind UI components
 * based on the Application UI categories.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get current file path in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Base component directory
const COMPONENTS_DIR = path.join(__dirname, '..', 'src', 'components');

// Application UI component categories and sections
const APP_UI_STRUCTURE = {
  'application-shells': [
    'stacked-layouts',
    'sidebar-layouts',
    'multi-column-layouts'
  ],
  'headings': [
    'page-headings',
    'card-headings',
    'section-headings'
  ],
  'data-display': [
    'description-lists',
    'stats',
    'calendars'
  ],
  'lists': [
    'stacked-lists',
    'tables',
    'grid-lists',
    'feeds'
  ],
  'forms': [
    'form-layouts',
    'input-groups',
    'select-menus',
    'sign-in-registration',
    'textareas',
    'radio-groups',
    'checkboxes',
    'toggles',
    'action-panels',
    'comboboxes'
  ],
  'feedback': [
    'alerts',
    'empty-states'
  ],
  'navigation': [
    'navbars',
    'pagination',
    'tabs',
    'vertical-navigation',
    'sidebar-navigation',
    'breadcrumbs',
    'progress-bars',
    'command-palettes'
  ],
  'overlays': [
    'modal-dialogs',
    'drawers',
    'notifications'
  ],
  'elements': [
    'avatars',
    'badges',
    'dropdowns',
    'buttons',
    'button-groups'
  ],
  'layout': [
    'containers',
    'cards',
    'list-containers',
    'media-objects',
    'dividers'
  ],
  'page-examples': [
    'home-screens',
    'detail-screens',
    'settings-screens'
  ]
};

// Ecommerce component categories and sections
const ECOMMERCE_STRUCTURE = {
  'product-elements': [
    'product-overviews',
    'product-lists',
    'category-previews',
    'shopping-carts',
    'category-filters',
    'product-quickviews',
    'product-features'
  ],
  'store-navigation': [
    'store-navigation'
  ],
  'page-sections': [
    'promo-sections'
  ],
  'checkout': [
    'checkout-forms',
    'order-summaries',
    'order-history'
  ],
  'elements': [
    'reviews',
    'incentives'
  ],
  'page-examples': [
    'product-pages',
    'category-pages',
    'shopping-cart-pages',
    'checkout-pages',
    'customer-account-pages'
  ]
};

// Marketing component categories and sections
const MARKETING_STRUCTURE = {
  'page-sections': [
    'hero-sections',
    'feature-sections',
    'cta-sections',
    'bento-grids',
    'pricing-sections',
    'header-sections',
    'newsletter-sections',
    'stats',
    'testimonials',
    'blog-sections',
    'contact-sections',
    'team-sections',
    'content-sections',
    'logo-clouds',
    'faqs',
    'footers'
  ],
  'elements': [
    'headers',
    'flyout-menus',
    'banners'
  ],
  'feedback': [
    '404-pages'
  ],
  'page-examples': [
    'landing-pages',
    'pricing-pages',
    'about-pages'
  ]
};

// Combine all structures
const COMPONENT_STRUCTURE = {
  ...APP_UI_STRUCTURE,
  ...ECOMMERCE_STRUCTURE,
  ...MARKETING_STRUCTURE
};

// Create directory if it doesn't exist
const createDirIfNotExists = (dirPath) => {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
    console.log(`Created directory: ${dirPath}`);
    return true;
  }
  return false;
};

// Create index.ts file with placeholder content
const createIndexFile = (dirPath, isCategory = false) => {
  const indexPath = path.join(dirPath, 'index.ts');
  
  if (!fs.existsSync(indexPath)) {
    let content;
    
    if (isCategory) {
      // For category directories, export from all section directories
      const sections = COMPONENT_STRUCTURE[path.basename(dirPath)] || [];
      content = sections.map(section => `export * from './${section}';`).join('\n');
    } else {
      // For section directories, just add a placeholder comment
      content = '// Component exports will be added here by the scraper';
    }
    
    fs.writeFileSync(indexPath, content);
    console.log(`Created index file: ${indexPath}`);
  }
};

// Create placeholder README file
const createReadmeFile = (dirPath, name) => {
  const readmePath = path.join(dirPath, 'README.md');
  
  if (!fs.existsSync(readmePath)) {
    const content = `# ${name.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}\n\nTailwind UI components for ${name.replace(/-/g, ' ')}.`;
    
    fs.writeFileSync(readmePath, content);
    console.log(`Created README file: ${readmePath}`);
  }
};

// Main function to create the directory structure
const createDirectoryStructure = () => {
  console.log('Creating component directory structure...');
  
  // Create the main components directory if it doesn't exist
  createDirIfNotExists(COMPONENTS_DIR);
  
  // Process each category
  for (const [category, sections] of Object.entries(COMPONENT_STRUCTURE)) {
    const categoryPath = path.join(COMPONENTS_DIR, category);
    
    // Create category directory
    if (createDirIfNotExists(categoryPath)) {
      createReadmeFile(categoryPath, category);
    }
    
    // Create index.ts for the category
    createIndexFile(categoryPath, true);
    
    // Process each section
    for (const section of sections) {
      const sectionPath = path.join(categoryPath, section);
      
      // Create section directory
      if (createDirIfNotExists(sectionPath)) {
        createReadmeFile(sectionPath, section);
      }
      
      // Create index.ts for the section
      createIndexFile(sectionPath, false);
    }
  }
  
  console.log('\nDirectory structure created successfully!');
};

// Run the script
createDirectoryStructure(); 