import srcConfig from 'src/config'
import { getRequestRoots } from 'service/utils'

const {getRoot, postRoot, postRootXForm} = getRequestRoots(srcConfig.APIS.root)
const {getRoot2} = getRequestRoots('//service.imilive.cn/')

var changeUrl3 = 'https://adbp.imilive.cn/'
if (window.location.host !== 'zd.imilive.cn') {
  changeUrl3 = 'http://testservice.imilive.cn/'
} else {
  changeUrl3 = 'https://adbp.imilive.cn/'
}
const {getRoot3} = getRequestRoots(changeUrl3)
const {postRoot3} = getRequestRoots(changeUrl3)

/**
 * 反馈列表
 * @example:http://wiki.inkept.cn/pages/viewpage.action?pageId=22119746
 */
export const FEEDBACK_LIST = getRoot('api/oper/feedback/get', {}, {
  autoLoading: true
})
/**
 * 视频审核
 * @type {[type]}
 */
export const VIDEO_LIST = postRoot('api/content/oper/videolist', {}, {
  autoLoading: false
})
/**
 * 获取视频分类
 */
export const GETVIDEO_CLASSIFY = getRoot('api/content/oper/tablelist', {}, {
  autoLoading: false
})
/**
 * 删除视频
 */
export const DELETE_VIDEO = postRoot('api/content/oper/delete', {}, {
  autoLoading: false
})
/**
 * 修改审核状态
 */
export const SETAPTITUDESTATUS = getRoot('api/content/oper/appid/examine_state/change', {}, {
  autoLoading: false
})
/**
 * 获取资质申请数据列表
 */
export const GETAPTITUDECHECKLIST = postRoot('api/content/oper/appid/examine/get', {}, {
  autoLoading: false
})
/**
 * 举报列表
 * @example:http://wiki.inkept.cn/pages/viewpage.action?pageId=19520442
 */
export const REPORT_LIST = getRoot('api/oper/report/get', {}, {
  autoLoading: false
})
/**
 * 查询代码量
 * @example:http://wiki.inkept.cn/display/INKE/dev+log
 */
export const CODE_DATA = getRoot('api/oper/devlog/get', {}, {
  autoLoading: false
})
/**
 * 查询rn包
 * @example:http://wiki.inkept.cn/pages/viewpage.action?pageId=26117567
 */
export const RN_GETALL = getRoot('api/appupgrade/react_native/getall', {}, {
  autoLoading: false
})
/**
 * 新增rn包
 * @example:http://wiki.inkept.cn/pages/viewpage.action?pageId=26117567
 */
export const RN_ADD = getRoot('api/appupgrade/react_native/add', {}, {
  autoLoading: false
})
/**
 * 发布rn包
 * @example:http://wiki.inkept.cn/pages/viewpage.action?pageId=26117567
 */
export const RN_PUBLISH = getRoot('api/appupgrade/react_native/publish', {}, {
  autoLoading: false
})
/**
 * 获取动态配置列表
 * @example:http://wiki.inkept.cn/pages/viewpage.action?pageId=41746741
 */
export const DYCONFIG_LIST = getRoot('api/base/dyconfig_oper/get', {}, {
  autoLoading: false
})
/**
 * 添加动态配置列表
 * @example:http://wiki.inkept.cn/pages/viewpage.action?pageId=41746741
 */
export const DYCONFIG_ADD = postRoot('api/base/dyconfig_oper/add', {}, {
  autoLoading: false
})
/**
 * 更新动态配置列表
 * @example:http://wiki.inkept.cn/pages/viewpage.action?pageId=41746741
 */
export const DYCONFIG_UPDATE = postRoot('api/base/dyconfig_oper/update', {}, {
  autoLoading: false
})
/**
 * 版本发布
 * @example:http://wiki.inkept.cn/pages/viewpage.action?pageId=41746743
 */
export const VERSION_PUBLISH = postRootXForm({
  url: 'api/oper/version/upload',
  data: {},
}, {}, {})
/**
 * 获取版本列表
 * @example:http://wiki.inkept.cn/pages/viewpage.action?pageId=41746743
 */
export const VERSION_LIST = getRoot('api/oper/version_list/get', {}, {
  autoLoading: false
})
/**
 * 版本回滚
 * @example:http://wiki.inkept.cn/pages/viewpage.action?pageId=41746743
 */
