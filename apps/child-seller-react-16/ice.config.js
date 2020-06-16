const path = require('path');

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
  },
  devServer: {
    historyApiFallback: true,
  },
};
