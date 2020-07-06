import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Button, Form } from 'antd';
import $common from 'utils/common';
import { saveCreate } from './../../model/action';
import { ADD } from './../../constants/modalTypes';
import styles from './index.less';

const cx = $common.classnames('version-action', styles);

class Action extends React.Component {
  handelCreate = () => {
    const { dispatch } = this.props;
    dispatch(saveCreate({ show: true, title: '版本添加', type: ADD }));
  }

  render () {
    return (
      <div className={cx('root')}>
        <Button
          type="primary"
          className="ml10 mr10"
          icon="plus"
          onClick={this.handelCreate}
        >
          添加
        </Button>
      </div>
    )
  }
}

export default compose(
  connect(stores => ({
    store: stores.busiVersion,
  })),
  Form.create(),
)(Action);
