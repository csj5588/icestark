import { superAdminPermission, overviewPermission, feedPermission, operatePermission, appletPermission, checkPermission, userbacksPermission, shopPermission, adabtestPermission, rnPermission, allianceAdPermission } from './roles'
import merge from 'webpack-merge'

// 超级管理员
export const superAdminConfig = {
  // 管理
  'zhaixm@inke.cn': { roles: [ superAdminPermission ] },
  'wangxp@inke.cn': { roles: [ superAdminPermission ] },
  // 小组leader
  'zhangxy1@inke.cn': { roles: [ superAdminPermission ] },
  'xiaf@inke.cn': { roles: [ superAdminPermission ] },
  'zhijl@inke.cn': { roles: [ superAdminPermission ] },
  // 前端组
  'renwenqing@inke.cn': { roles: [ superAdminPermission ] },
  'heyan@inke.cn': { roles: [ superAdminPermission ] },
  'pangyutong@inke.cn': { roles: [ superAdminPermission ] },
  'gugf@inke.cn': { roles: [ superAdminPermission ] },
  'duguanxing@inke.cn': { roles: [ superAdminPermission ] },
  // 后端组
  'zhangzhiqiang@inke.cn': { roles: [ superAdminPermission ] },
  'banyajie@inke.cn': { roles: [ superAdminPermission ] },
  'xupf@inke.cn': { roles: [ superAdminPermission ] },
  'dongcx@inke.cn': { roles: [ superAdminPermission ] },
  'liyue@inke.cn': { roles: [ superAdminPermission ] },
  'lihy@inke.cn': { roles: [ superAdminPermission ] },
  'lvlei@inke.cn': { roles: [ superAdminPermission ] },
  'zhangshaoguang@inke.cn': { roles: [ superAdminPermission ] },
  'zhuhb@inke.cn': { roles: [ superAdminPermission ] },
  'yinxiaolin@inke.cn': { roles: [ superAdminPermission ] },
  'wangsiyuan@inke.cn': { roles: [ superAdminPermission ] },
  'liq@inke.cn': { roles: [ superAdminPermission ] },
  'shiyirui@inke.cn': { roles: [ superAdminPermission ] },
  'liqian@inke.cn': { roles: [ superAdminPermission ] },
  'chengzheng@inke.cn': { roles: [ superAdminPermission ] },
  'fuzheng@inke.cn': { roles: [ superAdminPermission ] },
  // 其他创新部门
  'liujilei@inke.cn': { roles: [ superAdminPermission ] },
  'xuguorong@inke.cn': { roles: [ superAdminPermission ] },
  'wangyanqin@inke.cn': { roles: [ superAdminPermission ] },
  'duanyunpeng@inke.cn': { roles: [ superAdminPermission ] },
  'liyanying@inke.cn': { roles: [ superAdminPermission ] },
  'helihua@inke.cn': { roles: [ superAdminPermission ] },
  'liuziqiang@inke.cn': { roles: [ superAdminPermission ] },
  'mahaoyang@inke.cn': { roles: [ superAdminPermission ] },
  'dongxin@inke.cn': { roles: [ superAdminPermission ] },
  'caiqiubo@inke.cn': { roles: [ superAdminPermission ] },
  'cuishijie@inke.cn': { roles: [ superAdminPermission ] },


  // 测试组
  'lixiang02@inke.cn': { roles: [ superAdminPermission ] },
  'huangzhijuan@inke.cn': { roles: [ superAdminPermission ] },
  // 产品组
  'tianzhe@inke.cn': { roles: [ superAdminPermission ] },
  'zhubolin@inke.cn': { roles: [ superAdminPermission ] },
  'zhangj@inke.cn': { roles: [ superAdminPermission ] },
  'mazikai@inke.cn': { roles: [ superAdminPermission ] },
  'yemingyu@inke.cn': { roles: [ superAdminPermission ] },
  'weiminqi@inke.cn': { roles: [ superAdminPermission ] },
  // 数据分析
  'xiaohl@inke.cn': { roles: [ superAdminPermission ] },
  'huangchungang@inke.cn': { roles: [ superAdminPermission ] },
  // 广告
  'lichanggang@inke.cn': { roles: [ superAdminPermission ] },
  'wukaisheng@inke.cn': { roles: [ superAdminPermission ] },
  'mayixiang@inke.cn': {roles: [ superAdminPermission ]},
}

