/**
 *  @name 项目名称
 *  @author 开发人员
 *  @date 开发时间
 *
 *  需求文档：
 *  @desc http://wiki.inkept.cn/pages/viewpage.action?pageId=
 *
 *  接口文档：
 *  @desc http://wiki.inkept.cn/pages/viewpage.action?pageId=
 */

/**
 *  @overview 开发项目需将以下注释取消
 */
// import user from 'user'
// import srcConfig from 'src/config'
import { getRequestsByRoot } from 'axios-service'

import { mockGetDataList, mockPostDataModify, mockPostDataDel } from './mock'

/**
 *  @overview 开发项目需将以下注释取消
 */
// const ticket = user.getToken()
// const root = srcConfig.APIS.root

/**
 *  @overview 开发项目需将以下注释
 */
const ticket = 'EHQRfWdbPheOwyoKXWoJcqPDsQyLNCOj'
const root = '/'

const { get, post, postXForm } = getRequestsByRoot({ root })

class Apis {
  /**
   *  接口：查询、导出
   *  @example https://fss.busi.inke.cn/login/rbac/module/page_type_list
   */
  @mockGetDataList
  getDataList = get('login/rbac/module/page_type_list')
  dataListExport = `${root}login/rbac/module/page_type_list?ticket=${ticket}`

  /**
   *  接口：新增、编辑
   *  @example https://fss.busi.inke.cn/login/rbac/module/page_type_modify
   */
  @mockPostDataModify
  postDataModify = postXForm('login/rbac/module/page_type_modify')

  /**
   *  接口：删除
   *  @example https://fss.busi.inke.cn/login/rbac/module/page_type_del
   */
  @mockPostDataDel
  postDataDel = postXForm('login/rbac/module/page_type_del')
}

export default new Apis()
