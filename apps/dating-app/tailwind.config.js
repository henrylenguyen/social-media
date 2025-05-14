// Use the root tailwind config
const rootTailwindConfig = require('../../tailwind.config.js');

/** @type {import('tailwindcss').Config} */
module.exports = {
  // Inherit everything from the root configuration
  ...rootTailwindConfig,
  // But customize the content for this app if needed
  content: [
    './src/**/*.{ts,tsx,js,jsx,html}',
    './src/**/*.{stories,spec}.{ts,tsx,js,jsx,html}',
    '../../libs/atoms/src/**/*.{ts,tsx,js,jsx}', // Thêm đường dẫn trực tiếp đến thư viện atoms
    '../../libs/molecules/src/**/*.{ts,tsx,js,jsx}', // Thêm đường dẫn trực tiếp đến thư viện molecules
    '../../libs/organisms/src/**/*.{ts,tsx,js,jsx}', // Thêm đường dẫn trực tiếp đến thư viện organisms
    ...rootTailwindConfig.content,
  ],
};
