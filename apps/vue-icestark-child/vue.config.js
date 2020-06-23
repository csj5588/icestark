const path = require('path');

module.exports = {
  publicPath: './',
  lintOnSave: false,
  filenameHashing: false,
  devServer: {
    port: 4444
  },
  css: {
    extract: true,
  },
  configureWebpack: {
    resolve: {
      extensions: ['.js', '.json', '.vue'],
      alias: {
        '@': path.resolve(__dirname, 'src/'),
        'src': path.resolve(__dirname, 'src/'),
        'pages': path.resolve(__dirname, 'src/pages'),
      },
    },
  },
  chainWebpack: (config) => {
    config.optimization.delete('splitChunks');
  },
};
