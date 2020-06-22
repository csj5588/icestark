/**
 * observer.js 仅支持自定义事件
 * 
 * @example 
 * 
 * 监听事件
 * observer.subscribe(eventName, function () {})
 * 
 * 触发事件
 * observer.publish(eventName, data)
 * 
 * 移除事件
 * observer.remove(eventName, function () {}) 
 * observer.remove(eventName)
 * observer.remove()
 * 
 * @author libx@inke.cn 20170601
 */

/**
 * 订阅者对象
 * 
 * @type {Object}
 * @property subscribe 订阅事件
 * @property publish 发布事件
 * @property remove 移除事件
 */
const observer = {} 

/**
 * 事件集合, 所有事件的存储对象
 * 
 * @example
 * {
 *  eventName1: [fun1, fun2, fun3],
 *  eventName2: [fun1, fun2, fun3],
 * }
 */
let events = {}

/**
 * 订阅事件
 * 
 * @param {String} name 事件名称
 * @param {Function} callback 绑定事件的回调函数
 *   
 * @return {Object} observer 对象本身
 * 
 * @example
 * observer.subscribe('back', function (e) { console.log(e) })
 */
observer.subscribe = function (name, callback) {
  let list = events[name] || (events[name] = [])
  list.push(callback)
  return this
}

/**
 * 移除事件
 * 
 * @param {String} name 事件名称 或 不填
 * @param {Function | undefined} callback 该事件对应的回调函数 或 不填
 * 
 * @return {Object} observer 对象本身
 * 
 * @example 
 * observer.remove() 移除所有事件
 * observer.remove('back') 移除该事件下的所有订阅
 * observer.remove('back', funcName) 移除该事件 对应的 该订阅 
 */
observer.remove = function (name, callback) {
  // 移除所有事件
  if (!(name || callback)) {
    events = {}
    return this
  }

  let list = events[name]
  if (list) {
    if (callback) {
      for (let i = list.length - 1; i >= 0; i--) {
        if (list[i] === callback) {
          list.splice(i, 1)
        }
      }
    } else {
      delete events[name]
    }
  }

  return this
}

/**
 * 发布事件
 * 
 * @param {String} name 发布的事件名称
 * @param {Object} data 发布时传给订阅的数据
 * 
 * @return {Object} observer 对象本身
 * 
 * @example 
 * observer.publish('back', {title: 123})
 */
observer.publish = function (name, data) {
  let list = events[name]

  if (list) {
    list = list.slice()

    for (let i = 0, len = list.length; i < len; i++) {
      list[i](data)
    }
  }

  return this
}

export default observer