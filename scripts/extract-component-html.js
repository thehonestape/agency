/**
 * Script to add HTML preview content to the component data
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get the directory name using ES modules approach
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Path to the JSON file with component data
const dataPath = path.join(__dirname, '../src/data/components/tailwind-components.json');

// Read the existing component data
let componentsData;
try {
  componentsData = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
} catch (error) {
  console.error('Error reading component data:', error);
  process.exit(1);
}

// Sample HTML templates for different component types
const htmlTemplates = {
  // Marketing components
  hero: `<div class="bg-indigo-800 text-white">
  <div class="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
    <div class="text-center">
      <h1 class="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
        Beautiful UI components
      </h1>
      <p class="mt-4 text-xl text-indigo-200">
        Start building with our customizable components using your brand colors
      </p>
      <div class="mt-8">
        <button class="bg-white text-indigo-800 px-5 py-3 rounded-md font-medium hover:bg-indigo-50">
          Get started
        </button>
      </div>
    </div>
  </div>
</div>`,

  feature: `<div class="py-12 bg-white">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="lg:text-center">
      <h2 class="text-base text-indigo-600 font-semibold tracking-wide uppercase">Features</h2>
      <p class="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
        A better way to build websites
      </p>
      <p class="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
        Our components help you build beautiful, responsive websites that match your brand.
      </p>
    </div>
    <div class="mt-10">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div class="bg-indigo-50 p-6 rounded-lg">
          <div class="text-indigo-700 text-lg font-medium mb-3">Responsive</div>
          <p class="text-gray-700">Works on all devices and screen sizes out of the box.</p>
        </div>
        <div class="bg-indigo-50 p-6 rounded-lg">
          <div class="text-indigo-700 text-lg font-medium mb-3">Customizable</div>
          <p class="text-gray-700">Easily change colors, spacing and more to match your design.</p>
        </div>
        <div class="bg-indigo-50 p-6 rounded-lg">
          <div class="text-indigo-700 text-lg font-medium mb-3">Accessible</div>
          <p class="text-gray-700">Built with accessibility best practices from the start.</p>
        </div>
      </div>
    </div>
  </div>
</div>`,

  // UI components
  card: `<div class="bg-white rounded-lg shadow-md overflow-hidden max-w-md mx-auto">
  <img src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1024&q=80" alt="Card image" class="w-full h-48 object-cover" />
  <div class="p-6">
    <h3 class="text-xl font-semibold text-gray-900 mb-2">Card Component</h3>
    <p class="text-gray-600">
      This is a simple card component with an image, heading, and text. It uses your site's current styling.
    </p>
    <div class="mt-4">
      <button class="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700">
        Learn more
      </button>
    </div>
  </div>
</div>`,

  form: `<div class="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
  <h3 class="text-xl font-semibold text-gray-900 mb-4">Contact Form</h3>
  <form>
    <div class="mb-4">
      <label class="block text-gray-700 text-sm font-medium mb-2">
        Full Name
      </label>
      <input
        type="text" 
        class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        placeholder="Enter your name"
      />
    </div>
    <div class="mb-4">
      <label class="block text-gray-700 text-sm font-medium mb-2">
        Email
      </label>
      <input
        type="email" 
        class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        placeholder="Enter your email"
      />
    </div>
    <div class="mb-4">
      <label class="block text-gray-700 text-sm font-medium mb-2">
        Message
      </label>
      <textarea
        class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        rows="4"
        placeholder="Enter your message"
      ></textarea>
    </div>
    <button
      type="submit"
      class="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-400"
    >
      Submit
    </button>
  </form>
</div>`,

  button: `<div class="p-6 bg-white max-w-md mx-auto">
  <div class="space-y-4">
    <button class="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700">
      Primary Button
    </button>
    <button class="bg-white text-indigo-600 px-4 py-2 rounded-md border border-indigo-600 hover:bg-indigo-50">
      Secondary Button
    </button>
    <button class="bg-indigo-100 text-indigo-800 px-4 py-2 rounded-md hover:bg-indigo-200">
      Tertiary Button
    </button>
  </div>
</div>`,

  // Default template for any other component type
  default: `<div class="p-8 bg-indigo-50 rounded-lg text-center">
  <div class="text-xl font-medium text-indigo-800 mb-4">Sample Component</div>
  <p class="text-gray-700 mb-4">This is a placeholder for this component type using your site's styles.</p>
  <button class="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700">
    Example Button
  </button>
</div>`,
};

// Add HTML content to each component
componentsData.categories.forEach((category) => {
  category.sections.forEach((section) => {
    section.components.forEach((component) => {
      // Determine which template to use based on component name/type
      const componentNameLower = component.name.toLowerCase();
      let template = htmlTemplates.default;

      // Check for specific component types
      if (componentNameLower.includes('hero')) {
        template = htmlTemplates.hero;
      } else if (componentNameLower.includes('feature')) {
        template = htmlTemplates.feature;
      } else if (componentNameLower.includes('card')) {
        template = htmlTemplates.card;
      } else if (componentNameLower.includes('form')) {
        template = htmlTemplates.form;
      } else if (componentNameLower.includes('button')) {
        template = htmlTemplates.button;
      }

      // Add the HTML to the component
      component.html = template;
    });
  });
});

// Write the updated data back to the file
fs.writeFileSync(dataPath, JSON.stringify(componentsData, null, 2));

console.log('HTML content added to components successfully!');
