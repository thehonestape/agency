# Spidergram Integration

This guide explains how to use the Spidergram integration with our website scraper to gain advanced structural analysis capabilities.

## What is Spidergram?

[Spidergram](https://github.com/autogram-is/spidergram) is a powerful toolkit designed by Autogram for crawling and analyzing complex web properties. It's particularly useful for websites that span multiple domains, CMSs, and design systems. Spidergram provides:

- Enhanced relationship visualization
- Graph database storage
- Advanced structure analysis
- Comprehensive reporting

## Prerequisites

Before using the Spidergram integration, ensure you have:

1. Node.js 18 or later
2. ArangoDB installed and running
3. Spidergram CLI installed globally

## Setup

### Automatic Setup

The easiest way to set up Spidergram integration is to use our setup script:

```bash
node scripts/tools/setup-spidergram.js
```

This script will:
- Check if Spidergram is installed (and offer to install it)
- Check if ArangoDB is running (and provide installation instructions)
- Configure Spidergram with your preferred settings
- Update the scraper configuration to enable Spidergram

### Manual Setup

If you prefer to set things up manually:

1. Install Spidergram CLI:
   ```bash
   npm install -g spidergram
   ```

2. Install ArangoDB:
   - **Mac**: `brew install arangodb`
   - **Docker**: `docker run -p 8529:8529 -e ARANGO_ROOT_PASSWORD=openSesame arangodb/arangodb`
   - **Windows/Linux**: Download from [ArangoDB website](https://www.arangodb.com/download/)

3. Create a `spidergram.config.json` file in your project root:
   ```json
   {
     "database": {
       "url": "http://localhost:8529",
       "name": "spidergram",
       "user": "root",
       "password": ""
     },
     "crawler": {
       "maxConcurrent": 5,
       "maxDepth": 3,
       "maxPages": 1000,
       "delay": 500
     },
     "reporting": {
       "outputDir": "spidergram-reports"
     }
   }
   ```

4. Enable Spidergram in the website scraper by editing the CONFIG object in `scripts/website-scraper.js`:
   ```javascript
   const CONFIG = {
     // ... other config ...
     useSpidergram: true,
     spidergramConfig: {
       arangoUrl: 'http://localhost:8529',
       arangoDb: 'spidergram',
       arangoUser: 'root',
       arangoPassword: '',
     },
     // ... other config ...
   };
   ```

## Using the Integration

Once set up, running the website scraper will automatically:

1. Scrape the specified website
2. Generate standard reports
3. Export the data to Spidergram format
4. Import the data into ArangoDB
5. Run Spidergram analysis
6. Generate Spidergram reports

```bash
npm run scrape https://example.com
```

## Advanced Usage

### Programmatic Access

You can use the Spidergram adapter directly in your code:

```javascript
import { SpidergramAdapter } from './scripts/integrations/index.js';

// Create an adapter instance
const spidergram = new SpidergramAdapter({
  arangoUrl: 'http://localhost:8529',
  arangoDb: 'my-custom-db',
  arangoUser: 'root',
  arangoPassword: 'password'
});

// Process scraped data
const result = await spidergram.processWithSpidergram(scrapedData);

console.log(`Reports generated at: ${result.reportsDir}`);
```

### Custom Configuration

You can override the default Spidergram configuration by passing a config object:

```javascript
import { processWithSpidergram } from './scripts/integrations/index.js';

const result = await processWithSpidergram(scrapedData, {
  arangoUrl: 'http://custom-arango-server:8529',
  arangoDb: 'my-project',
  exportDir: './custom-export-path'
});
```

## Troubleshooting

### ArangoDB Connection Issues

If you see errors connecting to ArangoDB:

1. Ensure ArangoDB is running: 
   ```bash
   curl http://localhost:8529/_api/version
   ```

2. Check your credentials are correct in the configuration

3. Try connecting to the ArangoDB web interface (usually at http://localhost:8529)

### Missing Dependencies

If you encounter errors related to missing modules:

```bash
npm install arangojs
```

### Spidergram Command Not Found

If the Spidergram CLI is not recognized:

1. Ensure it's installed globally:
   ```bash
   npm install -g spidergram
   ```

2. Check that global npm binaries are in your PATH

3. Try running Spidergram with the full path:
   ```bash
   npx spidergram --version
   ```

## Further Resources

- [Spidergram GitHub Repository](https://github.com/autogram-is/spidergram)
- [ArangoDB Documentation](https://www.arangodb.com/docs/)
- [Graph Visualization Guide](https://www.arangodb.com/docs/stable/arangograph/graphstudio.html) 