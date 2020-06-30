import React from 'react';
import { connect } from 'react-redux';
import $common from 'utils/common';
import { getTableList } from './model/action';
import Action from './coms/Action';
import Table from './coms/Table';
import Create from './coms/Create';
import styles from './index.less'

const cx = $common.classnames('product', styles);
class longLink extends React.Component {
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
  curApp: store.authApp.curApp
}))(longLink);
