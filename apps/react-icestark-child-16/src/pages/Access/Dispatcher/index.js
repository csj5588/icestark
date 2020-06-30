import React from 'react';
import { connect } from 'react-redux';
import $common from 'utils/common';
import { getTableList, getConfig, getEnvList } from './model/action';
import Action from './coms/Action';
import Table from './coms/Table';
import Create from './coms/Create';
import CreateEnv from './coms/CreateEnv';
import styles from './index.less'

const cx = $common.classnames('dispatch', styles);
class Dispatcher extends React.Component {
  componentDidMount () {
    this.getTableList();
  }

  getTableList = () => {
    const { dispatch, curApp } = this.props;
    dispatch(getConfig());
    dispatch(getEnvList({ app_key: curApp }));
    dispatch(getTableList());
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
  store: store.dispatcher,
  curApp: store.authApp.curApp
}))(Dispatcher);
