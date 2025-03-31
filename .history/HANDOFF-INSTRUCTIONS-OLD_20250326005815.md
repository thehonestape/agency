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

The project follows a domain-driven component organization:

- `/src` - Main source code
  - `/components` - Reusable UI components
    - `/ui` - Core UI primitives
    - `/layouts` - Layout components and application shells
    - `/features` - Domain-specific feature components
  - `/pages` - Application pages/routes
  - `/lib` - Utility functions and shared logic
  - `/styles` - Global styles and Tailwind configuration

## Component Structure

Our components follow a three-level organization pattern:

1. **UI Components** - Core building blocks (`/components/ui/`)
   - Form elements (buttons, inputs, selects)
   - Display elements (cards, badges, alerts)
   - Feedback elements (toasts, progress)

2. **Layout Components** - Structural components (`/components/layouts/`)
   - Application shells with different navigation patterns
   - Page layouts

3. **Feature Components** - Domain-specific components (`/components/features/`)
   - Authentication - Login, registration, access control
   - Brand - Brand management and display
   - Dashboard - Analytics and reporting
   - Editor - Content editing tools
   - Marketing - Landing page elements
   - Projects - Project management tools

## Theming System

The project uses a sophisticated theming system with Tailwind integration:

1. **Single Source of Truth**: All theme variables defined in `:root` in `globals.css`
2. **Dark Mode**: Uses `.dark` class
3. **CSS Variables + Tailwind**: Modern integration pattern
4. **HSL Color Format**: For better color manipulation

## Important Documentation

- `README.md` - General project overview
- `COMPONENT-ORGANIZATION.md` - Component structure guidelines
- `GETTING-STARTED.md` - Quick start guide
- `ROADMAP.md` - Development roadmap

## Key Development Scripts

```bash
# Start development server
yarn dev

# Build for production
yarn build

# Run tests
yarn test
```

## Immediate Next Steps

The project is in early development with an emphasis on building a solid component architecture. Here are the priority areas:

### 1. Core UI Components

Implement and refine core UI components following the established patterns:

- Form controls (inputs, selects, checkboxes)
- Display elements (cards, alerts, badges)
- Navigation elements (tabs, breadcrumbs)

### 2. Application Shells

Develop application shell layouts that will be used across the app:

- Stacked layouts (navbar at top)
- Sidebar layouts (sidebar navigation)
- Multi-column layouts (multiple content areas)

### 3. Feature Components

Implement domain-specific components for each feature area:

- Brand management components
- Dashboard and analytics components
- Project management components
- Marketing components

### 4. Theme System

Enhance and refine the theming system:

- Expand theme customization options
- Ensure consistent theme application
- Improve theme switching mechanism

## Collaboration Guidelines

1. Follow the established component organization
2. Use the theming system consistently
3. Test components in both light and dark modes
4. Ensure components are accessible
5. Document component props and usage

## Common Issues & Solutions

- **Theming inconsistency**: Always use CSS variables from global.css, never hardcoded colors
- **Dark mode problems**: Verify all components use the `.dark` class system
- **Component organization**: Place components in the appropriate directory based on their domain

## Contact Information

For questions about this project, contact:
- Product Owner: [name@example.com]
- Technical Lead: [name@example.com]

## License

This project is licensed under MIT. See LICENSE file for details. 