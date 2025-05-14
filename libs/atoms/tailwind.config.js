// Use the root tailwind config
const rootTailwindConfig = require('../../tailwind.config.js');

/** @type {import('tailwindcss').Config} */
module.exports = {
  // Inherit everything from the root configuration
  ...rootTailwindConfig,
  // But customize the content for this library if needed
  content: [
    './src/**/*.{ts,tsx,js,jsx,html}',
    './src/**/*.{stories,spec}.{ts,tsx,js,jsx,html}',
    ...rootTailwindConfig.content,
  ],
};
