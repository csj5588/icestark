import Vuex from 'vuex'
import Vue from 'vue'
import state from './state'
import actions from './actions'
import * as getters from './getters'
import mutations from './mutations';

// import demo from './modules/demo'


// external 之后 不用use
Vue.use(Vuex)

const NODE_ENV = process.env.NODE_ENV
export default new Vuex.Store({
  actions,
  getters,
  mutations,
  state,
  modules: {
    // demo
  },
  strict: NODE_ENV !== 'production',
  plugins: NODE_ENV !== 'production' 
    ? []
    : []
})