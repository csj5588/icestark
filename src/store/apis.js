import { message } from 'antd'
import srcConfig from '@/config'
import { getRequestsByRoot, getMessageDecorator, serviceHocs } from 'axios-service'

const root = srcConfig.APIS.root

const { getErrorMsg } = serviceHocs
const { get, post, postXForm } = getRequestsByRoot({ root })

// 消息装饰器
const showSuccess = msg => msg || '请求成功'
const showErrorMessage = text => error => text || (error && error.error_msg) || '接口响应异常，请联系管理员'
const messageDecorator = getMessageDecorator({ success: message.success, error: message.error, })
// const errorMessageDecorator = messageDecorator({ errorMsg: getErrorMsg('接口响应异常，请联系管理员') })

/**
 * @overview 如果系统有统一的错误信息处理，请将 @errorMessageDecorator 注释
 */
class Apis {
  /**
   *  接口：查询、导出
   */
  @messageDecorator({ errorMsg: showErrorMessage() })
  getAppList = get('xxx')
}

export default new Apis()
