import React, { useState, useEffect } from 'react'
import { Redirect, Switch, Route } from 'react-router-dom'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { withRouter } from 'react-router'

import Loading from 'components/CustomLoading'
import NotFound from 'components/NotFound'
import menuPromise, { asideMenuConfig } from '../../menuConfig'
import { routerData, routerConfig } from '../../routerConfig'
import { getRouterData } from 'utils/formatter'
import Authorized, { reloadAuthorized } from 'components/Authorized'
import * as actions from '../../store/action'
import config from 'src/config'

const { AuthorizedRoute } = Authorized

function MainContent (props) {
  const [routerList, setRouterList] = useState(routerData)

  useEffect(() => {
    initActions()
    config.authority && reloadAuthorized()
    setUpRouterList()
  }, [])

  const initActions = () => {
    const { dispatch } = props
    dispatch(actions.getPageButtonTree())
    dispatch(actions.getPageButtonTreeUid())
  }

  const setUpRouterList = () => {
    // 获取到权限树后，重新渲染路由
    menuPromise.then(menu => {
      config.authority && reloadAuthorized()
      setRouterList(getRouterData(routerConfig, menu))
    })
  }

  /**
   * 根据菜单取得重定向地址.
   */
  const getRedirectData = () => {
    const redirectData = []
    const getRedirect = item => {
      if (item && item.children) {
        if (item.children[0] && item.children[0].path) {
          redirectData.push({
            from: `${item.path}`,
            to: `${item.children[0].path}`,
          })
          item.children.forEach(children => {
            getRedirect(children)
          })
        }
      }
    }

    asideMenuConfig.forEach(getRedirect)

    return redirectData
  }

  /**
   * 渲染路由组件
   */
  const renderNormalRoute = (item, index) => {
    return item.component ? (
      <AuthorizedRoute
        authority={item.authority}
        redirectPath="/exception/403"
        key={index}
        path={item.path}
        render={_ => {
          return <item.component
            location={props.location}
          />
        }}
        exact={item.exact}
      />
    ) : null
  }
  const redirectData = getRedirectData()

  return <React.Suspense fallback={<Loading />}>
    <Switch>
      {/* 渲染权限路由表, 不能使用routerData直接渲染, 使用routerList, 不然只是利用地址引用和setState触发render, 恰巧得到相同渲染结果 */}
      {routerList.map(renderNormalRoute)}

      {/* 路由重定向，嵌套路由默认重定向到当前菜单的第一个路由 */}
      {redirectData.map((item, index) => {
        return <Redirect key={index} exact from={item.from} to={item.to} />
      })}

      {/* 首页默认重定向到 /dashboard */}
      <Redirect exact from="/" to="/index" />

      {/* 未匹配到的路由重定向到 404 */}
      <Route component={NotFound} />
    </Switch>
  </React.Suspense>
}

export default compose(
  withRouter,
  connect(state => ({
    auth: state.auth
  }))
)(MainContent)
