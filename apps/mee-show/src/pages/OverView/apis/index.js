/**
 *  @name 接入概览
 *  @author 汪腾
 *  @date 2020.05.26
 *
 *  需求文档：
 *  @desc https://wiki.inkept.cn/pages/viewpage.action?pageId=106875319
 *
 *  接口文档：
 *  @desc https://wiki.inkept.cn/pages/viewpage.action?pageId=106884313#id-%E7%AE%A1%E6%8E%A7%E4%B8%AD%E5%BF%83-V2.0-2.1%E6%8E%A5%E5%85%A5%E6%A6%82%E8%A7%88%E9%A1%B5-%E6%9F%A5%E8%AF%A2%E6%8E%A5%E5%8F%A3
 */

import user from 'utils/user'
import { message } from 'antd'
import srcConfig from 'src/config'
import { getRequestsByRoot, getMessageDecorator, serviceHocs } from 'axios-service'

import { mockAdd, mockDelete, mockGetDataList } from './../mock'

const ticket = user.getToken()
const root = srcConfig.APIS.root

const { getErrorMsg } = serviceHocs
const { get, post, postXForm } = getRequestsByRoot({ root })

// 消息装饰器
const showSuccess = msg => msg || '请求成功'
const showErrorMessage = text => error => text || (error && error.error_msg) || '接口响应异常，请联系管理员'
const messageDecorator = getMessageDecorator({ success: message.success, error: message.error, })
const errorMessageDecorator = messageDecorator({ errorMsg: getErrorMsg('接口响应异常，请联系管理员') })

/**
 * @overview 如果系统有统一的错误信息处理，请将 @errorMessageDecorator 注释
 */
class Apis {
  /**
   *  接口：域名列表&信息查询接口
   *  @example https://xxx.busi.inke.cn/login/rbac/module/data_list
   */
  // @mockGetDataList
  @messageDecorator({ errorMsg: showErrorMessage() })
  getDataList = get('api_web/v1/controlcenter/function/accessed/list/get')
}

export default new Apis()
