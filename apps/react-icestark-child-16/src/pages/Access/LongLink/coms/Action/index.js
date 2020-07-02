import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Button } from 'antd';
import $common from 'utils/common';
import { saveCreate, getTableList } from './../../model/action';
import { ADD } from './../../constants/modalTypes';
import styles from './index.less';

const cx = $common.classnames('long-link-action', styles)

class Action extends React.Component {
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const { dispatch } = this.props;
        dispatch(getTableList({ ...values }));
      }
    });
  };

  handelCreate = () => {
    const { dispatch } = this.props;
    dispatch(saveCreate({ show: true, title: '发起接入工单', type: ADD }));
  }

  render () {
    const { store } = this.props;
    const {
      searchParams: {
        domain,
      }
    } = store;
    return (
      <div className={cx('root')}>
        <Button
          type="primary"
          className="ml10 mr10"
          icon="plus"
          onClick={this.handelCreate}
        >
          发起接入工单
        </Button>
      </div>
    )
  }
}

export default compose(
  connect(stores => ({
    store: stores.longLink,
  })),
)(Action);