export const VERSION_ROLLBACK = postRoot('api/oper/version/apply', {}, {
  autoLoading: false
})
/**
 * 版本升级
 * @example:http://wiki.inkept.cn/pages/viewpage.action?pageId=41746743
 */
export const VERSIONINFO_GET = getRoot('api/oper/version_info/get', {}, {
  autoLoading: false
})
/**
 * 版本获取
 * @example:http://wiki.inkept.cn/pages/viewpage.action?pageId=41746743
 */
export const VERSION_GET = getRoot('api/oper/version/get', {}, {
  autoLoading: false
})
/* 获取小程序列表
 * @example:http://wiki.inkept.cn/pages/viewpage.action?pageId=41748139
 */
export const GETAPPLET_LIST = getRoot('api/miniprogram/manager/get_app_config', {}, {
  autoLoading: false
})
/**
 * 增加小程序项
 * @example:http://wiki.inkept.cn/pages/viewpage.action?pageId=41748139
 */
export const ADDAPPLET_LIST = postRoot('api/miniprogram/manager/set_app_config', {}, {
  autoLoading: false
})
/**
 * 编辑小程序项
 * @example:http://wiki.inkept.cn/pages/viewpage.action?pageId=41748139
 */
export const EDITAPPLET_LIST = postRoot('api/miniprogram/manager/update_app_config', {}, {
  autoLoading: false
})
/**
 * 获取文案配置信息
 * @example:http://wiki.inkept.cn/pages/viewpage.action?pageId=41748139
 */
export const GETCONFIG_DATA = postRoot('api/miniprogram/manager/get_doc_config', {}, {
  autoLoading: false
})
/**
 * 添加文案配置信息
 * @example:http://wiki.inkept.cn/pages/viewpage.action?pageId=41748139
 */
export const ADDCONFIG_DATA = postRoot('api/miniprogram/manager/set_doc_config', {}, {
  autoLoading: false
})
/**
 * 修改文案配置信息
 * @example:http://wiki.inkept.cn/pages/viewpage.action?pageId=41748139
 */
export const EDITCONFIG_DATA = postRoot('api/miniprogram/manager/update_doc_config', {}, {
  autoLoading: false
})
/**
 * 删除文案配置信息
 * @example:http://wiki.inkept.cn/pages/viewpage.action?pageId=41748139
 */
export const DELCONFIG_DATA = postRoot('api/miniprogram/manager/del_doc_config', {}, {
  autoLoading: false
})
/**
 * 添加和修改模板 tplid有无 来区分
 * @example:http://wiki.inkept.cn/pages/viewpage.action?pageId=41750277
 */
export const ADDUPDATE_TPL = postRoot('api/miniprogram/push/template/create', {}, {
  autoLoading: false
})
/**
 * 获取模板list
 * @example:http://wiki.inkept.cn/pages/viewpage.action?pageId=41750277
 */
export const GETLIST_TPL = getRoot('api/miniprogram/push/template/get', {}, {
  autoLoading: false
})
/**
 * 删除模板list
 * @example:http://wiki.inkept.cn/pages/viewpage.action?pageId=41750277
 */
export const DELLIST_TPL = postRoot('api/miniprogram/push/template/delete', {}, {
  autoLoading: false
})
/**
 * 获取push记录
 * @example:http://wiki.inkept.cn/pages/viewpage.action?pageId=41750277
 */
export const GETLIST_PUSH = getRoot('api/miniprogram/push/get', {}, {
  autoLoading: false
})
/**
 * 创建push记录
 * @example:http://wiki.inkept.cn/pages/viewpage.action?pageId=41750277
 */
export const SETLIST_PUSH = postRoot('api/miniprogram/push/create', {}, {
  autoLoading: false
})
/**
 * 获取banner列表
 * @example:http://wiki.inkept.cn/pages/viewpage.action?pageId=41752037
 */
export const GETLIST_BANNER = getRoot('api/oper/banner/get', {}, {
  autoLoading: false
})
/**
 * 添加banner列表
 * @example:http://wiki.inkept.cn/pages/viewpage.action?pageId=41752037
 */
export const ADDLIST_BANNER = postRoot('api/oper/banner/add', {}, {
  autoLoading: false
})
/**
 * 修改banner列表
 * @example:http://wiki.inkept.cn/pages/viewpage.action?pageId=41752037
 */
