module.exports = {
  pages: {
    index: {
      entry: 'src/main.js',
      template: 'public/index.html',
      filename: 'index.html'
    },

    redirector: {
      entry: 'src/services/redirector.js',
      template: 'public/redirector.html',
      chunks: [],
      filename: 'redirector.html'
    }
  },
  pwa: {
    name: 'BrowTricks',
    themeColor: '#141414'
  },
  devServer: {
    // for local browserstack
    disableHostCheck: true
    // enable localhost https
    // https: true
  },

  chainWebpack: config => {
    const svgRule = config.module.rule('svg');

    svgRule.uses.clear();

    svgRule
      .use('vue-svg-loader')
      .loader('vue-svg-loader')
      .options({
        svgo: {
          plugins: [{ removeDimensions: false }, { removeViewBox: false }]
        }
      });
  }
};
