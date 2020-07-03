import Vue from 'vue'
// import ElementUI from 'element-ui';
// import 'element-ui/lib/theme-chalk/index.css';
import store from './store'
import router from './router'
import App from './App'
import serviceInit from 'service/service-init'
import { getMountNode, registerAppLeave } from '@ice/stark-app';
import 'src/assets/static/css/iview/iview.css'
import S from 'service'
import * as apis from './apis'
// Vue.use(ElementUI);
serviceInit()
S.$extend(apis)
Vue.prototype.$S = S
Vue.config.productionTip = false;
  
const mountNode = getMountNode(document.getElementById('app'));
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