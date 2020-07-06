/* eslint-disable */
/**
 * 默认所有 .inke.cn子域名
 * @type {String}
 *
 * @example
 * locahost:8080 | 172.0.0.1:8080 => locahost | 172.0.0.1
 * act.inke.cn => .inke.cn
 */
const DOMAIN = location.hostname.replace(/[a-z]+\./, '.')

/**
 * 默认为当前文档位置的路径
 * @type {String}
 */
const PATH = '/'

/**
 * 是否https协议, 默认否
 * @type {Boolean}
 */
const SECURE = false

/**
 * 过期的默认时间, 二年
 * @type {Number}
 */
const END_TIME = 60 * 60 * 24 * 365 * 2

export default {

  /**
   * 获取某个key的cookie
   *
   * @param {String} sKey
   * @returns {String} cookie的值
   */
  getItem: function (sKey) {
    return decodeURIComponent(
        document.cookie.replace(new RegExp('(?:(?:^|.*;)\\s*'
        + encodeURIComponent(sKey).replace(/[\-\.\+\*]/g, '\\$&')
        + '\\s*\\=\\s*([^;]*).*$)|^.*$'), '$1')
      )
      .replace(/"|'/g, '') || null
  },

  /**
   * 设置克制
   *
   * @param {String} sKey key值
   * @param {String} sValue value值
   * @param {String|Number|Date} vEnd 过期时间
   * @param {String} sPath 根路径
   * @param {String} sDomain 域名
   * @param {Boolean} bSecure 安全
   * @returns
   */
  setItem: function (sKey, sValue, vEnd, sPath, sDomain, bSecure) {
    if (!sKey || /^(?:expires|max\-age|path|domain|secure)$/i.test(sKey)) { return false; }

    let sExpires = '';
    if (vEnd) {
      switch (vEnd.constructor) {
        case Number:
          sExpires = vEnd === Infinity ? '; expires=Fri, 31 Dec 9999 23:59:59 GMT' : '; max-age=' + vEnd;
          break;
        case String:
          sExpires = '; expires=' + vEnd
          break;
        case Date:
          sExpires = '; expires=' + vEnd.toUTCString();
          break;
      }
    } else {
      // 不传默认为2年
      sExpires = '; max-age=' + END_TIME
    }

    document.cookie = encodeURIComponent(sKey) + '=' + encodeURIComponent(sValue)
      + sExpires
      + '; domain=' + (sDomain ? sDomain : DOMAIN)
      + '; path=' + (sPath || PATH)
      + (bSecure ? '; secure' : '')

    return true
  },

  /**
   * 删除某个key
   *
   * @param {String} sKey 删除的字段
   * @param {String} sPath 路径
   * @param {String} sDomain 域名
   * @returns
   */
  removeItem: function (sKey, sPath, sDomain) {
    if (!sKey || !this.hasItem(sKey)) { return false; }

    document.cookie = encodeURIComponent(sKey)
      + '=; expires=Thu, 01 Jan 1970 00:00:00 GMT'
      + (sDomain ? '; domain=' + sDomain : DOMAIN)
      + (sPath ? '; path=' + sPath : PATH);

    return true
  },


  /**
   * cookie中是否有该key的值
   *
   * @param {String} sKey
   * @returns {Boolean}
   */
  hasItem: function (sKey) {
    return (new RegExp('(?:^|;\\s*)' + encodeURIComponent(sKey).replace(/[\-\.\+\*]/g, '\\$&') + '\\s*\\=')).test(document.cookie);
  },

  /**
   * 获取当前域下的所有cookie的key数组
   *
   * @returns {Array}
   */
  keys: /* optional method: you can safely remove it! */ function () {
    let aKeys = document.cookie.replace(/((?:^|\s*;)[^\=]+)(?=;|$)|^\s*|\s*(?:\=[^;]*)?(?:\1|$)/g, '').split(/\s*(?:\=[^;]*)?;\s*/);
    for (let i = 0, len = aKeys.length; i < len; i++) {
      aKeys[i] = decodeURIComponent(aKeys[i])
    }
    return aKeys
  }
}
