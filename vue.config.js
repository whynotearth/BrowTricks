module.exports = {
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
