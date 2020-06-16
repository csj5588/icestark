const path = require('path');

module.exports = {
  publicPath: './',
  lintOnSave: false,
  filenameHashing: false,
  devServer: {
    port: 3334
  },
  css: {
    extract: true,
  },
  configureWebpack: {
    resolve: {
      extensions: ['.js', '.json', '.vue'],
      alias: {
        '@': path.resolve(__dirname, 'src/'),
      },
    },
  },
  chainWebpack: (config) => {
    config.optimization.delete('splitChunks');
  },
};
