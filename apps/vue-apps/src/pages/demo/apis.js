import { getRequestsByRoot } from 'axios-service'

import { mockGetDataList, mockPostDataModify, mockPostDataDel } from './mock'

/**
 *  @overview 开发项目需将以下注释
 */
const ticket = 'EHQRfWdbPheOwyoKXWoJcqPDsQyLNCOj'
const root = '/'

const { get, post, postXForm } = getRequestsByRoot({ root })

class Apis {
  /**
   *  接口：查询、导出
   */
  @mockGetDataList
  getDataList = get('login/rbac/module/page_type_list')
  dataListExport = `${root}login/rbac/module/page_type_list?ticket=${ticket}`

  /**
   *  接口：新增、编辑
   */
  @mockPostDataModify
  postDataModify = postXForm('login/rbac/module/page_type_modify')

  /**
   *  接口：删除
   */
  @mockPostDataDel
  postDataDel = postXForm('login/rbac/module/page_type_del')
}

export default new Apis()
