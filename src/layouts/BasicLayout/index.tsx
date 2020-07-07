import React from 'react';
import { Shell } from '@alifd/next';
import { AppLink, appHistory } from '@ice/stark';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import _isEmpty from 'lodash/isEmpty';
import { asideMenuConfig } from './menuConfig';
import { getDataAuth } from '@/entry/apis';
import Cookie from '@/utils/cookies';
import * as actions from '@/store/action';
import Footer from './components/Footer';
import Header from './components/Header/Header';
import S from './apis';
import { AUTH, DOCUMENT, CONTROL, MANAGE, ORDER } from './constant';

import 'antd/dist/antd.less';
import './index.scss';

const saveAppKey = 'cur-auth-app';
const ALL_AUTH = { appid: 'all', name: '全部' };
const ALL = 'all'; // 全部app权限

declare global {
  interface Window {
    webpackJsonp: any[];
  }
}

class BasicLayout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      current: CONTROL,
    };
  }

  componentDidMount() {
    this.getDataAuth();
    this.initActions();
  }

  initActions() {
    const { dispatch } = this.props;
    dispatch(actions.getPageButtonTree());
    dispatch(actions.getPageButtonTreeUid());
  }

  // 设置select 默认选中的app
  getDefaultApp(list) {
    const app = Cookie.getItem(saveAppKey);
    if (list.findIndex((x) => x.appid === app) !== -1) {
      return app;
    }
    return list[0] && list[0].appid;
  }

  getDefaultAppItem(list) {
    let app = Cookie.getItem(saveAppKey);
    const index = list.findIndex((x) => x.appid === app)
    if ( index !== -1) {
      return list[index];
    }
    return list[0] || {};
  }

  getDataAuth() {
    const { dispatch } = this.props;
    getDataAuth({}).then(async ({ data }) => {
      const { data: appList } = await S.getAppList();
      const dataAuth = data.data_power_tree.data_power;
      const { apps = [] } = dataAuth;
      const appListOptions = apps.includes(ALL)
        ? appList
        : appList.filter((item) => apps.indexOf(item.appid) >= 0);
      const defaultApp = this.getDefaultApp(appList);
      const defaultAppItem = this.getDefaultAppItem(appList);
      Cookie.setItem(saveAppKey, defaultApp);
      // 判断有没有当前app的权限
      const hasAppAuth = appListOptions.some(app => app.appid === defaultApp)
      this.setState({
        dataAuthComplete: true,
        defaultApp,
        appListOptions,
      });
      const authList = [ALL_AUTH, ...appList];
      dispatch(
        actions.setAuthAppList({
          curApp: defaultApp,
          hasAppAuth,
          appList: appListOptions,
          authList,
          curAppItem: defaultAppItem,
        })
      );
    });
  }

  handChangeRoute = () => {
    this.initActions();
  };

  renderChildMenu = () => {
    const { pathname, treeRight } = this.props;
    const menuChildren = this.formatAuthMenu(
      pathname,
      AUTH,
      treeRight,
      asideMenuConfig
    );
    return menuChildren;
  };

  //  判断权限管理内的子页面
  formatAuthMenu = (pathname, target, treeRight, asideMenuConfig) => {
    const menuChild =
      asideMenuConfig.find((x) => {
        const [name, ...other] = pathname.split('-');
        return x.path.includes(name);
      }) || {};
    const [treeRightItem, ...otr] = treeRight;
    const { children: authChildren } = treeRightItem || {};
    const auth =
      (authChildren && authChildren.find((x) => x.root === AUTH)) || {};
    const authMenuChildren =
      menuChild.children &&
      menuChild.children.filter((x) => {
        const [name, root] = x.path.split('-');
        const filterItem =
          auth.children &&
          auth.children.find((y) => {
            return y.root === root;
          });
        return filterItem;
      });
    const menuChildren = authMenuChildren || [];
    return menuChildren;
  };

  // 判断是否有管理权限
  getManageAuth = () => {
    const { treeRight } = this.props;
    const [treeRightItem, ...otr] = treeRight;
    const { children: authChildren } = treeRightItem || {};
    const hasManageAuth = authChildren.some(item => item.root === AUTH)
    return hasManageAuth
  }

  render() {
    const { children, pathname, appToken } = this.props;
    const menuChildren = this.renderChildMenu();
    const needSideMenu = !_isEmpty(menuChildren);
    const hasManageAuth = this.getManageAuth()
    return (
      <Shell
        type="brand"
        style={{
          minHeight: '100vh',
        }}
      >
        <Shell.Branding className="layout-menu-top">
          <div className="layout-logo">
            <img
              src="https://img.ikstatic.cn/MTU5MjI5MDQ4MTY3OSMgOTMjcG5n.png"
              alt=""
            />
          </div>
          <div className="layout-menu-top-item">
            {/*
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
            */}
            <div className="layout-menu-top-items">
              <a className={`layout-menu-top-document`} target="_blank" href="https://cloud.inkept.cn/#production">文档中心</a>
              <AppLink
                to="/react/overView"
                className={`layout-menu-top-control ${
                  pathname.includes(CONTROL) ? 'act' : ''}`}
              >
                管控中心
              </AppLink>
            </div>
            <div className={`layout-menu-top-items`}>
              { hasManageAuth ? <AppLink
                to="/auth-userMs"
                className={`layout-menu-top-manage ${
                  pathname.includes(MANAGE) ? 'act' : ''
                }`}
              >
                系统管理
              </AppLink> : null }
              <AppLink
                to="/vue-app"
                className={`layout-menu-top-order ${
                  pathname.includes(ORDER) ? 'act' : ''
                }`}>
                工单
              </AppLink>
            </div>
          </div>
          <Header />
        </Shell.Branding>

        <Shell.Content>
          <div className={`layout-content  ${pathname.includes(MANAGE) ? 'auth-manage' : ''}`}>
            {needSideMenu ? (
              <div className="side-menu">
                <Router>
                  {menuChildren.map((item, idx) => {
                    return (
                      <Link
                        key={idx}
                        onClick={this.handChangeRoute}
                        to={item.path}
                        className={`layout-menu-top-items ${
                          pathname === item.path ? 'act' : ''
                        }`}
                      >
                        {item.name}
                      </Link>
                    );
                  })}
                </Router>
              </div>
            ) : null}
            <div className="layout-content-router">{children}</div>
          </div>
        </Shell.Content>
        <Shell.Footer>
          <Footer />
        </Shell.Footer>
      </Shell>
    );
  }
}

export default connect((stores) => ({
  appToken: stores.authApp.curApp,
  authApp: stores.authApp,
  treeRight: stores.auth.pageButtonTreeRight,
}))(BasicLayout);
