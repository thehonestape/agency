import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    {
      name: 'api-routes',
      configureServer(server) {
        // Import and use API routes
        import('./src/api-routes').then(({ apiRoutes }) => {
          // Register API routes
          apiRoutes.forEach(route => {
            server.middlewares.use(route.path, async (req, res, next) => {
              if (req.method === route.method) {
                try {
                  const response = await route.handler(req as Request, res);
                  
                  // Set the status code
                  res.statusCode = response.status || 200;
                  
                  // Set response headers
                  for (const [key, value] of (response.headers as Headers).entries()) {
                    res.setHeader(key, value);
                  }
                  
                  // Send the response body
                  const responseText = await response.text();
                  res.end(responseText);
                } catch (error) {
                  console.error('API route error:', error);
                  res.statusCode = 500;
                  res.end(JSON.stringify({ error: 'Internal Server Error' }));
                }
              } else {
                next();
              }
            });
          });
        }).catch(err => {
          console.error('Failed to load API routes:', err);
        });
      }
    }
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "next/link": path.resolve(__dirname, "./src/lib/polyfills-es/next-link.mjs"),
      "next/router": path.resolve(__dirname, "./src/lib/polyfills-es/next-router.mjs"),
      "next/image": path.resolve(__dirname, "./src/lib/polyfills-es/next-image.mjs"),
      "next/head": path.resolve(__dirname, "./src/lib/polyfills-es/next-head.mjs"),
    },
  },
  server: {
    port: 3002,
    strictPort: true, // Don't try another port if 3002 is taken
    host: true, // Expose to network
  }
});