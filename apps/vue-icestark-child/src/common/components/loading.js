/**
 * 全局loading效果
 * 支持多模块loading
 * 
 * @example
 * 
 * import loading from 'components/loading'
 * loading.show('entry') | loading.show()
 * loading.hide('entry') | loading.hide()
 */
import common from 'utils/common'

// 单例
const __instance__ = (function () {
  let instance

  return (newInstance) => {
    if (newInstance) instance = newInstance;
    return instance
  }
}())


const LOADING_ID = 'LOADING_ID'
const defaultLoadingMod = {
  /**
   * 等待队列
   * @type {Array}
   */
  queue: [],
  
  /**
   * 是否等待隐藏标识, 超时之后清空 
   * @type {Boolean}
   */
  isWait: false,

  /**
   * 超时定时器
   */
  timer: null
}

const _loadingMods = {
  [LOADING_ID]: common.copy(true, {}, defaultLoadingMod)
}

const TIME_OUT_NUM = 5000

// eslint-disable-next-line
class AutoLoading {
  constructor (el) {
    if (__instance__(null)) return __instance__(null)
    __instance__(this)

    this.loadingElem = document.getElementById(el)
  }

  show (id) {
    id = typeof id === 'string' ? id : LOADING_ID
    const loadingMod = _loadingMods[id] || (_loadingMods[id] = common.copy(true, {}, defaultLoadingMod))
    const { queue, isWait } = loadingMod

    // 队里里面为0的时候, 开始阻止
    if (queue.length === 0) {
      this._preventDocumentDefault();
    }
    queue.push(1)
    this.loadingElem.style.display = 'block'

    if (!isWait) this.waitToHide(loadingMod);
  }

  waitToHide (loadingMod) {
    loadingMod.isWait = true

    clearTimeout(loadingMod.timer)

    loadingMod.timer = setTimeout(() => {
      clearTimeout(loadingMod.timer)

      // 隔5s如果, 队列还有长度, 标识请求超时等情况, 就清空队列并隐藏
      if (loadingMod.queue.length !== 0) {
        loadingMod.queue = []
        this.end(loadingMod);
      }
    }, TIME_OUT_NUM)
  }

  hide (id) {
    id = typeof id === 'string' ? id : LOADING_ID
    const loadingMod = _loadingMods[id]
    const { queue, isWait } = loadingMod

    queue.pop()

    if (queue.length > 0) {
      return false
    }

    this.end(loadingMod);
  }

  end (loadingMod) {
    loadingMod.isWait = false

    if (Object.keys(_loadingMods).every((key) => _loadingMods[key].queue.length === 0)) {
      this._removePreventDocument();
      this.loadingElem.style.display = 'none'
    }
  }

  _returnFalse () {
    return false;
  }

  /**
   * 清除 页面中的默认事件 , 让你乱点
   */
  _preventDocumentDefault () {
    let _returnFalse = this._returnFalse;
  }

  _removePreventDocument () {
    let _returnFalse = this._returnFalse;
  }

  getModById (id) {
    return _loadingMods[id]
  }
}

export default new AutoLoading('globalLoading')