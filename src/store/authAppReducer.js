import * as types from './action-types'
const authAppState = {
  curApp: '', // haokan
  appList: [], // [{ appid: 'haokan', name: '好看' }]
  authList: [], // 所有app 列表权限页面专用
  count: 1,
}

const dataAuth = (state = authAppState, action) => {
  const { payload = {} } = action

  switch (action.type) {
    case types.CHANGE_COUNT:
      return {
        ...state,
        count: payload,
      }
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
    default:
      return {
        ...state
      }
  }
}

export default dataAuth
