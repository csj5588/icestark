/* eslint-disable */
import $common from 'utils/common'

import user, { storageKeys, userResolve, userReject, userReady } from 'user'
import srcConfig from 'src/config'
import { getUserInfo } from './apis'
import { message } from 'antd'
import ChainAsync from '../utils/chain-async'
import store from '../store'
import { setUserLogin, setUserLogout } from '../store/action'

const mockUserInfo = {
  username: '诸葛亮',
  email: 'zhugl@inke.cn',
  department: '技术平台中心-运营平台研发',
}

const requestWithTicket = (ticket, next) => {
  // 如果有token 就去请求用户信息
  if (ticket) {
    user.setTicket(ticket)
    getUserInfo({ ticket }).then(userResolve, next)
  } else {
    next({ dm_error: 'ticket不存在' })
  }
}

const localTicketChain = new ChainAsync((data) => {
  const ticket = localStorage.getItem(storageKeys.ticket)

  requestWithTicket(ticket, localTicketChain.next)
})

const urlTicketChain = new ChainAsync(() => {
  const ticket = $common.getUrlQuery('ticket')

  requestWithTicket(ticket, urlTicketChain.next)
})

const lastChain = new ChainAsync((error) => {
  user.removeTicket()
  userReject(error)
})

localTicketChain.setNextSuccessor(urlTicketChain)
urlTicketChain.setNextSuccessor(lastChain)

const redirect = function (url, msg) {
  url && (window.location.href = url)
  msg && message.error(msg)
}

export default () => {
  if (srcConfig.USER_INFO_MOCK || window.__checkLogin__ === false) {
    userResolve({ data: mockUserInfo })
  } else {
    localTicketChain.passRequest()
  }

  userReady(({ data }) => {
    user.set({ ...data })
    store.dispatch(setUserLogin({ ...data }))
  }, ({ dm_error: dmError } = {}) => {
    // token验证失效: 用户未登录, 跳转登录页并带服务参数, 重新验证
    redirect(srcConfig.SSO_PAGE_SERVICE)
  })
}
