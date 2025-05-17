import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin'
import { join } from 'path'
import { mergeConfig } from 'vite'

const config = {
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
    name: '@storybook/react-vite',
    options: {},
  },

  docs: {
    autodocs: true,
  },

  viteFinal: async (config) => {
    // Tạo plugin đơn giản để xử lý tất cả các import Next.js
    const nextJsPlugin = {
      name: 'vite-plugin-nextjs-mock',
      resolveId(id) {
        // Bắt và xử lý tất cả import từ Next.js
        if (id.startsWith('next/')) {
          return { id: 'virtual:next-module', external: false }
        }
        return null
      },
      load(id) {
        if (id === 'virtual:next-module') {
          // Trả về module rỗng
          return 'export default () => null; export const useRouter = () => ({}); export const usePathname = () => "/";'
        }
        return null
      },
    }

    // Định nghĩa process.env
    config.define = {
      ...config.define,
      'process.env': JSON.stringify(process.env || {}),
    }

    // Thêm plugins và cấu hình
    return mergeConfig(config, {
      plugins: [nxViteTsPaths(), nextJsPlugin],
      resolve: {
        alias: {
          '@social-media/atoms': join(__dirname, '../libs/atoms/src'),
          '@social-media/molecules': join(__dirname, '../libs/molecules/src'),
          '@social-media/organisms': join(__dirname, '../libs/organisms/src'),
          '@social-media/templates': join(__dirname, '../libs/templates/src'),
          '@': join(__dirname, '../apps/dating-app/src'),
          src: join(__dirname, '../libs/atoms/src'),
        },
        dedupe: ['react', 'react-dom'],
      },
    })
  },
}

export default config
