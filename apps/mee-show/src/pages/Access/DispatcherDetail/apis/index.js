/**
 *  @name dispatcher接入
 *  @author 汪腾
 *  @date 开发时间
 *
 *  需求文档：
 *  @desc https://wiki.inkept.cn/pages/viewpage.action?pageId=
 *
 *  接口文档：
 *  @desc https://wiki.inkept.cn/pages/viewpage.action?pageId=106884313#id-%E7%AE%A1%E6%8E%A7%E4%B8%AD%E5%BF%83-V2.0-2.10dispatcher-%E5%88%97%E8%A1%A8%E6%9F%A5%E8%AF%A2%E6%8E%A5%E5%8F%A3
 */

import user from 'utils/user'
import { message } from 'antd'
import srcConfig from 'src/config'
import { getRequestsByRoot, getMessageDecorator, serviceHocs } from 'axios-service'

import { mockAdd, mockDelete, mockGetDataList, mockGetConfig } from './../mock'

const root = srcConfig.APIS.root

const { getErrorMsg } = serviceHocs
const { get, post, postXForm } = getRequestsByRoot({ root })

// 消息装饰器
const showSuccess = msg => msg || '请求成功'
const showErrorMessage = text => error => text || (error && error.error_msg) || '接口响应异常，请联系管理员'
const showSuccessMessage = text => mess => text || (mess && mess.error_msg) || '接口响应异常，请联系管理员'
const messageDecorator = getMessageDecorator({ success: message.success, error: message.error, })
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
  @messageDecorator({ errorMsg: showErrorMessage() })
  getData = get('/api_web/v1/controlcenter/dispatcher/ev/id/get')

  /**
   *  接口：环境列表/信息查询接口
   *  @example https://xxx.busi.inke.cn/login/rbac/module/data_del
   */
  // @mockDelete
  @messageDecorator({ errorMsg: showErrorMessage() })
  getEnvList = get('/api_web/v1/controlcenter/business/app/env/list/get')

  /**
   *  接口：dispatcherDetail-before_verify列表查询接口
   *  @example https://xxx.busi.inke.cn/login/rbac/module/data_del
   */
  // @mockGetConfig
  @messageDecorator({ errorMsg: showErrorMessage() })
  getConfig = get('/api_web/v1/controlcenter/dispatcher/before_verify/list/get')

  /**
   *  接口：dispatcher-ev_detail 新增接口
   *  @example https://xxx.busi.inke.cn/login/rbac/module/data_del
   */
  // @mockDelete
  @messageDecorator({ errorMsg: showErrorMessage() })
  addDetail = post('/api_web/v1/controlcenter/dispatcher/detail/add')

  /**
   *  接口：dispatcherDetail-编辑接口
   *  @example https://xxx.busi.inke.cn/login/rbac/module/data_del
   */
  // @mockDelete
  @messageDecorator({ errorMsg: showErrorMessage() })
  uplate = post('/api_web/v1/controlcenter/dispatcher/detail/update')
}

export default new Apis()
