import type { Preview } from '@storybook/react'
import '../styles/globals.css'

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    nextRouter: {
      pathname: '/',
    },
    backgrounds: {
      default: 'light',
      values: [
        {
          name: 'light',
          value: '#ffffff',
        },
        {
          name: 'dark',
          value: '#333333',
        },
      ],
    },
  },
  decorators: [
    (Story, context) => {
      // Update pathname mock based on story parameters
      const pathname = context.parameters?.nextRouter?.pathname || '/'

      console.log('Storybook decorator - pathname:', pathname)
      console.log(
        'window.__setPathname available:',
        typeof window !== 'undefined' && !!window.__setPathname,
      )

      // Update the mock pathname if available
      if (typeof window !== 'undefined' && window.__setPathname) {
        window.__setPathname(pathname)
      }

      return (
        <div className='font-sans'>
          <Story />
        </div>
      )
    },
  ],
}

export default preview
