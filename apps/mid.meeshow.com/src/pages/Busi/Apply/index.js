import React from 'react';
import { connect } from 'react-redux';
import $common from 'utils/common';
import { getTableList, getRoleList } from './model/action';
import Table from './coms/Table';
import Create from './coms/Create';
import styles from './index.less'

const cx = $common.classnames('apply', styles);
class apply extends React.Component {
  componentDidMount () {
    this.getTableList();
    this.getRoleList();
  }

  getTableList = () => {
    const { dispatch } = this.props;
    dispatch(getTableList());
  }
  // 获取角色名称
  getRoleList = () => {
    const { dispatch } = this.props;
    dispatch(getRoleList({ size: 9999 }));
  }

  render () {
    return (
      <div className={cx('root')}>
        <Table />
        <Create />
      </div>
    )
  }
}

export default connect(store => ({
  store: store.apply,
}))(apply);
