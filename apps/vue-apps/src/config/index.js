import build from './build'

const IS_DEV = build.IS_DEV
const HOST = location.host
const ORIGIN = location.origin
const PATHNAME = location.pathname
const prodRootMap = {
  'xxx': {
    root: 'xxx',
  },
  'betaxxx': {
    root: 'xxx',
  },
  'testxxx': {
    root: 'xxx',
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

// 开启权限管理
export const OPEN_PERMISSION_CONTROL = true

export default {
  IS_DEV,

  USER_INFO_MOCK: false,

  build,

  ...IS_DEV ? DEV : PROD
}
