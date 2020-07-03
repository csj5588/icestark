import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Modal, Form } from 'antd';
import _concat from 'lodash/concat'
import { DETAIL } from './../../constants/modalTypes';
import { saveCreateEnv, saveTable, initCreateEnvParams, saveEnvList } from './../../model/action';
import Content from './Content';

class Create extends React.Component {
  handleSubmit = e => {
    const { form, store } = this.props;
    const { createEnv: { type }, data: { detail, id }, envList } = store;
    if (type === DETAIL) {
      this.handleCancel();
      return;
    }
    e.preventDefault();
    form.validateFields((err, values) => {
      if (!err) {
        const { dispatch } = this.props;
        const { checkList } = values
        const newAddDetail = checkList.map(x => ({ env: x, ev_id: id, isAdd: true }))
        const newDetail = _concat(detail || [], newAddDetail)
        // 根据选择环境添加配置
        dispatch(saveTable({ detail: newDetail }))
        // 选择的环境需要实时去掉
        const newList = envList.filter(y => !checkList.includes(y.env))
        this.handleCancel()
        dispatch(saveEnvList(newList))
      }
    });
  };

  handleCancel = () => {
    const { dispatch } = this.props;
    dispatch(saveCreateEnv({ show: false }));
    dispatch(initCreateEnvParams());
  }

  render() {
    const { form, store } = this.props;
    const { createEnv } = store;
    return (
      <Modal
        width={500}
        title={createEnv.title}
        visible={createEnv.show}
        onOk={this.handleSubmit}
        onCancel={this.handleCancel}
        destroyOnClose
      >
        <Content
          form={form}
        />
      </Modal>
    )
  }
}

export default compose(
  Form.create(),
  connect(stores => ({
    store: stores.dispatcherDetail,
  })),
)(Create);
