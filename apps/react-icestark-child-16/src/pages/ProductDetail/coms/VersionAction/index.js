import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Icon, Form } from 'antd';
import { getUrlParams } from 'ik-utils';
import $common from 'utils/common';
import { saveCreate } from '../Version/model/action'
import { ADD } from './../../constants/modalTypes';
import styles from './index.less';

const cx = $common.classnames('produc-env-action', styles);
const formItemLayout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 }
}

class Action extends React.Component {
  handelCreate = () => {
    const { dispatch } = this.props;
    dispatch(saveCreate({ show: true, title: '版本添加', type: ADD }));
  }

  render () {
    const { location: { search } } = this.props;
    const { app_key: appKey } = getUrlParams(search);
    return (
      <div className={cx('root')}>
        <div className="operate">
          <div className="title">
            版本管理
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
    store: stores.productDetail,
  })),
  Form.create(),
)(Action);
