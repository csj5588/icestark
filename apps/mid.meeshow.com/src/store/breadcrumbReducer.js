/**
 * 获取 breadcrumbs name
 */
import { LOCATION_CHANGE } from 'react-router-redux'
import { routerData } from 'src/routerConfig'
import { asideMenuConfig } from 'src/menuConfig'
import _get from 'lodash/get'

const initialState = {
  breadList: []
}

function getRoute (pathname) {
  let routeList = pathname.split('/').filter(i => i)
  routeList = routeList.map((item, index, array) => {
    return `/${array.slice(0, index + 1).join('/')}`
  })

  const breadList = []

  const deepFind = data => {
    for (const item of data) {
      if (item.path === routeList[0]) {
        breadList.push({
          key: item.path,
          // link: item.path,
          name: item.name
        })
        routeList.shift()
        if (item.children && routeList[0]) {
          deepFind(item.children)
        }
        break
      }
    }
  }

  deepFind(asideMenuConfig)

  if (breadList.length > 0) {
    const lastRoute = breadList[breadList.length - 1]
    delete lastRoute.link
  }
  return breadList
}

function getPathname (payload) {
  return _get(payload, 'pathname', '')
}

const breadcrumbReducer = function (state = initialState, action) {
  const { payload = {} } = action

  switch (action.type) {
    case LOCATION_CHANGE:
      return Object.assign({}, state, {
        breadList: getRoute(getPathname(action.payload))
      })
    default:
      return state
  }
}

export default breadcrumbReducer
