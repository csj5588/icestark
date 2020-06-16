const merge = require('webpack-merge')
const TerserPlugin = require('terser-webpack-plugin')

const { rootPathResolve } = require('./webpack/utils')
const path = require('path')
const buildConfig = require('./src/config/build')
const themeConfig = require('./theme.config') 

const { resolve } = path

const ASSET_PATH = process.env.ASSET_PATH || '/'

const entryMap = {
  sso: resolve('src/entry'),
  phone: resolve('src/entryPhone'),
}

module.exports = function (ctx) {
  const IS_DEV = process.env.NODE_ENV === 'development';
  const webpack = ctx.webpack

  const devWebpackConfig = {
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          loader: 'eslint-loader',
          enforce: 'pre',
          include: [rootPathResolve('src')],
          exclude: [/node_modules/, rootPathResolve('src/assets'), resolve('src/common/ui'), resolve('src/debug'), resolve('src/pages/demo')],
          options: {
            formatter: require('eslint-friendly-formatter'),
            cacheDirectory: './webpack_cache/'
          }
        },
      ]
    }
  }

  const prodWebpackConfig = {
    output: {
      publicPath: ASSET_PATH,
      filename: 'js/[name].[chunkhash].js',
      chunkFilename: 'js/chunks/[name].[id].[chunkhash].js'
    },
    optimization: {
      minimizer: [
        new TerserPlugin({
          parallel: true,
          cache: './webpack_cache/',
          // sourceMap: true,
          terserOptions: {
            parse: {
              ecma: 8
            },
            compress: {
              ecma: 5,
              warnings: false,
              drop_debugger: true,
              // drop_console 会删去 console.*
              // drop_console: true,
              // 仅丢弃 console.log
              pure_funcs: ['console.log']
            },
            output: {
              comments: false,
            }
          }
        })
      ]
    }
  }

  const config = merge({
    module: {
      rules: [
        {
          test: /\.less$/,
          use: [
            {
              loader: 'less-loader',
              options: {
                modifyVars: themeConfig,
                javascriptEnabled: true
              },
            }
          ],
        }
      ]
    },
    devServer: {
      // 支持 browser history 模式
      historyApiFallback: true,
    },
    output: {
      path: resolve('dist')
    },
    resolve: {
      alias: {
        dist:resolve('dist'),
        public: resolve('public'),
        src: resolve('src'),
        components: resolve('src/components'),
        utils: resolve('src/utils'),
        user: resolve('src/utils/user.js'),
        srcConfig: resolve('src/config'),
        entry: buildConfig.ENV.SSO_LOGIN ? entryMap.sso : entryMap.phone,
        // entry: entryMap.phone,
        assets: resolve('src/assets'),
        // antd: 'ik-antd'
      }
    },
    optimization: {
      splitChunks: {
        cacheGroups: {
          vendors: {
            name: `chunk-vendors`,
            test: /[\\/]node_modules[\\/]/,
            priority: -10,
            chunks: 'initial'
          },
          common: {
            name: `chunk-common`,
            minChunks: 2,
            priority: -20,
            chunks: 'initial',
            reuseExistingChunk: true
          }
        }
      }
    },
    plugins: [
      new webpack.DefinePlugin({
        'process.env': Object.keys(buildConfig.ENV).reduce((env, key) => {
          env[key] = JSON.stringify(buildConfig.ENV[key]);
          return env;
        }, {})
      }),
      new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/)
    ]
  }, IS_DEV ? devWebpackConfig : prodWebpackConfig)

  return config
}
