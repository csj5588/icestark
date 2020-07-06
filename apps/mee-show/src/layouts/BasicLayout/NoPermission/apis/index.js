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

const root = srcConfig.APIS.root

const { getErrorMsg } = serviceHocs
const { get, post } = getRequestsByRoot({ root })

// 消息装饰器
const showSuccess = msg => msg || '请求成功'
const showErrorMessage = text => error => text || (error && error.error_msg) || '接口响应异常，请联系管理员'
const messageDecorator = getMessageDecorator({ success: message.success, error: message.error, })

/**
 * @overview 如果系统有统一的错误信息处理，请将 @errorMessageDecorator 注释
 */
class Apis {
  /**
   *  接口：新增、编辑
   *  @example https://xxx.busi.inke.cn/login/rbac/module/data_modify
   */
  // @mockAdd
  @messageDecorator({ successMsg: showSuccess('新增产品成功') }, { errorMsg: showErrorMessage() })
  add = post('/api_web/v1/controlcenter/business/app/add')

  /**
   *  接口：获取文件上传接口
   *  @example https://xxx.busi.inke.cn/login/rbac/module/data_del
   */
  @messageDecorator({ errorMsg: showErrorMessage() })
  getDomailList = get('api_web/v1/controlcenter/business/app/domain/list/get')
}

export default new Apis()