export const SETLIST_BANNER = postRoot('api/oper/banner/update', {}, {
  autoLoading: false
})
/**
 * 删除banner列表
 * @example:http://wiki.inkept.cn/pages/viewpage.action?pageId=41752037
 */
export const DELLIST_BANNER = postRoot('api/oper/banner/delete', {}, {
  autoLoading: false
})
/**
 * 获取黑名单列表
 * @example:wiki.inkept.cn/pages/viewpage.action?pageId=41768611
 */
export const GET_BLACKNICK = getRoot('api/content/oper/appid/black_nick/get', {}, {
  autoLoading: false
})
/**
 * 增加黑名单列表
 * @example:wiki.inkept.cn/pages/viewpage.action?pageId=41768611
 */
export const ADD_BLACKNICK = getRoot('api/content/oper/appid/black_nick/add', {}, {
  autoLoading: false
})
/**
 * 删除黑名单列表
 * @example:wiki.inkept.cn/pages/viewpage.action?pageId=41768611
 */
export const DEL_BLACKNICK = getRoot('api/content/oper/appid/black_nick/del', {}, {
  autoLoading: false
})
/**
 * 视频ID列表查询接口
 * @example:http://wiki.inkept.cn/pages/viewpage.action?pageId=44831131
 */
export const GET_VIDEORANK = getRoot('api/miniprogram/health/videorank/get', {}, {
  autoLoading: false
})
/**
 * 视频ID删除接口
 * @example:http://wiki.inkept.cn/pages/viewpage.action?pageId=44831131
 */
export const DEL_VIDEORANK = postRoot('api/miniprogram/health/videorank/del', {}, {
  autoLoading: false
})
/**
 * 视频ID上传&更新接口
 * @example:http://wiki.inkept.cn/pages/viewpage.action?pageId=44831131
 */
export const ADDUPDATE_VIDEORANK = postRoot('api/miniprogram/health/videorank/update', {}, {
  autoLoading: false
})
/**
 * 视频详情
 * @example:http://wiki.inkept.cn/pages/viewpage.action?pageId=44831131
 */
export const WATCH_VIDEORANK = getRoot2('api/feed/videos/aggregate', {}, {
  autoLoading: false
})
/**
 * 用户反馈 push消息
 * @example:http://wiki.inkept.cn/pages/viewpage.action?pageId=41758128
 */
export const PUSH_USERBACK = postRoot('api/messsage/msgcenter/msg/send', {}, {
  autoLoading: false
})
/**
 * 短信发送功能
 * @example:http://wiki.inkept.cn/pages/viewpage.action?pageId=49061426
 */
export const PUSH_SHORTMSG = postRoot('api/base/sms/send', {}, {
  autoLoading: false
})
/**
 * 获取首页banner信息
 * @example:http://wiki.inkept.cn/pages/viewpage.action?pageId=50829188
 */
export const GET_INDEXICON = getRoot('api/oper/homewindow/get', {}, {
  autoLoading: false
})
/**
 * 增加首页banner信息
 * @example:http://wiki.inkept.cn/pages/viewpage.action?pageId=50829188
 */
export const ADD_INDEXICON = postRoot('api/oper/homewindow/add', {}, {
  autoLoading: false
})
/**
 * 修改首页banner信息
 * @example:http://wiki.inkept.cn/pages/viewpage.action?pageId=50829188
 */
export const SET_INDEXICON = postRoot('api/oper/homewindow/update', {}, {
  autoLoading: false
})
/**
 * 删除首页banner信息
 * @example:http://wiki.inkept.cn/pages/viewpage.action?pageId=50829188
 */
export const DEL_INDEXICON = postRoot('api/oper/homewindow/delete', {}, {
  autoLoading: false
})
/**
* 用户问题追踪
* @example:http://wiki.inkept.cn/pages/viewpage.action?pageId=50833001
*/
export const GET_USERWATCH = getRoot('api/oper/exceptiontrace/exceptioninfo/show', {}, {
  autoLoading: false
})
/**
* 用户问题 filterSelectopt
* @example:http://wiki.inkept.cn/pages/viewpage.action?pageId=50833001
*/
export const GET_OPT = getRoot('api/oper/exceptiontrace/exceptioncondition/show', {}, {
  autoLoading: false
})
/**
 * 用户反馈-异常标签
 * @example:wiki.inkept.cn/pages/viewpage.action?pageId=50833001#id-用户异常追踪-4.查询异常标签
 */
