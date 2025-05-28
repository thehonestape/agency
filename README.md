# Workhorse Platform

An AI-driven branding platform that combines AI automation with human creativity for modern brand management and collaboration.

## Features

- **Marketing Pages**: Home, Services, Pricing, and Onboarding pages
- **AI-Powered Brand Audit**: Interactive onboarding experience with brand analysis
- **Organization Management**: Create and manage organizations
- **Brand Management**: Organize brands under organizations
- **Project Management**: Manage projects within brands
- **Asset Management**: Upload and manage digital assets within projects
- **Project Phase Management**: Track projects through a four-phase workflow with phase-specific artifacts
- **AI Assistance**: AI-powered tools throughout the platform

## Technology Stack

- React 18
- TypeScript
- Tailwind CSS v4
  - Uses CSS-first configuration with `@theme` and `@utilities` directives
  - Leverages the dedicated `@tailwindcss/vite` plugin for Vite integration
  - See [THEMING.md](THEMING.md) for detailed configuration guidelines
- React Router for navigation
- Vite for fast development
- AI integration for brand analysis and insights

## Components

### Layout Components

- **RootLayout**: Application-wide layout wrapper with AI assistance integration
- **Header**: Main navigation header with responsive design
- **MainNav**: Primary navigation component

### UI Components

- **Card**: Container for content with consistent styling
- **Button**: Styled buttons with various variants
- **Input**: Form input components
- **AIQuickAccessButton**: Quick access to AI features

### Marketing Pages

- **HomePage**: Landing page with core value proposition and case studies
- **ServicesPage**: Comprehensive service offerings categorized by type
- **PricingPage**: AI-enhanced brand development pricing tiers
- **OnboardingPage**: Interactive AI-powered brand audit experience

### Application Pages

- **Dashboard**: Main application dashboard
- **Organizations**: Manage all organizations
- **Brands**: Manage brands within organizations
- **Projects**: Manage projects within brands
- **Assets**: Manage digital assets within projects
- **Project Management**: Track projects through discovery, definition, design, and development phases

### AI Features

- **AI Brand Concierge**: AI-powered assistance throughout the platform
- **AI-Powered Brand Audit**: Analytical brand assessment during onboarding
- **Single Source of Truth (SSOT)**: AI-maintained brand consistency system

## Project Structure

The Workhorse repository contains multiple projects:

- `agency/` - Main application (you are here)
- `docs/` - Documentation and design specs
- `src/` - Source code for the application

## Core Value Proposition

- **AI Meets Craftsmanship**: Blending AI efficiency with human creativity
- **The Brand Engine**: Continuous brand optimization through AI-powered analysis
- **Precision & Scale**: Balancing meticulous craft with scalable automation
- **Human-Centered**: AI as a collaborator, not a replacement

## Next Steps

### Immediate Priorities:

1. **Connect Dashboard to Marketing Pages**: Ensure smooth navigation between marketing and app sections
2. **Implement Authentication Flow**: Connect onboarding to user account creation
3. **Brand Analysis Integration**: Implement actual AI-powered brand analysis from onboarding data
4. **Services Implementation**: Build the individual service delivery pages
5. **Mobile Responsiveness**: Ensure all new marketing pages are fully responsive

### Future Enhancements:

- Develop the AI Brand Concierge functionality
- Create the Single Source of Truth (SSOT) implementation
- Build the project collaboration features
- Enhance the analytics dashboards with real-time data

## Development

To start the development server:

```bash
# Make sure you're in the agency directory
cd agency

# Start the development server
yarn dev
```

To build for production:

```bash
yarn build
```

## License

MIT

## Design Principles Implementation

The platform implements a set of advanced design principles aimed at improving user experience, accessibility, and visual coherence.

### Core Principles

1. **Perceptual Clarity**: Creating clear visual hierarchies through contrast, space, and motion
2. **Cognitive Efficiency**: Reducing mental load through logical organization and information architecture
3. **Interaction Integrity**: Ensuring predictable and responsive user interactions
4. **Emotional Resonance**: Building connections through thoughtful visual design
5. **Adaptive Interfaces**: Automatically adjusting to different contexts and user preferences
6. **Intelligent Visualization**: Presenting data in meaningful and insightful ways
7. **Predictive Assistance**: Anticipating user needs based on context and behavior
8. **Precision Craftsmanship**: Attention to details that elevate the overall experience
9. **Performance Integration**: Design that enhances perceived and actual performance
10. **Inclusive Design**: Ensuring accessibility for all users

### Implementation

These principles have been applied across:

1. **Enhanced UI Components**:

   - Button: Improved feedback, loading states, and accessibility
   - Card: Multiple variants for different contexts with consistent spacing
   - Input: Better accessibility with proper ARIA attributes and loading states
   - Select: Enhanced dropdown interactions and keyboard navigation

2. **Dashboard Components**:

   - DashboardCard: Status indicators, trend visualization, and loading states
   - DashboardGrid: Responsive layouts with cognitive grouping and priority areas
   - DashboardExample: Comprehensive example showcasing pattern implementation

