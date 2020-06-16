/**
 *  @name 页面与按钮管理
 *  @author wanghl
 *  @date 2019.04.16
 *
 *  接口文档：
 *  @desc http://wiki.inkept.cn/pages/viewpage.action?pageId=50851413
 */

import srcConfig from 'src/config'
import { getRequestsByRoot } from 'entry/service-auth'

const loginRoot = srcConfig.APIS.loginRoot

const { get, post, postXForm } = getRequestsByRoot({ root: loginRoot })

class Apis {
  /**
   *  接口：新增、编辑
   *  @example https://rbac.busi.inke.cn/login/rbac/module/module_modify
   */
  postModuleModify = postXForm('login/rbac/module/module_modify')
}

export default new Apis()
