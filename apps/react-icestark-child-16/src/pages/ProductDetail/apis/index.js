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

import { mockAdd, mockDelete, mockGetDataList, mockGetDataLog } from './../mock'

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
   *  接口：查询详情
   *  @example https://xxx.busi.inke.cn/login/rbac/module/data_list
   */
  // @mockGetDataList
  @messageDecorator({ successMsg: showSuccess('查询成功') }, { errorMsg: showErrorMessage() })
  getAppDetail = get('api_web/v1/controlcenter/business/app/detail/get')

  // @mockGetDataList
  @messageDecorator({ errorMsg: showErrorMessage() })
  getAppDetail = get('api_web/v1/controlcenter/business/app/detail/get')

  /**
   *  接口：所有可接入项状态查询接口
   *  @example https://xxx.busi.inke.cn/login/rbac/module/data_list
   */
  // @mockGetDataLog
  @messageDecorator({ errorMsg: showErrorMessage() })
  getAccessList = get('api_web/v1/controlcenter/function/accessed/state/get')

  /**
   *  接口:申请加入接口
   *  @example https://xxx.busi.inke.cn/login/rbac/module/data_modify
   */
  @messageDecorator({ successMsg: showSuccess('编辑成功') }, { errorMsg: showErrorMessage() })
  uplate = post('/api_web/v1/controlcenter/business/app/add')

  /**
   *  接口:申请加入接口
   *  @example https://xxx.busi.inke.cn/login/rbac/module/data_modify
   */

  @messageDecorator({ successMsg: showSuccess('申请加入成功') }, { errorMsg: showErrorMessage() })
  add = post('api_web/v1/controlcenter/business/app/join/apply')

  /**
   *  接口：删除
   *  @example https://xxx.busi.inke.cn/login/rbac/module/data_del
   */
  @messageDecorator({ successMsg: showSuccess('操作成功') }, { errorMsg: showErrorMessage() })
  del = post('/api_web/v1/controlcenter/business/app/del')
}

export default new Apis()
