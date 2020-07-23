/**
 * build 层配置信息
 * 注意: build层是基于node的, 不能用import等语法, 不能对讲exports出去的对象给pages进行计算, 不能有window等对象,
 * @author libx@inke
 * @date 2017-05-23
 */

const IS_DEV = process && process.env.NODE_ENV === 'development'


const PROD_CONF = {
  BUILD: {
    /**
     * 资源文件根路径
     */
    assetsPublicPath: '/'
  }
}

const DEV_CONF = {

}

const CONFIG = {
  IS_DEV,

  DEV: DEV_CONF,

  PROD: PROD_CONF,

  /**
   * 跨域代理
   */
  PROXY_TABLE: [{
    path: [
      '/login/*',
      '/api/*',
      '/service/*',
    ],
    host: 'xxx', // 线上环境
  }],

  /**
   * 端口
   */
  PORT: 8586
}

module.exports = CONFIG
