#!/usr/bin/env node

/**
 * This script extracts and organizes component data from the scraped Tailwind Plus files
 */

import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Define paths
const dataDir = path.join(__dirname, '..', 'src', 'data', 'tailwind-plus');
const outputDir = path.join(__dirname, '..', 'src', 'data', 'components');

// Ensure output directory exists
async function ensureOutputDirExists() {
  try {
    await fs.mkdir(outputDir, { recursive: true });
    console.log(`Created output directory: ${outputDir}`);
  } catch (error) {
    console.error(`Error creating output directory: ${error.message}`);
  }
}

// Extract and organize component data
async function extractComponents() {
  await ensureOutputDirExists();

  try {
    // Read all JSON files in the tailwind-plus directory
    const files = await fs.readdir(dataDir);
    const jsonFiles = files.filter((file) => file.endsWith('.json'));

    const allComponents = {
      categories: [],
    };

    // Process each file
    for (const file of jsonFiles) {
      const filePath = path.join(dataDir, file);
      const data = JSON.parse(await fs.readFile(filePath, 'utf8'));

      // Get category name from filename
      const category = file.replace('.json', '');

      // Get components organized by section
      const components = data.components.reduce((acc, component) => {
        const section = component.section || 'Other';

        if (!acc[section]) {
          acc[section] = [];
        }

        const countMatch = component.count ? component.count.match(/(\d+)/) : null;
        const count = countMatch ? parseInt(countMatch[1]) : 0;

        acc[section].push({
          name: component.name,
          url: component.href,
          count: count,
          type: component.count && component.count.includes('examples') ? 'example' : 'component',
        });

        return acc;
      }, {});

      // Add to allComponents
      allComponents.categories.push({
        id: category,
        name: formatCategoryName(category),
        sections: Object.entries(components).map(([sectionName, items]) => ({
          name: sectionName,
          components: items,
        })),
      });
    }

    // Write organized data to file
    const outputPath = path.join(outputDir, 'tailwind-components.json');
    await fs.writeFile(outputPath, JSON.stringify(allComponents, null, 2));

    console.log(`Extracted component data saved to ${outputPath}`);
  } catch (error) {
    console.error('Error extracting components:', error);
  }
}

// Format category name (e.g., "application-ui" -> "Application UI")
function formatCategoryName(category) {
  return category
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

// Run the extractor
extractComponents().catch(console.error);
