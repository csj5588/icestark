import { store as outerStore } from '@ice/stark-data';
import Vuex from 'vuex'
import Vue from 'vue'
import state from './state'
import actions from './actions'
import * as getters from './getters'
import mutations from './mutations';

Vue.use(Vuex)
// 监听外部store变化
outerStore.on('store', store => {
  console.log(`current store is `, store);
}, true);
// 获取外user部store
const outerState = outerStore.get('store');

const NODE_ENV = process.env.NODE_ENV
export default new Vuex.Store({
  actions,
  getters,
  mutations,
  state: {
    ...state,
    outerState
  },
  modules: {
    // demo
  },
  strict: NODE_ENV !== 'production',
  plugins: NODE_ENV !== 'production' 
    ? []
    : []
})