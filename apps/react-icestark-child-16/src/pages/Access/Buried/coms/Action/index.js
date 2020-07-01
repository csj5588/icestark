import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Button, Form } from 'antd';
import $common from 'utils/common';
import _isEmpty from 'lodash/isEmpty';
import { saveCreate } from './../../model/action';
import { ADD, UPDATE } from './../../constants/modalTypes';
import styles from './index.less';

const cx = $common.classnames('buried-action', styles);

class Action extends React.Component {
  handelCreate = () => {
    const {
      dispatch,
      store: {
        createParams: { service_config: serviceConfig },
      },
    } = this.props;
    if (_isEmpty(serviceConfig)) {
      dispatch(saveCreate({ show: true, title: '发起接入工单', type: ADD }));
    } else {
      dispatch(saveCreate({ show: true, title: '编辑配置', type: UPDATE }));
    }
  };

  render() {
    const {
      store: {
        createParams: { service_config: serviceConfig },
      },
    } = this.props;
    return (
      <div className={cx('root')}>
        <Button
          type="primary"
          className="ml10 mr10"
          icon="plus"
          onClick={this.handelCreate}
        >
          {_isEmpty(serviceConfig) ? '发起工单' : '编辑配置'}
        </Button>
      </div>
    );
  }
}

export default compose(
  connect((stores) => ({
    store: stores.buried,
  })),
  Form.create()
)(Action);
