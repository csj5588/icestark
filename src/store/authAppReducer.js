import * as types from './action-types'
const authAppState = {
  curApp: '', // haokan
  curAppItem: {}, // 当前app
  appList: [], // [{ appid: 'haokan', name: '好看' }]
  authList: [], // 所有app 列表权限页面专用
}

const dataAuth = (state = authAppState, action) => {
  const { payload = {} } = action

  switch (action.type) {
    case types.SET_AUTH_APP_LIST:
      return {
        ...state,
        ...payload
      }
    case types.SET_AUTH_APP_CUR:
      return {
        ...state,
        ...payload
      }
    case types.SET_APP_LIST:
      return {
        ...state,
        ...payload
      }
    case types.SET_CUR_APP_ITEM:
      return {
        ...state,
        ...payload
      }
    default:
      return {
        ...state
      }
  }
}

export default dataAuth
