import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Modal, Form } from 'antd';
import $user from 'src/utils/user';
import { DETAIL, UPDATE, ADD } from './../../constants/modalTypes';
import { saveCreate, add, initCreateParams, update } from './../../model/action';
import Content from './Content';

const LONG = 'LongConnect' // 长链接功能标识
class Create extends React.Component {
  handleSubmit = e => {
    const { form, store } = this.props;
    const { create: { type }, createParams: { id, buz_config: buzConfig } } = store;
    if (type === DETAIL) {
      this.handleCancel();
      return;
    }
    e.preventDefault();
    form.validateFields((err, values) => {
      if (err) return
      const { dispatch } = this.props
      const formatParams = {
        function_key: LONG,
        function_config: {
          buz_config: JSON.stringify(buzConfig),
          ...values
        },
      }
      if (type === ADD) {
        dispatch(add(formatParams))
      } else {
        dispatch(update(id, formatParams))
      }
    });
  };

  handleCancel = () => {
    const { dispatch } = this.props;
    dispatch(saveCreate({ show: false }));
    dispatch(initCreateParams());
  }

  render() {
    const { form, store, dispatch } = this.props;
    const { create } = store;
    return (
      <Modal
        title={create.title}
        width={1000}
        visible={create.show}
        onOk={this.handleSubmit}
        onCancel={this.handleCancel}
        destroyOnClose
      >
        <Content
          store={store}
          form={form}
          dispatch={dispatch}
        />
      </Modal>
    )
  }
}

export default compose(
  Form.create(),
  connect(stores => ({
    store: stores.longLink,
  })),
)(Create);
