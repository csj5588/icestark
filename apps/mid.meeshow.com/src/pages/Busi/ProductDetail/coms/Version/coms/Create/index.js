import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Modal, Form } from 'antd';
import { DETAIL } from './../../constants/modalTypes';
import { momentToTime } from './../../constants/timeFormat';
import { saveCreate, add, initCreateParams } from './../../model/action';
import Content from './Content';

class Create extends React.Component {
  handleSubmit = e => {
    const { form, store } = this.props;
    const { create: { type }, createParams } = store;
    if (type === DETAIL) {
      this.handleCancel();
      return;
    }
    e.preventDefault();
    form.validateFields((err, values) => {
      if (!err) {
        const { dispatch, appKey } = this.props;
        const params = {
          ...createParams,
          ...values,
          app_key: appKey
        }
        dispatch(add(params));
      }
    });
  };

  handleCancel = () => {
    const { dispatch } = this.props;
    dispatch(saveCreate({ show: false }));
    dispatch(initCreateParams({ show: false }));
  }

  render() {
    const { form, store, appKey, dispatch } = this.props;
    const { create } = store;
    return (
      <Modal
        width={600}
        title={create.title}
        visible={create.show}
        onOk={this.handleSubmit}
        onCancel={this.handleCancel}
        destroyOnClose
      >
        <Content
          dispatch={dispatch}
          store={store}
          form={form}
          appKey={appKey}
        />
      </Modal>
    )
  }
}

export default compose(
  Form.create(),
  connect(stores => ({
    store: stores.busiVersion,
  })),
)(Create);
