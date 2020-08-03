const postcssNested = require('postcss-nested');

module.exports = {
  plugins: [require('tailwindcss'), postcssNested, require('autoprefixer')]
};
