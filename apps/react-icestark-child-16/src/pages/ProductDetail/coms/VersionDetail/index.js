import React from 'react';
import { connect } from 'react-redux';
import $common from 'utils/common';
import { getUrlParams } from 'ik-utils';
import { getTableList } from '../Version/model/action';
import Table from '../Version/coms/Table';
import Create from '../Version/coms/Create';
import styles from './index.less'

const cx = $common.classnames('busiVersionDetail', styles);
class BusiVersion extends React.Component {
  componentDidMount () {
    this.getTableList();
  }

  getTableList = () => {
    const { dispatch, curApp } = this.props;
    dispatch(getTableList({ app_key: curApp }));
  }

  render () {
    const { curApp } = this.props;
    return (
      <div>
        <Table appKey={curApp}/>
        <Create appKey={curApp}/>
      </div>
    )
  }
}

export default connect(store => ({
  store: store.busiVersion,
  productDetail: store.productDetail,
  curApp: store.stark.authApp.curApp,
}))(BusiVersion);
