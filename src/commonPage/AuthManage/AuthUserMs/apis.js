/**
 *  @name 用户管理
 *  @author wanghl
 *  @date 2019.04.16
 *
 *  接口文档：
 *  @desc http://wiki.inkept.cn/pages/viewpage.action?pageId=50851403
 */

import srcConfig from '@/config'
import { getRequestsByRoot } from '@/entry/service-auth'

// import { mockGetUserList, mockPostUserModify, mockPostDataDel } from './mock'

const loginRoot = srcConfig.APIS.loginRoot

const { get, post, postXForm } = getRequestsByRoot({ root: loginRoot })

class Apis {
  /**
   *  接口：获取角色名称
   *  @example https://rbac.busi.inke.cn/login/rbac/role/role_list
   */
  getRoleList = get('login/rbac/role/role_list')

  /**
   *  接口：获取角色类型
   *  @example https://rbac.busi.inke.cn/login/rbac/role/role_type_list
   */
  getRoleTypeList = get('login/rbac/role/role_type_list')

  /**
   *  接口：查询
   *  @example https://rbac.busi.inke.cn/login/rbac/users/user_list
   */
  // @mockGetUserList
  getUserList = get('login/rbac/users/user_list')

  /**
   *  接口：新增、编辑
   *  @example https://rbac.busi.inke.cn/login/rbac/users/user_modify
   */
  // @mockPostUserModify
  postUserModify = postXForm('login/rbac/users/user_modify')
}

export default new Apis()
