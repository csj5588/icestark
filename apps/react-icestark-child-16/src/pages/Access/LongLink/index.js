import React from 'react';
import { connect } from 'react-redux';
import $common from 'utils/common';
import { getTableList, getClusters } from './model/action';
import Action from './coms/Action';
import Table from './coms/Table';
import Create from './coms/Create';
import styles from './index.less'

const LONG = 'LongConnect' // 长链接功能标识
const LONG_CONECT = 'LongConnectUsageCluster' // 业务标识， 可选值：长链接可用集群
const cx = $common.classnames('product', styles);
class longLink extends React.Component {
  componentDidMount () {
    this.getTableList();
  }

  getTableList = () => {
    const { dispatch, curApp } = this.props;
    dispatch(getTableList({ app_key: curApp, function_key: LONG }));
    dispatch(getClusters({ buz_key: LONG_CONECT }));
  }

  render () {
    const { curApp } = this.props;
    return (
      <div className={cx('root')}>
        <Action />
        <Table appKey={curApp}/>
        <Create appKey={curApp}/>
      </div>
    )
  }
}

export default connect(store => ({
  store: store.longLink,
  curApp: store.stark.authApp.curApp
}))(longLink);
