import { join } from 'path'

/**
 * Cấu hình Storybook bổ sung
 */
const config = {
  // Thêm các package để chạy cùng với Next.js framework
  npmPackages: ['@storybook/nextjs'],

  // Command để chạy Storybook
  command: 'nx run dating-app:storybook',

  // Cấu hình bổ sung
  addons: [
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    '@storybook/addon-links',
  ],

  // Chỉ định stories từ các thư mục cụ thể
  stories: [
    join(__dirname, '../libs/**/*.stories.@(js|jsx|ts|tsx|mdx)'),
    join(__dirname, '../apps/**/*.stories.@(js|jsx|ts|tsx|mdx)'),
  ],

  webpackFinal: (config: any) => {
    // Thêm phần cấu hình nếu cần
    return config
  },
}

export default config
