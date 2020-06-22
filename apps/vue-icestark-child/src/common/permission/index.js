/**
 * 权限管理
 * 该功能所对应的各个js, 均是模拟页面动态生成之后的样子, 正常应该有个权限管理界面, 
 * 1 生成角色
 * 2 给角色分配各个权限, 与路由对应, 或与按钮对应等
 * 3 给用户分配角色 或 权限
 */
import { config as permissionConfig } from './permission-config'
const R = require('ramda')

export const mergeRolesToPermission = (userInfo) => {
  let { email } = userInfo.user_info || ''

  if (!email) return console.error(userInfo, '../permission/index.js中获取userInfo失败，权限会出现问题')
  let userConfig = permissionConfig[email] || {}
  let { roles = [] } = userConfig
  let permission = R.reduce((pre, now) => {
    return {
      routes: R.union(pre.routes, now.routes),
      handles: R.union(pre.handles, now.handles)
    }
  }, {})([...roles, userConfig])

  return {
    ...userInfo,
    permission
  }
}

export const hasPermission = (userRoutePrivilege = [], fromPrivileges = []) => {
  return userRoutePrivilege.some((privilegeKey) => {
    return fromPrivileges.find((routeKey) => {
      return routeKey.indexOf(privilegeKey) > -1 ||
        privilegeKey.indexOf(routeKey) > -1
    })
  })
}