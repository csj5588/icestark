/**
 * pages 业务层配置信息
 * @author lizh
 * @date 2018-12-3
 */
import build from './build';

const IS_DEV = build.IS_DEV;
const HOST = window.location.host;
const ORIGIN = window.location.origin;
const PATHNAME = window.location.pathname;

const prodRootMap = {
  // 腾讯机房
  'zt.meeshow.com': {
    loginRoot: '//rbac.busi.inke.cn/',
    logRoot: '//service.busi.inke.cn/',
    uploadRoot: '//upload.inke.cn/',
    root: '//api.meeshow.com/',
    iframeRoot: '//zt.meeshow.com/',
  },
  // 腾讯机房 测试
  'testzt.meeshow.com': {
    loginRoot: '//testrbac.busi.inke.cn/',
    logRoot: '//betaservice.busi.inke.cn/',
    uploadRoot: '//upload.inke.cn/',
    iframeRoot: '//testzt.meeshow.com/',
    root: '//testapi.meeshow.com/',
  },
  // 百度机房
  'manageapp.meelove.cn': {
    loginRoot: '//rbac.busi.inke.cn/',
    logRoot: '//service.busi.inke.cn/',
    uploadRoot: '//upload.inke.cn/',
    iframeRoot: '//manageapp.meelove.cn/',
    root: '//service.meelove.cn/',
  },
  'testmanageapp.imilive.cn': {
    loginRoot: '//testrbac.busi.inke.cn/',
    logRoot: '//betaservice.busi.inke.cn/',
    uploadRoot: '//upload.inke.cn/',
    iframeRoot: '//testmanageapp.imilive.cn/',
    root: '//testapi.imilive.cn/',
  }
};

const rootObj = prodRootMap[Object.keys(prodRootMap).find(key => HOST.indexOf(key) === 0)] || {};

const DEFAULT_ROOT = '/'; // http://testapi.imilive.cn

const getRootStr = rootStr => {
  return rootStr || DEFAULT_ROOT;
};

const PROD = {
  APIS: {
    loginRoot: getRootStr(rootObj.loginRoot),
    logRoot: getRootStr(rootObj.logRoot),
    uploadRoot: getRootStr(rootObj.uploadRoot),
    iframeRoot: getRootStr(rootObj.iframeRoot),
    root: getRootStr(rootObj.root),
  }
};

const DEV = {
  APIS: {
    loginRoot: DEFAULT_ROOT,
    logRoot: DEFAULT_ROOT,
    uploadRoot: DEFAULT_ROOT,
    iframeRoot: DEFAULT_ROOT,
    root: DEFAULT_ROOT,
    // root: 'http://192.168.16.167:20001'
  }
};

const ssoService = `${ORIGIN + PATHNAME}`;

// 开发环境权限总开关：false - 关闭权限菜单，true - 开启权限菜单
const devAuthority = true

export default {
  SUPER_ADMIN: ['wanghl@inke.cn', 'gugf@inke.cn'],

  IS_DEV,

  USER_INFO_MOCK: false,

  SSO_PAGE_URL: 'https://sso.inkept.cn',

  SSO_PAGE_SERVICE: `https://sso.inkept.cn/?service=${ssoService}`,

  SSO_LOGOUT_PAGE_SERVICE: `https://sso.inkept.cn/api/v1/user/logout/?service=${ssoService}`,

  build,

  ...build.ENV,

  ...IS_DEV ? DEV : PROD,

  // 系统地址
  SYSTEM_URL: 'maiangeapp.imilive.com',

  // 系统英文简写
  SYSTEM_US_NAME: 'LIVE_MID_ADMIN', // 原有FBI

  // 系统中文名称
  SYSTEM_CHINA_NAME: '中台管控中心',

  // 请求超时时间
  TIME_OUT: 3e+4,

  // 是否是常规布局：true 横向布局；false 纵向布局
  IS_ANTDLAYOUT: true,

  // 权限总开关 false - 关闭权限菜单， true - 开启权限菜单
  authority: IS_DEV ? devAuthority : true,

  // 系统标识，获取请联系 @王合亮，2 为测试系统
  // https://wiki.inkept.cn/pages/viewpage.action?pageId=69332024
  AUTH_SYSTEM_ID: 26, // 29

  // 手机登录情况下，登录页面路由地址
  PHONE_LOGGIN_PATH: 'login',
};
