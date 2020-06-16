/**
 *  @name 用户登陆和获取权限相关接口
 *  @author 杨文
 *  @date 20190329
 *
 *  接口文档：
 *  @desc http://wiki.inkept.cn/pages/viewpage.action?pageId=50848831
 */

import srcConfig from '@/config'
import { getRequestsByRoot } from '@/entry/service-auth'

const loginRoot = srcConfig.APIS.loginRoot

const { get, post, postXForm } = getRequestsByRoot({ root: loginRoot })

class Apis {
  // 获取用户登录信息
  getUserInfo = get('login/info')

  // 获取当前账号有效角色列表
  getUserRole = get('login/rbac/users/user_role')

  // 获取权限树
  getModuleList = get('login/rbac/module/module_list')

  // 切换角色
  postRoleAdjust = postXForm('login/rbac/role/role_adjust')

  // 获取数据权限
  getDataAuth = get('login/rbac/users/user_power')
}

let Api = new Apis()

// 获取用户登录信息
export const getUserInfo = Api.getUserInfo

// 获取当前账号有效角色列表
export const getUserRole = Api.getUserRole

// 获取权限树
export const getModuleList = Api.getModuleList

// 切换角色
export const postRoleAdjust = Api.postRoleAdjust

// 获取数据权限
export const getDataAuth = Api.getDataAuth

export default Api
