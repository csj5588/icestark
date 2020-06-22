import Vue from 'vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import { getMountNode, registerAppLeave } from '@ice/stark-app';
import serviceInit from './service-init'
// import loading from 'components/loading'
import $common from 'utils/common'
import 'common/less/base.css'
import 'iview/dist/styles/iview.css'
// import userInit from './user-init'
import protoMix from './proto-mix'
// import ticketReplace from './ticket-replace'
// import imgClick from './image-preview'

Vue.use(ElementUI);
// ticketReplace()

serviceInit()

// userInit()

protoMix(Vue)

document.addEventListener('DOMContentLoaded', () => {
  // loading.hide()
})

const defaultOpts = {
  /**
   * 默认为null, 需要VueRouter的实例对象
   */
  router: null,

  /**
   * 默认为null, 需要Vuex.Store的实例对象
   */
  store: null,
  beforeInstance: $common.noop
}

export default (App, Options = {}) => {
  Options = Object.assign(defaultOpts, Options)
  const mountNode = getMountNode(document.getElementById('app'));

  const { store, router } = Options
  Vue.config.productionTip = false;
  
  const vue = new Vue({
    router,
    store,
    mounted: () => {
      console.log('App mounted');
    },
    destroyed: () => {
      console.log('App destroyed');
    },
    render: h => h(App),
  }).$mount();
  // for vue don't replace mountNode
  mountNode.appendChild(vue.$el);

  // trigger unmount manually
  registerAppLeave(() => {
    vue.$destroy();
  });
}