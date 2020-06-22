import $common from 'utils/common'
import S from 'service'
import * as apis from './apis'
import Modal from 'iview-ui/modal'
import user, { storageKeys, userResolve, userReject, userReady } from 'user'
import srcConfig from 'src/config'

const mockUserInfo = {
  username: 'tester',
  email: 'gaoq@inke.cn',
  department: '种子视频',
}
// url中的 ticket 优先级最高, 所以放到后面
const tokens = [localStorage.getItem(storageKeys.token), $common.getUrlQuery('ticket')]
// const tokens = [$common.getUrlQuery('ticket'), localStorage.getItem(storageKeys.token)]
// console.log(tokens)

const MSGS = {
  401: '抱歉, 您没有访问权限, 请联系相关管理员!',
  403: '请您登录, 即将为您跳转.',
}

const redirect = function (url, msg) {
  // setTimeout(() => {
  url && (window.location.href = url)
  // }, 2000)

  msg && Modal.error({
    content: msg
  })
}

const requestWithToken = token => {
  // 如果有token 就去请求用户信息
  if (token) {
    user.setToken(token)
    return S.USER_INFO({
      ticket: token
    }).then(res => {
      // console.log('登录Res', res)
      return Promise.resolve(res)
    }, errRes => {
      // console.log('登录Err', errRes)
      user.removeToken()
      return Promise.reject(errRes)
    })
  } else {
    return Promise.reject({ dm_error: 403 })
  }
  // return Promise.resolve({
  //   dm_error: 0,
  //   error_msg: '操作成功',
  //   error_toast: '操作成功',
  //   href_info: null,
  //   data: {
  //     cookie_info: {
  //       username: 'pangyutong',
  //       token: '2f3e9cda9f8048c39e5f15d02c78',
  //       timestamp: 1548311140
  //     },
  //     user_info: {
  //       username: 'pangyutong',
  //       chinese_name: '庞雨彤',
  //       email: 'pangyutong@inke.cn',
  //       phone: '',
  //       department: '',
  //       description: ''
  //     }
  //   }
  // })
}

const tokenHandler = (tokens, i = 0) => {
  requestWithToken(tokens[i])
    .then(userResolve, errRes => {
      if (++i < tokens.length) {
        return tokenHandler(tokens, i)
      } else {
        userReject(errRes)
      }
    })
}

export default () => {
  if (srcConfig.USER_INFO_MOCK || window.__checkLogin__ === false) {
    userResolve({ data: mockUserInfo })
  } else {
    S.$extend(apis)
    tokenHandler(tokens)
  }

  userReady(({ data }) => {
    user.set({
      ...data
    })
  }, ({ dm_error: dmError }) => {
    // token验证失效: 用户未登录, 跳转登录页并带服务参数, 重新验证
    // if (dmError === 403) {
    //   // redirect(srcConfig.SSO_PAGE_SERVICE, MSGS['403'])
    //   redirect(srcConfig.SSO_PAGE_SERVICE)
    // } else {
    //   // 用户没有权限, 仅跳转, 无服务参数
    //   // redirect(srcConfig.SSO_PAGE_URL, MSGS['401'])
    //   redirect(srcConfig.SSO_PAGE_URL)
    // }
  })
}