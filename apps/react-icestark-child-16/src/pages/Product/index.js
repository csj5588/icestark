import React from 'react';
import { connect } from 'react-redux';
import $common from '@inke-design/utils';
import { getTableList } from './model/action';

import Action from './coms/Action';
import Table from './coms/Table';
import Create from './coms/Create';
import styles from './index.less'

const cx = $common.classnames('product', styles);
class product extends React.Component {
  componentDidMount () {
    this.getTableList();
  }

  getTableList = () => {
    const { dispatch } = this.props;
    dispatch(getTableList());
  }

  render () {
    return (
      <div className={cx('root')}>
        <Action />
        <Table />
        <Create />
      </div>
    )
  }
}

export default connect(stores => ({
  store: stores.product,
  stark: stores.stark,
}))(product);
