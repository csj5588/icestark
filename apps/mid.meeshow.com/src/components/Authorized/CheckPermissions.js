import React from 'react'
import PromiseRender from './PromiseRender'

// 每次引入组件之前调用函数传入 currentAuthorize
// 通过组件内部变量来维护 currentAuthorize
// 这个变量外部也有依赖, 因为es6内部维护的变量, 内部修改之后, 外部是地址引用也会变
let currentAuthority = 'NULL'

function isPromise (obj) {
  return (
    !!obj &&
    (typeof obj === 'object' || typeof obj === 'function') &&
    typeof obj.then === 'function'
  )
}

/**
 * 通用权限检查方法
 * Common check permissions method
 * @param { 权限判定 Permission judgment type string |array | Promise | Function } authority
 * @param { 你的权限 Your permission description  type:string} currentAuthority
 * @param { 通过的组件 Passing components } target
 * @param { 未通过的组件 no pass components } Exception
 */
const baseCheckPermissions = (authority, currentAuthority, target, Exception) => {
  // 没有判定权限.默认查看所有
  // Retirement authority, return target
  // return target
  if (!authority) {
    return target
  }
  // 数组处理
  if (Array.isArray(authority)) {
    if (authority.indexOf(currentAuthority) >= 0) {
      return target
    }
    return Exception
  }

  // string 处理
  if (typeof authority === 'string') {
    if (authority === currentAuthority) {
      return target
    }
    return Exception
  }

  // Promise 处理
  if (isPromise(authority)) {
    return <PromiseRender ok={target} error={Exception} promise={authority} />
  }

  // Function 处理
  if (typeof authority === 'function') {
    try {
      const bool = authority(currentAuthority)
      // 函数执行后返回值是 Promise
      if (isPromise(bool)) {
        return <PromiseRender ok={target} error={Exception} promise={bool} />
      }
      if (bool) {
        return target
      }
      return Exception
    } catch (error) {
      throw error
    }
  }
  throw new Error('unsupported parameters')
}

/**
 * get currentAuthority
 * @param {Undefined} _
 */
export const getCurrentAuthority = _ => currentAuthority

/**
 * use  authority or getAuthority
 * @param {string|()=>String} targetAuthority
 */
export const setCurrentAuthority = targetAuthority => {
  if (targetAuthority) {
    if (targetAuthority.constructor.name === 'Function') {
      currentAuthority = targetAuthority()
    }
    if (targetAuthority.constructor.name === 'String') {
      currentAuthority = targetAuthority
    }
  } else {
    currentAuthority = 'NULL'
  }
}

const checkPermissions = (authority, target, Exception) => {
  return baseCheckPermissions(authority, currentAuthority, target, Exception)
}

export default checkPermissions
