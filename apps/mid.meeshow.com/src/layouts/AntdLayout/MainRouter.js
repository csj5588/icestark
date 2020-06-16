import React, { Component } from 'react'
import { Redirect, Switch, Route } from 'react-router-dom'
import { connect } from 'react-redux'
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
@withRouter
@connect(state => ({
  auth: state.auth
}))
class MainRoutes extends Component {
  static displayName = 'MainRoutes'
  constructor (props) {
    super(props)

    this.initActions()

    this.state = {
      routerList: routerData
    }
  }
  initActions () {
    const { dispatch } = this.props
    dispatch(actions.getPageButtonTree())
    dispatch(actions.getPageButtonTreeUid())
  }
  componentDidMount () {
    config.authority && reloadAuthorized()
    this.setRouterList()
  }
  setRouterList () {
    // 获取到权限树后，重新渲染路由
    menuPromise.then(menu => {
      config.authority && reloadAuthorized()
      this.setState({
        routerList: getRouterData(routerConfig, menu)
      }, _ => {
        // 手动强制更新路由, 不然页面渲染会有403情况
        // this.forceUpdate()
      })
    })
  }
  /**
   * 根据菜单取得重定向地址.
   */
  getRedirectData = () => {
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
  renderNormalRoute = (item, index) => {
    return item.component ? (
      <AuthorizedRoute
        authority={item.authority}
        redirectPath="/exception/403"
        key={index}
        path={item.path}
        render={_ => {
          return <item.component
            location={this.props.location}
          />
        }}
        exact={item.exact}
      />
    ) : null
  }

  render () {
    const { routerList } = this.state
    const redirectData = this.getRedirectData()
    // console.log('MainRouter: routerList: ', routerList, routerData)
    return (
      <React.Suspense fallback={<Loading />}>
        <Switch>
          {/* 渲染权限路由表, 不能使用routerData直接渲染, 使用routerList, 不然只是利用地址引用和setState触发render, 恰巧得到相同渲染结果 */}
          {routerList.map(this.renderNormalRoute)}

          {/* 路由重定向，嵌套路由默认重定向到当前菜单的第一个路由 */}
          {redirectData.map((item, index) => {
            return <Redirect key={index} exact from={item.from} to={item.to} />
          })}

          {/* 首页默认重定向到 /dashboard */}
          <Redirect exact from="/" to="/overView" />

          {/* 未匹配到的路由重定向到 404 */}
          <Route component={NotFound} />
        </Switch>
      </React.Suspense>
    )
  }
}

export default MainRoutes
