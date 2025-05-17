import type { StorybookConfig } from '@storybook/nextjs'
import { join } from 'path'

const config: StorybookConfig = {
  stories: [
    '../libs/**/*.stories.@(js|jsx|ts|tsx|mdx)',
    '../apps/**/*.stories.@(js|jsx|ts|tsx|mdx)',
  ],

  addons: [
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    '@storybook/addon-links',
  ],

  framework: {
    name: '@storybook/nextjs',
    options: {
      builder: {
        useSWC: true,
      },
    },
  },

  docs: {
    autodocs: true,
  },

  webpackFinal: async (config) => {
    // Đảm bảo có `config.resolve` trước khi thêm alias
    if (!config.resolve) {
      config.resolve = {}
    }

    // Đảm bảo có `config.resolve.alias` trước khi thêm giá trị
    if (!config.resolve.alias) {
      config.resolve.alias = {}
    }

    // Cấu hình các alias cho đúng với cấu trúc dự án
    // @ts-ignore
    config.resolve.alias = {
      ...config.resolve.alias,
      // Library paths
      '@social-media/atoms': join(__dirname, '../libs/atoms/src'),
      '@social-media/molecules': join(__dirname, '../libs/molecules/src'),
      '@social-media/organisms': join(__dirname, '../libs/organisms/src'),
      '@social-media/templates': join(__dirname, '../libs/templates/src'),
      '@social-media/assets': join(__dirname, '../assets'),

      // App paths
      '@': join(__dirname, '../apps/dating-app/src'),

      // Utils path cho các component trong libs
      src: join(__dirname, '../libs/atoms/src'),
      'src/utils': join(__dirname, '../libs/atoms/src/utils'),
      'src/utils/cn': join(__dirname, '../libs/atoms/src/utils/cn'),
    }

    // Thêm các rule cần thiết nếu có

    return config
  },
}

export default config
