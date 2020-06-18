import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Button, Select, Input, Form, Radio } from 'antd';
import $common from 'utils/common';
import { saveCreate, getTableList, saveSearchParams } from './../../model/action';
import { ADD } from './../../constants/modalTypes';
import styles from './index.less';

const cx = $common.classnames('action', styles);

class Action extends React.Component {
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const { dispatch } = this.props;
        const params = {
          ...values,
        }
        dispatch(getTableList(params));
      }
    });
  };

  handelCreate = () => {
    const { dispatch } = this.props;
    dispatch(saveCreate({ show: true, title: '新增', type: ADD }));
  }

  handleStatus = (e) => {
    const { dispatch } = this.props;
    const val = e.target.value;
    const scope = val === 'added' ? '' : val;
    dispatch(saveSearchParams({ scope: scope }));
    dispatch(getTableList());
  }

  render () {
    const { form, store } = this.props;
    const {
      searchParams: {
        wd,
        scope,
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
        <Radio.Group
          className="mr10"
          value={scope || 'added'}
          onChange={this.handleStatus}
        >
          <Radio.Button value="added">已加入</Radio.Button>
          <Radio.Button value="all">全部</Radio.Button>
        </Radio.Group>
        <Form layout="inline">
          <Form.Item>
            {getFieldDecorator('wd', {
              initialValue: wd,
            })(
              <Input
                style={{ width: '240px' }}
                placeholder="请输入"
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
    store: stores.product,
  })),
  Form.create(),
)(Action);
