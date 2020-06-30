import React from 'react';
import { Tabs } from 'antd';
import common from 'utils/common';
import styles from './index.less';
import { ROUTE_CONFIG, OVERVIEW, PRODUCT, ACCESS } from '../constant';

const { TabPane } = Tabs;
const cx = common.classnames('meeshow-basic-layout-header', styles);

class index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      current: OVERVIEW
    };
  }

  renderTab = (item, curApp) => {
    return (
      <div className="tabPane">
        <span
          className={`tabPane-text ${item.appid === curApp ? 'act' : null}`}
        >
          {item.name}
        </span>
      </div>
    );
  };

  render() {
    const { current } = this.props
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

export default index;
