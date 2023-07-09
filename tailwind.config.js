/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        'primary': 'var(--font-roboto)',
        'secondary': 'var(--font-poppins)',
      },
      colors: {
        'white': {
          100: '#ffffff',
          200: '#F8F8F8',
          300: '#FEFEFE',
        }, 
        'black': {
          700: '#29292E',
          800: '#050206',
          900: '#000000'
        },
        'blue': {
          500: '#2196F3',
          600: '#3088CE'
        },
        'red': {
          500: '#E73F5D',
          600: '#D73754'
        },
        'gray': {
          200: '#DBDCDD',
          300: '#CECECE',
          400: '#A8A8B3',
          500: '#737380',
        }
      }
    },
  },
  plugins: [],
}
