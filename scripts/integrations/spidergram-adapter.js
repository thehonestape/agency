/**
 * Spidergram Integration Adapter
 * 
 * This adapter exports our website scraper data to Spidergram's format
 * and provides utilities to leverage Spidergram's analysis capabilities.
 */

import fs from 'fs/promises';
import path from 'path';
import { spawn } from 'child_process';
import { Database } from 'arangojs';

class SpidergramAdapter {
  constructor(config = {}) {
    this.config = {
      arangoUrl: 'http://localhost:8529',
      arangoDb: 'spidergram',
      arangoUser: 'root',
      arangoPassword: '',
      spidergramBin: 'spidergram', // Assumes spidergram is installed globally
      exportDir: './spidergram-export',
      ...config
    };
    
    this.db = null;
    this.connected = false;
  }

  /**
   * Connect to ArangoDB
   */
  async connect() {
    try {
      this.db = new Database({
        url: this.config.arangoUrl,
        databaseName: this.config.arangoDb,
        auth: {
          username: this.config.arangoUser,
          password: this.config.arangoPassword
        }
      });
      
      // Check if connected
      const dbInfo = await this.db.get();
      this.connected = true;
      console.log(`Connected to ArangoDB: ${dbInfo.name}`);
      return true;
    } catch (error) {
      console.error('Failed to connect to ArangoDB:', error.message);
      return false;
    }
  }

  /**
   * Transform our scraper data to Spidergram's format
   */
  transformData(scrapedData) {
    // Pages collection
    const pages = scrapedData.pages.map(page => {
      // Transform to Spidergram's page format
      return {
        _key: this.normalizeKey(page.url),
        url: page.url,
        title: page.title,
        type: page.type || 'unknown',
        content: page.content || '',
        metadata: {
          headings: page.elements?.headings || [],
          images: page.elements?.images || [],
          forms: page.elements?.forms || [],
          timestamp: new Date().toISOString(),
          screenshot: page.screenshot || null,
          colors: scrapedData.brandElements?.colors || [],
          fonts: scrapedData.brandElements?.fonts || []
        }
      };
    });

    // Links collection (edges in Spidergram)
    const links = scrapedData.links.map(link => {
      return {
        _from: `pages/${this.normalizeKey(link.from)}`,
        _to: `pages/${this.normalizeKey(link.to)}`,
        text: link.text || '',
        type: 'link'
      };
    });

    return { pages, links };
  }

