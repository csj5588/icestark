import React from 'react';
import { connect } from 'react-redux';
import $common from 'utils/common';
import { getTableList, getEnvList } from './model/action';
import Action from './coms/Action';
import Table from './coms/Table';
import Create from './coms/Create';
import CreateEnv from './coms/CreateEnv';
import styles from './index.less'

const cx = $common.classnames('component-service', styles);
class Service extends React.Component {
  componentDidMount () {
    this.getTableList();
  }

  getTableList = () => {
    const { dispatch, curApp } = this.props;
    dispatch(getTableList());
    dispatch(getEnvList({ app_key: curApp }));
  }

  render () {
    return (
      <div className={cx('root')}>
        <Action />
        <Table />
        <Create />
        <CreateEnv />
      </div>
    )
  }
}

export default connect(store => ({
  store: store.service,
  curApp: store.authApp.curApp
}))(Service);
