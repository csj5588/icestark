import axios from 'axios'
import axiosService from 'axios-service'
import srcConfig from '@/config'
import $user from '@/utils/user'
import { message } from 'antd'

// 设置 ticket 和 system_id
const setTicketAndSystemIdToParams = config => {
  const { params = {} } = config

  config.params = {
    ...params,
    ticket: $user.getToken(),
    system_id: srcConfig.AUTH_SYSTEM_ID
  }
}

const TIME_OUT = srcConfig.TIME_OUT

// 单独走新的 axios 实例
const instance = axios.create()

const authAxiosService = axiosService.create()

authAxiosService.init(instance, {
  requestDefaults: {
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
})

// 超时时间
instance.defaults.timeout = TIME_OUT

// 请求拦截器
instance.interceptors.request.use(config => {
  const { autoLoading } = config

  if (autoLoading === undefined || autoLoading === true) {
    // loading.show()

    // let _timer = setTimeout(() => {
    //   clearTimeout(_timer)
    //   loading.hide()
    // }, TIME_OUT)
  }

  setTicketAndSystemIdToParams(config)

  return config
}, error => {
  // loading.hide()
  console.error('加载超时')
  message.error('服务器开小差了，请稍后再试')
  return Promise.reject(error)
})

// 响应拦截器
instance.interceptors.response.use(response => {
  const { autoLoading } = response.config

  if (autoLoading === undefined || autoLoading === true) {
    // loading.hide()
  }

  const { data = {} } = response

  if (data.dm_error === 4000001 || data.dm_error === 4000003) {
    $user.logout()
  } else if (data.dm_error !== 0) {
    message.error(data.error_msg || '接口响应异常，请联系管理员')
  }

  return response
}, error => {
  // loading.hide()
  console.error('加载失败')
  message.error('服务器开小差了，请稍后再试')
  return Promise.reject(error)
})

export const { service, getRequestsByRoot, getMockDecoratorByEnv } = authAxiosService
