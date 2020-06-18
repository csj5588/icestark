import { LOCATION_CHANGE } from 'react-router-redux'
// import { setAuthorityTree } from '../menuConfig'
import * as types from './action-types'
import srcConfig from '@/config'

const authState = {
  pageButtonTreeRight: [{
    id: 0,
    code: '0',
    name: srcConfig.SYSTEM_CHINA_NAME,
    apipath: '/',
    children: []
  }],

  pageButtonTreeRightUid: [{
    id: 0,
    code: '0',
    name: srcConfig.SYSTEM_CHINA_NAME,
    apipath: '/',
    children: []
  }],

  routeAuthority: [], // 当前页面的路由的权限

  // buttonid 范围为[0,127]。。。
  buttonCtrl: {
    SEARCH: {
      id: '1',
      label: '查询',
    },
    ADD: {
      id: '2',
      label: '新增',
    },
    MODIFY: {
      id: '3',
      label: '编辑',
    },
    VIEW: {
      id: '4',
      label: '查看'
    },
    DEL: {
      id: '5',
      label: '删除',
    },
    EXPORT: {
      id: '6',
      label: '导出'
    },
    IMPORT: {
      id: '7',
      label: '导入',
    },
    COPY: {
      id: '8',
      label: '复制'
    },
  },

  userQueryButtonCtrl: {},
}

function splitRoute (pageButtonTreeRightUid, arr) {
  if (!arr[0]) {
    arr.splice(0, 1)
  }

  let level = 0
  let routeCode = []
  const findCode = (content, route) => {
    content.children.forEach((child, index) => {
      // console.log(child.root)
      // 判断路由是否相同
      if (child.root === route[level]) {
        if (!child.children.length || (child.children && child.type === '1')) {
          // console.log('child', child)
          // 相等的话，比较下一级路由
          level += 1
          routeCode = child.code.split(',') || []
        }
      }
      findCode(child, route)
    })
  }

  findCode(pageButtonTreeRightUid, arr)
  return routeCode
}

const auth = (state = authState, action) => {
  const { payload = {} } = action
  let routeAuthority = {}

  switch (action.type) {
    case types.GET_PAGE_BUTTON_TREE:
      // cancel
      // setAuthorityTree(payload)
      return {
        ...state,
        pageButtonTreeRight: [{
          ...state.pageButtonTreeRight[0],
          children: action.payload
        }],
        routeAuthority: splitRoute({
          ...state.pageButtonTreeRight[0],
          children: action.payload
        // eslint-disable-next-line
        }, location.pathname.split('/'))
      }
    case types.GET_PAGE_BUTTON_TREE_UID:
      return {
        ...state,
        pageButtonTreeRightUid: [{
          ...state.pageButtonTreeRightUid[0],
          children: action.payload
        }]
      }
    case LOCATION_CHANGE:
      if (state.pageButtonTreeRight) {
        routeAuthority = splitRoute(state.pageButtonTreeRight[0] || [], action.payload.pathname.split('/'))
      }
      return {
        ...state,
        routeAuthority
      }
    default:
      return state
  }
}

export default auth
