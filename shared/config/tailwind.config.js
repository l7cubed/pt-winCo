const defaultTheme = require('tailwindcss/defaultTheme')
const plugin = require('tailwindcss/plugin')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    'src/**/*.{js,ts,jsx,tsx}',
    '../../shared/react-components/**/*.{js,ts,jsx,tsx}',
    '../../shared/ui/**/*.{js,ts,jsx,tsx}',
    '../../node_modules/flowbite-react/lib/esm/theme.js'
  ],
  darkMode: 'class',
  theme: {
    fontFamily: {
      grotesk: 'Grotesk',
      inter: 'Inter',
      averta: 'Averta'
    },
    extend: {
      colors: {
        pt: {
          purple: {
            50: '#F5F0FF',
            100: '#488F31',
            200: '#488F31',
            300: '#488F31',
            400: '#162D1A',
            500: '#162D1A',
            600: '#191919',
            700: '#162D1A',
            800: '#191919',
            900: '#162D1A',
            DEFAULT: '#162D1A'
          },
          teal: {
            light: '#488F31',
            dark: '#488F31',
            DEFAULT: '#488F31'
          },
          pink: {
            light: '#FA48E8',
            dark: '#B623A7',
            DEFAULT: '#FA48E8'
          },
          bg: {
            purple: {
              light: '#191919',
              dark: '#191919',
              darker: '#191919',
              DEFAULT: '#191919'
            }
          },
          warning: {
            light: '#FFB6B6',
            dark: '#8B0000',
            DEFAULT: '#8B0000'
          },
          gold: '#FFB636',
          transparent: '#F5F0FF1A'
        },
        // Add custom blue color
        'custom-blue': '#1157FF',
      },
      spacing: {
        // Add custom negative margin
        '-22': '-5.5rem',
      },
      keyframes: {
        flip: {
          '0%': { transform: 'rotateX(0deg)' },
          '100%': { transform: 'rotateX(180deg)' }
        },
        unflip: {
          '0%': { transform: 'rotateX(180deg)' },
          '100%': { transform: 'rotateX(360deg)' }
        }
      }
    },
    screens: {
      'smSonner': '601px',
      ...defaultTheme.screens,
      '3xl': '1900px',
      '4xl': '2200px',
      '5xl': '2500px'
    }
  },
  plugins: [
    plugin(({ addUtilities }) => addUtilities({
      '.no-scrollbar::-webkit-scrollbar': {
        'display': 'none'
      },
      '.no-scrollbar': {
        '-ms-overflow-style': 'none',
        'scrollbar-width': 'none'
      }
    }))
  ]
}
