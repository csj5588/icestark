import React from 'react';
import { connect } from 'react-redux';
import $common from 'utils/common';
import { getTableList, getAllTableList } from './model/action';
import Table from './coms/Table';
import AllTable from './coms/AllTable';
import styles from './index.less'

const cx = $common.classnames('overView', styles);
class BusiVersion extends React.Component {
  componentDidMount () {
    this.getTableList();
  }

  getTableList = () => {
    const { dispatch, curApp } = this.props;
    dispatch(getTableList({ app_key: curApp }));
    dispatch(getAllTableList());
  }

  render () {
    return (
      <div className={cx('root')}>
        <Table/>
        <AllTable/>
      </div>
    )
  }
}

export default connect(store => ({
  store: store.overView,
  curApp: store.stark.authApp.curApp
}))(BusiVersion);
