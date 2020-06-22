import * as handleKeysMap from './keys-handle'
import * as routeKeysMap from './keys-route'

/**
 * 大盘概览
 */
export const overviewPermission = {
  routes: [
    routeKeysMap.overview,
    routeKeysMap.overview_daily,
    routeKeysMap.overview_share,
  ],
  handles: [
    // handleKeysMap.questions_list__upload,
    // handleKeysMap.questions_list__create,
  ]
}

/**
 * 推荐数据
 */
export const feedPermission = {
  routes: [
    routeKeysMap.feed,
    routeKeysMap.feed_channel,
    routeKeysMap.feed_detail,
    routeKeysMap.feed_exposure,
    routeKeysMap.feed_play,
  ],
  handles: []
}

/**
 * 运营管理
 */
export const operatePermission = {
  routes: [
    routeKeysMap.operate,
    routeKeysMap.operate_dynamicconfig,
    routeKeysMap.operate_bannerset,
    routeKeysMap.operate_originalauthorset,
    routeKeysMap.operate_shortmessage,
    routeKeysMap.operate_pushmessage,
    routeKeysMap.operate_indexicon,
  ],
  handles: []
}

/**
 * 审核管理
 */
export const checkPermission = {
  routes: [
    routeKeysMap.check,
    routeKeysMap.check_videocheck,
    routeKeysMap.check_aptitudecheck
  ],
  handles: []
}

/**
 * 用户运营
 */
export const userbacksPermission = {
  routes: [
    routeKeysMap.userbacks,
    routeKeysMap.userbacks_report,
    routeKeysMap.userbacks_feedback,
  ],
  handles: []
}
/**
 * 小程序管理
 */
export const appletPermission = {
  routes: [
    routeKeysMap.applet,
    routeKeysMap.applet_push,
    routeKeysMap.applet_setmodel,
    routeKeysMap.applet_setconfig,
    routeKeysMap.applet_videorl,
  ],
  handles: []
}
/**
 * 电商管理
 */
export const shopPermission = {
  routes: [
    routeKeysMap.shop,
    routeKeysMap.shop_user,
    routeKeysMap.shop_order,
    routeKeysMap.shop_accounts,
    routeKeysMap.shop_goods,
  ],
  handles: []
}

/**
 * 广告A/B平台
 */
export const adabtestPermission = {
  routes: [
    routeKeysMap.adabtest,
    routeKeysMap.adabtest_query,
    routeKeysMap.adabtest_edit,
  ],
  handles: []
}

/**
 * RN
 */
// export const rnPermission = {
//   routes: [
//     routeKeysMap.rn,
//   ],
//   handles: []
// }

// 联盟广告位管理
export const allianceAdPermission = {
  routes: [
    routeKeysMap.unionad,
    routeKeysMap.unionad_flow,
    routeKeysMap.unionad_user,
    routeKeysMap.unionad_code,
    routeKeysMap.unionad_statistics
  ],
  handles: []
}

/**
 * 超级管理员
 */
export const superAdminPermission = {
  routes: Object.values(routeKeysMap),
  handles: Object.values(handleKeysMap)
}
