#!/bin/bash

# Component Restructuring Script
# This script helps with the migration of components to the new directory structure

# Create new directory structure
echo "Creating new directory structure..."

# Core directories
mkdir -p src/components/ui/theme
mkdir -p src/components/ui/typography
mkdir -p src/components/ui/layout

# Layout directories
mkdir -p src/components/layouts/application/stacked
mkdir -p src/components/layouts/application/sidebar
mkdir -p src/components/layouts/application/multi-column
mkdir -p src/components/layouts/page

# Feature directories
mkdir -p src/components/features/auth
mkdir -p src/components/features/dashboard
mkdir -p src/components/features/projects
mkdir -p src/components/features/marketing
mkdir -p src/components/features/brand
mkdir -p src/components/features/editor

# Examples directory
mkdir -p src/components/examples/auth
mkdir -p src/components/examples/layout

echo "Directory structure created!"

# Phase 1: UI Components (already organized)
echo "UI components are already organized in the ui/ directory."

# Phase 2: Layout Components
echo "Ready to migrate layout components."
echo "Run these commands manually to migrate application shells:"
echo "cp -r src/components/application-shells/stacked/* src/components/layouts/application/stacked/"
echo "cp -r src/components/application-shells/sidebar/* src/components/layouts/application/sidebar/"
echo "cp -r src/components/application-shells/multi-column/* src/components/layouts/application/multi-column/"

# Phase 3: Feature Components
echo "Ready to migrate feature components."
echo "Run these commands manually to migrate individual feature groups:"
echo "cp -r src/components/auth/* src/components/features/auth/"
echo "cp -r src/components/dashboard/* src/components/features/dashboard/"
echo "cp -r src/components/brand/* src/components/features/brand/"
echo "cp -r src/components/editor/* src/components/features/editor/"
echo "cp -r src/components/marketing/* src/components/features/marketing/"

echo "After migration, update the index.ts files in each directory and update imports in the components themselves."

echo "Migration plan created. Execute steps one by one to avoid breaking changes." 