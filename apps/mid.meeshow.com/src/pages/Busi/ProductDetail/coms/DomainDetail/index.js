import React from 'react';
import { connect } from 'react-redux';
import $common from 'utils/common';
import { getUrlParams } from 'ik-utils';
import { getTableList } from '../Domain/model/action';

import Table from '../Domain/coms/Table';
import Create from '../Domain/coms/Create';
import styles from './index.less'

const cx = $common.classnames('busiDomainDetail', styles);
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
      <div>
        <Table appKey={appKey}/>
        <Create appKey={appKey}/>
      </div>
    )
  }
}

export default connect(store => ({
  store: store.busiDomain,
}))(BusiDomain);
