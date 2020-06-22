import './proto-extension'

let userAgent = navigator.userAgent
const toString = Object.prototype.toString

// base64加密解谜
export const Base64 = {
  _keyStr: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=',
  encode: function (e) {
    var t = '';
    var n, r, i, s, o, u, a;
    var f = 0;
    e = Base64._utf8_encode(e);
    while (f < e.length) {
      n = e.charCodeAt(f++);
      r = e.charCodeAt(f++);
      i = e.charCodeAt(f++);
      s = n >> 2;
      o = (n & 3) << 4 | r >> 4;
      u = (r & 15) << 2 | i >> 6;
      a = i & 63;
      if (isNaN(r)) {
        u = a = 64
      } else if (isNaN(i)) {
        a = 64
      }
      t = t + this._keyStr.charAt(s) + this._keyStr.charAt(o) + this._keyStr.charAt(u) + this._keyStr.charAt(a)
    }
    return t
  },
  decode: function (e) {
    var t = '';
    var n, r, i;
    var s, o, u, a;
    var f = 0;
    e = e.replace(/[^A-Za-z0-9+/=]/g, '');
    while (f < e.length) {
      s = this._keyStr.indexOf(e.charAt(f++));
      o = this._keyStr.indexOf(e.charAt(f++));
      u = this._keyStr.indexOf(e.charAt(f++));
      a = this._keyStr.indexOf(e.charAt(f++));
      n = s << 2 | o >> 4;
      r = (o & 15) << 4 | u >> 2;
      i = (u & 3) << 6 | a;
      t = t + String.fromCharCode(n);
      if (u !== 64) {
        t = t + String.fromCharCode(r)
      }
      if (a !== 64) {
        t = t + String.fromCharCode(i)
      }
    }
    t = Base64._utf8_decode(t);
    return t
  },
  _utf8_encode: function (e) {
    e = e.replace(/rn/g, 'n');
    var t = '';
    for (var n = 0; n < e.length; n++) {
      var r = e.charCodeAt(n);
      if (r < 128) {
        t += String.fromCharCode(r)
      } else if (r > 127 && r < 2048) {
        t += String.fromCharCode(r >> 6 | 192);
        t += String.fromCharCode(r & 63 | 128)
      } else {
        t += String.fromCharCode(r >> 12 | 224);
        t += String.fromCharCode(r >> 6 & 63 | 128);
        t += String.fromCharCode(r & 63 | 128)
      }
    }
    return t
  },
  _utf8_decode: function (e) {
    var t = '';
    var n = 0;
    var c2;
    var c1;
    var r = c1 = c2 = 0;
    while (n < e.length) {
      r = e.charCodeAt(n);
      if (r < 128) {
        t += String.fromCharCode(r);
        n++
      } else if (r > 191 && r < 224) {
        c2 = e.charCodeAt(n + 1);
        t += String.fromCharCode((r & 31) << 6 | c2 & 63);
        n += 2
      } else {
        c2 = e.charCodeAt(n + 1);
        c3 = e.charCodeAt(n + 2);
        t += String.fromCharCode((r & 15) << 12 | (c2 & 63) << 6 | c3 & 63);
        n += 3
      }
    }
    return t
  }
}
const $common = {
  // isIos: userAgent.match(/iPhone/i) || userAgent.match(/iPad/i) || userAgent.match(/iPod/i),

  // isAndroid: !$common.isIos,

  // isWx: userAgent.match(/MicroMessenger/i),

  // isFirefox: userAgent.match(/Firefox/i),

  // isPc: !['Android', 'iPhone', 'SymbianOS', 'Windows Phone', 'iPad', 'iPod'].some((model) => userAgent.indexOf(model) > -1),

  ua: (function () {
    const regs = {
      // 系统 'ios': /iphone|ipad|ipod/,
      'android': /android/i,

      // 机型
      'iphone': /iphone/i,
      'ipad': /ipad/i,
      'ipod': /ipod/i,

      // 环境
      'weixin': /micromessenger/i,
      'mqq': /QQ\//i,
      'app': /inke/i,
      'alipay': /aliapp/i,
      'weibo': /weibo/i,
      // 浏览器
      'chrome': /chrome\//i
    };

    const ret = {}
    Object.keys(regs).forEach((key) => {
      var reg = regs[key]
      ret[key] = reg.test(userAgent)
    })

    ret.ios = ret.iphone || ret.ipad || ret.ipod;
    ret.mobile = ret.ios || ret.android;
    ret.pc = !ret.mobile;

    ret.chrome = !!window.chrome
    
    return ret;
  })(),

  regs: {
    telephone: /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/
  },

  /**
   * 参数格式化, 符合url方式
   * @params {Object} {a: '123', age: '18'}
   * @return {String} 'a=123&age=18'
   */
  stringifyParams (params, cb) {
    let name
    let value
    let str = ''

    for (name in params) {
      value = params[name]
      str += name + '=' + (typeof cb === 'function' ? cb(value, name) : value) + '&'
    }

    return str.slice(0, -1)
  },
  /**
   * 将url中? 后面的参数, 变成一个json
   * @return {Object}
   * @example 'a=1&b=3' => {a: 1, b: 3}
   */
  getUrlParams (sourceStr) {
    // 防止hash值, 影响参数名称
    let search
    if (sourceStr) {
      search = sourceStr.indexOf('?') > -1 ? sourceStr.split('?').slice(-1).toString() : sourceStr
    } else {
      // 链接中的最后一个
      search = location.href.indexOf('?') > -1 && location.href.split('?').slice(-1).toString().replace(/#!\/.+/, '')
    }

    // 如果没有, 则返回空对象
    if (!search) return {}

    let searchArr = decodeURIComponent(search).split('&')

    let urlParams = {}

    searchArr.map((str) => {
      let paramArr = str.split('=')
      // 如果已经有该参数就不添加进去了
      if (urlParams[paramArr[0]]) return false

      urlParams[paramArr[0]] = unescape(paramArr[1])
    })

    return urlParams
  },

  /**
   * 得到url中某个参数
   */
  getUrlQuery (name) {
    let reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i')
    let search = location.search.substring(1) || location.href.split('?')[1] && location.href.split('?')[1].replace(/#!\/.+/, '')
    if (!search) return false
    let r = search.replace('#', '').match(reg)

    if (r != null) {
      // 对编码的字符串进行解码
      let unescapeStr = unescape(r[2])
      switch (unescapeStr) {
        case 'true':
          return true
        case 'null':
          return null
        case 'false': 
          return false
        case 'undefined':
          return undefined
        default:
          return unescapeStr
      }
    } else {
      return null
    }
  },

  /**
   * 判断对象是否为空
   * @return {Boolean} 是否是空对象
   */
  isEmptyObject (obj) {
    let key

    for (key in obj) {
      return false
    }

    return true
  },


  isObject (obj) {
    return toString.call(obj) === '[object Object]'
  },

  /**
   * 拷贝, 支持深拷贝, 支持多个参数
   * 第一个参数如果为 boolean类型且为true, 做深拷贝
   * @example
   * 浅拷贝 common.copy({name: 'libaoxu'}, {age: 18}) => { name: 'libaoxu', age: 18 }
   * 深拷贝 common.copy(true, {name: 'libaoxu', age: 18, obj: {sex: '1', love: 'bei'}}, {name: 'deep', obj: {sex: '2'}}) => { name: 'deep', age: 18, obj: { sex: 2, love: 'bei' } }
   */
  copy () {
    let target = arguments[0] || {}
    let i = 1
    let length = arguments.length
    let deep = false

    if (typeof target === 'boolean') {
      deep = target
      target = arguments[1] || {}
      i++
    }

    if (typeof target !== 'object' && typeof target !== 'function') {
      target = {}
    }

    for (; i < length; i++) {
      let options
      if ((options = arguments[i]) != null) {
        for (let prop in options) {
          let src = target[prop]
          let copy = options[prop]

          if (target === copy) continue

          let copyIsArray
          
          if (deep && copy && $common.isObject(copy) || (copyIsArray = Array.isArray(copy))) {
            let clone
            if (copyIsArray) {
              copyIsArray = false
              clone = src && Array.isArray(src) ? src : []
            } else {
              clone = src && $common.isObject(copy) ? src : {}
            }

            target[prop] = $common.copy(deep, clone, copy)
          } else if (copy != null) {
            target[prop] = copy
          }
        }
      }
    }

    return target
  },

  /**
   * 节流函数 
   * @param {Function} func 回调函数
   * @param {Number} wait 等待时间
   * @param {Object} options 配置参数
   * @property options.leading false: 如果你想禁用第一次首先执行的
   * @property options.trailing false: 你想禁用最后一次执行的话
   */
  throttle (func, wait, options = {}) {
    let timeout
    let context
    let args
    let result
    let previous = 0
    if (!options) options = {}

    const later = function () {
      previous = options.leading === false ? 0 : Date.now()
      timeout = null
      result = func.apply(context, args)
      if (!timeout) context = args = null
    }

    const throttled = function () {
      let now = Date.now()
      if (!previous && options.leading === false) previous = now
      let remaining = wait - (now - previous)
      // console.log('remaining: ', remaining, 'now: ', now, 'previous: ', previous, remaining > wait)
      context = this
      args = arguments
      // remaining > wait 防止用户修改系统时间
      if (remaining <= 0 || remaining > wait) {
        if (timeout) {
          // console.log('clear timeout')
          clearTimeout(timeout)
          timeout = null
        }
        // console.log('remaining <=0 || remaining > wait')
        // 进来之后 previous 才被赋值, 保证第一次执行成功
        previous = now
        result = func.apply(context, args)
        if (!timeout) context = args = null
      } else if (!timeout && options.trailing !== false) { // !timeout, 保证上一次later执行完的 标识
        // console.log('!timeout: ', timeout)
        timeout = setTimeout(later, remaining)
      }
      return result
    }

    throttled.cancel = function () {
      clearTimeout(timeout)
      previous = 0
      timeout = context = args = null
    }

    return throttled
  },

  noop () {},

  isDef: v => (v !== undefined)
  
}

export default $common