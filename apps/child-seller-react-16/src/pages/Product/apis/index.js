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
import { message } from 'antd'
import srcConfig from 'src/config'
import { getRequestsByRoot, getMessageDecorator, serviceHocs } from 'axios-service'

import { mockAdd, mockDetail, mockGetDataList } from './../mock'

const ticket = user.getToken()
const root = srcConfig.APIS.root

const { getErrorMsg } = serviceHocs
const { get, post, postXForm } = getRequestsByRoot({ root })

// 消息装饰器
const showSuccess = text => _ => _
const showErrorMessage = text => message.error(text)
const messageDecorator = getMessageDecorator({ success: showSuccess, error: showErrorMessage })
const errorMessageDecorator = messageDecorator({ errorMsg: getErrorMsg('接口响应异常，请联系管理员') })

/**
 * @overview 如果系统有统一的错误信息处理，请将 @errorMessageDecorator 注释
 */
class Apis {
  /**
   *  接口：查询列表
   *  @example https://xxx.busi.inke.cn/login/rbac/module/data_list
   */
  // @mockGetDataList
  @errorMessageDecorator
  getDataList = post('/api_web/v1/controlcenter/business/app/list/get')

  /**
   *  接口：详情
   *  @example https://xxx.busi.inke.cn/login/rbac/module/data_modify
   */
  // @mockDetail
  @errorMessageDecorator
  getDetail = get('/api_web/v1/controlcenter/business/app/detail/get')

  /**
   *  接口：新增、编辑
   *  @example https://xxx.busi.inke.cn/login/rbac/module/data_modify
   */
  // @mockAdd
  @errorMessageDecorator
  add = post('/api_web/v1/controlcenter/business/app/add')
}

export default new Apis()
