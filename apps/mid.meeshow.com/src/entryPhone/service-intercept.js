import axios from 'axios'
import axiosService from 'axios-service'
import loading from 'components/loading'
import srcConfig from 'src/config'
import { Message } from 'antd'

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
  const { autoLoading } = config

  if (autoLoading === undefined || autoLoading === true) {
    loading.show()

    // let _timer = setTimeout(() => {
    //   clearTimeout(_timer)
    //   loading.hide()
    // }, TIME_OUT)
  }

  return config
}, error => {
  loading.hide()
  console.error('加载超时')
  Message.error('服务器开小差了，请稍后再试')
  return Promise.reject(error)
})

// 响应拦截器
axios.interceptors.response.use(response => {
  const { autoLoading } = response.config

  if (autoLoading === undefined || autoLoading === true) {
    loading.hide()
  }

  const { data = {} } = response
  const { msgKey, codeKey, successCode } = requestDefaults

  const code = data[codeKey]

  if (code !== successCode) {
    Message.error(data[msgKey] || '接口响应异常，请联系管理员')
  }

  return response
}, error => {
  loading.hide()
  console.error('加载失败')
  Message.error('服务器开小差了，请稍后再试')
  return Promise.reject(error)
})
