/**
 *  @name 环境管理
 *  @author 汪腾
 *  @date 2020.04.26
 *
 *  需求文档：
 *  @desc https://wiki.inkept.cn/pages/viewpage.action?pageId=104668752
 *
 *  接口文档：
 *  @desc https://wiki.inkept.cn/pages/viewpage.action?pageId=104675231#id-%E7%AE%A1%E6%8E%A7%E4%B8%AD%E5%BF%83-%E4%B8%9A%E5%8A%A1%E7%AE%A1%E7%90%86API%E6%96%87%E6%A1%A3-13.%E5%9F%9F%E5%90%8D%E5%88%97%E8%A1%A8&%E4%BF%A1%E6%81%AF%E6%9F%A5%E8%AF%A2%E6%8E%A5%E5%8F%A3
 */

import user from 'utils/user'
import { Message } from 'antd'
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
const messageDecorator = getMessageDecorator({ success: Message.success, error: Message.error, })
const errorMessageDecorator = messageDecorator({ errorMsg: getErrorMsg('接口响应异常，请联系管理员') })

/**
 * @overview 如果系统有统一的错误信息处理，请将 @errorMessageDecorator 注释
 */
class Apis {
  /**
   *  接口：环境管理列表&信息查询接口
   *  @example https://xxx.busi.inke.cn/login/rbac/module/data_list
   */
  // @mockGetDataList
  @messageDecorator({ errorMsg: showErrorMessage() })
  getDataList = get('api_web/v1/controlcenter/business/app/env/list/get')

  /**
   *  接口：新增、编辑
   *  @example https://xxx.busi.inke.cn/login/rbac/module/data_modify
   */
  // @mockAdd
  @messageDecorator({ successMsg: showSuccess('操作成功'), errorMsg: showErrorMessage() })
  add = post('api_web/v1/controlcenter/business/app/env/add')

  /**
   *  接口：下线
   *  @example https://xxx.busi.inke.cn/login/rbac/module/data_del
   */
  // @mockDelete
  @messageDecorator({ successMsg: showSuccess('下线成功'), errorMsg: showErrorMessage() })
  del = post('/api_web/v1/controlcenter/business/app/env/del')
}

export default new Apis()
