// Default config https://github.com/tailwindcss/tailwindcss/blob/master/stubs/defaultConfig.stub.js
const defaultTheme = require('tailwindcss/defaultTheme');

const boxShadow = require('./src/assets/styles/shadows');
const colors = require('./src/assets/styles/colors');
const opacity = require('./src/assets/styles/opacities');

module.exports = {
  purge: ['./public/**/*.html', './src/**/*.vue'],
  theme: {
    extend: {
      boxShadow,
      colors,
      opacity,
      borderRadius: {
        xl: '1rem'
      },
      screens: {
        xl: '1280px',
        xxl: '1920px'
      },
      spacing: {
        '0.5': '0.125rem',
        '1.5': '0.375rem',
        '14': '3.5rem',
        '128': '32rem',
        '160': '40rem'
      },
      fontFamily: {
        sans: ['Roboto', ...defaultTheme.fontFamily.sans]
      },
      inset: {
        '1/2': '50%'
      },
      zIndex: {
        '-1': '-1',
        '100': '100',
        '110': '110'
      }
    }
  },
  // FIXME: optimise, ISSUE #123
  // variants: [
  //   'responsive',
  //   'group-hover',
  //   'group-focus',
  //   'focus-within',
  //   'first',
  //   'last',
  //   'odd',
  //   'even',
  //   'hover',
  //   'focus',
  //   'active',
  //   'visited',
  //   'disabled'
  // ],
  plugins: []
};
