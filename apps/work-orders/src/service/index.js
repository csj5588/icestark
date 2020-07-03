import config from './config'
import srcConfig from 'src/config'
import Request from './request'

const _S = Object.create(null)
let $http
let request

function getRequet ($http) {
  return new Request({
    $http,
    shortParamsList: config.SHORT_PARAMS_LIST,
    isMock: false,
  })
}

function onRequest (request) {
  request.beforeSend((serviceParams) => {
    // console.log(serviceParams)
  })

  request.afterSend((res) => {
    // console.log(res)
  })

  request.errorSend((error) => {
    if (error) {}
  })
}

function onIntercept ($http) {
  $http.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    return config;
  }, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  });

  // 添加响应拦截器
  $http.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    return response;
  }, function (error) {
    // 对响应错误做点什么
    console.log('error', error)
    return Promise.reject(error);
  });
}

const serviceInit = function (_http) {
  $http = _http

  request = getRequet($http)

  onRequest(request)

  onIntercept($http)

  _S.$http = $http
  _S.$request = request
}

/**
 * import S from 'service'
 * import srcConfig from 'src/config'
 * import { getRequestRoots } from 'service/utils'
 *
 * const { getRoot, postRoot, postRootXForm } = getRequestRoots(srcConfig.APIS.root)
 * const apis = {
 *  typeList: postRoot({
 *    url,
 *    data,
 *    options,
 *    settings
 *  })
 * }
 *
 * S.$entend(apis)
 *
 * S.typeList.beforeSend(serviceParams => {})
 * S.typeList.afterSend(res => {})
 *
 * S.typeList(data, options, settings).then(res => {})
 *
 */
export default Object.defineProperties(_S, {
  $extend: {
    ...config.definePropertySet,
    value: function $extend (obj) {
      var apiCollection = request.getApiCollection(obj)
      for (var key in apiCollection) {
        if (!(key in this)) {
          this[key] = apiCollection[key]
        } else {
          console.warn(`有重复的api配置, 可能导致某些请求失效, [api name]: ${key}`)
        }
      }
      return this
    }
  },
  $use: {
    ...config.definePropertySet,
    value: function $use ($http) {
      return serviceInit($http)
    }
  }
})
