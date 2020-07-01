import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Modal, Form } from 'antd';
import $user from 'src/utils/user';
import { DETAIL, ADD, UPDATE } from './../../constants/modalTypes';
import { momentToTime } from './../../constants/timeFormat';
import { saveCreate, add, update } from './../../model/action';
import Content from './Content';

const BURY = 'BuryPoint' // 埋点功能标识
class Create extends React.Component {
  handleSubmit = e => {
    const { form, store } = this.props;
    const { create: { type }, createParams: { id } } = store;
    if (type === DETAIL) {
      this.handleCancel();
      return;
    }
    e.preventDefault();
    form.validateFields((err, values) => {
      if (err) return
      const { dispatch, appKey } = this.props;
      const user = $user.get()
      const { email } = user
      const params = {
        function_key: BURY,
        function_config: {
          buz_config: JSON.stringify({ operator: email, ...values })
        },
      }
      if (type === ADD) {
        dispatch(add(params))
      } else {
        // console.log(id, params)
        dispatch(update(id, params))
      }
    });
  };

  handleCancel = () => {
    const { dispatch } = this.props;
    dispatch(saveCreate({ show: false }));
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
    store: stores.buried,
  })),
)(Create);
