import { store as stark } from '@ice/stark-data';
import Vuex from 'vuex'
import Vue from 'vue'
import state from './state'
import actions from './actions'
import * as getters from './getters'
import mutations from './mutations';

Vue.use(Vuex)

const NODE_ENV = process.env.NODE_ENV
const store = new Vuex.Store({
  actions,
  getters,
  mutations,
  state: {
    ...state,
    stark: {}
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
stark.on('stark', payload => {
  store.commit('syncStarkDown', payload || {})
}, true);

export default store