3. **Design System**:

   - Color System: 60-30-10 distribution with semantic color assignments
   - Typography: Hierarchical scale with responsive sizing
   - Spacing: Consistent system for improved readability
   - Animation: Performance-optimized transitions with reduced motion support
   - Theming: Streamlined theming architecture with single source of truth (see [THEMING.md](THEMING.md))

4. **Theme Support**:
   - Light/Dark Mode: Comprehensive theme implementation
   - ThemeProvider: Context-based theme management
   - ThemeToggle: User control with preference persistence

### Example Dashboard

To view an example dashboard that showcases these principles:

1. Run the development server:

```bash
npm run dev
```

2. Open your browser and navigate to the local URL (typically http://localhost:3000)

## Next Steps

The following areas have been identified for further development:

### Component Extensions

- Apply design principles to remaining components (Tabs, Alert, Avatar, Badge)
- Create additional variants for specialized use cases
- Implement more interactive patterns for complex workflows

### Dashboard Enhancements

- Develop Brand Audit dashboard using the new components
- Create data visualization components for metrics and KPIs
- Implement interactive filtering and sorting capabilities

### Theme System Expansion

- Add additional theme variants (high contrast, colorblind modes)
- Create theme customization capabilities for client branding
- Build a theme preview and configuration interface

### AI Integration

- Enhance AI Assistant with design principles
- Apply theme support to AI interaction patterns
- Implement accessibility improvements for AI interfaces

### Documentation and Showcasing

- Build comprehensive component gallery
- Create interactive examples of component usage
- Document best practices for implementing design principles

## Documentation

For more detailed information, please refer to:

- [Design Principles](docs/DESIGN_PRINCIPLES.md)
- [Implementation Summary](IMPLEMENTATION_SUMMARY.md)
- [Theming Architecture](THEMING.md)
- [Beta Documentation](docs/beta/README.md)
- [Beta Implementation](docs/beta/implementation/design-principles-implementation.md)

## Contributing

Please see [CONTRIBUTING.md](CONTRIBUTING.md) for contribution guidelines.

## License

This project is licensed under the terms of the [LICENSE](LICENSE) file included in this repository.

## Application Structure

The application follows a well-structured architecture to promote reusability and maintainability:

- **Layouts System**: Consistent page templates using MainLayout and DashboardLayout
- **Component System**: Modular UI components organized by complexity and purpose
- **Component Registry**: Centralized registry for component discovery and management
- **Configurable Views**: Pages designed to accept different data sources

For more details on the application structure, see [APP_STRUCTURE.md](./APP_STRUCTURE.md).

# Website Scraper and Report Generator

A powerful tool for scraping websites and generating comprehensive reports about their structure, content, SEO, performance, and accessibility.

## Features

- **Comprehensive Scraping**: Crawls websites up to a specified depth
- **SEO Analysis**: Collects meta tags, titles, and canonical URLs
- **Performance Metrics**: Measures page load times and resource usage
- **Accessibility Checks**: Identifies common accessibility issues
- **Spidergram Integration**: Advanced structural analysis for complex web properties

## Integrations

### Spidergram

The scraper now integrates with [Spidergram](https://github.com/autogram-is/spidergram), a powerful tool designed for analyzing complex web properties. This integration provides:

- **Graph Database Storage**: Website structure stored in ArangoDB for powerful querying
- **Advanced Relationship Analysis**: Visualize connections between pages and domains
- **Structural Insights**: Identify navigation patterns, content hierarchies, and site architecture
- **In-depth Reports**: Generate comprehensive site structure reports

To set up the Spidergram integration:

```bash
# Install dependencies
npm install

# Set up Spidergram integration
npm run setup-spidergram
```

For detailed instructions, see [docs/spidergram-integration.md](docs/spidergram-integration.md).

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd website-scraper
```

2. Install dependencies:
```bash
npm install
```

3. Install Playwright browsers:
```bash
npx playwright install chromium
```

## Usage

### Basic Usage

To scrape a website, run:

```bash
npm run scrape <url>
```

For example:
```bash
npm run scrape https://example.com
```

### Configuration

You can modify the scraping behavior by editing the `CONFIG` object in `scripts/website-scraper.js`:

```javascript
const CONFIG = {
  maxPages: 100,    // Maximum number of pages to scrape
  maxDepth: 3,      // Maximum depth for crawling
  timeout: 30000,   // Page load timeout in ms
  outputDir: '...'  // Output directory for reports
};
```

### Output

The tool generates reports in the `src/data/scraped-sites/<timestamp>` directory:

- `pages.csv`: Detailed information about each scraped page
- `report.json`: Comprehensive report including:
  - Site structure
  - SEO data
  - Performance metrics
  - Accessibility issues
  - Page type analysis

## Report Structure

### CSV Report (pages.csv)

Contains the following columns:
- URL
- Title
- Type
- Elements (headings, links, images, forms)

### JSON Report (report.json)

Contains:
- Base URL
- Timestamp
- Summary statistics
- Detailed data for each page:
  - SEO information
  - Performance metrics
  - Accessibility issues
  - Page type classification

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request

## License

MIT License - see LICENSE file for details
