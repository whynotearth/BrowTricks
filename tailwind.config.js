const defaultTheme = require('tailwindcss/defaultTheme');

const boxShadow = require('./src/assets/styles/tailwind/shadows');
const colors = require('./src/assets/styles/tailwind/colors');
const opacity = require('./src/assets/styles/tailwind/opacities');

module.exports = {
  theme: {
    extend: {
      boxShadow,
      colors,
      opacity
    },
    fontFamily: {
      'sans': ['Roboto', ...defaultTheme.fontFamily.sans]
    }
  },
  variants: {},
  plugins: []
};
