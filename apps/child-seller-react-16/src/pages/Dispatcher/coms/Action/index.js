import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Button, Input, Form, Row, Col } from 'antd';
import $common from 'utils/common';
import {
  saveCreate,
  getTableList,
  saveSearchParams,
  saveCreateEnv,
} from './../../model/action';
import { ADD } from './../../constants/modalTypes';
import styles from './index.less';

const cx = $common.classnames('access-dispatcher-action', styles);

class Action extends React.Component {
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const { dispatch } = this.props;
        dispatch(getTableList(values));
      }
    });
  };

  handelCreate = () => {
    const { dispatch } = this.props;
    dispatch(saveCreate({ show: true, title: '新增', type: ADD }));
  };

  handleStatus = (e) => {
    const { dispatch } = this.props;
    dispatch(saveSearchParams({ scope: e.target.value }));
    dispatch(getTableList());
  };

  handleStart = () => {
    const { dispatch } = this.props;
    dispatch(saveCreateEnv({ show: true, title: '选择全部启用环境', type: ADD }));
  };

  render() {
    const { form, store } = this.props;
    const {
      searchParams: { ev_name: evName },
      envList,
    } = store;
    const { getFieldDecorator } = form;
    const isDisabled = !envList || envList.length === 0
    return (
      <div className={cx('root')}>
        <div className="box">
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
              {getFieldDecorator('ev_name', {
                initialValue: evName,
              })(<Input style={{ width: '240px' }} placeholder="请输入" />)}
            </Form.Item>
          </Form>
          <div className="operate">
            <Button type="primary" icon="search" onClick={this.handleSubmit}>
              查询
            </Button>
          </div>
        </div>
        <div>
          <Button onClick={this.handleStart} disabled={isDisabled}>启用全部</Button>
        </div>
      </div>
    );
  }
}

export default compose(
  connect((stores) => ({
    store: stores.dispatcher,
  })),
  Form.create()
)(Action);
