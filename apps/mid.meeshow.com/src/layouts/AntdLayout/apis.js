/**
 *  @name 产品版本
 *  @author 汪腾
 *  @date 2020.04.26
 *
 *  需求文档：
 *  @desc https://wiki.inkept.cn/pages/viewpage.action?pageId=104668752
 *
 *  接口文档：
 *  @desc https://wiki.inkept.cn/pages/viewpage.action?pageId=104675231#id-%E7%AE%A1%E6%8E%A7%E4%B8%AD%E5%BF%83-%E4%B8%9A%E5%8A%A1%E7%AE%A1%E7%90%86API%E6%96%87%E6%A1%A3-9.%E4%BA%A7%E5%93%81%E7%89%88%E6%9C%AC%E5%88%97%E8%A1%A8%E6%8E%A5%E5%8F%A3
 */

import user from 'utils/user'
import { Message } from 'antd'
import srcConfig from 'src/config'
import { getRequestsByRoot, getMessageDecorator, serviceHocs } from 'axios-service'

const ticket = user.getToken()
const root = srcConfig.APIS.root

const { getErrorMsg } = serviceHocs
const { get, post, postXForm } = getRequestsByRoot({ root })

// 消息装饰器
const showSuccess = msg => msg || '请求成功'
const showErrorMessage = text => error => text || (error && error.error_msg) || '接口响应异常，请联系管理员'
const messageDecorator = getMessageDecorator({ success: Message.success, error: Message.error, })
// const errorMessageDecorator = messageDecorator({ errorMsg: getErrorMsg('接口响应异常，请联系管理员') })

/**
 * @overview 如果系统有统一的错误信息处理，请将 @errorMessageDecorator 注释
 */
class Apis {
  /**
   *  接口：查询、导出
   *  @example https://xxx.busi.inke.cn/login/rbac/module/data_list
   */
  @messageDecorator({ errorMsg: showErrorMessage() })
  getAppList = get('api_web/v1/controlcenter/business/app/options/get')
}

export default new Apis()
