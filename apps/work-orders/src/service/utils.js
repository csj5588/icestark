import config from './config'
import $common from 'src/utils/common'

/**
 * 序列化参数
 */
export const getSerializeParam = function (params) {
  let key
  let str = ''
  for (key in params) {
    str += '&' + key + '=' + params[key]
  }
  return str.substring(1)
}

/**
 * 可扩展的api对象
 * @param {Function) fRule 扩展前的规则函数
 * @return {Object} 扩展的方法集合
 * extend 方法, 根据扩展规则, 扩展到源对象上
 */
export const getExtendObject = function (fRule) {
  var _service = Object.create(null)

  return Object.defineProperty(_service, '$extend', {
    ...config.definePropertySet,
    value: function serviceExtend (obj) {
      return Object.assign(this, fRule(obj))
    }
  })
}

const _defaultSetting = config.urlCurrySettings

export const getCurryUrl = (rootURL, reqType) => {
  /**
   * @param {Object|String} params 总对象 | url请求路劲
   * @param {Object} _data 默认数据
   * @param {Object} _options  请求对象(axios) 相关配置
   * @param {Object} _settings 接口请求相关配置
   */
  return (params = {}, _options = {}, _settings = {}, _data = {}) => {
    let url, data, options, settings
    
    if (typeof params === 'string') {
      url = params
      options = _options
      settings = _settings
      data = _data
    } else {
      url = params.url
      data = params.data || _data
      options = params.options || _options
      settings = params.settings || _settings
    }

    return {
      url: rootURL + url,
      type: reqType,
      data,
      options: options || {},
      settings: Object.assign({}, _defaultSetting, settings)
    }
  }
}

export const getRequestRoots = (root) => {
  const self = {
    /**
     * root地址 的 get 请求函数,
     * @type {Function}
     */
    getRoot: getCurryUrl(root, config.REQ_TYPE.GET),

    /**
     * root地址 的 post 请求函数, 次函数执行后得到 apiConfig需要的json对象
     * @type {Function}
     */
    postRoot: getCurryUrl(root, config.REQ_TYPE.POST),

    /**
     * root地址 的 delete 请求函数, 次函数执行后得到 apiConfig需要的json对象
     * @type {Function}
     */
    deleteRoot: getCurryUrl(root, config.REQ_TYPE.DELETE),

    /**
     * 给postRoot 增加默认的参数, 变成x-www-form-urlencoded形势
     */
    postRootXForm: ({ url, data, options, settings }) => {
      return self.postRoot({
        url,
        data,
        options: $common.copy(true, {}, config.xFormOptions, options),
        settings
      })
    }
  }

  return self
}