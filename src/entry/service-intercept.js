import axios from 'axios'
import axiosService from 'axios-service'
// import loading from 'components/loading'
import srcConfig from '@/config'
import $user from '@/utils/user'
import Cookie from '@/utils/cookies'
import { message } from 'antd'
import store from '@/store'
import build from '@/config/build';

const root = srcConfig.APIS.root
const saveAppKey = 'cur-auth-app'
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
  const { url } = config
  // 将 ticket 放入 header 或 query 中，按需选用，二选一
  // setTicketToHeader(config)
  setTicketToParams(config)
  return config
}, error => {
  // loading.hide()
  console.error('加载超时')
  message.error('服务器开小差了，请稍后再试')
  return Promise.reject(error)
})

// 响应拦截器
axios.interceptors.response.use(response => {
  const { autoLoading } = response.config

  if (autoLoading === undefined || autoLoading === true) {
    // loading.hide()
  }

  const { data = {} } = response
  const { msgKey, codeKey, successCode } = requestDefaults

  const code = data[codeKey]

  if (code === 4000001 || code === 4000003) {
    $user.logout()
  } else if (code !== successCode) {
    message.error(data[msgKey] || '接口响应异常，请联系管理员')
  }

  return response
}, error => {
  // loading.hide()
  console.error('加载失败')
  message.error('服务器开小差了，请稍后再试')
  return Promise.reject(error)
})
