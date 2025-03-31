/** @type {import('@tailwindcss/vite').Config} */
export default {
  darkMode: ["selector", "[data-theme*='-dark']"],
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  prefix: "",
  plugins: [
    // Use imported plugins via @plugin in base.css
  ]
}; 