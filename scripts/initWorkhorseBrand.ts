import { initializeWorkhorseBrandMemory } from '../src/services/brandMemoryService';

/**
 * Initialize the Workhorse brand memory in the database
 * This script sets up the Workhorse brand as the first client in the system
 */
const initWorkhorseBrand = async () => {
  try {
    console.log('Initializing Workhorse brand memory...');
    const memory = await initializeWorkhorseBrandMemory();
    console.log('Successfully initialized Workhorse brand memory:');
    console.log(`- ID: ${memory.id}`);
    console.log(`- Brand ID: ${memory.brandId}`);
    console.log(`- Values: ${memory.values.length}`);
    console.log(`- History events: ${memory.history.length}`);
    console.log(`- Insights: ${memory.insights.length}`);
    console.log('Done!');
  } catch (error) {
    console.error('Error initializing Workhorse brand memory:', error);
    process.exit(1);
  }
};

// Run the initialization
initWorkhorseBrand(); 