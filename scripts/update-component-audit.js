#!/usr/bin/env node

/**
 * Update Component Audit Document
 *
 * This script updates the THEMING-COMPONENT-AUDIT.md file with the latest
 * component information scraped from Tailwind UI.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get current file path in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Paths
const AUDIT_PATH = path.join(__dirname, '../THEMING-COMPONENT-AUDIT.md');
const COMPONENTS_JSON_PATH = path.join(
  __dirname,
  '../src/data/components/tailwind-components.json'
);
const COMPONENTS_DIR = path.join(__dirname, '../src/components');

// Read the existing audit file
const readAuditFile = () => {
  if (fs.existsSync(AUDIT_PATH)) {
    return fs.readFileSync(AUDIT_PATH, 'utf8');
  }
  return null;
};

// Read the components data
const readComponentsData = () => {
  if (fs.existsSync(COMPONENTS_JSON_PATH)) {
    return JSON.parse(fs.readFileSync(COMPONENTS_JSON_PATH, 'utf8'));
  }
  return { categories: [] };
};

// Count components in a directory
const countComponentsInDir = (dirPath) => {
  try {
    const files = fs.readdirSync(dirPath);
    return files.filter((file) => file.endsWith('.tsx') && !file.includes('index')).length;
  } catch (err) {
    return 0;
  }
};

// Get total count of components
const getTotalComponentCount = () => {
  const data = readComponentsData();
  return data.categories.reduce((total, category) => {
    return (
      total +
      category.sections.reduce((sectionTotal, section) => {
        return sectionTotal + section.components.length;
      }, 0)
    );
  }, 0);
};

// Get implemented count of components
const getImplementedComponentCount = () => {
  let total = 0;

  // Walk through the components directory
  const categories = fs
    .readdirSync(COMPONENTS_DIR)
    .filter((item) => fs.statSync(path.join(COMPONENTS_DIR, item)).isDirectory());

  for (const category of categories) {
    const categoryPath = path.join(COMPONENTS_DIR, category);

    const sections = fs
      .readdirSync(categoryPath)
      .filter((item) => fs.statSync(path.join(categoryPath, item)).isDirectory());

    for (const section of sections) {
      const sectionPath = path.join(categoryPath, section);
      total += countComponentsInDir(sectionPath);
    }
  }

  return total;
};

// Generate section for Application UI components
const generateApplicationUISection = () => {
  const data = readComponentsData();
  const appUICategory = data.categories.find((c) => c.id === 'application-ui');

  if (!appUICategory) {
    return '## Application UI Components\n\nNo Application UI components found in the registry.\n';
  }

  let content = '## Application UI Components\n\n';

  for (const section of appUICategory.sections) {
    content += `### ${section.name}\n\n`;
    content += '| Component | Implemented | Theme Compliant | Actions Needed |\n';
    content += '|-----------|-------------|-----------------|----------------|\n';

    for (const component of section.components) {
      const componentDir = path.join(
        COMPONENTS_DIR,
        appUICategory.id.replace(/-/g, '-'),
        section.name.toLowerCase().replace(/\s+/g, '-')
      );

      const componentName = component.name
        .split(' ')
        .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
        .join('')
        .replace(/[^a-zA-Z0-9]/g, '');

      const componentPath = path.join(componentDir, `${componentName}.tsx`);
      const isImplemented = fs.existsSync(componentPath);

      content += `| ${component.name} | ${isImplemented ? '✅ Yes' : '❌ No'} | ❓ Unknown | ${isImplemented ? 'Check theme variables' : 'Implement component'} |\n`;
    }

    content += '\n';
  }

  return content;
};

// Generate section for Ecommerce components
const generateEcommerceSection = () => {
  const data = readComponentsData();
  const ecommerceCategory = data.categories.find((c) => c.id === 'ecommerce');

  if (!ecommerceCategory) {
    return '## Ecommerce Components\n\nNo Ecommerce components found in the registry.\n';
  }

  let content = '## Ecommerce Components\n\n';

  for (const section of ecommerceCategory.sections) {
    content += `### ${section.name}\n\n`;
    content += '| Component | Implemented | Theme Compliant | Actions Needed |\n';
    content += '|-----------|-------------|-----------------|----------------|\n';

    for (const component of section.components) {
      const componentDir = path.join(
        COMPONENTS_DIR,
        ecommerceCategory.id.replace(/-/g, '-'),
        section.name.toLowerCase().replace(/\s+/g, '-')
      );

      const componentName = component.name
        .split(' ')
        .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
        .join('')
        .replace(/[^a-zA-Z0-9]/g, '');

      const componentPath = path.join(componentDir, `${componentName}.tsx`);
      const isImplemented = fs.existsSync(componentPath);

      content += `| ${component.name} | ${isImplemented ? '✅ Yes' : '❌ No'} | ❓ Unknown | ${isImplemented ? 'Check theme variables' : 'Implement component'} |\n`;
    }

    content += '\n';
  }

  return content;
};

// Generate section for Marketing components
const generateMarketingSection = () => {
  const data = readComponentsData();
  const marketingCategory = data.categories.find((c) => c.id === 'marketing');

  if (!marketingCategory) {
    return '## Marketing Components\n\nNo Marketing components found in the registry.\n';
  }

  let content = '## Marketing Components\n\n';

  for (const section of marketingCategory.sections) {
    content += `### ${section.name}\n\n`;
    content += '| Component | Implemented | Theme Compliant | Actions Needed |\n';
    content += '|-----------|-------------|-----------------|----------------|\n';

    for (const component of section.components) {
      const componentDir = path.join(
        COMPONENTS_DIR,
        marketingCategory.id.replace(/-/g, '-'),
        section.name.toLowerCase().replace(/\s+/g, '-')
      );

      const componentName = component.name
        .split(' ')
        .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
        .join('')
        .replace(/[^a-zA-Z0-9]/g, '');

      const componentPath = path.join(componentDir, `${componentName}.tsx`);
      const isImplemented = fs.existsSync(componentPath);

      content += `| ${component.name} | ${isImplemented ? '✅ Yes' : '❌ No'} | ❓ Unknown | ${isImplemented ? 'Check theme variables' : 'Implement component'} |\n`;
    }

    content += '\n';
  }

  return content;
};

// Update the audit file
const updateAuditFile = () => {
  const existingContent = readAuditFile();
  const totalComponents = getTotalComponentCount();
  const implementedComponents = getImplementedComponentCount();
  const implementationPercentage = Math.round((implementedComponents / totalComponents) * 100) || 0;

  const appUISection = generateApplicationUISection();
  const ecommerceSection = generateEcommerceSection();
  const marketingSection = generateMarketingSection();

  // Create a new audit file or update the existing one
  const progressSection = `
## Progress Tracker

- Total components in Tailwind UI: ${totalComponents}
- Implemented components: ${implementedComponents} (${implementationPercentage}%)
- Remaining to implement: ${totalComponents - implementedComponents}
- Implementation progress: ${implementationPercentage}%
`;

  if (!existingContent) {
    // Create a new audit file
    const newContent = `# UI Component Theming Audit

This document tracks the status of UI components and their alignment with our theming architecture.

${appUISection}

${ecommerceSection}

${marketingSection}

${progressSection}

## Theming Guidelines

For component implementation, use these CSS variables:

| Component Part | Theme Variable |
|----------------|---------------|
| Primary backgrounds | \`bg-primary\` |
| Primary text | \`text-primary-foreground\` |
| Secondary backgrounds | \`bg-secondary\` |
| Secondary text | \`text-secondary-foreground\` |
| Muted backgrounds | \`bg-muted\` |
| Muted text | \`text-muted-foreground\` |
| Accent backgrounds | \`bg-accent\` |
| Accent text | \`text-accent-foreground\` |
| Card backgrounds | \`bg-card\` |
| Card text | \`text-card-foreground\` |
| Default text | \`text-foreground\` |
| Page backgrounds | \`bg-background\` |
| Border colors | \`border-border\` or \`border-input\` |

## How to Update Components

1. **Review component implementation**:
   - Check if it uses hardcoded Tailwind colors
   - Identify any dark mode implementations using \`dark:\` variants
   
2. **Replace with theme variables**:
   - Replace hardcoded colors with theme variables
   - Remove direct \`dark:\` variants (handled by CSS variables)
   
3. **Ensure dark mode compatibility**:
   - Verify component looks correct in dark mode without explicit dark variants`;

    fs.writeFileSync(AUDIT_PATH, newContent);
    console.log(`Created new audit file: ${AUDIT_PATH}`);
  } else {
    // Update the existing audit file - this is a simplistic approach
    // In practice, you might want a more sophisticated update strategy
    const appUIRegex = /## Application UI Components[\s\S]*?(?=\n## |$)/;
    const ecommerceRegex = /## Ecommerce Components[\s\S]*?(?=\n## |$)/;
    const marketingRegex = /## Marketing Components[\s\S]*?(?=\n## |$)/;
    const progressRegex = /## Progress Tracker[\s\S]*?(?=\n## |$)/;

    let updatedContent = existingContent;

    // Update Application UI section
    if (updatedContent.match(appUIRegex)) {
      updatedContent = updatedContent.replace(appUIRegex, appUISection);
    } else {
      // Insert after the introduction
      updatedContent = updatedContent.replace(
        /(?<=This document tracks.*\n\n)/,
        `${appUISection}\n`
      );
    }

    // Update Ecommerce section
    if (updatedContent.match(ecommerceRegex)) {
      updatedContent = updatedContent.replace(ecommerceRegex, ecommerceSection);
    } else {
      // Insert after Application UI section
      if (updatedContent.match(appUIRegex)) {
        updatedContent = updatedContent.replace(
          /(?<=## Application UI Components[\s\S]*?)(?=\n## |$)/,
          `\n\n${ecommerceSection}`
        );
      } else {
        // Insert after the introduction if no Application UI section
        updatedContent = updatedContent.replace(
          /(?<=This document tracks.*\n\n)/,
          `${ecommerceSection}\n`
        );
      }
    }

    // Update Marketing section
    if (updatedContent.match(marketingRegex)) {
      updatedContent = updatedContent.replace(marketingRegex, marketingSection);
    } else {
      // Insert after Ecommerce section or Application UI section
      if (updatedContent.match(ecommerceRegex)) {
        updatedContent = updatedContent.replace(
          /(?<=## Ecommerce Components[\s\S]*?)(?=\n## |$)/,
          `\n\n${marketingSection}`
        );
      } else if (updatedContent.match(appUIRegex)) {
        updatedContent = updatedContent.replace(
          /(?<=## Application UI Components[\s\S]*?)(?=\n## |$)/,
          `\n\n${marketingSection}`
        );
      } else {
        // Insert after the introduction if no other sections
        updatedContent = updatedContent.replace(
          /(?<=This document tracks.*\n\n)/,
          `${marketingSection}\n`
        );
      }
    }

    // Update Progress Tracker section
    if (updatedContent.match(progressRegex)) {
      updatedContent = updatedContent.replace(progressRegex, progressSection);
    } else {
      // Insert before the theming guidelines
      updatedContent = updatedContent.replace(/(?=## Theming Guidelines)/, `${progressSection}\n`);
    }

    fs.writeFileSync(AUDIT_PATH, updatedContent);
    console.log(`Updated existing audit file: ${AUDIT_PATH}`);
  }
};

// Run the script
updateAuditFile();
