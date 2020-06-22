/**
 * 本地存储命名空间
 * @type {String} 
 */
var STORAGE_KEY = 'pe.inkept.cn'

/**
 * @param {String} key 存储的key名
 * @param {Object} localStorage | sessionStorage 本地存储对象 | 临时存储对象
 * @return {Object} storage 对象
 * 
 * @example 
 * var localStore = getLocalStorage('LOGIN')
 * localStore.save({ name: 123 })
 * localStore.fetch()
 * 
 * var sessionStore = getSessionStorage('LOGIN')
 */

const getStorageCurry = (key, dataType, storage) => {
  key = STORAGE_KEY + (key != null ? `_${key}` : '')
  const dataTypeStr = dataType === Array ? '[]' : '{}'

  /**
   * 本地存储封装
   * @property {Function} fetch 获取数据
   * @property {Function} save 保存
   * 
   * @example 
   * storage.save({ name: 'bao', age: 18 })
   * storage.fetch()
   */
  var storageFace = {

    /**
     * @return {Object} data 取得的数据
     */
    fetch: function () {
      var data = JSON.parse(storage.getItem(key) || dataTypeStr)
      return data
    },

    /**
     * @param {Object} data 需要保存的数据
     */
    save: function (data) {
      storage.setItem(key, JSON.stringify(data))
    }
  }

  return storageFace
}

export const getSessionStorage = (key, dataType) => {
  return getStorageCurry(key, dataType, sessionStorage)
}

export const getLocalStorage = (key, dataType) => {
  return getStorageCurry(key, dataType, localStorage)
}