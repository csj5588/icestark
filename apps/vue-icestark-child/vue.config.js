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
        'src': path.resolve(__dirname, 'src/'),
        'pages': path.resolve(__dirname, 'src/pages'),
        // http请求封装
        'service': path.resolve(__dirname, 'src/common/service'),
        // 资源文件
        'assets': path.resolve(__dirname, 'src/assets'),
        'mocks': path.resolve(__dirname, 'src/common/mocks'),
        // 用户信息
        'user': path.resolve(__dirname, 'src/common/modules/user'),
        // 公共目录
        'common': path.resolve(__dirname, 'src/common'), 
        'com-less': path.resolve(__dirname, 'src/common/less'), 
          // 页面逻辑组件相关
        'modules': path.resolve(__dirname, 'src/common/modules'),
        // common 模块下的modules
        'com-modules': path.resolve(__dirname, 'src/common/modules'),
        // 入口文件
        'entry': path.resolve(__dirname, 'src/common/entry'),
        // 基础组件
        'components': path.resolve(__dirname, 'src/components'),
        // 工具页
        'utils': path.resolve(__dirname, 'src/common/utils'),
        // 用户信息
        'user': path.resolve(__dirname, 'src/common/modules/user'),
        // http请求封装
        'service': path.resolve(__dirname, 'src/common/service'),
        // 指令
        'directives': path.resolve(__dirname, 'src/common/directives'),
        // 混合
        'mixins': path.resolve(__dirname, 'src/common/mixins'),
        // vue相关插件
        'plugins': path.resolve(__dirname, 'src/common/plugins'),
        // 具体实现组件, 按需引用时候用
        'iview-ui': path.resolve(__dirname, 'src/common/ui/iview/src/components'),
        'element-ui': path.resolve(__dirname, 'src/common/ui/element-ui')
      },
    },
  },
  chainWebpack: (config) => {
    config.optimization.delete('splitChunks');
  },
};