  /**
   * Create a valid key for ArangoDB from URL
   */
  normalizeKey(url) {
    return url
      .replace(/^https?:\/\//, '')
      .replace(/[^a-zA-Z0-9]/g, '_')
      .substring(0, 64);
  }

  /**
   * Export data to Spidergram-compatible format
   */
  async exportToSpidergram(scrapedData, outputDir = this.config.exportDir) {
    try {
      // Ensure the export directory exists
      await fs.mkdir(outputDir, { recursive: true });

      // Transform our data to Spidergram's format
      const { pages, links } = this.transformData(scrapedData);

      // Export pages and links to JSON files
      await fs.writeFile(
        path.join(outputDir, 'pages.json'),
        JSON.stringify(pages, null, 2)
      );

      await fs.writeFile(
        path.join(outputDir, 'links.json'),
        JSON.stringify(links, null, 2)
      );

      // Create a Spidergram config
      const spidergramConfig = {
        database: {
          url: this.config.arangoUrl,
          name: this.config.arangoDb,
          user: this.config.arangoUser,
          password: this.config.arangoPassword
        },
        crawler: {
          maxPages: 0, // Don't crawl, just use imported data
          maxDepth: 0
        },
        reporting: {
          outputDir: path.join(outputDir, 'reports')
        }
      };

      await fs.writeFile(
        path.join(outputDir, 'spidergram.config.json'),
        JSON.stringify(spidergramConfig, null, 2)
      );

      console.log(`Data exported for Spidergram to ${outputDir}`);
      return outputDir;
    } catch (error) {
      console.error('Failed to export data for Spidergram:', error);
      throw error;
    }
  }

  /**
   * Import data directly to ArangoDB for Spidergram
   */
  async importToArangoDB(scrapedData) {
    if (!this.connected) {
      await this.connect();
    }

    if (!this.connected) {
      throw new Error('Cannot import to ArangoDB: not connected');
    }

    try {
      // Ensure collections exist
      const pagesCollection = this.db.collection('pages');
      const linksCollection = this.db.collection('links');

      // Create collections if they don't exist
      try {
        await pagesCollection.create();
        console.log('Created pages collection');
      } catch (e) {
        if (e.code !== 409) throw e; // 409 = collection already exists
      }

      try {
        await linksCollection.create({ type: 3 }); // Type 3 = edge collection
        console.log('Created links collection');
      } catch (e) {
        if (e.code !== 409) throw e;
      }

      // Transform our data to Spidergram's format
      const { pages, links } = this.transformData(scrapedData);

      // Insert pages (vertices)
      console.log(`Importing ${pages.length} pages to ArangoDB...`);
      for (const page of pages) {
        try {
          await pagesCollection.save(page, { overwriteMode: 'update' });
        } catch (e) {
          console.error(`Error saving page ${page.url}:`, e.message);
        }
      }

      // Insert links (edges)
      console.log(`Importing ${links.length} links to ArangoDB...`);
      for (const link of links) {
        try {
          await linksCollection.save(link, { overwriteMode: 'update' });
        } catch (e) {
          console.error(`Error saving link ${link._from} -> ${link._to}:`, e.message);
        }
      }

      console.log('Data successfully imported to ArangoDB');
      return true;
    } catch (error) {
      console.error('Failed to import data to ArangoDB:', error);
      throw error;
    }
  }

  /**
   * Execute Spidergram analysis
   */
  async runSpidergramAnalysis(targetDir = this.config.exportDir) {
    return new Promise((resolve, reject) => {
      const spidergram = spawn(this.config.spidergramBin, ['analyze'], {
        cwd: targetDir,
        stdio: 'inherit'
      });

      spidergram.on('close', (code) => {
        if (code === 0) {
          console.log('Spidergram analysis completed successfully');
          resolve(true);
        } else {
          console.error(`Spidergram analysis failed with code ${code}`);
          reject(new Error(`Spidergram exited with code ${code}`));
        }
      });

      spidergram.on('error', (err) => {
        console.error('Failed to start Spidergram:', err);
        reject(err);
      });
    });
  }

  /**
   * Generate Spidergram reports
   */
  async generateSpidergramReports(targetDir = this.config.exportDir) {
    return new Promise((resolve, reject) => {
      const spidergram = spawn(this.config.spidergramBin, ['report'], {
        cwd: targetDir,
        stdio: 'inherit'
      });

      spidergram.on('close', (code) => {
        if (code === 0) {
          console.log('Spidergram reports generated successfully');
          resolve(path.join(targetDir, 'reports'));
        } else {
          console.error(`Spidergram report generation failed with code ${code}`);
          reject(new Error(`Spidergram exited with code ${code}`));
        }
      });

      spidergram.on('error', (err) => {
        console.error('Failed to start Spidergram report:', err);
        reject(err);
      });
    });
  }

  /**
   * Complete workflow: export, analyze, and generate reports
   */
  async processWithSpidergram(scrapedData) {
    try {
      // 1. Export data to JSON files
      const exportDir = await this.exportToSpidergram(scrapedData);
      
      // 2. Import to ArangoDB directly (optional)
      await this.importToArangoDB(scrapedData);
      
      // 3. Run Spidergram analysis
      await this.runSpidergramAnalysis(exportDir);
      
      // 4. Generate reports
      const reportsDir = await this.generateSpidergramReports(exportDir);
      
      return {
        success: true,
        exportDir,
        reportsDir
      };
    } catch (error) {
      console.error('Spidergram processing failed:', error);
      return {
        success: false,
        error: error.message
      };
    }
  }
}

export default SpidergramAdapter; 