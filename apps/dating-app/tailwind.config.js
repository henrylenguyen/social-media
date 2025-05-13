// const { createGlobPatternsForDependencies } = require('@nx/next/tailwind');

// The above utility import will not work if you are using Next.js' --turbo.
// Instead you will have to manually add the dependent paths to be included.
// For example
// ../libs/buttons/**/*.{ts,tsx,js,jsx,html}',                 <--- Adding a shared lib
// !../libs/buttons/**/*.{stories,spec}.{ts,tsx,js,jsx,html}', <--- Skip adding spec/stories files from shared lib

// If you are **not** using `--turbo` you can uncomment both lines 1 & 19.
// A discussion of the issue can be found: https://github.com/nrwl/nx/issues/26510

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './{src,pages,components,app}/**/*.{ts,tsx,js,jsx,html}',
    '!./{src,pages,components,app}/**/*.{stories,spec}.{ts,tsx,js,jsx,html}',
    //     ...createGlobPatternsForDependencies(__dirname)
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#FF6B6B', // Start of gradient
          light: '#FF9E80', // End of gradient
        },
        secondary: {
          blue: {
            DEFAULT: '#2E86DE',
            light: '#54A0FF',
          },
          green: {
            DEFAULT: '#20bf6b',
            light: '#26de81',
          },
          gold: {
            DEFAULT: '#FED330',
            light: '#F7B731',
          },
          purple: {
            DEFAULT: '#9C27B0',
            light: '#D500F9',
          },
        },
        text: {
          primary: '#333333',
          secondary: '#666666',
          tertiary: '#999999',
        },
        background: '#f8f8f8',
        surface: '#FFFFFF',
        error: '#FF3B5C',
        success: '#1BE4A1',
        warning: '#FED330',
      },
    },
  },
  plugins: [],
}
