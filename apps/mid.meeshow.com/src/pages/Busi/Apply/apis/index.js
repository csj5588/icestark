/**
 *  @name 项目名称
 *  @author 开发人员
 *  @date 开发时间
 *
 *  需求文档：
 *  @desc https://wiki.inkept.cn/pages/viewpage.action?pageId=
 *
 *  接口文档：
 *  @desc https://wiki.inkept.cn/pages/viewpage.action?pageId=
 */

import user from 'utils/user'
import { Message } from 'antd'
import srcConfig from 'src/config'
import { getRequestsByRoot, getMessageDecorator, serviceHocs } from 'axios-service'
import * as auth from 'entry/service-auth'

import { mockAdd, mockDelete, mockGetDataList } from './../mock'

const ticket = user.getToken()
const root = srcConfig.APIS.root
const loginRoot = srcConfig.APIS.loginRoot

const { getErrorMsg } = serviceHocs
const { get, post, postXForm } = getRequestsByRoot({ root })
const { get: getLogin, postXForm: postXFormLogin } = auth.getRequestsByRoot({ root: loginRoot })

// 消息装饰器
const showSuccess = text => _ => _
const showErrorMessage = text => Message.error(text)
const messageDecorator = getMessageDecorator({ success: showSuccess, error: showErrorMessage })
const errorMessageDecorator = messageDecorator({ errorMsg: getErrorMsg('接口响应异常，请联系管理员') })

/**
 * @overview 如果系统有统一的错误信息处理，请将 @errorMessageDecorator 注释
 */
class Apis {
  /**
   *  接口：查询、导出
   *  @example https://xxx.busi.inke.cn/login/rbac/module/data_list
   */
  // @mockGetDataList
  @errorMessageDecorator
  getDataList = post('/api_web/v1/controlcenter/business/app/applications/list/get')

  /**
   *  接口：新增、编辑
   *  @example https://xxx.busi.inke.cn/login/rbac/module/data_modify
   */
  @mockAdd
  @errorMessageDecorator
  add = postXForm('login/rbac/module/data_add')

  /**
   *  接口：删除
   *  @example https://xxx.busi.inke.cn/login/rbac/module/data_del
   */
  // @mockDelete
  @errorMessageDecorator
  del = post('/api_web/v1/controlcenter/business/app/applications/handle')

  @errorMessageDecorator
  getRoleList = getLogin('login/rbac/role/role_list')

  @errorMessageDecorator
  postUserModify = postXFormLogin('login/rbac/users/user_modify')
}

export default new Apis()
