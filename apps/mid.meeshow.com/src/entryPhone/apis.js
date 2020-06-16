/**
 * 用户登录接口
 */
import { getRequestsByRoot } from 'axios-service'
import srcConfig from 'src/config'
console.log(srcConfig)
const { get, post, postXForm } = getRequestsByRoot({ root: srcConfig.APIS.root })

class Apis {
  // 登陆接口
  getLoginInfo = get('login/login_info')

  // 登出接口
  getLogout = get('login/logout_pc')

  // 获取当前账号有效角色列表
  getUserRole = get('login/rbac/users/user_role')

  // 权限
  getModuleList = get('login/rbac/module/module_list')

  // 切换角色
  postRoleAdjust = postXForm('login/rbac/role/role_adjust')
}

export default new Apis()

let Api = new Apis()

// 获取当前账号有效角色列表
export const getUserRole = Api.getUserRole

// 权限
export const getModuleList = Api.getModuleList

// 切换角色
export const postRoleAdjust = Api.postRoleAdjust
