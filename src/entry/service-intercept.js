import axios from 'axios'
import axiosService from 'axios-service'
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
  return config
}, error => {
  console.error('加载超时')
  message.error('服务器开小差了，请稍后再试')
  return Promise.reject(error)
})

// 响应拦截器
axios.interceptors.response.use(response => {
  const { autoLoading } = response.config

  const { data = {} } = response
  const { msgKey, codeKey, successCode } = requestDefaults

  const code = data[codeKey]

  if (code !== successCode) {
    message.error(data[msgKey] || '接口响应异常，请联系管理员')
  }

  return response
}, error => {
  console.error('加载失败')
  message.error('服务器开小差了，请稍后再试')
  return Promise.reject(error)
})
