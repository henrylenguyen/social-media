const { createGlobPatternsForDependencies } = require('@nx/react/tailwind')
const { join } = require('path')

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'],
  content: [
    join(__dirname, 'src/**/*.{js,ts,jsx,tsx}'),
    ...createGlobPatternsForDependencies(__dirname),
  ],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        primaryGradient: {
          start: '#FF6B6B',
          end: '#FF9E80',
        },
        secondaryBlue: {
          start: '#2E86DE',
          end: '#54A0FF',
        },
        secondaryGreen: {
          start: '#20bf6b',
          end: '#26de81',
        },
        secondaryGold: {
          start: '#FED330',
          end: '#F7B731',
        },
        secondaryPurple: {
          start: '#9C27B0',
          end: '#D500F9',
        },
        textColors: {
          primary: '#333333',
          secondary: '#666666',
          tertiary: '#999999',
        },
        customBg: '#f8f8f8',
        surface: '#FFFFFF',
        errorColor: '#FF3B5C',
        successColor: '#1BE4A1',
        warningColor: '#FED330',
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
      backgroundImage: {
        'primary-gradient': 'linear-gradient(to right, #FF6B6B, #FF9E80)',
        'secondary-blue-gradient':
          'linear-gradient(to right, #2E86DE, #54A0FF)',
        'secondary-green-gradient':
          'linear-gradient(to right, #20bf6b, #26de81)',
        'secondary-gold-gradient':
          'linear-gradient(to right, #FED330, #F7B731)',
        'secondary-purple-gradient':
          'linear-gradient(to right, #9C27B0, #D500F9)',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
}
