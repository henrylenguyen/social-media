import type { Preview } from '@storybook/react'
import '../styles/globals.css'


const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    options: {
      storySort: {
        order: ['Atoms', 'Molecules', 'Organisms', 'Templates', 'Pages'],
        method: 'alphabetical',
      },
    },
    nextjs: {
      appDirectory: true, // Hỗ trợ App Router của Next.js
      navigation: {
        pathname: '/',
      },
    },
    backgrounds: {
      default: 'light',
      values: [
        { name: 'primary', value: '#FF6B6B' },
        { name: 'primary-light', value: '#FF9E80' },
        { name: 'secondary-blue', value: '#2E86DE' },
        { name: 'secondary-green', value: '#20bf6b' },
        { name: 'secondary-gold', value: '#FED330' },
        { name: 'secondary-purple', value: '#9C27B0' },
        { name: 'dark', value: '#333333' },
        { name: 'light', value: '#ffffff' },
        { name: 'light-dark', value: '#F5F5F5' },
        { name: 'dark-light', value: '#2E1065' },
      ],
    },
  },

  // Thêm decorators toàn cục nếu cần
  decorators: [
    // (Story) => <Story />
  ],
}

export default preview
