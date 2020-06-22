
/**
 * 给vue2.0增加 $dispatch(派发给父组件) 和 $broadcast(广播给子组件) 方法, 作为vue1.x的$$dispatch 和 $$broadcast 方法的补充
 * 通过mixins来引入
 * componentName是组件自己命名的
 * 
 * @example
 * 
 * import emitter from 'mixins/emitter';
 * 
 * export default {
 *  
 *  mixins: [emitter],
 *  
 *  componentName: paper
 *  ...
 * }
 * 
 */

function $broadcast (componentName, eventName, params) {
  this.$children.forEach(child => {
    var name = child.$options.componentName;

    if (name === componentName) {
      child.$emit.apply(child, [eventName].concat(params));
    } else {
      // 递归调用, 
      // 因为this.$broadcast会被Vue 固定this 所以没法直接用, 也没法更改this
      $broadcast.apply(child, [componentName, eventName].concat(params));
    }
  });
}

export default {
  methods: {
    
    /**
     * 向负组件派发事件, 父组件通过this.$on来监听
     * 
     * @param {String} componentName 组件名称
     * @param {String} eventName 事件名
     * @p父aram {Object} params 参数
     * 
     * @example
     * 子组件
     * this.$dispatch('paper', 'getImgData', {imgList: []})
     * 
     * fu组件
     * this.$on('getImgData', function (params) {})
     */
    $dispatch(componentName, eventName, params) {
      var parent = this.$parent;
      var name = parent.$options.componentName;

      // 无限循环, 直到找到相同的componentName名字
      while (parent && (!name || name !== componentName)) {
        parent = parent.$parent;

        if (parent) {
          name = parent.$options.componentName;
        }
      }
      if (parent) {
        // 因为调用该组件this.$emit(Vue.prototype自带的api)方法, 所以该组件用this.$on接收
        parent.$emit.apply(parent, [eventName].concat(params));
      }
    },

    /**
     * 向子组件派发事件
     * 
     * @param {String} componentName 组件名称
     * @param {String} eventName 事件名
     * @param {Object} params 参数
     */
    $broadcast
  }
};