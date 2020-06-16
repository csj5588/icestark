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
    const { dispatch, location: { search } } = this.props;
    const { app_key: appKey } = getUrlParams(search);
    dispatch(getTableList({ app_key: appKey }));
  }

  render () {
    const { location: { search } } = this.props;
    const { app_key: appKey } = getUrlParams(search);
    return (
      <div>
        <Table appKey={appKey}/>
        <Create appKey={appKey}/>
      </div>
    )
  }
}

export default connect(store => ({
  store: store.busiVersion,
  productDetail: store.productDetail,
}))(BusiVersion);
