#!/usr/bin/env node

/**
 * Component Generator Script
 * 
 * This script generates themed components following our project's structure and theming best practices.
 * 
 * Usage:
 * node generate-component.js [category] [componentName]
 * 
 * Example:
 * node generate-component.js ui Button
 * node generate-component.js marketing Hero
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Command line arguments
const [category, componentName] = process.argv.slice(2);

if (!category || !componentName) {
  console.error('Usage: node generate-component.js [category] [componentName]');
  process.exit(1);
}

// Validate component name
if (!/^[A-Z][A-Za-z0-9]*$/.test(componentName)) {
  console.error('Component name must be in PascalCase');
  process.exit(1);
}

const componentFileName = componentName.charAt(0).toLowerCase() + componentName.slice(1) + '.tsx';
const componentCamelCase = componentName.charAt(0).toLowerCase() + componentName.slice(1);

// Define valid categories
const validCategories = [
  'ui',
  'marketing',
  'application-shells',
  'forms',
  'data-display',
  'navigation',
  'overlays',
  'feedback',
  'brand',
  'dashboard',
  'editor'
];

if (!validCategories.includes(category)) {
  console.error(`Invalid category. Valid categories are: ${validCategories.join(', ')}`);
  process.exit(1);
}

// Directory path
const componentsDir = path.join(process.cwd(), 'src', 'components');
const categoryDir = path.join(componentsDir, category);
const componentDir = category === 'ui' ? path.join(categoryDir, componentCamelCase) : null;
const targetDir = componentDir || categoryDir;

// Create directories if they don't exist
if (!fs.existsSync(categoryDir)) {
  fs.mkdirSync(categoryDir, { recursive: true });
}

if (componentDir && !fs.existsSync(componentDir)) {
  fs.mkdirSync(componentDir, { recursive: true });
}

// Component template functions
const getComponentTemplate = () => {
  const template = `import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const ${componentCamelCase}Variants = cva(
  "themed-component", // Base className
  {
    variants: {
      variant: {
        default: "bg-background text-foreground",
        primary: "bg-primary text-primary-foreground",
        secondary: "bg-secondary text-secondary-foreground",
        muted: "bg-muted text-muted-foreground",
      },
      size: {
        default: "p-4",
        sm: "p-2 text-sm",
        lg: "p-6 text-lg",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ${componentName}Props
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof ${componentCamelCase}Variants> {}

const ${componentName} = React.forwardRef<HTMLDivElement, ${componentName}Props>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <div
        className={cn(${componentCamelCase}Variants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);

${componentName}.displayName = "${componentName}";

export { ${componentName}, ${componentCamelCase}Variants };
`;
  return template;
};

const getIndexTemplate = () => {
  return `export * from './${componentCamelCase}';\n`;
};

const getTestTemplate = () => {
  return `import * as React from "react";
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { ${componentName} } from "./${componentCamelCase}";

describe("${componentName}", () => {
  it("renders correctly", () => {
    render(<${componentName}>Test content</${componentName}>);
    expect(screen.getByText("Test content")).toBeInTheDocument();
  });

  it("applies variant styles", () => {
    render(<${componentName} variant="primary">Primary variant</${componentName}>);
    const element = screen.getByText("Primary variant");
    expect(element).toHaveClass("bg-primary");
    expect(element).toHaveClass("text-primary-foreground");
  });

  it("applies size classes", () => {
    render(<${componentName} size="lg">Large size</${componentName}>);
    const element = screen.getByText("Large size");
    expect(element).toHaveClass("p-6");
    expect(element).toHaveClass("text-lg");
  });
});
`;
};

// Write files
const componentPath = path.join(targetDir, componentFileName);
const indexPath = componentDir ? path.join(componentDir, 'index.ts') : null;
const testPath = componentDir ? path.join(componentDir, `${componentCamelCase}.test.tsx`) : path.join(categoryDir, `${componentCamelCase}.test.tsx`);

// Create component file
fs.writeFileSync(componentPath, getComponentTemplate());
console.log(`Component created: ${componentPath}`);

// Create index file for ui components
if (indexPath) {
  fs.writeFileSync(indexPath, getIndexTemplate());
  console.log(`Index file created: ${indexPath}`);
}

// Create test file
fs.writeFileSync(testPath, getTestTemplate());
console.log(`Test file created: ${testPath}`);

// Update the category index file if it doesn't export the component
const categoryIndexPath = path.join(categoryDir, 'index.ts');
if (!fs.existsSync(categoryIndexPath)) {
  fs.writeFileSync(categoryIndexPath, componentDir 
    ? `export * from './${componentCamelCase}';\n` 
    : `export * from './${componentCamelCase}';\n`);
  console.log(`Category index created: ${categoryIndexPath}`);
} else {
  const indexContent = fs.readFileSync(categoryIndexPath, 'utf8');
  const exportStatement = componentDir 
    ? `export * from './${componentCamelCase}';` 
    : `export * from './${componentCamelCase}';`;
  
  if (!indexContent.includes(exportStatement)) {
    fs.appendFileSync(categoryIndexPath, `${exportStatement}\n`);
    console.log(`Updated category index: ${categoryIndexPath}`);
  }
}

// Update component audit file
const updateComponentAudit = () => {
  try {
    const auditPath = path.join(process.cwd(), 'THEMING-COMPONENT-AUDIT.md');
    if (fs.existsSync(auditPath)) {
      let auditContent = fs.readFileSync(auditPath, 'utf8');
      
      // Find the section based on category and check if component already exists
      const categoryRegex = new RegExp(`## ${category === 'ui' ? 'Core UI Components' : 'Application UI Components'}[\\s\\S]*?\\| ${componentName}\\s+\\|`, 'i');
      const categoryMatch = auditContent.match(categoryRegex);
      
      if (!categoryMatch) {
        console.log(`Component audit not updated: Couldn't find appropriate section for ${componentName}`);
        return;
      }
      
      // Component already exists in audit
      if (categoryMatch[0].includes(`| ${componentName} |`)) {
        console.log(`Component ${componentName} already exists in audit file`);
        return;
      }
      
      // Add component to audit with implementation status
      const componentLine = `| ${componentName} | ✅ Yes | ✅ Yes | ✅ Yes | None - fully compliant |\n`;
      
      // Find the table to insert into
      const tableRegex = /\| Component.*?\|\n\|[\s-]*\|\n([\s\S]*?)(?=\n\n|\n##|$)/g;
      let match;
      let updated = false;
      
      while ((match = tableRegex.exec(auditContent)) !== null) {
        if (match.index > categoryMatch.index) {
          // Found the right table, insert our component row
          const tableContent = match[1];
          const updatedTable = tableContent + componentLine;
          auditContent = auditContent.substring(0, match.index + match[0].length - tableContent.length) + 
                         updatedTable + 
                         auditContent.substring(match.index + match[0].length);
          updated = true;
          break;
        }
      }
      
      if (updated) {
        fs.writeFileSync(auditPath, auditContent);
        console.log(`Component audit updated: ${auditPath}`);
      } else {
        console.log(`Component audit not updated: Couldn't find the right place to insert ${componentName}`);
      }
    }
  } catch (error) {
    console.error(`Error updating component audit: ${error.message}`);
  }
};

updateComponentAudit();

console.log(`\n✅ ${componentName} component successfully generated!`);
console.log(`Run 'yarn dev' to see your component in action.`); 