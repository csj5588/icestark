import React from 'react';
import { Shell } from '@alifd/next';
import { AppLink } from '@ice/stark';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import _isEmpty from 'lodash/isEmpty'
import { asideMenuConfig } from './menuConfig';
import Footer from './components/Footer';
import Header from './components/Header/Header';
import 'antd/dist/antd.css';
import './index.scss';

declare global {
  interface Window {
    webpackJsonp: any[];
  }
}

class BasicLayout extends React.Component {
  constructor(props) {
    super(props);
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

export default BasicLayout
