import React from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import SwitchPage from 'components/SwitchPage';
import asideMenuConfig from '@/config/menuConfig';
import _isEmpty from 'lodash/isEmpty';
import common from 'utils/common';
import { ACCESS_ROUTE } from './constant';
import styles from './index.less';
import Header from './Header';
import ProductList from './ProductList';

const cx = common.classnames('meeshow-basic-layout', styles);
class index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      switchPageShow: true
    };
  }

  switchPage = () => {
    this.setState({ switchPageShow: false });
    setTimeout(() => {
      this.setState({ switchPageShow: true });
    }, 200);
  };

  handleTabs = () => {    
    this.switchPage();
  };

  renderChildMenu = () => {
    const { location: { pathname }, treeRight } = this.props;
    if(!pathname.includes(ACCESS_ROUTE)) return []
    const menuChildren = this.formatAuthMenu(
      pathname,
      ACCESS_ROUTE,
      treeRight,
      asideMenuConfig
    );
    return menuChildren;
  };

  //  判断接入管理内的子页面
  formatAuthMenu = (pathname, target, treeRight, asideMenuConfig) => {
    const menuChild =
      asideMenuConfig.find(x => {
        return x.path.includes(ACCESS_ROUTE);
      }) || {};
    const [treeRightItem, ...otr] = treeRight;
    const { children: authChildren } = treeRightItem || {};
    const auth =
      (authChildren && authChildren.find(x => x.root === ACCESS_ROUTE)) || {};
    const authMenuChildren =
      menuChild.children &&
      menuChild.children.filter(x => {
        const filterItem =
          auth.children &&
          auth.children.find(y => {
            return x.path.includes(y.root);
          });
        return filterItem;
      });
    const menuChildren = authMenuChildren || [];
    return menuChildren;
  };

  render() {
    const { authApp, location: { pathname } } = this.props;
    const { switchPageShow } = this.state;
    const { curApp } = authApp || {};
    const menuChildren = this.renderChildMenu();
    const needSideMenu = !_isEmpty(menuChildren);
    return (
      <div className={cx('root')}>
        {curApp && (
          <div>
            <ProductList handleTabs={this.handleTabs} />
            <Header />
            {switchPageShow ? (
              <div className="content">
                <div className="layout-content">
                  {needSideMenu ? (
                    <div className="side-menu">
                      <div>
                        {menuChildren.map((item, idx) => {
                          return (
                            <Link
                              key={idx}
                              to={item.path}
                              className={`layout-menu-top-items ${
                                pathname === item.path ? 'act' : ''
                              }`}
                            >
                              {item.name}
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                  ) : null}
                  <div className="layout-content-router">
                    {this.props.children}
                  </div>
                </div>
              </div>
            ) : (
              <SwitchPage />
            )}
          </div>
        )}
      </div>
    );
  }
}

export default connect(stores => ({
  authApp: stores.stark.authApp,
  treeRight: stores.stark.auth.pageButtonTreeRight
}))(index);
