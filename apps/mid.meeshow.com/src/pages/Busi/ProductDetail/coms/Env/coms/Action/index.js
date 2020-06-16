import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Icon } from 'antd';
import $common from 'utils/common';
import { saveCreate, getTableList } from './../../model/action';
import { ADD } from './../../constants/modalTypes';
import styles from './index.less';

const cx = $common.classnames('productEnvAction', styles);

class Action extends React.Component {
  handelCreate = () => {
    const { dispatch } = this.props;
    dispatch(saveCreate({ show: true, title: '环境添加', type: ADD }));
  }

  render () {
    return (
      <div className={cx('root')}>
        <div className="operate">
          <div className="title">
        环境管理
          </div>
          <Icon
            onClick={this.handelCreate}
            className="icon"
            type="plus-circle" />
        </div>
      </div>
    )
  }
}

export default compose(
  connect(stores => ({
    store: stores.busiEnv,
  })),
)(Action);
