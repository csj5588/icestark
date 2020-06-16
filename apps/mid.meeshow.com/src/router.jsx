/**
 * 定义应用路由
 */
import { Switch, Route } from 'react-router-dom'
import React, { useEffect } from 'react'
import { withRouter } from 'react-router'
import srcConifg from 'src/config'
import { creaeLogInstance, logPageWithInstance } from 'utils/log'

import Login from './pages/Login'
import asidePromise from 'src/menuConfig'
import TopLayout from './layouts/TopLayout'
import AntdLayout from './layouts/AntdLayout'

// 按照 Layout 归类分组可以按照如下方式组织路由
function TopRouter (props) {
  creaeLogInstance(props.location.pathname)

  useEffect(() => {
    asidePromise.finally(() => {
      // console.log('获取完权限树了')
      logPageWithInstance()
    })
  }, [props.location.pathname])

  return (
    <Switch>
      {
        process.env.PHONE_LOGIN ? <Route path={`/${srcConifg.PHONE_LOGGIN_PATH}`} component={Login}></Route> : null
      }
      <Route path="/" component={srcConifg.IS_ANTDLAYOUT ? AntdLayout : TopLayout} />
    </Switch>
  )
}

export default withRouter(TopRouter)
