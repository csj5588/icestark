import S from 'service'
import axios from 'axios'
// import Message from 'iview-ui/message'
import { Message } from 'ik-iview'

function setTokenToHeaders (config) {
  const { headers } = config
  const token = localStorage.getItem('TOKEN')
  headers.ticket = token
}

export default () => {
  S.$use(axios)
  S.$http.interceptors.request.use(function (config) {
    setTokenToHeaders(config)
    return config;
  }, function (error) {
    console.log('service-init req error', error)
    return Promise.reject(error);
  });

  // 添加响应拦截器
  S.$http.interceptors.response.use(function (response) {
    return response;
  }, function (error) {
    Message.error('【系统错误】：接口响应异常，请联系开发人员！')
    return Promise.reject(error);
  })

  S.$request.beforeSend(({ serviceParams = {}, res = {} }) => {

  })

  S.$request.afterSend(({ serviceParams = {}, res = {} }) => {
    const { settings = {} } = serviceParams
    const { toastText, errToast, successToast } = settings
    const { Code, Msg } = res.data || {}

    if (Code !== null && toastText) {
      if (Code === 1 && successToast) {
        Message.success(`${toastText}成功`)
      } else if (errToast) {
        Message.error({
          content: `${toastText}失败` + (Msg ? `: ${Msg}` : ''),
          duration: 6,
          closable: true
        })
      }
    }
  })
}
