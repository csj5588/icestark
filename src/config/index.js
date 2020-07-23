import build from './build';

const IS_DEV = build.IS_DEV;
const HOST = window.location.host;
const ORIGIN = window.location.origin;
const PATHNAME = window.location.pathname;

const prodRootMap = {
  'xxx': {
    root: '//api.meeshow.com/',
  },
  'betaxxx': {
    root: '//service.meelove.cn/',
  },
  'testxxx': {
    root: '//testapi.imilive.cn/',
  }
};

const rootObj = prodRootMap[Object.keys(prodRootMap).find(key => HOST.indexOf(key) === 0)] || {};

const DEFAULT_ROOT = '/';

const getRootStr = rootStr => {
  return rootStr || DEFAULT_ROOT;
};

const PROD = {
  APIS: {
    root: getRootStr(rootObj.root),
  }
};

const DEV = {
  APIS: {
    root: DEFAULT_ROOT,
  }
};

const ssoService = `${ORIGIN + PATHNAME}`;

// 开发环境权限总开关：false - 关闭权限菜单，true - 开启权限菜单
const devAuthority = true

export default {
  SUPER_ADMIN: ['wanghl@inke.cn', 'gugf@inke.cn'],

  IS_DEV,

  USER_INFO_MOCK: false,

  build,

  ...build.ENV,

  ...IS_DEV ? DEV : PROD,

  // 请求超时时间
  TIME_OUT: 3e+4,

  // 是否是常规布局：true 横向布局；false 纵向布局
  IS_ANTDLAYOUT: true,

  // 权限总开关 false - 关闭权限菜单， true - 开启权限菜单
  authority: IS_DEV ? devAuthority : true,
};
