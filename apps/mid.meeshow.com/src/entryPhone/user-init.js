import $common from 'utils/common'
import srcConfig from 'src/config'
import store from '../store'
import { setUserLogin, setUserLogout } from '../store/action'

import user, { storageKeys, userResolve, userReject, userReady } from 'user'
import { message } from 'antd'

// import ChainAsync from '../utils/chain-async'
import apis from './apis'

const mockUserInfo = {
  uid: 0,
  username: '诸葛亮',
  phone: '18812345678',
}

const redirect = function (url, msg) {
  url && (window.location.href = url)
  msg && message.error(msg)
}

const getUserInfo = () => {
  return apis.getLoginInfo().then(userResolve, userReject)
}

export function redirectLoginPage () {
  window.location.href = `/${srcConfig.PHONE_LOGGIN_PATH}`
}

export function redirectIndexPage () {
  window.location.href = '/'
}

export function checkLoginUrl () {
  return window.location.pathname === `/${srcConfig.PHONE_LOGGIN_PATH}` || window.location.hash === `#${srcConfig.PHONE_LOGGIN_PATH}`
}

export function checkContentUrl () {
  return window.location.pathname !== `/${srcConfig.PHONE_LOGGIN_PATH}` || window.location.hash !== `#${srcConfig.PHONE_LOGGIN_PATH}`
}

export default () => {
  if (srcConfig.USER_INFO_MOCK) {
  // eslint-disable-next-line no-constant-condition
  // if (true) {
    userResolve({ data: mockUserInfo })
  } else {
    getUserInfo()
  }

  // userReady(({ data }) => {
  //   user.set({ ...data })
  // }, ({ dm_error: dmError } = {}) => {
  //   // session 失效: 用户未登录, 跳转登录页并带服务参数, 重新验证
  //   // redirect(srcConfig.SSO_PAGE_SERVICE)
  //   redirect('/login')
  // })

  return userReady(({ data }) => {
    // user.set({ ...data })
    store.dispatch(setUserLogin({ ...data }))
    // 登录成功，如果在login页，则跳转是首页
    if (checkLoginUrl()) {
      redirectIndexPage()
    }
  }, () => {
    // 登录失败，跳转登录页
    if (!checkLoginUrl()) {
      redirectLoginPage()
    }
  })
}
