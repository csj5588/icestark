import commonUtil from 'src/utils/common'
import loading from 'components/loading'
import observer from 'src/utils/observer'
import serviceConfig from './config'

let __instance
const events = {
  beforeSend: 'SERVICE_BEFORE_SEND',
  afterSend: 'SERVICE_AFTER_SEND',
  errorSend: 'SERVICE_ERROR_SEND',
}

const transDataToURLSearchParams = function(obj) {
  const params = new URLSearchParams()

  Object.keys(obj).forEach(key => {
    params.append(key, obj[key])
  })

  return params
}

class Request {
  constructor(opts) {
    if (__instance) return this
    __instance = this

    this.$http = opts.$http
    this.shortParamsList = opts.shortParamsList
    this.isMock = opts.isMock
    this.mocks = opts.mocks

    this._beforeSendSub()
    this._afterSendSub()
    this._errorSendSub()
  }

  getServiceParams(serviceParams) {
    let { url, type, data, options, settings = {} } = serviceParams
    let { stringParamsToUrl } = settings
    let isShort = this.shortParamsList.indexOf(type) > -1

    if (
      options.headers &&
      options.headers['Content-Type'] ===
        serviceConfig.xFormOptions.headers['Content-Type']
    ) {
      data = transDataToURLSearchParams(data)
    }
    const { nativeDelete } = settings
    if (nativeDelete) {
      console.log('nativeDelete')
      return {
        url,
        data,
        type,
        options,
        settings,
      }
    }
    if (isShort) {
      let query = commonUtil.stringifyParams(data)
      let _url = url + (query ? `?${query}` : '')

      /**
       * 兼容http://test.svrtree.inkept.cn/api/v1/tree/depth/3 如此restful传参方式
       * 1.url需以'/'结尾
       * 2.固定key［String］：restful
       */
      if (
        serviceParams.url &&
        serviceParams.url.substring(serviceParams.url.length - 1) === '/'
      ) {
        _url = url + data.restful
      }

      return {
        // url: url + (query ? `?${query}` : ''),
        url: _url,
        data: null,
        type,
        options,
        settings,
      }
    } else {
      let _url = url
      // 有那种恶心的需求, 就是明明是post, 参数还得放到url上
      if (stringParamsToUrl) {
        let query = commonUtil.stringifyParams(data)
        _url = url + (query ? `?${query}` : '')

        /**
         * 兼容http://test.svrtree.inkept.cn/api/v1/tree/depth/3 如此restful传参方式
         * 1.url需以'/'结尾
         * 2.固定key［String］：restful
         */
        if (
          serviceParams.url &&
          serviceParams.url.substring(serviceParams.url.length - 1) === '/'
        ) {
          _url = url + data.restful
        }

        data = null
      }
      console.log(data)
      return {
        ...serviceParams,
        url: _url,
        data,
      }
    }
  }

  getRequestFunc(key, apiConfig) {
    return (data, options, settings) => {
      const $http = this.$http
      const serviceParams = this.getServiceParams(
        commonUtil.copy(true, { data, options, settings }, apiConfig),
      )
      let {
        url,
        type,
        data: _data,
        options: _options,
        settings: _settings,
      } = serviceParams
      let isShort = this.shortParamsList.indexOf(type) > -1

      return new Promise((resolve, reject) => {
        let $httpFunc = $http[type]

        if (typeof $httpFunc === 'function') {
          observer.publish(events.beforeSend, { serviceParams, key, apiConfig })

          return (
            $httpFunc
              .call($http, url, !isShort ? _data : _options, _options)
              // return this.$http({
              //   type,
              //   url,
              //   data,
              //   ..._options
              // })
              .then(
                res => {
                  const { status, data } = res

                  // console.log('getRequestFunc', res)

                  if (status === 200) {
                    if (data.status === 0 || data.status === 200) {
                      resolve(data)
                    } else {
                      assert('warn', url, data.msg)
                      reject(data)
                    }
                  }

                  observer.publish(events.afterSend, { serviceParams, res })
                },
                error => {
                  reject(error)
                  assert('error', url, error)
                  observer.publish(events.errorSend, { serviceParams, error })
                },
              )
          )
        } else {
          console.warn('this http function is not possible : ' + resourceFunc)
        }
      })
    }
  }

  getApiCollection(apis) {
    const newApis = {}

    if (!this.$http)
      throw new Error(
        "Service hasn't setReqInstance, Pelease var service = new Service() and service.setReqInstance(http)",
      )

    Object.keys(apis).forEach(key => {
      const reqFn = this.getRequestFunc(key, apis[key])

      reqFn.beforeSend = this.beforeSend
      reqFn.afterSend = this.afterSend
      reqFn.errorSend = this.errorSend
      newApis[key] = reqFn
    })

    return newApis
  }

  _beforeSendSub() {
    observer.subscribe(
      events.beforeSend,
      ({ serviceParams, key, apiConfig }) => {
        let { autoLoading } = serviceParams.settings

        this.isMock && this.mocks.intercept(key, serviceParams)
      },
    )
  }

  _afterSendSub() {
    observer.subscribe(events.afterSend, ({ serviceParams, res }) => {
      let { autoLoading } = serviceParams.settings
    })
  }

  _errorSendSub() {
    observer.subscribe(events.errorSend, ({ serviceParams, error }) => {
      let { autoLoading } = serviceParams.settings
    })
  }

  beforeSend(cb) {
    typeof cb === 'function' && observer.subscribe(events.beforeSend, cb)
  }

  afterSend(cb) {
    typeof cb === 'function' && observer.subscribe(events.afterSend, cb)
  }

  errorSend(cb) {
    typeof cb === 'function' && observer.subscribe(events.errorSend, cb)
  }
}

function assert(logType, $httpUrl, msg) {
  console[logType](`[service request]: url -> ${$httpUrl} , msg -> ${msg}`)
}

export default Request
