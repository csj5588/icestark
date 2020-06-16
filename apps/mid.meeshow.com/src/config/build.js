/**
 * build 层配置信息
 * 注意: build层是基于node的, 不能用import等语法, 不能对讲exports出去的对象给pages进行计算, 不能有window等对象,
 */

const IS_DEV = process && process.env.NODE_ENV === 'development';

const PROD_CONF = {};

const DEV_CONF = {};

const CONFIG = {
  IS_DEV,

  DEV: DEV_CONF,

  PROD: PROD_CONF,

  ENV: {
    SSO_LOGIN: true,
    PHONE_LOGIN: false,
  }
};

module.exports = CONFIG;
