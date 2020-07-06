import React from 'react';
import { Tabs } from 'antd';
import { syncStarkUp } from '@/store/action-stark';
import Cookie from '@/utils/cookies'
import { connect } from 'react-redux';
import common from 'utils/common';
import styles from './index.less';

const { TabPane } = Tabs;
const saveAppKey = 'cur-auth-app'
const BASE_IMG = 'https://img.ikstatic.cn/MTU5MzQ5NjYzODUyOCM4NzcjcG5n.png'
const cx = common.classnames('meeshow-basic-layout-product-list', styles);

class index extends React.Component {
  renderTab = (item, curApp) => {
    return (
      <div className='tabPane'>
        <img src={item.icon || BASE_IMG} alt=""/>
        <span className={`tabPane-text ${item.appid === curApp ? 'act' : null}`}>{item.name}</span>
      </div>
    )
  }

  getDefaultAppItem = (app, list) => {
    const idx = list.findIndex((x) => x.appid === app)
    if ( idx !== -1) {
      return list[idx];
    }
    return list[0] || {};
  }

  handleTabs = activeKey => {
    const { dispatch, authApp, handleTabs } = this.props
    const { authList, appList } = authApp || {}
    const curAppItem = this.getDefaultAppItem(activeKey, authList)
    // 判断有没有当前app的权限
    const hasAppAuth = appList.some(app => app.appid === activeKey)
    Cookie.setItem(saveAppKey, activeKey);
    dispatch(syncStarkUp('setAuthAppList', {
      curApp: activeKey,
      curAppItem,
      hasAppAuth,
    }));
    handleTabs()
  }

  render() {
    const { authApp } =  this.props
    const {curApp, authList} = authApp || {}
    const produceList = (authList && authList.slice(1)) || [];
    return (
      <div className={cx('root')}>
        <div className='tabs'>
          <Tabs activeKey={curApp} tabPosition='top' onChange={this.handleTabs}>
            {produceList.map((item, i) => (
              <TabPane tab={this.renderTab(item, curApp)} key={item.appid} />
            ))}
          </Tabs>
        </div>
      </div>
    );
  }
}

export default connect(stores => ({
  authApp: stores.stark.authApp
}))(index);
