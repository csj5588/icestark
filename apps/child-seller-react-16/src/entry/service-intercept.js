import axios from 'axios'
import axiosService from 'axios-service'
import srcConfig from '@/config'
// import $user from 'user'
import { message } from 'antd'
// import store from 'src/store'
import build from '@/config/build';

const root = srcConfig.APIS.root
const HOST = window.location.host;
const IS_DEV = build.IS_DEV;
const DEFAULT_ROOT = '/';
const curEnv = /test/.test(HOST) ? 'test' : 'online';
// 默认的接口域名 腾讯机房
const defaultApiHost = {
  test: {
    root: '//testapi.meeshow.com/'
  },
  online: {
    root: '//api.meeshow.com/'
  }
};

// 请求头设置 ticket
const setTicketToHeader = config => {
  const { headers } = config
  headers.ticket = $user.getToken()
}

// 请求参数设置 ticket
const setTicketToParams = config => {
  const { params = {} } = config
  const user = $user.get()
  const { user_id: userId, system_id: systemId, username, email, department } = user
  config.params = {
    ...params,
    user_id: userId,
    system_id: systemId,
    username,
    email,
    department,
    ticket: $user.getToken()
  }
}

// 请求头设置 appid
const setAppidToHeader = config => {
  const { headers } = config
  const state = store.getState()
  const { authApp: { curApp } } = state
  headers['uberctx-_namespace_appkey_'] = curApp || 'demo'
  // 上线之前改回来
  // headers['uberctx-_namespace_appkey_'] = 'demo'
}

/**
 * 获取业务接口的域名，不同app 域名不一样
 * 主要原因： 区分 阿里机房 腾讯机房 百度机房
 **/
const getApiHost = (app, AppList) => {
  if (IS_DEV) {
    return {
      root: DEFAULT_ROOT
    }
  }
  const item = AppList.filter(one => one.appid === app)[0];
  if (!item) {
    return defaultApiHost[curEnv]
  }
  return item.apiHost[curEnv] || defaultApiHost[curEnv]
}

const TIME_OUT = srcConfig.TIME_OUT

const requestDefaults = {
  // 目前还没实现，预计在下个版本中处理
  autoLoading: true,
  // response.data 下面的配置
  // server 端请求信息 key
  msgKey: 'error_msg',
  // server 端请求数据 key
  dataKey: 'data',
  // server 端请求状态 key
  codeKey: 'dm_error',
  // server 端请求成功的状态，注意：此为 response.data 下该接口请求成功的状态码，非浏览器中 http 请求返回的成功状态（200）
  successCode: 0
}

axiosService.init(axios, { requestDefaults })

// 超时时间
axios.defaults.timeout = TIME_OUT

// 请求拦截器
axios.interceptors.request.use(config => {
  // const { url } = config
  // // 获取app
  // const state = store.getState()
  // const { authApp: { curApp, appList } } = state
  // // 根据app获取域名
  // const { root: host } = getApiHost(curApp, appList)
  // // 礼物墙接口 更改域名
  // if (url.includes('api/v1/gift_wall') && !url.includes(host)) {
  //   // 替换域名
  //   config.url = url.replace(root, host)
  // }
  // const { autoLoading } = config

  // if (autoLoading === undefined || autoLoading === true) {
  // }

  // 将 ticket 放入 header 或 query 中，按需选用，二选一
  // setTicketToHeader(config)
  // setTicketToParams(config)

  // setAppidToHeader(config)

  return config
}, error => {
  console.error('加载超时')
  message.error('服务器开小差了，请稍后再试')
  return Promise.reject(error)
})

// 响应拦截器
axios.interceptors.response.use(response => {
  const { autoLoading } = response.config

  if (autoLoading === undefined || autoLoading === true) {
  }

  const { data = {} } = response
  const { msgKey, codeKey, successCode } = requestDefaults

  const code = data[codeKey]

  if (code === 4000001 || code === 4000003) {
    // $user.logout()
  } else if (code !== successCode) {
    message.error(data[msgKey] || '接口响应异常，请联系管理员')
  }

  return response
}, error => {
  console.error('加载失败')
  message.error('服务器开小差了，请稍后再试')
  return Promise.reject(error)
})
