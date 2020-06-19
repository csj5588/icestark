import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Modal, Form } from 'antd';
import { DETAIL } from './../../constants/modalTypes';
import { momentToTime } from './../../constants/timeFormat';
import { saveCreate, add, initCreateParams } from './../../model/action';
import Content from './Content';

class Create extends React.Component {
  handleSubmit = (e) => {
    const { form, store } = this.props;
    const {
      create: { type },
    } = store;
    if (type === DETAIL) {
      this.handleCancel();
      return;
    }
    e.preventDefault();
    form.validateFields((err, values) => {
      if (!err) {
        const { dispatch } = this.props;
        const {
          createParams: { before_custom_verify: beforeCustomVerify },
        } = store;
        const newVerify = beforeCustomVerify.map((item) => {
          const {
            desc,
            method,
            read_timeout: readTimeout,
            service_name: serviceName,
            uri,
          } = item;
          return {
            desc,
            method,
            read_timeout: readTimeout,
            service_name: serviceName,
            uri,
          };
        });
        const params = {
          ...values,
          before_custom_verify: newVerify,
        };
        dispatch(add(params));
      }
    });
  };

  handleCancel = () => {
    const { dispatch } = this.props;
    dispatch(saveCreate({ show: false }));
    dispatch(initCreateParams({ show: false }));
  };

  render() {
    const { form, store } = this.props;
    const { create } = store;
    return (
      <Modal
        width={800}
        title={create.title}
        visible={create.show}
        onOk={this.handleSubmit}
        onCancel={this.handleCancel}
        destroyOnClose
      >
        <Content form={form} />
      </Modal>
    );
  }
}

export default compose(
  Form.create(),
  connect((stores) => ({
    store: stores.dispatcher,
  }))
)(Create);
