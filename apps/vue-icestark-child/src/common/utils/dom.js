import common from './common'

export default {
  /**
   * 动态创建script标签
   * 
   * @param {String} tagName 标签名字
   * @param {String} url url路径 
   * @returns {Promise} 返回一个promise对象
   * 
   * @example
   * import { common } from 'utils'
   * 或
   * import common from 'utils/common'
   * 
   * common.insertTagToDocument('script', 'http://www.baidu.com')
   * .then(() => {
   *  
   * })
   * 
   */
  insertTagToDocument (tagName, url, params, asyncOrDefer = 'async') {
    return new Promise((resolve, reject) => {
      var elem = document.createElement(tagName)
      var firstElem = document.getElementsByTagName(tagName)[0]
      elem[asyncOrDefer] = 1
      elem.src = url

      if (params instanceof Object) {
        url += '?' + common.stringifyParams(params)
      } else if (typeof params === 'string') {
        url += '?' + params
      }

      if (firstElem) {
        firstElem.parentNode.insertBefore(elem, firstElem)
      } else {
        document.head.appendChild(elem)
      }

      elem.onload = resolve
      elem.onerror = reject
    })
  },

  /**
   * 获取display:none 元素的宽, 高
   * @param {Element} el 需要获取的dom元素
   * @return {Object} obj.height: 高, obj.width: 宽
   */
  getDisplayNoneOffset (el) {
    let height = 0
    let width = 0
    if (!el || el.nodeType !== 1) return { height, width }

    // 拷贝子元素
    let clone = el.cloneNode(true)

    // 创建一个临时 用visibility隐藏, 只为获取高度,
    clone.style.cssText = `display: block
      position: absolute
      visibility: hidden
      height: auto
      z-index: -10
    `

    // 父级存在且为dom元素
    if (el.parentElement && el.parentElement.nodeType === 1) {
      el.parentElement.appendChild(clone)
      height = clone.offsetHeight
      width = clone.offsetWidth
      // 获取完高度, 及时删除
      el.parentElement.removeChild(clone)
      clone = null
    }

    return { height, width }
  },

  getScrollTop () {
    return document.documentElement.scrollTop || document.body.scrollTop
  },

  setScrollTop (num) {
    let target = parseFloat(num)
    document.documentElement.scrollTop = document.body.scrollTop = target
  }
}