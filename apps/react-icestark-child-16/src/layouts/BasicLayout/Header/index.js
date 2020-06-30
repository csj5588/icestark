import React from 'react';
import { Tabs } from 'antd';
import common from 'utils/common';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'
import styles from './index.less';
import { ROUTE_CONFIG, OVERVIEW, PRODUCT, ACCESS } from '../constant';

const { TabPane } = Tabs;
const cx = common.classnames('meeshow-basic-layout-header', styles);

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      current: OVERVIEW
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
    return (
      <div className={cx('root')}>
        <Tabs tabPosition="top" onChange={this.handleTabs}>
          {ROUTE_CONFIG.map((item, i) => (
            <TabPane tab={this.renderTab(item)} key={item.path} />
          ))}
        </Tabs>
      </div>
    );
  }
}

export default connect(stores => ({
  authApp: stores.stark.authApp
}))(Header);
