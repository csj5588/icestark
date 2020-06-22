import Vue from 'vue'
import Router from 'vue-router'
import routes from './routes'
// import $user, { userReady } from 'user'
// import { OPEN_PERMISSION_CONTROL } from 'src/config'
import { getBasename } from '@ice/stark-app';
// import { hasPermission } from 'common/permission'
// import * as handleKeysMap from 'common/permission/keys-handle'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes,
  base: getBasename(),
})

// router.beforeEach((from, to, next) => {
//   let { meta: { permission: fromPermission }, path } = from
  
//   // console.log(from, to, '2222')
//   // next()
//   if (!path || fromPermission == null || path.indexOf('home') > -1) return next()

//   userReady(() => {
//     if (OPEN_PERMISSION_CONTROL) {
//       let { permission: { routes: userRoutePermission = [], handles: userHandlePermission = [] } } = $user.get()
//       fromPermission = fromPermission || []
//       let hasIncludeKeys = hasPermission(userRoutePermission, fromPermission)
      
//       // 设置页面操作权限
//       let obj = {}
//       if (userHandlePermission.length) {
//         userHandlePermission.map((item) => {
//           obj[item] = true
//         })
//         $user.setOperationPermissions(obj)
//       }

//       // 至少有一个满足
//       if (hasIncludeKeys) {
//         next()
//       } else {
//         next('/home')
//       }
//     } else {
//       next()
//     }
//   })
// })

export default router