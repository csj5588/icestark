import Vue from 'vue'
import Router from 'vue-router'
import routes from './routes'
import { getBasename } from '@ice/stark-app';
Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes,
  base: getBasename(),
})

export default router