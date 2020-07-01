import React from 'react';
import { Tabs } from 'antd';
import common from 'utils/common';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import styles from './index.less';
import {
  ROUTE_CONFIG,
  OVERVIEW,
  PRODUCT,
  ACCESS,
  ACCESS_ROUTE,
} from '../constant';

const { TabPane } = Tabs;
const cx = common.classnames('meeshow-basic-layout-header', styles);

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      current: OVERVIEW,
    };
  }

  renderTab = (item, curApp) => {
    // const _path = item.path.substring(1, item.path.length);
    return (
      <Link to={item.path} className="tabPane">
        <span
          className={`tabPane-text ${item.appid === curApp ? 'act' : null}`}
        >
          {item.name}
        </span>
      </Link>
    );
  };

  render() {
    const { pathname } = this.props;
    return (
      <div className={cx('root')}>
        <Link to={OVERVIEW} className="tabPane">
          <span
            className={`tab-view ${pathname.includes(OVERVIEW) ? 'act' : null}`}
          >
            概览
          </span>
        </Link>
        <Link to={PRODUCT} className="tabPane">
          <span
            className={`tab-produce ${
              pathname.includes(PRODUCT) ? 'act' : null
            }`}
          >
            应用管理
          </span>
        </Link>
        <Link to={ACCESS} className="tabPane">
          <span
            className={`tab-access ${
              pathname.includes(ACCESS_ROUTE) ? 'act' : null
            }`}
          >
            接入管理
          </span>
        </Link>
      </div>
    );
  }
}

export default connect((stores) => ({
  authApp: stores.stark.authApp,
}))(Header);
