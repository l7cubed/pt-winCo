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
            100: '#DECEFF',
            200: '#C8ADFF',
            300: '#2BA36F',
            400: '#9B6AFF',
            500: '#8050E3',
            600: '#191919',
            700: '#4C249F',
            800: '#191919',
            900: '#24095B',
            DEFAULT: '#8050E3'
          },
          teal: {
            light: '#2BA36F',
            dark: '#2BA36F',
            DEFAULT: '#2BA36F'
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
        }
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
