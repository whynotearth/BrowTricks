const defaultTheme = require('tailwindcss/defaultTheme');

const boxShadow = require('./src/assets/styles/shadows');
const colors = require('./src/assets/styles/colors');

module.exports = {
  theme: {
    extend: {
      boxShadow,
      colors
    },
    fontFamily: {
      sans: ['Roboto', ...defaultTheme.fontFamily.sans]
    },
    height: {
      14: '3.5rem'
    }
  },
  variants: {},
  plugins: []
};
