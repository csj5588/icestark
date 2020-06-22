/**
 * 活动埋点统计
 * 
 * params：
 * @cc 来源渠道（TG6003：WAP端网页）
 * @busi_code 活动标识
 * @page_code 活动页面标识
 * @source 上报来源（12Ish：APP、2：APPWEB、3：微信、5：QQ、7：微博、100：其他）
 * @report_type 上报类型（act：用户行为、qa：质量检测、 sio：sio检测、wechat_share：微信分享）
 * @time 上报发生的时间,由调用方系统生成,取值为标准时间戳
 * @url 上报的来源url
 * @other 业务具体日志
 *   @click_id 用户行为标识（当次活动动唯一）
 *   @click_state 用户行为状态标识（当次活动唯一）
 * 
 * example：
 * log({
 * busi_code: 'a',
 * page_code: 'b',
 * other: {
 * click_id: 'follow',
 * click_state: 'yes/no'
 * }
 * })
 */

import Common from 'utils/common'

const HOST = location.host
const betaservice = 'http://betaservice.busi.inke.cn'
const prodRootMap = {
  'boc.inke.cn': {
    root: 'https://service.busi.inke.cn'
  },
  'betaboc.inke.cn': {
    root: betaservice
  },
  'testboc.inke.cn': {
    root: betaservice
  },
  'localhost:8080': {
    root: betaservice
  }
}
const rootObj = prodRootMap[Object.keys(prodRootMap).find((key) => HOST.indexOf(key) === 0)]
const urlHost = (typeof rootObj === 'object' ? rootObj.root : rootObj) || betaservice

export default (options) => {
  let defaultOpt = {
    cc: 'TG6003',
    busi_code: '',
    page_code: '',
    source: 1,
    report_type: 'act',
    time: new Date() * 1,
    url: window.location.href,
    other: {
      click_id: '',
      click_state: ''
    }
  }

  let url = urlHost + '/web/click_report'

  if (options && options.constructor === Object) {
    Object.assign(defaultOpt, options)
  }

  defaultOpt.other = JSON.stringify(defaultOpt.other)
  url += '?' + Common.stringifyParams(defaultOpt)

  let oImg = new Image()
  oImg.src = url

  return new Promise(function (resolve, reject) {
    oImg.onload = resolve
    oImg.onerror = reject
  })
}