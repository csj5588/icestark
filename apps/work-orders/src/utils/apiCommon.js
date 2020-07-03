import $user from 'user'

export const setTicketToHeader = instance => {
  reqInterceptor(instance, config => {
    const { headers } = config
    headers.ticket = $user.getToken()
  })
}

export const setTicketToParams = instance => {
  reqInterceptor(instance, config => {
    const { params } = config
    params.ticket = $user.getToken()
  })
}

/**
 * 请求拦截器
 * @param {object} instance - axios实例
 * @param {function} handleConfig
 * @returns 拦截器
 */
export const reqInterceptor = (instance, handleConfig) => {
  return instance.interceptors.request.use(config => {
    handleConfig(config)
    return config
  }, error => {
    console.log(error)
    return Promise.reject(error)
  })
}

/**
 * 响应拦截器
 * @param {object} instance - 实例
 * @param {function} handleConfig
 * @returns 拦截器
 */
export const resInterceptor = (instance, handleConfig) => {
  return instance.interceptors.response.use(config => {
    handleConfig(config)
    return config
  }, error => {
    console.log('error', error)
    return Promise.reject(error)
  })
}

/**
 * 移除请求拦截器
 * @param {object} instance 实例
 * @param {object} interceptor 要移除的拦截器
 */
export const rmReqInterceptor = (instance, interceptor) => {
  instance.interceptors.request.eject(interceptor)
}

/**
 * 移除响应拦截器
 */
export const rmResInterceptor = (instance, interceptor) => {
  instance.interceptors.response.eject(interceptor)
}
