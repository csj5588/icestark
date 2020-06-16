/**
 *  @name 日志管理
 *  @author wanghl
 *  @date 2019.04.26
 *
 *  接口文档：
 *  @desc http://wiki.inkept.cn/pages/viewpage.action?pageId=57364405
 */

/**
 *  @overview 开发项目需将以下注释取消
 */
import user from 'user'
import srcConfig from 'src/config'
import { getRequestsByRoot } from 'entry/service-auth'

import { mockGetLogList, mockPostLogModify, mockPostLogDel } from './mock'

/**
 *  @overview 开发项目需将以下注释取消
 */
const ticket = user.getToken()
const loginRoot = srcConfig.APIS.loginRoot

/**
 *  @overview 开发项目需将以下注释
 */
// const ticket = 'pcXSmfftnJtgPyzKQzerdHovUCGgdSPX'
// const loginRoot = '/'

const { get, post, postXForm } = getRequestsByRoot({ root: loginRoot })

class Apis {
  /**
   *  接口：获取汇总页面、按钮名称
   *  @example https://gos.busi.inkept.cn/web/op_log/summary_lists
   */
  getLogSummaryLists = get('web/op_log/summary_lists')

  /**
   *  接口：查询、导出
   *  @example https://gos.busi.inkept.cn/web/op_log/summary_lists
   */
  // @mockGetLogList
  getLogList = get('web/op_log/lists')
  logListExport = `${loginRoot}web/op_log/lists?ticket=${ticket}&system_id=${srcConfig.AUTH_SYSTEM_ID}&is_export=1`
}

export default new Apis()
