import { store as outerStore } from '@ice/stark-data';
import Vuex from 'vuex'
import Vue from 'vue'
import state from './state'
import actions from './actions'
import * as getters from './getters'
import mutations from './mutations';

Vue.use(Vuex)

// 获取外user部store
const outerState = outerStore.get('store');

console.log(outerState)
const NODE_ENV = process.env.NODE_ENV
const store = new Vuex.Store({
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
// 监听外部store变化
outerStore.on('store', payload => {
  console.log(`current store is `, payload, store.commit);
  store.commit('setOuterState', payload)
}, true);
export default store