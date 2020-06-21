import { store as stark } from '@ice/stark-data';
import Vuex from 'vuex'
import Vue from 'vue'
import state from './state'
import actions from './actions'
import * as getters from './getters'
import mutations from './mutations';

Vue.use(Vuex)

// 获取外user部store
const outerStark = stark.get('stark');

const NODE_ENV = process.env.NODE_ENV
const store = new Vuex.Store({
  actions,
  getters,
  mutations,
  state: {
    ...state,
    stark: outerStark
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
stark.on('dispatch', payload => {
  console.log(`current store is `, payload);
  store.commit('setStark', payload)
}, true);
export default store