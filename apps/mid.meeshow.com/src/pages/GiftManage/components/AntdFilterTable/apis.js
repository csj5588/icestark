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

/**
 *  @overview 开发项目需将以下注释取消
 */
import user from 'user'
import srcConfig from 'src/config'
import { getRequestsByRoot } from 'axios-service'

import { mockGetDataList, mockPostDataModify, mockPostDataDel } from './mock'

/**
 *  @overview 开发项目需将以下注释取消
 */
const ticket = user.getToken()
const root = srcConfig.APIS.root
/**
 *  @overview 开发项目需将以下注释
 */
// const ticket = 'pcXSmfftnJtgPyzKQzerdHovUCGgdSPX'
// const root = '/'

const { get, post, postXForm } = getRequestsByRoot({ root })

class Apis {
  /**
   *  接口：查询、导出
   *  @example https://wiki.inkept.cn/pages/viewpage.action?pageId=88052744#id-%E7%A4%BC%E7%89%A9%E5%A2%99-api%E6%96%87%E6%A1%A3-%E7%A4%BC%E7%89%A9%E5%A2%99tab%E8%8E%B7%E5%8F%96%E6%8E%A5%E5%8F%A3
   */
  getDataList = get('api/v1/gift_wall/gift_pool/list')
  /*
  * 接口：礼物类型和礼物位置
  * @example https://wiki.inkept.cn/pages/viewpage.action?pageId=88052744#id-%E7%A4%BC%E7%89%A9%E5%A2%99-api%E6%96%87%E6%A1%A3-%E8%B5%84%E6%BA%90%E4%B8%8A%E4%BC%A0%E5%9C%B0%E5%9D%80%E5%92%8C%E9%85%8D%E7%BD%AE%E9%80%89%E9%A1%B9%E8%8E%B7%E5%8F%96%E6%8E%A5%E5%8F%A3
  * */
  getGiftSetting = get('/api/v1/gift_wall/settings')
  /**
   *  接口：新增
   *  @example https://wiki.inkept.cn/pages/viewpage.action?pageId=88052744#id-%E7%A4%BC%E7%89%A9%E5%A2%99-api%E6%96%87%E6%A1%A3-%E7%A4%BC%E7%89%A9%E6%B1%A0gift%E6%B7%BB%E5%8A%A0%E6%8E%A5%E5%8F%A3
   */
  postDataAdd = post('api/v1/gift_wall/gift_pool/add')
  /**
   *  接口：编辑
   *  @example https://wiki.inkept.cn/pages/viewpage.action?pageId=88052744#id-%E7%A4%BC%E7%89%A9%E5%A2%99-api%E6%96%87%E6%A1%A3-%E7%A4%BC%E7%89%A9%E5%A2%99tab%E4%BF%AE%E6%94%B9%E6%8E%A5%E5%8F%A3
   */
  postDataModify = post('api/v1/gift_wall/gift_pool/update')
  /**
   *  接口：查询角标列表
   *  @example https://wiki.inkept.cn/pages/viewpage.action?pageId=88052744#id-%E7%A4%BC%E7%89%A9%E5%A2%99-api%E6%96%87%E6%A1%A3-%E7%A4%BC%E7%89%A9%E5%A2%99tab%E4%BF%AE%E6%94%B9%E6%8E%A5%E5%8F%A3
   */
  getIconList = get('api/v1/gift_wall/gift_icon/list')
  /**
   *  接口：查询资源列表
   *  @example https://wiki.inkept.cn/pages/viewpage.action?pageId=88052744#id-%E7%A4%BC%E7%89%A9%E5%A2%99-api%E6%96%87%E6%A1%A3-%E7%A4%BC%E7%89%A9%E5%A2%99tab%E4%BF%AE%E6%94%B9%E6%8E%A5%E5%8F%A3
   */
  getResourceList = get('api/v1/gift_wall/gift_resource/list')

  /**
   *  接口：删除
   *  @example https://xxx.busi.inke.cn/login/rbac/module/data_del
   */
  @mockPostDataDel
  postDataDel = postXForm('login/rbac/module/data_del')
}

export default new Apis()
