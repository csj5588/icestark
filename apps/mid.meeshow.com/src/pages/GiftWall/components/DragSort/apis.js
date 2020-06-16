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

// import { mockGetDataList, mockPostDataModify, mockPostDataDel } from './mock'

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
   * 接口: 配置选项
   * 参数: wall_settings = 1
   */
  getSettings = get('api/v1/gift_wall/settings')

  /**
   * 接口： 获取 tab list
   */
  getTabList = get('api/v1/gift_wall/wall_tab/list')

  /**
   * 接口： 获取所有礼物源列表
   * 参数： page size
   */
  getAllGift = get('api/v1/gift_wall/gift_pool/list')

  /**
   *  接口 获取一面墙的礼物列表
   */
  getDataList = get('api/v1/gift_wall/wall/detail')
  /**
   *  接口：新增
   *
   */
  postDataAdd = post('api/v1/gift_wall/wall/add')
  /**
   *  接口：编辑
   */
  postDataModify = post('api/v1/gift_wall/wall/update')

  /**
   *  接口：删除
   *  @example https://xxx.busi.inke.cn/login/rbac/module/data_del
   */
  // @mockPostDataDel
  postDataDel = postXForm('login/rbac/module/data_del')
}

export default new Apis()
