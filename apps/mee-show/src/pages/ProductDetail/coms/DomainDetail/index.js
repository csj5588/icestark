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
  store: store.busiDomain,
  curApp: store.stark.authApp.curApp,
}))(BusiDomain);
