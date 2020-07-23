import React from 'react';
import { Shell } from '@alifd/next';
import { AppLink } from '@ice/stark';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import { connect } from 'react-redux'
import _isEmpty from 'lodash/isEmpty'
import { asideMenuConfig } from './menuConfig';
import { getDataAuth } from '@/entry/apis';
import Cookie from '@/utils/cookies'
import * as actions from '@/store/action'
import Footer from './components/Footer';
import Header from './components/Header/Header';
import S from './apis';
import 'antd/dist/antd.css';
import './index.scss';

const saveAppKey = 'cur-auth-app';
const ALL_AUTH = { appid: 'all', name: '全部' }
const ALL = 'all' // 全部app权限

declare global {
  interface Window {
    webpackJsonp: any[];
  }
}

class BasicLayout extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount () {
    this.getDataAuth();
    this.initActions();
  }

  initActions () {
    const { dispatch } = this.props
    dispatch(actions.getPageButtonTree())
    dispatch(actions.getPageButtonTreeUid())
  }

  // 设置select 默认选中的app
  getDefaultApp(list) {
    let app = Cookie.getItem(saveAppKey)
    if (list.findIndex(x => x.appid === app) !== -1) {
      return app
    }
    return list[0] && list[0].appid
  }

  getDataAuth () {
    const { dispatch } = this.props
    getDataAuth({})
      .then(async ({ data }) => {
        const { data: appList } = await S.getAppList()
        const dataAuth = data.data_power_tree.data_power
        const { apps = [] } = dataAuth
        const appListOptions = (apps.includes(ALL)) ? appList : appList.filter(item => (apps.indexOf(item.appid) >= 0))
        const defaultApp = this.getDefaultApp(appList);
        Cookie.setItem(saveAppKey, defaultApp);
        this.setState({
          dataAuthComplete: true,
          defaultApp,
          appListOptions
        })
        const authList = [ALL_AUTH, ...appList]
        dispatch(actions.setAuthAppList({
          curApp: defaultApp,
          appList: appListOptions,
          authList,
        }))
      })
  }

  renderChildMenu = () => {
    const { pathname } = this.props;

    const menuChild = asideMenuConfig.find(x => {
      const [name, ...other] = pathname.split('-')
      return x.path.includes(name);
    }) || {};
    const menuChildren = menuChild.children || [];
    return menuChildren;
  }

  render() {
    const { children, pathname } = this.props;
    const menuChildren = this.renderChildMenu();

    const needSideMenu = !_isEmpty(menuChildren)

    return (
      <Shell
        type="brand"
        style={{
          minHeight: '100vh',
        }}
      >
        <Shell.Branding className="layout-menu-top">
          <div className="layout-logo">
            <img src="https://img.ikstatic.cn/MTU5MjI5MDQ4MTY3OSMgOTMjcG5n.png" alt=""/>
          </div>
          <div className="layout-menu-top-item">
            {
              asideMenuConfig.map((item, idx) => {
                return (
                  <AppLink
                    key={idx}
                    to={item.path}
                    className={`layout-menu-top-items`}
                  >
                    {item.name}
                  </AppLink>
                )
              })
            }
          </div>
          <Header />
        </Shell.Branding>

        <Shell.Content>
          <div className="layout-content">
            {
              needSideMenu ? (
                <div className="side-menu">
                  <Router>
                    {
                      menuChildren.map((item, idx) => {
                        return (
                          <Link
                            key={idx}
                            to={item.path}
                            className={`layout-menu-top-items ${pathname === item.path ? 'act' : ''}`}
                          >
                            {item.name}
                          </Link>
                        )
                      })
                    }
                  </Router>
                </div>
              ) : null
            }
            <div className="layout-content-router">
              {children}
            </div>
          </div>
        </Shell.Content>
        <Shell.Footer>
          <Footer />
        </Shell.Footer>
      </Shell>
    );
  }
}

export default connect(stores => ({
  appToken: stores.authApp.curApp,
  authApp: stores.authApp,
}))(BasicLayout)
