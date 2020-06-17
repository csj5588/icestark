/**
 * 页面埋点
 * @author lizh
 * @since 20190416
 * @desc http://wiki.inkept.cn/pages/viewpage.action?pageId=54597351
 */
import { uniqWith, isEqual, get as _get } from 'lodash'
import { getRequestsByRoot } from '@/entry/service-auth'

import $user from '@/utils/user'
import $common from './common'
import srcConfig from '@/config'
import store from '@/store'

// 获取 store 中的数据
const getUserInfo = store => _get(store.getState(), 'user.info', {})
const getButtonCtrl = store => _get(store.getState(), 'auth.buttonCtrl', {})
const getBreadList = store => _get(store.getState(), 'breadcrumb.breadList', [])

// 埋点接口
const { post } = getRequestsByRoot({ root: srcConfig.APIS.logRoot })
const API_LOG = post('api/log/analytics/upload', {}, { autoLoading: false })

const SYSTEM_SOURCE = `${srcConfig.AUTH_SYSTEM_ID}`
const userInfo = process.env.SSO_LOGIN ? $user.get() : getUserInfo(store)

const log = {
  baseOptions: {
    tracking_id: '1', // 项目跟踪 ID
    description: '', // 功能描述
    referrer: '', // referrer
    hostname: '', // 主机
    ip: '', // IP
    ua: navigator.userAgent.toLowerCase(), // 浏览器
    location: `${window.location.origin}/${window.location.pathname.slice(1)}`, // 页面链接
    page_id: '', // 页面标识
    title: '', // 页面名称
    time: `${Date.now()}`, // 当前时间
    operater: '', // 操作人
    operater_email: '', // 操作人邮箱
    system_source: SYSTEM_SOURCE, // 系统来源
    hit_type: '', // 页面：pageview；按钮：event
    identifier: '', // 埋点唯一标识
    label: '', // 埋点中文名称
    event_category: '', // 页面：''；按钮：button
    event_action: '', // 页面：''；按钮：click
    request_params: '' // 按钮接口传的参数
  },
  /**
   * 从 面包屑 中取页面名称
   */
  getPageName () {
    const breadList = getBreadList(store)
    return breadList.reduce((value, current) => value + '_' + current.name.replace(/\s+/g, ''), '').replace(/^_/, '')
  },

  /**
   * 从 面包屑 中去页面 path
   */
  getPageRoot () {
    const breadList = getBreadList(store)
    const currentPage = breadList[breadList.length - 1]
    return (currentPage || { key: '' }).key.replace(/\//g, '_').replace(/^_/, '')
  },

  /**
   * 上报页面埋点
   * @param {object} params 参数
   *    @param {string} identifier
   *    @param {string} label
   *    @param {string} page_id
   *    @param {string} title
   */
  reportPage (params = {}) {
    if (+SYSTEM_SOURCE === -1) {
      return
    }

    const { identifier = '', label = '', page_id: pageId = '', title = '' } = params
    const userInfo = process.env.SSO_LOGIN ? $user.get() : getUserInfo(store)

    let logParams = {
      ...log.baseOptions,
      type: 'page',
      operater: userInfo.username, // 操作人
      operater_email: process.env.SSO_LOGIN ? userInfo.email : userInfo.phone, // 操作人邮箱
      hit_type: 'pageview',
      ...params,
      identifier: identifier || log.getPageRoot(),
      label: label || log.getPageName(),
      page_id: pageId || log.getPageRoot(),
      title: title || log.getPageName(),
    }
    return API_LOG(logParams)
  },

  /**
   * 上报按钮埋点
   * @param {object} params 参数
   *    @param {string} bntId 必填
   *    @param {string} btnName 必填
   *    @param {any} request_params 接口参数
   *    @param {string} identifier
   *    @param {string} pageRoot
   */
  reportBtn (params = {}) {
    if (+SYSTEM_SOURCE === -1) {
      return
    }

    const { request_params: requestParams = '', btnId, btnName, identifier, pageRoot } = params
    const userInfo = process.env.SSO_LOGIN ? $user.get() : getUserInfo(store)

    if (!btnId || !btnName) {
      throw new Error('btnId/btnName 为空，埋点上报失败！', params)
    }

    let _requestParams
    if (requestParams) {
      if (typeof requestParams === 'object') {
        delete requestParams.ticket
        _requestParams = JSON.stringify(requestParams)
      } else if (typeof requestParams === 'string') {
        _requestParams = requestParams
        if ($common.isJsonString(_requestParams)) {
          _requestParams = JSON.parse(_requestParams)
          delete _requestParams.ticket
          _requestParams = JSON.stringify(_requestParams)
        }
      } else {
        _requestParams = false
      }
    }

    let logParams = {
      ...log.baseOptions,
      type: 'btn',
      operater: userInfo.username, // 操作人
      operater_email: process.env.SSO_LOGIN ? userInfo.email : userInfo.phone, // 操作人邮箱
      hit_type: 'event',
      identifier: identifier || `${pageRoot || log.getPageRoot()}_${params.btnId}`,
      page_id: log.getPageRoot(),
      title: log.getPageName(),
      label: btnName,
      event_category: 'button',
      event_action: 'click',
      ...params,
      request_params: _requestParams || ''
    }
    return API_LOG(logParams)
  },

  reportBtnWithButtonCtrl ({ key, request_params: requestParams = {} }) {
    const buttonCtrl = getButtonCtrl(store)

    if (!buttonCtrl[key]) {
      throw new TypeError(`${key} 没有对应的 id 和 label`)
    }

    log.reportBtn({
      // btnId: buttonCtrl[key].id,
      btnId: key.toLowerCase(),
      btnName: buttonCtrl[key].label,
      request_params: requestParams
    })
  }
}

export default log

let instanceList = []

export const logPageWithInstance = params => {
  // instance 数组去重
  let instanceListBak = uniqWith(instanceList, isEqual)
  let len = instanceListBak.length
  if (len > 0) {
    instanceListBak.forEach(item => {
      switch (typeof item) {
        case 'function':
          item(params)
          break

        case 'object':
          log.reportPage(params || item)
          break

        case 'boolean':
          item && log.reportPage(params)
          break

        default:
          log.reportPage(params)
          break
      }
    })
  }
  instanceList = []
}

export const clearInstanceList = () => {
  instanceList = []
}

export const creaeLogInstance = (instance = true) => {
  instanceList.push(instance)
}
