import _get from 'lodash/get'
import * as types from './action-types'
import Cookie from 'utils/cookies'
import apis, { getModuleList, getDataAuth } from 'entry/apis'
import { Message } from 'antd'
import S from './apis'

const saveAppKey = 'cur-auth-app'

const ALL_AUTH = { appid: 'all', name: '全部' }

const ALL = 'all' // 全部app权限

const onGetPageButtonTree = payload => ({ type: types.GET_PAGE_BUTTON_TREE, payload })

const onGetPageButtonTreeUid = payload => ({ type: types.GET_PAGE_BUTTON_TREE_UID, payload })

// 设置当前权限APP
export const setAuthCurApp = payload => ({ type: types.SET_AUTH_APP_CUR, payload })

// 设置权限APP 列表， 及用户所有有权限的app
export const setAuthAppList = payload => ({ type: types.SET_AUTH_APP_LIST, payload })

export const setAppList = payload => ({ type: types.SET_APP_LIST, payload })

export const getPageButtonTree = params => async (dispatch, getState) => {
  try {
    const { data } = await getModuleList()
    dispatch(onGetPageButtonTree(data))
  } catch (error) {
    // 4000005, 接口返回无权限时，设置为空
    // 接口报错也设置为 全部无权限
    dispatch(onGetPageButtonTree([]))
    Message.error(error.error_msg || '接口响应异常，请联系管理员')
  }
}

export const getPageButtonTreeUid = params => async (dispatch, getState) => {
  try {
    const { data } = await getModuleList({ is_all: 1 })
    dispatch(onGetPageButtonTreeUid(data))
  } catch (error) {
    // 4000005, 接口返回无权限时，设置为空
    // 接口报错也设置为 全部无权限
    dispatch(onGetPageButtonTreeUid([]))
    Message.error(error.error_msg || '接口响应异常，请联系管理员')
  }
}

// 手机登录
export const setUserLogin = payload => ({ type: types.USER_LOGIN, payload })

// 手机登出
export const setUserLogout = payload => ({ type: types.USER_LOGOUT, payload })

export const userLogout = params => (dispatch, getState) => {
  return apis.getLogout().then(() => {
    setUserLogout()
  })
}

// 设置select 默认选中的app
const getDefaultApp = list => {
  let app = Cookie.getItem(saveAppKey)
  if (list.findIndex(x => x.appid === app) !== -1) {
    return app
  }
  return list[0] && list[0].appid
}

// 获取业务线下拉列表
export const getProductList = () => async (dispatch, getState) => {
  try {
    const [{ data: productList = [] }, userRes = {}] = await Promise.all([S.getAppList(), getDataAuth()])
    // 再去获取权限列表,默认为全部app权限
    const { data: dataAuth = {} } = userRes
    const dataPower = _get(dataAuth, 'data_power_tree.data_power', {})
    const { apps = [] } = dataPower
    const defaultApp = getDefaultApp(productList);
    Cookie.setItem(saveAppKey, defaultApp);
    const appListOptions = (apps.includes(ALL)) ? productList : productList.filter(item => (apps.includes(item.appid)))
    const authList = [ ALL_AUTH, ...productList ]
    dispatch(setAuthAppList({
      curApp: defaultApp,
      appList: appListOptions,
      authList,
    }))
    // 默认去掉全局ALL这一选项
    // const appList = (dataPowerList.includes(ALL)) ? appFullOpt : appFullOpt.filter(item => dataPowerList.includes(item.app))
  } catch (error) {
    Message.error(error || '接口响应异常，请联系管理员')
  }
}
