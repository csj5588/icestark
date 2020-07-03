function rootPathResolve (dir) {
  console.log('rootPathResolve', path.resolve(__dirname, '../..', dir))
  return path.resolve(__dirname, '../..', dir)
}
const path = require('path');
const IS_DEV = process.env.NODE_ENV !== 'production'

const SRC_Config = rootPathResolve('src/config/build')

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
        'components': path.resolve(__dirname, 'src/components'),
        // 工具页
        'utils': path.resolve(__dirname, 'src/utils'),
        // http请求封装
        'service': path.resolve(__dirname, 'src/service'),
        'mocks': path.resolve(__dirname, (IS_DEV && SRC_Config.IS_MOCK ? 'mocks' : 'mocks/null')),
      },
    },
  },
  chainWebpack: (config) => {
    config.optimization.delete('splitChunks');
  },
};
