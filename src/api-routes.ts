// API routes for the application
import { exec } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

// Get the directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Function to run a script in node
function runScript(scriptPath: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const process = exec(`node ${scriptPath}`, (error, stdout, stderr) => {
      if (error) {
        console.error(`exec error: ${error}`);
        return reject(error);
      }
      if (stderr) {
        console.error(`stderr: ${stderr}`);
      }
      resolve(stdout);
    });
  });
}

// API Routes
export const apiRoutes = [
  {
    path: '/api/generate-html',
    method: 'GET',
    handler: async (req: Request, res: Response) => {
      try {
        const scriptPath = path.join(__dirname, '../scripts/extract-component-html.js');
        const result = await runScript(scriptPath);
        
        return new Response(JSON.stringify({ 
          success: true, 
          message: 'HTML content generated successfully' 
        }), {
          headers: {
            'Content-Type': 'application/json'
          }
        });
      } catch (error: unknown) {
        console.error('Error generating HTML:', error);
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        
        return new Response(JSON.stringify({ 
          success: false, 
          message: 'Failed to generate HTML content',
          error: errorMessage
        }), {
          status: 500,
          headers: {
            'Content-Type': 'application/json'
          }
        });
      }
    }
  }
]; 