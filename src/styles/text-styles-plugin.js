// Text styles plugin for Tailwind CSS
// This plugin creates utility classes for our typography system

const plugin = require('tailwindcss/plugin');

module.exports = plugin(function({ addComponents, theme }) {
  const textStyles = theme('textStyles');
  
  if (!textStyles) return;
  
  const components = {};
  
  // Create text style utility classes
  Object.entries(textStyles).forEach(([name, styles]) => {
    components[`.text-style-${name}`] = styles;
  });
  
  // Add browline/eyebrow text style
  if (!components['.text-style-browline'] && textStyles.browline) {
    components['.text-style-browline'] = textStyles.browline;
  }
  
  addComponents(components);
});
