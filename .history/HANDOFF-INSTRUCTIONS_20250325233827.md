# Workhorse Agency Project Handoff Instructions

## Quick Start

```bash
# Clone the repository
git clone git@github.com:your-org/agency.git

# Navigate to project directory
cd agency

# Install dependencies
yarn install

# Start the development server
yarn dev
```

## Project Overview

The Workhorse Agency project is an AI-driven branding platform that combines AI automation with human creativity for modern brand management and collaboration. It features marketing pages, AI-powered brand audits, organization/brand/project management, and more.

### Core Technology Stack

- **Frontend**: React 18 with TypeScript
- **Styling**: Tailwind CSS v4
- **Build Tool**: Vite
- **Additional Libraries**: 
  - React Router for navigation
  - Framer Motion for animations
  - Radix UI for accessible components
  - Various AI integration libraries

## Environment Setup

1. Create a `.env` file based on `.env.example`
2. For local development, you'll need:
   - Node.js v18+ 
   - Yarn or npm
   - Access to API keys (if applicable)

## Project Architecture

The project follows a structured organization:

- `/src` - Main source code
  - `/components` - Reusable UI components
  - `/pages` - Application pages/routes
  - `/lib` - Utility functions and shared logic
  - `/styles` - Global styles and Tailwind configuration
  - `/tailwindplus` - External Tailwind component libraries

## Theming System

The project uses a sophisticated theming system with Tailwind v4 integration:

1. **Single Source of Truth**: All theme variables defined in `:root` in `globals.css`
2. **Dark Mode**: Uses `.dark` class (not data attributes)
3. **CSS Variables + Tailwind v4**: Modern integration pattern
4. **OKLCH Color Format**: For better color manipulation

**Important:** Read `THEMING.md` before making any theme-related changes.

## Important Documentation

- `README.md` - General project overview
- `THEMING.md` - Theming architecture guidelines
- `TAILWINDPLUS-INTEGRATION.md` - Strategy for integrating external components
- `THEMING-COMPONENT-AUDIT.md` - Status of UI components and theming compliance
- `IMPLEMENTATION_SUMMARY.md` - Details on implementation patterns

## Key Development Scripts

```bash
# Start development server
yarn dev

# Build for production
yarn build

# Run tests
yarn test

# Initialize Workhorse brand (if needed)
yarn init:workhorse

# Update component audit
yarn update-component-audit
```

## Immediate Next Steps

### 1. Component Implementation

The project needs standard UI components built with proper theming integration:

- **Priority 1**: Core components like `Button`, `Card`, `Input` already exist but need review
- **Priority 2**: Implement application shell components (layouts, navigation)
- **Priority 3**: Implement data display components (tables, lists, etc.)

Refer to `THEMING-COMPONENT-AUDIT.md` for the full list of components to implement.

### 2. TailwindPlus Integration

Several external components from the TailwindPlus libraries need to be adapted:

- **High Priority**: `ThemeSelector`, `Callout`, `QuickLinks`, `Pricing`, `Testimonials`
- **Medium Priority**: `Search`, `Tag`, `TableOfContents`, etc.

Follow the guide in `TAILWINDPLUS-INTEGRATION.md` for adaptation methodology.

### 3. Marketing Pages

Connect dashboard to marketing pages and ensure:
- Smooth navigation between marketing and app sections
- Authentication flow connected to onboarding
- Brand analysis integration with AI
- Mobile responsiveness

### 4. Brand Management Features

Implement the core brand management functionality:
- Organization management
- Brand creation and management
- Project workflow system
- Asset repository

## Collaboration Guidelines

1. Follow the theming architecture strictly
2. Document component creation in the component audit
3. Test both light and dark modes for all UI changes
4. Use TypeScript interfaces for component props
5. Ensure components are accessible (ARIA support)

## Common Issues & Solutions

- **Theming inconsistency**: Always use CSS variables from global.css, never hardcoded colors
- **Dark mode problems**: Verify all components use the `.dark` class system
- **Component adaptation**: When adapting TailwindPlus components, rewrite them to use our theme variables

## Contact Information

For questions about this project, contact:
- Product Owner: [name@example.com]
- Technical Lead: [name@example.com]

## License

This project is licensed under MIT. See LICENSE file for details. 