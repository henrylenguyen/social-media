import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin';
import type { StorybookConfig } from '@storybook/react-vite';
import react from '@vitejs/plugin-react';
import fs from 'fs';
import path from 'path';
import { mergeConfig } from 'vite';

// Dynamically resolve content for src/utils/cn to make it available to all libraries
const cnUtilContent = fs.readFileSync(path.resolve(__dirname, '../libs/atoms/src/utils/cn.ts'), 'utf-8');

const config: StorybookConfig = {
  // Include stories from all libraries and apps
  stories: [
    '../libs/atoms/src/**/*.stories.@(js|jsx|ts|tsx|mdx)',
    '../libs/molecules/src/**/*.stories.@(js|jsx|ts|tsx|mdx)',
    '../libs/organisms/src/**/*.stories.@(js|jsx|ts|tsx|mdx)',
    '../libs/templates/src/**/*.stories.@(js|jsx|ts|tsx|mdx)',
    '../apps/dating-app/src/**/*.stories.@(js|jsx|ts|tsx|mdx)'
  ],
  addons: ['@storybook/addon-essentials', '@storybook/addon-interactions'],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  // Cấu hình sắp xếp stories thông qua tham số
  docs: {
    autodocs: true,
    defaultName: 'Documentation',
  },
  // Trong Storybook 8, sử dụng parameters trong preview.ts thay vì sortStories ở đây
  viteFinal: async (config) => {
    return mergeConfig(config, {
      plugins: [
        react(),
        nxViteTsPaths(),
        // Add a virtual module for src/utils/cn
        {
          name: 'virtual-modules-resolver',
          resolveId(id: string) {
            // Handle imports for src/utils/cn
            if (id === 'src/utils/cn') {
              return '\0virtual:cn';
            }
            // Handle any other imports from 'src/'
            if (id.startsWith('src/')) {
              const potentialPath = path.resolve(__dirname, '../libs/atoms', id);
              if (fs.existsSync(potentialPath)) {
                return potentialPath;
              }
            }
            return null;
          },
          load(id: string) {
            if (id === '\0virtual:cn') {
              return cnUtilContent;
            }
            return null;
          }
        }
      ],
      resolve: {
        alias: {
          '@social-media/atoms': path.resolve(__dirname, '../libs/atoms/src'),
          '@social-media/molecules': path.resolve(__dirname, '../libs/molecules/src'),
          '@social-media/organisms': path.resolve(__dirname, '../libs/organisms/src'),
          '@social-media/templates': path.resolve(__dirname, '../libs/templates/src'),
          '@dating-app': path.resolve(__dirname, '../apps/dating-app/src'),
          // Add an alias for any src/ imports to look in atoms library first
          'src': path.resolve(__dirname, '../libs/atoms/src')
        }
      },
      css: {
        postcss: {
          plugins: [
            // Use the root tailwind config which already includes content paths from all libraries
            require('tailwindcss')(path.resolve(__dirname, '../tailwind.config.js')),
            require('autoprefixer'),
          ],
        },
      },
    });
  }
};

export default config;