export const GET_USERERRTAG = getRoot('api/oper/exceptiontrace/exceptiontag/show_batch', {}, {
  autoLoading: false
})
/**
* 余额冻结 请求申诉列表
* @example:http://wiki.inkept.cn/pages/viewpage.action?pageId=57346564
*/
export const GET_NOMONEYLIST = postRoot(`api/complain/complain/record`, {}, {
  autoLoading: false
})
/**
* 余额冻结 处理用户申诉
* @example:http://wiki.inkept.cn/pages/viewpage.action?pageId=57346564
*/
export const GET_NOMONEYAUDIT = postRoot('api/complain/complain/audit', {}, {
  autoLoading: false
})
/**
* 反馈列表 修改反馈处理状态
* @example:http://wiki.inkept.cn/pages/viewpage.action?pageId=22119746
*/
export const UPDATE_HANDLESTATUS = postRoot('api/oper/feedback/status/update', {}, {
  autoLoading: false
})
/**
* 运营管理 极简视频下线
* @example:http://wiki.inkept.cn/pages/viewpage.action?pageId=61638184
*/
export const OPER_DELETE = postRoot('api/content/oper/delete', {}, {
  autoLoading: true
})
/**
* 运营管理 极简视频下线 下线记录
* 20200304 为了APP 审核 加的 新彤需求 后端 李倩
*/
export const OPER_DELETE_LIST = getRoot2('api/content/oper/get_delete_video_log', {}, {
  autoLoading: true
})
/**
* 人脸审核历史查询
* @example:https://wiki.inkept.cn/pages/viewpage.action?pageId=41770211
*/
export const GET_FACECHECK = getRoot('api/finabuz/taxes_cert/face_verify/fail_log/get', {}, {
  autoLoading: true
})

/**
* 人脸审核历史 二次审核
* @example:https://wiki.inkept.cn/pages/viewpage.action?pageId=41770211
*/
export const CHECK_FACECHECK = postRoot('api/finabuz/taxes_cert/face_verify/manual_review', {}, {
  autoLoading: true
})
/**
* 活动中心配置列表
* @example:https://wiki.inkept.cn/pages/viewpage.action?pageId=64793412
*/
export const GET_ACTIONCONFIG = postRoot('api/activity/admin-ucenter/fetch', {}, {
  autoLoading: true
})
/**
* 活动中心配置 编辑
* @example:https://wiki.inkept.cn/pages/viewpage.action?pageId=64793412
*/
export const UPDATE_ACTIONCONFIG = postRoot('api/activity/admin-ucenter/update', {}, {
  autoLoading: true
})
/**
* 活动中心配置 新增
* @example:https://wiki.inkept.cn/pages/viewpage.action?pageId=64793412
*/
export const ADD_ACTIONCONFIG = postRoot('api/activity/admin-ucenter/create', {}, {
  autoLoading: true
})
/**
* 活动中心配置 删除
* @example:https://wiki.inkept.cn/pages/viewpage.action?pageId=64793412
*/
export const DEL_ACTIONCONFIG = getRoot('api/activity/admin-ucenter/delete', {}, {
  autoLoading: true
})
/**
* 活动中心配置 校验pos位置
* @example:https://wiki.inkept.cn/pages/viewpage.action?pageId=64793412
*/
export const CHECK_POS = postRoot('api/activity/admin-ucenter/get_pos', {}, {
  autoLoading: false
})

/**
 * ################################种子电商################################
 * @wiki https://wiki.inkept.cn/pages/viewpage.action?pageId=64799597
 */

