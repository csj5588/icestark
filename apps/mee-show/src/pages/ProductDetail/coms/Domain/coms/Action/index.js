import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Button, Select, Input, Form, DatePicker } from 'antd';
import $common from 'utils/common';
import { filterOption } from 'ik-utils'
import { saveCreate, getTableList } from './../../model/action';
import { ADD } from './../../constants/modalTypes';
import { selectList, multipleSelectList } from '../../constants/selectLists';
import { timeFormat, timeToMomentArray, momentToTimeArray } from '../../constants/timeFormat';
import styles from './index.less';

const cx = $common.classnames('domain-action', styles);
const formItemLayout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 }
}

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
    dispatch(saveCreate({ show: true, title: '域名添加', type: ADD }));
  }

  render () {
    const { form, store } = this.props;
    const {
      searchParams: {
        domain,
      }
    } = store;
    const { getFieldDecorator } = form;
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
        <Form layout="inline">
          <Form.Item>
            {getFieldDecorator('domain', {
              initialValue: domain,
            })(
              <Input
                style={{ width: '240px' }}
                allowClear
                placeholder="请输入域名查询"
              />,
            )}
          </Form.Item>
        </Form>
        <div className="operate">
          <Button
            type="primary"
            icon="search"
            onClick={this.handleSubmit}
          >
            查询
          </Button>
        </div>
      </div>
    )
  }
}

export default compose(
  connect(stores => ({
    store: stores.busiDomain,
  })),
  Form.create(),
)(Action);
