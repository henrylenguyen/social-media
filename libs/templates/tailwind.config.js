// Sử dụng cấu hình Tailwind từ thư mục root
const rootTailwindConfig = require('../../tailwind.config.js');

/** @type {import('tailwindcss').Config} */
module.exports = {
  // Kế thừa tất cả từ cấu hình root
  ...rootTailwindConfig,
  // Tùy chỉnh nội dung cho thư viện này nếu cần
  content: [
    './src/**/*.{ts,tsx,js,jsx,html}',
    '!./src/**/*.{stories,spec}.{ts,tsx,js,jsx,html}',
    ...rootTailwindConfig.content,
  ],
};