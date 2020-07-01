import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Modal, Form } from 'antd';
import { saveCreateTab, add, initCreateParams } from '../../../model/action';
import Content from './Content';

class Create extends React.Component {
  handleCancel = () => {
    const { dispatch } = this.props;
    dispatch(saveCreateTab({ show: false }));
  }

  render() {
    const { form, store, dispatch, curApp } = this.props;
    const { createTab } = store;
    return (
      <Modal
        width={800}
        title={createTab.title}
        visible={createTab.show}
        onOk={this.handleCancel}
        onCancel={this.handleCancel}
        destroyOnClose
      >
        <Content
          store={store}
          form={form}
          dispatch={dispatch}
          curApp={curApp}
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