/**
* 种子电商 上传商品接口
*/
export const ADD_GOODS = postRoot('api/shop/fe/goods/upload', {}, {
  autoLoading: true
})
/**
* 种子电商 商品查询接口
*/
export const GET_GOODS = getRoot('api/shop/fe/goods/get', {}, {
  autoLoading: true
})
/**
* 种子电商 商品信息修改接口
*/
export const UPDATE_GOODSSTATE = postRoot('api/shop/fe/goods/update', {}, {
  autoLoading: true
})
/**
* 种子电商 获取分类接口
*/
export const CATEGORY_GOODSSTATE = getRoot('api/shop/fe/goods/category/get', {}, {
  autoLoading: false
})
/**
* 种子电商 订单查询接口
*/
export const ORDER_GETLIST = getRoot('api/shop/fe/senior/order/list/get', {}, {
  autoLoading: true
})
/**
* 种子电商 获取推广位列表ID
20190823 ggf
*/
export const ORDER_PNAMDE_LIST = getRoot('api/shop/fe/pid/info/get', {}, {
  autoLoading: false
})
/**
* 种子电商 获取自然月可结算订单
*/
export const ORDER_MONTH = getRoot('api/shop/fe/order/month/statement/get', {}, {
  autoLoading: true
})
/**
* 种子电商 确认结算订单
*/
export const UPDATE_MONTH = postRoot('api/shop/fe/order/month/statement/update', {}, {
  autoLoading: true
})

/**
 * ################################React Native################################
 * @wiki https://wiki.inkept.cn/pages/viewpage.action?pageId=64791274
 */

/**
 * 获取RN版本策略列表
 */
export const GET_RN_LIST = getRoot('api/base/react_native/get')

/**
 * 新建版本策略项
 */
export const CREATE_RN_LIST = postRoot('api/base/react_native/add')

/**
 * 修改版本策略项
 */
export const UPDATE_RN_LIST = postRoot('api/base/react_native/update')

 /**
  * 删除版本策略项
  */
export const DELETE_RN_LIST = postRoot('api/base/react_native/del')

/**
 * push推送版本策略
 */
export const PUSH_RN_LIST = postRoot('api/base/react_native/push')

/**
 * ################################广告A/B实验平台################################
 * @wiki https://wiki.inkept.cn/pages/viewpage.action?pageId=67388841
 */

/**
* 广告A/B实验平台 APP名称获取、版本号获取
*/
export const APP_APPGET = getRoot3('api/ad/abtestor/app/name/get', {}, {
  autoLoading: false
})
/**
* 广告A/B实验平台 APP名称添加
*/
export const APP_APPADD = postRoot3('api/ad/abtestor/app/name/add', {}, {
  autoLoading: true
})
/**
* 广告A/B实验平台 获取实验组信息
*/
export const APP_TESTGET = getRoot3('api/ad/abtestor/expr/group/get', {}, {
  autoLoading: false
})
/**
* 广告A/B实验平台 添加获取实验组信息
*/
export const APP_TESTADD = postRoot3('api/ad/abtestor/expr/group/add', {}, {
  autoLoading: true
})
/**
* 广告A/B实验平台 删除实验组信息
*/
export const APP_TESTDEL = postRoot3('api/ad/abtestor/expr/group/update', {}, {
  autoLoading: true
})
/**
* 广告A/B实验平台 获取策略信息
*/
export const APP_POLICYGET = getRoot3('api/ad/abtestor/expr/info/get', {}, {
  autoLoading: false
})
/**
* 广告A/B实验平台 添加策略信息
*/
export const APP_POLICYADD = postRoot3('api/ad/abtestor/expr/info/add', {}, {
  autoLoading: true
})
/**
* 广告A/B实验平台 删除策略信息
*/
export const APP_POLICYDEL = postRoot3('api/ad/abtestor/expr/info/update', {}, {
  autoLoading: true
})
/**
* 广告A/B实验平台 关键字获取接口
*/
export const APP_KEYGET = getRoot3('api/ad/abtestor/key/get', {}, {
  autoLoading: false
})
/**
* 广告A/B实验平台 关键字添加
*/
export const APP_KEYADD = postRoot3('api/ad/abtestor/key/add', {}, {
  autoLoading: true
})
/**
* 广告A/B实验平台 自营广告点击数据获取
*/
export const APP_LISTGETSELF = postRoot3('api/ad/abtestor/expr/report/self/get', {}, {
  autoLoading: true
})
/**
* 广告A/B实验平台 联盟广告点击数据获取
*/
export const APP_LISTGETALLIANCE = postRoot3('api/ad/abtestor/expr/report/alliance/get', {}, {
  autoLoading: true
})

/**
 * 获取bridge/rn version
 */
export const GET_BRIDGE_RN_VERSION = getRoot('api/base/react_native/condition/get')
/**
 * ################################新版动态配置################################
 * @wiki https://wiki.inkept.cn/pages/viewpage.action?pageId=38546482
 */
/**
 * 获取业务功能级联列表
 */
