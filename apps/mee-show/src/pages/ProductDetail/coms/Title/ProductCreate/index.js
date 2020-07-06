import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { syncStarkUp } from '@/store/action-stark';
import { Modal, Form } from 'antd';
import { DETAIL } from '../../../constants/modalTypes';
import { momentToTime } from '../../../constants/timeFormat';
import { saveCreatePro, uplate, initCreateProParams } from '../../../model/action';
import Content from './Content';

class Create extends React.Component {
  handleSubmit = e => {
    const { form, store } = this.props;
    const { createPro: { type } } = store;
    if (type === DETAIL) {
      this.handleCancel();
      return;
    }
    e.preventDefault();
    form.validateFields((err, values) => {
      if (!err) {
        const { dispatch } = this.props;
        const { launch_date: date } = values;
        const params = {
          ...values,
          launch_date: momentToTime(date),
        }
        dispatch(uplate(params)).then(() => {
          dispatch(syncStarkUp('getProductList', {}));
        });
      }
    });
  };

  handleCancel = () => {
    const { dispatch } = this.props;
    dispatch(saveCreatePro({ show: false }));
    dispatch(initCreateProParams());
  }

  render() {
    const { form, store, curApp } = this.props;
    const { createPro, domain } = store;
    return (
      <Modal
        title={createPro.title}
        visible={createPro.show}
        onOk={this.handleSubmit}
        onCancel={this.handleCancel}
        destroyOnClose
      >
        <Content
          store={store}
          form={form}
          curApp={curApp}
          domain={domain}
        />
      </Modal>
    )
  }
}

export default compose(
  Form.create(),
  connect(stores => ({
    store: stores.productDetail,
    curApp: stores.stark.authApp.curApp
  })),
)(Create);
