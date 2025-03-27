import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    port: 3002,
    strictPort: true,
    host: true,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src")
    }
  }
});