export const GET_CASCATER_LIST = getRoot('api/base/dyconfig/buz_list/get_all')
/**
 * 获取业务列表
 */
export const GET_PRODUCT_LIST = getRoot('api/base/dyconfig/buz/get_batch')
/**
 * 删除业务列表
 */
export const DEL_PRODUCT_LIST = postRoot('api/base/dyconfig/buz/del')
/**
 * 新增&编辑业务列表
 */
export const ADD_UPDATE_PRODUCT_LIST = postRoot('api/base/dyconfig/buz/add')
/**
 * 获取业务详情
 */
export const GET_PRODUCT_DETAIL = getRoot('api/base/dyconfig/cfg_group/get_all')
/**
 * 删除业务详情-组
 */
export const DEL_PRODUCT_DETAIL_GROUP = postRoot('api/base/dyconfig/cfg_group/del')
/**
 * 新增&编辑业务详情-组
 */
export const ADD_UPDATE_PRODUCT_DETAIL_GROUP = postRoot('api/base/dyconfig/cfg_group/add')
/**
 * 新增&编辑业务详情-条件流
 */
export const ADD_UPDATE_PRODUCT_DETAIL_FLOW = postRoot('api/base/dyconfig/cond_flow/add')
/**
 * 删除业务详情-条件流
 */
export const DEL_PRODUCT_DETAIL_FLOW = postRoot('api/base/dyconfig/cond_flow/del')
/**
 * 获取json配置树
 */
export const GET_JSON_TREE = getRoot('api/base/dyconfig/cfg/get_all')
/**
 * 添加&编辑json配置树
 */
export const SET_JSON_TREE = postRoot('api/base/dyconfig/cfg/set')
/**
 * 删除json配置树节点
 */
export const DEL_JSON_TREE = postRoot('api/base/dyconfig/cfg/del_node')
/**
 * 导入json配置树
 */
export const INPORT_JSON_TREE = postRoot('api/base/dyconfig/cfg/import')
 /**
 * 修改配置状态
 */
export const SET_CONFIG_STATUS = postRoot('api/base/dyconfig/cfg_group/enable')

/**
* 落地页举报总计
*/
export const LDYREPORT_TOTALLIST = getRoot('api/oper/complaint/count', {}, {
  autoLoading: true
})
/**
* 落地页举报详情
*/
export const LDYREPORT_LIST = getRoot('api/oper/complaint/get', {}, {
  autoLoading: true
})

/**
 * *********************************************联盟广告位管理 START*********************************************
 * @wiki https://wiki.inkept.cn/pages/viewpage.action?pageId=69315020
 *
 * @name 流量策略列表
 */
export const UNIONAD_FLOW_LIST = getRoot3('api/ad/flowcontrol/fc_show')

/**
 * @name 新建流量策略
 */
export const CREATE_POLICY = postRoot3('api/ad/flowcontrol/fc_new')

/**
 * @name 更新流量策略
 */
export const UPDATE_POLICY = postRoot3('api/ad/flowcontrol/fc_modify')

/**
 * @name 广告位列表
 */
export const AD_PLACE_LIST = getRoot3('api/ad/flowcontrol/sm_adplace_list')

/**
 * @name 联盟列表
 */
export const UNION_LIST = getRoot3('api/ad/flowcontrol/sm_alliance_list')

/**
 * @name 用户对象列表
 */
export const USER_LIST = getRoot3('api/ad/flowcontrol/uf_show')

/**
 * @name 新建用户对象
 */
export const NEW_USER = postRoot3('api/ad/flowcontrol/uf_new')

 /**
 * @name 更新用户对象（编辑/删除）
 */
export const UPDATE_USER = postRoot3('api/ad/flowcontrol/uf_modify')

/**
 * @name 获取用户对象名字列表
 */
export const USER_NAME_LIST = getRoot3('api/ad/flowcontrol/uf_name_list')

/**
 * @name 代码位列表
 */
export const CODE_LIST = getRoot3('api/ad/flowcontrol/sm_show')

/**
 * @name 代码位名称列表
 */
export const CODE_NAME_LIST = getRoot3('api/ad/flowcontrol/sm_slotname_list')

/**
 * @name 新建代码位
 */
export const NEW_CODE = postRoot3('api/ad/flowcontrol/sm_new')

/**
 * @name 更新代码位
 */
export const UPDATE_CODE = postRoot3('api/ad/flowcontrol/sm_modify')

