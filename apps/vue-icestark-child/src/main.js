import './styles/global.scss';
import App from './App.vue';
import store from './store'
import entry from 'entry'
import router from './router'
import $user, { userReady } from 'user'
import S from 'service'
import * as apis from './apis'
import { mergeRolesToPermission } from 'common/permission'

S.$extend(apis)
const R = require('ramda')

// Promise.all([userPromise, store.dispatch(mutationTypes.SET_INITIAL_STATE)])
// .then(() => {
//   entry(App, {
//     router,
//     store
//   })
// })
userReady(() => {
  // R.compose(
  //   $user.set,
  //   mergeRolesToPermission,
  //   $user.get
  // )()

  
})
entry(App, {
  router,
  store
})