// 运营管理
export const operateConfig = {
  'luyingchuan@inke.cn': { roles: [ operatePermission ] },
  'yangxuexin@inke.cn': { roles: [ operatePermission ] },
  'tangxintong@inke.cn': { roles: [ operatePermission ] },
  'zhangyuanyuan01@inke.cn': { roles: [ operatePermission ] },
  'liujie@inke.cn': { roles: [ operatePermission ] },
  'gaohaining@inke.cn': { roles: [ operatePermission ] },
  'liying02@inke.cn': { roles: [ operatePermission ] },
  'fangyi@inke.cn': { roles: [ operatePermission ] },
  'maxiaodan@inke.cn': { roles: [ operatePermission ] },
  'zhengjiawen@inke.cn': { roles: [ operatePermission ] },
  'songyuejie@inke.cn': { roles: [ operatePermission ] },
  'wangqian01@inke.cn': { roles: [ operatePermission ] },
  'jiyoujuan@inke.cn': { roles: [ operatePermission ] },
}

// 审核管理
export const checkConfig = {
  'luyingchuan@inke.cn': { roles: [ checkPermission ] },
  'tangxintong@inke.cn': { roles: [ checkPermission ] },
  'zhangyuanyuan01@inke.cn': { roles: [ checkPermission ] },
  'liujie@inke.cn': { roles: [ checkPermission ] },
  'gaohaining@inke.cn': { roles: [ checkPermission ] },
  'liying02@inke.cn': { roles: [ checkPermission ] },
  'maxiaodan@inke.cn': { roles: [ checkPermission ] },
}

// 用户数据
export const userbacksConfig = {
  'luyingchuan@inke.cn': { roles: [ userbacksPermission ] },
  'zhuyh@inke.cn': { roles: [ userbacksPermission ] },
  'haojie@inke.cn': { roles: [ userbacksPermission ] },
  'fangyi@inke.cn': { roles: [ userbacksPermission ] },
  'yangxuexin@inke.cn': { roles: [ userbacksPermission ] },
  'tangxintong@inke.cn': { roles: [ userbacksPermission ] },
  'zhangyuanyuan01@inke.cn': { roles: [ userbacksPermission ] },
  'liujie@inke.cn': { roles: [ userbacksPermission ] },
  'gaohaining@inke.cn': { roles: [ userbacksPermission ] },
  'liying02@inke.cn': { roles: [ userbacksPermission ] },
  // 'chengzheng@inke.cn': { roles: [ userbacksPermission ] },
  'maxiaodan@inke.cn': { roles: [ userbacksPermission ] },
}

// 小程序管理
export const appletConfig = {
  'liujie@inke.cn': { roles: [ appletPermission ] },
  'zhangyuanyuan01@inke.cn': { roles: [ appletPermission ] },
}
// 电商管理
export const shopConfig = {
  'liujie@inke.cn': { roles: [ shopPermission ] },
  'zhangyuanyuan01@inke.cn': { roles: [ shopPermission ] },
  'gaohaining@inke.cn': { roles: [ shopPermission ] },
}
// 广告A/B实验平台
export const adabtestConfig = {
  'wuchengjin@inke.cn': { roles: [ adabtestPermission ] },
}
// RN
export const rnConfig = {
  // 'gaochuanyan@inke.cn': { roles: [ rnPermission ] },
}

// 联盟广告位管理
export const allianceAdConfig = {
  'tanxiaolong@inke.cn': { roles: [ allianceAdPermission ] },
  'cuirui@inke.cn': { roles: [ allianceAdPermission ] },
  'jiyoujuan@inke.cn': { roles: [ allianceAdPermission ] },
}

export const config = {
  ...merge(superAdminConfig, checkConfig, userbacksConfig, operateConfig, appletConfig, shopConfig, adabtestConfig, rnConfig, allianceAdConfig),
}