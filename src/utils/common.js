import './proto-extension';
import $user from '@/utils/user'
import srcConfig from '@/config'
import _ from 'lodash'
import moment from 'moment'
import classnames from 'classnames';
import { getButtonAuthority } from './authority'

const userAgent = navigator.userAgent;
const toString = Object.prototype.toString;
export const timeFormatStr = 'yyyy-MM-dd hh:mm:ss';
const $common = {
  // isIos: userAgent.match(/iPhone/i) || userAgent.match(/iPad/i) || userAgent.match(/iPod/i),

  // isAndroid: !$common.isIos,

  // isWx: userAgent.match(/MicroMessenger/i),

  // isFirefox: userAgent.match(/Firefox/i),

  // isPc: !['Android', 'iPhone', 'SymbianOS', 'Windows Phone', 'iPad', 'iPod'].some((model) => userAgent.indexOf(model) > -1),

  ua: (function () {
    const regs = {
      // 系统 'ios': /iphone|ipad|ipod/,
      android: /android/i,

      // 机型
      iphone: /iphone/i,
      ipad: /ipad/i,
      ipod: /ipod/i,

      // 环境
      weixin: /micromessenger/i,
      mqq: /QQ\//i,
      app: /inke/i,
      alipay: /aliapp/i,
      weibo: /weibo/i,
      // 浏览器
      chrome: /chrome\//i,
    };

    const ret = {};
    Object.keys(regs).forEach(key => {
      const reg = regs[key];
      ret[key] = reg.test(userAgent);
    });

    ret.ios = ret.iphone || ret.ipad || ret.ipod;
    ret.mobile = ret.ios || ret.android;
    ret.pc = !ret.mobile;

    ret.chrome = !!window.chrome;

    return ret;
  }()),

  regs: {
    telephone: /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/,
  },

  /**
   * 参数格式化, 符合url方式
   * @params {Object} {a: '123', age: '18'}
   * @return {String} 'a=123&age=18'
   */
  stringifyParams (params, cb) {
    let name;
    let value;
    let str = '';

    /* eslint-disable-next-line */
    for (name in params) {
      value = params[name];
      str += `${name}=${typeof cb === 'function' ? cb(value, name) : value}&`;
    }

    return str.slice(0, -1);
  },

  /**
   * 将url中? 后面的参数, 变成一个json
   * @return {Object}
   * @example 'a=1&b=3' => {a: 1, b: 3}
   */
  getUrlParams (sourceStr) {
    // 防止hash值, 影响参数名称
    let search;
    if (sourceStr) {
      search = sourceStr.indexOf('?') > -1 ? sourceStr.split('?').slice(-1).toString() : sourceStr;
    } else {
      // 链接中的最后一个
      search = window.location.href.indexOf('?') > -1 && window.location.href.split('?').slice(-1).toString().replace(/#!\/.+/, '');
    }

    // 如果没有, 则返回空对象
    if (!search) return {};

    const searchArr = decodeURIComponent(search).split('&');

    const urlParams = {};

    /* eslint-disable-next-line array-callback-return */
    searchArr.map(str => {
      const paramArr = str.split('=');
      // 如果已经有该参数就不添加进去了
      if (urlParams[paramArr[0]]) return false;

      urlParams[paramArr[0]] = unescape(paramArr[1]);
    });

    return urlParams;
  },

  /**
   * 得到url中某个参数
   */
  getUrlQuery (name) {
    const reg = new RegExp(`(^|&)${name}=([^&]*)(&|$)`, 'i');
    const search = window.location.search.substring(1) || (window.location.href.split('?')[1] && window.location.href.split('?')[1].replace(/#!\/.+/, ''));
    if (!search) return false;
    const r = search.replace('#', '').match(reg);

    if (r != null) {
      // 对编码的字符串进行解码
      const unescapeStr = unescape(r[2]);
      switch (unescapeStr) {
        case 'true':
          return true;
        case 'null':
          return null;
        case 'false':
          return false;
        case 'undefined':
          return undefined;
        default:
          return unescapeStr;
      }
    } else {
      return null;
    }
  },

  /**
   * 判断对象是否为空
   * @return {Boolean} 是否是空对象
   */
  isEmptyObject (obj) {
    let key;

    /* eslint-disable-next-line */
    for (key in obj) {
      return false;
    }

    return true;
  },

  isObject (obj) {
    return toString.call(obj) === '[object Object]';
  },

  /**
   * 拷贝, 支持深拷贝, 支持多个参数
   * 第一个参数如果为 boolean类型且为true, 做深拷贝
   * @example
   * 浅拷贝 common.copy({name: 'libaoxu'}, {age: 18}) => { name: 'libaoxu', age: 18 }
   * 深拷贝 common.copy(true, {name: 'libaoxu', age: 18, obj: {sex: '1', love: 'bei'}}, {name: 'deep', obj: {sex: '2'}}) => { name: 'deep', age: 18, obj: { sex: 2, love: 'bei' } }
   */
  copy (...args) {
    let target = args[0] || {};
    let i = 1;
    const length = args.length;
    let deep = false;

    if (typeof target === 'boolean') {
      deep = target;
      target = args[1] || {};
      i++;
    }

    if (typeof target !== 'object' && typeof target !== 'function') {
      target = {};
    }

    for (; i < length; i++) {
      let options;
      /* eslint-disable-next-line no-cond-assign */
      if ((options = args[i]) != null) {
        /* eslint-disable-next-line */
        for (const prop in options) {
          const src = target[prop];
          const copy = options[prop];

          /* eslint-disable-next-line */
          if (target === copy) continue;

          let copyIsArray;

          /* eslint-disable-next-line */
          if (deep && copy && $common.isObject(copy) || (copyIsArray = Array.isArray(copy))) {
            let clone;
            if (copyIsArray) {
              copyIsArray = false;
              clone = src && Array.isArray(src) ? src : [];
            } else {
              clone = src && $common.isObject(copy) ? src : {};
            }

            target[prop] = $common.copy(deep, clone, copy);
          } else if (copy != null) {
            target[prop] = copy;
          }
        }
      }
    }
    return target;
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
    let timeout;
    let context;
    let args;
    let result;
    let previous = 0;
    if (!options) options = {};

    const later = function () {
      previous = options.leading === false ? 0 : Date.now();
      timeout = null;
      result = func.apply(context, args);
      /* eslint-disable-next-line no-multi-assign */
      if (!timeout) context = args = null;
    };

    const throttled = function () {
      const now = Date.now();
      if (!previous && options.leading === false) previous = now;
      const remaining = wait - (now - previous);
      // console.log('remaining: ', remaining, 'now: ', now, 'previous: ', previous, remaining > wait)
      context = this;
      /* eslint-disable-next-line prefer-rest-params */
      args = arguments;
      // remaining > wait 防止用户修改系统时间
      if (remaining <= 0 || remaining > wait) {
        if (timeout) {
          // console.log('clear timeout')
          clearTimeout(timeout);
          timeout = null;
        }
        // console.log('remaining <=0 || remaining > wait')
        // 进来之后 previous 才被赋值, 保证第一次执行成功
        previous = now;
        result = func.apply(context, args);
        /* eslint-disable-next-line no-multi-assign */
        if (!timeout) context = args = null;
      } else if (!timeout && options.trailing !== false) { // !timeout, 保证上一次later执行完的 标识
        // console.log('!timeout: ', timeout)
        timeout = setTimeout(later, remaining);
      }
      return result;
    };

    throttled.cancel = function () {
      clearTimeout(timeout);
      previous = 0;
      /* eslint-disable-next-line no-multi-assign */
      timeout = context = args = null;
    };

    return throttled;
  },

  // 生成随机ID：GUID
  genId () {
    /* eslint-disable no-bitwise */
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
      const r = Math.random() * 16 | 0;
      const v = c === 'x' ? r : ((r & 0x3) | 0x8);
      return v.toString(16);
    }).toUpperCase();
    /* eslint-enable no-bitwise */
  },

  noop () {},

  isDef: v => (v !== undefined),

  emptyObj: {},

  getDisplayName: Component => (Component.displayName || Component.name),

  /**
   * 下载文件
   * @param {String} url 下载接口
   * @param {Object} params 参数
   * @param {Function} method 方法 post|get
   */
  downloadByForm (url, params, method) {
    // 传入用户信息
    const userInfo = $user.get()
    params.system_id = userInfo.system_id
    params.ticket = $user.getToken()

    var form = document.createElement('form')
    form.id = 'form'
    form.name = 'form'
    document.body.appendChild(form)
    for (var obj in params) {
      if (params.hasOwnProperty(obj)) {
        var input = document.createElement('input')
        input.tpye = 'hidden'
        input.name = obj
        input.value = params[obj] || ''
        form.appendChild(input)
      }
    }
    form.method = method || 'GET'
    form.action = srcConfig.APIS.root + url
    form.submit()
    document.body.removeChild(form)
  },

  getButtonAuthority,

  /**
   * less防污染命名
   * @param {String} prefix  - Unique Key
   * @param {styles} styles  - sass style
   */
  classnames: (prefix, styles) => {
    const cx = classnames.bind(styles);
    return (...names) =>
      cx(
        _.map(names, name => {
          if (typeof name === 'string') {
            return `${prefix}-${name}`;
          } else if (typeof name === 'object') {
            const returnObj = {};
            for (const key in name) {
              if (Object.prototype.hasOwnProperty.call(name, key)) {
                const element = name[key];
                returnObj[`${prefix}-${key}`] = element;
              }
            }
            return returnObj;
          }
          return '';
        })
      );
  },
  /**
   * 字符串转数子
   * @param {String} - 字符串
   * @param {number} - 转换失败的默认值
   */
  formatStrToNum: (str, num = 0) => {
    if (!str) return num
    const newNum = parseInt(str)
    if (isNaN(newNum)) return num
    return newNum
  },
};

export default $common;
