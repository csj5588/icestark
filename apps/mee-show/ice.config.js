const path = require('path');

const { resolve } = path;

module.exports = {
  entry: 'src/index.jsx',
  publicPath: './',
  plugins: [
    [
      'ice-plugin-fusion',
      {
        themePackage: '@icedesign/theme',
      },
    ],
  ],
  alias: {
    '@': path.resolve(__dirname, './src/'),
    src: path.resolve(__dirname, './src/'),
    dist: resolve('dist'),
    public: resolve('public'),
    components: resolve('src/components'),
    utils: resolve('src/utils'),
    user: resolve('src/utils/user.js'),
    srcConfig: resolve('src/config'),
    assets: resolve('src/assets'),
  },
  devServer: {
    historyApiFallback: true,
  },
};
