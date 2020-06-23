/**
 * pages 业务层配置信息
 * @author xiaomo@inke
 *
 * @wiki http://wiki.inkept.cn/pages/viewpage.action?pageId=17974680
 * 测试机名称：ali-a-opd-testing01.bj
 * IP：10.55.3.222
 * 路径：/a8root/work/service/
 */
import build from './build'

const IS_DEV = build.IS_DEV
const HOST = location.host
const ORIGIN = location.origin
const PATHNAME = location.pathname
const prodRootMap = {
  'zd.imilive.cn': {
    root: '//intraservice.imilive.cn/',
  },
  'betazd.imilive.cn': {
    root: '//intraservice.imilive.cn/',
  },
  'testzd.imilive.cn': {
    root: '//testservice.imilive.cn/',
  },
}

const rootObj = prodRootMap[Object.keys(prodRootMap).find((key) => HOST.indexOf(key) === 0)] || {}

const DEFAULT_ROOT = '/'

const getRootStr = (rootStr) => {
  return rootStr || DEFAULT_ROOT
}

var PROD = {
  APIS: {
    root: getRootStr(rootObj.root),
  }
}

const DEV = {
  APIS: {
    root: DEFAULT_ROOT,
  }
}

const ssoService = `${ORIGIN + PATHNAME}`

// 开启权限管理
export const OPEN_PERMISSION_CONTROL = true

export default {
  IS_DEV,

  USER_INFO_MOCK: false,

  SSO_PAGE_SERVICE: `http://sso.inkept.cn/?service=${ssoService}`,

  SSO_PAGE_URL: 'http://sso.inkept.cn',

  SSO_LOGOUT_PAGE_SERVICE: `https://sso.inkept.cn/api/v1/user/logout/?service=${ssoService}`,

  build,

  ...IS_DEV ? DEV : PROD
}
