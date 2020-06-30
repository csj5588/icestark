import React from 'react';
import { connect } from 'react-redux';
import $common from 'utils/common';
import { getUrlParams } from 'ik-utils';
import { getTableList } from './model/action';
import Action from './coms/Action';
import Table from './coms/Table';
import Create from './coms/Create';
import styles from './index.less'

const cx = $common.classnames('product', styles);
class BusiDomain extends React.Component {
  componentDidMount () {
    this.getTableList();
  }

  getTableList = () => {
    const { dispatch, location: { search } } = this.props;
    const { app_key: appKey } = getUrlParams(search);
    dispatch(getTableList({ app_key: appKey }));
  }

  render () {
    const { location: { search } } = this.props;
    const { app_key: appKey } = getUrlParams(search);
    return (
      <div className={cx('root')}>
        <Action />
        <Table appKey={appKey}/>
        <Create appKey={appKey}/>
      </div>
    )
  }
}

export default connect(store => ({
  store: store.busiEnv,
  productDetail: store.productDetail,
}))(BusiDomain);
