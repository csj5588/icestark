/**
 *  @name 角色管理
 *  @author wanghl
 *  @date 2019.04.17
 *
 *  接口文档：
 *  @desc http://wiki.inkept.cn/pages/viewpage.action?pageId=50851416
 */

import srcConfig from 'src/config'
import { getRequestsByRoot } from 'entry/service-auth'

// import { mockGetRoleList, mockPostRoleModify, mockPostDataDel } from './mock'

const loginRoot = srcConfig.APIS.loginRoot

const { get, post, postXForm } = getRequestsByRoot({ root: loginRoot })

class Apis {
  /**
   *  接口：获取角色类型
   *  @example https://rbac.busi.inke.cn/login/rbac/role/role_type_list
   */
  getRoleTypeList = get('login/rbac/role/role_type_list')

  /**
   *  接口：查询
   *  @example https://rbac.busi.inke.cn/login/rbac/role/role_list
   */
  // @mockGetRoleList
  getRoleList = get('login/rbac/role/role_list')

  /**
   *  接口：新增、编辑
   *  @example https://rbac.busi.inke.cn/login/rbac/role/role_modify
   */
  // @mockPostRoleModify
  postRoleModify = postXForm('login/rbac/role/role_modify')

  /**
   *  接口：获取角色权限
   *  @example https://rbac.busi.inke.cn/login/rbac/role/role_module
   */
  getRoleModule = get('login/rbac/role/role_module')

  /**
   *  接口：编辑角色权限
   *  @example https://rbac.busi.inke.cn/login/rbac/role/role_module_modify
   */
  postRoleModuleModify = postXForm('login/rbac/role/role_module_modify')
}

export default new Apis()
