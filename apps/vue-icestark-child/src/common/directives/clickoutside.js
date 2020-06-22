/**
 * v-clickoutside
 * @desc 点击元素外面才会触发的事件
 * @example
 * ```vue
 * <div v-clickoutside="handleClose">
 * ```
 */
// import NAPI from 'adaptor';

const CLICK_OUT_SIDE_CONTEXT = '@@CLICK_OUT_SIDE_CONTEXT';

const DIRECTIVE_NAME = 'clickoutside';

export default {

  name: DIRECTIVE_NAME,

  bind(el, binding, vnode) {
    const documentHandler = function(e) {
      if (vnode.context && !el.contains(e.target)) {
        vnode.context[el[CLICK_OUT_SIDE_CONTEXT].methodName]();
      }
    };
    el[CLICK_OUT_SIDE_CONTEXT] = {
      documentHandler,
      methodName: binding.expression
    };
    // NAPI.listener.on(document, 'click', documentHandler);
  },

  update(el, binding) {
    el[CLICK_OUT_SIDE_CONTEXT].methodName = binding.expression;
  },

  unbind(el) {
    // NAPI.listener.off(document, 'click', el[CLICK_OUT_SIDE_CONTEXT].documentHandler);
  },

  install(Vue) {
    Vue.directive(DIRECTIVE_NAME, {
      bind: this.bind,
      unbind: this.unbind
    });
  }
};
