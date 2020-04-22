const boxShadow = require('./src/assets/styles/tailwind/shadows');
const colors = require('./src/assets/styles/tailwind/colors');
const opacity = require('./src/assets/styles/tailwind/opacities');

module.exports = {
  theme: {
    extend: {
      boxShadow,
      colors,
      opacity
    }
  },
  variants: {},
  plugins: []
};
