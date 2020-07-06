import React from 'react';
import { connect } from 'react-redux';
import $common from 'utils/common';
import { getUrlParams } from 'ik-utils';
import { getTableList, getConfig, getEnvList } from './model/action';
import Title from './coms/Title';
import Envs from './coms/Envs';
import CreateEnv from './coms/CreateEnv';
import styles from './index.less'

const cx = $common.classnames('dispatch', styles);
class DispatcherDetail extends React.Component {
  componentDidMount () {
    this.getTableList();
  }

  getTableList = () => {
    const { dispatch, curApp, location = {} } = this.props;
    const { search } = location
    const { id } = getUrlParams(search);
    dispatch(getConfig());
    dispatch(getTableList({ id, curApp }));
  }

  render () {
    return (
      <div className={cx('root')}>
        <Title />
        <Envs />
        <CreateEnv />
      </div>
    )
  }
}

export default connect(store => ({
  store: store.dispatcherDetail,
  curApp: store.stark.authApp.curApp
}))(DispatcherDetail);