/**
 * @name 获取代码位ID列表
 */
export const CODE_ID_LIST = getRoot3('api/ad/flowcontrol/sm_slotid_list')

/**
 * @name 获取策略版本列表
 */
export const POLICY_VERSION_LIST = getRoot3('api/ad/flowcontrol/fc_version')
// *********************************************联盟广告位管理 END*********************************************

/**
* 用户异常追踪2 所有业务操作查询接口
*/
export const USERXY_BUSI = getRoot('api/oper/abnormal/all_business_op/get', {}, {
  autoLoading: false
})
/**
* 用户异常追踪2 获取异常信息列表接口
*/
export const USERXY_LIST = getRoot('api/oper/abnormal/abnormalop_list/get', {}, {
  autoLoading: true
})
/**
* 用户异常追踪2 异常trace查询接口
*/
export const USERXY_TRACE = getRoot('api/oper/abnormal/one_trace/get', {}, {
  autoLoading: true
})

/**
* 用户状态查询 查询接口
*/
export const USERQUERY_INFO = getRoot('api/oper/abnormal/userinfo/get', {}, {
  autoLoading: true
})

/**
 * 注销用户 20200226 为了审核
 *  /api/oper/abnormal/userinfo/inner_logoff
 */
export const USERQUERY_UNREGIST = getRoot('api/oper/abnormal/userinfo/inner_logoff', {}, {
  autoLoading: true
})

/**
* 服务A/B测试，查询接口
*/
export const SERVER_TEST_HOME_LIST = getRoot('api/base/abtesting/oper/experiment/query', {}, {
  autoLoading: true
})

/**
* 服务A/B测试，创建和更新实验接口
*/
export const SERVER_TEST_CREATED = postRoot3('api/base/abtesting/oper/experiment/detail/update', {}, {
  autoLoading: true
})

/**
* 服务A/B测试，获取受众条件选项
*/
export const SERVER_TEST_AUDIENCES_CONDITIONS = getRoot('api/base/abtesting/oper/experiment/conditions', {}, {
  autoLoading: true
})

/**
* 服务A/B测试，获取实验的详情信息
*/
export const SERVER_TEST_GET_MESSAGE_DETAIL = getRoot('api/base/abtesting/oper/experiment/detail/query', {}, {
  autoLoading: true
})

/**
* 服务A/B测试，更新实验运行状态，开启/关闭
*/
export const SERVER_TEST_UPDATE = postRoot('api/base/abtesting/oper/experiment/status/update', {}, {
  autoLoading: false
})

/*
* 抓取用户日志
*/
export const GRASP_USER_LOG = getRoot('api/oper/usermsg/collect', {}, {
  autoLoading: true
})

/*
* 获取轮播间投票列表
*/
export const GET_VOTE_LIST = getRoot('api/chatroom/vote/oper/list', {}, {
  autoLoading: true
})

/**
 * 新增或者更新投票（轮播间投票配置）
 */
export const ADD_OR_EDITE_VOTE = postRoot('api/chatroom/vote/oper/vote_detail/update', {}, {
  autoLoading: false
})

/**
 * 删除投票（轮播间投票配置）
 */
export const DELETE_VOTE = postRoot('api/chatroom/vote/oper/vote_delete', {}, {
  autoLoading: false
})

/**
 * 获取房间列表（轮播间房间配置）
 */
export const GET_ROOM_LIST = getRoot('api/live/oper/hive/get_all', {}, {
  autoLoading: true
})

/**
 * 新增房间项 （轮播间房间配置）
 */
export const ADD_ROOM_LIST = postRoot('api/live/oper/hive/add', {}, {
  autoLoading: false
})

/**
 * 房间删除
 */
export const ROOM_DELETE = postRoot('api/live/oper/hive/del', {}, {
  autoLoading: true
})

// *********************************************联盟广告数据统计 START*********************************************

/**
 * 联盟广告位管理，数据统计，获取数据
 */
export const GET_DATA_STATISTICS = postRoot3('api/ad/flowcontrol/data/report', {}, {
  autoLoading: true
})

/**
 * 联盟广告位管理，数据统计，上传文件
 */
export const DOWNLOAD_FILE_AD = postRoot3('api/ad/flowcontrol/data/export', {}, {
  autoLoading: true
})
// *********************************************联盟广告数据统计 END*********************************************