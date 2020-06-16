/**
 *  @name 角色类型管理
 *  @author wanghl
 *  @date 2019.08.16
 *
 *  接口文档：
 *  @desc http://wiki.inkept.cn/pages/viewpage.action?pageId=50851416
 */

import srcConfig from 'src/config'
import { getRequestsByRoot } from 'entry/service-auth'

// import { mockGetRoleTypeList, mockPostRoleTypeModify, mockPostDataDel } from './mock'

const loginRoot = srcConfig.APIS.loginRoot

const { get, post, postXForm } = getRequestsByRoot({ root: loginRoot })

class Apis {
  /**
   *  接口：查询
   *  @example https://rbac.busi.inke.cn/login/rbac/role/role_type_list
   */
  // @mockGetRoleTypeList
  getRoleTypeList = get('login/rbac/role/role_type_list')

  /**
   *  接口：新增
   *  @example https://rbac.busi.inke.cn/login/rbac/role/role_type_add
   */
  // @mockPostRoleTypeModify
  postRoleTypeModify = postXForm('login/rbac/role/role_type_add')
}

export default new Apis()
